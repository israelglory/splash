"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Classes for the wrapper. The image always fills the wrapper. */
  className?: string;
  imgClassName?: string;
  /** Shown while the image loads, and instead of it if the file is missing. */
  fallback: ReactNode;
  priority?: boolean;
};

/**
 * An <img> that never shows a broken image. Until the file loads (or if it
 * does not exist yet) the fallback is shown in its place at the same size.
 */
export function SmartImage({ src, alt, width, height, className = "", imgClassName = "", fallback, priority }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");

  // The image may finish (or fail) before React hydrates and attaches handlers.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "loaded" : "failed");
  }, []);

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      {state !== "loaded" && (
        <span
          className="absolute inset-0 block"
          {...(state === "failed" ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
        >
          {fallback}
        </span>
      )}
      {state !== "failed" && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          data-loaded={state === "loaded"}
          onLoad={() => setState("loaded")}
          onError={() => setState("failed")}
          className={`smart-img absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </span>
  );
}
