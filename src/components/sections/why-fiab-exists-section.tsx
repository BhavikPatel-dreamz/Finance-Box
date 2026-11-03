import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabExistsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { WhyAbout } from "@/components/why/why-sections";
import { mergeWhy } from "@/components/why/merge";
import { whyContent } from "@/content/why-fiab";

/** `WhyFiabExistsSection` — Mission statement. */
export const whyFiabExistsSection = defineSection<WhyFiabExistsSectionFragment>({
  layout: "WhyFiabExistsSection",
  render: (data) => {
    const content = fromSection(mergeWhy, whyContent, data);
    return <WhyAbout aboutSection={content.aboutSection} />;
  },
});
