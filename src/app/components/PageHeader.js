import Link from "next/link";
import { RookMark } from "./Logo";

/**
 * Dark title band used at the top of inner pages.
 * `breadcrumbs`: optional [{ name, href }] from the home page to this page.
 */
export default function PageHeader({ eyebrow, title, lead, breadcrumbs }) {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <RookMark
        decorative
        className="pointer-events-none absolute -right-10 -top-10 h-72 w-auto opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 1 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-dark">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {index > 0 && (
                      <span aria-hidden="true" className="text-gold/60">
                        /
                      </span>
                    )}
                    {isLast ? (
                      <span aria-current="page" className="text-gold">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link href={crumb.href} className="transition-colors hover:text-cream">
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-dark">{lead}</p>}
      </div>
    </section>
  );
}
