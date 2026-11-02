import type { ReactNode } from "react";
import { z } from "zod";
import { CareersPage } from "@/components/careers/careers-page";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z
  .object({ __typename: z.string().optional() })
  .passthrough();

function careersSection(
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

export const careersSections: readonly SectionRegistration[] = [
  // 1. Common Banner Section (Hero)
  careersSection(
    "common_banner",
    /CommonBannerSectionLayout$/,
    ["subTitle", "title", "description", "ctaButton"],
    `
      subTitle
      title
      description
      ctaButton { title url }
    `,
    (section) => <CareersPage sections={[section]} />,
  ),

  // 2. Careers Why Work Section
  careersSection(
    "careers_why_work",
    /CareersWhyWorkSectionLayout$/,
    ["image", "title", "points"],
    `
      image { node { sourceUrl altText } }
      title
      points { content }
    `,
    (section) => <CareersPage sections={[section]} />,
  ),

  // 3. Careers Stand Out Section
  careersSection(
    "careers_stand_out",
    /CareersStandOutSectionLayout$/,
    ["title", "cards"],
    `
      title
      cards {
        backgroundImage { node { sourceUrl altText } }
        title
        content
      }
    `,
    (section) => <CareersPage sections={[section]} />,
  ),

  // 4. Careers Benefits Section
  careersSection(
    "careers_benefits",
    /CareersBenefitsSectionLayout$/,
    ["title", "benefits"],
    `
      title
      benefits {
        icon { node { sourceUrl altText } }
        title
        description
      }
    `,
    (section) => <CareersPage sections={[section]} />,
  ),

  // 👇 NAYA: 5. Services Operating Cadence (How We Hire)
  careersSection(
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
    (section) => <CareersPage sections={[section]} />,
  ),

  // 6. FAQ Section
  careersSection(
    "faq_section",
    /FaqSectionLayout$/,
    ["title", "faqs"],
    `
      title
      faqs {
        question
        answer
      }
    `,
    (section) => <CareersPage sections={[section]} />,
  ),

  // 7. CTA Section (Bottom CTA)
  careersSection(
    "cta_section",
    /CtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <CareersPage sections={[section]} />,
  ),
];