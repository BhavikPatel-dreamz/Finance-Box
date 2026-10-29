import type { ReactNode } from "react";
import { z } from "zod";
import { ContactUsPage } from "@/components/contact/contact-us-page";
import { mergeContactUs } from "@/components/contact/merge";
import { contactUsContent } from "@/content/contact-us";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const sectionSchema = z.object({ __typename: z.string().optional() }).passthrough();

function contactSection(
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

export const contactSections: readonly SectionRegistration[] = [
  // 1. Contact Banner (Hero)
  contactSection(
    "contact_banner",
    /ContactBannerSectionLayout$/,
    ["subtitle", "title", "description"],
    `subtitle title description`,
    (section) => <ContactUsPage sections={[section]} />,
  ),
  
  // 2. Contact Form
  contactSection(
    "contact_form",
    /ContactFormSectionLayout$/,
    ["contactImage", "contactInformation", "contactEmail", "formTitle", "formDescription", "formShortcode"],
    `
      contactImage { node { sourceUrl altText } }
      contactInformation
      contactEmail
      formTitle
      formDescription
      formShortcode
    `,
    (section) => <ContactUsPage sections={[section]} />,
  ),

  // 3. Contact Connected (Social)
  contactSection(
    "contact_connected",
    /ContactConnectedSectionLayout$/,
    ["connectedTitle", "connectedDescription", "linkedinBox", "newsletterBox"],
    `
      connectedTitle
      connectedDescription
      linkedinBox {
        title
        image { node { sourceUrl altText } }
        description
        ctaButton { title url }
      }
      newsletterBox {
        title
        newsletterFormShortcode
        description
      }
    `,
    (section) => <ContactUsPage sections={[section]} />,
  ),
];