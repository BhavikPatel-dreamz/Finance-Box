import type { ReactNode } from "react";
import { z } from "zod";
import {
  WhyHero,
  WhyCompare,
  WhyHowWeWork,
  WhyTalk,
  WhyAbout,
  WhyTeam,
  WhyFooterCta,
} from "@/components/why/why-page";
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
  // 1. Banner / Hero
  whySection(
    "why_hero",
    /WhyFiabBannerSectionLayout$/,
    ["subTitle", "title", "description", "ctaButton", "highlights"],
    `
      subTitle
      title
      description
      ctaButton { title url }
      highlights { number title }
    `,
    (section) => <WhyHero hero={contentFrom(section).hero} header={homeContent.header} />,
  ),

  // 2. Trusted By — skipped (homeContent.trust se render ho raha hai)

  // 3. Comparison
  whySection(
    "why_compare",
    /WhyFiabComparisonSectionLayout$/,
    [
      "title", "description", "featuresColumnLabel", "fiabLogo",
      "softwarePlatformLabel", "freelanceCfoLabel", "inHouseHireLabel", "comparisonRows",
    ],
    `
      title
      description
      featuresColumnLabel
      fiabLogo { node { sourceUrl altText } }
      softwarePlatformLabel
      freelanceCfoLabel
      inHouseHireLabel
      comparisonRows {
        feature fiab softwarePlatform freelanceCfo inHouseHire
      }
    `,
    (section) => <WhyCompare compare={contentFrom(section).compare} />,
  ),

  // 4. How We Work
  whySection(
    "why_how_we_work",
    /WhyFiabHowWeWorkSectionLayout$/,
    ["title", "workCards"],
    `title workCards { number title description }`, // 🚀 Yahan `number` already hai, par check karo
    (section) => <WhyHowWeWork howWeWork={contentFrom(section).howWeWork} />,
  ),

  // 5. Let's Talk
  whySection(
    "why_talk",
    /WhyFiabLetsTalkSectionLayout$/,
    ["title", "image", "description", "ctaButton"],
    `title image { node { sourceUrl altText } } description ctaButton { title url }`,
    (section) => <WhyTalk talk={contentFrom(section).talk} />,
  ),

  // 6. Why FIAB Exists / About
  whySection(
    "why_about",
    /WhyFiabExistsSectionLayout$/,
    ["title", "description", "missionSubTitle", "missionContent"], // 👈 backgroundImage hata diya
    `
      title
      description
      missionSubTitle
      missionContent
    `,
    (section) => <WhyAbout aboutSection={contentFrom(section).aboutSection} />,
  ),

  // 7. Team Members (Inline fragment ke sath normal query)
  whySection(
    "why_team",
    /TeamMembersSectionLayout$/,
    ["title", "ctaButton", "teamMembers"],
    `
      title
      ctaButton { title url }
      teamMembers {
        nodes {
          ... on Team {
            title
            excerpt
            content
            featuredImage { node { sourceUrl altText } }
          }
        }
      }
    `,
    (section) => <WhyTeam team={contentFrom(section).team} />,
  ),

  // 8. CTA Section (Footer ke upar)
  whySection(
    "why_cta",
    /CtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <WhyFooterCta cta={contentFrom(section).cta} />,
  ),
];