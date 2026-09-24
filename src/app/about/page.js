import Image from "next/image";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import AnimatedNumber from "../components/AnimatedNumber";
import CtaBand from "../components/CtaBand";
import { BadgeCheckIcon, HandshakeIcon, HeartIcon, LightbulbIcon } from "../components/Icons";

export const metadata = {
  title: "Rreth Nesh",
  description:
    "Fortesa është një kompani shqiptare e specializuar në sisteme sigurie, instalime elektrike, automatizim dhe zgjidhje teknologjike për shtëpi, biznese dhe hoteleri, me mbi 250 klientë të kënaqur.",
};

const VALUES = [
  {
    icon: BadgeCheckIcon,
    title: "Profesionalizmi",
    text: "Mbajmë standardet më të larta të sjelljes dhe performancës në çdo aspekt të punës sonë.",
  },
  {
    icon: HandshakeIcon,
    title: "Besimi",
    text: "Ndërtimi i besimit me klientët tanë është në thelb të asaj që bëjmë, me transparencë dhe integritet.",
  },
  {
    icon: HeartIcon,
    title: "Kujdesi për Klientin",
    text: "Siguria dhe kënaqësia e klientëve tanë janë prioriteti ynë kryesor.",
  },
  {
    icon: LightbulbIcon,
    title: "Inovacioni",
    text: "Përqafojmë teknologjinë dhe zgjidhjet më të avancuara për të qëndruar përpara në fushën e sigurisë.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Rreth Nesh"
        title="Mirë se vini në Fortesa"
        lead="Siguri dhe teknologji për shtëpi dhe biznese, me një ekip që kujdeset për mbrojtjen tuaj."
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
                Fortesa është një kompani shqiptare e specializuar në sisteme sigurie dhe instalime
                teknologjike. Ofrojmë kamera sigurie, sisteme alarmi dhe detektimi zjarri, instalime
                elektrike, GPS për makina, sisteme parkingu, porta automatike dhe rrjete Wi-Fi, si dhe
                brava elektrike, telefoni dhe sisteme audio për hoteleri, me montim, monitorim dhe
                mirëmbajtje nga ekipi ynë.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Historia Jonë</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Me mbi 8 vjet përvojë, Fortesa është rritur nga një biznes i vogël lokal në një emër të
                besuar në fushën e sigurisë, duke ndërtuar reputacionin mbi besueshmërinë dhe përsosmërinë.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Misioni Ynë</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Të ofrojmë zgjidhje sigurie novatore dhe të besueshme, të përshtatura për nevojat e çdo
                klienti, duke garantuar qetësi mendore.
              </p>
            </div>

            <Link href="/contact" className="btn btn-deep">
              Na Kontaktoni
            </Link>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-cream-3 shadow-xl">
              <Image
                src="/images/home-wallpaper-3.jpg"
                alt="Kamera sigurie të montuara në një mur"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" aria-hidden="true" />
            </div>

            <div className="mt-6 rounded-2xl border border-cream-3 bg-cream p-6 shadow-xl lg:absolute lg:bottom-8 lg:right-8 lg:mt-0 lg:w-60">
              <div className="grid grid-cols-3 gap-6 lg:grid-cols-1">
                <AnimatedNumber value={250} suffix="+" label="Klientë të kënaqur" />
                <div>
                  <div className="font-display text-4xl font-extrabold text-gold-gradient-dark">24/7</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Asistencë</div>
                </div>
                <AnimatedNumber value={8} suffix="+" label="Vjet përvojë" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-cream lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading tone="dark" eyebrow="Vlerat tona" title="Çfarë na udhëheq" />
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
