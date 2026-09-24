/**
 * Single source of truth for Fortesa contact details, navigation and services.
 * Edit here and every page picks up the change.
 */

/** Canonical origin. fortesa.al redirects here, so every absolute URL uses www. */
const BASE_URL = "https://www.fortesa.al";

export const SITE = {
  name: "Fortesa",
  tagline: "Siguri dhe Teknologji",
  url: BASE_URL,
  description:
    "Fortesa (fortesa.al) është kompani me qendër në Tiranë, e specializuar në kamera sigurie (CCTV), sisteme alarmi, instalime elektrike, GPS për makina, sisteme parkingu me tra automatik, porta automatike, detektim zjarri, brava elektronike për hotele, rrjete dhe Wi-Fi, telefoni për hotele dhe sisteme audio, me montim, monitorim 24/7 dhe mirëmbajtje në gjithë Shqipërinë.",
  phoneDisplay: "+355 68 20 100 15",
  phoneHref: "tel:+355682010015",
  phoneE164: "+355682010015",
  email: "fortesaalbania@gmail.com",
  website: "www.fortesa.al",
  websiteHref: BASE_URL,
  address: ["Rruga Pandeli Cale", "Tiranë, Shqipëri"],
  street: "Rruga Pandeli Cale",
  city: "Tiranë",
  country: "Shqipëri",
  countryCode: "AL",
  mapQuery: "Rruga Pandeli Cale, Tirana, Albania",
  hours: ["Të hapur 24 orë, 7 ditë në javë", "Na telefononi në çdo kohë"],
  clients: "250+",
  years: "8+",
  /** Where Fortesa installs, as a phrase used in page copy. */
  serviceAreaText: "në Tiranë dhe në gjithë Shqipërinë",
  /** Public profiles (Facebook, Instagram, LinkedIn...). Full URLs added here are published as sameAs links. */
  socials: [],
};

export const ROUTES = {
  home: "/",
  services: "/sherbimet",
  about: "/rreth-nesh",
  contact: "/kontakt",
};

/** URL of the dedicated page for one service. */
export const serviceHref = (slug) => `${ROUTES.services}/${slug}`;

export const NAV_LINKS = [
  { href: ROUTES.home, label: "Kreu" },
  { href: ROUTES.services, label: "Shërbimet" },
  { href: ROUTES.about, label: "Rreth Nesh" },
  { href: ROUTES.contact, label: "Kontakt" },
];

/**
 * Every service Fortesa offers, in the order they appear on the site.
 * `slug` is the URL under /sherbimet and must have an entry in lib/service-details.js.
 * `icon` must be a key of SERVICE_ICONS in components/Icons.js.
 * `featured` marks the three core services shown in the home-page hero card.
 */
export const SERVICES = [
  {
    slug: "kamera-sigurie",
    icon: "camera",
    title: "Kamera Sigurie",
    tags: ["Montim", "Monitorim", "Mirëmbajtje"],
    description:
      "Kamera sigurie me cilësi të lartë për shtëpi dhe biznese, me montim profesional dhe monitorim 24/7 nga telefoni ose kompjuteri juaj.",
    featured: true,
  },
  {
    slug: "sisteme-alarmi",
    icon: "alarm",
    title: "Sisteme Alarmi",
    tags: ["Kundër vjedhjes", "Kundër zjarrit"],
    description:
      "Sisteme alarmi me sensorë të avancuar dhe njoftime të menjëhershme, që ju mbrojnë nga hyrjet e paautorizuara dhe nga zjarri.",
    featured: true,
  },
  {
    slug: "instalime-elektrike",
    icon: "plug",
    title: "Instalime Elektrike",
    tags: ["Të plota", "Riparime", "Mirëmbajtje"],
    description:
      "Instalime elektrike të plota për objekte të reja, riparime dhe mirëmbajtje periodike, të kryera me siguri dhe sipas standardeve.",
    featured: true,
  },
  {
    slug: "gps-per-makina",
    icon: "gps",
    title: "GPS për Makina",
    tags: ["Gjurmim", "Kontroll", "Monitorim në Kohë Reale"],
    description:
      "Pajisje GPS për lokalizim të saktë të automjeteve ose flotave tuaja. Përfshin monitorim të lëvizjes nga telefoni, histori të rrugëtimeve dhe njoftime rreth sigurisë së mjetit.",
  },
  {
    slug: "sisteme-parkingu",
    icon: "parking",
    title: "Sisteme Parkingu & Trau",
    tags: ["Vendosje Trau", "Biletari", "Kontroll Hyrje-Dalje"],
    description:
      "Zgjidhje të plota automatike për menaxhimin e parkingjeve për biznese, ambiente private ose publike. Pajisur me tra automatik, sisteme biletarie dhe lexim automatik të targave.",
  },
  {
    slug: "porta-automatike",
    icon: "gate",
    title: "Porta Automatike",
    tags: ["Automatisht", "Pllaka & Motora", "Komandim me Telekomandë/Telefon"],
    description:
      "Instalim motorësh dhe sistemesh automatike për porta oborri, garazhe dhe ambiente industriale. Sigurojnë hapje/mbyllje me komandë në distancë, sensorë mbrojtës dhe besueshmëri të lartë.",
  },
  {
    slug: "detektim-zjarri",
    icon: "flame",
    title: "Sisteme Detektimi Zjarri",
    tags: ["Detektorë Tymi", "Alarme Qendrore", "Standarde Sigurie"],
    description:
      "Sisteme profesionale për zbulimin e hershëm të tymit dhe zjarrit në objekte industriale, biznese apo komplekse banimi. Njoftim i menjëhershëm për parandalimin e çdo rreziku.",
  },
  {
    slug: "brava-elektrike-hoteleri",
    icon: "lock",
    title: "Brava Elektrike për Hoteleri",
    tags: ["Kartela Inteligjente", "Kontroll Aksesi", "Menaxhim me Software"],
    description:
      "Sisteme inteligjente të bravave me kartë apo kod për dhoma hoteli dhe ambiente zyrash. Lehtësojnë menaxhimin e hyrjeve, rrisin sigurinë dhe ofrojnë eksperiencë moderne për klientët.",
  },
  {
    slug: "rrjete-wifi",
    icon: "wifi",
    title: "Rrjete Networku & Wi-Fi",
    tags: ["Infrastrukturë Rrjeti", "Wi-Fi Profesional", "Kabllim Strukturuar"],
    description:
      "Dizajnim dhe shtrirje e rrjeteve kompjuterike me kabllo dhe Wi-Fi të shpejtë për shtëpi, zyra dhe hoteleri. Mbulim i plotë pa shkëputje dhe performancë e lartë transmetimi.",
  },
  {
    slug: "telefoni-hoteleri",
    icon: "headset",
    title: "Sisteme Telefonie për Hoteleri",
    tags: ["Qendra Telefonike (PBX/VoIP)", "Komunikim i Brendshëm", "Integrim me Software"],
    description:
      "Zgjidhje telefonie profesionale (IP/VoIP) për hotele dhe biznese. Mundësojnë komunikim të qartë ndërmjet dhomave, recepsionit dhe stafit, si dhe integrim të plotë me sistemet e menaxhimit të hotelit.",
  },
  {
    slug: "sisteme-audio",
    icon: "speaker",
    title: "Sisteme Audio & Tingullit",
    tags: ["Sisteme Zëri (PA)", "Audio për Ambiente & Hoteleri", "Muzikë Sfondi"],
    description:
      "Instalim i sistemeve profesionale të zërit për hotele, restorante, zyra dhe ambiente komerciale ose rezidenciale. Mundëson transmetim të pastër të muzikës së sfondit, ndarje në zona (Multi-Zone) dhe njoftime me mikrofon.",
  },
];

/** The core services highlighted in the hero card, as on the business card. */
export const FEATURED_SERVICES = SERVICES.filter((service) => service.featured);
