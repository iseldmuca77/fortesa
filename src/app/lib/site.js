/**
 * Single source of truth for Fortesa contact details, navigation and services.
 * Edit here and every page picks up the change.
 */

/** Canonical origin. fortesa.al redirects here, so every absolute URL uses www. */
const BASE_URL = "https://www.fortesa.al";

export const SITE = {
  name: "Fortesa",
  legalName: "Fortesa Security.al SHPK",
  ownerName: "Igli Muca",
  tagline: "Siguri dhe Teknologji",
  url: BASE_URL,
  description:
    "Fortesa, me qendër në Tiranë, ofron kamera sigurie, alarme, instalime dhe riparime elektrike, si edhe sisteme për biznese e hotele. Ofron monitorim alarmesh 24/7 nga stafi dhe vizitë në objekt pas sinjalizimit, sipas shërbimit të dakordësuar. Pajisjet, punimet, mbulimi dhe kostot përcaktohen sipas objektit.",
  phoneDisplay: "+355 68 20 100 15",
  phoneHref: "tel:+355682010015",
  phoneE164: "+355682010015",
  whatsappHref: "https://wa.me/355682010015",
  email: "fortesaalbania@gmail.com",
  website: "www.fortesa.al",
  websiteHref: BASE_URL,
  address: ["Rruga Frang Bardhi", "Tiranë, Shqipëri"],
  street: "Rruga Frang Bardhi",
  city: "Tiranë",
  country: "Shqipëri",
  countryCode: "AL",
  mapQuery: "Rruga Frang Bardhi, Tirana, Albania",
  // Opening hours confirmed by the founder; these do not promise a response SLA.
  hours: ["Të hapur 24 orë, 7 ditë në javë"],
  availabilityText: "Na kontaktoni për të dakordësuar vizitën dhe punën.",
  // Numerical customer/experience claims remain unconfirmed.
  clients: null,
  years: null,
  /** Where Fortesa installs, as a phrase used in page copy. */
  serviceAreaText: "në Tiranë dhe në Shqipëri",
  /** Public profiles (Facebook, Instagram, LinkedIn...). Full URLs added here are published as sameAs links. */
  socials: [],
};

export const ROUTES = {
  home: "/",
  services: "/sherbimet",
  about: "/rreth-nesh",
  contact: "/kontakt",
  blog: "/blog",
  projectUpload: "/dergo-projektin",
};

/** URL of the dedicated page for one service. */
export const serviceHref = (slug) => `${ROUTES.services}/${slug}`;

export const NAV_LINKS = [
  { href: ROUTES.home, label: "Kreu" },
  { href: ROUTES.services, label: "Shërbimet" },
  { href: ROUTES.projectUpload, label: "Dërgo projektin" },
  { href: ROUTES.blog, label: "Blog" },
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
    tags: ["Montim", "Konfigurim", "Akses nga telefoni"],
    description:
      "Montim kamerash sigurie për shtëpi dhe biznese: përzgjedhje e pajisjeve, kabllim, regjistrim dhe konfigurim i aksesit sipas objektit.",
    featured: true,
  },
  {
    slug: "sisteme-alarmi",
    icon: "alarm",
    title: "Sisteme Alarmi",
    tags: ["Montim", "Monitorim 24/7", "Njoftime"],
    description:
      "Montim sistemesh alarmi dhe monitorim 24/7 nga stafi, me vizitë në objekt pas sinjalizimit sipas shërbimit të dakordësuar.",
    featured: true,
  },
  {
    slug: "instalime-elektrike",
    icon: "plug",
    title: "Instalime dhe Riparime Elektrike",
    tags: ["Instalime", "Riparime", "Rikonstruksione"],
    description:
      "Punime elektrike për objekte të reja dhe rikonstruksione, si edhe riparime defektesh në shtëpi e biznese. Na përshkruani punën që ju nevojitet.",
    featured: true,
  },
  {
    slug: "gps-per-makina",
    icon: "gps",
    title: "GPS për Makina",
    tags: ["Gjurmim", "Kontroll", "Monitorim në Kohë Reale"],
    description:
      "Pajisje GPS për automjete dhe flota, me akses në vendndodhje, histori rrugëtimesh dhe njoftime sipas pajisjes, platformës dhe lidhjes së të dhënave.",
  },
  {
    slug: "sisteme-parkingu",
    icon: "parking",
    title: "Sisteme Parkingu & Trau",
    tags: ["Vendosje Trau", "Biletari", "Kontroll Hyrje-Dalje"],
    description:
      "Sisteme parkingu me tra automatik dhe kontroll hyrje-daljesh. Telekomanda, kartat, biletaria dhe njohja e targave zgjidhen sipas mënyrës së përdorimit.",
  },
  {
    slug: "porta-automatike",
    icon: "gate",
    title: "Porta Automatike",
    tags: ["Automatisht", "Pllaka & Motora", "Komandim me Telekomandë/Telefon"],
    description:
      "Montim motorësh për porta oborri, garazhe dhe ambiente industriale. Motori, komandimi dhe pajisjet mbrojtëse përcaktohen sipas portës dhe kushteve të objektit.",
  },
  {
    slug: "detektim-zjarri",
    icon: "flame",
    title: "Sisteme Detektimi Zjarri",
    tags: ["Detektorë Tymi", "Qendra Alarmi", "Testim"],
    description:
      "Sisteme detektimi zjarri për biznese dhe objekte banimi, me pajisje dhe mënyra njoftimi të përcaktuara sipas projektit dhe përdorimit të objektit.",
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
      "Kabllim dhe konfigurim rrjetesh kompjuterike e Wi-Fi për shtëpi, zyra dhe hotele. Mbulimi dhe kapaciteti planifikohen sipas hapësirave dhe përdoruesve.",
  },
  {
    slug: "telefoni-hoteleri",
    icon: "headset",
    title: "Sisteme Telefonie për Hoteleri",
    tags: ["Qendra Telefonike (PBX/VoIP)", "Komunikim i Brendshëm", "Integrim me Software"],
    description:
      "Telefoni IP/VoIP për dhomat, recepsionin dhe stafin e hotelit. Funksionet dhe lidhja me programin e menaxhimit verifikohen për sistemet konkrete.",
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
