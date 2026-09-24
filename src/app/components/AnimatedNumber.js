"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up from 0 to `value` once the element scrolls into view. */
export default function AnimatedNumber({ value, suffix = "", label, duration = 1400 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(value * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-extrabold text-gold-gradient-dark">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</div>
    </div>
  );
}
