"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/content";

function format(stat: Stat, n: number) {
  const body = stat.grouped
    ? Math.round(n).toLocaleString("en-US")
    : n.toFixed(stat.decimals ?? 0);
  return `${stat.prefix ?? ""}${body}${stat.suffix ?? ""}`;
}

/**
 * Renders the final number on the server (so it reads correctly without JS
 * and for search engines), then counts up from zero the first time it is seen.
 */
export function CountUp({ stat, className = "" }: { stat: Stat; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(stat.value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let frame = 0;
    setValue(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(stat.value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [stat.value]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {format(stat, value)}
      </span>
      <span className="sr-only">{format(stat, stat.value)}</span>
    </span>
  );
}
