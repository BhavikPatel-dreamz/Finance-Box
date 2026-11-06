import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero";
import { SiteFooter } from "@/components/layout/site-footer";
import type { SiteChrome } from "@/lib/wordpress/site-chrome";
import type { LegalDocContent } from "@/content/privacy-policy";

// Smooth color + underline fade for all text links on this page
// Underline always visible, text + underline fade to green on hover
const LINK_CLASS =
  "font-medium text-[#121826] underline decoration-[#121826]/40 underline-offset-4 transition-colors duration-300 hover:text-[#23C55E] hover:decoration-[#23C55E]";

export function LegalPageLayout({ content, chrome }: { content: LegalDocContent; chrome: SiteChrome }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#16181d]">
      {/* 1. Clean Compact Hero Banner */}
      <HeroSection
        page="privacy-policy"
        overrides={{
          variant: "legal",
          title: content.hero.title,
          highlight: content.hero.highlight,
          effectiveDate: content.hero.effectiveDate,
        }}
      />

      {/* 2. Clean Single-Column Reading Body */}
      <main className="flex-1 bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-8 sm:space-y-10">
            {content.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-lg sm:text-xl font-semibold text-[#121826] mb-3">
                  {section.number}) {section.title}
                </h2>

                <div className="space-y-3 text-[15px] sm:text-[16px] leading-[1.75] text-[#374151]">
                  {section.intro && (
                    <p className="text-[#121826] font-medium">{section.intro}</p>
                  )}

                  {section.paragraphs?.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 my-2 pl-1">
                      {section.bullets.map((bullet, idx) => {
                        const isObject = typeof bullet !== "string";
                        const label = isObject ? bullet.label : null;
                        const text = isObject ? bullet.text : bullet;
                        return (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-[#23C55E] font-bold shrink-0 select-none">•</span>
                            <div>
                              {label && (
                                <strong className="font-semibold text-[#121826]">
                                  {label}:{" "}
                                </strong>
                              )}
                              <span>{text}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {section.note && (
                    <p className="text-[#4B5563] text-sm pt-1">
                      {section.note}
                    </p>
                  )}

                  {section.link && (
                    <p className="pt-1">
                      <Link
                        href={section.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${LINK_CLASS} inline-flex items-center gap-1`}
                      >
                        {section.link.label}
                      </Link>
                    </p>
                  )}

                  {section.email && (
                    <p className="pt-1">
                      <span className="text-[#6B7280]">Contact: </span>
                      <Link href={`mailto:${section.email}`} className={LINK_CLASS}>
                        {section.email}
                      </Link>
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Simple Contact Footer Block */}
          <div className="pt-8 mt-12 border-t border-black/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#121826]">
                Contact:{" "}
                <Link
                  href={`mailto:${content.hero.contactEmail}`}
                  className="text-[#121826] underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-[#23C55E] hover:decoration-[#23C55E]"
                >
                  {content.hero.contactEmail}
                </Link>
              </p>
            </div>
            <Button
              color="green"
              size="sm"
              text="Contact Us"
              href="/contact-us/"
            />
          </div>
        </div>
      </main>

      {/* 3. Site Footer */}
      <SiteFooter footer={chrome.footer} />
    </div>
  );
}
