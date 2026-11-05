import {
  peopleOperationsContent,
  type PeopleOperationsContent,
} from "@/content/people-operations";
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
    .replace(/&#8230;/gi, "...")
    .replace(/&#8217;/gi, "'")
    .replace(/&#8216;/gi, "'")
    .replace(/&#8220;/gi, '"')
    .replace(/&#8221;/gi, '"')
    .replace(/&#8211;/gi, "–")
    .replace(/&#8212;/gi, "—")
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

/** Common Banner Section → hero. */
function mergeHero(next: PeopleOperationsContent, section: Record<string, any>): void {
  next.hero.eyebrow = cleanHtml(section.subTitle, "");
  const titleData = splitHighlight(section.title, "", "");
  next.hero.title = titleData.title;
  next.hero.highlight = cleanHtml(section.highlight, titleData.highlight);
  next.hero.text = cleanHtml(section.description || section.tagLine, "");
}

/** People Operations Intro Section → intro. */
function mergeIntro(next: PeopleOperationsContent, section: Record<string, any>): void {
  next.intro.image = media(section.image)?.url ?? next.intro.image;
  const titleData = splitHighlight(section.title, "", "");
  next.intro.title = titleData.title;
  next.intro.highlight = titleData.highlight;
  next.intro.text = cleanHtml(section.description, "");
}

/** People Operations What We Do Section → whatWeDo. */
function mergeWhatWeDo(next: PeopleOperationsContent, section: Record<string, any>): void {
  next.whatWeDo.title = cleanHtml(section.title, "");

  const items = rows(section.whatWeDoItems);
  if (items.length > 0) {
    next.whatWeDo.items = items.map((item, index) => {
      const fallback = next.whatWeDo.items[index];
      const points = typeof item.points === "string" ? extractListItems(item.points) : [];

      return {
        title: cleanHtml(item.title, ""),
        text: cleanHtml(item.description, ""),
        bullets: points,
        image: media(item.image)?.url ?? "",
        bgImage: media(item.image)?.url ?? "",
        reverse: false,
      };
    });
  }
}

/** People Operations Where We Help Section → whereWeHelp. */
function mergeWhereWeHelp(next: PeopleOperationsContent, section: Record<string, any>): void {
  const titleData = splitHighlight(section.title, "", "");
  next.whereWeHelp.title = titleData.title;
  next.whereWeHelp.highlight = titleData.highlight;

  const cards = rows(section.helpItems);
  if (cards.length > 0) {
    next.whereWeHelp.cards = cards.map((card, index) => {
      const fallback = next.whereWeHelp.cards[index];
      return {
        title: cleanHtml(card.title, fallback?.title ?? ""),
        text: cleanHtml(card.description, fallback?.text ?? ""),
      };
    });
  }
}

/** CTA Section → pressure. */
function mergePressure(next: PeopleOperationsContent, section: Record<string, any>): void {
  const titleData = splitHighlight(section.title, next.pressure.title, next.pressure.emphasis);
  next.pressure.title = titleData.title;
  next.pressure.emphasis = titleData.highlight;
  next.pressure.text = cleanHtml(section.description, "");
  next.pressure.cta = link(section.ctaButton, next.pressure.cta);
}

/* -------------------------------------------------------------------------- */
/*                              Public Entry Point                             */
/* -------------------------------------------------------------------------- */

export function mergePeopleOperations(
  base: PeopleOperationsContent,
  sections: RawSection[],
): PeopleOperationsContent {
  const next: PeopleOperationsContent = structuredClone(base);

  for (const section of sections ?? []) {
    const typeName =
      typeof section.__typename === "string" ? section.__typename : "";
    const data = section as Record<string, any>;

    if (matchesLayout(typeName, "CommonBannerSection")) {
      mergeHero(next, data);
      
      continue;
    }

    if (matchesLayout(typeName, "PeopleOperationsIntroSection")) {
      mergeIntro(next, data);
      continue;
    }

    if (matchesLayout(typeName, "PeopleOperationsWhatWeDoSection")) {
      mergeWhatWeDo(next, data);
      continue;
    }

    if (matchesLayout(typeName, "PeopleOperationsWhereWeHelpSection")) {
      mergeWhereWeHelp(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CtaSection")) {
      mergePressure(next, data);
      continue;
    }
  }

  return next;
}

export function mergePeopleOperationsContent(sections: RawSection[]): PeopleOperationsContent {
  
  return mergePeopleOperations(peopleOperationsContent, sections);
}