import Link from "next/link";
import BlogCard from "./BlogCard";
import { getPublishedPosts } from "../lib/blog";
import { ROUTES } from "../lib/site";
import { ArrowRightIcon } from "./Icons";

export default function BlogSection({ serviceSlug }) {
  const all = getPublishedPosts();
  const posts = serviceSlug ? all.filter((post) => post.serviceSlug === serviceSlug).slice(0, 3) : [all.find((post) => post.serviceSlug === "kamera-sigurie"), all.find((post) => post.serviceSlug === "sisteme-alarmi"), all.find((post) => post.category === "hotels")].filter(Boolean);
  if (!posts.length) return null;
  return (
    <section className="border-t border-cream-3 bg-cream-2/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-9 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow eyebrow-deep">Nga blogu</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold">{serviceSlug ? "Lexoni para se të vendosni" : "Një vendim më i qartë, para instalimit"}</h2>
          </div>
          <Link href={ROUTES.blog} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-gold-deep">Të gjithë artikujt <ArrowRightIcon className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      </div>
    </section>
  );
}
