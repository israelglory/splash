import { products, stitchSpotlight as s } from "@/content";
import { StitchPromptDemo } from "../StitchPromptDemo";
import { AppIcon } from "../ui/AppIcon";
import { Sparkle } from "../ui/Icons";
import { Badge, Container, Eyebrow, H2, Section, SectionLabel } from "../ui/primitives";
import { StoreButtons } from "../ui/StoreButtons";

export function StitchSpotlight() {
  const p = products.stitch;
  return (
    <Section id="stitch" theme="dark" labelledBy="stitch-heading">
      <Container className="py-24 lg:py-32">
        <SectionLabel index="04">{p.name}</SectionLabel>

        <div className="mt-10 grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <div className="flex flex-wrap items-center gap-4" data-reveal>
              <AppIcon product={p} size={48} className="size-12" />
              <Eyebrow>{s.eyebrow}</Eyebrow>
            </div>
            <H2 id="stitch-heading" className="mt-7">
              {s.heading}
            </H2>
            <p className="mt-6 max-w-xl text-lg text-soft" data-reveal>
              {s.intro}
            </p>

            <div className="mt-10 rounded-[var(--radius-card)] border border-card-line bg-card p-6 sm:p-7" data-reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-green text-ink">
                  <Sparkle size={18} />
                </span>
                <h3 className="text-2xl font-bold tracking-tight">{s.ai.title}</h3>
                <Badge tone="accent">{s.ai.badge}</Badge>
              </div>
              <p className="mt-3 text-soft">{s.ai.body}</p>
            </div>

            <div className="mt-8" data-reveal>
              <h3 className="font-sans text-sm font-semibold text-soft">{s.editor.title}</h3>
              <p className="mt-1 text-[0.9375rem] text-soft">{s.editor.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.editor.tools.map((t) => (
                  <li key={t} className="rounded-full border border-line px-3.5 py-1.5 text-sm font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1" data-reveal>
            <StitchPromptDemo />
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <ul
            className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3"
            data-reveal
          >
            {s.features.map((f) => (
              <li key={f.title} className="bg-surface p-6">
                <p className="font-display text-lg font-bold tracking-tight">{f.title}</p>
                <p className="mt-1 text-[0.9375rem] text-soft">{f.body}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col justify-end lg:col-span-4 lg:pl-6" data-reveal>
            <p className="font-display text-3xl leading-tight font-bold tracking-tight">{s.downloadLine}</p>
            <StoreButtons product={p} className="mt-6" />
            <p className="mt-3 text-sm text-soft">{p.platforms}, including iPad.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
