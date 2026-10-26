import { whyContent, type WhyColumn, type WhyContent, type WhyPoint, type WhyRow } from "@/content/why-fiab";
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

function media(value: unknown) {
  const item = row(value);
  if (!item) return null;
  const nested = row(item.node) ?? item;
  const url = str(nested.sourceUrl) ?? str(nested.url);
  if (!url) return null;
  return { url, alt: str(nested.altText) ?? str(nested.alt) ?? "" };
}

function points(value: unknown, fallback: WhyPoint[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const point = row(item);
    const title = point ? str(point.title) : null;
    if (!point || !title) return [];
    const base = fallback[index];
    return [{ number: keep(point.number, base?.number ?? String(index + 1).padStart(2, "0")), title }];
  });
  return next.length > 0 ? next : fallback;
}

function columns(value: unknown, fallback: WhyColumn[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const column = row(item);
    const label = column ? str(column.label) : null;
    if (!column || !label) return [];
    const base = fallback[index];
    const featured = column.featured === true || column.featured === "featured" || column.featured === "1";
    return [{ label, featured: column.featured == null ? (base?.featured ?? false) : featured, logo: media(column.logo) ?? base?.logo ?? null }];
  });
  return next.length > 0 ? next : fallback;
}

function marks(value: unknown, fallback: boolean[]) {
  const text = str(value);
  if (!text) return fallback;
  const next = text.split(/\n+/).map((item) => /^(yes|true|1|check)$/i.test(item.trim()));
  return next.length > 0 ? next : fallback;
}

function rows(value: unknown, fallback: WhyRow[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const entry = row(item);
    const label = entry ? str(entry.label) : null;
    if (!entry || !label) return [];
    const base = fallback[index];
    return [{ label, values: marks(entry.values, base?.values ?? []) }];
  });
  return next.length > 0 ? next : fallback;
}

export function mergeWhy(base: WhyContent, sections: RawSection[]) {
  const next: WhyContent = structuredClone(base);
  for (const section of sections) {
    const typeName = typeof section.__typename === "string" ? section.__typename : "";
    if (/WhyHero$/.test(typeName)) {
      next.hero = {
        eyebrow: keep(section.eyebrow, next.hero.eyebrow),
        title: keep(section.title, next.hero.title),
        highlight: keep(section.highlight, next.hero.highlight),
        text: keep(section.text, next.hero.text),
        cta: link(section.ctaLabel, section.ctaUrl, next.hero.cta),
        points: points(section.points, next.hero.points),
      };
    } else if (/WhyCompare$/.test(typeName)) {
      next.compare = {
        title: keep(section.title, next.compare.title),
        highlight: keep(section.highlight, next.compare.highlight),
        text: keep(section.text, next.compare.text),
        featureLabel: keep(section.featureLabel, next.compare.featureLabel),
        columns: columns(section.columns, next.compare.columns),
        rows: rows(section.rows, next.compare.rows),
      };
    }
  }
  
  // Ensure karta hai ki naye fields undefined na rahein
  next.howWeWork = next.howWeWork ?? base.howWeWork;
  next.ctaSection = next.ctaSection ?? base.ctaSection;
  next.aboutSection = next.aboutSection ?? base.aboutSection;
  next.team = next.team ?? base.team;

  return next;
}