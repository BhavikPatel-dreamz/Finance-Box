import { defineSection } from "@/lib/page-builder/types";
import type { ServicesTiersInDepthSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ServicesDepthIntro, ServicesDetails } from "@/components/services/services-sections";
import { mergeServices } from "@/components/services/merge";
import { servicesContent } from "@/content/services";

/** `ServicesTiersInDepthSection` — Tier intro band followed by the tier offering grids. */
export const servicesTiersInDepthSection = defineSection<ServicesTiersInDepthSectionFragment>({
  layout: "ServicesTiersInDepthSection",
  render: (data) => {
    const content = fromSection(mergeServices, servicesContent, data);
    return (
      <>
        <ServicesDepthIntro depth={content.depth} />
        <ServicesDetails details={content.details} />
      </>
    );
  },
});
