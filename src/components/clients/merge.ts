import {
  clientsContent,
  type ClientsContent,
  type ClientCaseStudy,
  type ClientStat,
  type ClientLogosItem,
  type ClientReview,
} from "@/content/clients";
import type { RawSection } from "@/lib/wordpress/content";
import type { CaseStudyCardFragment } from "@/lib/wordpress/generated/graphql";
import { caseStudyCardFromNode } from "@/lib/wordpress/cards";

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

/** Clients Banner → hero. */
function mergeHero(next: ClientsContent, section: Record<string, any>): void {
  next.hero.eyebrow = cleanHtml(section.subTitle, next.hero.eyebrow);
  const titleData = splitHighlight(section.title, next.hero.title, next.hero.highlight);
  next.hero.title = titleData.title;
  next.hero.highlight = cleanHtml(section.highlight, titleData.highlight);
  next.hero.text = cleanHtml(section.description, next.hero.text);

  // clientProof → clientProofTitle + clientProofItems
  if (section.clientProof) {
    const proof = cleanHtml(section.clientProof, "");
    if (proof) {
      next.hero.clientProofTitle = "CLIENT PROOF";
      // Split by lines / bullet markers
      next.hero.clientProofItems = proof
        .split(/\n+/)
        .map((s) => s.replace(/^[-•*]\s*/, "").trim())
        .filter(Boolean);
    }
  }

  // Stats repeater
  const stats = rows(section.stats);
  if (stats.length > 0) {
    next.hero.stats = stats.map((stat, index) => {
      const fallback = next.hero.stats[index] ?? { value: "", label: "" };
      return {
        value: cleanHtml(stat.number, fallback.value),
        label: cleanHtml(stat.label, fallback.label),
      } satisfies ClientStat;
    });
  }
}

/** Clients Featured Case Studies → caseStudies. */
function mergeCaseStudies(next: ClientsContent, section: Record<string, any>): void {
  next.caseStudies.title = cleanHtml(section.title, next.caseStudies.title);

  // 🚀 FIX: `caseStudies` field returns a connection ({ nodes: [...] }).
  // Older code was reading `section.caseStudies` directly as an array.
  const caseStudies = rows(section.caseStudies?.nodes ?? section.caseStudies);
  
  if (caseStudies.length > 0) {
    next.caseStudies.items = caseStudies.map((node, index) =>
      // Challenge / Solution / Outcome are parsed from the bold labels in `featuredContent`.
      caseStudyCardFromNode(node as CaseStudyCardFragment, next.caseStudies.items[index]),
    );
  }
}

/** Clients Trusted Companies → logosSection. */
function mergeLogos(next: ClientsContent, section: Record<string, any>): void {
  if (section.title) {
    const raw = str(section.title) ?? "";
    const match = raw.match(/(.*?)<(?:span|b|strong)[^>]*>([\s\S]*?)<\/(?:span|b|strong)>(.*)/i);
    if (match) {
      next.logosSection.title1 = cleanHtml(match[1], next.logosSection.title1);
      next.logosSection.highlight1 = cleanHtml(match[2], next.logosSection.highlight1);
      next.logosSection.title2 = cleanHtml(match[3], next.logosSection.title2);
    } else {
      next.logosSection.title1 = cleanHtml(section.title, next.logosSection.title1);
    }
  }

  const logos = rows(section.logos);
  if (logos.length > 0) {
    next.logosSection.logos = logos.map((item) => {
      const image = media(item.logo);
      return {
        name: image?.alt ?? "Client",
        image: image?.url ?? "",
      } satisfies ClientLogosItem;
    });
  }
}

/** Clients Testimonials → reviewsSection. */
function mergeReviews(next: ClientsContent, section: Record<string, any>): void {
  next.reviewsSection.title = cleanHtml(section.title, next.reviewsSection.title);

  // Featured review (mainReview)
  const featuredQuote = cleanHtml(section.featuredQuote, "");
  if (featuredQuote) {
    next.reviewsSection.mainReview = {
      quote: featuredQuote,
      author: cleanHtml(section.featuredName, next.reviewsSection.mainReview.author),
      role: cleanHtml(section.featuredDesignation, next.reviewsSection.mainReview.role),
      image: media(section.featuredImage)?.url ?? next.reviewsSection.mainReview.image,
    };
  }

  // Side reviews (testimonials)
  const testimonials = rows(section.testimonials);
  if (testimonials.length > 0) {
    next.reviewsSection.reviews = testimonials.map((t, index) => {
      const fallback = next.reviewsSection.reviews[index];
      return {
        id: String(index + 1),
        text: cleanHtml(t.content, fallback?.text ?? ""),
        author: cleanHtml(t.authorInfo, fallback?.author ?? ""),
        role: "",
        avatar: media(t.authorImage)?.url ?? fallback?.avatar ?? "",
      } satisfies ClientReview;
    });
  }
}

/** CTA Section → pressure. */
function mergePressure(next: ClientsContent, section: Record<string, any>): void {
  const titleData = splitHighlight(section.title, next.pressure.title, next.pressure.emphasis);
  next.pressure.title = titleData.title;
  next.pressure.emphasis = titleData.highlight;
  next.pressure.text = cleanHtml(section.description, next.pressure.text);
  next.pressure.cta = link(section.ctaButton, next.pressure.cta);
}

/* -------------------------------------------------------------------------- */
/*                              Public Entry Point                             */
/* -------------------------------------------------------------------------- */

export function mergeClients(
  base: ClientsContent,
  sections: RawSection[],
): ClientsContent {
  const next: ClientsContent = structuredClone(base);

  for (const section of sections ?? []) {
    const typeName =
      typeof section.__typename === "string" ? section.__typename : "";
    const data = section as Record<string, any>;

    if (matchesLayout(typeName, "ClientsBannerSection")) {
      mergeHero(next, data);
      continue;
    }

    if (matchesLayout(typeName, "ClientsFeaturedCaseStudiesSection")) {
      mergeCaseStudies(next, data);
      continue;
    }

    if (matchesLayout(typeName, "ClientsTrustedCompaniesSection")) {
      mergeLogos(next, data);
      continue;
    }

    if (matchesLayout(typeName, "ClientsTestimonialsSection")) {
      mergeReviews(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CtaSection")) {
      mergePressure(next, data);
      continue;
    }
  }

  return next;
}

export function mergeClientsContent(sections: RawSection[]): ClientsContent {
  return mergeClients(clientsContent, sections);
}