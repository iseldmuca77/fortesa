import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Run against `npm start` or a deployed site. This inspects the returned HTML,
// so a page that only renders its article after hydration cannot pass.
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const origin = "https://www.fortesa.al";
const collections = await Promise.all(["buyer-posts", "price-posts", "hotel-posts"].map(async (name) =>
  JSON.parse(await readFile(new URL(`../src/app/lib/blog/${name}.json`, import.meta.url), "utf8"))
));
const allPosts = collections.flat();
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Tirane", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const posts = allPosts.filter((post) => post.status === "published" && post.publishedAt <= today);
assert.equal(new Set(allPosts.map((post) => post.slug)).size, allPosts.length, "Duplicate article slugs");
assert.ok(posts.length >= 11, "The initial eleven articles must be present");

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const localDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Tirane", year: "numeric", month: "2-digit", day: "2-digit" });
for (const post of posts) {
  for (const field of ["publishedAt", "updatedAt", "sourcesCheckedAt"]) {
    assert.match(post[field], datePattern, `${post.slug}: ${field} must be an explicit calendar date`);
    assert.equal(new Date(`${post[field]}T00:00:00Z`).toISOString().slice(0, 10), post[field], `${post.slug}: invalid ${field}`);
    assert.ok(post[field] <= today, `${post.slug}: future ${field}`);
  }
  assert.ok(post.updatedAt >= post.publishedAt, `${post.slug}: updated before publication`);
  for (const field of ["publishedAt", "updatedAt"]) {
    const timestamp = post[`${field}ISO`];
    if (!timestamp) continue;
    assert.match(timestamp, timestampPattern, `${post.slug}: ${field}ISO needs a timezone`);
    assert.equal(localDate.format(new Date(timestamp)), post[field], `${post.slug}: timestamp and editorial date disagree`);
  }
  if (post.image) {
    assert.match(post.image.src, /^\/images\/[a-zA-Z0-9/_-]+(?:\.[a-zA-Z0-9_-]+)*\.(?:avif|jpe?g|png|webp)$/, `${post.slug}: use an approved local article image`);
    assert.ok(post.image.alt?.trim(), `${post.slug}: image alt text missing`);
    assert.ok(Number.isInteger(post.image.width) && post.image.width > 0 && Number.isInteger(post.image.height) && post.image.height > 0, `${post.slug}: image dimensions missing`);
    await readFile(new URL(`../public${post.image.src}`, import.meta.url));
  }
}

async function page(path, expectedStatus = 200) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, expectedStatus, `${path}: HTTP status`);
  return response.text();
}

const index = await page("/blog");
const sitemap = await page("/sitemap.xml");
assert.match(index, /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.fortesa\.al\/blog"/);
for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const entry = match[1];
  const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
  assert.ok(loc, "Sitemap entry without URL");
  if (!new URL(loc).pathname.startsWith("/blog")) assert.ok(!entry.includes("<lastmod>"), `${loc}: unsupported static-page lastmod`);
}
const internalLinks = new Set(["/", "/kontakt"]);
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

for (const post of posts) {
  const path = `/blog/${post.slug}`;
  assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(new Set(post.sections.map((s) => s.id)).size, post.sections.length, `${path}: duplicate section IDs`);
  assert.ok(post.sources.length, `${path}: sources missing`);
  for (const source of post.sources) assert.equal(new URL(source.url).protocol, "https:", `${path}: invalid source URL`);
  for (const section of post.sections) {
    if (section.table) for (const row of section.table.rows) assert.equal(row.length, section.table.headers.length, `${path}: uneven table row`);
  }
  assert.ok(index.includes(`href="${path}"`), `${path}: missing from blog index`);
  assert.ok(sitemap.includes(`<loc>${origin}${path}</loc>`), `${path}: missing from sitemap`);
  const html = await page(path);
  const visibleMarkup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  const h1 = decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "") || "");
  assert.equal(h1, post.title, `${path}: article title not server rendered`);
  assert.ok(decode(visibleMarkup).includes(post.intro[0]), `${path}: article body not server rendered`);
  assert.ok(html.includes(`href="${origin}${path}"`), `${path}: self canonical missing`);
  assert.match(html, /property="og:type" content="article"/, `${path}: article Open Graph type missing`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
    const value = JSON.parse(match[1]);
    return value["@graph"] || [value];
  });
  const article = graphs.find((item) => item["@type"] === "BlogPosting");
  assert.ok(article, `${path}: BlogPosting schema missing`);
  assert.equal(article.headline, post.title);
  assert.equal(article.url, `${origin}${path}`);
  assert.equal(article.datePublished, post.publishedAtISO || post.publishedAt);
  assert.equal(article.dateModified, post.updatedAtISO || post.updatedAt);
  const sitemapEntry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find((match) => match[1].includes(`<loc>${origin}${path}</loc>`))?.[1];
  assert.ok(sitemapEntry?.includes(`<lastmod>${post.updatedAtISO || post.updatedAt}</lastmod>`), `${path}: sitemap date differs from verified article date`);
  const sourceSection = visibleMarkup.match(/<section\b[^>]*aria-labelledby="sources-title"[\s\S]*?<\/section>/)?.[0] || "";
  assert.ok(sourceSection.includes(`dateTime="${post.sourcesCheckedAt}"`) || sourceSection.includes(`datetime="${post.sourcesCheckedAt}"`), `${path}: explicit source-check date missing`);
  const quoteHref = `/kontakt?sherbimi=${encodeURIComponent(post.serviceSlug)}`;
  assert.ok(visibleMarkup.includes(`href="${quoteHref}"`), `${path}: contextual quotation link missing`);
  const contentsPosition = visibleMarkup.indexOf('aria-label="Përmbajtja e artikullit"');
  assert.ok(visibleMarkup.indexOf(`href="${quoteHref}"`) < contentsPosition, `${path}: quotation link must be visible before the contents`);
  if (post.image) assert.equal(article.image?.url, `${origin}${post.image.src}`, `${path}: article image schema mismatch`);
  else assert.ok(!article.image, `${path}: no unrelated placeholder article image`);
  assert.ok(graphs.some((item) => item["@type"] === "BreadcrumbList"));
  assert.ok(html.includes('href="tel:+355682010015"'), `${path}: phone CTA missing`);
  for (const section of post.sections) assert.ok(html.includes(`id="${section.id}"`), `${path}: broken contents anchor ${section.id}`);
  for (const match of html.matchAll(/href="(\/(?!\/)[^"#?]*)/g)) internalLinks.add(decode(match[1]));
  console.log(`PASS ${path}`);
}

for (const post of allPosts.filter((post) => !posts.includes(post))) {
  assert.ok(!index.includes(`href="/blog/${post.slug}"`), `Unpublished post listed: ${post.slug}`);
  assert.ok(!sitemap.includes(`${origin}/blog/${post.slug}<`), `Unpublished post in sitemap: ${post.slug}`);
  await page(`/blog/${post.slug}`, 404);
}
await page("/blog/this-article-does-not-exist", 404);
for (const path of internalLinks) if (!path.startsWith("/blog/")) await page(path);
console.log(`PASS ${posts.length} server-rendered articles, metadata, schema, sitemap, navigation and unknown-slug 404 on ${base}`);
