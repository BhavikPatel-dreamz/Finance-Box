import { defineSection } from "@/lib/page-builder/types";
import type { ServicesFindYourStageSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ServicesStages } from "@/components/services/services-sections";
import { mergeServices } from "@/components/services/merge";
import { servicesContent } from "@/content/services";

/** `ServicesFindYourStageSection` — Company-stage cards. */
export const servicesFindYourStageSection = defineSection<ServicesFindYourStageSectionFragment>({
  layout: "ServicesFindYourStageSection",
  render: (data) => {
    const content = fromSection(mergeServices, servicesContent, data);
    return <ServicesStages stages={content.stages} />;
  },
});
