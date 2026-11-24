import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="theme-dark bg-surface text-fg">
        <Container className="py-32">
          <p className="font-display text-sm font-bold text-accent">404</p>
          <h1 className="mt-4 text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-none font-extrabold tracking-[-0.04em]">
            This page doesn&apos;t exist.
          </h1>
          <ButtonLink href="/" arrow className="mt-10">
            Back to the homepage
          </ButtonLink>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
