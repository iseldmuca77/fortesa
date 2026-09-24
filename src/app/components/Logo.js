import { useId } from "react";

/**
 * The Fortesa rook mark, drawn as an inline SVG with the brand gold gradient.
 * Pass `decorative` when it is purely ornamental (large faint watermark).
 */
export function RookMark({ className = "h-8 w-auto", title = "Fortesa", decorative = false }) {
  const rawId = useId();
  const gradId = `fortesa-gold-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const a11y = decorative
    ? { "aria-hidden": "true", focusable: "false" }
    : { role: "img", "aria-label": title };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 116" className={className} {...a11y}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2c574" />
          <stop offset="0.5" stopColor="#c9a54a" />
          <stop offset="1" stopColor="#8a6a1e" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradId})`}>
        <path d="M20 0h15v10h7.5V0h15v10H65V0h15v18l-8 8H28l-8-8z" />
        <path d="M31 30h38l7 54H24z" />
        <rect x="23" y="88" width="54" height="8" rx="2.5" />
        <rect x="17" y="100" width="66" height="12" rx="3" />
      </g>
    </svg>
  );
}

const SIZES = {
  sm: { mark: "h-7", word: "text-base", tag: "text-[6.5px]", gap: "gap-2" },
  md: { mark: "h-9", word: "text-xl", tag: "text-[8px]", gap: "gap-2.5" },
  lg: { mark: "h-14", word: "text-3xl", tag: "text-[11px]", gap: "gap-4" },
};

/**
 * Full lockup: rook mark + "FORTESA" wordmark + "SIGURI & TEKNOLOGJI" tagline.
 * variant="dark"  -> for black backgrounds (bright gold)
 * variant="light" -> for cream backgrounds (deep gold)
 */
export default function Logo({ variant = "dark", size = "md", tagline = true, className = "" }) {
  const s = SIZES[size] || SIZES.md;
  const wordClass = variant === "dark" ? "text-gold-gradient" : "text-gold-gradient-dark";
  const tagClass = variant === "dark" ? "text-gold/85" : "text-gold-dark/85";

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <RookMark className={`${s.mark} w-auto shrink-0`} />
      <span className="flex flex-col leading-none">
        <span className={`font-display font-extrabold tracking-[0.14em] ${s.word} ${wordClass}`}>
          FORTESA
        </span>
        {tagline && (
          <span className={`mt-1 font-sans font-semibold uppercase tracking-[0.3em] ${s.tag} ${tagClass}`}>
            Siguri dhe Teknologji
          </span>
        )}
      </span>
    </span>
  );
}
