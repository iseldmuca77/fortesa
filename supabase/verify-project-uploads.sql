-- Run in the authenticated Supabase SQL Editor after project-uploads.sql.
-- Synthetic database-only checks: no files, network requests, or emails.
-- ALL test rows and the temporary result table are rolled back. Existing
-- submissions cause an explicit SKIPPED result rather than touching live data.
-- A failed assertion aborts the transaction; run ROLLBACK if the editor requests it.

begin;
set local lock_timeout = '5s';
set local statement_timeout = '30s';
create temporary table fortesa_project_upload_smoke_result (result text)
  on commit drop;
alter table fortesa_project_upload_smoke_result enable row level security;

do $verify$
declare
  v_id uuid := pg_catalog.gen_random_uuid();
  v_other_id uuid;
  v_claim uuid;
  v_row jsonb;
  v_files jsonb;
  v_other_files jsonb;
  v_payload jsonb := '{"name":"Synthetic SQL verification","phone":"+12025550123","area":"SQL test only","services":["kamera-sigurie"],"consent":true}'::jsonb;
  v_ip text := pg_catalog.repeat('a', 64);
  v_role text;
  v_column text;
  v_function text;
  v_rejected boolean;
  v_count integer;
  v_bytes bigint;
  i integer;
begin
  -- Check the deployed access controls before creating synthetic metadata.
  if not exists (
    select 1 from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname = 'project_submissions'
      and c.relrowsecurity and c.relforcerowsecurity
  ) then raise exception 'FAIL: submission RLS is not enabled and forced'; end if;

  foreach v_role in array array['anon', 'authenticated'] loop
    if pg_catalog.has_table_privilege(v_role, 'public.project_submissions', 'SELECT')
       or pg_catalog.has_table_privilege(v_role, 'public.project_submissions', 'INSERT')
       or pg_catalog.has_table_privilege(v_role, 'public.project_submissions', 'UPDATE')
       or pg_catalog.has_table_privilege(v_role, 'public.project_submissions', 'DELETE') then
      raise exception 'FAIL: browser role % has submission privileges', v_role;
    end if;
    foreach v_function in array array[
      'public.reserve_project_submission(uuid,text,jsonb,jsonb,bigint)',
      'public.claim_project_completion(uuid)',
      'public.release_project_completion(uuid,uuid)'
    ] loop
      if pg_catalog.has_function_privilege(v_role, v_function, 'EXECUTE') then
        raise exception 'FAIL: browser role % can execute %', v_role, v_function;
      end if;
    end loop;
  end loop;

  if not pg_catalog.has_table_privilege('service_role', 'public.project_submissions', 'SELECT')
     or pg_catalog.has_table_privilege('service_role', 'public.project_submissions', 'INSERT')
     or pg_catalog.has_table_privilege('service_role', 'public.project_submissions', 'UPDATE')
     or pg_catalog.has_table_privilege('service_role', 'public.project_submissions', 'DELETE') then
    raise exception 'FAIL: service_role table grants differ from minimal setup';
  end if;
  foreach v_column in array array['status', 'reserved_bytes', 'notification_id', 'notification_error', 'notified_at'] loop
    if not pg_catalog.has_column_privilege('service_role', 'public.project_submissions', v_column, 'UPDATE') then
      raise exception 'FAIL: service_role cannot update %', v_column;
    end if;
  end loop;
  foreach v_column in array array['id', 'created_at', 'ip_hash', 'payload', 'files', 'upload_token_issues', 'completion_attempts', 'completion_claim', 'completion_lease_until'] loop
    if pg_catalog.has_column_privilege('service_role', 'public.project_submissions', v_column, 'UPDATE') then
      raise exception 'FAIL: service_role can directly update protected column %', v_column;
    end if;
  end loop;
  foreach v_function in array array[
    'public.reserve_project_submission(uuid,text,jsonb,jsonb,bigint)',
    'public.claim_project_completion(uuid)',
    'public.release_project_completion(uuid,uuid)'
  ] loop
    if not pg_catalog.has_function_privilege('service_role', v_function, 'EXECUTE') then
      raise exception 'FAIL: service_role cannot execute %', v_function;
    end if;
  end loop;

  if not exists (
    select 1 from storage.buckets
    where id = 'architect-projects' and public = false and file_size_limit = 20971520
  ) then raise exception 'FAIL: architect bucket is missing, public, or incorrectly sized'; end if;
  if not exists (
    select 1 from pg_catalog.pg_policy
    where polrelid = 'public.project_submissions'::regclass
      and polname = 'fortesa_submissions_server_only' and not polpermissive
  ) or not exists (
    select 1 from pg_catalog.pg_policy
    where polrelid = 'storage.objects'::regclass
      and polname = 'fortesa_architect_bucket_server_only' and not polpermissive
  ) then raise exception 'FAIL: restrictive browser-role policies are missing'; end if;

  -- Match the reservation lock order, then prevent concurrent real mutations.
  perform pg_catalog.pg_advisory_xact_lock(60672349128491211::bigint);
  lock table public.project_submissions in share row exclusive mode;
  if exists (select 1 from public.project_submissions) then
    insert into pg_temp.fortesa_project_upload_smoke_result values
      ('SKIPPED synthetic mutation checks: existing submissions found. Access-control checks passed; no existing data changed.');
    return;
  end if;

  select pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object(
    'name', 'synthetic-' || (n + 1)::text || '.pdf', 'size', 8,
    'path', v_id::text || '/' || n::text || '.pdf'
  ) order by n) into v_files from pg_catalog.generate_series(0, 4) n;

  v_row := public.reserve_project_submission(v_id, v_ip, v_payload, v_files, 40);
  if (v_row ->> 'reserved_bytes')::bigint <> 104857600
     or (v_row ->> 'upload_token_issues')::integer <> 1
     or v_row ->> 'status' <> 'uploading' then
    raise exception 'FAIL: five 8-byte files did not reserve worst-case 100 MiB';
  end if;

  for i in 2..8 loop
    v_row := public.reserve_project_submission(v_id, v_ip, v_payload, v_files, 40);
    if (v_row ->> 'upload_token_issues')::integer <> i
       or (v_row ->> 'reserved_bytes')::bigint <> 104857600 then
      raise exception 'FAIL: identical retry changed capacity or issue count';
    end if;
  end loop;
  v_rejected := false;
  begin
    perform public.reserve_project_submission(v_id, v_ip, v_payload, v_files, 40);
  exception when sqlstate 'P0001' then
    if sqlerrm <> 'ip_rate_limit' then raise; end if;
    v_rejected := true;
  end;
  if not v_rejected then raise exception 'FAIL: ninth signing round was accepted'; end if;

  v_rejected := false;
  begin
    perform public.reserve_project_submission(v_id, v_ip, v_payload || '{"name":"Changed"}'::jsonb, v_files, 40);
  exception when sqlstate 'P0001' then
    if sqlerrm <> 'submission_conflict' then raise; end if;
    v_rejected := true;
  end;
  if not v_rejected then raise exception 'FAIL: conflicting retry was accepted'; end if;
  select count(*) into v_count from public.project_submissions;
  if v_count <> 1 then raise exception 'FAIL: retries created extra reservations'; end if;

  v_claim := public.claim_project_completion(v_id);
  if v_claim is null then raise exception 'FAIL: claim ID missing'; end if;
  v_rejected := false;
  begin
    perform public.claim_project_completion(v_id);
  exception when sqlstate 'P0001' then
    if sqlerrm <> 'completion_busy' then raise; end if;
    v_rejected := true;
  end;
  if not v_rejected then raise exception 'FAIL: active completion lease was ignored'; end if;
  if public.release_project_completion(v_id, pg_catalog.gen_random_uuid()) then
    raise exception 'FAIL: mismatched claim released the lease';
  end if;
  if not exists (
    select 1 from public.project_submissions
    where id = v_id and completion_claim = v_claim and completion_attempts = 1
      and completion_lease_until > pg_catalog.clock_timestamp()
  ) then raise exception 'FAIL: blocked/mismatched claim changed lease or attempts'; end if;
  if not public.release_project_completion(v_id, v_claim) then
    raise exception 'FAIL: matching claim did not release';
  end if;
  for i in 2..12 loop
    v_claim := public.claim_project_completion(v_id);
    if not public.release_project_completion(v_id, v_claim) then
      raise exception 'FAIL: matching claim % did not release', i;
    end if;
  end loop;
  v_rejected := false;
  begin
    perform public.claim_project_completion(v_id);
  exception when sqlstate 'P0001' then
    if sqlerrm <> 'completion_limit' then raise; end if;
    v_rejected := true;
  end;
  if not v_rejected then raise exception 'FAIL: thirteenth completion claim accepted'; end if;

  -- SQL state-transition test only. This does NOT claim real files were verified.
  update public.project_submissions set status = 'received', reserved_bytes = 40 where id = v_id;
  if not exists (
    select 1 from public.project_submissions
    where id = v_id and status = 'received' and reserved_bytes = 40
      and completion_attempts = 12 and completion_claim is null
  ) then raise exception 'FAIL: received transition or actual-byte shrink failed'; end if;

  -- Original reservation plus two more exhaust this synthetic IP's hourly cap.
  for i in 1..3 loop
    v_other_id := pg_catalog.gen_random_uuid();
    v_other_files := pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
      'name', 'synthetic.pdf', 'size', 8, 'path', v_other_id::text || '/0.pdf'
    ));
    if i < 3 then
      perform public.reserve_project_submission(v_other_id, v_ip, v_payload, v_other_files, 8);
    else
      v_rejected := false;
      begin
        perform public.reserve_project_submission(v_other_id, v_ip, v_payload, v_other_files, 8);
      exception when sqlstate 'P0001' then
        if sqlerrm <> 'ip_rate_limit' then raise; end if;
        v_rejected := true;
      end;
      if not v_rejected then raise exception 'FAIL: fourth session for one IP accepted'; end if;
    end if;
  end loop;

  -- 40 actual bytes + 2*20 MiB + 7*100 MiB = 740 MiB + 40 bytes.
  -- One additional 20 MiB reservation must exceed the 750 MiB ceiling.
  for i in 1..7 loop
    v_other_id := pg_catalog.gen_random_uuid();
    select pg_catalog.jsonb_agg(pg_catalog.jsonb_build_object(
      'name', 'synthetic-' || (n + 1)::text || '.pdf', 'size', 8,
      'path', v_other_id::text || '/' || n::text || '.pdf'
    ) order by n) into v_other_files from pg_catalog.generate_series(0, 4) n;
    perform public.reserve_project_submission(v_other_id, pg_catalog.lpad(pg_catalog.to_hex(i), 64, '0'), v_payload, v_other_files, 40);
  end loop;
  select sum(reserved_bytes) into v_bytes from public.project_submissions;
  if v_bytes <> 740::bigint * 1024 * 1024 + 40 then
    raise exception 'FAIL: capacity accounting differs from expected bytes';
  end if;
  v_other_id := pg_catalog.gen_random_uuid();
  v_other_files := pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
    'name', 'synthetic.pdf', 'size', 8, 'path', v_other_id::text || '/0.pdf'
  ));
  v_rejected := false;
  begin
    perform public.reserve_project_submission(v_other_id, pg_catalog.repeat('b', 64), v_payload, v_other_files, 8);
  exception when sqlstate 'P0001' then
    if sqlerrm <> 'storage_capacity' then raise; end if;
    v_rejected := true;
  end;
  if not v_rejected then raise exception 'FAIL: 750 MiB reservation ceiling exceeded'; end if;

  -- Release synthetic worst-case bytes through valid received transitions so
  -- the independent 20-new-sessions/day guard can also be exercised.
  update public.project_submissions
  set status = 'received', reserved_bytes = pg_catalog.jsonb_array_length(files)::bigint * 8;
  for i in 11..20 loop
    v_other_id := pg_catalog.gen_random_uuid();
    v_other_files := pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
      'name', 'synthetic.pdf', 'size', 8, 'path', v_other_id::text || '/0.pdf'
    ));
    perform public.reserve_project_submission(v_other_id, pg_catalog.lpad(pg_catalog.to_hex(i), 64, '0'), v_payload, v_other_files, 8);
  end loop;
  select count(*) into v_count from public.project_submissions;
  if v_count <> 20 then raise exception 'FAIL: expected exactly 20 synthetic sessions'; end if;
  v_other_id := pg_catalog.gen_random_uuid();
  v_other_files := pg_catalog.jsonb_build_array(pg_catalog.jsonb_build_object(
    'name', 'synthetic.pdf', 'size', 8, 'path', v_other_id::text || '/0.pdf'
  ));
  v_rejected := false;
  begin
    perform public.reserve_project_submission(v_other_id, pg_catalog.repeat('c', 64), v_payload, v_other_files, 8);
  exception when sqlstate 'P0001' then
    if sqlerrm <> 'daily_capacity' then raise; end if;
    v_rejected := true;
  end;
  if not v_rejected then raise exception 'FAIL: twenty-first daily session accepted'; end if;

  insert into pg_temp.fortesa_project_upload_smoke_result values
    ('CHECKS PASSED: RLS/grants/private bucket, worst-case capacity, 8 signing rounds, conflicting retries, completion lease/release and 12-attempt cap, received-byte shrink, 3/IP/hour, 750 MiB capacity and 20/day. Synthetic changes are rolled back below. No files or emails were sent.');
end;
$verify$;

select result from pg_temp.fortesa_project_upload_smoke_result;
rollback;
