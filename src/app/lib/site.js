/**
 * Single source of truth for Fortesa contact details, navigation and services.
 * Edit here and every page picks up the change.
 */
export const SITE = {
  name: "Fortesa",
  tagline: "Siguri dhe Teknologji",
  phoneDisplay: "+355 68 20 100 15",
  phoneHref: "tel:+355682010015",
  email: "fortesaalbania@gmail.com",
  website: "www.fortesa.al",
  websiteHref: "https://www.fortesa.al",
  address: ["Rruga Pandeli Cale", "Tiranë, Shqipëri"],
  mapQuery: "Rruga Pandeli Cale, Tirana, Albania",
  hours: ["Të hapur 24 orë, 7 ditë në javë", "Na telefononi në çdo kohë"],
  clients: "250+",
  years: "8+",
};

export const NAV_LINKS = [
  { href: "/", label: "Kreu" },
  { href: "/services", label: "Shërbimet" },
  { href: "/about", label: "Rreth Nesh" },
  { href: "/contact", label: "Kontakt" },
];

export const SERVICES = [
  {
    slug: "kamera",
    icon: "camera",
    title: "Kamera Sigurie",
    tags: ["Montim", "Monitorim", "Mirëmbajtje"],
    description:
      "Kamera sigurie me cilësi të lartë për shtëpi dhe biznese, me montim profesional dhe monitorim 24/7 nga telefoni ose kompjuteri juaj.",
  },
  {
    slug: "alarme",
    icon: "alarm",
    title: "Sisteme Alarmi",
    tags: ["Kundër vjedhjes", "Kundër zjarrit"],
    description:
      "Sisteme alarmi me sensorë të avancuar dhe njoftime të menjëhershme, që ju mbrojnë nga hyrjet e paautorizuara dhe nga zjarri.",
  },
  {
    slug: "elektrike",
    icon: "plug",
    title: "Instalime Elektrike",
    tags: ["Të plota", "Riparime", "Mirëmbajtje"],
    description:
      "Instalime elektrike të plota për objekte të reja, riparime dhe mirëmbajtje periodike, të kryera me siguri dhe sipas standardeve.",
  },
];
