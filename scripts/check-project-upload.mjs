import assert from "node:assert/strict";
import { test } from "node:test";
import {
  PROJECT_LIMITS,
  PROJECT_SERVICES,
  cleanProjectDetails,
  hasProjectFileSignature,
  normalizeProjectPhone,
  validateProjectDetails,
  validateProjectFiles,
} from "../src/app/lib/project-upload.js";
import { completionToken, createProjectService, projectNotification, projectService } from "../src/app/lib/project-upload-server.js";

// All providers below are memory-only. These checks never send mail, upload a
// plan, use an account key or claim that an email reached the real inbox.
const ORIGIN = "https://www.fortesa.al";
const ID = "5d88a78d-c6b1-4bf7-8384-15c89c03b008";
const OTHER_ID = "5d88a78d-c6b1-4bf7-8384-15c89c03b009";
const CLAIM_ID = "5d88a78d-c6b1-4bf7-8384-15c89c03b010";
const TIME = Date.parse("2026-11-22T15:00:00.000Z");
const CONFIG = {
  url: "https://test-only-project.supabase.co",
  secret: "test-only-secret-not-an-account-key-123456789",
  from: "projects@projects.fortesa.al",
};
const PDF = new TextEncoder().encode("%PDF-1.7\nsynthetic test plan");
const DWG = new TextEncoder().encode("AC1032\0\0synthetic test header");
const DETAILS = {
  name: "Arkitekt Test",
  company: "Studio Test",
  phone: "+355 68 123 4567",
  area: "Tiranë",
  services: ["instalime-elektrike", "kamera-sigurie"],
  notes: "Plan provë. Pa klientë ose të dhëna reale.",
  consent: true,
};
const FILES = [{ name: "plani.pdf", size: PDF.length }, { name: "projekti.DWG", size: DWG.length }];
const SUBMISSION = { ...DETAILS, requestId: ID, files: FILES };

function request(body, options = {}) {
  const { origin = ORIGIN, contentType = "application/json", raw = false, extraHeaders = {} } = options;
  return new Request(`${ORIGIN}/api/projects`, {
    method: "POST",
    headers: { ...(origin === null ? {} : { Origin: origin }), "Content-Type": contentType, ...extraHeaders },
    body: raw ? body : JSON.stringify(body),
  });
}

function harness({ enabled = true, age = 0, ...failures } = {}) {
  const rows = new Map();
  const objects = new Map();
  const calls = { reserve: [], sign: [], find: [], read: [], received: [], mail: [], notified: [], failed: [], claim: [], release: [] };
  const state = { ...failures, time: TIME };
  const clone = (value) => structuredClone(value);
  const store = {
    async reserve(id, ipHash, payload, files) {
      calls.reserve.push({ id, ipHash, payload: clone(payload), files: clone(files) });
      if (state.reserveFailure) throw new Error("synthetic storage unavailable");
      if (!rows.has(id)) rows.set(id, {
        id, ip_hash: ipHash, payload: clone(payload), files: clone(files),
        created_at: new Date(TIME - age).toISOString(), status: "uploading",
        notified_at: null, notification_error: false,
      });
      return clone(rows.get(id));
    },
    async find(id) { calls.find.push(id); return rows.has(id) ? clone(rows.get(id)) : null; },
    async claim(id) {
      calls.claim.push(id);
      if (state.claimFailure) throw new Error("synthetic completion claim unavailable");
      if (state.claimBusy) throw new Error("completion_busy");
      return CLAIM_ID;
    },
    async release(id, claim) { calls.release.push({ id, claim }); },
    async sign(path) {
      calls.sign.push(path);
      if (state.signFailure) throw new Error("synthetic signed upload unavailable");
      return { signedUrl: `https://storage.example.invalid/upload/${path}?token=test-only` };
    },
    async read(path) {
      calls.read.push(path);
      if (state.readFailure || !objects.has(path)) throw new Error("synthetic object unavailable");
      const bytes = objects.get(path);
      return { size: bytes.length, bytes: bytes.subarray(0, 8) };
    },
    async received(row) {
      calls.received.push(row.id);
      if (state.receivedFailure) throw new Error("synthetic database unavailable");
      rows.get(row.id).status = "received";
    },
    async notified(id, notificationId) {
      calls.notified.push({ id, notificationId });
      if (state.notifiedFailure) throw new Error("synthetic notification-state failure");
      Object.assign(rows.get(id), { notified_at: new Date(TIME).toISOString(), notification_id: notificationId, notification_error: false });
    },
    async notificationFailed(id) { calls.failed.push(id); rows.get(id).notification_error = true; },
  };
  const service = createProjectService({
    config: enabled ? CONFIG : null, store, origins: [ORIGIN], address: () => "192.0.2.8", now: () => state.time,
    sendEmail: async (row, config) => {
      calls.mail.push({ id: row.id, message: projectNotification(row, config) });
      if (state.emailFailure) throw new Error("synthetic email-provider unavailable");
      return `test-notification-${row.id}`;
    },
  });
  const upload = (data = { [`${ID}/0.pdf`]: PDF, [`${ID}/1.dwg`]: DWG }) => {
    for (const [path, bytes] of Object.entries(data)) objects.set(path, bytes);
  };
  const complete = (id = ID, token = completionToken(id, CONFIG.secret)) => service.complete(request({ submissionId: id, completionToken: token }));
  return { service, rows, objects, calls, state, upload, complete, store };
}

async function expectError(response, status, code) {
  assert.equal(response.status, status);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = await response.json();
  assert.equal(body.code, code);
  assert.notEqual(body.status, "received");
  return body;
}

test("architect details accept explicit international WhatsApp numbers and all known services", () => {
  for (const phone of ["+355 68 123 4567", "00355 (68) 123-4567", "+44 7700 900123"]) {
    assert.equal(Object.keys(validateProjectDetails({ ...DETAILS, phone })).length, 0);
  }
  assert.equal(normalizeProjectPhone(DETAILS.phone), "+355681234567");
  for (const service of PROJECT_SERVICES) assert.deepEqual(validateProjectDetails({ ...DETAILS, services: [service.value] }), {});
  const cleaned = cleanProjectDetails({ ...DETAILS, name: " Arkitekt Test ", company: undefined, notes: undefined, extra: "not stored" });
  assert.equal(cleaned.name, "Arkitekt Test");
  assert.equal(cleaned.phone, "+355681234567");
  assert.equal(cleaned.company, "");
  assert.equal(cleaned.notes, "");
  assert.ok(!("extra" in cleaned));
});

test("validation rejects missing consent, uncontrolled strings and unsupported contact data", () => {
  for (const phone of ["0681234567", "call me", "+000000000", "+355123", "+355681234567x99", "+35568\u00001234567", null, 355681234567]) {
    assert.ok(validateProjectDetails({ ...DETAILS, phone }).phone, `rejected phone ${JSON.stringify(phone)}`);
  }
  for (const key of ["name", "company", "area", "notes", "phone"]) {
    assert.ok(validateProjectDetails({ ...DETAILS, [key]: "x".repeat(PROJECT_LIMITS[key] + 1) })[key]);
    assert.ok(validateProjectDetails({ ...DETAILS, [key]: "hidden\u0000control" })[key]);
  }
  assert.ok(validateProjectDetails({ ...DETAILS, name: "  " }).name);
  assert.ok(validateProjectDetails({ ...DETAILS, area: "  " }).area);
  for (const services of [[], ["invented"], ["kamera-sigurie", "kamera-sigurie"], "kamera-sigurie", null]) {
    assert.ok(validateProjectDetails({ ...DETAILS, services }).services);
  }
  for (const consent of [false, "true", 1, undefined]) assert.ok(validateProjectDetails({ ...DETAILS, consent }).consent);
});

test("file validation enforces PDF/DWG, actual count and aggregate upload budget", () => {
  assert.equal(validateProjectFiles(FILES), "");
  assert.equal(validateProjectFiles([{ name: "sheet.PDF", size: PROJECT_LIMITS.maxTotalBytes }]), "");
  for (const files of [
    [], Array.from({ length: 6 }, () => FILES[0]),
    [{ name: "script.exe", size: 50 }], [{ name: "plan.pdf.exe", size: 50 }],
    [{ name: "../plan.pdf", size: 50 }], [{ name: "dir\\plan.dwg", size: 50 }],
    [{ name: "bad\u0000.pdf", size: 50 }], [{ name: `${"a".repeat(181)}.pdf`, size: 50 }],
    [{ name: "plan.pdf", size: 0 }], [{ name: "plan.pdf", size: 7 }],
    [{ name: "plan.pdf", size: 10.5 }], [{ name: "plan.pdf", size: "123" }],
    [{ name: "plan.pdf", size: PROJECT_LIMITS.maxFileBytes + 1 }],
    [{ name: "plan.pdf", size: PROJECT_LIMITS.maxTotalBytes }, FILES[1]],
    null,
  ]) assert.ok(validateProjectFiles(files), `rejected file selection ${JSON.stringify(files)}`);
  assert.ok(hasProjectFileSignature("plan.pdf", PDF));
  assert.ok(hasProjectFileSignature("plan.DWG", DWG));
  assert.equal(hasProjectFileSignature("renamed.pdf", DWG), false);
  assert.equal(hasProjectFileSignature("renamed.dwg", PDF), false);
  assert.equal(hasProjectFileSignature("plan.exe", PDF), false);
});

test("disabled setup and wrong/missing origins cannot reserve a slot or send email", async () => {
  const off = harness({ enabled: false });
  await expectError(await off.service.start(request(SUBMISSION)), 503, "unavailable");
  assert.equal(off.calls.reserve.length, 0);
  const h = harness();
  for (const origin of ["https://attacker.example", null, "https://fortesa.al.attacker.example"]) {
    await expectError(await h.service.start(request(SUBMISSION, { origin })), 403, "invalid");
  }
  assert.equal(h.calls.reserve.length, 0);
  assert.equal(h.calls.mail.length, 0);
});

test("body parsing rejects non-JSON, malformed JSON and large streamed requests without content length", async () => {
  const h = harness();
  await expectError(await h.service.start(request("not json", { raw: true, contentType: "text/plain" })), 415, "invalid");
  for (const raw of ["{broken", "null", "[]", '"string"']) await expectError(await h.service.start(request(raw, { raw: true })), 400, "invalid");
  const oversized = request({ ...SUBMISSION, notes: "x".repeat(24001) });
  assert.equal(oversized.headers.get("content-length"), null);
  await expectError(await h.service.start(oversized), 413, "invalid");
  await expectError(await h.service.start(request(SUBMISSION, { extraHeaders: { "Content-Length": "24001" } })), 413, "invalid");
  assert.equal(h.calls.reserve.length, 0);
});

test("invalid metadata and structured request IDs are rejected before provider work", async () => {
  const h = harness();
  const invalid = await expectError(await h.service.start(request({ ...SUBMISSION, phone: "local phone", consent: false })), 400, "invalid");
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.consent);
  for (const requestId of ["not-a-uuid", [ID], {}, null]) {
    await expectError(await h.service.start(request({ ...SUBMISSION, requestId })), 400, "invalid");
  }
  assert.equal(h.calls.reserve.length, 0);
});

test("a completed project is recorded before one fixed-recipient notification is accepted", async () => {
  const h = harness();
  const started = await h.service.start(request(SUBMISSION));
  assert.equal(started.status, 200);
  const body = await started.json();
  assert.equal(body.submissionId, ID);
  assert.equal(body.completionToken, completionToken(ID, CONFIG.secret));
  assert.equal(body.expiresAt, TIME + 2 * 60 * 60 * 1000, "the browser gets the reservation's completion deadline as epoch milliseconds");
  assert.deepEqual(body.uploads.map((upload) => upload.path), [`${ID}/0.pdf`, `${ID}/1.dwg`]);
  assert.ok(!JSON.stringify(body).includes(CONFIG.secret));
  assert.match(h.calls.reserve[0].ipHash, /^[a-f0-9]{64}$/);
  assert.ok(!h.calls.reserve[0].ipHash.includes("192.0.2.8"));
  assert.equal(h.calls.reserve[0].payload.phone, "+355681234567");
  h.upload();
  const response = await h.complete();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "received", submissionId: ID });
  assert.equal(h.rows.get(ID).status, "received");
  assert.deepEqual(h.calls.received, [ID]);
  assert.equal(h.calls.read.length, 2);
  assert.equal(h.calls.mail.length, 1);
  assert.deepEqual(h.calls.claim, [ID]);
  assert.deepEqual(h.calls.release, [{ id: ID, claim: CLAIM_ID }]);
  assert.deepEqual(h.calls.mail[0].message.to, ["fortesaalbania@gmail.com"]);
  assert.ok(h.rows.get(ID).notified_at);
  await h.complete();
  assert.equal(h.calls.mail.length, 1, "confirmed retry must not notify again");
  assert.equal(h.calls.read.length, 2, "confirmed retry must not download plans again");
  assert.equal(h.calls.claim.length, 1, "confirmed retry does not need a new completion lease");
});

test("completion authorization is tied to the exact ID and secret", async () => {
  const h = harness();
  await h.service.start(request(SUBMISSION));
  for (const token of ["", "a".repeat(64), completionToken(OTHER_ID, CONFIG.secret), completionToken(ID, "different-secret"), [completionToken(ID, CONFIG.secret)]]) {
    await expectError(await h.complete(ID, token), 403, "invalid");
  }
  await expectError(await h.service.complete(request({ submissionId: [ID], completionToken: completionToken(ID, CONFIG.secret) })), 403, "invalid");
  assert.equal(h.calls.find.length, 0);
  assert.equal(h.calls.read.length, 0);
  assert.equal(h.calls.mail.length, 0);
  await expectError(await h.complete(OTHER_ID), 404, "invalid");
});

test("renamed or incorrectly sized stored files cannot become received projects", async (t) => {
  for (const [name, bytes] of [
    ["wrong size", new Uint8Array([...PDF, 1])],
    ["fake PDF", new TextEncoder().encode("MZ" + "x".repeat(PDF.length - 2))],
  ]) await t.test(name, async () => {
    const h = harness();
    await h.service.start(request(SUBMISSION));
    h.upload();
    h.objects.set(`${ID}/0.pdf`, bytes);
    const result = await expectError(await h.complete(), 400, "invalid");
    assert.ok(result.errors.files);
    assert.notEqual(h.rows.get(ID).status, "received");
    assert.equal(h.calls.received.length, 0);
    assert.equal(h.calls.mail.length, 0);
    assert.deepEqual(h.calls.release, [{ id: ID, claim: CLAIM_ID }], "invalid files must release the held completion claim");
  });
});

test("provider and database failures never produce successful submission acknowledgments", async (t) => {
  t.mock.method(console, "error", () => {});
  for (const key of ["reserveFailure", "signFailure"]) {
    const h = harness({ [key]: true });
    await expectError(await h.service.start(request(SUBMISSION)), 503, "unavailable");
    assert.equal(h.calls.mail.length, 0);
  }
  for (const key of ["readFailure", "receivedFailure"]) {
    const h = harness({ [key]: true });
    await h.service.start(request(SUBMISSION));
    h.upload();
    await expectError(await h.complete(), 503, "unavailable");
    assert.equal(h.calls.mail.length, 0);
    assert.deepEqual(h.calls.release, [{ id: ID, claim: CLAIM_ID }], "provider failure must release the held completion claim");
  }
});

test("a denied completion claim blocks file reads and notifications", async (t) => {
  t.mock.method(console, "error", () => {});
  for (const key of ["claimBusy", "claimFailure"]) {
    const h = harness({ [key]: true });
    await h.service.start(request(SUBMISSION));
    h.upload();
    await expectError(await h.complete(), 503, "unavailable");
    assert.deepEqual(h.calls.claim, [ID]);
    assert.equal(h.calls.read.length, 0);
    assert.equal(h.calls.received.length, 0);
    assert.equal(h.calls.mail.length, 0);
    assert.equal(h.calls.release.length, 0, "a caller without a claim must not release another caller's lease");
  }
});

test("saved projects with a failed notification retry email without re-upload or file downloads", async () => {
  const h = harness({ emailFailure: true });
  await h.service.start(request(SUBMISSION));
  h.upload();
  await expectError(await h.complete(), 503, "email_pending");
  assert.equal(h.rows.get(ID).status, "received");
  assert.equal(h.rows.get(ID).notification_error, true);
  assert.equal(h.rows.get(ID).notified_at, null);
  assert.deepEqual(h.calls.release, [{ id: ID, claim: CLAIM_ID }]);
  const firstMessage = h.calls.mail[0].message;
  h.state.emailFailure = false;
  assert.equal((await h.complete()).status, 200);
  assert.equal(h.calls.read.length, 2);
  assert.equal(h.calls.received.length, 1);
  assert.equal(h.calls.mail.length, 2);
  assert.equal(h.calls.mail[0].id, h.calls.mail[1].id);
  assert.deepEqual(h.calls.mail[1].message, firstMessage, "retry must preserve provider idempotency payload");
  assert.equal(h.rows.get(ID).notification_error, false);
  assert.ok(h.rows.get(ID).notified_at);
  assert.equal(h.calls.release.length, 2);
});

test("lost notification-state writes remain pending until a consistent retry succeeds", async () => {
  const h = harness({ notifiedFailure: true });
  await h.service.start(request(SUBMISSION));
  h.upload();
  await expectError(await h.complete(), 503, "email_pending");
  h.state.notifiedFailure = false;
  assert.equal((await h.complete()).status, 200);
  assert.deepEqual(h.calls.mail[0], h.calls.mail[1], "same submission and content allow provider idempotency on retry");
  assert.equal(h.calls.read.length, 2);
});

test("expired upload sessions cannot sign new URLs or complete unfinished projects", async () => {
  const h = harness({ age: 2 * 60 * 60 * 1000 + 1 });
  await expectError(await h.service.start(request(SUBMISSION)), 410, "expired");
  assert.equal(h.calls.sign.length, 0);
  h.upload();
  await expectError(await h.complete(), 410, "expired");
  assert.equal(h.calls.read.length, 0);
  assert.equal(h.calls.mail.length, 0);
  assert.equal(h.calls.claim.length, 0);
});

test("retrying upload preparation preserves the original expiry instead of extending the session", async () => {
  const h = harness({ age: 90 * 60 * 1000 });
  const first = await h.service.start(request(SUBMISSION));
  assert.equal(first.status, 200);
  const firstBody = await first.json();
  assert.equal(firstBody.expiresAt, TIME + 30 * 60 * 1000);
  h.state.time += 10 * 60 * 1000;
  const retry = await h.service.start(request(SUBMISSION));
  assert.equal(retry.status, 200);
  const retryBody = await retry.json();
  assert.equal(retryBody.submissionId, firstBody.submissionId);
  assert.equal(retryBody.expiresAt, firstBody.expiresAt);
  assert.equal(h.rows.size, 1);
});

test("a saved project can retry notification after two hours but within the provider idempotency window", async () => {
  const h = harness({ emailFailure: true });
  await h.service.start(request(SUBMISSION));
  h.upload();
  await expectError(await h.complete(), 503, "email_pending");
  h.state.time = TIME + 3 * 60 * 60 * 1000;
  h.state.emailFailure = false;
  assert.equal((await h.complete()).status, 200);
  assert.equal(h.calls.read.length, 2, "late retry uses the already stored project");
  assert.equal(h.calls.mail.length, 2);
  assert.deepEqual(h.calls.mail[0], h.calls.mail[1]);
  assert.ok(h.rows.get(ID).notified_at);
});

test("a pending notification is not resent once its 24-hour idempotency window has ended", async () => {
  const h = harness({ emailFailure: true });
  await h.service.start(request(SUBMISSION));
  h.upload();
  await expectError(await h.complete(), 503, "email_pending");
  h.state.time = TIME + 24 * 60 * 60 * 1000;
  h.state.emailFailure = false;
  await expectError(await h.complete(), 503, "email_pending");
  assert.equal(h.calls.mail.length, 1);
  assert.equal(h.calls.read.length, 2);
  assert.equal(h.calls.claim.length, 1);
  assert.equal(h.rows.get(ID).status, "received");
  assert.equal(h.rows.get(ID).notification_error, true);
});

test("notification escapes visitor text, never changes recipient, and opens only the declared WhatsApp number", () => {
  const payload = cleanProjectDetails({ ...DETAILS, name: '<img src=x onerror="alert(1)">', company: "A&B", notes: "<script>bad()</script>\nDetajet", area: 'Qytet <test> "quoted"' });
  const row = { id: ID, payload, files: [{ name: '<img src=x>.pdf', size: PDF.length, path: `${ID}/0.pdf` }] };
  const message = projectNotification(row, CONFIG);
  assert.deepEqual(message.to, ["fortesaalbania@gmail.com"]);
  assert.equal(message.subject, `Projekt i ri për ofertë · ${ID.slice(0, 8)}`);
  assert.ok(!message.html.includes("<script>"));
  assert.ok(!message.html.includes("<img"));
  assert.ok(message.html.includes("&lt;script&gt;bad()&lt;/script&gt;"));
  assert.ok(message.html.includes("A&amp;B"));
  const urlText = message.text.split("\n").find((line) => line.startsWith("Hapni bisedën në WhatsApp: ")).replace("Hapni bisedën në WhatsApp: ", "");
  const replyUrl = new URL(urlText);
  assert.equal(replyUrl.origin, "https://wa.me");
  assert.equal(replyUrl.pathname, "/355681234567");
  assert.deepEqual([...replyUrl.searchParams.keys()], ["text"]);
  assert.ok(replyUrl.searchParams.get("text").includes(payload.name));
  assert.ok(message.text.includes("https://supabase.com/dashboard/project/test-only-project/storage/files/buckets/architect-projects"));
  assert.ok(!message.html.includes("token="), "notification uses an authenticated owner view, not a bearer file link");
});

test("Supabase transport uses opaque secret keys as apikey and retains legacy JWT authorization", async (t) => {
  for (const key of ["sb_secret_fixture_only_not_a_real_key", "eyJ.fixture_only.synthetic_legacy_jwt"]) {
    await t.test(key.startsWith("sb_secret_") ? "modern opaque key" : "legacy JWT key", async (t) => {
      const environment = {
        PROJECT_UPLOADS_ENABLED: "true", SUPABASE_URL: CONFIG.url,
        SUPABASE_SERVICE_ROLE_KEY: key, PROJECT_UPLOAD_SECRET: CONFIG.secret,
        RESEND_API_KEY: "re_fixture_only_not_a_real_key", PROJECT_UPLOAD_FROM: CONFIG.from,
        VERCEL: "1", VERCEL_URL: "fortesa-fixture-deployment.vercel.app",
        VERCEL_BRANCH_URL: "fortesa-git-fixture-owner.vercel.app",
      };
      const previous = Object.fromEntries(Object.keys(environment).map((name) => [name, process.env[name]]));
      const calls = [];
      let row;
      // Intercept every fetch before creating the real adapter. Unexpected
      // requests throw here; none can fall through to an actual provider.
      t.mock.method(globalThis, "fetch", async (url, options = {}) => {
        const parsed = new URL(String(url));
        const headers = new Headers(options.headers);
        const method = options.method || "GET";
        calls.push({ url: parsed, headers, method });
        if (parsed.origin === CONFIG.url) {
          const route = parsed.pathname;
          if (route === "/rest/v1/rpc/reserve_project_submission") {
            const body = JSON.parse(options.body);
            row = { id: body.p_id, payload: body.p_payload, files: body.p_files, created_at: new Date().toISOString(), status: "uploading", notified_at: null };
            return Response.json(row);
          }
          if (route === "/rest/v1/project_submissions" && method === "GET") return Response.json([row]);
          if (route === "/rest/v1/project_submissions" && method === "PATCH") {
            Object.assign(row, JSON.parse(options.body));
            return new Response(null, { status: 204 });
          }
          if (route === "/rest/v1/rpc/claim_project_completion") return Response.json(CLAIM_ID);
          if (route === "/rest/v1/rpc/release_project_completion") return Response.json(null);
          if (route.startsWith("/storage/v1/object/upload/sign/")) {
            return Response.json({ url: `${route.replace("/storage/v1", "")}?token=fixture-only` });
          }
          const bytes = route.endsWith(".pdf") ? PDF : DWG;
          if (route.startsWith("/storage/v1/object/info/architect-projects/")) return Response.json({ size: bytes.length });
          if (route.startsWith("/storage/v1/object/architect-projects/")) {
            assert.equal(headers.get("range"), "bytes=0-7");
            return new Response(bytes.subarray(0, 8), { status: 206, headers: { "Content-Range": `bytes 0-7/${bytes.length}` } });
          }
        }
        if (parsed.href === "https://api.resend.com/emails") {
          assert.equal(headers.get("authorization"), "Bearer re_fixture_only_not_a_real_key");
          assert.equal(headers.get("idempotency-key"), `fortesa-project/${ID}`);
          assert.deepEqual(JSON.parse(options.body).to, ["fortesaalbania@gmail.com"]);
          return Response.json({ id: "fixture-notification" });
        }
        throw new Error(`Unexpected mocked provider route: ${parsed.origin}${parsed.pathname}`);
      });
      try {
        Object.assign(process.env, environment);
        const service = projectService();
        const branchOrigin = `https://${environment.VERCEL_BRANCH_URL}`;
        for (const origin of [`${branchOrigin}.attacker.example`, "https://unrelated-preview.vercel.app", `http://${environment.VERCEL_BRANCH_URL}`]) {
          await expectError(await service.start(request(SUBMISSION, { origin })), 403, "invalid");
          await expectError(await service.complete(request({ submissionId: ID, completionToken: completionToken(ID, CONFIG.secret) }, { origin })), 403, "invalid");
        }
        assert.equal(calls.length, 0, "untrusted lookalike/other preview origins must stop before provider work");
        const started = await service.start(request(SUBMISSION, { origin: branchOrigin, extraHeaders: { "x-vercel-forwarded-for": "192.0.2.8" } }));
        assert.equal(started.status, 200);
        const startedBody = await started.json();
        assert.equal(startedBody.expiresAt, Date.parse(row.created_at) + 2 * 60 * 60 * 1000);
        const completed = await service.complete(request({ submissionId: ID, completionToken: startedBody.completionToken }, { origin: branchOrigin }));
        assert.equal(completed.status, 200);
        assert.equal((await completed.json()).status, "received");
        const supabaseCalls = calls.filter((call) => call.url.origin === CONFIG.url);
        assert.ok(supabaseCalls.length > 5);
        for (const call of supabaseCalls) {
          assert.equal(call.headers.get("apikey"), key);
          assert.equal(call.headers.get("authorization"), key.startsWith("sb_secret_") ? null : `Bearer ${key}`, call.url.pathname);
        }
        assert.equal(calls.filter((call) => call.headers.has("range")).length, 2, "both file signatures use bounded range reads");
        assert.equal(calls.filter((call) => call.url.origin === "https://api.resend.com").length, 1);
        assert.ok(row.notified_at);
      } finally {
        for (const [name, value] of Object.entries(previous)) {
          if (value === undefined) delete process.env[name];
          else process.env[name] = value;
        }
      }
    });
  }
});
