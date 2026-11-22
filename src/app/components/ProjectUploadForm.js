"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "../lib/site";
import {
  PROJECT_LIMITS,
  PROJECT_SERVICES,
  formatBytes,
  validateProjectDetails,
  validateProjectFiles,
} from "../lib/project-upload";

const FIELD = "w-full rounded-lg border border-cream-3 bg-cream px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold/40";
const EMPTY_FORM = { name: "", company: "", phone: "", area: "", services: [], notes: "", consent: false };
const FAILURE_MESSAGE = "Dorëzimi nuk u konfirmua. Të dhënat dhe skedarët tuaj janë ende këtu. Provoni përsëri ose na kontaktoni në WhatsApp.";
const API_MESSAGES = {
  email_pending: "Projekti dhe skedarët u ruajtën, por njoftimi për Fortesa ende nuk u konfirmua. Shtypni përsëri Dërgo projektin për të riprovuar njoftimin. Skedarët e ngarkuar nuk kanë nevojë të dërgohen përsëri.",
  expired: "Koha për këtë ngarkim ka përfunduar. Të dhënat dhe skedarët tuaj mbeten këtu. Shtypni Dërgo projektin për të nisur një ngarkim të ri.",
  capacity: "Ngarkimi nuk është i disponueshëm për momentin. Ju lutemi na kontaktoni në WhatsApp për ta dërguar projektin.",
  rate_limit: "Janë bërë disa përpjekje për ngarkim në një kohë të shkurtër. Prisni pak dhe provoni përsëri, ose na kontaktoni në WhatsApp.",
};

function FieldError({ id, children }) {
  return children ? <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-800">{children}</p> : null;
}

function Input({ label, name, hint, error, ...props }) {
  const id = `project-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label>
      {hint && <p id={`${id}-hint`} className="mb-2 text-sm text-muted">{hint}</p>}
      <input id={id} name={name} className={`${FIELD} ${error ? "border-red-700" : ""}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined}
        {...props} />
      <FieldError id={id}>{error}</FieldError>
    </div>
  );
}

async function fetchWithin(url, options, timeout = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function postJson(url, body, timeout) {
  const response = await fetchWithin(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }, timeout);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || Object.hasOwn(API_MESSAGES, data.code)) {
    const error = new Error(API_MESSAGES[data.code] || FAILURE_MESSAGE);
    error.code = typeof data.code === "string" ? data.code : "";
    error.fieldErrors = data.errors;
    throw error;
  }
  return data;
}

export default function ProjectUploadForm({ enabled = false }) {
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState("");
  const [fileStates, setFileStates] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [received, setReceived] = useState(false);
  const formRef = useRef(null);
  const successRef = useRef(null);
  const requestIdRef = useRef(null);
  const sessionRef = useRef(null);
  const submittingRef = useRef(false);

  useEffect(() => { setReady(true); }, []);
  useEffect(() => { if (received) successRef.current?.focus(); }, [received]);

  const resetSubmission = () => {
    requestIdRef.current = null;
    sessionRef.current = null;
    setFileStates([]);
    setFeedback("");
    setStage("");
  };

  const onChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    resetSubmission();
  };

  const toggleService = (value, checked) => {
    setForm((previous) => ({ ...previous, services: checked ? [...previous.services, value] : previous.services.filter((service) => service !== value) }));
    setErrors((previous) => ({ ...previous, services: undefined }));
    resetSubmission();
  };

  const chooseFiles = (event) => {
    const selected = Array.from(event.target.files || []);
    const nextFiles = [...files];
    for (const file of selected) {
      if (!nextFiles.some((existing) => existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified)) {
        nextFiles.push(file);
      }
    }
    setFiles(nextFiles);
    setErrors((previous) => ({ ...previous, files: validateProjectFiles(nextFiles) || undefined }));
    event.target.value = "";
    resetSubmission();
  };

  const removeFile = (index) => {
    const nextFiles = files.filter((_, fileIndex) => index !== fileIndex);
    setFiles(nextFiles);
    setErrors((previous) => ({ ...previous, files: nextFiles.length ? validateProjectFiles(nextFiles) || undefined : undefined }));
    resetSubmission();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!ready || !enabled || submittingRef.current) return;
    const nextErrors = { ...validateProjectDetails(form) };
    const fileError = validateProjectFiles(files);
    if (fileError) nextErrors.files = fileError;
    setErrors(nextErrors);
    const firstInvalid = ["name", "company", "phone", "area", "services", "files", "notes", "consent"].find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[data-focus="${firstInvalid}"]`)?.focus();
      setFeedback("Kontrolloni fushat e shënuara më poshtë. Projekti nuk është dorëzuar.");
      return;
    }

    submittingRef.current = true;
    setBusy(true);
    setFeedback("");
    try {
      let session = sessionRef.current;
      // An incomplete upload needs new signed URLs after its reservation expires.
      // Fully uploaded files can still retry their pending email notification.
      if (session && session.uploaded.size < files.length && Date.now() >= session.expiresAt) {
        session = null;
        sessionRef.current = null;
        requestIdRef.current = null;
        setFileStates([]);
      }
      if (!session) {
        setStage("Po përgatitet ngarkimi…");
        requestIdRef.current ||= crypto.randomUUID();
        const result = await postJson("/api/projects", {
          ...form,
          files: files.map(({ name, size, type }) => ({ name, size, type })),
          requestId: requestIdRef.current,
        });
        if (!result.submissionId || !result.completionToken || !Number.isFinite(result.expiresAt) || !Array.isArray(result.uploads) || result.uploads.length !== files.length || result.uploads.some((upload) => typeof upload.signedUrl !== "string")) {
          throw new Error(FAILURE_MESSAGE);
        }
        session = { ...result, uploaded: new Set() };
        sessionRef.current = session;
        setFileStates(files.map(() => "waiting"));
      }

      for (let index = 0; index < files.length; index += 1) {
        if (session.uploaded.has(index)) continue;
        if (Date.now() >= session.expiresAt) {
          const error = new Error(API_MESSAGES.expired);
          error.code = "expired";
          throw error;
        }
        setStage(`Po ngarkohet skedari ${index + 1} nga ${files.length}…`);
        setFileStates((previous) => previous.map((state, fileIndex) => index === fileIndex ? "uploading" : state));
        const response = await fetchWithin(session.uploads[index].signedUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/octet-stream", "x-upsert": "false" },
          body: files[index],
        }, 120000);
        if (!response.ok) {
          const uploadError = await response.json().catch(() => ({}));
          // The first PUT may have succeeded even if its response was lost.
          // Completion still verifies the stored file's size and signature.
          if (response.status !== 409 && uploadError.error !== "Duplicate") {
            throw new Error(FAILURE_MESSAGE);
          }
        }
        session.uploaded.add(index);
        setFileStates((previous) => previous.map((state, fileIndex) => index === fileIndex ? "uploaded" : state));
      }

      setStage("Po konfirmohet dorëzimi i projektit…");
      const result = await postJson("/api/projects/complete", {
        submissionId: session.submissionId,
        completionToken: session.completionToken,
      }, 45000);
      if (result.status !== "received") throw new Error(FAILURE_MESSAGE);
      setReceived(true);
      setStage("");
    } catch (error) {
      if (error.fieldErrors && typeof error.fieldErrors === "object") {
        const safeErrors = Object.fromEntries(Object.entries(error.fieldErrors).filter(([key, value]) => [...Object.keys(EMPTY_FORM), "files"].includes(key) && typeof value === "string"));
        setErrors(safeErrors);
      }
      setFeedback(error.name === "AbortError" ? "Lidhja zgjati më shumë se pritej dhe dorëzimi nuk u konfirmua. Provoni përsëri; të dhënat dhe skedarët tuaj janë ende këtu." : API_MESSAGES[error.code] || FAILURE_MESSAGE);
      setStage("");
      if (error.code === "expired") {
        sessionRef.current = null;
        requestIdRef.current = null;
        setFileStates([]);
      } else {
        setFileStates((previous) => previous.map((state) => state === "uploading" ? "waiting" : state));
      }
    } finally {
      submittingRef.current = false;
      setBusy(false);
    }
  };

  if (received) {
    return (
      <div ref={successRef} tabIndex={-1} className="rounded-2xl border border-gold/40 bg-cream p-6 focus:outline-none sm:p-8">
        <p className="eyebrow eyebrow-deep">Kërkesa u regjistrua</p>
        <h2 className="mt-4 font-display text-2xl font-extrabold">Projekti u dorëzua</h2>
        <p className="mt-4 leading-relaxed text-muted">Fortesa do ta shqyrtojë dhe do t’ju kontaktojë në numrin e WhatsApp që keni dhënë, për të sqaruar detajet dhe ofertën për shërbimet e kërkuara.</p>
        <p className="mt-3 text-sm text-muted">Oferta përgatitet nga ekipi pas shqyrtimit të projektit.</p>
        <button type="button" className="btn btn-deep mt-6" onClick={() => {
          setReceived(false); setForm(EMPTY_FORM); setFiles([]); setErrors({}); resetSubmission();
        }}>Dërgo një projekt tjetër</button>
      </div>
    );
  }

  const uploadedCount = fileStates.filter((state) => state === "uploaded").length;
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate method="post" className="space-y-6">
      {!enabled && (
        <div className="rounded-xl border border-gold/50 bg-cream p-5 text-sm leading-relaxed">
          <p className="font-bold text-ink">Ngarkimi i projekteve nuk është aktiv për momentin.</p>
          <p className="mt-2 text-muted">Mund ta shqyrtoni formularin, por skedarët nuk dërgohen. Për projektin tuaj, <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">na kontaktoni në WhatsApp</a>.</p>
        </div>
      )}
      <p className="text-sm text-muted">Fushat me * janë të detyrueshme.</p>
      <fieldset disabled={!ready || busy} className="min-w-0 space-y-7 disabled:opacity-70">
        <legend className="sr-only">Të dhënat dhe skedarët e projektit</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Emri dhe mbiemri *" name="name" type="text" autoComplete="name" required maxLength={PROJECT_LIMITS.name}
            value={form.name} onChange={onChange} error={errors.name} data-focus="name" />
          <Input label="Studioja / kompania" name="company" type="text" autoComplete="organization" maxLength={PROJECT_LIMITS.company}
            value={form.company} onChange={onChange} error={errors.company} data-focus="company" />
        </div>
        <Input label="Numri i WhatsApp *" name="phone" type="tel" autoComplete="tel" placeholder="+355 6X XXX XXXX" required maxLength={PROJECT_LIMITS.phone}
          hint="Këtu do t’ju kontaktojmë për projektin dhe ofertën. Përfshini prefiksin e shtetit."
          value={form.phone} onChange={onChange} error={errors.phone} data-focus="phone" />
        <Input label="Qyteti ose zona e projektit *" name="area" type="text" autoComplete="address-level2" placeholder="P.sh. Tiranë, Komuna e Parisit" required maxLength={PROJECT_LIMITS.area}
          value={form.area} onChange={onChange} error={errors.area} data-focus="area" />

        <fieldset aria-describedby={errors.services ? "project-services-error" : undefined}>
          <legend className="mb-3 text-sm font-semibold">Për cilat shërbime kërkoni ofertë? *</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROJECT_SERVICES.map((service, index) => (
              <label key={service.value} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm leading-relaxed transition ${form.services.includes(service.value) ? "border-gold-dark bg-cream" : "border-cream-3 bg-white"}`}>
                <input type="checkbox" name="services" value={service.value} checked={form.services.includes(service.value)}
                  data-focus={index === 0 ? "services" : undefined}
                  aria-invalid={errors.services ? true : undefined}
                  onChange={(event) => toggleService(service.value, event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-gold-deep" />
                <span>{service.label}</span>
              </label>
            ))}
          </div>
          <FieldError id="project-services">{errors.services}</FieldError>
        </fieldset>

        <div className="rounded-xl border border-dashed border-gold-dark/60 bg-cream/60 p-5 sm:p-6">
          <label htmlFor="project-files" className="block text-base font-bold">Skedarët e projektit *</label>
          <p id="project-files-hint" className="mt-2 text-sm leading-relaxed text-muted">PDF ose DWG · deri në {PROJECT_LIMITS.maxFiles} skedarë · {formatBytes(PROJECT_LIMITS.maxTotalBytes)} gjithsej. Nëse dërgoni DWG, mund të shtoni edhe një kopje PDF për shqyrtim më të lehtë.</p>
          <input id="project-files" name="files" type="file" multiple accept=".pdf,.dwg,application/pdf" data-focus="files" onChange={chooseFiles}
            aria-invalid={errors.files ? true : undefined} aria-describedby={`project-files-hint${errors.files ? " project-files-error" : ""}`}
            className="mt-4 block w-full max-w-full text-sm text-muted file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-ink file:px-4 file:py-3 file:font-semibold file:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark" />
          <FieldError id="project-files">{errors.files}</FieldError>
          {files.length > 0 && (
            <ul className="mt-5 divide-y divide-cream-3 rounded-lg border border-cream-3 bg-white">
              {files.map((file, index) => (
                <li key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0 text-sm">
                    <p className="break-all font-semibold">{file.name}</p>
                    <p className="mt-1 text-xs text-muted">{formatBytes(file.size)}{fileStates[index] === "uploaded" ? " · U ngarkua" : fileStates[index] === "uploading" ? " · Po ngarkohet…" : ""}</p>
                  </div>
                  <button type="button" onClick={() => removeFile(index)} aria-label={`Hiq skedarin ${file.name}`} className="shrink-0 rounded px-2 py-1 text-xs font-semibold text-muted underline underline-offset-4 hover:text-ink">Hiq</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="project-notes" className="mb-2 block text-sm font-semibold">Detaje shtesë</label>
          <p id="project-notes-hint" className="mb-2 text-sm text-muted">P.sh. lloji i objektit, faza e projektit dhe punimet që ju nevojiten.</p>
          <textarea id="project-notes" name="notes" rows={4} maxLength={PROJECT_LIMITS.notes} value={form.notes} onChange={onChange} data-focus="notes"
            aria-invalid={errors.notes ? true : undefined} aria-describedby={`project-notes-hint${errors.notes ? " project-notes-error" : ""}`}
            className={`${FIELD} ${errors.notes ? "border-red-700" : ""}`} />
          <FieldError id="project-notes">{errors.notes}</FieldError>
        </div>

        <div>
          <label htmlFor="project-consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
            <input id="project-consent" name="consent" type="checkbox" required checked={form.consent} onChange={onChange} data-focus="consent"
              aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "project-consent-error" : undefined}
              className="mt-1 h-4 w-4 shrink-0 accent-gold-deep" />
            <span>Konfirmoj se kam të drejtë t’i ndaj këta skedarë me Fortesa për shqyrtimin e projektit dhe përgatitjen e ofertës. Fortesa mund të më kontaktojë në WhatsApp për këtë kërkesë. *</span>
          </label>
          <FieldError id="project-consent">{errors.consent}</FieldError>
        </div>
        <button type="submit" disabled={!enabled || !ready || busy} className="btn btn-deep w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{busy ? "Duke dorëzuar projektin…" : "Dërgo projektin"}</button>
      </fieldset>

      {busy && <div role="status" className="rounded-lg bg-cream p-4 text-sm">
        <p className="font-semibold">{stage}</p>
        {files.length > 0 && <><progress max={files.length} value={uploadedCount} aria-label="Skedarët e ngarkuar" className="mt-3 h-2 w-full accent-gold-deep" /><p className="mt-2 text-muted">{uploadedCount} nga {files.length} skedarë të ngarkuar. Mbajeni faqen hapur deri në konfirmim.</p></>}
      </div>}
      {feedback && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-900"><p>{feedback}</p><a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex font-semibold underline underline-offset-4">Kontaktoni Fortesa në WhatsApp</a></div>}
      <noscript><p className="rounded-lg border border-gold/40 bg-cream p-4 text-sm leading-relaxed">Ngarkimi kërkon JavaScript. Mund <a href={SITE.whatsappHref} className="font-semibold underline">të na kontaktoni në WhatsApp</a> ose <a href={SITE.phoneHref} className="font-semibold underline">të telefononi {SITE.phoneDisplay}</a>.</p></noscript>
    </form>
  );
}
