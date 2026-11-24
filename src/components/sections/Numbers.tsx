import { stats } from "@/content";
import { CountUp } from "../CountUp";
import { Container, H2, Section, SectionLabel } from "../ui/primitives";

export function Numbers() {
  return (
    <Section id="numbers" theme="light" labelledBy="numbers-heading">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel index="01">In numbers</SectionLabel>
            <H2 id="numbers-heading" className="mt-6">
              {stats.heading}
            </H2>
            <p className="mt-6 max-w-sm text-soft" data-reveal>
              {stats.caption} As of <time dateTime={stats.asOf}>{stats.asOfLabel}</time>.
            </p>
          </div>

          <ul
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3 lg:col-span-8"
            data-reveal
          >
            {stats.items.map((s) => (
              <li key={s.label} className="@container flex min-h-[9.5rem] flex-col justify-between gap-6 bg-surface p-5 sm:min-h-[11.5rem] sm:p-7">
                <CountUp
                  stat={s}
                  className="font-display text-[min(4rem,26cqw)] leading-none font-extrabold tracking-[-0.04em]"
                />
                <span className="text-[0.9375rem] leading-snug font-medium text-soft sm:text-base">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
