import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { Container } from "./ui/primitives";

/** Shared layout for the privacy policy and terms pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="theme-light bg-surface text-fg">
        <Container className="py-20 lg:py-28">
          <div className="mx-auto max-w-[46rem]">
            <div
              role="note"
              className="rounded-2xl border border-[#d9a400] bg-[#fff4cc] p-4 text-[0.9375rem] font-medium text-[#4d3a00]"
            >
              Placeholder text, pending legal review. This page is not yet a binding legal document.
            </div>
            <h1 className="mt-10 text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] leading-[1] font-extrabold tracking-[-0.04em]">
              {title}
            </h1>
            <p className="mt-4 text-soft">Last updated: {updated}</p>
            <div className="legal mt-12 space-y-5 text-[1.0625rem] leading-relaxed text-soft [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
              {children}
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
