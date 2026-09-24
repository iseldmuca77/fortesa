import { ROUTES, SERVICES, SITE, serviceHref } from "./lib/site";

/** Served at /sitemap.xml. Submit it in Google Search Console and Bing Webmaster Tools. */
export default function sitemap() {
  const lastModified = new Date();
  const page = (path, priority, changeFrequency = "monthly") => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page(ROUTES.home, 1, "weekly"),
    page(ROUTES.services, 0.9, "weekly"),
    ...SERVICES.map((service) => page(serviceHref(service.slug), 0.8)),
    page(ROUTES.about, 0.6),
    page(ROUTES.contact, 0.7),
  ];
}
