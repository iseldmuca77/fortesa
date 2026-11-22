-- Fortesa architect submissions. Run in the chosen Supabase project's SQL Editor.
-- This provisions private storage and a server-only reservation RPC. It does not
-- configure email, create a user account, enable a public upload policy, or delete
-- data. Use a separate Supabase project/environment when testing with real files.

begin;

create table if not exists public.project_submissions (
  id uuid primary key,
  created_at timestamptz not null default now(),
  ip_hash text not null check (ip_hash ~ '^[0-9a-f]{64}$'),
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  files jsonb not null check (jsonb_typeof(files) = 'array'),
  reserved_bytes bigint not null check (reserved_bytes between 8 and 104857600),
  status text not null default 'uploading'
    check (status in ('uploading', 'received')),
  notification_id text,
  notification_error boolean not null default false,
  notified_at timestamptz,
  upload_token_issues integer not null default 1 check (upload_token_issues between 1 and 8),
  completion_attempts integer not null default 0 check (completion_attempts between 0 and 12),
  completion_claim uuid,
  completion_lease_until timestamptz,
  check (
    (status = 'uploading' and reserved_bytes = 20971520::bigint * jsonb_array_length(files))
    or (status = 'received' and reserved_bytes between 8 and 20971520)
  )
);

-- Also upgrade an earlier installation of this same setup without replacing
-- submissions. No provider data or retention settings are changed.
alter table public.project_submissions
  add column if not exists upload_token_issues integer not null default 1
    check (upload_token_issues between 1 and 8),
  add column if not exists completion_attempts integer not null default 0
    check (completion_attempts between 0 and 12),
  add column if not exists completion_claim uuid,
  add column if not exists completion_lease_until timestamptz;

create index if not exists project_submissions_created_at_idx
  on public.project_submissions (created_at);
create index if not exists project_submissions_ip_created_at_idx
  on public.project_submissions (ip_hash, created_at);

alter table public.project_submissions enable row level security;
alter table public.project_submissions force row level security;

-- No browser role may read or mutate submission metadata. The service-role key
-- must remain exclusively in the backend environment; never use NEXT_PUBLIC_*.
revoke all on table public.project_submissions from public, anon, authenticated;
revoke all on table public.project_submissions from service_role;
grant select on table public.project_submissions to service_role;
grant update (status, reserved_bytes, notification_id, notification_error, notified_at)
  on table public.project_submissions to service_role;

-- This restrictive policy also prevents an unrelated permissive policy from
-- exposing this table if the setup is rerun in an existing project.
drop policy if exists fortesa_submissions_server_only
  on public.project_submissions;
create policy fortesa_submissions_server_only
  on public.project_submissions as restrictive for all to anon, authenticated
  using (false) with check (false);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'architect-projects',
  'architect-projects',
  false,
  20971520,
  array[
    'application/pdf',
    'application/octet-stream',
    'application/acad',
    'application/x-acad',
    'application/autocad',
    'application/x-autocad',
    'application/dwg',
    'application/x-dwg',
    'image/vnd.dwg'
  ]::text[]
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Existing broad Storage policies cannot make these plans public to browser
-- roles. This policy grants no access to any other bucket and does not change
-- their existing policies. Service-role requests bypass RLS. Upload access must
-- come only from the backend's scoped signed upload token after reservation.
drop policy if exists fortesa_architect_bucket_server_only on storage.objects;
create policy fortesa_architect_bucket_server_only
  on storage.objects as restrictive for all to anon, authenticated
  using (bucket_id <> 'architect-projects')
  with check (bucket_id <> 'architect-projects');

create or replace function public.reserve_project_submission(
  p_id uuid,
  p_ip_hash text,
  p_payload jsonb,
  p_files jsonb,
  p_bytes bigint
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_existing public.project_submissions%rowtype;
  v_new public.project_submissions%rowtype;
  v_file jsonb;
  v_index integer := 0;
  v_name text;
  v_extension text;
  v_size bigint;
  v_total bigint := 0;
  v_reserved bigint;
  v_new_reservation bigint;
  v_now timestamptz;
begin
  if p_id is null
     or p_ip_hash is null
     or p_ip_hash !~ '^[0-9a-f]{64}$'
     or p_bytes is null
     or p_bytes < 8
     or p_bytes > 20971520 then
    raise exception using errcode = '22023', message = 'invalid_submission';
  end if;

  if p_payload is null
     or pg_catalog.jsonb_typeof(p_payload) is distinct from 'object'
     or pg_catalog.octet_length(p_payload::text) > 16384 then
    raise exception using errcode = '22023', message = 'invalid_payload';
  end if;

  if p_files is null
     or pg_catalog.jsonb_typeof(p_files) is distinct from 'array' then
    raise exception using errcode = '22023', message = 'invalid_files';
  end if;

  if pg_catalog.jsonb_array_length(p_files) not between 1 and 5
     or pg_catalog.octet_length(p_files::text) > 8192 then
    raise exception using errcode = '22023', message = 'invalid_files';
  end if;

  for v_file in select value from pg_catalog.jsonb_array_elements(p_files)
  loop
    if pg_catalog.jsonb_typeof(v_file) is distinct from 'object'
       or pg_catalog.jsonb_typeof(v_file -> 'name') is distinct from 'string'
       or pg_catalog.jsonb_typeof(v_file -> 'path') is distinct from 'string'
       or pg_catalog.jsonb_typeof(v_file -> 'size') is distinct from 'number' then
      raise exception using errcode = '22023', message = 'invalid_file';
    end if;

    v_name := v_file ->> 'name';
    if pg_catalog.char_length(v_name) not between 5 and 255
       or v_name <> pg_catalog.btrim(v_name)
       or pg_catalog.strpos(v_name, '/') > 0
       or pg_catalog.strpos(v_name, pg_catalog.chr(92)) > 0
       or v_name ~ '[[:cntrl:]]'
       or pg_catalog.lower(v_name) !~ '\.(pdf|dwg)$'
       or (v_file ->> 'size') !~ '^[0-9]{1,8}$' then
      raise exception using errcode = '22023', message = 'invalid_file';
    end if;

    v_extension := pg_catalog.lower(pg_catalog.right(v_name, 3));
    v_size := (v_file ->> 'size')::bigint;
    if v_size < 8 or v_size > 20971520
       or (v_file ->> 'path') is distinct from
          (p_id::text || '/' || v_index::text || '.' || v_extension) then
      raise exception using errcode = '22023', message = 'invalid_file';
    end if;

    v_total := v_total + v_size;
    v_index := v_index + 1;
  end loop;

  if v_total <> p_bytes or v_total > 20971520 then
    raise exception using errcode = '22023', message = 'invalid_total_size';
  end if;

  -- Supabase signed upload tokens enforce the bucket's 20 MiB file ceiling,
  -- not the caller's declared size. Reserve that ceiling for EVERY issued path.
  -- Only the backend may shrink this reservation, in the SAME update that marks
  -- it received, after all paths exist and actual sizes/signatures are verified.
  -- Upload tokens must use upsert=false so filled paths cannot then grow again.
  v_new_reservation := pg_catalog.jsonb_array_length(p_files)::bigint * 20971520;

  -- One transaction-scoped lock serializes all reservations and their quota
  -- checks, including requests from different IP addresses. It is released by
  -- Postgres on commit or rollback; there is no separate unlock operation.
  perform pg_catalog.pg_advisory_xact_lock(60672349128491211::bigint);

  select * into v_existing
  from public.project_submissions
  where id = p_id;

  if found then
    if v_existing.ip_hash is distinct from p_ip_hash
       or v_existing.payload is distinct from p_payload
       or v_existing.files is distinct from p_files then
      raise exception using errcode = 'P0001', message = 'submission_conflict';
    end if;

    -- Bound token issuance even on identical retries. A failed/partial signing
    -- round consumes one attempt conservatively. This counter is writable only
    -- through this server-only RPC, under the same global reservation lock.
    if v_existing.upload_token_issues >= 8 then
      raise exception using errcode = 'P0001', message = 'ip_rate_limit';
    end if;

    update public.project_submissions
    set upload_token_issues = upload_token_issues + 1
    where id = p_id
    returning * into v_existing;

    -- Equal file manifests imply equal declared bytes (validated above). Do not
    -- compare p_bytes to reserved_bytes: the latter is worst-case while uploading
    -- and may have been reduced to the verified total after completion. A retry
    -- must neither grow nor shrink the existing reservation or consume another
    -- new-session slot. It does consume one of the eight token-issuance rounds.
    return pg_catalog.to_jsonb(v_existing);
  end if;

  v_now := pg_catalog.clock_timestamp();

  if (
    select pg_catalog.count(*)
    from public.project_submissions
    where ip_hash = p_ip_hash and created_at >= v_now - interval '1 hour'
  ) >= 3 then
    raise exception using errcode = 'P0001', message = 'ip_rate_limit';
  end if;

  if (
    select pg_catalog.count(*)
    from public.project_submissions
    where created_at >= v_now - interval '24 hours'
  ) >= 20 then
    raise exception using errcode = 'P0001', message = 'daily_capacity';
  end if;

  select coalesce(pg_catalog.sum(reserved_bytes), 0) into v_reserved
  from public.project_submissions;

  if v_reserved + v_new_reservation > 786432000 then
    raise exception using errcode = 'P0001', message = 'storage_capacity';
  end if;

  insert into public.project_submissions
    (id, created_at, ip_hash, payload, files, reserved_bytes)
  values
    (p_id, v_now, p_ip_hash, p_payload, p_files, v_new_reservation)
  returning * into v_new;

  return pg_catalog.to_jsonb(v_new);
end;
$function$;

revoke all on function public.reserve_project_submission(uuid, text, jsonb, jsonb, bigint)
  from public, anon, authenticated;
grant execute on function public.reserve_project_submission(uuid, text, jsonb, jsonb, bigint)
  to service_role;

-- Claim before file validation and notification. The row lock makes concurrent
-- attempts atomic. A lease outlasts the site's 60-second function duration, but
-- expires after a crashed request. Only the matching claimant may release it.
create or replace function public.claim_project_completion(p_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_row public.project_submissions%rowtype;
  v_now timestamptz;
  v_claim uuid;
begin
  select * into v_row
  from public.project_submissions
  where id = p_id
  for update;

  if not found then
    raise exception using errcode = '22023', message = 'submission_not_found';
  end if;

  v_now := pg_catalog.clock_timestamp();
  if v_row.completion_lease_until is not null
     and v_row.completion_lease_until > v_now then
    raise exception using errcode = 'P0001', message = 'completion_busy';
  end if;

  if v_row.completion_attempts >= 12 then
    raise exception using errcode = 'P0001', message = 'completion_limit';
  end if;

  v_claim := pg_catalog.gen_random_uuid();
  update public.project_submissions
  set completion_attempts = completion_attempts + 1,
      completion_claim = v_claim,
      completion_lease_until = v_now + interval '90 seconds'
  where id = p_id;

  return v_claim;
end;
$function$;

create or replace function public.release_project_completion(p_id uuid, p_claim uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $function$
begin
  update public.project_submissions
  set completion_claim = null,
      completion_lease_until = null
  where id = p_id and completion_claim = p_claim;

  return found;
end;
$function$;

revoke all on function public.claim_project_completion(uuid)
  from public, anon, authenticated;
revoke all on function public.release_project_completion(uuid, uuid)
  from public, anon, authenticated;
grant execute on function public.claim_project_completion(uuid) to service_role;
grant execute on function public.release_project_completion(uuid, uuid) to service_role;

comment on function public.claim_project_completion(uuid)
  is 'Server-only atomic completion lease: at most 12 claims, 90-second lease, exact UUID required to release. Authenticate the completion token before calling.';
comment on function public.release_project_completion(uuid, uuid)
  is 'Server-only release of the matching completion lease. Stale or incorrect claim IDs cannot release a newer lease.';

comment on function public.reserve_project_submission(uuid, text, jsonb, jsonb, bigint)
  is 'Server-only, atomic reservation: 3/IP/rolling hour, 20/rolling day, 750 MiB total reserved; reserves 20 MiB per upload path, not declared size. Identical retries preserve capacity but consume one of eight token-issuance rounds. No automatic cleanup.';

comment on table public.project_submissions
  is 'Private architect requests. Reservation bytes include all statuses and abandoned sessions until owner-reviewed cleanup. Never expose browser access.';

commit;

-- OWNER OPERATIONS / RETENTION
-- Use the authenticated Supabase dashboard (Storage > architect-projects) to
-- inspect/download files. Use Table Editor or SQL Editor for request metadata.
-- Do not change this bucket to public and do not add public download policies.
-- No retention period, scheduled deletion, or automatic cleanup is enabled.
-- All reservations, including abandoned uploads, continue to count toward the
-- 750 MiB cap. Pending reservations charge the bucket maximum for each file;
-- completed ones charge verified actual bytes. The backend must atomically set
-- status='received' and reserved_bytes=verified total, after checking ALL files.
-- Do not reduce a pending reservation based on the uploader's declared sizes.
-- Review storage and reservations together before an agreed manual
-- cleanup: removing a reservation while its file or live upload token remains
-- would undercount capacity. The backend may issue fresh upload URLs until the
-- submission is two hours old; Supabase signed upload URLs then last two hours
-- (as documented in the installed storage-js createSignedUploadUrl API).
-- A signed upload token may remain valid after its associated row is deleted.
-- For abandoned sessions, wait AT LEAST FOUR HOURS from created_at before any
-- reviewed cleanup, then check that no active completion lease remains. This
-- conservative window covers the last possible issued token, not just the first.
-- These time bounds do not authorize automatic removal of received projects.
-- Keep this bucket dedicated to this flow. Other manual uploads are not counted
-- by the reservation table; compare actual storage usage during owner review.
-- Treat email notification status as provider acceptance, not inbox delivery.

-- Read-only examples for an owner using the authenticated SQL Editor:
-- select status, count(*), sum(reserved_bytes) from public.project_submissions
-- group by status;
-- select id, created_at, status, reserved_bytes, notification_error
-- from public.project_submissions order by created_at desc;
