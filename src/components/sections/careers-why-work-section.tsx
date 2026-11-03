import { defineSection } from "@/lib/page-builder/types";
import type { CareersWhyWorkSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { CareersWhyWork } from "@/components/careers/careers-sections";
import { mergeCareers } from "@/components/careers/merge";
import { careersContent } from "@/content/careers";

/** `CareersWhyWorkSection` — Image with reasons to join. */
export const careersWhyWorkSection = defineSection<CareersWhyWorkSectionFragment>({
  layout: "CareersWhyWorkSection",
  render: (data) => {
    const content = fromSection(mergeCareers, careersContent, data);
    return <CareersWhyWork whyWork={content.whyWork} />;
  },
});
