import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { GreenButton } from "./green-button";
import Container from "./container";
import Section from "./section";
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
    titleMaxWidth: "max-w-[640px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
  clients: {
    layout: "two-line",
    titleMaxWidth: "max-w-[580px]",
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
    layout: "single-line",
    titleMaxWidth: "max-w-[860px]",
    highlightItalic: true,
    textMaxWidth: "max-w-full",
  },
};

export type FooterHeroProps = {
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
};

export function FooterHero({
  title,
  highlight,
  text,
  buttonLabel,
  buttonUrl,
  bgImage = "/media/Footer-bg.svg",
  variant = "default",
  layout,
  titleMaxWidth,
  textMaxWidth,
  highlightItalic,
  titleClassName,
  highlightClassName,
  textClassName,
  className,
}: FooterHeroProps) {
  const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.default;
  const activeLayout = layout ?? config.layout;
  const activeTitleMaxWidth = titleMaxWidth ?? config.titleMaxWidth;
  const activeTextMaxWidth = textMaxWidth ?? config.textMaxWidth;
  const isItalic = highlightItalic ?? config.highlightItalic;
  const isTwoLine = activeLayout === "two-line";

  return (
    <Section theme="light" spacing="both" className={twMerge("footer-cta-section", className)}>
      <Container>
        <Reveal preset="slide-up" distance={24}>
          {/* Container exactly 1280px on desktop matching Figma */}
          <div className="relative overflow-hidden rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-[#121826] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 sm:py-12 lg:py-16 min-h-[320px] lg:min-h-[342px] w-full">

            {bgImage && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={bgImage}
                  alt="Background"
                  fill
                  className="object-cover opacity-100" // object-cover se image container ke andar crop hogi, stretch nahi
                  priority
                />
              </div>
            )}

            <div className="relative flex flex-col items-center">
              {(() => {
                let displayTitle = title;
                const displayHighlight = highlight;
                if (typeof displayTitle === "string" && typeof displayHighlight === "string" && displayHighlight) {
                  if (displayTitle.endsWith(displayHighlight)) {
                    displayTitle = displayTitle.slice(0, -displayHighlight.length).trim();
                  }
                }
                return (
                  <h2
                    className={twMerge(
                      "text-[26px] sm:text-[36px] lg:text-[50px] leading-[1.15] font-medium tracking-[-0.8px] text-white",
                      activeTitleMaxWidth,
                      titleClassName
                    )}
                  >
                    <span>{displayTitle}</span>
                    {displayHighlight && (
                      <>
                        {isTwoLine ? (
                          <br className="hidden md:inline" />
                        ) : null}
                        {" "}
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
                    "mx-auto mt-4 sm:mt-6 text-[14px] sm:text-[16px] font-normal leading-[160%] text-white/70",
                    activeTextMaxWidth,
                    textClassName
                  )}
                >
                  {text}
                </p>
              ) : null}

              <div className="mt-6 sm:mt-8 lg:mt-10 flex justify-center">
                <GreenButton
                  label={buttonLabel}
                  href={buttonUrl}
                  onDark={true}
                />
              </div>
            </div>

          </div>
        </Reveal>
      </Container>
    </Section>
  );
}