import Link from "next/link";
import { ArrowRightIcon } from "./Icons";

export default function ProjectUploadCallout({ compact = false }) {
  return (
    <section aria-labelledby={compact ? "project-callout-contact" : "project-callout-home"} className={compact ? "mt-8" : "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"}>
      <div className={`rounded-2xl border border-gold/30 bg-ink text-cream ${compact ? "p-6" : "p-7 sm:p-10"}`}>
        <div className={`flex gap-6 ${compact ? "flex-col" : "flex-col lg:flex-row lg:items-center lg:justify-between"}`}>
          <div className="max-w-2xl">
            <p className="eyebrow">Për arkitektë dhe studio</p>
            <h2 id={compact ? "project-callout-contact" : "project-callout-home"} className={`mt-4 font-display font-extrabold ${compact ? "text-xl" : "text-2xl sm:text-3xl"}`}>Keni plane për projektin?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-dark">Dërgoni skedarët PDF ose DWG. Shqyrtojmë projektin dhe ju kontaktojmë në WhatsApp për një ofertë të detajuar për shërbimet e kërkuara.</p>
          </div>
          <Link href="/dergo-projektin" className="btn btn-gold shrink-0 self-start">Dërgo projektin <ArrowRightIcon className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
