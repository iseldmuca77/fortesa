/**
 * Eyebrow + title + optional lead paragraph.
 * tone="light" for cream backgrounds, tone="dark" for black backgrounds.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "light",
  className = "",
}) {
  const onDark = tone === "dark";
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && <p className={`eyebrow ${onDark ? "" : "eyebrow-deep"}`}>{eyebrow}</p>}
      <h2
        className={`mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl ${
          onDark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
            onDark ? "text-muted-dark" : "text-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
