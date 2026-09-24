"use client";

import { useState } from "react";
import { SITE } from "../lib/site";

const FIELD =
  "w-full rounded-lg border border-cream-3 bg-cream px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold/40";

function Field({ label, id, className = "", ...props }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      <input id={id} className={`${FIELD} ${className}`} {...props} />
    </div>
  );
}

/**
 * There is no backend yet: submitting opens the visitor's email client with the
 * message pre-filled, addressed to SITE.email.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Kërkesë nga ${form.name || "faqja fortesa.al"}`);
    const body = encodeURIComponent(
      `Emri: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Emri i plotë"
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          placeholder="Emri dhe mbiemri"
          autoComplete="name"
          required
        />
        <Field
          label="Telefoni"
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={onChange}
          placeholder="+355 6X XXX XXXX"
          autoComplete="tel"
        />
      </div>
      <Field
        label="Email"
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        placeholder="email@shembull.com"
        autoComplete="email"
        required
      />
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold">
          Mesazhi
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={onChange}
          placeholder="Përshkruani shkurt çfarë ju nevojitet..."
          required
          className={`${FIELD} resize-none`}
        />
      </div>
      <button type="submit" className="btn btn-deep w-full sm:w-auto">
        Dërgo mesazhin
      </button>
      {sent && (
        <p role="status" className="text-sm font-semibold text-gold-dark">
          Faleminderit! U hap programi juaj i email-it me mesazhin gati për t&#39;u dërguar. Nëse nuk u
          hap, na shkruani te {SITE.email}.
        </p>
      )}
    </form>
  );
}
