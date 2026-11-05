import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabExistsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { WhyAbout } from "@/components/why/why-sections";
import { media, text } from "@/lib/wordpress/fields";
import type { WhyContent } from "@/content/why-fiab";

/** `WhyFiabExistsSection` — Mission statement. */
export const whyFiabExistsSection = defineSection<WhyFiabExistsSectionFragment>({
  layout: "WhyFiabExistsSection",
  render: (data) => {
    const aboutSection: WhyContent["aboutSection"] = {
      bgImage: "/why/bg-color.png",
      image: "",
      title: text(data.title, ""),
      text: text(data.description, ""),
      missionLabel: text(data.missionSubTitle, ""),
      missionText: text(data.missionContent, ""),
    };
    return <WhyAbout aboutSection={aboutSection} />;
  },
});
