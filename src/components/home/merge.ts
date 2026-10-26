import type { HomeCard, HomeContent, HomeLink, HomeLogo, HomeMedia, HomePerson } from "@/content/home";
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

function cards(value: unknown, fallback: HomeCard[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item) => {
    const card = row(item);
    const title = card ? str(card.title) : null;
    if (!card || !title) return [];
    return [{ icon: media(card.icon), title, text: str(card.text) ?? "" }];
  });
  return next.length > 0 ? next : fallback;
}

function differenceCards(value: unknown, fallback: HomeContent["difference"]["cards"]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const card = row(item);
    const title = card ? str(card.title) : null;
    if (!card || !title) return [];
    const tone = str(card.tone);
    const fallbackTone = fallback[index]?.tone ?? (index === 0 ? "light" : "dark");
    return [
      {
        icon: media(card.icon),
        title,
        text: str(card.text) ?? "",
        tone: tone === "light" || tone === "dark" ? tone : fallbackTone,
      },
    ];
  });
  return next.length > 0 ? next : fallback;
}

function stageLabels(value: unknown, fallback: string[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item) => {
    if (typeof item === "string") {
      const label = str(item);
      return label ? [label] : [];
    }
    const stage = row(item);
    const label = stage ? str(stage.label) : null;
    return label ? [label] : [];
  });
  return next.length > 0 ? next : fallback;
}

function growthCards(value: unknown, fallback: HomeContent["growth"]["cards"]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const card = row(item);
    const title = card ? str(card.title) : null;
    if (!card || !title) return [];
    const points = str(card.points);
    const fromLines = points
      ? points
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : [];
    const fromList = Array.isArray(card.items)
      ? card.items.flatMap((entry) => {
          if (typeof entry === "string") {
            const label = str(entry);
            return label ? [label] : [];
          }
          const point = row(entry);
          const label = point ? (str(point.label) ?? str(point.text)) : null;
          return label ? [label] : [];
        })
      : [];
    return [
      {
        icon: media(card.icon),
        title,
        text: str(card.text) ?? "",
        items: fromLines.length > 0 ? fromLines : fromList.length > 0 ? fromList : (fallback[index]?.items ?? []),
      },
    ];
  });
  return next.length > 0 ? next : fallback;
}

function partnerLogos(value: unknown, fallback: HomeContent["partners"]["logos"]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const logo = row(item);
    const name = logo ? str(logo.name) : null;
    if (!logo || !name) return [];
    return [
      {
        image: media(logo.image),
        name,
        caption: str(logo.caption) ?? fallback[index]?.caption ?? "",
      },
    ];
  });
  return next.length > 0 ? next : fallback;
}

function logos(value: unknown, fallback: HomeLogo[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item) => {
    const logo = row(item);
    const image = logo ? media(logo.image) : null;
    if (!logo || !image) return [];
    return [{ image, name: str(logo.name) ?? image.alt }];
  });
  return next.length > 0 ? next : fallback;
}

function people(value: unknown, fallback: HomePerson[]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item) => {
    const person = row(item);
    const name = person ? str(person.name) : null;
    if (!person || !name) return [];
    return [{ image: media(person.image), name, role: str(person.role) ?? "" }];
  });
  return next.length > 0 ? next : fallback;
}

function columns(value: unknown, fallback: HomeContent["footer"]["columns"]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item) => {
    const column = row(item);
    const title = column ? str(column.title) : null;
    if (!column || !title || !Array.isArray(column.links)) return [];
    const links = column.links.flatMap((entry) => {
      const linkRow = row(entry);
      const label = linkRow ? str(linkRow.label) : null;
      const url = linkRow ? str(linkRow.url) : null;
      if (!label || !url) return [];
      return [{ label, url }];
    });
    if (links.length === 0) return [];
    return [{ title, links }];
  });
  return next.length > 0 ? next : fallback;
}

function navLinks(value: unknown, fallback: HomeContent["header"]["links"]) {
  if (!Array.isArray(value) || value.length === 0) return fallback;
  const next = value.flatMap((item, index) => {
    const linkRow = row(item);
    const label = linkRow ? str(linkRow.label) : null;
    const url = linkRow ? str(linkRow.url) : null;
    if (!linkRow || !label || !url) return [];
    const posted = Array.isArray(linkRow.children)
      ? linkRow.children.flatMap((entry) => {
          const child = row(entry);
          const childLabel = child ? str(child.label) : null;
          const childUrl = child ? str(child.url) : null;
          if (!childLabel || !childUrl) return [];
          return [{ label: childLabel, url: childUrl }];
        })
      : [];
    return [{ label, url, children: posted.length > 0 ? posted : (fallback[index]?.children ?? []) }];
  });
  return next.length > 0 ? next : fallback;
}

export function mergeHome(base: HomeContent, sections: RawSection[]) {
  const next: HomeContent = structuredClone(base);

  for (const section of sections) {
    const typeName = typeof section.__typename === "string" ? section.__typename : "";

    if (/HomeHeader$/.test(typeName)) {
      next.header = {
        logo: media(section.logo) ?? next.header.logo,
        links: navLinks(section.links, next.header.links),
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
    } else if (/HomeLogos$/.test(typeName)) {
      next.trust = {
        lead: keep(section.trustLead, next.trust.lead),
        stat: keep(section.trustStat, next.trust.stat),
        detail: keep(section.trustDetail, next.trust.detail),
      };
      next.logos = logos(section.logos, next.logos);
    } else if (/HomeFounders$/.test(typeName)) {
      next.founders = {
        eyebrow: keep(section.eyebrow, next.founders.eyebrow),
        title: keep(section.title, next.founders.title),
        highlight: keep(section.highlight, next.founders.highlight),
        text: keep(section.text, next.founders.text),
        cta: link(section.ctaLabel, section.ctaUrl, next.founders.cta),
        cards: cards(section.cards, next.founders.cards),
      };
    } else if (/HomeDifference$/.test(typeName)) {
      next.difference = {
        title: keep(section.title, next.difference.title),
        cards: differenceCards(section.cards, next.difference.cards),
        statEyebrow: keep(section.statEyebrow, next.difference.statEyebrow),
        statValue: keep(section.statValue, next.difference.statValue),
        statLabel: keep(section.statLabel, next.difference.statLabel),
      };
    } else if (/HomeGrowth$/.test(typeName)) {
      next.growth = {
        eyebrow: keep(section.eyebrow, next.growth.eyebrow),
        title: keep(section.title, next.growth.title),
        text: keep(section.text, next.growth.text),
        image: media(section.image) ?? next.growth.image,
        overlay: keep(section.overlay, next.growth.overlay),
        stages: stageLabels(section.stages, next.growth.stages),
        cards: growthCards(section.cards, next.growth.cards),
        cta: link(section.ctaLabel, section.ctaUrl, next.growth.cta),
      };
    } else if (/HomePartners$/.test(typeName)) {
      next.partners = {
        title: keep(section.title, next.partners.title),
        logos: partnerLogos(section.logos, next.partners.logos),
      };
    } else if (/HomeDecisions$/.test(typeName)) {
      next.decisions = {
        badge: keep(section.badge, next.decisions.badge),
        quote: keep(section.quote, next.decisions.quote),
        name: str(section.name) ?? next.decisions.name,
        role: keep(section.role, next.decisions.role),
        portrait: media(section.portrait) ?? next.decisions.portrait,
        eyebrow: keep(section.eyebrow, next.decisions.eyebrow),
        title: keep(section.title, next.decisions.title),
        text: keep(section.text, next.decisions.text),
        cards: cards(section.cards, next.decisions.cards),
        cta: link(section.ctaLabel, section.ctaUrl, next.decisions.cta),
      };
    } else if (/HomeLeadership$/.test(typeName)) {
      next.leadership = {
        eyebrow: keep(section.eyebrow, next.leadership.eyebrow),
        title: keep(section.title, next.leadership.title),
        text: keep(section.text, next.leadership.text),
        cta: link(section.ctaLabel, section.ctaUrl, next.leadership.cta),
        people: people(section.people, next.leadership.people),
      };
    } else if (/HomePressure$/.test(typeName)) {
      next.pressure = {
        title: keep(section.title, next.pressure.title),
        emphasis: keep(section.emphasis, next.pressure.emphasis),
        text: keep(section.text, next.pressure.text),
        cta: link(section.ctaLabel, section.ctaUrl, next.pressure.cta),
      };
    } else if (/HomeFooter$/.test(typeName)) {
      next.footer = {
        logo: media(section.logo) ?? next.footer.logo,
        text: keep(section.text, next.footer.text),
        email: keep(section.email, next.footer.email),
        columns: columns(section.columns, next.footer.columns),
        legal: keep(section.legal, next.footer.legal),
      };
    }
  }

  return next;
}
