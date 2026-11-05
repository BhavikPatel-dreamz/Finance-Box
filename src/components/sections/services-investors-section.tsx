import { defineSection } from "@/lib/page-builder/types";
import type { ServicesInvestorsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesInvestors } from "@/components/services/services-sections";
import { link, media, text } from "@/lib/wordpress/fields";

/** `ServicesInvestorsSection` — Investor cards slider. */
export const servicesInvestorsSection = defineSection<ServicesInvestorsSectionFragment>({
  layout: "ServicesInvestorsSection",
  render: (data) => {
    const cards = (data.investorCards ?? []).map((card) => ({
      title: text(card?.title),
      text: text(card?.description),
      image: media(card?.image),
    }));
    return (
      <ServicesInvestors
        investors={{
          eyebrow: text(data.subTitle),
          title: text(data.title),
          highlight: "",
          text: text(data.description),
          primary: link(data.primaryCtaButton, { label: "", url: "" }),
          secondary: link(data.secondaryCtaButton, { label: "", url: "" }),
          cards,
        }}
      />
    );
  },
});