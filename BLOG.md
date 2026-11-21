# Fortesa blog

The Albanian blog is part of the existing Next.js site. It uses local JSON content, with no CMS subscription, database or new dependency.

## Files

- `src/app/lib/blog/price-posts.json`: equipment, installation and budget guides.
- `src/app/lib/blog/hotel-posts.json`: hotel planning guides.
- `src/app/lib/blog.js`: published-content selectors, dates, links and schema.
- `src/app/blog/page.js`: category index.
- `src/app/blog/[slug]/page.js`: static article pages.

## Prepare an article

Copy an existing content object with a new, stable ASCII `slug`. Keep `status` as `draft` while writing. Required fields are `title`, `category` (`prices` or `hotels`), `serviceSlug` (an existing service), `summary`, `seoTitle`, `seoDescription`, `primaryQuestion`, `intro`, `sections`, `faq`, `sources`, `relatedSlugs`, `publishedAt`, `updatedAt`, `status`, and `author`.

Each section has a unique ASCII `id` and `title`, with optional `paragraphs`, `bullets`, `table` (`headers` and `rows`) and `note`. Content is plain text; React escapes it. Do not put HTML or Markdown links inside strings. Put source links in `sources` with a meaningful `label`, full HTTPS `url` and relevant `note`.

Use `Fortesa` as the organization author only for content published by Fortesa. Do not invent a named reviewer, qualification, project, customer, endorsement or manufacturer partnership. This release uses service icons rather than photographs of purported installations.

Prices must distinguish a sourced device/example calculation from a Fortesa quotation. Give currency, supplier/source, date, inclusions and exclusions. Do not make up installation prices, Albania-wide averages, aftercare commitments or mandatory technical/legal requirements. Source notes are visible to the reader. When a price/source is refreshed, review the linked page and update the article date; the visible source-check date uses `updatedAt`.

## Review and publish

1. Check the Albanian language, technical claims, calculations and actual source pages. A Fortesa installer should confirm site-specific promises and approved company prices. General educational content does not replace a project design.
2. Give the article a distinct buyer question and an existing service target. Keep quotations and forms on the relevant service/contact path; do not create competing copies of a service page.
3. Set `publishedAt` and `updatedAt` to real dates in `YYYY-MM-DD`. Change `status` to `published` only when publication is authorized and review is complete.
4. Run `npm run lint` and `npm run build`. With `npm start` running, use `npm run check:blog` to check returned HTML, article metadata/schema, internal links, sitemap and unknown-slug 404. A deployed site can be checked with `npm run check:blog -- https://www.fortesa.al`. Inspect the branch's Vercel preview and check the article on mobile and desktop. Review tables, source links, the service link and phone/contact actions.
5. Release through the existing main-branch Vercel integration when authorized, then confirm production `/blog`, article URLs, metadata and `/sitemap.xml`.

Only `published` articles dated on or before the build day in Europe/Tirane appear in the index, related articles, static routes or sitemap. Unknown, draft and future slugs return 404. Changing a date alone does not schedule a deployment: deploy again on or after the intended day. To unpublish, set `status` to `draft` and redeploy. Content is held in this public repository; draft status hides web routes, not the underlying GitHub files. Keep confidential drafts outside the repository.

Navigation and footer share the Blog link. The homepage and relevant service pages display published guides. Articles include self-canonical metadata, article Open Graph fields, BlogPosting/Breadcrumb JSON-LD, a table of contents, source notes and enquiry actions. This release does not add analytics events, a new contact backend or any recurring publishing automation.
