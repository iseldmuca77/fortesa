import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import CtaBand from "../components/CtaBand";
import JsonLd from "../components/JsonLd";
import { BadgeCheckIcon, HandshakeIcon, HeartIcon, LightbulbIcon } from "../components/Icons";
import { FEATURED_SERVICES, ROUTES, SITE, serviceHref } from "../lib/site";
import { pageMetadata } from "../lib/seo";
import { breadcrumbSchema, graph } from "../lib/schema";

const CRUMBS = [
  { name: "Kreu", href: ROUTES.home },
  { name: "Rreth Nesh", href: ROUTES.about },
];

export const metadata = pageMetadata({
  title: "Rreth Nesh",
  description:
    "Njihuni me Fortesa Security.al SHPK në Tiranë, me pronar Igli Muca. Kamera sigurie, sisteme alarmi, instalime dhe riparime elektrike në Shqipëri.",
  path: ROUTES.about,
});

const VALUES = [
  {
    icon: BadgeCheckIcon,
    title: "Përmbajtja e ofertës",
    text: "Pajisjet, materialet, puna dhe konfigurimi që kërkon objekti duhen përcaktuar përpara fillimit.",
  },
  {
    icon: HandshakeIcon,
    title: "Përgjegjësitë",
    text: "Sqaroni kush administron pajisjet, kush merr njoftimet dhe çfarë shërbimi monitorimi kërkohet.",
  },
  {
    icon: HeartIcon,
    title: "Përdorimi pas montimit",
    text: "Përcaktoni përdoruesit dhe funksionet që duhen provuar gjatë dorëzimit të sistemit.",
  },
  {
    icon: LightbulbIcon,
    title: "Kushtet e mbështetjes",
    text: "Pyetni për kushtet e garancisë, mirëmbajtjes dhe çdo pagesë të veçantë në ofertën tuaj.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(CRUMBS))} />
      <PageHeader
        eyebrow="Rreth Nesh"
        title="Fortesa: siguri dhe punime elektrike"
        lead="Me qendër në Tiranë, punojmë me shtëpi dhe biznese në Shqipëri."
        breadcrumbs={CRUMBS}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <p className="eyebrow eyebrow-deep">Kush jemi</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Fortesa, Siguri dhe Teknologji
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Fortesa Security.al SHPK ofron montim kamerash sigurie dhe sistemesh alarmi,
                instalime dhe riparime elektrike. Qendra jonë ndodhet në {SITE.street}, {SITE.city}.
                Punojmë me kërkesa për objekte në Shqipëri; vendndodhja dhe puna konkrete sqarohen
                gjatë kërkesës për ofertë.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Kush drejton Fortesa</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Pronari i Fortesa është Igli Muca. Për një instalim të ri, një sistem ekzistues ose
                një riparim, mund të na kontaktoni drejtpërdrejt në {SITE.phoneDisplay} ose me email
                në {SITE.email}.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Monitorimi i alarmit</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Fortesa ofron monitorim alarmi 24/7: stafi merr njoftimet dhe kryen dalje në objekt
                pas alarmit. Mbulimi i objektit, kushtet e shërbimit dhe pagesat sqarohen në ofertë.
                Aksesi i klientit te kamerat nga telefoni është funksion më vete.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Gjeni shërbimin që ju duhet</h3>
              <ul className="mt-4 space-y-3">
                {FEATURED_SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link href={serviceHref(service.slug)} className="font-semibold text-gold-deep underline decoration-gold-dark/40 underline-offset-4 hover:decoration-gold-deep">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Për GPS, automatizim, rrjete dhe zgjidhje për hotele, shikoni <Link href={ROUTES.services} className="font-semibold text-gold-deep underline underline-offset-4">të gjitha shërbimet</Link>.
              </p>
            </div>

            <Link href={ROUTES.contact} className="btn btn-deep">
              Na Kontaktoni
            </Link>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-cream-3 shadow-xl">
              <Image
                src="/images/home-wallpaper-3.jpg"
                alt="Pamje ilustruese e kamerave të sigurisë"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={60}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">Pamje ilustruese, jo dokumentim i një projekti të përfunduar.</p>
            <div className="mt-6 rounded-2xl border border-cream-3 bg-cream-2/60 p-6">
              <p className="eyebrow eyebrow-deep">Kontakt i drejtpërdrejtë</p>
              <p className="mt-4 font-semibold">Fortesa Security.al SHPK</p>
              <p className="mt-2 text-sm text-muted">{SITE.address.join(", ")}</p>
              <a href={SITE.phoneHref} className="btn btn-deep mt-5">{SITE.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-cream lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading tone="dark" eyebrow="Para punimeve" title="Çfarë të sqaroni bashkë me ne" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-gold/20 bg-ink-2 p-7">
                <span className="icon-ring icon-ring-dark h-14 w-14">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-dark">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
