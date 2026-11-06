import { defineSection } from "@/lib/page-builder/types";
import type { ContactConnectedSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ContactConnected } from "@/components/contact/contact-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";
import { contactUsContent } from "@/content/contact-us";

/** `ContactConnectedSection` — social links and newsletter. */
export const contactConnectedSection = defineSection<ContactConnectedSectionFragment>({
  layout: "ContactConnectedSection",
  render: (data) => {
    const parts = splitEmphasis(data.connectedTitle);
    const title = parts ? [parts.before, parts.after].filter(Boolean).join(" ").trim() : text(data.connectedTitle, "");
    const highlight = parts ? parts.emphasis : "";

    const linkedin = (data.linkedinBox || {}) as any;
    const newsletter = (data.newsletterBox || {}) as any;
    const socialSection = {
      title: title || contactUsContent.socialSection.title,
      highlight: highlight || contactUsContent.socialSection.highlight,
      subtitle: text(data.connectedDescription, "") || contactUsContent.socialSection.subtitle,
      linkedin: {
        title: text(linkedin.title, "") || contactUsContent.socialSection.linkedin.title,
        text: text(linkedin.description, "") || contactUsContent.socialSection.linkedin.text,
        buttonLabel: text(linkedin.ctaButton?.title, "") || contactUsContent.socialSection.linkedin.buttonLabel,
        buttonUrl: text(linkedin.ctaButton?.url, "") || contactUsContent.socialSection.linkedin.buttonUrl,
        image: media(linkedin.image)?.url || contactUsContent.socialSection.linkedin.image,
      },
      newsletter: {
        title: text(newsletter.title, "") || contactUsContent.socialSection.newsletter.title,
        text: text(newsletter.description, "") || contactUsContent.socialSection.newsletter.text,
        placeholder: text(newsletter.placeholder, "") || contactUsContent.socialSection.newsletter.placeholder,
        buttonLabel: text(newsletter.ctaButton?.title, "") || contactUsContent.socialSection.newsletter.buttonLabel,
      },
    };
    return <ContactConnected socialSection={socialSection as any} />;
  },
});
