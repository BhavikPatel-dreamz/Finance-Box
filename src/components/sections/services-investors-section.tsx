import { defineSection } from "@/lib/page-builder/types";
import type { ServicesInvestorsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ServicesInvestors } from "@/components/services/services-sections";
import { mergeServices } from "@/components/services/merge";
import { servicesContent } from "@/content/services";

/** `ServicesInvestorsSection` — Investor cards slider. */
export const servicesInvestorsSection = defineSection<ServicesInvestorsSectionFragment>({
  layout: "ServicesInvestorsSection",
  render: (data) => {
    const content = fromSection(mergeServices, servicesContent, data);
    return <ServicesInvestors investors={content.investors} />;
  },
});
