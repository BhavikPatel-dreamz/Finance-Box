import { defineSection } from "@/lib/page-builder/types";
import type { ServicesTiersInDepthSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesDepthIntro, ServicesDetails } from "@/components/services/services-sections";
import { link, text } from "@/lib/wordpress/fields";

/** `ServicesTiersInDepthSection` — Tier intro band followed by the tier offering grids. */
export const servicesTiersInDepthSection = defineSection<ServicesTiersInDepthSectionFragment>({
  layout: "ServicesTiersInDepthSection",
  render: (data) => {
    const details = (data.tiers ?? []).map((tier, index) => {
      const slugAnchor =
        text(tier?.title).split(".")[0].trim().toLowerCase().replace(/\s+/g, "-") ||
        `tier-${index + 1}`;
      const items = (tier?.services ?? []).map((svc) => ({
        title: text(svc?.title),
        text: text(svc?.description),
        description: "",
      }));
      return {
        anchor: slugAnchor,
        number:
          tier?.number != null
            ? String(tier.number).padStart(2, "0")
            : String(index + 1).padStart(2, "0"),
        title: text(tier?.title),
        text: text(tier?.description),
        cta: link(tier?.ctaButton, { label: "", url: "" }),
        items,
      };
    });

    return (
      <>
        <ServicesDepthIntro
          depth={{
            eyebrow: text(data.subTitle),
            title: text(data.title),
            cta: link(data.ctaButton, { label: "", url: "" }),
          }}
        />
        <ServicesDetails details={details} />
      </>
    );
  },
});