import type { HomeContent } from "@/content/home";
import type { HeroBackgroundKey, HeroEyebrowConfig } from "./types";

const BACKGROUND_MAP: Record<string, string> = {
  home: "url(/home/homepage-hero-bg.svg)",
  services: "url(/services/services-hero-bg.svg)",
  why: "url(/why/why-bg-img.svg)",
  clients: "url(/clients/client-hero-bg.svg)",
  careers: "url(/careers/careers-page-hero-bg.svg)",
  contact: "url(/contact-us/contactus-hero-bg.svg)",
  none: "",
};

export function resolveHeroBackground(bg?: HeroBackgroundKey): string {
  if (!bg || bg === "none") return "";
  if (bg in BACKGROUND_MAP) {
    return BACKGROUND_MAP[bg];
  }
  return bg.startsWith("url(") ? bg : `url(${bg})`;
}

export function parseEyebrow(
  eyebrow?: HeroEyebrowConfig | string,
  defaultVariant: string = "dark",
): { text: string; variant: string; show: boolean; className?: string } | null {
  if (!eyebrow) return null;
  if (typeof eyebrow === "string") {
    return { text: eyebrow, variant: defaultVariant, show: true };
  }
  if (eyebrow.show === false) return null;
  return {
    text: eyebrow.text,
    variant: eyebrow.variant || defaultVariant,
    show: true,
    className: eyebrow.className,
  };
}

export function formatSiteHeader(
  header: HomeContent["header"],
  isHome = false,
): HomeContent["header"] {
  if (isHome) return header;
  const withSiteLinks = <T extends { url: string }>(value: T): T => ({
    ...value,
    url: value.url.startsWith("#") ? `/${value.url}` : value.url,
  });
  return {
    ...header,
    links: (header.links || []).map((link) => ({
      ...link,
      ...withSiteLinks(link),
      children: (link.children || []).map(withSiteLinks),
    })),
    cta: withSiteLinks(header.cta || { label: "Contact Us", url: "/contact-us/" }),
  };
}
