import Link from "next/link";
import BlogCard from "../components/BlogCard";
import JsonLd from "../components/JsonLd";
import { RookMark } from "../components/Logo";
import { BLOG_CATEGORIES, blogHref, getPublishedPosts } from "../lib/blog";
import { pageMetadata } from "../lib/seo";
import { breadcrumbSchema, graph } from "../lib/schema";
import { ROUTES, SITE } from "../lib/site";

export const metadata = pageMetadata({ title: "Blog: çmime, siguri dhe sisteme për hotele", description: "Udhëzues në shqip për kamerat, alarmet, portat, GPS dhe sistemet e hotelit. Krahasoni pajisjet, planifikoni buxhetin dhe përgatitni kërkesën për ofertë.", path: ROUTES.blog });

export default function BlogPage() {
  const posts = getPublishedPosts();
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Kreu", href: "/" }, { name: "Blog", href: ROUTES.blog }]), { "@type": "CollectionPage", name: "Blogu Fortesa", url: `${SITE.url}${ROUTES.blog}`, inLanguage: "sq-AL", mainEntity: { "@type": "ItemList", itemListElement: posts.map((post, index) => ({ "@type": "ListItem", position: index + 1, name: post.title, url: `${SITE.url}${blogHref(post.slug)}` })) } })} />
      <section className="relative overflow-hidden bg-ink text-cream">
        <RookMark decorative className="pointer-events-none absolute -right-16 top-10 h-96 w-auto opacity-[0.05]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Vendndodhja në faqe" className="mb-9 flex gap-3 text-xs font-semibold text-muted-dark"><Link href="/" className="hover:text-cream">Kreu</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-gold">Blog</span></nav>
          <p className="eyebrow">Blogu Fortesa</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">Planifikoni me kujdes.<br /><span className="text-gold">Zgjidhni me siguri.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark">Çmime orientuese, krahasime dhe lista praktike për shtëpinë, biznesin dhe hotelin tuaj. Filloni me pyetjen që keni sot.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {BLOG_CATEGORIES.map((category) => <a key={category.id} href={`#${category.id}`} className="rounded-full border border-gold/35 px-5 py-3 text-sm font-semibold transition-colors hover:bg-gold hover:text-ink">{category.label}<span className="ml-3 text-xs opacity-70">{posts.filter((post) => post.category === category.id).length}</span></a>)}
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {BLOG_CATEGORIES.map((category) => (
          <section key={category.id} id={category.id} className="mb-16 scroll-mt-28 last:mb-0" aria-labelledby={`${category.id}-title`}>
            <div className="mb-8 max-w-3xl"><p className="eyebrow eyebrow-deep">{category.id === "prices" ? "01 / Para ofertës" : "02 / Para hapjes"}</p><h2 id={`${category.id}-title`} className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">{category.label}</h2><p className="mt-3 leading-relaxed text-muted">{category.description}</p></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.filter((post) => post.category === category.id).map((post) => <BlogCard key={post.slug} post={post} />)}</div>
          </section>
        ))}
      </div>
      <section className="border-t border-gold/25 bg-ink text-cream"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8"><div><h2 className="font-display text-2xl font-bold">Keni një projekt konkret?</h2><p className="mt-3 max-w-2xl leading-relaxed text-muted-dark">Na tregoni llojin e objektit, vendndodhjen dhe çfarë doni të zgjidhni. Këto të dhëna janë hapi i parë drejt një oferte të qartë.</p></div><Link href={ROUTES.contact} className="btn btn-gold shrink-0">Kërkoni një ofertë</Link></div></section>
    </>
  );
}
