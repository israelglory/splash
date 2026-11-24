import { PageShell } from "@/components/PageShell";
import { AboutTeaser } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Numbers } from "@/components/sections/Numbers";
import { Products } from "@/components/sections/Products";
import { StatusHDSpotlight } from "@/components/sections/StatusHDSpotlight";
import { StitchSpotlight } from "@/components/sections/StitchSpotlight";
import { productList, site, team } from "@/content";

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
    ...productList.map((p) => ({
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
    <PageShell>
      <Hero />
      <Numbers />
      <Products />
      <StatusHDSpotlight />
      <StitchSpotlight />
      <AboutTeaser index="05" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </PageShell>
  );
}
