import { reach } from "@/content";
import { worldMap } from "@/data/world-map";
import { Container, H2, Section, SectionLabel, type SectionProps } from "../ui/primitives";

export function Reach({ index }: SectionProps) {
  const lagos = worldMap.markers.find((m) => m.name === "Nigeria")!;
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  return (
    <Section id="reach" theme="light" labelledBy="reach-heading">
      <Container className="py-24 lg:py-32">
        <SectionLabel index={index}>Reach</SectionLabel>
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <H2 id="reach-heading" className="lg:col-span-7">
            {reach.heading}
          </H2>
          <p className="max-w-md text-lg text-soft lg:col-span-4 lg:col-start-9" data-reveal>
            {reach.caption}
          </p>
        </div>

        <figure className="mt-14" data-reveal>
          <div className="relative">
            <svg
              viewBox={`0 0 ${worldMap.width} ${worldMap.height}`}
              className="block h-auto w-full"
              role="img"
              aria-label={`World map highlighting ${reach.countries.join(", ")}.`}
            >
              <path d={worldMap.base} stroke="var(--color-paper-3)" strokeWidth={worldMap.dotSize} strokeLinecap="round" fill="none" />
              <path d={worldMap.accent} stroke="var(--color-green-deep)" strokeWidth={worldMap.dotSize} strokeLinecap="round" fill="none" />
              {worldMap.markers.map((m) => (
                <g key={m.id}>
                  {m.name === "Nigeria" && (
                    <circle cx={m.x} cy={m.y} r={9} fill="var(--color-green)" className="origin-center animate-ping [transform-box:fill-box]" opacity={0.5} />
                  )}
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r={m.name === "Nigeria" ? 8 : 6}
                    fill={m.name === "Nigeria" ? "var(--color-ink)" : "var(--color-green)"}
                    stroke="var(--color-paper)"
                    strokeWidth={2.5}
                  />
                </g>
              ))}
            </svg>
            <span
              className="pointer-events-none absolute -translate-x-[calc(100%+0.875rem)] -translate-y-1/2 rounded-full bg-ink px-3 py-1 text-xs font-semibold whitespace-nowrap text-paper sm:text-sm"
              style={{ left: pct(lagos.x, worldMap.width), top: pct(lagos.y, worldMap.height) }}
              aria-hidden="true"
            >
              {reach.hqLabel}
            </span>
          </div>

          <figcaption className="mt-10">
            <span className="sr-only">Countries where our apps are used: </span>
            <ul className="flex flex-wrap gap-2">
              {reach.countries.map((c, i) => (
                <li
                  key={c}
                  className={
                    i < reach.leading
                      ? "inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.9375rem] font-semibold text-paper"
                      : "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.9375rem] font-medium"
                  }
                >
                  <span className={`size-1.5 rounded-full ${i < reach.leading ? "bg-green" : "bg-green-deep"}`} aria-hidden="true" />
                  {c}
                </li>
              ))}
              <li className="inline-flex items-center px-2 py-2 text-[0.9375rem] text-soft">{reach.moreLabel}</li>
            </ul>
          </figcaption>
        </figure>
      </Container>
    </Section>
  );
}
