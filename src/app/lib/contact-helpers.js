export const CONTACT_LIMITS = {
  name: 120,
  area: 160,
  phone: 40,
  email: 254,
  message: 2000,
};

const inline = (value = "") => value.trim().replace(/\s+/g, " ");

/** Only known service slugs can prefill the public contact form. */
export function contactServiceFromQuery(value, services) {
  return services.some((service) => service.slug === value) ? value : "";
}

export function validateContact(form, services) {
  const errors = {};
  const phone = inline(form.phone);
  const email = inline(form.email);

  if (!inline(form.name)) errors.name = "Shkruani emrin tuaj.";
  if (!contactServiceFromQuery(form.service, services) && form.service !== "other") {
    errors.service = "Zgjidhni shërbimin ose opsionin për disa shërbime.";
  }
  if (!inline(form.area)) errors.area = "Shkruani zonën ose qytetin ku ndodhet objekti.";
  if (!form.message.trim()) errors.message = "Përshkruani shkurt punën që ju nevojitet.";

  if (phone && (!/^\+?[\d\s().-]+$/.test(phone) || !/^\d{7,15}$/.test(phone.replace(/\D/g, "")))) {
    errors.phone = "Kontrolloni numrin e telefonit, përfshirë prefiksin kur nevojitet.";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Shkruani një adresë emaili të vlefshme.";
  }

  if (!phone && !email) {
    errors.phone = "Plotësoni të paktën telefonin ose emailin që të mund t’ju kontaktojmë.";
  } else if (form.preferredContact === "phone" && !phone) {
    errors.phone = "Shtoni numrin tuaj për kontakt me telefon ose ndryshoni preferencën.";
  } else if (form.preferredContact === "email" && !email) {
    errors.email = "Shtoni adresën tuaj për kontakt me email ose ndryshoni preferencën.";
  }

  for (const [field, limit] of Object.entries(CONTACT_LIMITS)) {
    if ((form[field] || "").length > limit) {
      errors[field] = `Përdorni deri në ${limit} karaktere.`;
    }
  }
  return errors;
}

export function formatContactInquiry(form, services) {
  const service = services.find((item) => item.slug === form.service)?.title;
  const preference = { phone: "Telefon", email: "Email" };
  const phone = inline(form.phone);
  const email = inline(form.email);
  return [
    `Emri: ${inline(form.name)}`,
    `Shërbimi: ${service || (form.service === "other" ? "Disa shërbime / për t’u sqaruar" : "")}`,
    `Zona / qyteti: ${inline(form.area)}`,
    ...(phone ? [`Telefon: ${phone}`] : []),
    ...(email ? [`Email: ${email}`] : []),
    ...(preference[form.preferredContact] ? [`Preferenca e kontaktit: ${preference[form.preferredContact]}`] : []),
    "",
    "Përshkrimi i punës:",
    form.message.trim(),
  ].join("\n");
}

export function contactMailto(form, services, recipient) {
  const service = services.find((item) => item.slug === form.service)?.title;
  const subject = `Kërkesë për ${service || "shërbime"} – ${inline(form.name)}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formatContactInquiry(form, services))}`;
}

export function contactWhatsApp(form, services, whatsappHref) {
  return `${whatsappHref}?text=${encodeURIComponent(formatContactInquiry(form, services))}`;
}
