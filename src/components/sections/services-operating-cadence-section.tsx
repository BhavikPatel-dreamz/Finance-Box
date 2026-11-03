import { defineSection } from "@/lib/page-builder/types";
import type { ServicesOperatingCadenceSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ServicesProcess } from "@/components/services/services-sections";
import { CareersHowWeHire } from "@/components/careers/careers-sections";
import { mergeServices } from "@/components/services/merge";
import { mergeCareers } from "@/components/careers/merge";
import { servicesContent } from "@/content/services";
import { careersContent } from "@/content/careers";

/**
 * `ServicesOperatingCadenceSection` — numbered process steps.
 *
 * Editors choose the design with the ACF `sectionSetting` field:
 * "up-down" (heading centred above the steps, default) or
 * "side-by-side" (heading left, description right).
 */
export const servicesOperatingCadenceSection = defineSection<ServicesOperatingCadenceSectionFragment>({
  layout: "ServicesOperatingCadenceSection",
  render: (data) => {
    if (data.sectionSetting === "side-by-side") {
      return <CareersHowWeHire howWeHire={fromSection(mergeCareers, careersContent, data).howWeHire} />;
    }
    return <ServicesProcess process={fromSection(mergeServices, servicesContent, data).process} />;
  },
});
