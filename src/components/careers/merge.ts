import {
  careersContent,
  type CareersContent,
  type CareersBenefit,
  type CareersFaq,
  type CareersHiringStep,
} from "@/content/careers";
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

/** Common Banner Section → hero. */
function mergeHero(next: CareersContent, section: Record<string, any>): void {
  next.hero.eyebrow = cleanHtml(section.subTitle, next.hero.eyebrow);
  next.hero.title = cleanHtml(section.title, next.hero.title);
  
  const rawTitle = str(section.title) ?? "";
  const boldMatch = rawTitle.match(/<b>(.*?)<\/b>/i) || rawTitle.match(/<strong>(.*?)<\/strong>/i);
  if (boldMatch && boldMatch[1]) {
    next.hero.highlight = cleanHtml(boldMatch[1], "").trim();
  } else {
    next.hero.highlight = cleanHtml(section.highlight, next.hero.highlight);
  }

  next.hero.highlight2 = cleanHtml(section.highlight2, next.hero.highlight2);
  next.hero.text = cleanHtml(section.description, next.hero.text);
  next.hero.cta = link(section.ctaButton, next.hero.cta);
}

/** Careers Why Work Section → whyWork. */
function mergeWhyWork(next: CareersContent, section: Record<string, any>): void {
  const rawTitle = str(section.title) ?? "";
  const boldMatch = rawTitle.match(/<b>(.*?)<\/b>/i) || rawTitle.match(/<strong>(.*?)<\/strong>/i);
  const cleanTitle = cleanHtml(section.title, next.whyWork.title);

  if (boldMatch && boldMatch[1]) {
    const highlight = cleanHtml(boldMatch[1], "").trim();
    const remainder = cleanTitle.replace(highlight, "").replace(/\s+/g, " ").trim();
    next.whyWork.title = remainder || cleanTitle;
    next.whyWork.highlight = highlight;
  } else {
    next.whyWork.title = cleanTitle;
  }

  next.whyWork.image = media(section.image)?.url ?? next.whyWork.image;

  const points = rows(section.points);
  if (points.length > 0) {
    next.whyWork.points = points
      .map((p) => cleanHtml(p.content, ""))
      .filter(Boolean);
  }
}

/** Careers Stand Out Section → standOut. */
function mergeStandOut(next: CareersContent, section: Record<string, any>): void {
  next.standOut.title = cleanHtml(section.title, next.standOut.title);

  const cards = rows(section.cards);
  if (cards.length > 0) {
    next.standOut.cards = cards.map((card, index) => {
      const fallback = next.standOut.cards[index];
      return {
        image: media(card.backgroundImage)?.url ?? fallback?.image ?? "",
        title: cleanHtml(card.title, fallback?.title ?? ""),
        text: cleanHtml(card.content, fallback?.text ?? ""),
      };
    });
  }
}

/** Careers Benefits Section → benefits. */
function mergeBenefits(next: CareersContent, section: Record<string, any>): void {
  next.benefits.title = cleanHtml(section.title, next.benefits.title);

  const benefits = rows(section.benefits);
  if (benefits.length > 0) {
    next.benefits.items = benefits.map((item, index) => {
      const fallback = next.benefits.items[index];
      return {
        icon: media(item.icon)?.url ?? fallback?.icon ?? "",
        title: cleanHtml(item.title, fallback?.title ?? ""),
        text: cleanHtml(item.description, fallback?.text ?? ""),
      } satisfies CareersBenefit;
    });
  }
}

/** 👇 NAYA: Services Operating Cadence Section → howWeHire. */
function mergeHowWeHire(next: CareersContent, section: Record<string, any>): void {
  next.howWeHire.title = cleanHtml(section.title, next.howWeHire.title);
  next.howWeHire.text = cleanHtml(section.description, next.howWeHire.text);

  const steps = rows(section.steps);
  if (steps.length > 0) {
    next.howWeHire.steps = steps.map((step, index) => {
      const fallback = next.howWeHire.steps[index];
      return {
        number: str(step.number) ?? fallback?.number ?? String(index + 1).padStart(2, "0"),
        title: cleanHtml(step.title, fallback?.title ?? ""),
        text: cleanHtml(step.description, fallback?.text ?? ""),
      } satisfies CareersHiringStep;
    });
  }
}

/** FAQ Section → faq. */
function mergeFaq(next: CareersContent, section: Record<string, any>): void {
  next.faq.title = cleanHtml(section.title, next.faq.title);

  const faqs = rows(section.faqs);
  if (faqs.length > 0) {
    next.faq.items = faqs.map((faq, index) => {
      const fallback = next.faq.items[index];
      return {
        question: cleanHtml(faq.question, fallback?.question ?? ""),
        answer: cleanHtml(faq.answer, fallback?.answer ?? ""),
      } satisfies CareersFaq;
    });
  }
}

/** CTA Section → pressure. */
function mergePressure(next: CareersContent, section: Record<string, any>): void {
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

export function mergeCareers(
  base: CareersContent,
  sections: RawSection[],
): CareersContent {
  const next: CareersContent = structuredClone(base);

  for (const section of sections ?? []) {
    const typeName =
      typeof section.__typename === "string" ? section.__typename : "";
    const data = section as Record<string, any>;

    if (matchesLayout(typeName, "CommonBannerSection")) {
      mergeHero(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CareersWhyWorkSection")) {
      mergeWhyWork(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CareersStandOutSection")) {
      mergeStandOut(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CareersBenefitsSection")) {
      mergeBenefits(next, data);
      continue;
    }

    // 👇 NAYA: Services Operating Cadence
    if (matchesLayout(typeName, "ServicesOperatingCadenceSection")) {
      mergeHowWeHire(next, data);
      continue;
    }

    if (matchesLayout(typeName, "FaqSection")) {
      mergeFaq(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CtaSection")) {
      mergePressure(next, data);
      continue;
    }
  }

  return next;
}

export function mergeCareersContent(sections: RawSection[]): CareersContent {
  return mergeCareers(careersContent, sections);
}