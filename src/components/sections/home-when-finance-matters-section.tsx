import { defineSection } from "@/lib/page-builder/types";
import type { HomeWhenFinanceMattersSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { Founders } from "@/components/home/founders";
import { mergeHome } from "@/components/home/merge";
import { homeContent } from "@/content/home";

/** `HomeWhenFinanceMattersSection` — Founder moments accordion. */
export const homeWhenFinanceMattersSection = defineSection<HomeWhenFinanceMattersSectionFragment>({
  layout: "HomeWhenFinanceMattersSection",
  render: (data) => {
    const content = fromSection(mergeHome, homeContent, data);
    return <Founders founders={content.founders} />;
  },
});
