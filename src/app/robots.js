import { SITE } from "./lib/site";

/**
 * Keep public pages and rendering assets open to search and AI crawlers.
 * The wildcard includes Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot
 * and PerplexityBot; separate allow-only groups would override its exclusions.
 * Upload API endpoints are not search content. Robots rules are not access control.
 */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
