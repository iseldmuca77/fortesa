import { Manrope, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Fortesa | Siguri dhe Teknologji",
    template: "%s | Fortesa",
  },
  description:
    "Fortesa ofron kamera sigurie, sisteme alarmi, instalime elektrike, GPS për makina, porta automatike, sisteme parkingu, rrjete Wi-Fi dhe zgjidhje për hoteleri: montim, monitorim dhe mirëmbajtje. Mbi 250 klientë të kënaqur.",
  keywords: [
    "Fortesa",
    "kamera sigurie",
    "sisteme alarmi",
    "instalime elektrike",
    "GPS për makina",
    "sisteme parkingu",
    "porta automatike",
    "detektim zjarri",
    "brava elektrike hoteli",
    "rrjete Wi-Fi",
    "telefoni VoIP",
    "sisteme audio",
    "siguri",
    "Tiranë",
    "Shqipëri",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="sq" className={`${manrope.variable} ${robotoSlab.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
