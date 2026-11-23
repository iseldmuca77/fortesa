import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogCard from "../../components/BlogCard";
import JsonLd from "../../components/JsonLd";
import { ArrowRightIcon, ClockIcon, PhoneIcon, SERVICE_ICONS } from "../../components/Icons";
import { blogHref, blogPostingSchema, formatPostDate, getCategory, getPost, getPostService, getPublishedPosts, modifiedTime, postQuoteHref, publishedTime, readingMinutes, relatedPosts } from "../../lib/blog";
import { pageMetadata } from "../../lib/seo";
import { breadcrumbSchema, graph } from "../../lib/schema";
import { ROUTES, SITE, serviceHref } from "../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const metadata = pageMetadata({ title: post.seoTitle, description: post.seoDescription, path: blogHref(post.slug) });
  const images = post.image ? [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }] : metadata.openGraph.images;
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, images, type: "article", publishedTime: publishedTime(post), modifiedTime: modifiedTime(post), authors: [post.author], section: getCategory(post.category)?.label },
    ...(post.image ? { twitter: { ...metadata.twitter, images: [post.image.src] } } : {}),
  };
}

function ArticleSection({ section }) {
  return (
    <section id={section.id} className="scroll-mt-28">
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets?.length > 0 && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      {section.table && (
        <div className="my-6 overflow-x-auto rounded-xl border border-cream-3 focus-visible:outline-2 focus-visible:outline-gold-dark" role="region" aria-label={`Tabela: ${section.title}`} tabIndex={0}>
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">{section.title}</caption>
            <thead className="bg-ink text-cream"><tr>{section.table.headers.map((header) => <th key={header} scope="col" className="min-w-36 px-5 py-4 font-semibold leading-relaxed">{header}</th>)}</tr></thead>
            <tbody>{section.table.rows.map((row, index) => <tr key={index} className="border-t border-cream-3 odd:bg-white/70 even:bg-cream-2/50">{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row" className="px-5 py-4 align-top font-semibold leading-6">{cell}</th> : <td key={cellIndex} className="px-5 py-4 align-top leading-6">{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
      {section.note && <aside className="my-6 rounded-r-xl border-l-4 border-gold bg-cream-2 px-5 py-4 text-sm leading-7 text-ink/85">{section.note}</aside>}
    </section>
  );
}

export default async function BlogArticle({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const service = getPostService(post);
  const Icon = service ? SERVICE_ICONS[service.icon] : null;
  const category = getCategory(post.category);
  const related = relatedPosts(post);
  const crumbs = [{ name: "Kreu", href: "/" }, { name: "Blog", href: ROUTES.blog }, { name: post.title, href: blogHref(post.slug) }];

  return (
    <>
      <JsonLd data={graph(blogPostingSchema(post), breadcrumbSchema(crumbs))} />
      <article>
        <header className="bg-ink text-cream">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <nav aria-label="Vendndodhja në faqe" className="mb-8"><ol className="flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold text-muted-dark"><li><Link href="/" className="hover:text-cream">Kreu</Link></li><li aria-hidden="true">/</li><li><Link href={ROUTES.blog} className="hover:text-cream">Blog</Link></li><li aria-hidden="true">/</li><li className="text-gold" aria-current="page">{category?.label}</li></ol></nav>
            <div className="flex items-start gap-6">
              <div className="min-w-0 flex-1">
                <Link href={`${ROUTES.blog}#${post.category}`} className="eyebrow hover:text-gold-light">{category?.label}</Link>
                <h1 className="mt-5 max-w-4xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-dark">{post.summary}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-muted-dark">
                  <Link href={ROUTES.about} rel="author" className="font-bold text-cream hover:text-gold">Nga {post.author}</Link>
                  <time dateTime={publishedTime(post)}>{formatPostDate(post.publishedAt)}</time>
                  <span className="inline-flex items-center gap-1.5"><ClockIcon className="h-4 w-4" />{readingMinutes(post)} min lexim</span>
                  {post.updatedAt !== post.publishedAt && <span>Përditësuar më <time dateTime={modifiedTime(post)}>{formatPostDate(post.updatedAt)}</time></span>}
                </div>
              </div>
              {Icon && <span className="icon-ring icon-ring-dark mt-8 hidden h-28 w-28 lg:inline-flex"><Icon className="h-12 w-12" /></span>}
            </div>
          </div>
        </header>
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14 lg:px-8 lg:py-14">
          <div className="min-w-0">
            {service && <section aria-label="Shërbimi dhe kërkesa për ofertë" className="mb-8 rounded-2xl border border-gold/35 bg-white/70 p-5 sm:p-6">
              <p className="text-sm leading-7 text-muted">Keni nevojë për këtë shërbim? Shihni çfarë ofron Fortesa ose dërgoni të dhënat e objektit për të sqaruar punën dhe preventivin.</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href={serviceHref(service.slug)} className="inline-flex items-center gap-2 text-sm font-bold text-gold-deep">{service.title}<ArrowRightIcon className="h-4 w-4" /></Link>
                <Link href={postQuoteHref(post)} className="btn btn-gold">Kërkoni ofertë për këtë shërbim</Link>
              </div>
            </section>}
            {post.image && <figure className="mb-8"><Image src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} sizes="(min-width: 1024px) 800px, 100vw" className="h-auto w-full rounded-2xl" />{post.image.caption && <figcaption className="mt-3 text-sm leading-6 text-muted">{post.image.caption}</figcaption>}</figure>}
            <nav aria-label="Përmbajtja e artikullit" className="mb-10 rounded-2xl border border-cream-3 bg-white/70 p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gold-deep">Në këtë udhëzues</h2>
              <ol className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">{post.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="flex items-baseline gap-3 leading-6 hover:text-gold-deep"><span className="text-xs font-bold text-gold-dark">{String(index + 1).padStart(2, "0")}</span><span>{section.title}</span></a></li>)}</ol>
            </nav>
            <div className="blog-content">
              <div className="space-y-5 border-b border-cream-3 pb-8 text-lg">{post.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              {post.sections.map((section) => <ArticleSection key={section.id} section={section} />)}
              {post.faq?.length > 0 && <section id="pyetje-te-shpeshta" className="scroll-mt-28"><h2>Pyetje të shpeshta</h2><div className="my-6 divide-y divide-cream-3 rounded-xl border border-cream-3 bg-white/70 px-5">{post.faq.map((item) => <details key={item.question} className="py-5"><summary className="cursor-pointer pr-3 font-bold leading-7 marker:text-gold-dark">{item.question}</summary><p className="mb-0! mt-3!">{item.answer}</p></details>)}</div></section>}
            </div>
            {post.sources?.length > 0 && <section className="mt-12 border-t border-cream-3 pt-8" aria-labelledby="sources-title"><h2 id="sources-title" className="font-display text-xl font-bold">Burime dhe shënime</h2><p className="mt-3 text-sm leading-6 text-muted">{post.sourcesCheckedAt && <>Burimet u kontrolluan më <time dateTime={post.sourcesCheckedAt}>{formatPostDate(post.sourcesCheckedAt)}</time>. </>}{post.category === "buyers" ? "Përmbajtja e ofertës dhe kushtet e shërbimit sqarohen me instaluesin për objektin tuaj." : "Çmimet e shitësve dhe specifikimet mund të ndryshojnë; kontrollojini para blerjes."}</p><ol className="mt-5 list-decimal space-y-4 pl-5 text-sm leading-6 marker:font-semibold marker:text-gold-dark">{post.sources.map((source) => <li key={source.url} className="pl-1"><a href={source.url} className="break-words font-semibold text-gold-deep underline decoration-gold-dark/40 underline-offset-4 hover:decoration-gold-dark">{source.label}</a>{source.note && <p className="mt-1 text-muted">{source.note}</p>}</li>)}</ol></section>}
          </div>
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl bg-ink p-7 text-cream">
              <p className="eyebrow">Projekti juaj</p>
              <h2 className="mt-4 font-display text-2xl font-bold">Nga informacioni te një ofertë konkrete</h2>
              <p className="mt-4 text-sm leading-7 text-muted-dark">Na dërgoni vendndodhjen, llojin e objektit dhe nevojën tuaj. Përmasat, fotot ose planimetria na ndihmojnë të sqarojmë punën.</p>
              <Link href={postQuoteHref(post)} className="btn btn-gold mt-6 w-full">Kërkoni një ofertë</Link>
              <a href={SITE.phoneHref} className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold hover:text-gold"><PhoneIcon className="h-4 w-4 text-gold" />{SITE.phoneDisplay}</a>
            </div>
            {service && <Link href={serviceHref(service.slug)} className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-cream-3 bg-white/70 p-5 text-sm font-bold text-gold-deep"><span>Shërbimi: {service.title}</span><ArrowRightIcon className="h-5 w-5 shrink-0" /></Link>}
          </aside>
        </div>
      </article>
      {related.length > 0 && <section className="border-t border-cream-3 bg-cream-2/50"><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><h2 className="font-display text-3xl font-extrabold">Lexoni edhe</h2><Link href={ROUTES.blog} className="text-sm font-bold text-gold-deep">Të gjithë artikujt →</Link></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map((item) => <BlogCard key={item.slug} post={item} />)}</div></div></section>}
    </>
  );
}
