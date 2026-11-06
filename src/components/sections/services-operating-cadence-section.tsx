import { defineSection } from "@/lib/page-builder/types";
import type { ServicesOperatingCadenceSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesProcess } from "@/components/services/services-sections";
import { CareersHowWeHire } from "@/components/careers/careers-sections";
import { text } from "@/lib/wordpress/fields";

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
    const steps = (data.steps ?? []).map((step, index) => ({
      number:
        step?.number != null
          ? String(step.number).padStart(2, "0")
          : String(index + 1).padStart(2, "0"),
      title: text(step?.title),
      text: text(step?.description),
    }));
    if (data.sectionSetting === "side-by-side") {
      return (
        <CareersHowWeHire
          howWeHire={{
            title: text(data.title),
            text: text(data.description),
            steps,
          }}
        />
      );
    }
    return (
      <ServicesProcess
        process={{
          title: text(data.title),
          text: text(data.description),
          steps,
        }}
      />
    );
  },
});