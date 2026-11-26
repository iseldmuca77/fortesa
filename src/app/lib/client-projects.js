import media from "./client-project-media.json";

// Project identities supplied by Iseld Muca on 26 November 2026.
// Only reviewed, optimized copies belong in the public media manifest.
const projects = [
  {
    id: "supermarket-family",
    title: "Supermarket Family",
    category: "Kamera sigurie · Biznese",
    description: "Kamera sigurie të montuara në ambientet e Supermarket Family.",
    href: "/sherbimet/kamera-sigurie",
    linkLabel: "Kamera sigurie",
  },
  {
    id: "hotel-marion",
    title: "Hotel Marion",
    category: "Rrjete dhe kabllim · Hoteleri",
    description: "Pamje nga punimet e rrjetit dhe kabllimit në Hotel Marion.",
    href: "/sherbimet/rrjete-wifi",
    linkLabel: "Rrjete dhe Wi-Fi",
  },
  {
    id: "starlink-jaht",
    title: "Starlink në jaht",
    category: "Lidhje interneti",
    description: "Instalim i Starlink në një jaht, i realizuar nga Fortesa.",
    href: "/sherbimet/rrjete-wifi",
    linkLabel: "Rrjete dhe Wi-Fi",
  },
  {
    id: "tripod-hipoteka-tirane",
    title: "Turniket tripod për punonjësit",
    category: "Hipoteka, Tiranë",
    description: "Instalim turniketi tripod për hyrje-daljen e punonjësve në Hipotekë, Tiranë.",
    href: "/kontakt",
    linkLabel: "Diskutoni projektin tuaj",
  },
  {
    id: "akses-citofon-argjendari",
    title: "Kontroll aksesi dhe citofon",
    category: "Argjendari",
    description: "Instalim i kontrollit të aksesit dhe citofonit në një argjendari.",
    href: "/kontakt",
    linkLabel: "Diskutoni projektin tuaj",
  },
  {
    id: "kamera-anpr-butrinti",
    title: "Kamera ANPR te Butrinti",
    category: "Kamera për leximin e targave",
    description: "Instalim kamerash ANPR te Butrinti, i realizuar nga Fortesa.",
    href: "/sherbimet/kamera-sigurie",
    linkLabel: "Kamera sigurie",
  },
  {
    id: "kamera-autobusi",
    title: "Kamera në autobus",
    category: "Linja e Komunës",
    description: "Instalim kamerash në autobusin e Linjës së Komunës.",
    href: "/sherbimet/kamera-sigurie",
    linkLabel: "Kamera sigurie",
  },
];

export const CLIENT_PROJECTS = projects.map((project) => ({ ...project, media: media[project.id] }));
