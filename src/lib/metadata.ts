import type { Metadata } from "next";
import { pages, site } from "@/content";

/** Metadata for an inner page: its own title, description, canonical URL and share card. */
export function pageMetadata(key: keyof typeof pages, path: string): Metadata {
  const { title, description } = pages[key];
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_NG",
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name}: ${site.mission}` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [site.ogImage] },
  };
}
