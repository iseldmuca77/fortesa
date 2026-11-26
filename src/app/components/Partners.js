import Image from "next/image";
import Link from "next/link";
import JsonLd from "./JsonLd";
import { abs, BUSINESS_ID, graph, WEBSITE_ID } from "../lib/schema";
import { DEFAULT_TITLE } from "../lib/seo";
import { serviceHref } from "../lib/site";

const SECURITY_BRANDS = [
  { name: "Hikvision", logo: "hikvision.svg", url: "https://www.hikvision.com/en/" },
  { name: "Dahua", logo: "dahua.png", url: "https://www.dahuasecurity.com/" },
  { name: "Teletek Electronics", logo: "teletek.png", url: "https://teletek-electronics.com/" },
  { name: "Uniview", logo: "uniview.svg", url: "https://www.uniview.com/" },
  { name: "Ajax", logo: "ajax.svg", url: "https://ajax.systems/" },
  { name: "Imou", logo: "imou.png", url: "https://www.imoulife.com/" },
];

const AUDIO_BRANDS = [{ name: "Fonestar", logo: "fonestar.svg", url: "https://fonestar.com/en/" }];

const ELECTRICAL_BRANDS = [
  { name: "Schneider Electric", logo: "schneider-electric.svg", url: "https://www.se.com/" },
  { name: "BTicino", logo: "bticino.svg", url: "https://www.bticino.com/" },
];

const SERVICE_LINK_CLASS = "underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep";

function BrandList({ brands }) {
  return (
    <ul className={`grid gap-3 ${brands.length === 1 ? "grid-cols-1" : brands.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
      {brands.map((brand) => (
        <li key={brand.name} className="flex flex-col items-center justify-center gap-3 rounded-lg border border-cream-3 bg-white px-4 pb-3 pt-5 sm:px-5">
          <Image
            src={`/images/partners/${brand.logo}`}
            alt=""
            width={160}
            height={52}
            unoptimized
            className="h-12 w-full max-w-40 object-contain"
          />
          <a href={brand.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center justify-center rounded text-center text-xs font-semibold text-muted underline decoration-cream-3 underline-offset-4 hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-deep">
            {brand.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section id="partneret" aria-labelledby="partners-heading" className="scroll-mt-24 border-b border-cream-3 bg-cream-2/40">
      <JsonLd data={graph({
        "@type": "WebPage",
        "@id": `${abs("/")}#webpage`,
        url: abs("/"),
        name: DEFAULT_TITLE,
        inLanguage: "sq",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        mentions: [...SECURITY_BRANDS, ...AUDIO_BRANDS, ...ELECTRICAL_BRANDS].map(({ name, url }) => ({
          "@type": "Brand",
          name,
          url,
        })),
      })} />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-20">
        <div className="lg:col-span-4 lg:pt-8">
          <p className="eyebrow eyebrow-deep">Markat me të cilat punojmë</p>
          <h2 id="partners-heading" className="mt-5 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Partnerët tanë</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Marka për sisteme sigurie, sisteme audio dhe instalime elektrike.
          </p>
          <div aria-hidden="true" className="mt-8 h-1 w-16 rounded-full bg-gold" />
        </div>

        <div className="space-y-6 lg:col-span-8">
          <div>
            <h3 className="mb-3 text-sm font-bold text-gold-deep">
              <Link href={serviceHref("kamera-sigurie")} className={SERVICE_LINK_CLASS}>Kamera</Link>
              {" dhe "}
              <Link href={serviceHref("sisteme-alarmi")} className={SERVICE_LINK_CLASS}>alarme</Link>
            </h3>
            <BrandList brands={SECURITY_BRANDS} />
          </div>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-3">
            <div>
              <h3 className="mb-3 text-sm font-bold text-gold-deep">
                <Link href={serviceHref("sisteme-audio")} className={SERVICE_LINK_CLASS}>Sisteme audio</Link>
              </h3>
              <BrandList brands={AUDIO_BRANDS} />
            </div>
            <div className="sm:col-span-2">
              <h3 className="mb-3 text-sm font-bold text-gold-deep">
                <Link href={serviceHref("instalime-elektrike")} className={SERVICE_LINK_CLASS}>Pajisje elektrike</Link>
              </h3>
              <BrandList brands={ELECTRICAL_BRANDS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
