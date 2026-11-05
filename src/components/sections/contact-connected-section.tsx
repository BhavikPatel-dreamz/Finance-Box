import { defineSection } from "@/lib/page-builder/types";
import type { ContactConnectedSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ContactConnected } from "@/components/contact/contact-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";

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
      title: title || "",
      highlight: highlight || "",
      subtitle: text(data.connectedDescription, ""),
      linkedin: {
        title: text(linkedin.title, ""),
        text: text(linkedin.description, ""),
        buttonLabel: text(linkedin.ctaButton?.title, ""),
        buttonUrl: text(linkedin.ctaButton?.url, ""),
        image: media(linkedin.image)?.url || "",
      },
      newsletter: {
        title: text(newsletter.title, ""),
        text: text(newsletter.description, ""),
        placeholder: "",
        buttonLabel: "",
      },
    };
    return <ContactConnected socialSection={socialSection as any} />;
  },
});
