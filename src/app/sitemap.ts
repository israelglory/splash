import type { MetadataRoute } from "next";
import { site } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/launchpad/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/privacy-policy/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
