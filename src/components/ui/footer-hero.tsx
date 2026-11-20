import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { GreenButton } from "./green-button";
import Container from "./container";
import Section, { type SectionSpacing, type SectionTheme } from "./section";
import { Reveal } from "@/components/motion/reveal";

export type FooterHeroVariant =
  | "home"
  | "services"
  | "why"
  | "clients"
  | "careers"
  | "agentic-ai"
  | "knowledge-hub"
  | "people-operations"
  | "why-fiab"
  | "foundation"
  | "momentum"
  | "foresight"
  | "partner-with-us"
  | "single-line"
  | "two-line"
  | "default";

type VariantConfig = {
  layout: "single-line" | "two-line";
  titleMaxWidth: string;
  highlightItalic: boolean;
  textMaxWidth: string;
};

const VARIANT_CONFIGS: Record<FooterHeroVariant, VariantConfig> = {
  home: {
    layout: "single-line",
    titleMaxWidth: "max-w-[860px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  services: {
    layout: "single-line",
    titleMaxWidth: "max-w-[860px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  why: {
    layout: "two-line",
    titleMaxWidth: "max-w-[606px]",
    highlightItalic: true,
    textMaxWidth: "max-w-[780px]",
  },
  clients: {
    layout: "two-line",
    titleMaxWidth: "max-w-[640px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  careers: {
    layout: "single-line",
    titleMaxWidth: "max-w-[760px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  "agentic-ai": {
    layout: "two-line",
    titleMaxWidth: "max-w-[680px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  "knowledge-hub": {
    layout: "single-line",
    titleMaxWidth: "max-w-[680px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  "people-operations": {
    layout: "two-line",
    titleMaxWidth: "max-w-[560px]",
    highlightItalic: false,
    textMaxWidth: "max-w-[628px]",
  },
  "why-fiab": {
    layout: "two-line",
    titleMaxWidth: "max-w-[606px]",
    highlightItalic: true,
    textMaxWidth: "max-w-[780px]",
  },
  foundation: {
    layout: "two-line",
    titleMaxWidth: "max-w-[540px]",
    highlightItalic: false,
    textMaxWidth: "max-w-[680px]",
  },
  momentum: {
    layout: "two-line",
    titleMaxWidth: "max-w-[760px]",
    highlightItalic: false,
    textMaxWidth: "max-w-[720px]",
  },
  foresight: {
    layout: "single-line",
    titleMaxWidth: "max-w-[800px]",
    highlightItalic: false,
    textMaxWidth: "max-w-[680px]",
  },
  "partner-with-us": {
    layout: "single-line",
    titleMaxWidth: "max-w-[880px]",
    highlightItalic: false,
    textMaxWidth: "max-w-[680px]",
  },
  "single-line": {
    layout: "single-line",
    titleMaxWidth: "max-w-[860px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  "two-line": {
    layout: "two-line",
    titleMaxWidth: "max-w-[640px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  default: {
    layout: "two-line",
    titleMaxWidth: "max-w-[540px]",
    highlightItalic: false,
    textMaxWidth: "max-w-[680px]",
  },
};

export type FooterHeroProps = {
  id?: string;
  title: string;
  highlight?: string;
  text?: string;
  buttonLabel: string;
  buttonUrl: string;
  bgImage?: string;
  /** Page variant or generic layout preset */
  variant?: FooterHeroVariant;
  /** Explicit override for title layout: "single-line" or "two-line" on desktop */
  layout?: "single-line" | "two-line";
  /** Explicit override for title max-width */
  titleMaxWidth?: string;
  /** Explicit override for whether highlight is italic */
  highlightItalic?: boolean;
  /** Custom classes */
  titleClassName?: string;
  highlightClassName?: string;
  textClassName?: string;
  className?: string;
  textMaxWidth?: string;
  /** Section vertical spacing: defaults to "both" (80px top & bottom), automatically collapses top padding when following a light section */
  spacing?: SectionSpacing;
  /** Backdrop section theme (defaults to "cream" for service detail/careers pages, "light" otherwise) */
  theme?: SectionTheme;
};

export function FooterHero({
  id,
  title,
  highlight,
  text,
  buttonLabel,
  buttonUrl,
  bgImage,
  variant = "default",
  layout,
  titleMaxWidth,
  textMaxWidth,
  highlightItalic,
  titleClassName,
  highlightClassName,
  textClassName,
  className,
  spacing = "both",
  theme,
}: FooterHeroProps) {
  const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.default;
  const activeLayout = layout ?? config.layout;
  const activeTitleMaxWidth = titleMaxWidth ?? config.titleMaxWidth;
  const activeTextMaxWidth = textMaxWidth ?? config.textMaxWidth;
  const isItalic = highlightItalic ?? config.highlightItalic;
  const isTwoLine = activeLayout === "two-line";
  const activeTheme = theme ?? "light";

  return (
    <Section id={id} theme={activeTheme} spacing={spacing} className={twMerge("footer-cta-section bg-white", className)}>
      <Container>
        <Reveal preset="slide-up" distance={24}>
          {/* Container exactly 1280px on desktop matching Figma */}
          <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-12 py-10 sm:py-12 lg:py-14 sm:min-h-[334px] w-full shadow-2xl shadow-black/20">
            {/* Background Image: public/footer-cta-bg.svg */}
            <Image
              src={bgImage || "/footer-cta-bg.svg"}
              alt=""
              fill
              priority
              className="pointer-events-none object-cover select-none"
            />

            <div className="relative z-10 flex flex-col items-center w-full min-w-0 max-w-full">
              {(() => {
                let displayTitle = title;
                const displayHighlight = highlight;
                if (typeof displayTitle === "string" && typeof displayHighlight === "string" && displayHighlight) {
                  if (displayTitle.endsWith(displayHighlight)) {
                    displayTitle = displayTitle.slice(0, -displayHighlight.length).trim();
                  }
                }

                let renderedTitle: React.ReactNode = displayTitle;
                if (typeof displayTitle === "string") {
                  if (displayTitle.includes("\n")) {
                    const lines = displayTitle.split("\n");
                    renderedTitle = lines.map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ));
                  } else if (!displayHighlight && displayTitle.includes(",")) {
                    const commaIdx = displayTitle.indexOf(",");
                    const part1 = displayTitle.slice(0, commaIdx + 1);
                    const part2 = displayTitle.slice(commaIdx + 1).trim();
                    renderedTitle = (
                      <>
                        <span className="block sm:inline">{part1}</span>
                        <br className="hidden sm:inline" />
                        <span className="block sm:inline">{part2}</span>
                      </>
                    );
                  } else if (!displayHighlight && displayTitle.includes(" without ")) {
                    const withoutIdx = displayTitle.indexOf(" without ") + " without".length;
                    const part1 = displayTitle.slice(0, withoutIdx);
                    const part2 = displayTitle.slice(withoutIdx).trim();
                    renderedTitle = (
                      <>
                        <span className="block sm:inline">{part1}</span>
                        <br className="hidden sm:inline" />
                        <span className="block sm:inline">{part2}</span>
                      </>
                    );
                  }
                }

                return (
                  <h2
                    className={twMerge(
                      "text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] leading-[1.18] font-medium tracking-tight text-white",
                      activeTitleMaxWidth,
                      titleClassName
                    )}
                  >
                    {renderedTitle}
                    {displayHighlight && (
                      <>
                        {isTwoLine ? (
                          <>
                            <br className="hidden md:inline" />
                            <span className="md:hidden"> </span>
                          </>
                        ) : (
                          " "
                        )}
                        <span
                          className={twMerge(
                            isItalic ? "font-extrabold italic" : "font-medium",
                            highlightClassName
                          )}
                        >
                          {displayHighlight}
                        </span>
                      </>
                    )}
                  </h2>
                );
              })()}

              {text ? (
                <p
                  className={twMerge(
                    "mx-auto mt-4 sm:mt-5 text-[15px] sm:text-[16px] lg:text-[17px] font-normal leading-[160%] text-white/70",
                    activeTextMaxWidth,
                    textClassName
                  )}
                >
                  {text}
                </p>
              ) : null}

              <div className="mt-7 sm:mt-8 lg:mt-9 flex justify-center">
                <GreenButton
                  label={buttonLabel}
                  href={buttonUrl}
                  onDark={true}
                  className="h-[52px] sm:h-[56px] px-7 sm:px-8 text-[15px] sm:text-[16px] font-medium shadow-lg shadow-black/20"
                />
              </div>
            </div>

          </div>
        </Reveal>
      </Container>
    </Section>
  );
}