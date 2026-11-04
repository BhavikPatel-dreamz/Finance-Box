import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import type { SiteChrome } from "@/lib/wordpress/site-chrome";

/**
 * Compact dark banner with the shared header, used by single-content pages
 * (legal pages, blog posts, case studies, team profiles, archives).
 * Moved from the legal page layout.
 */
export function ArticleHero({
  chrome,
  eyebrow,
  title,
  highlight,
  meta,
}: {
  chrome: SiteChrome;
  eyebrow?: ReactNode;
  title: ReactNode;
  highlight?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="relative bg-[#121826] text-white overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-80"
        style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
        aria-hidden="true"
      />

      <div className="relative z-1">
        <SiteHeader header={chrome.header} />

        <div className="max-w-4xl mx-auto px-6 pt-10 pb-12 sm:pt-14 sm:pb-16 text-center">
          {eyebrow ? (
            <p className="mb-4 text-[12px] sm:text-[14px] font-mono font-medium uppercase tracking-[1.5px] text-[#23C55E]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-3">
            {title}
            {highlight ? <> <span className="text-[#23C55E]">{highlight}</span></> : null}
          </h1>
          {meta ? <div className="text-xs sm:text-sm text-white/60">{meta}</div> : null}
        </div>
      </div>
    </section>
  );
}
