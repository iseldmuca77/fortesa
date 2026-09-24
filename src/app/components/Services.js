import SectionHeading from "./SectionHeading";
import { LayersIcon, MonitorIcon, SERVICE_ICONS, WrenchIcon } from "./Icons";
import { SERVICES } from "../lib/site";

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

export default function Services({ showHeading = true }) {
  return (
    <section id="sherbimet" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      {showHeading && (
        <SectionHeading
          eyebrow="Çfarë bëjmë"
          title="Shërbimet Tona"
          lead="Zgjidhje sigurie dhe instalime për shtëpi, biznese dhe institucione. Çdo shërbim përshtatet për të garantuar mbrojtje maksimale dhe qetësi të plotë."
        />
      )}

      <div className={`grid gap-6 md:grid-cols-3 ${showHeading ? "mt-14" : ""}`}>
        {SERVICES.map((service) => {
          const Icon = SERVICE_ICONS[service.icon];
          return (
            <article
              key={service.slug}
              id={service.slug}
              className="group flex scroll-mt-24 flex-col rounded-2xl border border-cream-3 bg-white/70 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-xl hover:shadow-gold/10"
            >
              <span className="icon-ring h-16 w-16 group-hover:border-gold-dark group-hover:bg-gold-dark group-hover:text-cream">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-ink">{service.title}</h3>
              <p className="mt-1 text-sm font-semibold text-gold-dark">{service.tags.join(" · ")}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{service.description}</p>
            </article>
          );
        })}
      </div>

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
    </section>
  );
}
