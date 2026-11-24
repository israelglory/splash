"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { screenshots, stitchSpotlight } from "@/content";
import { Check, Replay, Sparkle } from "./ui/Icons";
import { Phone } from "./ui/Phone";

const { ai } = stitchSpotlight;
const FULL = ai.prompt.length;

type Phase = "idle" | "typing" | "working" | "done";

/**
 * The Stitch "type the edit" demo: the prompt types itself out, the edit
 * steps tick off, then the phone shows a Done state. Plays once when it
 * scrolls into view, with a replay button. Reduced motion shows the end state.
 */
export function StitchPromptDemo() {
  const root = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const [phase, setPhase] = useState<Phase>("done");
  const [chars, setChars] = useState<number>(FULL);
  const [steps, setSteps] = useState<number>(ai.steps.length);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const after = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));

  const play = useCallback(() => {
    clear();
    setPhase("typing");
    setChars(0);
    setSteps(0);
    let t = 350;
    for (let i = 1; i <= FULL; i++) {
      t += ai.prompt[i - 1] === " " ? 70 : 38;
      after(t, () => setChars(i));
    }
    t += 450;
    after(t, () => setPhase("working"));
    ai.steps.forEach((_, i) => {
      t += 620;
      after(t, () => setSteps(i + 1));
    });
    t += 500;
    after(t, () => setPhase("done"));
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    setPhase("idle");
    setChars(0);
    setSteps(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [play]);

  const typing = phase === "typing" || phase === "idle";
  const done = phase === "done";

  return (
    <div ref={root} className="relative mx-auto w-full max-w-[540px]">
      <p className="sr-only">
        Example: you type &ldquo;{ai.prompt}&rdquo; and Stitch applies the edit: {ai.steps.join(", ")}.
      </p>

      <div className="relative flex justify-center md:justify-start" aria-hidden="true">
        <Phone
          src={screenshots.stitchExport.src}
          alt=""
          variant="stitch"
          className="absolute top-[8%] right-[4%] hidden w-[46%] max-w-[230px] rotate-[4deg] opacity-90 sm:block"
        />
        <Phone
          src={screenshots.stitchCaptions.src}
          alt=""
          variant="stitch"
          className="relative w-[64%] max-w-[290px] animate-float sm:w-[54%]"
        >
          <span
            className={`absolute inset-x-[7%] top-[12%] z-20 flex items-center justify-center gap-[2.5cqw] rounded-full bg-green py-[3.2cqw] text-[5.4cqw] font-semibold text-ink shadow-[0_10px_30px_-8px_rgba(61,220,132,0.6)] transition-all duration-500 ${
              done ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-95 opacity-0"
            }`}
          >
            <Check size={16} strokeWidth={2.5} />
            {ai.done}
          </span>
          <span
            className={`absolute inset-0 z-10 bg-ink/45 transition-opacity duration-500 ${phase === "working" ? "opacity-100" : "opacity-0"}`}
          />
        </Phone>
      </div>

      {/* Chat panel. Overlaps the phone on wider screens, sits below it on phones. */}
      <div
        className="relative z-30 mx-auto -mt-16 w-[92%] max-w-[340px] rounded-[1.25rem] border border-card-line bg-ink-2 p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:absolute sm:right-0 sm:bottom-[10%] sm:mt-0 sm:w-[62%]"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-paper" aria-hidden="true">
            <Sparkle size={16} className="text-green" />
            Stitch AI
          </span>
          <button
            type="button"
            onClick={play}
            aria-label="Replay the AI editing example"
            className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-soft-on-dark transition-opacity hover:text-paper ${done ? "visible opacity-100" : "invisible opacity-0"}`}
          >
            <Replay size={14} />
            {ai.replay}
          </button>
        </div>

        <div className="mt-3 flex justify-end" aria-hidden="true">
          <p className="grid max-w-[95%] rounded-2xl rounded-br-md bg-green px-3.5 py-2.5 text-[0.9375rem] leading-snug font-medium text-ink">
            <span className="invisible col-start-1 row-start-1">{ai.prompt}</span>
            <span className="col-start-1 row-start-1">
              {ai.prompt.slice(0, chars)}
              {typing && <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-blink bg-ink" />}
            </span>
          </p>
        </div>

        <ul className="mt-3 space-y-1.5" aria-hidden="true">
          {ai.steps.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-2 text-[0.875rem] text-paper transition-all duration-300 ${
                i < steps ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
              }`}
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-green/15 text-green">
                <Check size={12} strokeWidth={3} />
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
