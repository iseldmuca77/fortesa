import Link from "next/link";
import { ArrowRightIcon, ClockIcon, SERVICE_ICONS } from "./Icons";
import { blogHref, getCategory, getPostService, readingMinutes } from "../lib/blog";

export default function BlogCard({ post }) {
  const service = getPostService(post);
  const Icon = service ? SERVICE_ICONS[service.icon] : null;
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-2xl border border-cream-3 bg-white/70 p-6 transition-colors hover:border-gold-dark/50 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">{getCategory(post.category)?.label}</span>
        {Icon && <span className="icon-ring h-11 w-11"><Icon className="h-5 w-5" /></span>}
      </div>
      <h3 className="mt-5 font-display text-xl font-bold leading-snug">
        <Link href={blogHref(post.slug)} className="rounded-sm transition-colors hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark">{post.title}</Link>
      </h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{post.summary}</p>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-cream-3 pt-5">
        <span className="inline-flex items-center gap-2 text-xs text-muted"><ClockIcon className="h-4 w-4" />{readingMinutes(post)} min lexim</span>
        <Link href={blogHref(post.slug)} aria-label={`Lexoni: ${post.title}`} className="inline-flex items-center gap-2 rounded-sm text-sm font-bold text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-dark">Lexoni udhëzuesin <ArrowRightIcon className="h-4 w-4 shrink-0" /></Link>
      </div>
    </article>
  );
}
