import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { GreenButton } from "./green-button";
import Container from "./container";
import Section from "./section";

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
    textMaxWidth: "max-w-full",
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
};

export function FooterHero({
  title,
  highlight,
  text,
  buttonLabel,
  buttonUrl,
  bgImage = "/media/Footer-bg.png",
  variant = "default",
  layout,
  titleMaxWidth,
  highlightItalic,
  titleClassName,
  highlightClassName,
  textClassName,
  className,
}: FooterHeroProps) {
  const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.default;
  const activeLayout = layout ?? config.layout;
  const activeTitleMaxWidth = titleMaxWidth ?? config.titleMaxWidth;
  const isItalic = highlightItalic ?? config.highlightItalic;
  const activeTextMaxWidth = config.textMaxWidth;
  const isTwoLine = activeLayout === "two-line";

  return (
    <Section theme="light" spacing="both" className={twMerge("footer-cta-section", className)}>
      <Container>
        {/* Container exactly 1280x342 on desktop, flexible height on mobile */}
        <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 sm:py-12 lg:py-13 min-h-[320px] lg:h-[342px] w-full max-w-[1280px] mx-auto">

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

          <div className="relative z-10 flex flex-col items-center">
            <h2
              className={twMerge(
                "text-[26px] sm:text-[36px] md:text-[50px] leading-[1.15] font-medium tracking-[-0.8px] text-white",
                activeTitleMaxWidth,
                titleClassName
              )}
            >
              <span>{title}</span>
              {highlight && (
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
                    {highlight}
                  </span>
                </>
              )}
            </h2>

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
                className="hover:!bg-white hover:!text-[#121826]"
              />
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}