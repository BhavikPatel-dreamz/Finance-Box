import { defineSection } from "@/lib/page-builder/types";
import type { CareersStandOutSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { CareersStandOut } from "@/components/careers/careers-sections";
import { mergeCareers } from "@/components/careers/merge";
import { careersContent } from "@/content/careers";

/** `CareersStandOutSection` — Image cards. */
export const careersStandOutSection = defineSection<CareersStandOutSectionFragment>({
  layout: "CareersStandOutSection",
  render: (data) => {
    const content = fromSection(mergeCareers, careersContent, data);
    return <CareersStandOut standOut={content.standOut} />;
  },
});
