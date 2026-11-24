"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/content";
import { Close, Menu } from "./ui/Icons";
import { ButtonLink, Container } from "./ui/primitives";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="theme-dark sticky top-0 z-50 border-b border-line bg-surface/[0.97] text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-green focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Container className="flex h-[4.25rem] items-center justify-between gap-6">
        <a href="/#top" className="rounded-md" aria-label="Splash, back to top">
          <Wordmark className="text-[1.625rem]" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-soft transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={nav.cta.href} className="hidden !min-h-10 !px-5 !text-[0.9375rem] sm:inline-flex">
            {nav.cta.label}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex size-11 items-center justify-center rounded-full text-fg hover:bg-fg/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.3rem] bottom-0 overflow-y-auto border-t border-line bg-surface lg:hidden"
      >
        <Container className="flex min-h-full flex-col pt-6 pb-10">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-display text-[1.75rem] font-bold tracking-tight"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href={nav.cta.href} arrow onClick={() => setOpen(false)} className="mt-8 w-full">
            {nav.cta.label}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
