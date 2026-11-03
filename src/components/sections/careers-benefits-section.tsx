import { defineSection } from "@/lib/page-builder/types";
import type { CareersBenefitsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { CareersBenefits } from "@/components/careers/careers-sections";
import { mergeCareers } from "@/components/careers/merge";
import { careersContent } from "@/content/careers";

/** `CareersBenefitsSection` — Benefits grid. */
export const careersBenefitsSection = defineSection<CareersBenefitsSectionFragment>({
  layout: "CareersBenefitsSection",
  render: (data) => {
    const content = fromSection(mergeCareers, careersContent, data);
    return <CareersBenefits benefits={content.benefits} />;
  },
});
