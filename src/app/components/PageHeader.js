import { RookMark } from "./Logo";

/** Dark title band used at the top of inner pages. */
export default function PageHeader({ eyebrow, title, lead }) {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <RookMark
        decorative
        className="pointer-events-none absolute -right-10 -top-10 h-72 w-auto opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-dark">{lead}</p>}
      </div>
    </section>
  );
}
