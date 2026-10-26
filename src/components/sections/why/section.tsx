import type { ReactNode } from "react";
import { z } from "zod";
import { WhyCompare, WhyHero } from "@/components/why/why-page";
import { mergeWhy } from "@/components/why/merge";
import { homeContent } from "@/content/home";
import { whyContent } from "@/content/why-fiab";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z.object({ __typename: z.string().optional() }).passthrough();

function whySection(
  key: string,
  typePattern: RegExp,
  fields: readonly string[],
  selection: string,
  render: (section: RawSection) => ReactNode,
): SectionRegistration {
  return {
    key,
    matchesType(typeName) {
      return typePattern.test(typeName);
    },
    fields,
    selection,
    render(value) {
      const parsed = sectionSchema.safeParse(value);
      if (!parsed.success) return { ok: false };
      return { ok: true, node: render(parsed.data as RawSection) };
    },
  };
}

function contentFrom(section: RawSection) {
  return mergeWhy(whyContent, [section]);
}

export const whySections: readonly SectionRegistration[] = [
  whySection(
    "why_hero",
    /WhyHero$/,
    ["eyebrow", "title", "highlight", "text", "ctaLabel", "ctaUrl", "points"],
    `eyebrow title highlight text ctaLabel ctaUrl points { number title }`,
    (section) => <WhyHero hero={contentFrom(section).hero} header={homeContent.header} />,
  ),
  whySection(
    "why_compare",
    /WhyCompare$/,
    ["title", "highlight", "text", "featureLabel", "columns", "rows"],
    `title highlight text featureLabel columns { label featured logo { node { sourceUrl altText } } } rows { label values }`,
    (section) => <WhyCompare compare={contentFrom(section).compare} />,
  ),
];
