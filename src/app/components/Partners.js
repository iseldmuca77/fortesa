import Image from "next/image";

const SECURITY_BRANDS = [
  { name: "Hikvision", logo: "hikvision.svg" },
  { name: "Dahua", logo: "dahua.png" },
  { name: "Teletek Electronics", logo: "teletek.png" },
  { name: "Uniview", logo: "uniview.svg" },
  { name: "Ajax", logo: "ajax.svg" },
  { name: "Imou", logo: "imou.png" },
];

const AUDIO_BRANDS = [{ name: "Fonestar", logo: "fonestar.svg" }];

const ELECTRICAL_BRANDS = [
  { name: "Schneider Electric", logo: "schneider-electric.svg" },
  { name: "BTicino", logo: "bticino.svg" },
];

function BrandList({ brands }) {
  return (
    <ul className={`grid gap-3 ${brands.length === 1 ? "grid-cols-1" : brands.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
      {brands.map((brand) => (
        <li key={brand.name} className="flex min-h-24 items-center justify-center rounded-lg border border-cream-3 bg-white px-5 py-6 sm:min-h-28">
          <Image
            src={`/images/partners/${brand.logo}`}
            alt={brand.name}
            width={160}
            height={52}
            unoptimized
            className="h-12 w-full max-w-40 object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

export default function Partners() {
  return (
    <section id="partneret" aria-labelledby="partners-heading" className="scroll-mt-24 border-b border-cream-3 bg-cream-2/40">
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
            <h3 className="mb-3 text-sm font-bold text-gold-deep">Kamera dhe alarme</h3>
            <BrandList brands={SECURITY_BRANDS} />
          </div>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-3">
            <div>
              <h3 className="mb-3 text-sm font-bold text-gold-deep">Sisteme audio</h3>
              <BrandList brands={AUDIO_BRANDS} />
            </div>
            <div className="sm:col-span-2">
              <h3 className="mb-3 text-sm font-bold text-gold-deep">Pajisje elektrike</h3>
              <BrandList brands={ELECTRICAL_BRANDS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
