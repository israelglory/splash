import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the whole site to /out.
  output: "export",
  // Static hosting has no image optimisation server. Images in /public are
  // served as-is, so export them at the right size (see README).
  images: { unoptimized: true },
  // /privacy-policy/ and /terms/ become folders with index.html, which every
  // static host serves without extra rewrite rules.
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
