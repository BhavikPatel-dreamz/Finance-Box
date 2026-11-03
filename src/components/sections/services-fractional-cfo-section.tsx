import { defineSection } from "@/lib/page-builder/types";
import type { ServicesFractionalCfoSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ServicesCfo } from "@/components/services/services-sections";
import { mergeServices } from "@/components/services/merge";
import { servicesContent } from "@/content/services";

/** `ServicesFractionalCfoSection` — Fractional CFO deliverables. */
export const servicesFractionalCfoSection = defineSection<ServicesFractionalCfoSectionFragment>({
  layout: "ServicesFractionalCfoSection",
  render: (data) => {
    const content = fromSection(mergeServices, servicesContent, data);
    return <ServicesCfo cfo={content.cfo} />;
  },
});
