import {
  homeContent,
  type HomeContent,
  type HomeMedia,
  type HomeCard,
  type HomePerson,
} from "@/content/home";
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

function media(value: unknown): HomeMedia | null {
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

function link(value: unknown, fallback: { label: string; url: string }) {
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

function extractListItems(html: string): string[] {
  const items: string[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null;
  while ((match = liRegex.exec(html)) !== null) {
    const text = cleanHtml(match[1], "");
    if (text) items.push(text);
  }
  if (items.length > 0) return items;

  return cleanHtml(html, "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/* -------------------------------------------------------------------------- */
/*                          Section Type Matching                              */
/* -------------------------------------------------------------------------- */

/**
 * WPGraphQL + ACF flexible content types follow the pattern:
 *   PageBuilderPageBuilder<LayoutName>Layout
 * This helper checks the `<LayoutName>Layout` suffix so it works
 * for both bare and namespaced typenames.
 */
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

function parseStatValue(
  rawVal: unknown,
  fallbackVal: string,
  fallbackUnit: string,
): { value: string; unit: string } {
  if (typeof rawVal !== "string") {
    return { value: fallbackVal, unit: fallbackUnit };
  }
  const spanMatch = rawVal.match(/<span[^>]*>(.*?)<\/span>(.*)/i);
  if (spanMatch) {
    const val = cleanHtml(spanMatch[1], fallbackVal);
    const unit = cleanHtml(spanMatch[2], fallbackUnit);
    return { value: val, unit: unit || fallbackUnit };
  }
  const clean = cleanHtml(rawVal, "");
  const spaceIdx = clean.indexOf(" ");
  if (spaceIdx > 0) {
    return {
      value: clean.slice(0, spaceIdx).trim() || fallbackVal,
      unit: clean.slice(spaceIdx + 1).trim() || fallbackUnit,
    };
  }
  return { value: clean || fallbackVal, unit: fallbackUnit };
}

/* -------------------------------------------------------------------------- */
/*                              Section Mergers                                */
/* -------------------------------------------------------------------------- */

/** Home Banner Section → hero + stat cards. */
function mergeHero(next: HomeContent, section: Record<string, any>): void {
  next.hero.eyebrow = cleanHtml(section.subTitle, "");
  const titleData = splitHighlight(section.title, "", "");
  next.hero.title = titleData.title;
  next.hero.highlight = cleanHtml(section.highlight, titleData.highlight);
  next.hero.text = cleanHtml(section.description, "");
  next.hero.primary = link(section.ctaButton, next.hero.primary);

  if (section.floatingCtaButton) {
    next.hero.call = link(section.floatingCtaButton, next.hero.call);
  }

  const statCards = rows(section.statCards);
  if (statCards.length > 0) {
    const [first, second] = statCards;
    if (first) {
      next.hero.closeLabel = cleanHtml(first.label, "");
      const parsed = parseStatValue(first.value, next.hero.closeValue, next.hero.closeUnit);
      next.hero.closeValue = parsed.value;
      next.hero.closeUnit = parsed.unit;
      next.hero.closeTrend = cleanHtml(first.note, "");
    }
    if (second) {
      next.hero.runwayLabel = cleanHtml(second.label, "");
      const parsed = parseStatValue(second.value, next.hero.runwayValue, next.hero.runwayUnit);
      next.hero.runwayValue = parsed.value;
      next.hero.runwayUnit = parsed.unit;
      next.hero.runwayTrend = cleanHtml(second.note, "");
    }
  }
}

/** Home When Finance Matters → founders. */
function mergeFounders(next: HomeContent, section: Record<string, any>): void {
  next.founders.eyebrow = cleanHtml(section.subTitle, "");
  const titleData = splitHighlight(section.title, "", "");
  next.founders.title = titleData.title;
  next.founders.highlight = titleData.highlight;
  next.founders.text = cleanHtml(section.description, "");
  next.founders.cta = link(section.ctaButton, next.founders.cta);

  const moments = rows(section.moments);
  if (moments.length > 0) {
    next.founders.cards = moments.map((moment, index) => {
      const fallback = next.founders.cards[index] ?? {
        icon: null,
        title: "",
        text: "",
      };
      return {
        icon: null,
        title: cleanHtml(moment.title, fallback.title),
        text: cleanHtml(moment.content, fallback.text),
      } satisfies HomeCard;
    });
  }
}

/** Home What Makes FIAB Different → difference. */
function mergeDifference(next: HomeContent, section: Record<string, any>): void {
  next.difference.title = cleanHtml(section.title, "");

  const cards = rows(section.cards);
  if (cards.length > 0) {
    next.difference.cards = cards.map((card, index) => {
      const fallback = next.difference.cards[index];
      return {
        // `icon` may not be present in the schema — media() safely returns null.
        icon: media(card.icon),
        title: cleanHtml(card.title, fallback?.title ?? ""),
        text: cleanHtml(card.content, fallback?.text ?? ""),
        tone: fallback?.tone ?? "dark",
      };
    });
  }

  next.difference.statEyebrow = cleanHtml(
    section.outcomeLabel, "");
  next.difference.statValue = cleanHtml(
    section.outcomeValue, "");
  next.difference.statLabel = cleanHtml(
    section.outcomeText, "");
}

/** Home Finance That Grows → growth. */
function mergeGrowth(next: HomeContent, section: Record<string, any>): void {
  next.growth.eyebrow = cleanHtml(section.subTitle, "");
  next.growth.title = cleanHtml(section.title, "");
  next.growth.text = cleanHtml(section.description, "");
  next.growth.image = media(section.image) ?? next.growth.image;
  next.growth.overlay = cleanHtml(section.imageTitle, "");
  next.growth.cta = link(section.ctaButton, next.growth.cta);

  const imageSteps = rows(section.imageSteps);
  if (imageSteps.length > 0) {
    next.growth.stages = imageSteps.map((step) => keep(step.label, ""));
  }

  const tiers = rows(section.tiers);
  if (tiers.length > 0) {
    next.growth.cards = tiers.map((tier, index) => {
      const fallback = next.growth.cards[index];
      return {
        icon: null,
        title: cleanHtml(tier.title, fallback?.title ?? ""),
        text: cleanHtml(tier.description, fallback?.text ?? ""),
        // `points` may not be present — fall back to existing items safely.
        items:
          typeof tier.points === "string"
            ? extractListItems(tier.points)
            : fallback?.items ?? [],
      };
    });
  }
}

/** Home Client Perspective → decisions. */
function mergeDecisions(next: HomeContent, section: Record<string, any>): void {
  next.decisions.quote = cleanHtml(section.quote, "");
  next.decisions.name = cleanHtml(section.name, "");
  next.decisions.role = cleanHtml(section.designation, "");
  next.decisions.portrait = media(section.image) ?? next.decisions.portrait;

  next.decisions.eyebrow = cleanHtml(section.subTitle, "");
  next.decisions.title = cleanHtml(section.title, "");
  next.decisions.text = cleanHtml(section.description, "");
  next.decisions.cta = link(section.ctaButton, next.decisions.cta);

  const metrics = rows(section.metrics);
  if (metrics.length > 0) {
    next.decisions.cards = metrics.map((metric, index) => {
      const fallback = next.decisions.cards[index];
      return {
        icon: null,
        title: cleanHtml(metric.value, fallback?.title ?? ""),
        text: cleanHtml(metric.description, fallback?.text ?? ""),
      } satisfies HomeCard;
    });
  }
}

/** Home Leadership → leadership. */
function mergeLeadership(next: HomeContent, section: Record<string, any>): void {
  next.leadership.eyebrow = cleanHtml(section.subTitle, "");

  const slides = rows(section.slides);
  if (slides.length > 0) {
    const titles = Array.from(
      new Set(
        slides
          .map((slide) => cleanHtml(slide.title, ""))
          .filter(Boolean),
      ),
    );
    const descriptions = Array.from(
      new Set(
        slides
          .map((slide) => cleanHtml(slide.description, ""))
          .filter(Boolean),
      ),
    );
    if (titles.length > 0) next.leadership.title = titles[0];
    if (descriptions.length > 0) next.leadership.text = descriptions[0];
  }

  // GraphQL alias in section.tsx is `teamMembersList` (to disambiguate
  // against another `teamMembers` field on the Page type). Fallback kept
  // so merge still works if the alias is ever reverted.
  const teamMembers = rows(section.teamMembersList ?? section.teamMembers);
  if (teamMembers.length > 0) {
    const cmsPeople = teamMembers.map((member, index) => {
      const fallback = next.leadership.people[index];
      return {
        image: media(member.image) ?? fallback?.image ?? null,
        name: cleanHtml(member.name, fallback?.name ?? ""),
        role: cleanHtml(member.designation, fallback?.role ?? ""),
      } satisfies HomePerson;
    });

    const cmsNames = new Set(cmsPeople.map((p) => p.name.trim().toLowerCase()));
    const remainingPeople = next.leadership.people.filter(
      (p) => !cmsNames.has(p.name.trim().toLowerCase())
    );

    next.leadership.people = [...cmsPeople, ...remainingPeople];
  }
}

/** CTA Section → pressure (the "Tell Us Where The Pressure Is" block). */
function mergePressure(next: HomeContent, section: Record<string, any>): void {
  const titleData = splitHighlight(section.title, next.pressure.title, next.pressure.emphasis);
  next.pressure.title = titleData.title;
  next.pressure.emphasis = titleData.highlight;
  next.pressure.text = cleanHtml(section.description, "");
  next.pressure.cta = link(section.ctaButton, next.pressure.cta);
}

/** Agentic Official Partner Stack → partners (title + logos). */
function mergePartners(next: HomeContent, section: Record<string, any>): void {
  if (section.title) {
    next.partners.title = cleanHtml(section.title, "");
  }

  const partners = rows(section.officialPartners);
  if (partners.length > 0) {
    next.partners.logos = partners.map((partner) => {
      const image = media(partner.logo);
      return {
        image,
        name: image?.alt ?? "Partner",
        caption: "",
      };
    });
  }
}

/* -------------------------------------------------------------------------- */
/*                              Public Entry Point                             */
/* -------------------------------------------------------------------------- */

export function mergeHome(
  base: HomeContent,
  sections: RawSection[],
): HomeContent {
  const next: HomeContent = structuredClone(base);

  for (const section of sections ?? []) {
    const typeName =
      typeof section.__typename === "string" ? section.__typename : "";
    const data = section as Record<string, any>;

    if (matchesLayout(typeName, "HomeBannerSection")) {
      mergeHero(next, data);
      continue;
    }

    if (matchesLayout(typeName, "HomeWhenFinanceMattersSection")) {
      mergeFounders(next, data);
      continue;
    }

    if (matchesLayout(typeName, "HomeWhatMakesFiabDifferentSection")) {
      mergeDifference(next, data);
      continue;
    }

    if (matchesLayout(typeName, "HomeFinanceThatGrowsSection")) {
      mergeGrowth(next, data);
      continue;
    }

    if (matchesLayout(typeName, "HomeClientPerspectiveSection")) {
      mergeDecisions(next, data);
      continue;
    }

    if (matchesLayout(typeName, "HomeLeadershipSection")) {
      mergeLeadership(next, data);
      continue;
    }

    if (matchesLayout(typeName, "AgenticOfficialPartnerStack")) {
      mergePartners(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CtaSection")) {
      mergePressure(next, data);
      continue;
    }

    // Intentionally ignored on Home:
    //  - WhyFiabTrustedBySectionLayout (home uses its own <TrustedBy> strip)
  }

  return next;
}

export function mergeHomeContent(sections: RawSection[]): HomeContent {
  return mergeHome(homeContent, sections);
}