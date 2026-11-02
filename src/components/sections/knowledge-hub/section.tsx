import type { ReactNode } from "react";
import { z } from "zod";
import { KnowledgeHubPage } from "@/components/knowledge-hub/knowledge-hub-page";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z
  .object({ __typename: z.string().optional() })
  .passthrough();

function knowledgeSection(
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

export const knowledgeHubSections: readonly SectionRegistration[] = [
  // 1. Common Banner Section (Hero)
  knowledgeSection(
    "common_banner",
    /CommonBannerSectionLayout$/,
    ["subTitle", "title", "description", "ctaButton"],
    `
      subTitle
      title
      description
      ctaButton { title url }
    `,
    (section) => <KnowledgeHubPage sections={[section]} />,
  ),

  // 2. Our Blog Section
  knowledgeSection(
    "our_blog_section",
    /OurBlogSectionLayout$/,
    ["title", "allBlogCta", "selectBlog"],
    `
      title
      allBlogCta { title url }
      selectBlog {
        nodes {
          ... on Post {
            databaseId
            uri
            title
            date
            excerpt
            featuredImage { node { sourceUrl altText } }
          }
        }
      }
    `,
    (section) => <KnowledgeHubPage sections={[section]} />,
  ),

  // 3. Simple CTA Section (Resources)
  knowledgeSection(
    "simple_cta_section",
    /SimpleCtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <KnowledgeHubPage sections={[section]} />,
  ),

  // 4. Case Study Section
  knowledgeSection(
    "case_study_section",
    /CaseStudySectionLayout$/,
    ["title", "allCaseStudy", "selectCaseStudy"],
    `
      title
      allCaseStudy
      selectCaseStudy {
        nodes {
          ... on CaseStudy {
            databaseId
            uri
            title
            excerpt
            featuredImage { node { sourceUrl altText } }
          }
        }
      }
    `,
    (section) => <KnowledgeHubPage sections={[section]} />,
  ),

  // 5. Join Waitlist Section (Newsletter)
  knowledgeSection(
    "join_waitlist_section",
    /JoinWaitlistSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <KnowledgeHubPage sections={[section]} />,
  ),

  // 6. CTA Section (Bottom CTA)
  knowledgeSection(
    "cta_section",
    /CtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <KnowledgeHubPage sections={[section]} />,
  ),
];