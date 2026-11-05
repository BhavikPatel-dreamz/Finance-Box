import type { ReactNode } from "react";
import type { EyebrowVariant } from "@/components/ui/eyebrow";
import type { ButtonProps } from "@/components/ui/button";
import type { HomeContent } from "@/content/home";

export type HeroPageKey =
  | "home"
  | "services"
  | "why"
  | "clients"
  | "careers"
  | "contact"
  | "agentic-ai"
  | "knowledge-hub"
  | "people-operations"
  | "privacy-policy"
  | "terms-conditions"
  | "not-found";

export type HeroVariantKey =
  | "home"
  | "services"
  | "why"
  | "clients"
  | "careers"
  | "contact"
  | "agentic-ai"
  | "split"
  | "legal"
  | "not-found"
  | "centered";

export type HeroBackgroundKey =
  | "home"
  | "services"
  | "why"
  | "clients"
  | "careers"
  | "contact"
  | "none"
  | (string & {});

export type HeroButtonConfig = {
  label: string;
  url: string;
  variant?: ButtonProps["color"];
  color?: ButtonProps["color"];
  onDark?: boolean;
  showArrow?: boolean;
  bgColor?: string;
  textColor?: string;
  size?: ButtonProps["size"];
  target?: string;
  className?: string;
};

export type HeroSecondaryCtaConfig = HeroButtonConfig & {
  isTextLink?: boolean;
};

export type HeroEyebrowConfig = {
  text: string;
  variant?: EyebrowVariant;
  show?: boolean;
  className?: string;
};

export type HeroTierItem = {
  number: string;
  label: string;
  title: string;
  highlight: string;
  text: string;
};

export type HeroPointItem = {
  number?: string;
  title: string;
};

export type HeroStatItem = {
  value: string;
  label: string;
};

export type HeroQuickLink = {
  label: string;
  href: string;
};

export interface HeroConfig {
  /** The layout variant determining structure & visual layout */
  variant: HeroVariantKey;

  /** Background preset key ("home" | "services" | "why" | "clients" | "careers" | "contact" | "none") or custom CSS url */
  background?: HeroBackgroundKey;

  /** Eyebrow configuration or simple text */
  eyebrow?: HeroEyebrowConfig | string;

  /** Main heading text */
  title: string;

  /** Highlighted text colored in primary brand green (#23C55E) */
  highlight?: string;

  /** Secondary highlight line (useful for multi-line hero titles like careers) */
  highlight2?: string;

  /** Optional max width class for title wrapping (e.g. "max-w-[430px]") */
  titleMaxWidth?: string;

  /** Subtitle / descriptive paragraph */
  description?: string;

  /** Primary call-to-action button */
  primaryCta?: HeroButtonConfig;

  /** Secondary call-to-action button or text link */
  secondaryCta?: HeroSecondaryCtaConfig;

  // --- Home Hero specific fields ---
  closeLabel?: string;
  closeValue?: string;
  closeUnit?: string;
  closeTrend?: string;
  runwayLabel?: string;
  runwayValue?: string;
  runwayUnit?: string;
  runwayTrend?: string;
  chartImage?: string;
  chartTitle?: string;
  floatingCta?: HeroButtonConfig;

  // --- Services Hero specific fields ---
  tiers?: HeroTierItem[];

  // --- Why FIAB Hero specific fields ---
  points?: HeroPointItem[];

  // --- Clients Hero specific fields ---
  clientProofTitle?: string;
  clientProofItems?: string[];
  stats?: HeroStatItem[];

  // --- Agentic AI Hero specific fields ---
  bullets?: string[];

  // --- Legal Hero specific fields ---
  effectiveDate?: string;

  // --- 404 Hero specific fields ---
  errorCode?: string;
  badgeText?: string;
  quickLinks?: HeroQuickLink[];

  // --- Global options & layout tweaks anyone can change in TS config ---
  /** Custom container class name override */
  containerClassName?: string;
  /** Custom section class name override */
  sectionClassName?: string;
  /** Section min-height class name override (e.g. "lg:min-h-[771px]" or "lg:h-[525px]") */
  heightClassName?: string;
  /** Whether to render top site header automatically (defaults to true) */
  showHeader?: boolean;
  /** Surface style for the header: "plain" | "grid" */
  headerSurface?: "grid" | "plain";
  /** Optional custom header data (falls back to homeContent.header) */
  header?: HomeContent["header"];
}

export type HeroOverrides = Partial<HeroConfig>;
