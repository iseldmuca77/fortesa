import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "../../components/PageHeader";
import CtaBand from "../../components/CtaBand";
import BlogSection from "../../components/BlogSection";
import Faq from "../../components/Faq";
import JsonLd from "../../components/JsonLd";
import { ArrowRightIcon, CheckIcon, MailIcon, PhoneIcon, SERVICE_ICONS } from "../../components/Icons";
import { ROUTES, SERVICES, SITE, serviceHref } from "../../lib/site";
import { SERVICE_DETAILS } from "../../lib/service-details";
import { blogHref, getPost } from "../../lib/blog";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema, faqSchema, graph, serviceSchema } from "../../lib/schema";

/** Only the slugs in SERVICES exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

function findService(slug) {
  const service = SERVICES.find((item) => item.slug === slug);
  const details = SERVICE_DETAILS[slug];
  return service && details ? { service, details } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = findService(slug);
  if (!found) return {};
  return pageMetadata({
    title: found.details.seoTitle,
    description: found.details.seoDescription,
    path: serviceHref(slug),
  });
}

const H2 = "font-display text-2xl font-extrabold text-ink sm:text-3xl";

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const found = findService(slug);
  if (!found) notFound();

  const { service, details } = found;
  const Icon = SERVICE_ICONS[service.icon];
  const others = SERVICES.filter((item) => item.slug !== slug);
  const contactHref = `${ROUTES.contact}?sherbimi=${encodeURIComponent(slug)}`;
  const quoteLabel = details.quoteLabel || "Kërkoni një ofertë";
  const guide = details.guide ? getPost(details.guide.slug) : null;
  const crumbs = [
    { name: "Kreu", href: ROUTES.home },
    { name: "Shërbimet", href: ROUTES.services },
    { name: service.title, href: serviceHref(slug) },
  ];

  return (
    <>
      <JsonLd data={graph(serviceSchema(service, details), faqSchema(details.faqs), breadcrumbSchema(crumbs))} />
      <PageHeader
        eyebrow="Shërbimet"
        title={details.heading || service.title}
        lead={details.lead || service.description}
        breadcrumbs={crumbs}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href={contactHref} className="btn btn-gold whitespace-normal text-center">
            {quoteLabel}
            <ArrowRightIcon className="h-4 w-4 shrink-0" />
          </Link>
          <a href={SITE.phoneHref} className="btn btn-outline">
            <PhoneIcon className="h-4 w-4 shrink-0" />
            Telefononi Fortesa
          </a>
        </div>
        {SITE.whatsappHref && (
          <a href={SITE.whatsappHref} className="mt-2 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-cream underline decoration-gold/60 underline-offset-4 hover:text-gold">
            Shkruani në WhatsApp
            <ArrowRightIcon className="h-4 w-4 shrink-0" />
          </a>
        )}
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="icon-ring h-14 w-14">
                  <Icon className="h-6 w-6" />
                </span>
                <ul className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-gold-dark/30 bg-white/60 px-3 py-1 text-xs font-semibold text-gold-dark"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
                {details.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-5 text-sm font-semibold text-gold-dark">
                Me qendër në Tiranë. Për punë në qytete të tjera, na tregoni vendndodhjen
                që të sqarojmë organizimin e punës.
              </p>
            </div>

            {details.workTypes?.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                {details.workTypes.map((item) => (
                  <section key={item.title} className="rounded-2xl border border-cream-3 bg-white/70 p-6">
                    <h2 className="font-display text-xl font-extrabold text-ink">{item.title}</h2>
                    <p className="mt-4 leading-relaxed text-muted">{item.text}</p>
                  </section>
                ))}
              </div>
            )}

            <div>
              <h2 className={H2}>Çfarë mund të përfshijë puna</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Pajisjet, sasitë dhe punimet e përfshira sqarohen në ofertën për objektin tuaj.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {details.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-cream-3 bg-white/70 p-4 text-sm leading-relaxed text-ink/85"
                  >
                    <span className="icon-ring mt-0.5 h-7 w-7 shrink-0">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {details.clarification && (
              <section className="rounded-r-xl border-l-4 border-gold bg-cream-2/70 p-6">
                <h2 className="font-display text-xl font-extrabold">{details.clarification.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{details.clarification.text}</p>
                <Link href={details.clarification.href} className="mt-4 inline-flex items-center gap-2 font-semibold text-gold-deep underline underline-offset-4">
                  {details.clarification.label}
                  <ArrowRightIcon className="h-4 w-4 shrink-0" />
                </Link>
              </section>
            )}

            {details.costDrivers?.length > 0 && (
              <section>
                <h2 className={H2}>{details.costHeading}</h2>
                <p className="mt-4 leading-relaxed text-muted">{details.costIntro}</p>
                <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-muted marker:text-gold-dark">
                  {details.costDrivers.map((item) => <li key={item} className="pl-1">{item}</li>)}
                </ul>
                {guide && (
                  <div className="mt-6 rounded-xl border border-gold-dark/25 bg-white/70 p-5">
                    <Link href={blogHref(guide.slug)} className="inline-flex items-center gap-3 font-bold text-gold-deep underline underline-offset-4">
                      {details.guide.label}
                      <ArrowRightIcon className="h-4 w-4 shrink-0" />
                    </Link>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{details.guide.note}</p>
                  </div>
                )}
              </section>
            )}

            {details.process?.length > 0 && (
              <section>
                <h2 className={H2}>Nga kërkesa te realizimi</h2>
                <ol className="mt-6 space-y-5">
                  {details.process.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-dark/30 bg-white/70 text-sm font-bold text-gold-deep" aria-hidden="true">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-ink">{step.title}</h3>
                        <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <div>
              <h2 className={H2}>Për kë është</h2>
              <p className="mt-4 leading-relaxed text-muted">{details.forWhom}</p>
            </div>

            <div>
              <h2 className={H2}>Pyetje të shpeshta</h2>
              <Faq items={details.faqs} className="mt-6" />
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl bg-ink p-7 text-cream">
              <p className="eyebrow">Kërkoni një ofertë</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-dark">
                {details.quoteNote || "Na tregoni objektin, vendndodhjen dhe punën që ju nevojitet."}
              </p>
              {details.quoteChecklist?.length > 0 && (
                <ul className="mt-5 list-disc space-y-3 pl-4 text-sm leading-relaxed text-cream/90 marker:text-gold">
                  {details.quoteChecklist.map((item) => <li key={item} className="pl-1">{item}</li>)}
                </ul>
              )}
              <ul className="mt-6 space-y-3 text-sm font-semibold">
                <li>
                  <a href={SITE.phoneHref} className="inline-flex items-center gap-3 transition-colors hover:text-gold">
                    <PhoneIcon className="h-4 w-4 text-gold" />
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="inline-flex max-w-full items-center gap-3 transition-colors hover:text-gold">
                    <MailIcon className="h-4 w-4 shrink-0 text-gold" />
                    <span className="break-all">{SITE.email}</span>
                  </a>
                </li>
                {SITE.whatsappHref && (
                  <li>
                    <a href={SITE.whatsappHref} className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4 transition-colors hover:text-gold">
                      Shkruani në WhatsApp
                      <ArrowRightIcon className="h-4 w-4 shrink-0 text-gold" />
                    </a>
                  </li>
                )}
              </ul>
              <Link href={contactHref} className="btn btn-gold mt-7 w-full whitespace-normal text-center">
                {quoteLabel}
              </Link>
            </div>

            <div className="rounded-2xl border border-cream-3 bg-white/70 p-7">
              <p className="eyebrow eyebrow-deep">Shërbime të tjera</p>
              <ul className="mt-5 divide-y divide-cream-3">
                {others.map((item) => {
                  const OtherIcon = SERVICE_ICONS[item.icon];
                  return (
                    <li key={item.slug}>
                      <Link
                        href={serviceHref(item.slug)}
                        className="group flex items-center gap-3 py-3 text-sm font-semibold text-ink transition-colors hover:text-gold-dark"
                      >
                        <span className="icon-ring h-9 w-9">
                          <OtherIcon className="h-4 w-4" />
                        </span>
                        <span className="flex-1">{item.title}</span>
                        <ArrowRightIcon className="h-4 w-4 text-gold-dark opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title={details.ctaTitle}
        description={details.quoteNote}
        contactHref={contactHref}
        contactLabel={quoteLabel}
      />
      <BlogSection serviceSlug={slug} />
    </>
  );
}
