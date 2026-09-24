import { Manrope, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { SITE } from "./lib/site";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_BASE, SEO_KEYWORDS } from "./lib/seo";
import { businessSchema, graph, webSiteSchema } from "./lib/schema";

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

// Search-console ownership tokens, set as environment variables on Vercel (see .env.example).
const verification = {};
if (process.env.GOOGLE_SITE_VERIFICATION) verification.google = process.env.GOOGLE_SITE_VERIFICATION;
if (process.env.BING_SITE_VERIFICATION) verification.other = { "msvalidate.01": process.env.BING_SITE_VERIFICATION };

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  applicationName: SITE.name,
  creator: SITE.name,
  publisher: SITE.name,
  category: "business",
  openGraph: { ...OG_BASE, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, url: "/" },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
  verification,
};

export default function RootLayout({ children }) {
  return (
    <html lang="sq" className={`${manrope.variable} ${robotoSlab.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <JsonLd data={graph(businessSchema(), webSiteSchema())} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
