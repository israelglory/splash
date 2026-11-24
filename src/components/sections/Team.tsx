import { team } from "@/content";
import { LinkedInLogo } from "../ui/Icons";
import { Container, external, H2, Section, SectionLabel } from "../ui/primitives";
import { SmartImage } from "../ui/SmartImage";

export function Team() {
  return (
    <Section id="team" theme="dark" labelledBy="team-heading">
      <Container className="py-24 lg:py-32">
        <SectionLabel index="08">Team</SectionLabel>
        <H2 id="team-heading" className="mt-6">
          {team.heading}
        </H2>

        <ul className="mt-14 grid gap-5 lg:grid-cols-2">
          {team.founders.map((f, i) => (
            <li
              key={f.name}
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-card-line bg-card sm:flex-row"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <SmartImage
                src={f.photo}
                alt={`Portrait of ${f.name}, ${f.role} of Splash`}
                width={800}
                height={1000}
                className="aspect-[5/4] w-full shrink-0 sm:aspect-[4/5] sm:w-[42%]"
                imgClassName="object-[center_25%]"
                fallback={
                  <span className="flex h-full w-full items-center justify-center bg-ink-3">
                    <span className="font-display text-[4.5rem] font-extrabold tracking-[-0.04em] text-soft/60">{f.initials}</span>
                  </span>
                }
              />
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <h3 className="text-[1.75rem] leading-tight font-bold tracking-tight">{f.name}</h3>
                <p className="mt-1 font-semibold text-accent">{f.role}</p>
                <p className="mt-5 text-[0.9875rem] leading-relaxed text-soft">{f.bio}</p>
                <div className="mt-auto pt-7">
                  <a
                    href={f.linkedin}
                    {...external}
                    aria-label={`${f.name} on LinkedIn`}
                    className="flex size-11 items-center justify-center rounded-full border border-line text-soft transition-colors hover:border-fg hover:text-fg"
                  >
                    <LinkedInLogo size={18} />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-lg font-medium" data-reveal>
          {team.footnote}
        </p>
      </Container>
    </Section>
  );
}
