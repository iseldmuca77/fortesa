import { SERVICES } from "./site.js";

export const PROJECT_LIMITS = Object.freeze({
  maxFiles: 5, maxFileBytes: 20 * 1024 * 1024, maxTotalBytes: 20 * 1024 * 1024,
  name: 100, company: 120, area: 120, phone: 30, notes: 3000,
});

export const PROJECT_SERVICES = [
  ...SERVICES.map(({ slug, title }) => ({ value: slug, label: title })),
  { value: "other", label: "Dua ta sqaroj me Fortesa" },
];

export function formatBytes(bytes) {
  return bytes < 1024 * 1024 ? `${Math.ceil(bytes / 1024)} KB` : `${(bytes / (1024 * 1024)).toFixed(bytes % (1024 * 1024) ? 1 : 0)} MB`;
}

export function normalizeProjectPhone(value) {
  if (typeof value !== "string" || !/^[+\d\s().-]+$/.test(value.trim())) return "";
  const phone = value.trim().replace(/[\s().-]/g, "").replace(/^00/, "+");
  return /^\+[1-9]\d{7,14}$/.test(phone) ? phone : "";
}

export function validateProjectDetails(form) {
  if (!form || typeof form !== "object") return { name: "Plotësoni të dhënat e kërkesës." };
  const errors = {};
  for (const key of ["name", "company", "area", "phone", "notes"]) {
    const value = form[key];
    if (value !== undefined && (typeof value !== "string" || value.length > PROJECT_LIMITS[key] || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))) {
      errors[key] = `Përdorni tekst deri në ${PROJECT_LIMITS[key]} karaktere.`;
    }
  }
  if (typeof form.name !== "string" || !form.name.trim()) errors.name = "Shkruani emrin dhe mbiemrin.";
  if (typeof form.area !== "string" || !form.area.trim()) errors.area = "Shkruani qytetin ose zonën e projektit.";
  if (!normalizeProjectPhone(form.phone)) errors.phone = "Shkruani numrin me prefiksin e shtetit, p.sh. +355 68 123 4567.";
  if (!Array.isArray(form.services) || !form.services.length || form.services.length > PROJECT_SERVICES.length ||
      new Set(form.services).size !== form.services.length || form.services.some((value) => !PROJECT_SERVICES.some((service) => service.value === value))) {
    errors.services = "Zgjidhni të paktën një shërbim ose opsionin për ta sqaruar me Fortesa.";
  }
  if (form.consent !== true) errors.consent = "Konfirmoni të drejtën për të ndarë skedarët dhe kontaktin për këtë kërkesë.";
  return errors;
}

export function validateProjectFiles(files) {
  if (!Array.isArray(files) || !files.length) return "Shtoni të paktën një skedar PDF ose DWG.";
  if (files.length > PROJECT_LIMITS.maxFiles) return "Mund të dërgoni deri në 5 skedarë.";
  let total = 0;
  for (const file of files) {
    if (!file || typeof file.name !== "string" || file.name.length < 5 || file.name.length > 180 || file.name !== file.name.trim() || /[\\/\u0000-\u001f\u007f]/.test(file.name) || !/\.(pdf|dwg)$/i.test(file.name)) {
      return "Lejohen vetëm skedarë PDF dhe DWG, me emra deri në 180 karaktere.";
    }
    if (!Number.isSafeInteger(file.size) || file.size < 8 || file.size > PROJECT_LIMITS.maxFileBytes) return "Skedarët duhet të kenë përmbajtje dhe të jenë deri në 20 MB.";
    total += file.size;
  }
  return total > PROJECT_LIMITS.maxTotalBytes ? "Madhësia e të gjithë skedarëve së bashku duhet të jetë deri në 20 MB." : "";
}

// A file signature is a format check, not a malware scan or a CAD viewer.
export function hasProjectFileSignature(name, bytes) {
  const header = Array.from(bytes.subarray(0, 8), (byte) => String.fromCharCode(byte)).join("");
  return /\.pdf$/i.test(name) ? header.startsWith("%PDF-") : /\.dwg$/i.test(name) && /^AC10\d{2}/.test(header);
}

export function cleanProjectDetails(form) {
  return {
    name: form.name.trim(), company: (form.company || "").trim(), phone: normalizeProjectPhone(form.phone),
    area: form.area.trim(), services: form.services, notes: (form.notes || "").trim(), consent: true,
  };
}
