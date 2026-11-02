import type { ReactNode } from "react";
import { z } from "zod";
import { AgenticAiPage } from "@/components/agentic-ai/agentic-ai-page";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z
  .object({ __typename: z.string().optional() })
  .passthrough();

function agenticSection(
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

export const agenticAiSections: readonly SectionRegistration[] = [
  // 1. Common Banner Section (Hero)
  agenticSection(
    "common_banner",
    /CommonBannerSectionLayout$/,
    ["subTitle", "title", "description", "ctaButton", "tagLine"],
    `
      subTitle
      title
      description
      ctaButton { title url }
      tagLine
    `,
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 2. About Agentic Section (What is)
  // ❌ Removed: highlight, text2 (fields don't exist in ACF)
  agenticSection(
    "about_agentic",
    /AboutAgenticSectionLayout$/,
    ["subTitle", "title", "description", "aboutAgentics"],
    `
      subTitle
      title
      description
      aboutAgentics {
        image { node { sourceUrl altText } }
        title
        content
      }
    `,
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 3. Your Own Agentic Section (Build your own)
  agenticSection(
    "your_own_agentic",
    /YourOwnAgenticSectionLayout$/,
    ["title", "description", "buildYourOwnAgentic"],
    `
      title
      description
      buildYourOwnAgentic {
        icon { node { sourceUrl altText } }
        title
        content
      }
    `,
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 4. Agentic People Ops Section
  agenticSection(
    "agentic_people_ops_payroll_it",
    /AgenticPeopleOpsPayrollItSectionLayout$/,
    ["title", "agents"],
    `
      title
      agents {
        icon { node { sourceUrl altText } }
        title
        content
      }
    `,
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 5. Agentic Ops & Compliance Section
  // ❌ Removed: backgroundImage (field is `icon` in ACF for this repeater)
  agenticSection(
    "agentic_ops_compliance",
    /AgenticOpsComplianceSectionLayout$/,
    ["title", "agents"],
    `
      title
      agents {
        icon { node { sourceUrl altText } }
        title
        content
      }
    `,
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 6. Agentic Official Partner Stack
  agenticSection(
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
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 7. Agentic Proven Architecture Section
  agenticSection(
    "agentic_proven_architecture",
    /AgenticProvenArchitectureSectionLayout$/,
    ["title", "highlightTitle", "architectureCards"],
    `
      title
      highlightTitle
      architectureCards {
        image { node { sourceUrl altText } }
        title
        content
      }
    `,
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 8. Join Waitlist Section
  agenticSection(
    "join_waitlist",
    /JoinWaitlistSectionLayout$/,
    ["title", "description", "formShortcode", "ctaButton"],
    `
      title
      description
      formShortcode
      ctaButton { title url }
    `,
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 9. FAQ Section
  agenticSection(
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
    (section) => <AgenticAiPage sections={[section]} />,
  ),

  // 10. CTA Section (Bottom CTA)
  agenticSection(
    "cta_section",
    /CtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <AgenticAiPage sections={[section]} />,
  ),
];