import { launchpad } from "@/content";
import { EmailCapture } from "../EmailCapture";
import { Check } from "../ui/Icons";
import { Badge, Container, Section, SectionLabel, type SectionProps } from "../ui/primitives";

export function Launchpad({ index, asPage }: SectionProps) {
  const Heading = asPage ? "h1" : "h2";
  return (
    <Section id="launchpad" theme="light" labelledBy="launchpad-heading">
      <Container className={asPage ? "pt-16 pb-24 lg:pt-24 lg:pb-32" : "py-24 lg:py-32"}>
        <SectionLabel index={index}>Giving back</SectionLabel>
        <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div data-reveal>
              <Badge tone="accent">{launchpad.badge}</Badge>
            </div>
            <Heading
              id="launchpad-heading"
              data-reveal={asPage ? undefined : true}
              className="mt-6 text-[clamp(2.125rem,1.3rem+3vw,3.75rem)] leading-[1.03] font-bold tracking-[-0.035em]"
            >
              {launchpad.heading}
            </Heading>
            <div className="mt-6 max-w-xl space-y-4 text-lg text-soft" data-reveal>
              {launchpad.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2" data-reveal>
              {launchpad.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 font-semibold">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 lg:self-center" data-reveal>
            <div className="rounded-[var(--radius-card)] border border-card-line bg-card p-7 sm:p-9">
              <h3 className="text-[1.75rem] leading-tight font-bold tracking-tight">{launchpad.form.title}</h3>
              <p className="mt-2 mb-7 text-soft">{launchpad.form.body}</p>
              <EmailCapture />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
