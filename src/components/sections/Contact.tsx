import { finalCta, mailto, productList, site, workWithUs } from "@/content";
import { ArrowRight, Mail } from "../ui/Icons";
import { ButtonLink, Container, external, H2, Section, SectionLabel, type SectionProps } from "../ui/primitives";

export function WorkWithUs({ index, asPage }: SectionProps) {
  return (
    <Section id="contact" theme="dark" labelledBy="contact-heading">
      <Container className={asPage ? "pt-16 pb-24 lg:pt-24 lg:pb-32" : "py-24 lg:py-32"}>
        <SectionLabel index={index}>Contact</SectionLabel>
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <H2 id="contact-heading" level={asPage ? 1 : 2} className="lg:col-span-7">
            {workWithUs.heading}
          </H2>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal>
            <p className="text-lg text-soft">{workWithUs.intro}</p>
            <a
              href={mailto()}
              className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-fg underline decoration-line underline-offset-4 hover:decoration-green"
            >
              <Mail size={20} className="text-accent" />
              {site.email}
            </a>
          </div>
        </div>

        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {workWithUs.columns.map((col, i) => (
            <li
              key={col.title}
              className="flex flex-col border-t border-line pt-7"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <h3 className="text-[1.75rem] leading-tight font-bold tracking-tight">{col.title}</h3>
              <p className="mt-3 text-soft">{col.body}</p>
              <a
                href={mailto(col.subject)}
                className="group mt-auto inline-flex w-fit items-center gap-2 pt-6 font-semibold text-accent"
              >
                {col.cta}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section theme="green" labelledBy="cta-heading">
      <Container className="flex flex-col gap-10 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
        <h2
          id="cta-heading"
          className="max-w-[12ch] text-[clamp(2.75rem,1.2rem+6vw,6.25rem)] leading-[0.94] font-extrabold tracking-[-0.045em]"
          data-reveal
        >
          {finalCta.heading}
        </h2>
        <div className="flex shrink-0 flex-wrap gap-3 lg:pb-3" data-reveal>
          {productList.map((p) => (
            <ButtonLink key={p.id} href={p.siteUrl} {...external} arrow className="!min-h-14 !px-7 !text-[1.0625rem]">
              {finalCta.buttonPrefix} {p.name}
            </ButtonLink>
          ))}
        </div>
      </Container>
    </Section>
  );
}
