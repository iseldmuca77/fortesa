# Architect project uploads

This guide covers Fortesa's architect upload flow, provider configuration, verification and day-to-day operation. Project notifications go to `fortesaalbania@gmail.com`; Fortesa reviews the plans, prepares an itemized quote and replies manually on WhatsApp. The separate `/kontakt` draft flow remains unchanged.

## Visitor and owner workflow

`/dergo-projektin` accepts a name, international WhatsApp number, project area, requested Fortesa services and permission to share the plans. Company and notes are optional. PDF and DWG are accepted, with up to five files and 20 MiB in total. A DWG may be accompanied by a PDF; no CAD rendering, automatic measurement or automatic pricing is implemented.

Files upload directly to a private Supabase bucket; the Vercel function handles small JSON requests. The backend validates the stored sizes and PDF/DWG signatures, records the submission, and asks Resend to email the fixed Fortesa inbox. The email contains project details, original filenames, the private folder reference and a Supabase dashboard link requiring the owner's login. It also contains a WhatsApp draft link to the architect's number. Fortesa manually prepares the itemized quotation and sends it. No public file-download links or automatic WhatsApp sending are used.

Signature validation is not antivirus scanning or proof that a drawing is valid. The owner email explains this. Keep file viewers current and do not run scripts/macros supplied by an uploader.

## Provider configuration and release

The owner completed the free account setup. `supabase/project-uploads.sql` was executed successfully in the authenticated Supabase SQL Editor. `supabase/verify-project-uploads.sql` then reported **CHECKS PASSED** and rolled back its synthetic rows. It verified RLS/minimal grants, the private `architect-projects` bucket and 20 MiB cap, reservations, retry bounds, completion claims and capacity/rate limits. This is actual database execution, not only static review.

The dedicated Resend sending subdomain **projects.fortesa.al** is Verified. The approved DNS records were added while preserving existing website and email records. The sender is `projekte@projects.fortesa.al`, using a sending-only key restricted to that domain. Receiving and tracking remain disabled.

Server credentials are stored in ignored local configuration and Vercel Secret variables. The Supabase value is a modern `sb_secret_` key; the application retains the variable name `SUPABASE_SERVICE_ROLE_KEY` for compatibility. Modern keys belong in the `apikey` header and must not be treated as JWT Bearer tokens. Never expose this variable through `NEXT_PUBLIC_*`, commit its value, or print it in logs.

Release checkpoint, 22 November 2026: all six variables below are saved in the existing Vercel project for **Production**, with the enable flag **false**, and for **Preview scoped only to `codex/architect-project-upload`**, with the flag **true**. The [enabled review preview](https://fortesa-git-codex-architect-project-upload-iselds-projects.vercel.app/dergo-projektin) passed an authorized synthetic PDF/DWG upload and email delivery test. Production activation remains an owner-approved release step; saving variables or deploying a feature branch does not activate production.

```dotenv
PROJECT_UPLOADS_ENABLED=false
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SET_PRIVATELY_IN_VERCEL
PROJECT_UPLOAD_SECRET=GENERATE_A_RANDOM_SECRET_OF_AT_LEAST_32_CHARACTERS
RESEND_API_KEY=SET_PRIVATELY_IN_VERCEL
PROJECT_UPLOAD_FROM=projekte@projects.fortesa.al
```

Production release procedure:

1. Review the actual preview, Albanian wording, technical scope and test results with the owner. Keep production disabled until the release is approved.
2. After approval, set `PROJECT_UPLOADS_ENABLED=true` in Production and deploy the reviewed change through the existing main-branch workflow. Preserve server-only credentials and environment scopes. Current rollback baseline for this release is `737ff314180a0b924701d006fcbc12dbd8e885b7`.
3. Verify the public page, canonical/sitemap behavior and enquiry flow after deployment, using only authorized synthetic data for delivery tests. Check the private-file behavior and clean up the exact test data. A provider acceptance ID alone is not a delivery report. Keep manual queue/capacity review in place; automatic retention remains unconfigured.

Configuration requires a redeploy: the page's availability and sitemap inclusion are rendered at build time. When disabled or missing any required configuration, the API returns 503, the submit button is disabled, the page has noindex, and it is omitted from the sitemap. WhatsApp remains visible as an alternative. No mock-success mode is deployed.

## Limits and failure handling

- Each IP gets at most three new reservations per rolling hour. The whole site gets at most 20 per rolling day. IPs are HMAC-derived before persistence, and trusted forwarded headers are read only on Vercel; local development shares a loopback identity.
- Every signed upload path initially reserves the bucket's **full 20 MiB cap**, not its claimed length. Total reservations stop at 750 MiB, below the Free 1 GB storage allowance. After all immutable objects are verified, one update records receipt and reduces the reservation to actual bytes. Abandoned/invalid reservations keep counting, so capacity fails closed.
- A submission can request at most eight rounds of signed upload URLs. Tokens use `upsert:false`; completed paths cannot be replaced using them. Upload completion expires after two hours. The server returns that expiry; an incomplete expired session restarts while retaining the form and files. Fully uploaded sessions keep their notification retry path. Retried token issuance can leave a token valid until nearly four hours after initial reservation.
- Completion claims serialize validation/notification attempts with a 90-second lease and at most 12 claims. Retries preserve the browser's files and completed upload steps. Header verification reads eight bytes with a Range request, not whole drawings.
- A project is recorded before its email is sent. The browser reports success only after provider acceptance and recording the notification ID. On email error, it explains that files were saved but notification was not confirmed and offers retry/WhatsApp. Received rows skip repeated file verification.
- Resend uses a stable idempotency key per submission. Automatic customer-triggered notification retries stop at 24 hours from reservation, within the provider's idempotency window. Pending rows remain available to the owner. There is no scheduled worker or automatic email retry after the visitor leaves; monitor pending rows manually and investigate before any owner-triggered resend. No inbox-delivery guarantee is made.
- Requests check exact allowed origins, bounded JSON body size, known service values, consent and normalized international phone format. A phone's format does not prove ownership or that WhatsApp is installed.
- No automatic deletion or retention period has been agreed or scheduled. Review the queue and capacity regularly. Delete files and matching reservations only under an approved retention/cleanup decision and only after all upload capabilities have expired (at least four hours from creation for abandoned sessions). Do not delete a row first, undercount live files, or reuse a deleted path while a token remains valid.

## Verification

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run check:projects
node --test --test-isolation=none scripts/check-contact.mjs
# With npm start running:
node scripts/check-blog.mjs http://localhost:3010
```

Verification checkpoint, 22 November 2026: **23 unit tests, full lint and the final production build passed**, including the expiry recovery and exact preview-branch origin checks. Existing-contact and article regression checks also passed. Unit tests use in-memory provider doubles; the separate live-provider checks below establish what was actually exercised.

An owner-authorized local browser test uploaded a 747-byte PDF and a 141-byte DWG fixture through the actual providers. Start/completion returned HTTP 200, the submission was recorded as received, and Resend reported **Delivered** to `fortesaalbania@gmail.com`. This exercised the real metadata/Range verification path. Public and unauthenticated file URL attempts returned HTTP 400. Repeating completion returned HTTP 200 / received without sending another email.

A separate owner-authorized **hosted Vercel preview** browser test then successfully submitted synthetic PDF/DWG files and produced a Resend **Delivered** report to the same inbox. Cleanup is complete for both tests: their exact storage objects and matching synthetic submission rows were removed, and the absence of the test rows was verified. Delivery reports do not show that the owner read the messages or guarantee future inbox placement. Synthetic fixtures do not establish full CAD parsing. No WhatsApp message or quotation was sent. Production activation and its subsequent verification remain separate release steps.

## Official references checked on 22 November 2026

- [Supabase plans](https://supabase.com/pricing): Free storage allowance and inactivity pause. Free projects may pause after one week of inactivity; the owner must be ready to restore service. No keep-alive automation is configured.
- [Storage limits](https://supabase.com/docs/guides/storage/uploads/file-limits), [private bucket access](https://supabase.com/docs/guides/storage/buckets/fundamentals).
- [Supabase API keys](https://supabase.com/docs/guides/api/api-keys#known-limitations): modern server secret keys and header compatibility.
- [Resend Free quotas](https://resend.com/docs/knowledge-base/account-quotas-and-limits): 100 messages/day and 3,000/month; quota is shared with any other account usage.
- [Sender-domain verification](https://resend.com/docs/dashboard/domains/introduction), [email idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).
- [Vercel request limits](https://vercel.com/docs/functions/limitations): default body limit 4.5 MB, the reason plans upload directly to storage.
- [Vercel trusted IP headers](https://vercel.com/docs/headers/request-headers#x-forwarded-for).

Package integration was also checked against the installed Supabase Storage client source. Official online search was unavailable; provider documentation was retrieved over HTTPS for the research.
