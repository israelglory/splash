# Splash Software Technologies website

The company website for Splash Software Technologies: one landing page plus `/privacy-policy/` and `/terms/`.

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

### Images: `public/images/`

Drop files in with exactly these names. Until a file exists, the site shows a neutral placeholder at the same size, never a broken image.

| File | Used for | Recommended size |
| --- | --- | --- |
| `statushd-icon.png`, `stitch-icon.png` | App icons | 256 x 256, square (the site rounds the corners) |
| `statushd-home.png`, `statushd-optimize.png` | StatusHD phone screens | 1179 x 2556 (9:19.5) |
| `stitch-ai-edit.png`, `stitch-captions.png`, `stitch-keyframes.png` | Stitch phone screens | 1179 x 2556 (9:19.5) |
| `before-blur.jpg`, `after-hd.jpg` | Before and after slider | 1600 x 1200 (4:3), same framing in both |
| `glory-olaifa.jpg`, `boluwatife-olaifa.jpg` | Founder headshots | 800 x 1000 (4:5), face in the upper third |
| `og-image.png` | Social share card | 1200 x 630 |

Screenshots use the full screen area; the site draws the phone frame and the camera cutout itself.

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
    page.tsx                 the landing page (section order)
    privacy-policy/, terms/  legal pages
    sitemap.ts, robots.ts    generated at build time
  components/
    sections/                one file per page section
    ui/                      buttons, phone mockup, store buttons, icons
    BeforeAfter.tsx          StatusHD comparison slider
    StitchPromptDemo.tsx     the "type the edit" animation
    CountUp.tsx              animated stats
    EmailCapture.tsx         Launchpad form
  data/world-map.ts          generated dot map (see below)
  lib/subscribe.ts           email provider placeholder
scripts/generate-world-map.mjs
```

### World map

The dotted map in "Made in Lagos" is pre-generated from Natural Earth data. To change the highlighted countries, edit `HIGHLIGHTS` in `scripts/generate-world-map.mjs` and run `pnpm generate:map`. Then update the country chips in `reach.countries` in `src/content.ts`.

## Accessibility and motion

- Semantic landmarks, a skip link, a labelled navigation and a keyboard-operable mobile menu (Escape closes it).
- Visible focus rings in every section color.
- Body text contrast is at least 5.7:1 throughout.
- The before and after slider is a native range input, so arrow keys work.
- With `prefers-reduced-motion`, all animation is off: scroll reveals, count-ups, floating phones and the typing demo show their final state immediately.
- Without JavaScript, all content is still visible.
