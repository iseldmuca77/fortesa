# Fortesa blog

The Albanian blog is part of the existing Next.js site. It uses local JSON content, with no CMS subscription, database or new dependency.

## Files

- `src/app/lib/blog/price-posts.json`: equipment, installation and budget guides.
- `src/app/lib/blog/hotel-posts.json`: hotel planning guides.
- `src/app/lib/blog.js`: published-content selectors, dates, links and schema.
- `src/app/blog/page.js`: category index.
- `src/app/blog/[slug]/page.js`: static article pages.

## Prepare an article

Copy an existing content object with a new, stable ASCII `slug`. Keep `status` as `draft` while writing. Required fields are `title`, `category` (`prices` or `hotels`), `serviceSlug` (an existing service), `summary`, `seoTitle`, `seoDescription`, `primaryQuestion`, `intro`, `sections`, `faq`, `sources`, `sourcesCheckedAt`, `relatedSlugs`, `publishedAt`, `updatedAt`, `status`, and `author`.

Each section has a unique ASCII `id` and `title`, with optional `paragraphs`, `bullets`, `table` (`headers` and `rows`) and `note`. Content is plain text; React escapes it. Do not put HTML or Markdown links inside strings. Put source links in `sources` with a meaningful `label`, full HTTPS `url` and relevant `note`.

Use `Fortesa` as the organization author only for content published by Fortesa. Do not invent a named reviewer, qualification, project, customer, endorsement or manufacturer partnership. Existing articles use service icons. An optional `image` object supports `src` (a path to an approved image in `public/`), descriptive `alt`, positive integer `width` and `height`, and an optional visible `caption`. The image appears in the article, sharing metadata and article schema. Record permission/provenance during review; do not use a logo as the article's main image, invent a project, or imply that an illustration documents completed work. No article image has been added to the initial eleven posts.

Prices must distinguish a sourced device/example calculation from a Fortesa quotation. Give currency, supplier/source, date, inclusions and exclusions. Do not make up installation prices, Albania-wide averages, aftercare commitments or mandatory technical/legal requirements. Source notes are visible to the reader. `sourcesCheckedAt` is an independent `YYYY-MM-DD` date: change it only after checking the cited sources, not after a template edit or deployment. The initial batch's checks on 21 November 2026 are recorded in the Fortesa Growth workspace's `blog-price-research.md`, `blog-hotel-research.md` and release report. Source notes retain their original dated observations.

`publishedAt` and `updatedAt` are editorial calendar dates in `YYYY-MM-DD`. Optional `publishedAtISO` and `updatedAtISO` provide verified ISO 8601 timestamps with a timezone for metadata, schema and sitemap output. If the exact time is unknown, omit the corresponding ISO field; date-only output is more accurate than inventing a time. An ISO field's Europe/Tirane calendar day must match its editorial date. If an article's date changes, update or remove its matching ISO field as part of the same edit. Do not change editorial or source-check dates for a shared-template-only change.

The initial eleven articles use the recorded success time `2026-11-21T15:54:16Z` from [GitHub Production deployment 7965681367](https://api.github.com/repos/iseldmuca77/fortesa/deployments/7965681367/statuses) for commit `53a543a02519e38cb58ad33058829fc82c060ec3`. Its success status says the deployment completed; this is deployment evidence, not a fabricated authoring or crawler timestamp. Publication/update calendar dates remain 21 November 2026. Static sitemap pages omit `lastmod` until meaningful per-page dates are maintained; an unrelated build must not refresh all dates.

## Review and publish

1. Check the Albanian language, technical claims, calculations and actual source pages. A Fortesa installer should confirm site-specific promises and approved company prices. General educational content does not replace a project design.
2. Give the article a distinct buyer question and an existing service target. Keep quotations and forms on the relevant service/contact path; do not create competing copies of a service page.
3. Set `publishedAt` and `updatedAt` to real dates in `YYYY-MM-DD`. Change `status` to `published` only when publication is authorized and review is complete.
4. Run `npm run lint` and `npm run build`. With `npm start` running, use `npm run check:blog` to check returned HTML, article metadata/schema, internal links, sitemap and unknown-slug 404. A deployed site can be checked with `npm run check:blog -- https://www.fortesa.al`. Inspect the branch's Vercel preview and check the article on mobile and desktop. Review tables, source links, the service link and phone/contact actions.
5. Release through the existing main-branch Vercel integration when authorized, then confirm production `/blog`, article URLs, metadata and `/sitemap.xml`.

Only `published` articles dated on or before the build day in Europe/Tirane appear in the index, related articles, static routes or sitemap. Unknown, draft and future slugs return 404. Changing a date alone does not schedule a deployment: deploy again on or after the intended day. To unpublish, set `status` to `draft` and redeploy. Content is held in this public repository; draft status hides web routes, not the underlying GitHub files. Keep confidential drafts outside the repository.

Navigation and footer share the Blog link. The homepage and relevant service pages display published guides. Articles include self-canonical metadata, article Open Graph fields, BlogPosting/Breadcrumb JSON-LD, a table of contents, source notes and enquiry actions. An early service link and quote link preserve the article's `serviceSlug` at `/kontakt?sherbimi=<serviceSlug>`; the sidebar uses the same contextual quote path. This blog implementation does not add a contact backend or recurring publishing automation.
