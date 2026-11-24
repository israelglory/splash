import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { About, Principles } from "@/components/sections/About";
import { FinalCta, WorkWithUs } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Launchpad } from "@/components/sections/Launchpad";
import { Numbers } from "@/components/sections/Numbers";
import { Products } from "@/components/sections/Products";
import { Reach } from "@/components/sections/Reach";
import { StatusHDSpotlight } from "@/components/sections/StatusHDSpotlight";
import { StitchSpotlight } from "@/components/sections/StitchSpotlight";
import { Team } from "@/components/sections/Team";
import { site, products, team } from "@/content";

// Structured data so search engines understand the company and its apps.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
      slogan: site.mission,
      address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      founder: team.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    },
    ...Object.values(products).map((p) => ({
      "@type": "SoftwareApplication",
      name: p.name,
      url: p.siteUrl,
      description: p.tagline,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "iOS, Android",
      publisher: { "@type": "Organization", name: site.name },
    })),
  ],
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Numbers />
        <Products />
        <StatusHDSpotlight />
        <StitchSpotlight />
        <About />
        <Principles />
        <Reach />
        <Team />
        <Launchpad />
        <WorkWithUs />
        <FinalCta />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
