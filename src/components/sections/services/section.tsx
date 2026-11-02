import type { ReactNode } from "react";
import { z } from "zod";
import { ServicesPage } from "@/components/services/services-page";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z
  .object({ __typename: z.string().optional() })
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

export const servicesSections: readonly SectionRegistration[] = [
  // 1. Services Banner Section
  servicesSection(
    "services_banner",
    /ServicesBannerSectionLayout$/,
    [
      "subTitle",
      "title",
      "description",
      "primaryCtaButton",
      "secondaryCtaButton",
      "tierCards",
    ],
    `
      subTitle
      title
      description
      primaryCtaButton { title url }
      secondaryCtaButton { title url }
      tierCards {
        label
        title
        description
      }
    `,
    (section) => <ServicesPage sections={[section]} />,
  ),

  // 2. Services Find Your Stage Section
  servicesSection(
    "services_find_your_stage",
    /ServicesFindYourStageSectionLayout$/,
    ["subTitle", "title", "description", "stageCards"],
    `
      subTitle
      title
      description
      stageCards {
        title
        stageLabel
        description
      }
    `,
    (section) => <ServicesPage sections={[section]} />,
  ),

  // 3. Services Tiers In Depth Section
  servicesSection(
    "services_tiers_in_depth",
    /ServicesTiersInDepthSectionLayout$/,
    [
      "subTitle",
      "title",
      "ctaButton",
      "tiers",
    ],
    `
      subTitle
      title
      ctaButton { title url }
      tiers {
        number
        title
        description
        ctaButton { title url }
        services {
          title
          description
        }
      }
    `,
    (section) => <ServicesPage sections={[section]} />,
  ),

  // 4. Services Fractional CFO Section
  servicesSection(
    "services_fractional_cfo",
    /ServicesFractionalCfoSectionLayout$/,
    ["title", "description", "ctaButton", "deliverables"],
    `
      title
      description
      ctaButton { title url }
      deliverables {
        image { node { sourceUrl altText } }
        label
        description
      }
    `,
    (section) => <ServicesPage sections={[section]} />,
  ),

  // 5. Services Operating Cadence Section
  servicesSection(
    "services_operating_cadence",
    /ServicesOperatingCadenceSectionLayout$/,
    ["title", "description", "sectionSetting", "steps"],
    `
      title
      description
      sectionSetting
      steps {
        number
        title
        description
      }
    `,
    (section) => <ServicesPage sections={[section]} />,
  ),

  // 6. Services Investors Section
  servicesSection(
    "services_investors",
    /ServicesInvestorsSectionLayout$/,
    [
      "subTitle",
      "title",
      "description",
      "primaryCtaButton",
      "secondaryCtaButton",
      "investorCards",
    ],
    `
      subTitle
      title
      description
      primaryCtaButton { title url }
      secondaryCtaButton { title url }
      investorCards {
        image { node { sourceUrl altText } }
        title
        description
      }
    `,
    (section) => <ServicesPage sections={[section]} />,
  ),

  // 👇 NAYA: 7. CTA Section (used at bottom of services)
  servicesSection(
    "cta_section",
    /CtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <ServicesPage sections={[section]} />,
  ),
];