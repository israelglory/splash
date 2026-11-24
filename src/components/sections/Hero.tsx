import { hero, products, screenshots } from "@/content";
import { AppIcon } from "../ui/AppIcon";
import { Phone } from "../ui/Phone";
import { ButtonLink, Container, Eyebrow, Section } from "../ui/primitives";

export function Hero() {
  const proof = hero.proof.split(/(?<=\.)\s+/);
  // The last word of the headline is set in the accent colour.
  const words = hero.headline.split(" ");
  const last = words.pop();
  const lead = words.join(" ");
  return (
    <Section id="top" theme="dark" labelledBy="hero-heading" className="relative overflow-hidden">
      <Container className="grid items-center gap-16 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-7">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-heading"
            className="mt-7 max-w-[13ch] text-[clamp(2.875rem,1.2rem+6.2vw,6rem)] leading-[0.95] font-extrabold tracking-[-0.045em]"
          >
            {lead} <span className="text-accent">{last}</span>
          </h1>
          <p className="mt-8 max-w-lg text-[1.1875rem] leading-relaxed text-soft sm:text-[1.25rem]">{hero.subheadline}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={hero.primary.href} arrow>
              {hero.primary.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </ButtonLink>
          </div>
          <p className="mt-12 flex max-w-xl flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-[0.9375rem] font-medium text-fg">
            {proof.map((sentence, i) => (
              <span key={sentence} className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {sentence}
                {i < proof.length - 1 && " "}
              </span>
            ))}
          </p>
        </div>

        <div className="flex items-start justify-center gap-4 sm:gap-7 lg:col-span-5 lg:justify-end">
          <HeroPhone product="statushd" />
          <HeroPhone product="stitch" offset />
        </div>
      </Container>
    </Section>
  );
}

function HeroPhone({ product, offset }: { product: "statushd" | "stitch"; offset?: boolean }) {
  const p = products[product];
  const shot = product === "statushd" ? screenshots.statushdVideo : screenshots.stitchEditor;
  return (
    <figure className={`flex w-[clamp(140px,41vw,232px)] flex-col ${offset ? "mt-10 sm:mt-14" : ""}`}>
      <Phone
        src={shot.src}
        alt={shot.alt}
        variant={product}
        cutout={!("cutout" in shot) || shot.cutout}
        priority
        className={offset ? "animate-float-late" : "animate-float"}
      />
      <figcaption className="mt-5 flex items-center gap-3">
        <AppIcon product={p} size={36} className="size-9" />
        <span className="min-w-0 leading-tight">
          <span className="block font-display text-[1.0625rem] font-bold">{p.name}</span>
          <span className="block text-[0.75rem] leading-snug text-soft sm:text-[0.8125rem]">{p.promise}</span>
        </span>
      </figcaption>
    </figure>
  );
}
