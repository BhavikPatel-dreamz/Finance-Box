import { type WhyContent, type WhyTeamMember } from "@/content/why-fiab";
import type { RawSection } from "@/lib/wordpress/content";
import { mapTeamMember } from "@/components/team/team-member";

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
function keep(value: unknown, fallback: string) {
  return str(value) ?? fallback;
}
function cleanHtml(value: unknown, fallback: string) {
  const text = str(value);
  if (!text) return fallback;
  return (
    text
      .replace(/<[^>]*>?/gm, "")
      .replace(/&#038;/g, "&")
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "–")
      .replace(/&#8212;/g, "—")
      .replace(/&#8230;/g, "…")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .trim() || fallback
  );
}
function media(value: unknown): { url: string; alt: string } | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, any>;
  const nested = item.node ?? item;
  const url = nested.sourceUrl ?? nested.url ?? null;
  if (!url) return null;
  return { url, alt: nested.altText ?? "" };
}
function splitHighlight(raw: unknown, fallbackTitle: string, fallbackHighlight: string) {
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
function link(value: unknown, fallback: { label: string; url: string }) {
  if (!value || typeof value !== "object") return fallback;
  const l = value as Record<string, any>;
  return { label: keep(l.title, fallback.label), url: keep(l.url, fallback.url) };
}


export function mergeWhy(base: WhyContent, sections: RawSection[]): WhyContent {
  const next: WhyContent = structuredClone(base);

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const typeName = typeof section.__typename === "string" ? section.__typename : "";
    if (!typeName) continue;

    if (/WhyFiabBannerSectionLayout$/.test(typeName)) {
      next.hero.eyebrow = cleanHtml(section.subTitle, next.hero.eyebrow);
      const { title, highlight } = splitHighlight(section.title, next.hero.title, next.hero.highlight);
      next.hero.title = title;
      next.hero.highlight = highlight;
      next.hero.text = cleanHtml(section.description, next.hero.text);
      next.hero.cta = link(section.ctaButton, next.hero.cta);
      const points = Array.isArray(section.highlights) ? section.highlights : [];
      if (points.length) {
        next.hero.points = points.map((p: any) => ({ 
          // 🚀 FIX: WP se Integer aa raha hai, usko String mein badla aur 01 format diya
          number: p?.number != null ? String(p.number).padStart(2, "0") : "", 
          title: keep(p?.title, "") 
        }));
      }
    }

    if (/WhyFiabComparisonSectionLayout$/.test(typeName)) {
      const { title, highlight } = splitHighlight(section.title, next.compare.title, next.compare.highlight);
      next.compare.title = title;
      next.compare.highlight = highlight;
      next.compare.text = cleanHtml(section.description, next.compare.text);
      next.compare.featureLabel = keep(section.featuresColumnLabel, next.compare.featureLabel);
      const fiabLogo = media(section.fiabLogo) ?? next.compare.columns[0]?.logo ?? null;
      next.compare.columns = [
        { label: keep(next.compare.columns[0]?.label, "Finance"), featured: true, logo: fiabLogo },
        { label: keep(section.softwarePlatformLabel, next.compare.columns[1]?.label ?? "Software Platform"), featured: false, logo: null },
        { label: keep(section.freelanceCfoLabel, next.compare.columns[2]?.label ?? "Freelance CFO"), featured: false, logo: null },
        { label: keep(section.inHouseHireLabel, next.compare.columns[3]?.label ?? "In House Hire"), featured: false, logo: null },
      ];
      const rows = Array.isArray(section.comparisonRows) ? section.comparisonRows : [];
      if (rows.length) {
        next.compare.rows = rows.map((r: any) => ({
          label: keep(r?.feature, ""),
          values: [!!r?.fiab, !!r?.softwarePlatform, !!r?.freelanceCfo, !!r?.inHouseHire],
        }));
      }
    }

    if (/WhyFiabHowWeWorkSectionLayout$/.test(typeName)) {
      next.howWeWork.title = cleanHtml(section.title, next.howWeWork.title);
      const cards = Array.isArray(section.workCards) ? section.workCards : [];
      if (cards.length) {
        next.howWeWork.cards = cards.map((c: any) => ({ 
          // 🚀 FIX: Number ko String mein convert karo aur agar 1 digit ho toh 0 lagao (1 => 01)
          number: c?.number != null ? String(c.number).padStart(2, "0") : "", 
          title: keep(c?.title, ""), 
          text: cleanHtml(c?.description, "") 
        }));
      }
    }

    if (/WhyFiabLetsTalkSectionLayout$/.test(typeName)) {
      const { title, highlight } = splitHighlight(section.title, next.talk.title, next.talk.highlight);
      next.talk.title = title;
      next.talk.highlight = highlight;
      next.talk.text = cleanHtml(section.description, next.talk.text);
      next.talk.image = media(section.image)?.url ?? next.talk.image;
      next.talk.cta = link(section.ctaButton, next.talk.cta);
    }

    if (/WhyFiabExistsSectionLayout$/.test(typeName)) {
      // 🚀 FIX: Background image fix kardi, kyunki WP se galat image aa rahi thi
      next.aboutSection.bgImage = "/why/bg-color.png";
      
      next.aboutSection.title = cleanHtml(section.title, next.aboutSection.title);
      next.aboutSection.text = cleanHtml(section.description, next.aboutSection.text);
      next.aboutSection.missionLabel = keep(section.missionSubTitle, next.aboutSection.missionLabel);
      next.aboutSection.missionText = cleanHtml(section.missionContent, next.aboutSection.missionText);
    }

    // 7. Team Members
    if (/TeamMembersSectionLayout$/.test(typeName)) {
      next.team.title = cleanHtml(section.title, next.team.title);
      next.team.cta = link(section.ctaButton, next.team.cta);

      const members = (section as any).teamMembers?.nodes;
      if (Array.isArray(members) && members.length > 0) {
        next.team.members = members.map((node: any, idx: number) => {
          const fallback = next.team.members[idx] || next.team.members[0];
          return mapTeamMember(node, fallback);
        });
      }
    }

    // 8. CTA Section (Footer ke upar)
    if (/CtaSectionLayout$/.test(typeName)) {
      const rawTitle = str(section.title) ?? "";
      const match = rawTitle.match(/(.*)<b[^>]*>([\s\S]*?)<\/b>(.*)/i);
      
      if (match) {
        next.cta.title = cleanHtml(match[1] + (match[3] ? match[3] : ""), next.cta.title); 
        next.cta.highlight = cleanHtml(match[2], next.cta.highlight);
      } else {
        next.cta.title = cleanHtml(rawTitle, next.cta.title);
      }

      next.cta.text = cleanHtml(section.description, next.cta.text);
      
      if (section.ctaButton) {
        next.cta.buttonLabel = keep((section.ctaButton as any).title, next.cta.buttonLabel);
        next.cta.buttonUrl = keep((section.ctaButton as any).url, next.cta.buttonUrl);
      }
    }
  }

  return next;
}