import { defineSection } from "@/lib/page-builder/types";
import type { SimpleCtaSectionFragment } from "@/lib/wordpress/generated/graphql";
import { KnowledgeHubResources } from "@/components/knowledge-hub/knowledge-hub-sections";
import { link, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `SimpleCtaSection` — Inline call-to-action band. */
export const simpleCtaSection = defineSection<SimpleCtaSectionFragment>({
  layout: "SimpleCtaSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const cta = link(data.ctaButton, {
      label: "Download Templates",
      url: "/downloadable-resources",
    });

    // If WordPress ctaButton url is unset, placeholder "#", or obsolete "/resources", fallback to "/downloadable-resources"
    if (!cta.url || cta.url === "#" || cta.url === "/resources") {
      cta.url = "/downloadable-resources";
    }

    return (
      <KnowledgeHubResources
        resources={{
          title: titleParts
            ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
            : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          text: text(data.description),
          cta,
        }}
      />
    );
  },
});