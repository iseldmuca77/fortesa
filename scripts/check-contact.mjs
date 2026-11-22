import assert from "node:assert/strict";
import { test } from "node:test";
import { SERVICES } from "../src/app/lib/site.js";
import {
  CONTACT_LIMITS,
  contactMailto,
  contactServiceFromQuery,
  contactWhatsApp,
  formatContactInquiry,
  validateContact,
} from "../src/app/lib/contact-helpers.js";

const inquiry = {
  name: "Test klienti",
  service: "kamera-sigurie",
  area: "Tiranë",
  phone: "",
  email: "",
  preferredContact: "any",
  message: "Kërkoj vlerësim për kamerat e një dyqani.",
};

test("a real visitor can enquire with either phone or email, without providing both", () => {
  assert.deepEqual(validateContact({ ...inquiry, phone: "+355 68 123 4567" }, SERVICES), {});
  assert.deepEqual(validateContact({ ...inquiry, email: "klient@example.com" }, SERVICES), {});
  assert.ok(validateContact(inquiry, SERVICES).phone);
});

test("selected reply preference needs a usable matching contact", () => {
  assert.ok(validateContact({ ...inquiry, email: "klient@example.com", preferredContact: "phone" }, SERVICES).phone);
  assert.ok(validateContact({ ...inquiry, phone: "+355681234567", preferredContact: "email" }, SERVICES).email);
  assert.ok(validateContact({ ...inquiry, phone: "call me", email: "klient@example.com" }, SERVICES).phone);
  assert.ok(validateContact({ ...inquiry, email: "broken@", phone: "+355681234567" }, SERVICES).email);
});

test("service-prefill query accepts every current service and rejects arbitrary input", () => {
  for (const service of SERVICES) {
    assert.equal(contactServiceFromQuery(service.slug, SERVICES), service.slug);
  }
  for (const value of [null, "", "other", "Kamera Sigurie", "<script>alert(1)</script>"]) {
    assert.equal(contactServiceFromQuery(value, SERVICES), "");
  }
});

test("empty scope and overlong messages fail before an email can be prepared", () => {
  const errors = validateContact({ ...inquiry, phone: "+355681234567", name: "  ", area: "  ", service: "unknown", message: " " }, SERVICES);
  assert.deepEqual(Object.keys(errors).sort(), ["area", "message", "name", "service"]);
  assert.ok(validateContact({ ...inquiry, phone: "+355681234567", message: "a".repeat(CONTACT_LIMITS.message + 1) }, SERVICES).message);
});

test("copied request preserves Albanian and multiline scope without mislabeling it as sent", () => {
  const body = formatContactInquiry({ ...inquiry, phone: "+355681234567", message: "Hyrja & arka\nSistem ekzistues: po" }, SERVICES);
  assert.ok(body.includes("Kamera Sigurie"));
  assert.ok(body.includes("Zona / qyteti: Tiranë"));
  assert.ok(body.includes("Hyrja & arka\nSistem ekzistues: po"));
  assert.ok(!body.includes("Email:"));
  assert.ok(!body.includes("Preferenca e kontaktit:"));
});

test("WhatsApp carries only the encoded inquiry to the confirmed business number", () => {
  const form = { ...inquiry, phone: "+355681234567", preferredContact: "phone", message: "Hyrja & arka\nPër objektin #1?text=other" };
  const url = new URL(contactWhatsApp(form, SERVICES, "https://wa.me/355682010015"));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/355682010015");
  assert.deepEqual([...url.searchParams.keys()], ["text"]);
  assert.equal(url.searchParams.get("text"), formatContactInquiry(form, SERVICES));
  assert.ok(url.searchParams.get("text").includes("Preferenca e kontaktit: Telefon"));
  assert.ok(!url.searchParams.get("text").includes("Email:"));
});

test("email body and subject are encoded, so inquiry text cannot create extra mailto recipients", () => {
  const form = { ...inquiry, name: "  Klient\n Test & pyetje  ", email: "klient@example.com", message: "Buxheti? &cc=other@example.com\nPër hyrjen #1" };
  const url = new URL(contactMailto(form, SERVICES, "fortesaalbania@gmail.com"));
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "fortesaalbania@gmail.com");
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
  assert.ok(!url.searchParams.get("subject").includes("\n"));
  assert.equal(url.searchParams.get("body"), formatContactInquiry(form, SERVICES));
});
