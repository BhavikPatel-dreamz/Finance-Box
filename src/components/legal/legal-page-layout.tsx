import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import type { SiteChrome } from "@/lib/wordpress/site-chrome";
import type { LegalDocContent } from "@/content/privacy-policy";

export function LegalPageLayout({ content, chrome }: { content: LegalDocContent; chrome: SiteChrome }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#16181d]">
      {/* 1. Clean Compact Hero Banner */}
      <section className="relative bg-[#121826] text-white overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-80"
          style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <SiteHeader header={chrome.header} />

          <div className="max-w-4xl mx-auto px-6 pt-10 pb-12 sm:pt-14 sm:pb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-3">
              {content.hero.title} <span className="text-[#23C55E]">{content.hero.highlight}</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/60">
              Last updated: {content.hero.effectiveDate}
            </p>
          </div>
        </div>
      </section>

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
                      <a
                        href={section.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#23C55E] hover:underline font-medium inline-flex items-center gap-1"
                      >
                        {section.link.label}
                      </a>
                    </p>
                  )}

                  {section.email && (
                    <p className="pt-1">
                      <span className="text-[#6B7280]">Contact: </span>
                      <a
                        href={`mailto:${section.email}`}
                        className="text-[#23C55E] hover:underline font-medium"
                      >
                        {section.email}
                      </a>
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
                <a
                  href={`mailto:${content.hero.contactEmail}`}
                  className="text-[#23C55E] hover:underline"
                >
                  {content.hero.contactEmail}
                </a>
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
