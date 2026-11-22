import { ROUTES, SERVICES, SITE, serviceHref } from "./lib/site";
import { blogHref, getPublishedPosts, modifiedTime } from "./lib/blog";

/** Served at /sitemap.xml. Submit it in Google Search Console and Bing Webmaster Tools. */
export default function sitemap() {
  const posts = getPublishedPosts();
  // An unrelated deployment is not evidence that every page's content changed.
  // Omit static-page dates until per-page editorial dates are maintained.
  const page = (path) => ({ url: `${SITE.url}${path}` });
  const lastBlogUpdate = posts.map(modifiedTime).sort((a, b) => Date.parse(a) - Date.parse(b)).at(-1);

  return [
    page(ROUTES.home),
    page(ROUTES.services),
    ...SERVICES.map((service) => page(serviceHref(service.slug))),
    page(ROUTES.about),
    page(ROUTES.contact),
    {
      url: `${SITE.url}${ROUTES.blog}`,
      ...(lastBlogUpdate ? { lastModified: lastBlogUpdate } : {}),
    },
    ...posts.map((post) => ({ url: `${SITE.url}${blogHref(post.slug)}`, lastModified: modifiedTime(post) })),
  ];
}
