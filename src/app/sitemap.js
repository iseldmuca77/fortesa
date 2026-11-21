import { ROUTES, SERVICES, SITE, serviceHref } from "./lib/site";
import { blogHref, getPublishedPosts } from "./lib/blog";

/** Served at /sitemap.xml. Submit it in Google Search Console and Bing Webmaster Tools. */
export default function sitemap() {
  const posts = getPublishedPosts();
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
    {
      url: `${SITE.url}${ROUTES.blog}`,
      ...(posts.length ? { lastModified: new Date(`${posts.map((post) => post.updatedAt).sort().at(-1)}T12:00:00Z`) } : {}),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({ url: `${SITE.url}${blogHref(post.slug)}`, lastModified: new Date(`${post.updatedAt}T12:00:00Z`), changeFrequency: "monthly", priority: 0.6 })),
  ];
}
