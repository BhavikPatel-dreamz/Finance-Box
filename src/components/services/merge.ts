import {
  servicesContent,
  type ServicesContent,
  type ServicesDetail,
  type ServicesPhotoCard,
  type ServicesStage,
  type ServicesStep,
} from "@/content/services";
import type { RawSection } from "@/lib/wordpress/content";

function row(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function str(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function keep(value: unknown, fallback: string) {
  return str(value) ?? fallback;
}

function link(label: unknown, url: unknown, fallback: { label: string; url: string }) {
  return { label: keep(label, fallback.label), url: keep(url, fallback.url) };
}

const icons = new Set<ServicesStage["icon"]>(["gear", "people", "person", "target"]);

function iconOf(value: unknown, fallback: ServicesStage["icon"]) {
  return typeof value === "string" && icons.has(value as ServicesStage["icon"])
    ? (value as ServicesStage["icon"])
    : fallback;
}

function tiers(value: unknown, fallback: ServicesContent["hero"]["tiers"]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const tier = row(item);
    const title = tier ? str(tier.title) : null;
    if (!tier || !title) return [];
    const base = fallback[index] ?? fallback[0];
    return [
      {
        number: keep(tier.number, base?.number ?? String(index + 1).padStart(2, "0")),
        label: keep(tier.label, base?.label ?? ""),
        title,
        highlight: keep(tier.highlight, base?.highlight ?? ""),
        text: keep(tier.text, base?.text ?? ""),
      },
    ];
  });
  return next.length > 0 ? next : fallback;
}

function stages(value: unknown, fallback: ServicesContent["stages"]["cards"]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const card = row(item);
    const title = card ? str(card.title) : null;
    if (!card || !title) return [];
    const base = fallback[index] ?? fallback[0];
    return [
      {
        title,
        label: keep(card.label, base?.label ?? ""),
        text: keep(card.text, base?.text ?? ""),
        icon: iconOf(card.icon, base?.icon ?? "gear"),
      },
    ];
  });
  return next.length > 0 ? next : fallback;
}

function items(value: unknown, fallback: ServicesDetail["items"]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const entry = row(item);
    const title = entry ? str(entry.title) : null;
    if (!entry || !title) return [];
    const base = fallback[index] ?? fallback[0];
    return [{ title, text: keep(entry.text, base?.text ?? "") }];
  });
  return next.length > 0 ? next : fallback;
}

function media(value: unknown) {
  const item = row(value);
  if (!item) return null;
  const nested = row(item.node) ?? item;
  const url = str(nested.sourceUrl) ?? str(nested.url);
  if (!url) return null;
  return { url, alt: str(nested.altText) ?? str(nested.alt) ?? "" };
}

function photoCards(value: unknown, fallback: ServicesPhotoCard[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const card = row(item);
    const title = card ? str(card.title) : null;
    if (!card || !title) return [];
    const base = fallback[index] ?? fallback[0];
    return [{ title, text: keep(card.text, base?.text ?? ""), image: media(card.image) ?? base?.image ?? null }];
  });
  return next.length > 0 ? next : fallback;
}

function steps(value: unknown, fallback: ServicesStep[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const step = row(item);
    const title = step ? str(step.title) : null;
    if (!step || !title) return [];
    const base = fallback[index] ?? fallback[0];
    return [
      {
        number: keep(step.number, base?.number ?? String(index + 1).padStart(2, "0")),
        title,
        text: keep(step.text, base?.text ?? ""),
      },
    ];
  });
  return next.length > 0 ? next : fallback;
}

function detail(section: RawSection, fallback: ServicesDetail | undefined, index: number): ServicesDetail | null {
  const title = str(section.title);
  if (!title) return null;
  const base = fallback ?? {
    anchor: `tier-${index + 1}`,
    number: String(index + 1).padStart(2, "0"),
    title,
    text: "",
    cta: { label: "Explore", url: "#tiers" },
    items: [],
  };
  return {
    anchor: keep(section.anchor, base.anchor),
    number: keep(section.number, base.number),
    title,
    text: keep(section.text, base.text),
    cta: link(section.ctaLabel, section.ctaUrl, base.cta),
    items: items(section.items, base.items),
  };
}

export function mergeServices(base: ServicesContent, sections: RawSection[]) {
  const next: ServicesContent = structuredClone(base);
  const details: ServicesDetail[] = [];

  for (const section of sections) {
    const typeName = typeof section.__typename === "string" ? section.__typename : "";
    if (/ServicesHero$/.test(typeName)) {
      next.hero = {
        eyebrow: keep(section.eyebrow, next.hero.eyebrow),
        title: keep(section.title, next.hero.title),
        highlight: keep(section.highlight, next.hero.highlight),
        text: keep(section.text, next.hero.text),
        primary: link(section.primaryLabel, section.primaryUrl, next.hero.primary),
        secondary: link(section.secondaryLabel, section.secondaryUrl, next.hero.secondary),
        tiers: tiers(section.tiers, next.hero.tiers),
      };
    } else if (/ServicesStages$/.test(typeName)) {
      next.stages = {
        eyebrow: keep(section.eyebrow, next.stages.eyebrow),
        title: keep(section.title, next.stages.title),
        text: keep(section.text, next.stages.text),
        cards: stages(section.cards, next.stages.cards),
      };
    } else if (/ServicesDepth$/.test(typeName)) {
      next.depth = {
        eyebrow: keep(section.eyebrow, next.depth.eyebrow),
        title: keep(section.title, next.depth.title),
        cta: link(section.ctaLabel, section.ctaUrl, next.depth.cta),
      };
    } else if (/ServicesCfo$/.test(typeName)) {
      next.cfo = {
        title: keep(section.title, next.cfo.title),
        text: keep(section.text, next.cfo.text),
        cta: link(section.ctaLabel, section.ctaUrl, next.cfo.cta),
        cards: photoCards(section.cards, next.cfo.cards),
      };
    } else if (/ServicesProcess$/.test(typeName)) {
      next.process = {
        title: keep(section.title, next.process.title),
        text: keep(section.text, next.process.text),
        steps: steps(section.steps, next.process.steps),
      };
    } else if (/ServicesInvestors$/.test(typeName)) {
      next.investors = {
        eyebrow: keep(section.eyebrow, next.investors.eyebrow),
        title: keep(section.title, next.investors.title),
        highlight: keep(section.highlight, next.investors.highlight),
        text: keep(section.text, next.investors.text),
        primary: link(section.primaryLabel, section.primaryUrl, next.investors.primary),
        secondary: link(section.secondaryLabel, section.secondaryUrl, next.investors.secondary),
        cards: photoCards(section.cards, next.investors.cards),
      };
    } else if (/ServicesDetail$/.test(typeName)) {
      const parsed = detail(section, base.details[details.length], details.length);
      if (parsed) details.push(parsed);
    }
  }

  if (details.length > 0) next.details = details;
  return next;
}
