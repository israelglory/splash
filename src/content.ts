/**
 * All site copy, numbers and links live here.
 *
 * Update this file to change text, stats or URLs. Components only read from it.
 * Copy rules: no em dashes, never the word "small" or the phrase "simple app",
 * and only facts the company has confirmed.
 *
 * Search for "TODO" to find every link that still needs a real value.
 */

// ---------------------------------------------------------------------------
// Company
// ---------------------------------------------------------------------------

export const site = {
  name: "Splash Software Technologies",
  wordmark: "Splash",
  // TODO: confirm the final company domain. Set NEXT_PUBLIC_SITE_URL at build time to override.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gloryolaifa.xyz").replace(/\/$/, ""),
  title: "Splash Software Technologies | Products that make everyday life easier",
  description:
    "Splash Software Technologies is a consumer products company in Lagos, Nigeria. We build StatusHD and Stitch, products that make everyday life easier for people in 10+ countries.",
  mission: "Products that make everyday life easier.",
  email: "info@gloryolaifa.xyz",
  location: "Lagos, Nigeria",
  ogImage: "/images/og-image.png",
  copyright: "© 2026 Splash Software Technologies. All rights reserved.",
} as const;

// TODO: replace with the real profile URLs.
export const socials = [
  { id: "x", label: "X", href: "https://x.com/" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" },
] as const;

export const nav = {
  links: [
    { label: "Products", href: "/#products" },
    { label: "About", href: "/#about" },
    { label: "Team", href: "/#team" },
    { label: "Launchpad", href: "/#launchpad" },
    { label: "Contact", href: "/#contact" },
  ],
  cta: { label: "See our apps", href: "/#products" },
} as const;

// ---------------------------------------------------------------------------
// Numbers
// ---------------------------------------------------------------------------

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Use thousands separators, e.g. 27,000 */
  grouped?: boolean;
  label: string;
};

export const stats = {
  /** ISO month the numbers were last checked. Update together with asOfLabel. */
  asOf: "2026-11",
  asOfLabel: "November 2026",
  heading: "Early, and growing fast.",
  items: [
    { value: 2, label: "apps live" },
    { value: 27000, grouped: true, suffix: "+", label: "downloads" },
    { value: 1000, grouped: true, suffix: "+", label: "downloads a day" },
    { value: 10, prefix: "~", suffix: "K", label: "monthly active users" },
    { value: 4.8, decimals: 1, label: "App Store rating" },
    { value: 10, suffix: "+", label: "countries" },
  ] satisfies Stat[],
  caption: "100% organic growth, no paid ads.",
} as const;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Consumer products · Built in Lagos",
  headline: "Products that make everyday life easier.",
  subheadline:
    "We find the everyday frustrations people deal with and build delightful products that fix them.",
  primary: { label: "Explore our products", href: "/#products" },
  secondary: { label: "Meet the team", href: "/#team" },
  proof: "2 apps live. 27,000+ downloads in 10 weeks. Zero ad spend.",
} as const;

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export type Product = {
  id: "statushd" | "stitch";
  name: string;
  icon: string;
  /** One line: the everyday problem, phrased as what the app lets you do. */
  promise: string;
  tagline: string;
  status: string;
  platforms: string;
  siteUrl: string;
  /** TODO: leave empty until the store listing URL is confirmed; buttons fall back to siteUrl. */
  appStoreUrl: string;
  playStoreUrl: string;
};

export const products: Record<Product["id"], Product> = {
  statushd: {
    id: "statushd",
    name: "StatusHD",
    icon: "/images/statushd-icon.png",
    promise: "Post photos and videos in full quality.",
    tagline: "Full quality. Zero blur. No watermark.",
    status: "Live",
    platforms: "Live on iOS and Android",
    siteUrl: "https://statushd.gloryolaifa.xyz",
    appStoreUrl: "", // TODO
    playStoreUrl: "", // TODO
  },
  stitch: {
    id: "stitch",
    name: "Stitch",
    icon: "/images/stitch-icon.png",
    promise: "Edit videos by typing what you want.",
    tagline: "A video editor where you type the edit.",
    status: "AI editing now live",
    platforms: "Live on iOS and Android",
    siteUrl: "https://stitch.gloryolaifa.xyz",
    appStoreUrl: "", // TODO
    playStoreUrl: "", // TODO
  },
};

export const productsSection = {
  heading: "Products people use every day.",
  intro:
    "Each Splash product starts with one everyday frustration and fixes it properly. Here is what is live today.",
  upcoming: {
    title: "More products in the works.",
    body: "We’re always building. Follow along.",
  },
} as const;

export const screenshots = {
  statushdHome: { src: "/images/statushd-home.png", alt: "StatusHD home screen with a photo ready to send in full quality" },
  statushdOptimize: { src: "/images/statushd-optimize.png", alt: "StatusHD optimizing a video before it is posted" },
  stitchAiEdit: { src: "/images/stitch-ai-edit.png", alt: "Stitch AI editing screen with a typed edit request" },
  stitchCaptions: { src: "/images/stitch-captions.png", alt: "Stitch adding automatic captions to a video" },
  stitchKeyframes: { src: "/images/stitch-keyframes.png", alt: "Stitch timeline with keyframes on a clip" },
} as const;

// ---------------------------------------------------------------------------
// StatusHD spotlight
// ---------------------------------------------------------------------------

export const statushdSpotlight = {
  eyebrow: "The problem: blurry uploads",
  heading: "Full quality. Zero blur. No watermark.",
  intro:
    "Photos and videos posted to WhatsApp Status often come out blurry. StatusHD fixes that, so what you post looks the way you shot it.",
  stepsHeading: "How it works",
  steps: [
    { title: "Pick", body: "Choose any photo or video from your phone." },
    { title: "Optimize", body: "StatusHD optimizes it in seconds." },
    { title: "Post", body: "It arrives ready to post. A near-HD option is there as a backup." },
  ],
  comparison: {
    label: "Drag to compare a normal upload with StatusHD",
    before: { label: "Normal upload", src: "/images/before-blur.jpg", alt: "A photo after a normal upload, soft and blurry" },
    after: { label: "With StatusHD", src: "/images/after-hd.jpg", alt: "The same photo sent with StatusHD, sharp and detailed" },
  },
  features: [
    { title: "No watermark", body: "Never, not even on the free plan." },
    { title: "Delivered ready to post", body: "No extra steps once it arrives." },
    { title: "Memes feed", badge: "Beta", body: "Funny content to like, save and share." },
    { title: "AI enhancer", badge: "Coming soon", body: "An AI photo and video enhancer is next." },
  ],
  plans: [
    { name: "Free", points: ["3 HD deliveries", "No watermark"] },
    { name: "Pro", points: ["Unlimited HD deliveries", "No ads", "Fair pricing for your region"] },
  ],
  downloadLine: "Free to download. No watermark, ever.",
} as const;

// ---------------------------------------------------------------------------
// Stitch spotlight
// ---------------------------------------------------------------------------

export const stitchSpotlight = {
  eyebrow: "The problem: editing is too hard",
  heading: "A video editor where you type the edit.",
  intro:
    "Most video editors expect you to learn them first. With Stitch, you describe the edit in plain words and watch it happen.",
  ai: {
    badge: "Live now",
    title: "AI editing",
    body: "Type what you want, like “cut the silences, add captions, make it punchy”, and Stitch applies it live on your video.",
    prompt: "Cut the silences, add captions, make it punchy.",
    steps: ["Silences cut", "Captions added", "Pacing tightened"],
    done: "Done",
    replay: "Replay",
  },
  editor: {
    title: "A full editor too",
    body: "When you want hands-on control, everything is there.",
    tools: ["Timeline", "Split", "Speed", "Transitions", "Keyframes", "Auto captions", "Music"],
  },
  features: [
    { title: "AI editing", body: "Describe the edit, Stitch does the work." },
    { title: "Auto captions", body: "Captions added for you, automatically." },
    { title: "Keyframes", body: "Animate any clip with precise control." },
    { title: "Transitions", body: "Move smoothly from one clip to the next." },
    { title: "Music", body: "Add a soundtrack that fits." },
    { title: "Works everywhere", body: "On iPhone, iPad and Android." },
  ],
  downloadLine: "Try AI editing free.",
} as const;

// ---------------------------------------------------------------------------
// About, principles, reach
// ---------------------------------------------------------------------------

export const about = {
  heading: "Everyday problems deserve better solutions.",
  story: [
    "Most people don’t need more complicated apps. They need everyday things to just work.",
    "A video that stays sharp. An edit that takes seconds, not an hour.",
    "That’s what Splash builds: thoughtful products that quietly make life easier, for people everywhere.",
  ],
  quote: "Products that make everyday life easier.",
  quoteAttribution: "Our mission",
} as const;

export const principles = {
  heading: "How we build.",
  items: [
    { icon: "focus", title: "Focused by design", body: "Every product does one job beautifully." },
    { icon: "globe", title: "Fair for every market", body: "Regional pricing so anyone can afford it." },
    { icon: "heart", title: "Grown by love, not ads", body: "Our users find us and tell their friends." },
    { icon: "shield", title: "Built to last", body: "Solid engineering and respect for user data." },
  ],
} as const;

export const reach = {
  heading: "Made in Lagos. Used around the world.",
  caption: "People in 10+ countries use our apps, led by Malaysia, Nigeria and Indonesia.",
  hqLabel: "Lagos, home of Splash",
  /** Shown as chips. Order matters: leading countries first. Map highlights come from src/data/world-map.ts. */
  countries: ["Malaysia", "Nigeria", "Indonesia", "United States", "Tanzania", "Sri Lanka", "Uganda"],
  moreLabel: "and more",
} as const;

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export const team = {
  heading: "The people behind Splash.",
  footnote: "Every Splash product is designed, built and shipped in-house.",
  founders: [
    {
      name: "Glory Olaifa",
      role: "Co-founder and CEO",
      initials: "GO",
      photo: "/images/glory-olaifa.jpg",
      bio: "Software engineer and product manager with 8+ years across marketing, engineering, program and community management. Leads product, growth and community.",
      linkedin: "https://www.linkedin.com/", // TODO
    },
    {
      name: "Boluwatife Olaifa",
      role: "Co-founder and CTO",
      initials: "BO",
      photo: "/images/boluwatife-olaifa.jpg",
      bio: "Senior software engineer and product builder with 6 years across high-performance systems and modern product development. Leads engineering.",
      linkedin: "https://www.linkedin.com/", // TODO
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Launchpad
// ---------------------------------------------------------------------------

export const launchpad = {
  heading: "Splash Launchpad: helping the next generation of builders ship.",
  badge: "First edition: 2027",
  body: [
    "Splash Launchpad is a yearly hackathon where builders create consumer apps that fix everyday problems.",
    "Selected teams get mentorship, AI and cloud credits, design support and the Splash publishing and App Store playbook, on terms agreed with each team.",
  ],
  perks: ["Mentorship", "AI and cloud credits", "Design support", "Publishing playbook"],
  form: {
    title: "Register your interest.",
    body: "Be the first to hear when applications open.",
    label: "Email address",
    placeholder: "you@example.com",
    button: "Register",
    sending: "Registering",
    success: "You’re on the list. We’ll email you when applications open.",
    invalid: "Please enter a valid email address.",
    error: "Something went wrong. Please try again, or email us directly.",
    privacy: "We’ll only use your email for Launchpad updates.",
  },
} as const;

// ---------------------------------------------------------------------------
// Work with us
// ---------------------------------------------------------------------------

export const workWithUs = {
  heading: "Work with us.",
  intro: "Choose a topic below, or write to us directly.",
  columns: [
    {
      title: "Investors",
      body: "We’re building a portfolio of consumer products. Let’s talk.",
      subject: "Investor enquiry: Splash Software Technologies",
      cta: "Talk to the founders",
    },
    {
      title: "Partners and brands",
      body: "Reach our growing community of users.",
      subject: "Partnership enquiry: Splash Software Technologies",
      cta: "Start a partnership",
    },
    {
      title: "Press",
      body: "Stories, assets and interviews.",
      subject: "Press enquiry: Splash Software Technologies",
      cta: "Contact press",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Final CTA and footer
// ---------------------------------------------------------------------------

export const finalCta = {
  heading: "Try what we’re building.",
  buttons: [
    { label: "Get StatusHD", product: "statushd" },
    { label: "Get Stitch", product: "stitch" },
  ],
} as const;

export const footer = {
  columns: [
    {
      title: "Products",
      links: [
        { label: "StatusHD", href: products.statushd.siteUrl, external: true },
        { label: "Stitch", href: products.stitch.siteUrl, external: true },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/#about" },
        { label: "Team", href: "/#team" },
        { label: "Launchpad", href: "/#launchpad" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy/" },
        { label: "Terms of Use", href: "/terms/" },
      ],
    },
  ],
} as const;

export function mailto(subject?: string) {
  return subject ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}` : `mailto:${site.email}`;
}

export function storeLinks(p: Product) {
  return {
    appStore: p.appStoreUrl || p.siteUrl,
    playStore: p.playStoreUrl || p.siteUrl,
  };
}
