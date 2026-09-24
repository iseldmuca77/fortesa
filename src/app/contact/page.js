import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import { ClockIcon, GlobeIcon, MailIcon, MapPinIcon, PhoneIcon, ShieldCheckIcon } from "../components/Icons";
import { SITE } from "../lib/site";

export const metadata = {
  title: "Kontakt",
  description: `Kontaktoni Fortesa në ${SITE.phoneDisplay} ose ${SITE.email} për kamera sigurie, sisteme alarmi dhe instalime elektrike.`,
};

function Detail({ icon: Icon, label, children }) {
  return (
    <li className="flex gap-4">
      <span className="icon-ring icon-ring-dark h-11 w-11">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-dark">{label}</p>
        <div className="mt-1 font-semibold">{children}</div>
      </div>
    </li>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-cream-3 bg-white/70 p-7 text-center shadow-sm">
      <span className="icon-ring mx-auto h-12 w-12">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <div className="mt-2 space-y-1 text-sm text-muted">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Na Kontaktoni"
        lead="Jemi këtu për t'ju ndihmuar. Plotësoni formularin ose përdorni detajet tona të kontaktit."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid overflow-hidden rounded-2xl border border-cream-3 bg-white/80 shadow-xl lg:grid-cols-5">
          <div className="p-8 lg:col-span-3 lg:p-12">
            <h2 className="font-display text-2xl font-extrabold">Dërgoni një mesazh</h2>
            <p className="mt-2 text-sm text-muted">Do t&#39;ju përgjigjemi sa më shpejt të jetë e mundur.</p>
            <ContactForm />
          </div>

          <aside className="bg-ink p-8 text-cream lg:col-span-2 lg:p-12">
            <p className="eyebrow">Detajet e kontaktit</p>
            <ul className="mt-8 space-y-6">
              <Detail icon={PhoneIcon} label="Telefon">
                <a href={SITE.phoneHref} className="text-lg transition-colors hover:text-gold">
                  {SITE.phoneDisplay}
                </a>
              </Detail>
              <Detail icon={MailIcon} label="Email">
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-gold">
                  {SITE.email}
                </a>
              </Detail>
              <Detail icon={GlobeIcon} label="Web">
                <a href={SITE.websiteHref} className="transition-colors hover:text-gold">
                  {SITE.website}
                </a>
              </Detail>
              <Detail icon={MapPinIcon} label="Adresa">
                {SITE.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </Detail>
            </ul>

            <div className="mt-10 overflow-hidden rounded-xl border border-gold/20">
              <iframe
                title="Harta, Rruga Pandeli Cale, Tiranë"
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
                width="100%"
                height="220"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <InfoCard icon={ClockIcon} title="Orari i Punës">
            {SITE.hours.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </InfoCard>
          <InfoCard icon={ShieldCheckIcon} title="Emergjenca 24/7">
            <p>Për emergjenca dhe situata urgjente</p>
            <p className="font-bold text-gold-dark">
              <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            </p>
          </InfoCard>
          <InfoCard icon={MailIcon} title="Përgjigje e Shpejtë">
            <p>Përgjigje brenda 24 orëve</p>
            <p>për të gjitha kërkesat</p>
          </InfoCard>
        </div>
      </section>
    </>
  );
}
