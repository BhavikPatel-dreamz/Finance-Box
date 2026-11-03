import { defineSection } from "@/lib/page-builder/types";
import type { ServicesBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ServicesBanner } from "@/components/services/services-sections";
import { mergeServices } from "@/components/services/merge";
import { servicesContent } from "@/content/services";

/** `ServicesBannerSection` — Services hero with tier cards. */
export const servicesBannerSection = defineSection<ServicesBannerSectionFragment>({
  layout: "ServicesBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeServices, servicesContent, data);
    return <ServicesBanner hero={content.hero} header={header} />;
  },
});
