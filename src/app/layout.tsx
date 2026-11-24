import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/content";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_NG",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name}: ${site.mission}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E1A1F",
  colorScheme: "light dark",
};

// Marks the page as JS-capable before first paint so reveal animations can
// start hidden. If scripts fail to run, the class is removed and everything shows.
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js')},4000);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        {/*
          ANALYTICS PLACEHOLDER
          Add your analytics snippet here, for example Plausible:
            <script defer data-domain="your-domain.com" src="https://plausible.io/js/script.js"></script>
          or Google Analytics via next/script in this file. Keep it to one
          lightweight script to protect the Lighthouse score.
        */}
      </head>
      <body className="bg-ink text-paper">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
