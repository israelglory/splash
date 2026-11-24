import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./Icons";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

type Theme = "dark" | "light" | "green";

export function Section({
  id,
  theme,
  className = "",
  labelledBy,
  children,
}: {
  id?: string;
  theme: Theme;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`theme-${theme} bg-surface text-fg ${className}`}>
      {children}
    </section>
  );
}

/** Numbered label that opens most sections, e.g. "03  Products". */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-sm font-medium text-soft" data-reveal>
      <span className="font-display font-bold tabular-nums text-accent">{index}</span>
      <span className="h-px w-8 bg-line" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-fg ${className}`}
    >
      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Badge({ children, tone = "line" }: { children: ReactNode; tone?: "line" | "accent" }) {
  return (
    <span
      className={
        tone === "accent"
          ? "inline-flex items-center gap-1.5 rounded-full bg-accent-fill px-3 py-1 text-[0.8125rem] font-semibold text-on-accent"
          : "inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[0.8125rem] font-medium text-fg"
      }
    >
      {children}
    </span>
  );
}

export function H2({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      data-reveal
      className={`text-[clamp(2.25rem,1.35rem+3.6vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.035em] ${className}`}
    >
      {children}
    </h2>
  );
}

type ButtonProps = ComponentProps<"a"> & { variant?: "primary" | "secondary"; arrow?: boolean };

export function ButtonLink({ variant = "primary", arrow, className = "", children, ...rest }: ButtonProps) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[1rem] font-semibold transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-accent-fill text-on-accent hover:bg-accent-hover"
      : "border border-fg/25 text-fg hover:border-fg hover:bg-fg/5";
  return (
    <a className={`${base} ${styles} ${className}`} {...rest}>
      {children}
      {arrow && <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </a>
  );
}

/** Props for links that leave the site. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
