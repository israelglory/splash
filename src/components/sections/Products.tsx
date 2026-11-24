import { productList, productsSection, socials, type Product } from "@/content";
import { AppIcon } from "../ui/AppIcon";
import { ArrowUpRight, socialIcons } from "../ui/Icons";
import { Badge, Container, external, H2, Section, SectionLabel } from "../ui/primitives";
import { StoreButtons } from "../ui/StoreButtons";

export function Products() {
  return (
    <Section id="products" theme="dark" labelledBy="products-heading">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index="02">Products</SectionLabel>
            <H2 id="products-heading" className="mt-6">
              {productsSection.heading}
            </H2>
          </div>
          <p className="max-w-md text-lg text-soft lg:col-span-4 lg:col-start-9" data-reveal>
            {productsSection.intro}
          </p>
        </div>

        <div className={`mt-14 grid gap-5 md:grid-cols-2 ${productList.length > 2 ? "xl:grid-cols-3" : ""}`}>
          {productList.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 90} />
          ))}
        </div>

        <div
          className="mt-5 flex flex-col gap-5 rounded-[var(--radius-card)] border border-dashed border-line p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
          data-reveal
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight">{productsSection.upcoming.title}</h3>
            <p className="mt-1 text-soft">{productsSection.upcoming.body}</p>
          </div>
          <ul className="flex gap-2" aria-label="Follow Splash">
            {socials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    {...external}
                    aria-label={`Follow Splash on ${s.label}`}
                    className="flex size-11 items-center justify-center rounded-full border border-line text-soft transition-colors hover:border-fg hover:text-fg"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function ProductCard({ product: p, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <article
      className="flex flex-col rounded-[var(--radius-card)] border border-card-line bg-card p-7 sm:p-9"
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      aria-labelledby={`${p.id}-card-name`}
    >
      <div className="flex items-start justify-between gap-4">
        <AppIcon product={p} size={64} className="size-16" />
        <Badge tone="accent">
          <span className="size-1.5 rounded-full bg-on-accent" aria-hidden="true" />
          {p.status}
        </Badge>
      </div>

      <h3 id={`${p.id}-card-name`} className="mt-10 text-[2.5rem] leading-none font-extrabold tracking-[-0.035em]">
        {p.name}
      </h3>
      <p className="mt-4 text-xl leading-snug font-medium">{p.promise}</p>
      <p className="mt-2 text-soft">{p.tagline}</p>

      <div className="mt-6">
        <Badge>{p.platforms}</Badge>
      </div>

      <div className="mt-auto flex flex-col gap-5 pt-10">
        <StoreButtons product={p} />
        <a
          href={p.siteUrl}
          {...external}
          className="group inline-flex w-fit items-center gap-1.5 font-semibold text-accent"
        >
          Visit the {p.name} site
          <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
