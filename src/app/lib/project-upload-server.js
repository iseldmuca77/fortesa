import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import { createClient } from "@supabase/supabase-js";
import { SITE } from "./site.js";
import { PROJECT_SERVICES, cleanProjectDetails, hasProjectFileSignature, validateProjectDetails, validateProjectFiles } from "./project-upload.js";

const BUCKET = "architect-projects";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const MAX_BODY_BYTES = 24000;
const SESSION_MS = 2 * 60 * 60 * 1000;
const MESSAGE = {
  unavailable: "Ngarkimi nuk është aktiv për momentin. Na kontaktoni në WhatsApp.",
  invalid: "Kontrolloni të dhënat dhe skedarët e projektit.",
  expired: "Seanca e ngarkimit ka përfunduar. Provoni ta dërgoni përsëri projektin.",
  rate_limit: "Janë dërguar disa kërkesa nga kjo lidhje. Provoni më vonë ose na kontaktoni në WhatsApp.",
  capacity: "Ngarkimi nuk është i disponueshëm për momentin. Na kontaktoni në WhatsApp për projektin.",
  email_pending: "Projekti u ruajt, por njoftimi për ekipin nuk u konfirmua. Provoni përsëri ose na kontaktoni në WhatsApp.",
};

function configuration() {
  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const secret = process.env.PROJECT_UPLOAD_SECRET || "";
  const resendKey = process.env.RESEND_API_KEY || "";
  const from = process.env.PROJECT_UPLOAD_FROM || "";
  // All values stay server-side; explicit activation follows provider verification.
  if (process.env.PROJECT_UPLOADS_ENABLED !== "true" || !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url) ||
      !key || secret.length < 32 || !resendKey || !/^[^\s<>@]+@(?:[a-z0-9-]+\.)*fortesa\.al$/i.test(from)) return null;
  return { url, key, secret, resendKey, from };
}

export function getProjectUploadAvailability() { return Boolean(configuration()); }

class ProjectError extends Error {
  constructor(code, status = 400, errors) { super(code); this.code = code; this.status = status; this.errors = errors; }
}

function json(data, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

function digest(value) { return createHash("sha256").update(value).digest("hex"); }
export function completionToken(id, secret) { return createHmac("sha256", secret).update(`project-completion:${id}`).digest("hex"); }
function tokenMatches(id, token, secret) {
  return typeof token === "string" && /^[a-f0-9]{64}$/.test(token) && timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(completionToken(id, secret), "hex"));
}

async function boundedJson(request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new ProjectError("invalid", 415);
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) throw new ProjectError("invalid", 413);
  if (!request.body) throw new ProjectError("invalid");
  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > MAX_BODY_BYTES) { await reader.cancel(); throw new ProjectError("invalid", 413); }
      chunks.push(Buffer.from(value));
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || Array.isArray(body) || typeof body !== "object") throw new Error("object required");
    return body;
  } catch (error) {
    if (error instanceof ProjectError) throw error;
    throw new ProjectError("invalid");
  } finally { reader.releaseLock(); }
}

function checkOrigin(request, origins) {
  if (!origins.includes(request.headers.get("origin"))) throw new ProjectError("invalid", 403);
}

function clientAddress(request) {
  if (process.env.VERCEL === "1") {
    // Vercel overwrites this header at its edge. Never accept a client-supplied
    // address on a different host without implementing its trusted proxy rules.
    const ip = (request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "").split(",")[0].trim();
    if (!isIP(ip)) throw new ProjectError("unavailable", 503);
    return ip;
  }
  if (process.env.NODE_ENV === "development") return "127.0.0.1";
  throw new ProjectError("unavailable", 503);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

export function projectNotification(row, config) {
  const projectRef = new URL(config.url).hostname.split(".")[0];
  const storageUrl = `https://supabase.com/dashboard/project/${projectRef}/storage/files/buckets/${BUCKET}`;
  const reply = `https://wa.me/${row.payload.phone.slice(1)}?text=${encodeURIComponent(`Përshëndetje ${row.payload.name}, ju shkruajmë nga Fortesa për projektin në ${row.payload.area}.`)}`;
  const services = row.payload.services.map((value) => PROJECT_SERVICES.find((service) => service.value === value)?.label || value).join(", ");
  const lines = [
    "Projekt i ri për ofertë — Fortesa", `Referenca / dosja: ${row.id}`,
    `Emri: ${row.payload.name}`, `Studioja: ${row.payload.company || "—"}`,
    `WhatsApp: ${row.payload.phone}`, `Zona: ${row.payload.area}`, `Shërbimet: ${services}`,
    `Detaje: ${row.payload.notes || "—"}`, "",
    "Skedarët (dosja private, hyrja me llogarinë Supabase kërkohet):", storageUrl,
    ...row.files.map((file) => `${file.name} — ${file.path}`), "",
    `Hapni bisedën në WhatsApp: ${reply}`, "",
    "Shqyrtoni skedarët dhe përgatitni ofertën me zërat dhe kostot. Lidhja WhatsApp hap vetëm një mesazh paraprak; ofertën e dërgoni vetë.",
    "Skedarët janë ngarkuar nga një vizitor; kontrolli i formatit nuk është skanim antivirus. Hapini me programe të përditësuara dhe pa aktivizuar skripte apo makro.",
  ];
  return {
    from: `Fortesa Projekte <${config.from}>`, to: [SITE.email],
    subject: `Projekt i ri për ofertë · ${row.id.slice(0, 8)}`,
    text: lines.join("\n"),
    html: `<h1>Projekt i ri për ofertë</h1><p><strong>${escapeHtml(row.payload.name)}</strong> · ${escapeHtml(row.payload.area)}</p><p>WhatsApp: ${escapeHtml(row.payload.phone)}</p><p>Shërbimet: ${escapeHtml(services)}</p><p>Studioja: ${escapeHtml(row.payload.company || "—")}</p><p style="white-space:pre-wrap">${escapeHtml(row.payload.notes || "—")}</p><p><a href="${escapeHtml(storageUrl)}">Hapni skedarët privatë në Supabase</a> (kërkohet hyrja me llogarinë tuaj).</p><p>Dosja: <code>${row.id}</code></p><ul>${row.files.map((file) => `<li>${escapeHtml(file.name)} — <code>${escapeHtml(file.path)}</code></li>`).join("")}</ul><p><a href="${escapeHtml(reply)}">Hapni bisedën në WhatsApp</a></p><p>Shqyrtoni projektin dhe përgatitni ofertën me zërat dhe kostot. Mesazhin dhe ofertën i dërgoni vetë.</p><p>Kontrolli i formatit nuk është skanim antivirus. Hapini skedarët me programe të përditësuara dhe pa aktivizuar skripte apo makro.</p>`,
  };
}

function supabaseStore(config) {
  const db = createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (url, options) => {
      const headers = new Headers(options?.headers);
      // Opaque Supabase secret keys authenticate through apikey, not as JWTs.
      // Retain genuine user tokens; remove only the SDK's API-key fallback.
      if (config.key.startsWith("sb_secret_") && headers.get("authorization") === `Bearer ${config.key}`) headers.delete("authorization");
      return fetch(url, { ...options, headers, signal: AbortSignal.timeout(20000) });
    } },
  });
  const storage = db.storage.from(BUCKET);
  const unwrap = ({ data, error }) => { if (error) throw error; return data; };
  return {
    async reserve(id, ipHash, payload, files) {
      try {
        return unwrap(await db.rpc("reserve_project_submission", { p_id: id, p_ip_hash: ipHash, p_payload: payload, p_files: files, p_bytes: files.reduce((sum, file) => sum + file.size, 0) }));
      } catch (error) {
        if (error.message?.includes("ip_rate_limit")) throw new ProjectError("rate_limit", 429);
        if (/daily_capacity|storage_capacity/.test(error.message || "")) throw new ProjectError("capacity", 503);
        if (error.message?.includes("submission_conflict")) throw new ProjectError("invalid", 409);
        throw error;
      }
    },
    async find(id) { return unwrap(await db.from("project_submissions").select("*").eq("id", id).maybeSingle()); },
    async claim(id) {
      try { return unwrap(await db.rpc("claim_project_completion", { p_id: id })); }
      catch (error) {
        if (/completion_busy|completion_limit/.test(error.message || "")) throw new ProjectError("rate_limit", 429);
        throw error;
      }
    },
    async release(id, claim) { unwrap(await db.rpc("release_project_completion", { p_id: id, p_claim: claim })); },
    async sign(path) { return unwrap(await storage.createSignedUploadUrl(path, { upsert: false })); },
    async read(path) {
      const info = unwrap(await storage.info(path));
      const response = await fetch(`${config.url}/storage/v1/object/${BUCKET}/${path}`, {
        headers: { ...(config.key.startsWith("sb_secret_") ? {} : { Authorization: `Bearer ${config.key}` }), apikey: config.key, Range: "bytes=0-7" },
        signal: AbortSignal.timeout(15000), cache: "no-store",
      });
      // Read only the signature; never repeatedly download entire drawings to
      // validate them. Fail closed if the provider ignores the Range request.
      if (response.status !== 206 || response.headers.get("content-range") !== `bytes 0-7/${info.size}`) {
        await response.body?.cancel();
        throw new Error("file_range_not_confirmed");
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.length !== 8) throw new Error("file_header_incomplete");
      return { size: info.size, bytes };
    },
    async received(row) {
      unwrap(await db.from("project_submissions").update({ status: "received", reserved_bytes: row.files.reduce((sum, file) => sum + file.size, 0) }).eq("id", row.id));
    },
    async notified(id, notificationId) {
      unwrap(await db.from("project_submissions").update({ notification_id: notificationId, notified_at: new Date().toISOString(), notification_error: false }).eq("id", id));
    },
    async notificationFailed(id) {
      unwrap(await db.from("project_submissions").update({ notification_error: true }).eq("id", id));
    },
  };
}

async function emailNotification(row, config) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST", signal: AbortSignal.timeout(15000),
    headers: { Authorization: `Bearer ${config.resendKey}`, "Content-Type": "application/json", "Idempotency-Key": `fortesa-project/${row.id}` },
    body: JSON.stringify(projectNotification(row, config)),
  });
  const data = await response.json();
  if (!response.ok || typeof data.id !== "string") throw new Error("notification_not_accepted");
  return data.id;
}

// Dependency injection keeps adverse provider/network cases testable without
// uploading an architect's plans or sending an email during local tests.
export function createProjectService({ config, store, sendEmail, origins, address = clientAddress, now = Date.now }) {
  async function run(request, action) {
    try {
      if (!config) throw new ProjectError("unavailable", 503);
      checkOrigin(request, origins);
      return await action(await boundedJson(request));
    } catch (error) {
      if (error instanceof ProjectError) return json({ code: error.code, message: MESSAGE[error.code] || MESSAGE.invalid, ...(error.errors ? { errors: error.errors } : {}) }, error.status);
      // Do not log request bodies, filenames, telephone numbers, keys or signed URLs.
      console.error("project_upload_provider_error");
      return json({ code: "unavailable", message: MESSAGE.unavailable }, 503);
    }
  }
  return {
    start(request) {
      return run(request, async (body) => {
        const errors = validateProjectDetails(body);
        const fileError = validateProjectFiles(body.files);
        if (fileError) errors.files = fileError;
        if (Object.keys(errors).length || typeof body.requestId !== "string" || !UUID.test(body.requestId)) throw new ProjectError("invalid", 400, errors);
        const id = body.requestId;
        const files = body.files.map((file, index) => ({ name: file.name, size: file.size, path: `${id}/${index}.${file.name.split(".").pop().toLowerCase()}` }));
        const ipHash = digest(createHmac("sha256", config.secret).update(address(request)).digest("hex"));
        const row = await store.reserve(id, ipHash, cleanProjectDetails(body), files);
        if (now() - Date.parse(row.created_at) > SESSION_MS) throw new ProjectError("expired", 410);
        const uploads = await Promise.all(row.files.map(async (file) => {
          const signed = await store.sign(file.path);
          return { path: file.path, signedUrl: signed.signedUrl };
        }));
        return json({ submissionId: row.id, completionToken: completionToken(row.id, config.secret), expiresAt: Date.parse(row.created_at) + SESSION_MS, uploads });
      });
    },
    complete(request) {
      return run(request, async (body) => {
        if (typeof body.submissionId !== "string" || !UUID.test(body.submissionId) || !tokenMatches(body.submissionId, body.completionToken, config.secret)) throw new ProjectError("invalid", 403);
        const row = await store.find(body.submissionId);
        if (!row) throw new ProjectError("invalid", 404);
        if (row.notified_at) return json({ status: "received", submissionId: row.id });
        const age = now() - Date.parse(row.created_at);
        if (row.status !== "received" && age > SESSION_MS) throw new ProjectError("expired", 410);
        // Resend retains idempotency keys for 24h. Stop automatic retries before
        // that window can expire; an owner can investigate the pending row.
        if (row.status === "received" && age >= 24 * 60 * 60 * 1000) throw new ProjectError("email_pending", 503);
        const claim = await store.claim(row.id);
        if (typeof claim !== "string" || !UUID.test(claim)) throw new ProjectError("unavailable", 503);
        try {
          if (row.status !== "received") {
            await Promise.all(row.files.map(async (file) => {
              const actual = await store.read(file.path);
              if (actual.size !== file.size || !hasProjectFileSignature(file.name, actual.bytes)) throw new ProjectError("invalid", 400, { files: "Një skedar nuk përputhet me formatin PDF/DWG ose madhësinë e deklaruar. Hiqeni dhe shtojeni përsëri skedarin e saktë." });
            }));
            await store.received(row);
            row.status = "received";
          }
          try {
            const notificationId = await sendEmail(row, config);
            await store.notified(row.id, notificationId);
          } catch {
            await store.notificationFailed(row.id).catch(() => {});
            throw new ProjectError("email_pending", 503);
          }
          // Receipt + provider acceptance, not a guarantee of Gmail delivery.
          return json({ status: "received", submissionId: row.id });
        } finally {
          await store.release(row.id, claim).catch(() => {});
        }
      });
    },
  };
}

export function projectService() {
  const config = configuration();
  const origins = [SITE.url];
  if (process.env.VERCEL_URL) origins.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.VERCEL_BRANCH_URL) origins.push(`https://${process.env.VERCEL_BRANCH_URL}`);
  if (process.env.NODE_ENV === "development") origins.push("http://localhost:3000", "http://localhost:3010", "http://127.0.0.1:3010");
  return createProjectService({ config, store: config ? supabaseStore(config) : null, sendEmail: emailNotification, origins });
}
