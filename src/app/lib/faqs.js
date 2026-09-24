import { SITE } from "./site";

/** General questions answered on the home page (also published as FAQPage data). */
export const HOME_FAQS = [
  {
    q: "Çfarë shërbimesh ofron Fortesa?",
    a: "Fortesa ofron kamera sigurie (CCTV), sisteme alarmi, instalime elektrike, GPS për makina, sisteme parkingu me tra automatik, porta automatike, detektim zjarri, brava elektronike për hotele, rrjete dhe Wi-Fi, telefoni për hotele dhe sisteme audio, me montim, monitorim dhe mirëmbajtje.",
  },
  {
    q: "Ku operon Fortesa?",
    a: `Fortesa ka qendrën në ${SITE.city} (${SITE.street}) dhe kryen montime për klientë ${SITE.serviceAreaText}.`,
  },
  {
    q: "A mund t’i ndjek kamerat dhe alarmin nga telefoni?",
    a: "Po. Kamerat, alarmet dhe pajisjet GPS konfigurohen që t’i ndiqni nga telefoni ose kompjuteri në kohë reale, me njoftime të menjëhershme për çdo ngjarje.",
  },
  {
    q: "A punoni me hotele dhe biznese?",
    a: "Po. Përveç shtëpive, punojmë me hotele, restorante, zyra, magazina dhe komplekse banimi, ku ofrojmë edhe brava elektronike, telefoni, rrjete dhe sisteme audio.",
  },
  {
    q: "Si mund të marr një ofertë?",
    a: `Na telefononi në ${SITE.phoneDisplay} ose plotësoni formularin e kontaktit. Vlerësojmë objektin tuaj dhe ju përgatisim një ofertë të personalizuar.`,
  },
  {
    q: "A ofroni mirëmbajtje pas montimit?",
    a: "Po. Ofrojmë kontrolle periodike, përditësime dhe asistencë teknike 24/7 për të gjitha sistemet që montojmë.",
  },
];
