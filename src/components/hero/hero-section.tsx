import React from "react";
import { twMerge } from "tailwind-merge";
import type { HeroConfig, HeroOverrides, HeroPageKey } from "./types";
import { getHeroConfig } from "@/config/hero.config";
import { resolveHeroBackground, formatSiteHeader, normalizeHeroConfig } from "./utils";
import { homeContent, type HomeContent } from "@/content/home";
import { HomeHeader } from "@/components/home/home-header";

// Variants
import { HomeHeroVariant } from "./variants/home-hero";
import { ServicesHeroVariant } from "./variants/services-hero";
import { WhyHeroVariant } from "./variants/why-hero";
import { ClientsHeroVariant } from "./variants/clients-hero";
import { CareersHeroVariant } from "./variants/careers-hero";
import { ContactHeroVariant } from "./variants/contact-hero";
import { AgenticAiHeroVariant } from "./variants/agentic-ai-hero";
import { SplitHeroVariant } from "./variants/split-hero";
import { LegalHeroVariant } from "./variants/legal-hero";
import { NotFoundHeroVariant } from "./variants/not-found-hero";
import { CenteredHeroVariant } from "./variants/centered-hero";

export interface HeroSectionProps {
  /** Page key used to load the preconfigured hero from src/config/hero.config.ts */
  page?: HeroPageKey;

  /** Optional direct custom config object (takes precedence over page key) */
  config?: HeroConfig;

  /** Optional runtime overrides (e.g. dynamic text from CMS/WordPress or local state) */
  overrides?: HeroOverrides;

  /** Optional custom header data (falls back to homeContent.header) */
  header?: HomeContent["header"];

  /** Optional direct header ReactNode (e.g. from SectionRenderer with WordPress chrome) */
  headerNode?: React.ReactNode;

  /** Whether to render the navigation header (default: true) */
  showHeader?: boolean;

  /** Additional classes for the hero section wrapper */
  className?: string;

  /** Optional section ID (default: "hero" or "product" for home) */
  id?: string;
}

export function HeroSection({
  page = "home",
  config,
  overrides,
  header,
  headerNode,
  showHeader = true,
  className,
  id,
}: HeroSectionProps) {
  // 1. Resolve final configuration (Base Config + Page Config + Overrides)
  const rawConfig: HeroConfig = config
    ? { ...config, ...(overrides || {}) }
    : getHeroConfig(page, overrides);
  const resolvedConfig = normalizeHeroConfig(rawConfig);

  // 2. Resolve background image styling
  const bgImage = resolveHeroBackground(resolvedConfig.background);

  // 3. Resolve Header data
  const isHome = page === "home" || resolvedConfig.variant === "home";
  const shouldRenderHeader =
    showHeader && resolvedConfig.showHeader !== false;
  const headerData = formatSiteHeader(
    resolvedConfig.header || header || homeContent.header,
    isHome,
  );

  // 4. Resolve default section ID
  const sectionId = id || (isHome ? "product" : "hero");

  return (
    <section
      id={sectionId}
      className={twMerge(
        "hero-section relative overflow-hidden bg-[#121826] text-white flex flex-col",
        resolvedConfig.sectionClassName,
        className,
      )}
    >
      {/* Background Vector Graphic / Ambient Texture */}
      {bgImage && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: bgImage }}
          aria-hidden="true"
        />
      )}

      {/* Main Container / Content Flow */}
      <div
        className={twMerge(
          "relative z-10 flex flex-col justify-between w-full h-full",
          resolvedConfig.heightClassName,
        )}
      >
        {/* Top Site Navigation Header */}
        {shouldRenderHeader &&
          (headerNode ?? (
            <HomeHeader
              header={headerData}
              surface={resolvedConfig.headerSurface || "plain"}
              logoHref="/"
            />
          ))}

        {/* Selected Variant Render */}
        <div className="relative z-1 flex-1 flex flex-col justify-center">
          {renderVariant(resolvedConfig)}
        </div>
      </div>
    </section>
  );
}

function renderVariant(config: HeroConfig) {
  switch (config.variant) {
    case "home":
      return <HomeHeroVariant config={config} />;
    case "services":
      return <ServicesHeroVariant config={config} />;
    case "why":
      return <WhyHeroVariant config={config} />;
    case "clients":
      return <ClientsHeroVariant config={config} />;
    case "careers":
      return <CareersHeroVariant config={config} />;
    case "contact":
      return <ContactHeroVariant config={config} />;
    case "agentic-ai":
      return <AgenticAiHeroVariant config={config} />;
    case "split":
      return <SplitHeroVariant config={config} />;
    case "legal":
      return <LegalHeroVariant config={config} />;
    case "not-found":
      return <NotFoundHeroVariant config={config} />;
    case "centered":
      return <CenteredHeroVariant config={config} />;
    default:
      return <CenteredHeroVariant config={config} />;
  }
}

export default HeroSection;
