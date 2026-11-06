import { defineSection } from "@/lib/page-builder/types";
import type { CareersBenefitsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { CareersBenefits } from "@/components/careers/careers-sections";
import { media, text } from "@/lib/wordpress/fields";

/** `CareersBenefitsSection` — Benefits grid. */
export const careersBenefitsSection = defineSection<CareersBenefitsSectionFragment>({
  layout: "CareersBenefitsSection",
  render: (data) => {
    const items = (data.benefits ?? []).map((benefit) => ({
      icon: media(benefit?.icon)?.url ?? "",
      title: text(benefit?.title),
      text: text(benefit?.description),
    }));
    return (
      <CareersBenefits
        benefits={{
          title: text(data.title),
          items,
        }}
      />
    );
  },
});