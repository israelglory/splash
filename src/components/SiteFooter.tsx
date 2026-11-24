import { footer, mailto, site, socials } from "@/content";
import { socialIcons } from "./ui/Icons";
import { Container, external } from "./ui/primitives";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="theme-dark bg-surface text-fg">
      <Container className="pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark className="text-[2.5rem]" />
            <p className="mt-4 max-w-xs text-lg text-soft">{site.mission}</p>
            <p className="mt-8 text-[0.9375rem] text-soft">
              <a href={mailto()} className="font-medium text-fg underline decoration-line underline-offset-4 hover:decoration-green">
                {site.email}
              </a>
              <span aria-hidden="true"> · </span>
              <span className="whitespace-nowrap">{site.location}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-sans text-sm font-semibold text-soft">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...("external" in l && l.external ? external : {})}
                        className="text-[0.9375rem] font-medium text-fg transition-colors hover:text-green"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-sm text-soft">
            <p>{site.copyright}</p>
            <p>{site.registration}</p>
          </div>
          <ul className="flex gap-2" aria-label="Social media">
            {socials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    {...external}
                    aria-label={`Splash on ${s.label}`}
                    className="flex size-11 items-center justify-center rounded-full border border-line text-soft transition-colors hover:border-fg hover:text-fg"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
