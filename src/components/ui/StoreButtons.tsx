import { storeLinks, type Product } from "@/content";
import { AppleLogo, PlayLogo } from "./Icons";
import { external } from "./primitives";

/** Solid App Store and Google Play buttons. Inverts against the section it sits in. */
export function StoreButtons({ product, className = "" }: { product: Product; className?: string }) {
  const links = storeLinks(product);
  const btn =
    "inline-flex h-[3.25rem] items-center gap-2.5 rounded-[0.875rem] bg-fg pr-5 pl-4 text-surface transition-transform duration-200 hover:-translate-y-0.5";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={links.appStore} {...external} className={btn} aria-label={`Download ${product.name} on the App Store`}>
        <AppleLogo size={22} />
        <span className="flex flex-col leading-none">
          <span className="text-[0.6875rem] font-medium opacity-80">Download on the</span>
          <span className="mt-0.5 text-[1.0625rem] font-semibold tracking-tight">App Store</span>
        </span>
      </a>
      <a href={links.playStore} {...external} className={btn} aria-label={`Get ${product.name} on Google Play`}>
        <PlayLogo size={19} />
        <span className="flex flex-col leading-none">
          <span className="text-[0.6875rem] font-medium uppercase tracking-wide opacity-80">Get it on</span>
          <span className="mt-0.5 text-[1.0625rem] font-semibold tracking-tight">Google Play</span>
        </span>
      </a>
    </div>
  );
}
