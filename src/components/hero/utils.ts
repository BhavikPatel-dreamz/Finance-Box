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

export function normalizeHeroConfig(config: import("./types").HeroConfig): import("./types").HeroConfig {
  let title = config.title;
  let highlight = config.highlight;
  const highlight2 = config.highlight2;

  // 1. If title contains HTML <span>, <b>, or <strong> tags (e.g. from WordPress WYSIWYG or ACF)
  if (typeof title === "string" && /<(?:span|b|strong)[^>]*>/i.test(title)) {
    const match = title.match(/(.*?)<(?:span|b|strong)[^>]*>(.*?)<\/(?:span|b|strong)>(.*)/i);
    if (match) {
      const before = match[1].replace(/<[^>]*>/g, "").trim();
      const tagContent = match[2].replace(/<[^>]*>/g, "").trim();
      const after = match[3].replace(/<[^>]*>/g, "").trim();
      title = (before + (after ? ` ${after}` : "")).trim();
      highlight = tagContent;
    }
  }

  // 2. If highlight already ends with highlight2 (e.g. "for growth companies" and "companies"), split them
  if (typeof highlight === "string" && typeof highlight2 === "string" && highlight2) {
    if (highlight.endsWith(highlight2)) {
      highlight = highlight.slice(0, -highlight2.length).trim();
    }
  }

  // 3. If title ends with or contains highlight, strip it from title so it's not duplicated
  if (typeof title === "string" && typeof highlight === "string" && highlight) {
    if (typeof highlight2 === "string" && highlight2) {
      const combined = `${highlight} ${highlight2}`;
      if (title.endsWith(combined)) {
        title = title.slice(0, -combined.length).trim();
      } else if (title.endsWith(highlight2)) {
        title = title.slice(0, -highlight2.length).trim();
        if (title.endsWith(highlight)) {
          title = title.slice(0, -highlight.length).trim();
        }
      }
    } else if (title.endsWith(highlight)) {
      title = title.slice(0, -highlight.length).trim();
    }
  }

  return {
    ...config,
    title,
    highlight,
    highlight2,
  };
}
