import { PlusIcon } from "./Icons";

/** FAQ list built on native <details>, so it needs no client JavaScript. */
export default function Faq({ items, className = "" }) {
  return (
    <div className={`divide-y divide-cream-3 rounded-2xl border border-cream-3 bg-white/70 ${className}`}>
      {items.map(({ q, a }) => (
        <details key={q} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
            <span>{q}</span>
            <span className="icon-ring h-8 w-8 transition-transform duration-300 group-open:rotate-45">
              <PlusIcon className="h-4 w-4" />
            </span>
          </summary>
          <p className="mt-3 pr-12 text-sm leading-relaxed text-muted sm:text-base">{a}</p>
        </details>
      ))}
    </div>
  );
}
