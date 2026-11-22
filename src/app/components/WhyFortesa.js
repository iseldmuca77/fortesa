import SectionHeading from "./SectionHeading";
import { RookMark } from "./Logo";
import { CheckIcon } from "./Icons";
import Link from "next/link";
import { ROUTES } from "../lib/site";

const FEATURES = [
  {
    title: "Nevoja e objektit",
    text: "Përzgjedhja e pajisjeve fillon nga hapësira, përdorimi dhe puna që kërkohet.",
  },
  {
    title: "Kërkesë me përmbajtje të qartë",
    text: "Tregoni pajisjet dhe kabllimin ekzistues, që të sqarohen montimi, konfigurimi dhe materialet.",
  },
  {
    title: "Dorëzim dhe përdorim",
    text: "Sqaroni çfarë do të provohet në përfundim dhe kush do ta përdorë ose administrojë sistemin.",
  },
  {
    title: "Kushtet e mbështetjes",
    text: "Garancia, mirëmbajtja dhe disponueshmëria duhen përcaktuar në ofertën për punën konkrete.",
  },
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
            eyebrow="Puna në objekt"
            title="Zgjedhja fillon nga ajo që ju nevojitet"
            lead="Një dyqan, një shtëpi dhe një ambient pune kanë kërkesa të ndryshme. Përshkrimi i tyre ndihmon në përcaktimin e punës."
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

        <div className="rounded-2xl border border-gold/20 bg-ink-2 p-8 sm:p-10">
          <p className="eyebrow">Për ofertën tuaj</p>
          <h3 className="mt-5 font-display text-3xl font-extrabold">Na tregoni ku dhe çfarë duhet bërë</h3>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-dark marker:text-gold">
            <li>Qyteti ose zona dhe lloji i objektit.</li>
            <li>Montim i ri, zgjerim apo riparim i një sistemi ekzistues.</li>
            <li>Pajisjet që keni dhe afati që po shqyrtoni.</li>
          </ul>
          <Link href={ROUTES.contact} className="btn btn-gold mt-8">Kërkoni një ofertë</Link>
        </div>
      </div>
    </section>
  );
}
