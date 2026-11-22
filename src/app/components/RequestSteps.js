import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { ROUTES } from "../lib/site";

const STEPS = [
  {
    title: "Përshkruani objektin dhe nevojën",
    text: "Shënoni qytetin ose zonën, llojin e objektit dhe nëse kërkoni montim të ri, zgjerim apo riparim.",
  },
  {
    title: "Sqaroni çfarë duhet të përfshijë oferta",
    text: "Pajisjet, materialet, kabllimi, puna dhe konfigurimi duhen dalluar. Tregoni edhe çfarë keni të instaluar.",
  },
  {
    title: "Përcaktoni hapat përpara punimeve",
    text: "Diskutoni nëse nevojitet vizitë në objekt, kohën e punimeve, provat në dorëzim dhe kushtet e mbështetjes.",
  },
];

/** Buyer preparation, deliberately separate from customer testimonials. */
export default function RequestSteps() {
  return (
    <section className="bg-cream-2/60 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Para ofertës"
          title="Një kërkesë e qartë është fillimi"
          lead="Këta tre hapa na ndihmojnë të kuptojmë punën që ju nevojitet."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-cream-3 bg-cream p-7">
              <span className="text-sm font-bold text-gold-deep" aria-hidden="true">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-bold leading-snug">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-9 text-center">
          <Link href={ROUTES.contact} className="btn btn-deep">Përshkruani kërkesën tuaj</Link>
        </div>
      </div>
    </section>
  );
}
