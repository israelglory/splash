import type { Product } from "@/content";
import { SmartImage } from "./SmartImage";

/** App icon with a drawn fallback mark until the real icon file is added. */
export function AppIcon({ product, size = 64, className = "" }: { product: Product; size?: number; className?: string }) {
  return (
    <SmartImage
      src={product.icon}
      alt={`${product.name} app icon`}
      width={size * 2}
      height={size * 2}
      className={`shrink-0 rounded-[22%] ${className}`}
      fallback={<FallbackMark id={product.id} name={product.name} />}
    />
  );
}

function FallbackMark({ id, name }: { id: Product["id"]; name: string }) {
  return (
    <svg viewBox="0 0 64 64" className="block h-full w-full" aria-hidden="true">
      <rect x="0.5" y="0.5" width="63" height="63" rx="14" fill="#0E1A1F" stroke="#2A3D45" />
      {id === "statushd" ? (
        <>
          <circle cx="32" cy="32" r="19" fill="none" stroke="#3DDC84" strokeWidth="3.5" strokeDasharray="9 4.5" />
          <text x="32" y="37.5" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="15" fill="#F5F3EE">
            HD
          </text>
        </>
      ) : id === "stitch" ? (
        <>
          <rect x="15" y="20" width="34" height="24" rx="6" fill="none" stroke="#3DDC84" strokeWidth="3.5" />
          <path d="M29 27.5v9l7.5-4.5z" fill="#F5F3EE" />
          <path d="M13 50h38" stroke="#F5F3EE" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 5" />
        </>
      ) : (
        <text x="32" y="41" textAnchor="middle" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="26" fill="#3DDC84">
          {name.charAt(0)}
        </text>
      )}
    </svg>
  );
}
