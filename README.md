# Splash Software Technologies website

The company website for Splash Software Technologies.

| Page | What's on it |
| --- | --- |
| `/` | Hero, numbers, product cards, the StatusHD and Stitch spotlights, a short "why we exist" |
| `/about/` | Why we exist, how we build, where our apps are used, the team |
| `/launchpad/` | Splash Launchpad and the "register your interest" form |
| `/contact/` | Investors, partners and press contacts |
| `/privacy-policy/`, `/terms/` | Legal pages (placeholder text) |

Every page except the legal ones ends with the "Try what we're building" band.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4, exported as a fully static site. There is no server to run in production.

## Run it

Requires Node.js 20.9 or newer.

```bash
pnpm install        # or: npm install
pnpm dev            # http://localhost:3000
```

## Build

```bash
pnpm build          # writes the static site to ./out
pnpm start          # previews ./out at http://localhost:3000
pnpm typecheck
```

Set the public URL at build time so canonical links, Open Graph tags and the sitemap point to the right domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com pnpm build
```

If it is not set, the build uses the default in `src/content.ts`.

## Deploy

Upload the `out/` folder to any static host. Every page is a folder with an `index.html`, so no rewrite rules are needed.

- **Vercel:** import the repo. Next.js is detected automatically. Add `NEXT_PUBLIC_SITE_URL` under Environment Variables.
- **Netlify / Cloudflare Pages:** build command `pnpm build`, output directory `out`.
- **Any other host (S3, nginx, cPanel):** run `pnpm build` and upload the contents of `out/`.

Make sure the host serves files with gzip or Brotli (all of the above do by default). Lighthouse scores were measured with compression on: 92 mobile and 100 desktop for performance, 100 for SEO.

## Where to change things

### Copy, numbers and links: `src/content.ts`

All text, stats and URLs live in this one file. Components only read from it.

- **Stats:** `stats.items`. Update `stats.asOf` and `stats.asOfLabel` whenever you change the numbers. The hero proof line is `hero.proof`.
- **App Store and Google Play links:** `products.statushd` and `products.stitch` (`appStoreUrl`, `playStoreUrl`). While these are empty, the buttons link to each app's website instead.
- **LinkedIn links:** `team.founders[].linkedin`.
- **Social profiles:** `socials`.
- **Domain:** `site.url`, or the `NEXT_PUBLIC_SITE_URL` variable.

Search the file for `TODO` to find every link that still needs a real value.

Copy rules for this site: no em dashes, never the word "small" or the phrase "simple app", and only facts the company has confirmed.

### Adding a product

Products are listed once in `src/content.ts` and the rest of the site follows:

1. Add the app to `products`, with its icon, one-line promise, tagline, site and store links.
2. Add it to `productList` in the order it should appear.

It then shows up in the Products dropdown (desktop and mobile), the product cards on the homepage, the footer and the final call to action. The menu links to the app's own website, unless you give it an `href` pointing to a homepage section (StatusHD and Stitch use `/#statushd` and `/#stitch` for their spotlights). Spotlight sections are written per product, so a new app can launch with just a card and a menu entry, and get a spotlight later.

### Page titles and descriptions

`pages` in `src/content.ts` holds the title and search description for About, Launchpad and Contact. The homepage uses `site.title` and `site.description`. When you add a page, add it to `src/app/sitemap.ts` too.

### Images: `public/images/`

The app images come from the StatusHD and Stitch marketing sites (`statushdWeb` and `stitchweb`), cropped and compressed for this site. Paths and alt text live in `src/content.ts` (`products` and `screenshots`). If a file goes missing, the site shows a neutral placeholder at the same size, never a broken image.

| File | Used for | Size |
| --- | --- | --- |
| `statushd-icon.jpg`, `stitch-icon.png` | App icons | 256 x 256, square (the site rounds the corners) |
| `statushd-optimize-video.jpg`, `statushd-optimize-photo.jpg` | StatusHD phone screens | 720 px wide |
| `stitch-editor.jpg`, `stitch-captions.jpg`, `stitch-export.jpg` | Stitch phone screens | 720 px wide |
| `before-blur.jpg`, `after-hd.jpg` | Before and after slider | 1024 x 768 (4:3), same framing in both |
| `glory-olaifa.jpg`, `boluwatife-olaifa.jpg` | Founder headshots (not supplied yet) | 800 x 1000 (4:5), face in the upper third |
| `og-image.png` | Social share card | 1200 x 630 |

To swap a screenshot, export the full screen (no device frame) at about 720 px wide; the site draws the phone frame itself. For an Android screenshot, set `cutout: false` on its entry in `screenshots` so no iPhone camera cutout is drawn over it.

`og-image.png` is currently a branded stand-in generated for launch. Replace it with the final artwork when it is ready.

The site serves image files as they are, so compress them before adding them. Export screenshots as PNG or WebP and photos as JPG at about 80% quality; aim for under 300 KB per file. If you switch to `.webp`, update the paths in `src/content.ts`.

To use a logo file instead of the text wordmark, edit `src/components/Wordmark.tsx`.

### Favicon

`src/app/icon.svg` (browser tab) and `src/app/apple-icon.png` (iOS home screen, 180 x 180).

## Placeholders to finish before launch

- **Launchpad email form:** `src/lib/subscribe.ts`. The `registerInterest()` function currently pretends to succeed. Replace its body with a call to your email provider (examples are in the file). The form already shows success and error states. In development, an address starting with `fail@` previews the error state.
- **Analytics:** see the `ANALYTICS PLACEHOLDER` comment in `src/app/layout.tsx`.
- **Legal pages:** `src/app/privacy-policy/page.tsx` and `src/app/terms/page.tsx` contain placeholder text marked `[LEGAL REVIEW]`, plus a visible "pending legal review" banner from `src/components/LegalPage.tsx`. Remove the banner once a lawyer has approved the text.

## Project structure

```
src/
  content.ts                 all copy, numbers and links
  app/
    layout.tsx               fonts, metadata, analytics placeholder
    page.tsx                 homepage (section order)
    about/, launchpad/, contact/
    privacy-policy/, terms/  legal pages
    sitemap.ts, robots.ts    generated at build time
  components/
    PageShell.tsx            header + page + final call to action + footer
    SiteHeader.tsx           navigation, Products dropdown, mobile menu
    sections/                one file per page section
    ui/                      buttons, phone mockup, store buttons, icons
    BeforeAfter.tsx          StatusHD comparison slider
    StitchPromptDemo.tsx     the "type the edit" animation
    CountUp.tsx              animated stats
    EmailCapture.tsx         Launchpad form
  data/world-map.ts          generated dot map (see below)
  lib/subscribe.ts           email provider placeholder
  lib/metadata.ts            per-page titles and share cards
scripts/generate-world-map.mjs
```

### World map

The dotted map in "Made in Lagos" is pre-generated from Natural Earth data. To change the highlighted countries, edit `HIGHLIGHTS` in `scripts/generate-world-map.mjs` and run `pnpm generate:map`. Then update the country chips in `reach.countries` in `src/content.ts`.

## Accessibility and motion

- Semantic landmarks, a skip link, one `h1` per page and the current page marked in the navigation.
- The Products dropdown opens on click, hover or the down arrow key, and closes with Escape, a click outside or tabbing away. The mobile menu closes with Escape.
- Visible focus rings in every section color.
- Body text contrast is at least 5.7:1 throughout.
- The before and after slider is a native range input, so arrow keys work.
- With `prefers-reduced-motion`, all animation is off: scroll reveals, count-ups, floating phones and the typing demo show their final state immediately.
- Without JavaScript, all content is still visible.
