import Image from "next/image";
import Link from "next/link";
import Logo from "./components/Logo";
import Services from "./components/Services";
import WhyFortesa from "./components/WhyFortesa";
import Testimonials from "./components/Testimonials";
import CtaBand from "./components/CtaBand";
import { ArrowRightIcon, GlobeIcon, PhoneIcon, SERVICE_ICONS, StarIcon } from "./components/Icons";
import { FEATURED_SERVICES, SERVICES, SITE } from "./lib/site";

export default function Home() {
  const moreServices = SERVICES.length - FEATURED_SERVICES.length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-cream">
        <Image
          src="/images/home-wallpaper-3.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/90 to-ink/50" aria-hidden="true" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-transparent" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow animate-fade-up">Siguri dhe Teknologji</p>
            <h1 className="animate-fade-up fade-delay-1 mt-5 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              Siguria juaj, <span className="text-gold-gradient">prioriteti ynë</span>
            </h1>
            <p className="animate-fade-up fade-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
              Kamera sigurie, sisteme alarmi, instalime elektrike, GPS, porta automatike, rrjete dhe
              zgjidhje për hoteleri. Montim, monitorim dhe mirëmbajtje me teknologji moderne.
            </p>
            <div className="animate-fade-up fade-delay-3 mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn btn-gold">
                Na Kontaktoni
              </Link>
              <Link href="/services" className="btn btn-outline">
                Shërbimet Tona
              </Link>
            </div>
            <div className="animate-fade-up fade-delay-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <span className="inline-flex items-center gap-2 font-semibold text-cream/80">
                <span className="flex gap-0.5 text-gold" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </span>
                Mbi 250 klientë të kënaqur
              </span>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 font-semibold text-cream/80 transition-colors hover:text-gold"
              >
                <PhoneIcon className="h-4 w-4 text-gold" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Business-card style panel: the three core services, plus a link to the rest */}
          <div className="animate-fade-up fade-delay-2 lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-gold/30 bg-cream text-ink shadow-2xl shadow-black/50">
              <div className="flex items-center gap-5 border-b border-cream-3 px-6 py-5">
                <Logo variant="light" size="sm" />
                <span className="h-px flex-1 bg-gold-dark/30" aria-hidden="true" />
              </div>
              <ul className="divide-y divide-cream-3 px-6">
                {FEATURED_SERVICES.map((service) => {
                  const Icon = SERVICE_ICONS[service.icon];
                  return (
                    <li key={service.slug} className="flex items-center gap-4 py-5">
                      <span className="icon-ring h-14 w-14">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-lg font-bold">{service.title}</p>
                        <p className="text-sm text-muted">{service.tags.join(" · ")}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {moreServices > 0 && (
                <Link
                  href="/services"
                  className="group flex items-center justify-between border-t border-cream-3 px-6 py-4 text-sm font-bold text-gold-dark transition-colors hover:text-gold-deep"
                >
                  <span>Edhe {moreServices} shërbime të tjera</span>
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-gold-deep px-6 py-4 text-sm font-bold text-cream">
                <span className="inline-flex items-center gap-2">
                  <GlobeIcon className="h-4 w-4" />
                  {SITE.website}
                </span>
                <span className="inline-flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4" />
                  {SITE.phoneDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services compact />
      <WhyFortesa />
      <Testimonials />
      <CtaBand />
    </>
  );
}
