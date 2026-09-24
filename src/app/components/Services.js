import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { ArrowRightIcon, LayersIcon, MonitorIcon, SERVICE_ICONS, WrenchIcon } from "./Icons";
import { ROUTES, SERVICES, serviceHref } from "../lib/site";

const EXTRAS = [
  {
    icon: LayersIcon,
    title: "Zgjidhje të Integruara",
    description:
      "Kombinojmë kamera, alarme dhe kontroll aksesi në një sistem të vetëm, të përshtatur për çdo objekt.",
  },
  {
    icon: WrenchIcon,
    title: "Mirëmbajtje & Konsulencë",
    description:
      "Kontrolle periodike, përditësime dhe asistencë teknike që sistemet tuaja të punojnë gjithmonë.",
  },
  {
    icon: MonitorIcon,
    title: "Monitorim në Kohë Reale",
    description:
      "Ndiqni objektin tuaj nga telefoni ose kompjuteri dhe merrni njoftime të menjëhershme.",
  },
];

/**
 * Full service cards (services index): icon, title, tags, description and a
 * link to the dedicated page. Each card keeps an anchor id for /sherbimet#slug.
 */
function ServiceCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((service) => {
        const Icon = SERVICE_ICONS[service.icon];
        const href = serviceHref(service.slug);
        return (
          <article
            key={service.slug}
            id={service.slug}
            className="group flex scroll-mt-24 flex-col rounded-2xl border border-cream-3 bg-white/70 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-xl hover:shadow-gold/10"
          >
            <span className="icon-ring h-16 w-16 group-hover:border-gold-dark group-hover:bg-gold-dark group-hover:text-cream">
              <Icon className="h-7 w-7" />
            </span>
            <h3 className="mt-6 text-2xl font-bold text-ink">
              <Link href={href} className="transition-colors hover:text-gold-dark">
                {service.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm font-semibold text-gold-dark">{service.tags.join(" · ")}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{service.description}</p>
            <Link
              href={href}
              aria-label={`Lexo më shumë për ${service.title}`}
              className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-gold-dark transition-colors hover:text-gold-deep"
            >
              Lexo më shumë
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

/**
 * Compact service tiles (home page): icon, title and tags only, each linking
 * to the dedicated service page.
 */
function ServiceTiles() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {SERVICES.map((service) => {
        const Icon = SERVICE_ICONS[service.icon];
        return (
          <Link
            key={service.slug}
            href={serviceHref(service.slug)}
            className="group flex items-center gap-4 rounded-xl border border-cream-3 bg-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:shadow-gold/10"
          >
            <span className="icon-ring h-12 w-12 group-hover:border-gold-dark group-hover:bg-gold-dark group-hover:text-cream">
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <h3 className="font-bold leading-snug text-ink">{service.title}</h3>
              <p className="mt-1 text-xs font-semibold leading-snug text-gold-dark">
                {service.tags.join(" · ")}
              </p>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/**
 * Services section. `compact` renders the tile grid used on the home page;
 * otherwise the full cards, extras and closing note used on /sherbimet.
 */
export default function Services({ showHeading = true, compact = false }) {
  return (
    <section id="sherbimet" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      {showHeading && (
        <SectionHeading
          eyebrow="Çfarë bëjmë"
          title="Shërbimet Tona"
          lead="Zgjidhje sigurie, teknologjie dhe instalimesh për shtëpi, biznese, hoteleri dhe institucione: nga kamerat dhe alarmet te GPS, portat automatike, rrjetet dhe telefonia."
        />
      )}

      <div className={showHeading ? "mt-14" : ""}>{compact ? <ServiceTiles /> : <ServiceCards />}</div>

      {compact ? (
        <div className="mt-10 text-center">
          <Link href={ROUTES.services} className="btn btn-deep">
            Mëso më shumë për shërbimet
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {EXTRAS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-xl border border-cream-3 bg-cream-2/60 p-5">
                <span className="icon-ring h-11 w-11">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-bold text-ink">{title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-muted">
            Me Fortesa ju merrni më shumë se pajisje sigurie: një partner të besueshëm që kujdeset për
            mbrojtjen tuaj, duke kombinuar teknologjinë më të fundit me përvojën tonë.
          </p>
        </>
      )}
    </section>
  );
}
