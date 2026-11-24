import { products, screenshots, statushdSpotlight as s } from "@/content";
import { BeforeAfter } from "../BeforeAfter";
import { AppIcon } from "../ui/AppIcon";
import { Check } from "../ui/Icons";
import { Phone } from "../ui/Phone";
import { Badge, Container, Eyebrow, H2, Section, SectionLabel } from "../ui/primitives";
import { StoreButtons } from "../ui/StoreButtons";

export function StatusHDSpotlight() {
  const p = products.statushd;
  return (
    <Section id="statushd" theme="light" labelledBy="statushd-heading">
      <Container className="py-24 lg:py-32">
        <SectionLabel index="03">{p.name}</SectionLabel>

        <div className="mt-10 grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-4" data-reveal>
              <AppIcon product={p} size={48} className="size-12" />
              <Eyebrow>{s.eyebrow}</Eyebrow>
            </div>
            <H2 id="statushd-heading" className="mt-7">
              {s.heading}
            </H2>
            <p className="mt-6 max-w-xl text-lg text-soft" data-reveal>
              {s.intro}
            </p>

            <h3 className="mt-12 font-sans text-sm font-semibold text-soft" data-reveal>
              {s.stepsHeading}
            </h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3" data-reveal>
              {s.steps.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-line p-5">
                  <span className="font-display text-sm font-bold text-accent tabular-nums">0{i + 1}</span>
                  <p className="mt-3 font-display text-xl font-bold tracking-tight">{step.title}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-snug text-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6" data-reveal>
            <div className="relative mx-auto flex max-w-[500px] justify-center py-4">
              <Phone
                src={screenshots.statushdHome.src}
                alt={screenshots.statushdHome.alt}
                variant="statushd"
                className="absolute top-[10%] left-[4%] hidden w-[44%] max-w-[220px] -rotate-[5deg] sm:block"
              />
              <Phone
                src={screenshots.statushdOptimize.src}
                alt={screenshots.statushdOptimize.alt}
                variant="statushd"
                className="relative w-[64%] max-w-[280px] animate-float sm:ml-[24%] sm:w-[54%]"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <BeforeAfter className="lg:col-span-7" />

          <div className="lg:col-span-5 lg:pl-6">
            <ul className="divide-y divide-line border-y border-line" data-reveal>
              {s.features.map((f) => (
                <li key={f.title} className="flex gap-4 py-4">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2 font-semibold">
                      {f.title}
                      {"badge" in f && <Badge>{f.badge}</Badge>}
                    </span>
                    <span className="mt-0.5 block text-[0.9375rem] text-soft">{f.body}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-3" data-reveal>
              {s.plans.map((plan) => (
                <div
                  key={plan.name}
                  className={
                    plan.name === "Pro"
                      ? "rounded-2xl bg-ink p-5 text-paper"
                      : "rounded-2xl border border-line bg-card p-5"
                  }
                >
                  <p className="font-display text-xl font-bold">{plan.name}</p>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem] leading-snug">
                    {plan.points.map((pt) => (
                      <li key={pt} className={plan.name === "Pro" ? "text-soft-on-dark" : "text-soft"}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8" data-reveal>
              <StoreButtons product={p} />
              <p className="mt-3 text-sm text-soft">{s.downloadLine}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
