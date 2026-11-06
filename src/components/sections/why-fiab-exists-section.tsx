import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabExistsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { WhyAbout } from "@/components/why/why-sections";
import { media, multilineText, text } from "@/lib/wordpress/fields";
import type { WhyContent } from "@/content/why-fiab";

/** `WhyFiabExistsSection` — Mission statement. */
export const whyFiabExistsSection = defineSection<WhyFiabExistsSectionFragment>({
  layout: "WhyFiabExistsSection",
  render: (data) => {
    const bgMedia = media(data.backgroundImage);
    const aboutSection: WhyContent["aboutSection"] = {
      bgImage: "/why/bg-color.png",
      image: bgMedia?.url || "/why/two-person.png",
      title: text(data.title, ""),
      text: multilineText(data.description, ""),
      missionLabel: text(data.missionSubTitle, ""),
      missionText: multilineText(data.missionContent, ""),
    };
    return <WhyAbout aboutSection={aboutSection} />;
  },
});

