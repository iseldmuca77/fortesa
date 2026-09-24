import SectionHeading from "./SectionHeading";
import { RookMark } from "./Logo";
import { CheckIcon } from "./Icons";
import { SITE } from "../lib/site";

const FEATURES = [
  {
    title: "Montim profesional",
    text: "Ekip me përvojë që instalon dhe konfiguron çdo sistem sipas nevojave të objektit tuaj.",
  },
  {
    title: "Monitorim 24/7",
    text: "Ndiqni shtëpinë ose biznesin në kohë reale nga telefoni ose kompjuteri juaj.",
  },
  {
    title: "Mirëmbajtje e vazhdueshme",
    text: "Kontrolle periodike, përditësime dhe asistencë teknike sa herë që ju nevojitet.",
  },
  {
    title: "Zgjidhje të personalizuara",
    text: "Për familje, biznese dhe institucione publike e private, me pajisje cilësore.",
  },
];

const STATS = [
  { value: SITE.clients, label: "Klientë të kënaqur" },
  { value: SITE.years, label: "Vjet përvojë" },
  { value: "24/7", label: "Monitorim & asistencë" },
];

export default function WhyFortesa() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <RookMark
        decorative
        className="pointer-events-none absolute -bottom-16 -right-16 h-[28rem] w-auto opacity-[0.06]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="Pse Fortesa"
            title="Një partner i besueshëm për sigurinë tuaj"
            lead="Kombinojmë teknologjinë më të fundit me përvojën tonë për të ofruar zgjidhje të sigurta dhe afatgjata, për shtëpi dhe biznese."
          />
          <ul className="mt-10 space-y-5">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <span className="icon-ring icon-ring-dark mt-0.5 h-9 w-9">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-bold text-cream">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-dark">{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-gold/20 bg-ink-2 p-7">
              <p className="font-display text-5xl font-extrabold text-gold-gradient">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-dark">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
