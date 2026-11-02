import type { ReactNode } from "react";
import { z } from "zod";
import { PeopleOperationsPage } from "@/components/people-operations/people-operations-page";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z
  .object({ __typename: z.string().optional() })
  .passthrough();

function peopleSection(
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

export const peopleOperationsSections: readonly SectionRegistration[] = [
  // 1. Common Banner Section (Hero)
  peopleSection(
    "common_banner",
    /CommonBannerSectionLayout$/,
    ["subTitle", "title", "description", "ctaButton"],
    `
      subTitle
      title
      description
      ctaButton { title url }
    `,
    (section) => <PeopleOperationsPage sections={[section]} />,
  ),

  // 2. People Operations Intro Section
  peopleSection(
    "people_operations_intro",
    /PeopleOperationsIntroSectionLayout$/,
    ["image", "title", "description"],
    `
      image { node { sourceUrl altText } }
      title
      description
    `,
    (section) => <PeopleOperationsPage sections={[section]} />,
  ),

  // 3. People Operations What We Do Section
  peopleSection(
    "people_operations_what_we_do",
    /PeopleOperationsWhatWeDoSectionLayout$/,
    ["title", "whatWeDoItems"],
    `
      title
      whatWeDoItems {
        image { node { sourceUrl altText } }
        title
        description
        points
      }
    `,
    (section) => <PeopleOperationsPage sections={[section]} />,
  ),

  // 4. People Operations Where We Help Section
  // ❌ Removed: highlight (field doesn't exist in ACF)
  peopleSection(
    "people_operations_where_we_help",
    /PeopleOperationsWhereWeHelpSectionLayout$/,
    ["title", "helpItems"],
    `
      title
      helpItems {
        title
        description
      }
    `,
    (section) => <PeopleOperationsPage sections={[section]} />,
  ),

  // 5. CTA Section (Bottom CTA)
  peopleSection(
    "cta_section",
    /CtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <PeopleOperationsPage sections={[section]} />,
  ),
];