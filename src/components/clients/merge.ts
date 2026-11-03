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

/* -------------------------------------------------------------------------- */
/*                              Section Mergers                                */
/* -------------------------------------------------------------------------- */

/** Clients Banner → hero. */
function mergeHero(next: ClientsContent, section: Record<string, any>): void {
  next.hero.eyebrow = cleanHtml(section.subTitle, next.hero.eyebrow);
  next.hero.title = cleanHtml(section.title, next.hero.title);
  next.hero.highlight = cleanHtml(section.highlight, next.hero.highlight);
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
  // ACF field is `title` — split into two lines for the UI's dual-title layout.
  if (section.title) {
    const fullTitle = cleanHtml(section.title, "");
    if (fullTitle) {
      // Keep existing title1/highlight1/title2 if they can't be parsed.
      // Title is typically "Trusted by 40+ Growing Companies in the USA and Globally"
      next.logosSection.title1 = fullTitle;
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
  const rawTitle = str(section.title) ?? "";
  const boldMatch = rawTitle.match(/<b>(.*?)<\/b>/i) || rawTitle.match(/<strong>(.*?)<\/strong>/i);
  const cleanTitle = cleanHtml(section.title, next.pressure.title);

  if (boldMatch && boldMatch[1]) {
    const highlight = cleanHtml(boldMatch[1], "").trim();
    if (highlight) {
      const remainder = cleanTitle.replace(highlight, "").replace(/\s+/g, " ").trim();
      next.pressure.title = remainder || cleanTitle;
      next.pressure.emphasis = highlight;
    } else {
      next.pressure.title = cleanTitle;
    }
  } else {
    next.pressure.title = cleanTitle;
  }

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