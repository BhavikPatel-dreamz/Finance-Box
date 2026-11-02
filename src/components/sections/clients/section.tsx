import type { ReactNode } from "react";
import { z } from "zod";
import { ClientsPage } from "@/components/clients/clients-page";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z
  .object({ __typename: z.string().optional() })
  .passthrough();

function clientsSection(
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

export const clientsSections: readonly SectionRegistration[] = [
  // 1. Clients Banner Section
  clientsSection(
    "clients_banner",
    /ClientsBannerSectionLayout$/,
    [
      "subTitle",
      "title",
      "description",
      "clientProof",
      "stats",
    ],
    `
      subTitle
      title
      description
      clientProof
      stats {
        number
        label
      }
    `,
    (section) => <ClientsPage sections={[section]} />,
  ),

  // 2. Clients Featured Case Studies Section
  //    `caseStudies` returns ContentNode — title/featuredImage/etc must be
  //    queried through an inline fragment on the concrete CaseStudy type.
  clientsSection(
    "clients_featured_case_studies",
    /ClientsFeaturedCaseStudiesSectionLayout$/,
    ["title", "caseStudies"],
    `
      title
      caseStudies {
        nodes {
          ... on CaseStudy {
            databaseId
            uri
            title
            featuredImage { node { sourceUrl altText } }
            caseStudiesOptions {
              tagLine
              featuredContent
            }
          }
        }
      }
    `,
    (section) => <ClientsPage sections={[section]} />,
  ),

  // 3. Clients Trusted Companies Section
  clientsSection(
    "clients_trusted_companies",
    /ClientsTrustedCompaniesSectionLayout$/,
    ["title", "logos"],
    `
      title
      logos {
        logo { node { sourceUrl altText } }
      }
    `,
    (section) => <ClientsPage sections={[section]} />,
  ),

  // 4. Clients Testimonials Section
  clientsSection(
    "clients_testimonials",
    /ClientsTestimonialsSectionLayout$/,
    [
      "title",
      "featuredImage",
      "featuredQuote",
      "featuredName",
      "featuredDesignation",
      "testimonials",
    ],
    `
      title
      featuredImage { node { sourceUrl altText } }
      featuredQuote
      featuredName
      featuredDesignation
      testimonials {
        content
        authorImage { node { sourceUrl altText } }
        authorInfo
      }
    `,
    (section) => <ClientsPage sections={[section]} />,
  ),

  // 5. CTA Section (bottom CTA)
  clientsSection(
    "cta_section",
    /CtaSectionLayout$/,
    ["title", "description", "ctaButton"],
    `
      title
      description
      ctaButton { title url }
    `,
    (section) => <ClientsPage sections={[section]} />,
  ),
];