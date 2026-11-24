import { site } from "@/content";

/** "Splash." in text. Swap for <img src="/images/splash-logo.svg"> once the logo file exists. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none font-extrabold tracking-[-0.04em] text-fg ${className}`}>
      {site.wordmark}
      <span className="text-green">.</span>
    </span>
  );
}
