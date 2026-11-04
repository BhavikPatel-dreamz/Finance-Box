import {
  agenticAiContent,
  type AgenticAiContent,
  type AgenticAiAgent,
  type AgenticAiArchitectureCard,
  type AgenticAiFaq,
  type AgenticAiFeature,
  type AgenticAiPartner,
} from "@/content/agentic-ai";
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
function mergeHero(next: AgenticAiContent, section: Record<string, any>): void {
  next.hero.eyebrow = cleanHtml(section.subTitle, next.hero.eyebrow);
  const titleData = splitHighlight(section.title, next.hero.title, next.hero.highlight);
  next.hero.title = titleData.title;
  next.hero.highlight = cleanHtml(section.highlight, titleData.highlight);
  next.hero.text = cleanHtml(section.description, next.hero.text);
  next.hero.cta = link(section.ctaButton, next.hero.cta);
  
  // TagLine → bullets (textarea ki lines ko bullet items me convert karta hai)
  if (section.tagLine) {
    const tagLine = cleanHtml(section.tagLine, "");
    if (tagLine) {
      next.hero.bullets = tagLine
        .split(/\n+/)
        .map((s) => s.replace(/^[-•*]\s*/, "").trim())
        .filter(Boolean);
    }
  }
}

/** About Agentic Section → whatIs. */
function mergeWhatIs(next: AgenticAiContent, section: Record<string, any>): void {
  next.whatIs.eyebrow = cleanHtml(section.subTitle, next.whatIs.eyebrow);
  const titleData = splitHighlight(section.title, next.whatIs.title, next.whatIs.highlight);
  next.whatIs.title = titleData.title;
  next.whatIs.highlight = titleData.highlight;
  next.whatIs.text1 = cleanHtml(section.tagLine, next.whatIs.text1);
  next.whatIs.text2 = cleanHtml(section.description, next.whatIs.text2);

  const features = rows(section.aboutAgentics);
  if (features.length > 0) {
    next.whatIs.features = features.map((f, index) => {
      const fallback = next.whatIs.features[index];
      return {
        image: media(f.image)?.url ?? fallback?.image ?? "",
        title: cleanHtml(f.title, fallback?.title ?? ""),
        text: cleanHtml(f.content, fallback?.text ?? ""),
      } satisfies AgenticAiFeature;
    });
  }
}

/** Your Own Agentic Section → buildYourOwn. */
function mergeBuildYourOwn(next: AgenticAiContent, section: Record<string, any>): void {
  const titleData = splitHighlight(section.title, next.buildYourOwn.title, next.buildYourOwn.highlight);
  next.buildYourOwn.title = titleData.title;
  next.buildYourOwn.highlight = titleData.highlight;
  next.buildYourOwn.text = cleanHtml(section.description, next.buildYourOwn.text);

  const agents = rows(section.buildYourOwnAgentic);
  if (agents.length > 0) {
    const seenTexts = new Set<string>();
    next.buildYourOwn.agents = agents.map((agent, index) => {
      const fallback = next.buildYourOwn.agents[index];
      let text = cleanHtml(agent.content, fallback?.text ?? "");
      if (seenTexts.has(text) && fallback?.text && fallback.text !== text) {
        text = fallback.text;
      }
      seenTexts.add(text);
      return {
        icon: media(agent.icon)?.url ?? fallback?.icon ?? "",
        title: cleanHtml(agent.title, fallback?.title ?? ""),
        text,
        greatFor: cleanHtml(agent.greatFor, fallback?.greatFor ?? ""),
      } satisfies AgenticAiAgent;
    });
  }
}

/** Agentic People Ops Section → peopleOps. */
function mergePeopleOps(next: AgenticAiContent, section: Record<string, any>): void {
  next.peopleOps.title = cleanHtml(section.title, next.peopleOps.title);

  const agents = rows(section.agents);
  if (agents.length > 0) {
    const seenTexts = new Set<string>();
    next.peopleOps.agents = agents.map((agent, index) => {
      const fallback = next.peopleOps.agents[index];
      let text = cleanHtml(agent.content, fallback?.text ?? "");
      if (seenTexts.has(text) && fallback?.text && fallback.text !== text) {
        text = fallback.text;
      }
      seenTexts.add(text);
      return {
        icon: media(agent.icon)?.url ?? fallback?.icon ?? "",
        title: cleanHtml(agent.title, fallback?.title ?? ""),
        text,
        greatFor: cleanHtml(agent.greatFor, fallback?.greatFor ?? ""),
      } satisfies AgenticAiAgent;
    });
  }
}

/** Agentic Ops & Compliance Section → opsCompliance. */
function mergeOpsCompliance(next: AgenticAiContent, section: Record<string, any>): void {
  next.opsCompliance.title = cleanHtml(section.title, next.opsCompliance.title);

  const cards = rows(section.agents);
  if (cards.length > 0) {
    next.opsCompliance.cards = cards.map((card, index) => {
      const fallback = next.opsCompliance.cards[index];
      return {
        // ACF me field ka naam `icon` hai, `backgroundImage` nahi.
        image: media(card.icon)?.url ?? fallback?.image ?? "",
        title: cleanHtml(card.title, fallback?.title ?? ""),
        text: cleanHtml(card.content, fallback?.text ?? ""),
      };
    });
  }
}

/** Agentic Official Partner Stack → partners. */
function mergePartners(next: AgenticAiContent, section: Record<string, any>): void {
  next.partners.title = cleanHtml(section.title, next.partners.title);

  const partners = rows(section.officialPartners);
  if (partners.length > 0) {
    next.partners.logos = partners.map((partner) => {
      const image = media(partner.logo);
      return {
        name: image?.alt ?? "Partner",
        logo: image?.url ?? "",
      } satisfies AgenticAiPartner;
    });
  }
}

/** Agentic Proven Architecture Section → provenArchitecture. */
function mergeProvenArchitecture(next: AgenticAiContent, section: Record<string, any>): void {
  next.provenArchitecture.title = cleanHtml(section.title, next.provenArchitecture.title);
  next.provenArchitecture.highlight = cleanHtml(section.highlightTitle, next.provenArchitecture.highlight);

  const cards = rows(section.architectureCards);
  if (cards.length > 0) {
    next.provenArchitecture.cards = cards.map((card, index) => {
      const fallback = next.provenArchitecture.cards[index];
      return {
        image: media(card.image)?.url ?? fallback?.image ?? "",
        title: cleanHtml(card.title, fallback?.title ?? ""),
        text: cleanHtml(card.content, fallback?.text ?? ""),
        // Bullets ACF me hain hi nahi, isliye fallback static bullets hi rahenge.
        bullets: fallback?.bullets ?? [],
      } satisfies AgenticAiArchitectureCard;
    });
  }
}

/** Join Waitlist Section → waitlist. */
function mergeWaitlist(next: AgenticAiContent, section: Record<string, any>): void {
  const titleData = splitHighlight(section.title, next.waitlist.title, next.waitlist.highlight);
  next.waitlist.title = titleData.title;
  next.waitlist.highlight = titleData.highlight;
  next.waitlist.text = cleanHtml(section.description, next.waitlist.text);
}

/** FAQ Section → faq. */
function mergeFaq(next: AgenticAiContent, section: Record<string, any>): void {
  next.faq.title = cleanHtml(section.title, next.faq.title);

  const faqs = rows(section.faqs);
  if (faqs.length > 0) {
    next.faq.items = faqs.map((faq, index) => {
      const fallback = next.faq.items[index];
      return {
        question: cleanHtml(faq.question, fallback?.question ?? ""),
        answer: cleanHtml(faq.answer, fallback?.answer ?? ""),
      } satisfies AgenticAiFaq;
    });
  }
}

/** CTA Section → pressure. */
function mergePressure(next: AgenticAiContent, section: Record<string, any>): void {
  const titleData = splitHighlight(section.title, next.pressure.title, next.pressure.emphasis);
  next.pressure.title = titleData.title;
  next.pressure.emphasis = titleData.highlight;
  next.pressure.text = cleanHtml(section.description, next.pressure.text);
  next.pressure.cta = link(section.ctaButton, next.pressure.cta);
}

/* -------------------------------------------------------------------------- */
/*                              Public Entry Point                             */
/* -------------------------------------------------------------------------- */

export function mergeAgenticAi(
  base: AgenticAiContent,
  sections: RawSection[],
): AgenticAiContent {
  const next: AgenticAiContent = structuredClone(base);

  for (const section of sections ?? []) {
    const typeName =
      typeof section.__typename === "string" ? section.__typename : "";
    const data = section as Record<string, any>;

    if (matchesLayout(typeName, "CommonBannerSection")) {
      mergeHero(next, data);
      continue;
    }

    if (matchesLayout(typeName, "AboutAgenticSection")) {
      mergeWhatIs(next, data);
      continue;
    }

    if (matchesLayout(typeName, "YourOwnAgenticSection")) {
      mergeBuildYourOwn(next, data);
      continue;
    }

    if (matchesLayout(typeName, "AgenticPeopleOpsPayrollItSection")) {
      mergePeopleOps(next, data);
      continue;
    }

    if (matchesLayout(typeName, "AgenticOpsComplianceSection")) {
      mergeOpsCompliance(next, data);
      continue;
    }

    if (matchesLayout(typeName, "AgenticOfficialPartnerStack")) {
      mergePartners(next, data);
      continue;
    }

    if (matchesLayout(typeName, "AgenticProvenArchitectureSection")) {
      mergeProvenArchitecture(next, data);
      continue;
    }

    if (matchesLayout(typeName, "JoinWaitlistSection")) {
      mergeWaitlist(next, data);
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

export function mergeAgenticAiContent(sections: RawSection[]): AgenticAiContent {
  return mergeAgenticAi(agenticAiContent, sections);
}