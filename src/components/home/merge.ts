import type { HomeContent, HomeLink, HomeMedia } from "@/content/home";
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

function media(value: unknown): HomeMedia | null {
  const item = row(value);
  if (!item) return null;
  const nested = row(item.node);
  const source = nested ?? item;
  const url = str(source.sourceUrl) ?? str(source.url);
  if (!url) return null;
  return { url, alt: str(source.altText) ?? str(source.alt) ?? "" };
}

function link(label: unknown, url: unknown, fallback: HomeLink): HomeLink {
  return { label: keep(label, fallback.label), url: keep(url, fallback.url) };
}

export function mergeHome(base: HomeContent, sections: RawSection[]) {
  const next: HomeContent = structuredClone(base);

  for (const section of sections) {
    const typeName = typeof section.__typename === "string" ? section.__typename : "";

    if (/HomeHeader$/.test(typeName)) {
      next.header = {
        logo: media(section.logo) ?? next.header.logo,
        links: Array.isArray(section.links) && section.links.length > 0
          ? section.links.map((item: any, index: number) => {
              const linkRow = row(item);
              const label = linkRow ? str(linkRow.label) : null;
              const url = linkRow ? str(linkRow.url) : null;
              const base = next.header.links[index] ?? next.header.links[0];
              return {
                label: label ?? base.label,
                url: url ?? base.url,
                children: Array.isArray(linkRow?.children)
                  ? linkRow.children.map((child: any) => {
                      const childRow = row(child);
                      return {
                        label: childRow ? str(childRow.label) ?? "" : "",
                        url: childRow ? str(childRow.url) ?? "" : "",
                      };
                    })
                  : base.children,
              };
            })
          : next.header.links,
        cta: link(section.ctaLabel, section.ctaUrl, next.header.cta),
      };
    } else if (/HomeHero$/.test(typeName)) {
      next.hero = {
        eyebrow: keep(section.eyebrow, next.hero.eyebrow),
        title: keep(section.title, next.hero.title),
        highlight: keep(section.highlight, next.hero.highlight),
        text: keep(section.text, next.hero.text),
        primary: link(section.primaryLabel, section.primaryUrl, next.hero.primary),
        closeLabel: keep(section.closeLabel, next.hero.closeLabel),
        closeValue: keep(section.closeValue, next.hero.closeValue),
        closeUnit: keep(section.closeUnit, next.hero.closeUnit),
        closeTrend: keep(section.closeTrend, next.hero.closeTrend),
        runwayLabel: keep(section.runwayLabel, next.hero.runwayLabel),
        runwayValue: keep(section.runwayValue, next.hero.runwayValue),
        runwayUnit: keep(section.runwayUnit, next.hero.runwayUnit),
        runwayTrend: keep(section.runwayTrend, next.hero.runwayTrend),
        chartTitle: keep(section.chartTitle, next.hero.chartTitle),
        chartRange: keep(section.chartRange, next.hero.chartRange),
        call: link(section.callLabel, section.callUrl, next.hero.call),
      };
    }
  }

  return next;
}