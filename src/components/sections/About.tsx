import { about, principles } from "@/content";
import { principleIcons } from "../ui/Icons";
import { Container, H2, Section, SectionLabel } from "../ui/primitives";

export function About() {
  return (
    <Section id="about" theme="light" labelledBy="about-heading">
      <Container className="py-24 lg:py-32">
        <SectionLabel index="05">Why we exist</SectionLabel>
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <H2 id="about-heading" className="lg:col-span-6">
            {about.heading}
          </H2>
          <div className="space-y-5 text-[1.1875rem] leading-relaxed text-soft lg:col-span-5 lg:col-start-8 lg:pt-3" data-reveal>
            {about.story.map((para, i) => (
              <p key={i} className={i === about.story.length - 1 ? "font-medium text-fg" : undefined}>
                {para}
              </p>
            ))}
          </div>
        </div>

        <figure className="mt-20 border-t border-line pt-12 lg:mt-28 lg:pt-16" data-reveal>
          <blockquote>
            <p className="font-display text-[clamp(2.5rem,0.9rem+6.6vw,7.25rem)] leading-[0.95] font-extrabold tracking-[-0.045em]">
              <span className="text-accent" aria-hidden="true">
                &ldquo;
              </span>
              {about.quote}
              <span className="text-accent" aria-hidden="true">
                &rdquo;
              </span>
            </p>
          </blockquote>
          <figcaption className="mt-6 text-sm font-semibold text-soft">{about.quoteAttribution}</figcaption>
        </figure>
      </Container>
    </Section>
  );
}

export function Principles() {
  return (
    <Section id="principles" theme="dark" labelledBy="principles-heading">
      <Container className="py-24 lg:py-32">
        <SectionLabel index="06">Principles</SectionLabel>
        <H2 id="principles-heading" className="mt-6">
          {principles.heading}
        </H2>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.items.map((item, i) => {
            const Icon = principleIcons[item.icon];
            return (
              <li
                key={item.title}
                className="flex flex-col rounded-[var(--radius-card)] border border-card-line bg-card p-7"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-green text-ink">
                  <Icon size={24} />
                </span>
                <h3 className="mt-10 text-[1.5rem] leading-tight font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-soft">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
