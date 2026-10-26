import type { ReactNode } from "react";
import { z } from "zod";
import {
  ServicesCfo,
  ServicesDepth,
  ServicesDetail,
  ServicesHero,
  ServicesInvestors,
  ServicesProcess,
  ServicesStages,
} from "@/components/services/services-page";
import { mergeServices } from "@/components/services/merge";
import { servicesContent } from "@/content/services";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z
  .object({
    __typename: z.string().optional(),
  })
  .passthrough();

function servicesSection(
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
  return mergeServices(servicesContent, [section]);
}

export const servicesSections: readonly SectionRegistration[] = [
  servicesSection(
    "services_hero",
    /ServicesHero$/,
    ["eyebrow", "title", "highlight", "text", "primaryLabel", "primaryUrl", "secondaryLabel", "secondaryUrl", "tiers"],
    `eyebrow title highlight text primaryLabel primaryUrl secondaryLabel secondaryUrl tiers { number label title highlight text }`,
    (section) => <ServicesHero hero={contentFrom(section).hero} />,
  ),
  servicesSection(
    "services_stages",
    /ServicesStages$/,
    ["eyebrow", "title", "text", "cards"],
    `eyebrow title text cards { title label text icon }`,
    (section) => <ServicesStages stages={contentFrom(section).stages} />,
  ),
  servicesSection(
    "services_depth",
    /ServicesDepth$/,
    ["eyebrow", "title", "ctaLabel", "ctaUrl"],
    `eyebrow title ctaLabel ctaUrl`,
    (section) => <ServicesDepth depth={contentFrom(section).depth} />,
  ),
  servicesSection(
    "services_detail",
    /ServicesDetail$/,
    ["anchor", "number", "title", "text", "ctaLabel", "ctaUrl", "items"],
    `anchor number title text ctaLabel ctaUrl items { title text }`,
    (section) => {
      const detail = contentFrom(section).details[0];
      return detail ? <ServicesDetail detail={detail} /> : null;
    },
  ),
  servicesSection(
    "services_cfo",
    /ServicesCfo$/,
    ["title", "text", "ctaLabel", "ctaUrl", "cards"],
    `title text ctaLabel ctaUrl cards { title text image { node { sourceUrl altText } } }`,
    (section) => <ServicesCfo cfo={contentFrom(section).cfo} />,
  ),
  servicesSection(
    "services_process",
    /ServicesProcess$/,
    ["title", "text", "steps"],
    `title text steps { number title text }`,
    (section) => <ServicesProcess process={contentFrom(section).process} />,
  ),
  servicesSection(
    "services_investors",
    /ServicesInvestors$/,
    ["eyebrow", "title", "highlight", "text", "primaryLabel", "primaryUrl", "secondaryLabel", "secondaryUrl", "cards"],
    `eyebrow title highlight text primaryLabel primaryUrl secondaryLabel secondaryUrl cards { title text image { node { sourceUrl altText } } }`,
    (section) => <ServicesInvestors investors={contentFrom(section).investors} />,
  ),
];
