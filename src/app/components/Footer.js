import Link from "next/link";
import Logo from "./Logo";
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "./Icons";
import { NAV_LINKS, SERVICES, SITE, serviceHref } from "../lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/25 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="space-y-5">
          <Logo variant="dark" size="md" />
          <p className="max-w-xs text-sm leading-relaxed text-muted-dark">
            Kamera sigurie, alarme, instalime elektrike, GPS, porta automatike, rrjete dhe zgjidhje për
            hoteleri. Montim, monitorim dhe mirëmbajtje {SITE.serviceAreaText}.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="eyebrow mb-5">Shërbimet</h4>
          <ul className="grid gap-3 text-sm text-cream/80 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={serviceHref(service.slug)} className="transition-colors hover:text-gold">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Lidhje</h4>
          <ul className="space-y-3 text-sm text-cream/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Kontakt</h4>
          <ul className="space-y-3 text-sm text-cream/80">
            <li>
              <a href={SITE.phoneHref} className="inline-flex items-center gap-3 transition-colors hover:text-gold">
                <PhoneIcon className="h-4 w-4 text-gold" />
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-3 transition-colors hover:text-gold">
                <MailIcon className="h-4 w-4 text-gold" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.websiteHref} className="inline-flex items-center gap-3 transition-colors hover:text-gold">
                <GlobeIcon className="h-4 w-4 text-gold" />
                {SITE.website}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{SITE.address.join(", ")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gold text-ink">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs font-semibold sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {year} Fortesa. Të gjitha të drejtat e rezervuara.</span>
          <span className="uppercase tracking-[0.3em]">Siguri dhe Teknologji</span>
        </div>
      </div>
    </footer>
  );
}
