"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES, SITE } from "../lib/site";
import {
  CONTACT_LIMITS,
  contactMailto,
  contactServiceFromQuery,
  contactWhatsApp,
  formatContactInquiry,
  validateContact,
} from "../lib/contact-helpers";

const FIELD =
  "w-full rounded-lg border border-cream-3 bg-cream px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold/40";

function FieldError({ id, children }) {
  return children ? <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-800">{children}</p> : null;
}

function Field({ label, id, error, hint, className = "", ...props }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label>
      {hint && <p id={`${id}-hint`} className="mb-2 text-sm text-muted">{hint}</p>}
      <input
        id={id}
        className={`${FIELD} ${error ? "border-red-700" : ""} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      <FieldError id={id}>{error}</FieldError>
    </div>
  );
}

// Keep the form and contact page statically rendered; only this query reader
// needs the client-side search parameters inside its Suspense boundary.
function ServicePrefill({ onService }) {
  const searchParams = useSearchParams();
  const service = searchParams.get("sherbimi");
  useEffect(() => {
    onService(contactServiceFromQuery(service, SERVICES));
  }, [service, onService]);
  return null;
}

export default function ContactForm() {
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({
    name: "", service: "", area: "", phone: "", email: "", preferredContact: "any", message: "",
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [copying, setCopying] = useState(false);
  const [showText, setShowText] = useState(false);
  const serviceEdited = useRef(false);
  const formRef = useRef(null);
  const copyRef = useRef(null);

  // Native form submission defaults to a GET. Keep every control disabled
  // until the draft-only handlers are attached, including implicit Enter.
  useEffect(() => {
    setReady(true);
  }, []);

  const prefillService = useCallback((service) => {
    if (!serviceEdited.current) setForm((previous) => ({ ...previous, service }));
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "service") serviceEdited.current = true;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => (
      ["phone", "email", "preferredContact"].includes(name)
        ? { ...previous, phone: undefined, email: undefined }
        : { ...previous, [name]: undefined }
    ));
    setFeedback("");
  };

  const isValid = () => {
    const nextErrors = validateContact(form, SERVICES);
    setErrors(nextErrors);
    const firstInvalidField = ["name", "service", "area", "phone", "email", "message"].find((field) => nextErrors[field]);
    if (firstInvalidField) {
      setFeedback("");
      formRef.current?.elements.namedItem(firstInvalidField)?.focus();
      return false;
    }
    return true;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isValid()) return;
    // Preparing a message does not establish that an application opened, or
    // that a message was sent, accepted or delivered.
    if (event.nativeEvent.submitter?.value === "email") {
      setFeedback("Emaili është përgatitur. Nëse u hap programi juaj i emailit, kontrolloni mesazhin dhe dërgojeni atje. Nëse nuk u hap, kopjoni tekstin më poshtë dhe dërgojeni te adresa jonë.");
      window.location.href = contactMailto(form, SERVICES, SITE.email);
    } else {
      setFeedback("Mesazhi për WhatsApp është përgatitur. Nëse u hap WhatsApp, kontrollojeni dhe dërgojeni atje. Nëse nuk u hap, kopjoni tekstin e kërkesës ose përdorni emailin.");
      window.open(contactWhatsApp(form, SERVICES, SITE.whatsappHref), "_blank", "noopener,noreferrer");
    }
  };

  const onCopy = async () => {
    if (!isValid()) return;
    setCopying(true);
    setShowText(true);
    try {
      await navigator.clipboard.writeText(formatContactInquiry(form, SERVICES));
      setFeedback("Teksti u kopjua. Vendoseni në WhatsApp ose email dhe dërgojeni vetë. Kopjimi nuk e dërgon kërkesën.");
    } catch {
      setFeedback("Kopjimi automatik nuk u lejua. Përzgjidhni dhe kopjoni tekstin e kërkesës më poshtë, pastaj dërgojeni në WhatsApp ose me email.");
      requestAnimationFrame(() => { copyRef.current?.focus(); copyRef.current?.select(); });
    } finally {
      setCopying(false);
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8">
      <Suspense fallback={null}><ServicePrefill onService={prefillService} /></Suspense>
      <fieldset disabled={!ready} aria-label="Përgatitja e kërkesës" className="m-0 min-w-0 space-y-5 border-0 p-0">
      <p className="text-sm text-muted">Fushat me * janë të detyrueshme. Jepni të paktën një mënyrë kontakti: telefon ose email.</p>
      {hasErrors && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">Kontrolloni fushat e shënuara më poshtë.</p>}

      <Field label="Emri *" id="name" name="name" type="text" value={form.name} onChange={onChange}
        placeholder="Emri juaj" autoComplete="name" maxLength={CONTACT_LIMITS.name} required error={errors.name} />

      <div>
        <label htmlFor="service" className="mb-2 block text-sm font-semibold">Shërbimi që ju nevojitet *</label>
        <select id="service" name="service" value={form.service} onChange={onChange} required
          className={`${FIELD} ${errors.service ? "border-red-700" : ""}`} aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? "service-error" : undefined}>
          <option value="">Zgjidhni shërbimin</option>
          {SERVICES.map((service) => <option key={service.slug} value={service.slug}>{service.title}</option>)}
          <option value="other">Disa shërbime / dua ta sqaroj</option>
        </select>
        <FieldError id="service">{errors.service}</FieldError>
      </div>

      <Field label="Zona ose qyteti *" id="area" name="area" type="text" value={form.area} onChange={onChange}
        placeholder="P.sh. Kombinat, Tiranë" autoComplete="address-level2" maxLength={CONTACT_LIMITS.area}
        hint="Për kërkesën fillestare mjafton zona; adresa e plotë mund të sqarohet më pas." required error={errors.area} />

      <fieldset className="rounded-xl border border-cream-3 p-4 sm:p-5">
        <legend className="px-2 text-sm font-semibold">Si mund t’ju kontaktojmë? *</legend>
        <p className="mb-4 text-sm text-muted">Plotësoni telefonin ose emailin. Mund t’i jepni edhe të dyja.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Telefon" id="phone" name="phone" type="tel" value={form.phone} onChange={onChange}
            placeholder="+355 6X XXX XXXX" autoComplete="tel" maxLength={CONTACT_LIMITS.phone} error={errors.phone} />
          <Field label="Email" id="email" name="email" type="email" value={form.email} onChange={onChange}
            placeholder="email@shembull.com" autoComplete="email" maxLength={CONTACT_LIMITS.email} error={errors.email} />
        </div>
        <label htmlFor="preferredContact" className="mb-2 mt-5 block text-sm font-semibold">Si preferoni t’ju kontaktojmë?</label>
        <select id="preferredContact" name="preferredContact" value={form.preferredContact} onChange={onChange} className={FIELD}>
          <option value="any">Nuk kam preferencë</option>
          <option value="phone">Me telefon</option>
          <option value="email">Me email</option>
        </select>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold">Çfarë pune ju nevojitet? *</label>
        <p id="message-hint" className="mb-2 text-sm text-muted">Përshkruani llojin e objektit, nevojën dhe nëse ka një sistem ekzistues. Mos përfshini fjalëkalime ose të dhëna private të panevojshme.</p>
        <textarea id="message" name="message" rows={5} value={form.message} onChange={onChange}
          placeholder="P.sh. kam një dyqan dhe dua kamera për hyrjen dhe arkën…" required maxLength={CONTACT_LIMITS.message}
          aria-invalid={errors.message ? true : undefined} aria-describedby={`message-hint${errors.message ? " message-error" : ""}`}
          className={`${FIELD} ${errors.message ? "border-red-700" : ""}`} />
        <FieldError id="message">{errors.message}</FieldError>
      </div>

      <div className="rounded-xl border border-gold/30 bg-cream p-4 text-sm">
        <p className="font-semibold">Si dërgohet kërkesa?</p>
        <p className="mt-2 text-muted">Zgjidhni WhatsApp ose email për të përgatitur mesazhin. Kjo faqe nuk e dërgon kërkesën: kontrollojeni dhe shtypni Dërgo në aplikacionin që zgjidhni. Nëse aplikacioni nuk hapet, kopjoni tekstin dhe dërgojeni në WhatsApp ose te <a href={`mailto:${SITE.email}`} className="break-all font-semibold text-ink underline underline-offset-2">{SITE.email}</a>.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="submit" name="channel" value="whatsapp" className="btn btn-deep">Përgatit në WhatsApp</button>
        <button type="submit" name="channel" value="email" className="btn border border-cream-3 bg-white text-ink">Përgatit emailin</button>
        <button type="button" onClick={onCopy} disabled={copying} className="btn border border-cream-3 bg-white text-ink disabled:opacity-60">{copying ? "Duke kopjuar…" : "Kopjo tekstin e kërkesës"}</button>
      </div>
      {feedback && <p role="status" className="text-sm font-medium text-ink">{feedback}</p>}

      <details open={showText} onToggle={(event) => setShowText(event.currentTarget.open)} className="text-sm">
        <summary className="cursor-pointer font-semibold underline underline-offset-4">Shihni tekstin e kërkesës</summary>
        <label htmlFor="inquiry-text" className="mb-2 mt-4 block text-muted">Tekst për ta kopjuar në WhatsApp ose email</label>
        <textarea ref={copyRef} id="inquiry-text" readOnly rows={10} value={formatContactInquiry(form, SERVICES)} className={FIELD} />
      </details>
      </fieldset>
      <noscript>
        <div className="mt-5 rounded-xl border border-gold/30 bg-cream p-4 text-sm leading-relaxed">
          <p>Përgatitja e mesazhit në këtë formular kërkon JavaScript. Mund të na kontaktoni drejtpërdrejt:</p>
          <ul className="mt-3 space-y-2">
            <li><a href={SITE.phoneHref} className="font-semibold text-ink underline underline-offset-4">Telefononi {SITE.phoneDisplay}</a></li>
            <li><a href={`mailto:${SITE.email}`} className="break-all font-semibold text-ink underline underline-offset-4">Shkruani te {SITE.email}</a></li>
            <li><a href={SITE.whatsappHref} className="font-semibold text-ink underline underline-offset-4">Shkruani në WhatsApp</a></li>
          </ul>
        </div>
      </noscript>
    </form>
  );
}
