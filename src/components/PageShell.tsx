import type { ReactNode } from "react";
import { FinalCta } from "./sections/Contact";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Header, page content, the "Try what we're building" band and the footer. */
export function PageShell({ children, cta = true }: { children: ReactNode; cta?: boolean }) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {children}
        {cta && <FinalCta />}
      </main>
      <SiteFooter />
    </>
  );
}
