import { SITE } from "./lib/site";

/** Served at /robots.txt. Everything is public; point crawlers at the sitemap. */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
