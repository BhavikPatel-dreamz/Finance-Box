import {
  servicesContent,
  type ServicesContent,
  type ServicesLink,
  type ServicesTier,
  type ServicesStage,
  type ServicesDetail,
  type ServicesStep,
  type ServicesPhotoCard,
} from "@/content/services";
import type { RawSection } from "@/lib/wordpress/content";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                    */
/* -------------------------------------------------------------------------- */

function str(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function keep(value: unknown, fallback: string): string {
  return str(value) ?? fallback;
}

function cleanHtml(value: unknown, fallback: string): string {
  const text = str(value);
  if (!text) return fallback;
  const stripped = text
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .trim();
  return stripped || fallback;
}

function media(value: unknown): { url: string; alt: string } | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, any>;
  const nested = item.node ?? item;
  const url = nested.sourceUrl ?? nested.url ?? null;
  if (!url || typeof url !== "string") return null;
  return {
    url,
    alt: typeof nested.altText === "string" ? nested.altText : "",
  };
}

function link(value: unknown, fallback: ServicesLink): ServicesLink {
  if (!value || typeof value !== "object") return fallback;
  const item = value as Record<string, any>;
  return {
    label: keep(item.title ?? item.label, fallback.label),
    url: keep(item.url, fallback.url),
  };
}

function rows(value: unknown): Record<string, any>[] {
  return Array.isArray(value) ? (value as Record<string, any>[]) : [];
}

function mapStageIcon(card: Record<string, any>): ServicesStage["icon"] {
  const title = (str(card.title) ?? "").toLowerCase();
  if (title.includes("foundation") || title.includes("set")) return "gear";
  if (title.includes("momentum") || title.includes("build")) return "people";
  if (title.includes("foresight") || title.includes("lead")) return "person";
  if (title.includes("optimize") || title.includes("expand")) return "target";
  return "gear";
}

function matchesLayout(typeName: string, layoutName: string): boolean {
  return typeName.endsWith(`${layoutName}Layout`);
}

function splitHighlight(
  raw: unknown,
  fallbackTitle: string,
  fallbackHighlight: string,
): { title: string; highlight: string } {
  const text = str(raw) ?? "";
  if (!text) {
    return { title: fallbackTitle, highlight: fallbackHighlight };
  }

  const match = text.match(/(.*?)<(?:span|b|strong)[^>]*>([\s\S]*?)<\/(?:span|b|strong)>(.*)/i);
  if (match) {
    const before = cleanHtml(match[1], "");
    const highlight = cleanHtml(match[2], fallbackHighlight);
    const after = cleanHtml(match[3], "");
    const fullBefore = (before + (after ? ` ${after}` : "")).trim();
    return {
      title: fullBefore || fallbackTitle,
      highlight: highlight || fallbackHighlight,
    };
  }

  const clean = cleanHtml(text, fallbackTitle);
  if (fallbackHighlight && clean.endsWith(fallbackHighlight) && clean.length > fallbackHighlight.length) {
    const trimmedTitle = clean.slice(0, -fallbackHighlight.length).trim();
    return {
      title: trimmedTitle || fallbackTitle,
      highlight: fallbackHighlight,
    };
  }

  return { title: clean || fallbackTitle, highlight: fallbackHighlight };
}

/* -------------------------------------------------------------------------- */
/*                              Section Mergers                                */
/* -------------------------------------------------------------------------- */

function mergeHero(next: ServicesContent, section: Record<string, any>): void {
  next.hero.eyebrow = cleanHtml(section.subTitle, next.hero.eyebrow);
  const titleData = splitHighlight(section.title, next.hero.title, next.hero.highlight);
  next.hero.title = titleData.title;
  next.hero.highlight = cleanHtml(section.highlight, titleData.highlight);
  next.hero.text = cleanHtml(section.description, next.hero.text);
  next.hero.primary = link(section.primaryCtaButton, next.hero.primary);
  next.hero.secondary = link(section.secondaryCtaButton, next.hero.secondary);

  const tierCards = rows(section.tierCards);
  if (tierCards.length > 0) {
    next.hero.tiers = tierCards.map((card, index) => {
      const fallback = next.hero.tiers[index] ?? {
        number: String(index + 1).padStart(2, "0"),
        label: "",
        title: "",
        highlight: "",
        text: "",
      };
      const titleData = splitHighlight(card.title, fallback.title, fallback.highlight);
      return {
        number: cleanHtml(card.label, fallback.number),
        label: cleanHtml(card.label, fallback.label),
        title: titleData.title,
        highlight: cleanHtml(card.highlight, titleData.highlight),
        text: cleanHtml(card.description, fallback.text),
      } satisfies ServicesTier;
    });
  }
}

function mergeStages(next: ServicesContent, section: Record<string, any>): void {
  next.stages.eyebrow = cleanHtml(section.subTitle, next.stages.eyebrow);
  next.stages.title = cleanHtml(section.title, next.stages.title);
  next.stages.text = cleanHtml(section.description, next.stages.text);

  const stageCards = rows(section.stageCards);
  if (stageCards.length > 0) {
    next.stages.cards = stageCards.map((card, index) => {
      const fallback = next.stages.cards[index] ?? {
        title: "",
        label: "",
        text: "",
        icon: "gear" as const,
      };
      return {
        title: cleanHtml(card.title, fallback.title),
        label: cleanHtml(card.stageLabel, fallback.label),
        text: cleanHtml(card.description, fallback.text),
        icon: mapStageIcon(card),
      } satisfies ServicesStage;
    });
  }
}

function mergeDepthAndDetails(
  next: ServicesContent,
  section: Record<string, any>,
): void {
  next.depth.eyebrow = cleanHtml(section.subTitle, next.depth.eyebrow);
  next.depth.title = cleanHtml(section.title, next.depth.title);
  next.depth.cta = link(section.ctaButton, next.depth.cta);

  const tiers = rows(section.tiers);
  if (tiers.length > 0) {
    next.details = tiers.map((tier, index) => {
      const fallback = next.details[index];
      const number = str(tier.number) ?? fallback?.number ?? String(index + 1).padStart(2, "0");
      const slugAnchor =
        str(tier.title)?.split(".")[0]?.trim().toLowerCase().replace(/\s+/g, "-") ??
        fallback?.anchor ??
        `tier-${index + 1}`;

      const nestedServices = rows(tier.services);
      const items =
        nestedServices.length > 0
          ? nestedServices.map((svc) => ({
              title: cleanHtml(svc.title, ""),
              text: cleanHtml(svc.description, ""),
            }))
          : fallback?.items ?? [];

      return {
        anchor: fallback?.anchor ?? slugAnchor,
        number,
        title: cleanHtml(tier.title, fallback?.title ?? ""),
        text: cleanHtml(tier.description, fallback?.text ?? ""),
        cta: link(tier.ctaButton, fallback?.cta ?? { label: "Explore", url: "#" }),
        items,
      } satisfies ServicesDetail;
    });
  }
}

function mergeCfo(next: ServicesContent, section: Record<string, any>): void {
  next.cfo.title = cleanHtml(section.title, next.cfo.title);
  next.cfo.text = cleanHtml(section.description, next.cfo.text);
  next.cfo.cta = link(section.ctaButton, next.cfo.cta);

  const deliverables = rows(section.deliverables);
  if (deliverables.length > 0) {
    next.cfo.cards = deliverables.map((card, index) => {
      const fallback = next.cfo.cards[index];
      return {
        title: cleanHtml(card.label, fallback?.title ?? ""),
        text: cleanHtml(card.description, fallback?.text ?? ""),
        image: media(card.image) ?? fallback?.image ?? null,
      } satisfies ServicesPhotoCard;
    });
  }
}

function mergeProcess(next: ServicesContent, section: Record<string, any>): void {
  next.process.title = cleanHtml(section.title, next.process.title);
  next.process.text = cleanHtml(section.description, next.process.text);

  const steps = rows(section.steps);
  if (steps.length > 0) {
    next.process.steps = steps.map((step, index) => {
      const fallback = next.process.steps[index];
      return {
        number: str(step.number) ?? fallback?.number ?? String(index + 1).padStart(2, "0"),
        title: cleanHtml(step.title, fallback?.title ?? ""),
        text: cleanHtml(step.description, fallback?.text ?? ""),
      } satisfies ServicesStep;
    });
  }
}

function mergeInvestors(next: ServicesContent, section: Record<string, any>): void {
  next.investors.eyebrow = cleanHtml(section.subTitle, next.investors.eyebrow);
  next.investors.title = cleanHtml(section.title, next.investors.title);
  next.investors.highlight = cleanHtml(section.highlight, next.investors.highlight);
  next.investors.text = cleanHtml(section.description, next.investors.text);
  next.investors.primary = link(section.primaryCtaButton, next.investors.primary);
  next.investors.secondary = link(section.secondaryCtaButton, next.investors.secondary);

  const cards = rows(section.investorCards);
  if (cards.length > 0) {
    next.investors.cards = cards.map((card, index) => {
      const fallback = next.investors.cards[index];
      return {
        title: cleanHtml(card.title, fallback?.title ?? ""),
        text: cleanHtml(card.description, fallback?.text ?? ""),
        image: media(card.image) ?? fallback?.image ?? null,
      } satisfies ServicesPhotoCard;
    });
  }
}

/** CTA Section → pressure (the "Tell Us Where The Pressure Is" block). */
function mergePressure(next: ServicesContent, section: Record<string, any>): void {
  const titleData = splitHighlight(section.title, next.pressure.title, next.pressure.emphasis);
  next.pressure.title = titleData.title;
  next.pressure.emphasis = titleData.highlight;
  next.pressure.text = cleanHtml(section.description, next.pressure.text);
  next.pressure.cta = link(section.ctaButton, next.pressure.cta);
}

/* -------------------------------------------------------------------------- */
/*                              Public Entry Point                             */
/* -------------------------------------------------------------------------- */

export function mergeServices(
  base: ServicesContent,
  sections: RawSection[],
): ServicesContent {
  const next: ServicesContent = structuredClone(base);

  for (const section of sections ?? []) {
    const typeName =
      typeof section.__typename === "string" ? section.__typename : "";
    const data = section as Record<string, any>;

    if (matchesLayout(typeName, "ServicesBannerSection")) {
      mergeHero(next, data);
      continue;
    }

    if (matchesLayout(typeName, "ServicesFindYourStageSection")) {
      mergeStages(next, data);
      continue;
    }

    if (matchesLayout(typeName, "ServicesTiersInDepthSection")) {
      mergeDepthAndDetails(next, data);
      continue;
    }

    if (matchesLayout(typeName, "ServicesFractionalCfoSection")) {
      mergeCfo(next, data);
      continue;
    }

    if (matchesLayout(typeName, "ServicesOperatingCadenceSection")) {
      mergeProcess(next, data);
      continue;
    }

    if (matchesLayout(typeName, "ServicesInvestorsSection")) {
      mergeInvestors(next, data);
      continue;
    }

    // 👇 NAYA: Handle CTA Section for the "Pressure" block
    if (matchesLayout(typeName, "CtaSection")) {
      mergePressure(next, data);
      continue;
    }
  }

  return next;
}

export function mergeServicesContent(sections: RawSection[]): ServicesContent {
  return mergeServices(servicesContent, sections);
}