import type { ReactNode } from "react";
import { z } from "zod";
import { HomePage } from "@/components/home/home-page";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z
  .object({ __typename: z.string().optional() })
  .passthrough();

function homeSection(
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

export const homeSections: readonly SectionRegistration[] = [
  // 1. Home Banner Section
  homeSection(
    "home_banner",
    /HomeBannerSectionLayout$/,
    [
      "subTitle",
      "title",
      "description",
      "ctaButton",
      "floatingCtaButton",
      "statCards",
    ],
    `
      subTitle
      title
      description
      ctaButton { title url }
      floatingCtaButton { title url }
      statCards { label value note }
    `,
    (section) => <HomePage sections={[section]} />,
  ),

  // 2. Home When Finance Matters Section
  homeSection(
    "home_when_finance_matters",
    /HomeWhenFinanceMattersSectionLayout$/,
    ["subTitle", "title", "description", "ctaButton", "moments"],
    `
      subTitle
      title
      description
      ctaButton { title url }
      moments { title content }
    `,
    (section) => <HomePage sections={[section]} />,
  ),

  // 3. Home What Makes FIAB Different Section
  //    NOTE: `cards.icon` is NOT in the schema (PageBuilderPageBuilderCards
  //    has no `icon` field). Skip it — UI falls back to static icons.
  homeSection(
    "home_what_makes_fiab_different",
    /HomeWhatMakesFiabDifferentSectionLayout$/,
    ["title", "cards", "outcomeLabel", "outcomeValue", "outcomeText"],
    `
      title
      cards {
        title
        content
      }
      outcomeLabel
      outcomeValue
      outcomeText
    `,
    (section) => <HomePage sections={[section]} />,
  ),

  // 4. Home Finance That Grows Section
  //    NOTE: `tiers.points` is NOT in the schema
  //    (PageBuilderPageBuilderTiers has no `points` field). Skip it —
  //    UI falls back to the static `items` in content/home.ts.
  homeSection(
    "home_finance_that_grows",
    /HomeFinanceThatGrowsSectionLayout$/,
    [
      "subTitle",
      "title",
      "description",
      "image",
      "imageTitle",
      "imageSteps",
      "tiers",
      "ctaButton",
    ],
    `
      subTitle
      title
      description
      image { node { sourceUrl altText } }
      imageTitle
      imageSteps { label }
      tiers {
        title
        description
      }
      ctaButton { title url }
    `,
    (section) => <HomePage sections={[section]} />,
  ),

  // 5. Home Client Perspective Section
  homeSection(
    "home_client_perspective",
    /HomeClientPerspectiveSectionLayout$/,
    [
      "image",
      "imageLabel",
      "quote",
      "name",
      "designation",
      "subTitle",
      "title",
      "description",
      "metrics",
      "ctaButton",
    ],
    `
      image { node { sourceUrl altText } }
      imageLabel
      quote
      name
      designation
      subTitle
      title
      description
      metrics { value description }
      ctaButton { title url }
    `,
    (section) => <HomePage sections={[section]} />,
  ),

  // 6. Home Leadership Section
  //    NOTE: `teamMembers` collides with another field on the Page type.
  //    Alias as `teamMembersList` to disambiguate.
  homeSection(
    "home_leadership",
    /HomeLeadershipSectionLayout$/,
    ["subTitle", "slides", "teamMembersList"],
    `
      subTitle
      slides { title description }
      teamMembersList: teamMembers {
        image { node { sourceUrl altText } }
        name
        designation
      }
    `,
    (section) => <HomePage sections={[section]} />,
  ),

  // 7. Agentic Official Partner Stack (home "partners" strip)
  homeSection(
    "agentic_official_partner_stack",
    /AgenticOfficialPartnerStackLayout$/,
    ["title", "logoView", "officialPartners"],
    `
      title
      logoView
      officialPartners {
        logo { node { sourceUrl altText } }
      }
    `,
    (section) => <HomePage sections={[section]} />,
  ),

  // 8. CTA Section (used as the "Pressure" block on home)
  homeSection(
    "cta_section",
    /CtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <HomePage sections={[section]} />,
  ),

  // 9. Why FIAB Trusted By Section
  //    Registered so the page-builder query includes it and doesn't break
  //    when it's added to home. Home merge intentionally ignores it
  //    (the <TrustedBy> strip is driven by hero/trust content).
  homeSection(
    "why_fiab_trusted_by",
    /WhyFiabTrustedBySectionLayout$/,
    ["title", "logos"],
    `
      title
      logos { logo { node { sourceUrl altText } } }
    `,
    (section) => <HomePage sections={[section]} />,
  ),
];