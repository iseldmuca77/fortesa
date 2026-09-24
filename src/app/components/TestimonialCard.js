import { FaQuoteLeft } from "react-icons/fa";
import { StarIcon } from "./Icons";

export default function TestimonialCard({ text, author, rating = 5 }) {
  return (
    <figure className="flex h-full w-full flex-col rounded-2xl border border-cream-3 bg-white/80 p-8 shadow-sm">
      <FaQuoteLeft className="text-2xl text-gold" aria-hidden="true" />
      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink/85">{text}</blockquote>
      <figcaption className="mt-6 flex items-center justify-between border-t border-cream-3 pt-5">
        <span className="text-sm font-bold text-ink">{author}</span>
        <span className="flex gap-0.5 text-gold" role="img" aria-label={`${rating} nga 5 yje`}>
          {Array.from({ length: rating }).map((_, i) => (
            <StarIcon key={i} className="h-4 w-4" />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
