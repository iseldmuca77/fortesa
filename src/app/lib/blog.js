import pricePosts from "./blog/price-posts.json";
import hotelPosts from "./blog/hotel-posts.json";
import buyerPosts from "./blog/buyer-posts.json";
import { ROUTES, SERVICES, SITE } from "./site";

export const BLOG_CATEGORIES = [
  { id: "buyers", label: "Zgjedhja e instaluesit", eyebrow: "01 / Para zgjedhjes", description: "Pyetje dhe kritere praktike për të krahasuar instaluesit, përvojën dhe përmbajtjen e ofertave." },
  { id: "prices", label: "Çmime & buxhet", eyebrow: "02 / Para ofertës", description: "Çfarë paguani për pajisjet, çfarë përfshin montimi dhe si të krahasoni ofertat." },
  { id: "hotels", label: "Hotele & mikpritje", eyebrow: "03 / Para hapjes", description: "Planifikimi i sistemeve, përputhshmëria dhe vendimet që duhen marrë para hapjes." },
];

const posts = [...buyerPosts, ...pricePosts, ...hotelPosts];
export const blogHref = (slug) => `/blog/${slug}`;
export const postQuoteHref = (post) => `${ROUTES.contact}?sherbimi=${encodeURIComponent(post.serviceSlug)}`;

// Keep editorial dates independent from verified publication timestamps and source checks.
// Date-only values remain valid when an exact historical timestamp is not known.
export const publishedTime = (post) => post.publishedAtISO || post.publishedAt;
export const modifiedTime = (post) => post.updatedAtISO || post.updatedAt;

/** Publishing is explicit. Future dates require a new deployment on/after that day. */
export function getPublishedPosts(now = new Date()) {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Tirane", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  return posts.filter((post) => post.status === "published" && /^\d{4}-\d{2}-\d{2}$/.test(post.publishedAt) && post.publishedAt <= today);
}

export function getPost(slug) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getPostService(post) {
  return SERVICES.find((service) => service.slug === post.serviceSlug);
}

export function getCategory(id) {
  return BLOG_CATEGORIES.find((category) => category.id === id);
}

export function formatPostDate(date) {
  return new Intl.DateTimeFormat("sq-AL", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Tirane" }).format(new Date(`${date}T12:00:00Z`));
}

export function readingMinutes(post) {
  const words = [post.title, ...post.intro, ...post.sections.flatMap((section) => [section.title, ...(section.paragraphs || []), ...(section.bullets || []), ...(section.table?.rows.flat() || []), section.note || ""]), ...(post.faq || []).flatMap((item) => [item.question, item.answer])].join(" ").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function relatedPosts(post, limit = 3) {
  const others = getPublishedPosts().filter((item) => item.slug !== post.slug);
  return [...others].sort((a, b) => {
    const score = (item) => (post.relatedSlugs?.includes(item.slug) ? 4 : 0) + (item.serviceSlug === post.serviceSlug ? 2 : 0) + (item.category === post.category ? 1 : 0);
    return score(b) - score(a);
  }).slice(0, limit);
}

export function blogPostingSchema(post) {
  const url = `${SITE.url}${blogHref(post.slug)}`;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.summary,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: publishedTime(post),
    dateModified: modifiedTime(post),
    inLanguage: "sq-AL",
    articleSection: getCategory(post.category)?.label,
    author: { "@type": "Organization", name: post.author, url: SITE.url },
    publisher: { "@id": `${SITE.url}/#business` },
    ...(post.image ? { image: { "@type": "ImageObject", url: new URL(post.image.src, SITE.url).toString(), width: post.image.width, height: post.image.height, caption: post.image.alt } } : {}),
  };
}
