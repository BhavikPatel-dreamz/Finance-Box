import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { WhyHero } from "@/components/why/why-sections";
import { mergeWhy } from "@/components/why/merge";
import { whyContent } from "@/content/why-fiab";

/** `WhyFiabBannerSection` — Why FIAB hero with highlights. */
export const whyFiabBannerSection = defineSection<WhyFiabBannerSectionFragment>({
  layout: "WhyFiabBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeWhy, whyContent, data);
    return <WhyHero hero={content.hero} header={header} />;
  },
});
