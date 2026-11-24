"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { nav, productList, productsSection, type Product } from "@/content";
import { AppIcon } from "./ui/AppIcon";
import { ArrowRight, ArrowUpRight, Close, Menu } from "./ui/Icons";
import { ButtonLink, Container } from "./ui/primitives";
import { Wordmark } from "./Wordmark";

function productHref(p: Product) {
  return p.href ?? p.siteUrl;
}
const isExternal = (href: string) => href.startsWith("http");

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mobile menu: Escape closes, body scroll locked, closes when resized to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const current = (href: string) => (href === pathname ? "page" : undefined);

  return (
    <header className="theme-dark sticky top-0 z-50 border-b border-line bg-surface/[0.97] text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-green focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Container className="flex h-[4.25rem] items-center justify-between gap-6">
        <a href="/" className="rounded-md" aria-label="Splash, home">
          <Wordmark className="text-[1.625rem]" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <ProductsMenu />
            </li>
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={current(l.href)}
                  className="rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-soft transition-colors hover:text-fg aria-[current=page]:text-fg"
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
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <Close size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="fixed inset-x-0 top-[4.3rem] bottom-0 overflow-y-auto border-t border-line bg-surface lg:hidden"
      >
        <Container className="flex min-h-full flex-col pt-6 pb-10">
          <nav aria-label="Mobile">
            <p className="text-sm font-semibold text-soft" id="mobile-products-label">
              {nav.products.label}
            </p>
            <ul className="mt-3 space-y-1" aria-labelledby="mobile-products-label">
              {productList.map((p) => (
                <li key={p.id}>
                  <ProductItem product={p} onNavigate={() => setMenuOpen(false)} />
                </li>
              ))}
            </ul>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={current(l.href)}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4 font-display text-[1.75rem] font-bold tracking-tight aria-[current=page]:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink href={nav.cta.href} arrow onClick={() => setMenuOpen(false)} className="mt-8 w-full">
            {nav.cta.label}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}

/**
 * Desktop "Products" dropdown. Opens on click, or on hover with a mouse.
 * Escape, clicking outside or tabbing away closes it. Built from productList,
 * so new products appear here automatically.
 */
function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  };
  const hover = (next: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(next), next ? 60 : 160);
  };

  return (
    <div ref={rootRef} className="relative" onBlur={onBlur} onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="products-menu"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => rootRef.current?.querySelector<HTMLElement>("#products-menu a")?.focus());
          }
        }}
        className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-soft transition-colors hover:text-fg aria-expanded:text-fg"
      >
        {nav.products.label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id="products-menu"
        hidden={!open}
        className="absolute top-full left-0 pt-3"
      >
        <div className="w-[26rem] rounded-[1.25rem] border border-card-line bg-card p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
          <ul>
            {productList.map((p) => (
              <li key={p.id}>
                <ProductItem product={p} onNavigate={() => setOpen(false)} />
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between gap-4 rounded-xl border-t border-line px-3 pt-3 pb-2">
            <span className="text-sm text-soft">{productsSection.upcoming.title}</span>
            <a
              href={nav.products.allHref}
              onClick={() => setOpen(false)}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
            >
              {nav.products.allLabel}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductItem({ product: p, onNavigate }: { product: Product; onNavigate: () => void }) {
  const href = productHref(p);
  const ext = isExternal(href);
  return (
    <a
      href={href}
      onClick={onNavigate}
      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-fg/[0.06]"
    >
      <AppIcon product={p} size={44} className="size-11" />
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-display text-[1.0625rem] font-bold text-fg">
          {p.name}
          {ext && <ArrowUpRight size={14} className="text-soft" />}
        </span>
        <span className="block text-sm leading-snug text-soft">{p.promise}</span>
      </span>
    </a>
  );
}
