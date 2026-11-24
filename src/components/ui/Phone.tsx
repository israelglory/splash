import type { ReactNode } from "react";
import { SmartImage } from "./SmartImage";

type Variant = "statushd" | "stitch";

/**
 * Phone mockup. Size it with a width class (e.g. "w-[260px]"); everything
 * inside scales from that width. The screen is 9:19.5, so export screenshots
 * at 1179x2556 (or any size with that ratio).
 */
export function Phone({
  src,
  alt,
  variant,
  className = "",
  priority,
  cutout = true,
  children,
}: {
  src: string;
  alt: string;
  variant: Variant;
  className?: string;
  priority?: boolean;
  /** Draw the iPhone camera cutout. Turn off for Android screenshots. */
  cutout?: boolean;
  /** Overlays drawn on top of the screen (toasts, highlights). */
  children?: ReactNode;
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-frame bg-[#070e11] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_60px_-20px_rgba(4,10,12,0.55)]">
        <div className="phone-screen relative aspect-[9/19.5] overflow-hidden bg-[#13232a]">
          <SmartImage
            src={src}
            alt={alt}
            width={1179}
            height={2556}
            priority={priority}
            className="absolute inset-0 h-full w-full"
            fallback={<ScreenPlaceholder variant={variant} />}
          />
          {cutout && (
            <span className="phone-island absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#070e11]" aria-hidden="true" />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

/** Neutral skeleton of an app screen, used until a real screenshot exists. */
function ScreenPlaceholder({ variant }: { variant: Variant }) {
  const block = "rounded-[3cqw] bg-[#1d3139]";
  const line = "h-[2.6cqw] rounded-full bg-[#22383f]";
  return (
    <span className="flex h-full w-full flex-col gap-[4cqw] bg-[#13232a] px-[6cqw] pt-[17cqw] pb-[7cqw]">
      <span className="flex items-center justify-between">
        <span className={`${line} w-[34%] !bg-[#2b434b]`} />
        <span className="size-[8cqw] rounded-full bg-[#22383f]" />
      </span>
      {variant === "statushd" ? (
        <>
          <span className={`${block} relative flex-[1.6]`}>
            <span className="absolute top-[4cqw] left-[4cqw] rounded-full bg-[#2b434b] px-[3cqw] py-[1cqw] text-[4.2cqw] font-semibold text-[#d5e1de]">
              HD
            </span>
          </span>
          <span className="flex gap-[3cqw]">
            <span className={`${block} aspect-square flex-1`} />
            <span className={`${block} aspect-square flex-1`} />
            <span className={`${block} aspect-square flex-1`} />
          </span>
          <span className={`${line} w-[70%]`} />
          <span className={`${line} w-[48%]`} />
          <span className="mt-auto h-[12cqw] rounded-full bg-[#2b434b]" />
        </>
      ) : (
        <>
          <span className={`${block} flex-[1.4]`} />
          <span className="flex flex-col gap-[2.4cqw]">
            <span className="flex gap-[1.5cqw]">
              <span className="h-[8cqw] flex-[3] rounded-[1.6cqw] bg-[#2b434b]" />
              <span className="h-[8cqw] flex-[2] rounded-[1.6cqw] bg-[#2b434b]" />
              <span className="h-[8cqw] flex-[4] rounded-[1.6cqw] bg-[#2b434b]" />
            </span>
            <span className="flex gap-[1.5cqw] pl-[10%]">
              <span className="h-[5cqw] flex-[5] rounded-[1.6cqw] bg-[#22383f]" />
              <span className="h-[5cqw] flex-[3] rounded-[1.6cqw] bg-[#22383f]" />
            </span>
            <span className="h-[5cqw] w-[80%] rounded-[1.6cqw] bg-[#1d3139]" />
          </span>
          <span className="mt-auto flex h-[12cqw] items-center rounded-full bg-[#1d3139] px-[4cqw]">
            <span className={`${line} w-[55%]`} />
          </span>
        </>
      )}
    </span>
  );
}
