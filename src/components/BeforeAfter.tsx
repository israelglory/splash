"use client";

import { useState } from "react";
import { statushdSpotlight } from "@/content";
import { SmartImage } from "./ui/SmartImage";

const { comparison } = statushdSpotlight;

/**
 * Draggable before/after comparison. A native range input drives it, so it
 * works with mouse, touch and keyboard (arrow keys) out of the box.
 */
export function BeforeAfter({ className = "" }: { className?: string }) {
  const [pos, setPos] = useState(50);

  return (
    <figure className={className}>
      <div
        className="compare relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-ink-2 select-none"
        style={{ ["--pos" as string]: `${pos}%` }}
      >
        <SmartImage
          src={comparison.after.src}
          alt={comparison.after.alt}
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full"
          fallback={<Scene />}
        />
        <div className="compare-before absolute inset-0">
          <SmartImage
            src={comparison.before.src}
            alt={comparison.before.alt}
            width={1600}
            height={1200}
            className="absolute inset-0 h-full w-full"
            fallback={<Scene blurred />}
          />
        </div>

        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.8125rem] font-semibold text-paper">
          {comparison.before.label}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-green px-3 py-1 text-[0.8125rem] font-semibold text-ink">
          {comparison.after.label}
        </span>

        <div className="compare-handle pointer-events-none absolute inset-y-0 w-0" aria-hidden="true">
          <span className="absolute inset-y-0 -left-px w-0.5 bg-paper" />
          <span className="compare-knob absolute top-1/2 left-0 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-[0_6px_20px_rgba(4,10,12,0.35)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={comparison.label}
          aria-valuetext={`${pos}% normal upload, ${100 - pos}% StatusHD`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          style={{ touchAction: "pan-y" }}
        />
      </div>
      <figcaption className="mt-3 text-sm text-soft">{comparison.label}.</figcaption>
    </figure>
  );
}

/**
 * Stand-in artwork until real before/after photos are supplied. Fine detail
 * (dots, thin lines) makes the difference between soft and sharp obvious.
 */
function Scene({ blurred }: { blurred?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      style={blurred ? { filter: "blur(3.5px) saturate(0.8)", transform: "scale(1.04)" } : undefined}
      aria-hidden="true"
    >
      <defs>
        <pattern id={blurred ? "dots-b" : "dots-a"} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill="#3DDC84" opacity="0.55" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="#CFE2DA" />
      <circle cx="292" cy="96" r="38" fill="#F3B94A" />
      <g stroke="#0E1A1F" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M80 70q6-6 12 0q6-6 12 0" />
        <path d="M118 52q4-4 8 0q4-4 8 0" />
        <path d="M150 80q5-5 10 0q5-5 10 0" />
      </g>
      <path d="M0 190 70 128l46 34 62-62 74 78 48-36 100 74v84H0Z" fill="#7DB6A2" />
      <path d="M0 214 92 168l70 34 84-58 88 66 66-28v118H0Z" fill="#0E6E35" />
      <path d="M0 214 92 168l70 34 84-58 88 66 66-28v118H0Z" fill={`url(#${blurred ? "dots-b" : "dots-a"})`} />
      <rect y="252" width="400" height="48" fill="#0E1A1F" />
      <g stroke="#A9BDB9" strokeWidth="1" strokeLinecap="round">
        <path d="M24 266h60M110 266h40M178 266h90M296 266h70" />
        <path d="M48 278h80M156 278h50M232 278h60M318 278h52" />
        <path d="M14 290h40M80 290h70M178 290h40M246 290h90" />
      </g>
    </svg>
  );
}
