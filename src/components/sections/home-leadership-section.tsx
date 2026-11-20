import { defineSection } from "@/lib/page-builder/types";
import type { HomeLeadershipSectionFragment } from "@/lib/wordpress/generated/graphql";
import { Leadership } from "@/components/home/leadership";
import { media, multilineText, text } from "@/lib/wordpress/fields";

/** `HomeLeadershipSection` — Leadership slider and team. */
export const homeLeadershipSection = defineSection<HomeLeadershipSectionFragment>({
  layout: "HomeLeadershipSection",
  render: (data) => {
    const slides = data.slides ?? [];
    const titles = Array.from(new Set(slides.map((slide) => text(slide?.title)).filter(Boolean)));
    const descriptions = Array.from(new Set(slides.map((slide) => multilineText(slide?.description)).filter(Boolean)));

    const people = (data.teamMembersList ?? []).map((member) => {
      const name = text(member?.name);
      return {
        image: media(member?.image),
        name,
        role: text(member?.designation),
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      };
    });

    return (
      <Leadership
        leadership={{
          eyebrow: text(data.subTitle),
          title: titles[0] ?? "",
          text: descriptions[0] ?? "",
          cta: { label: "", url: "" },
          people,
        }}
      />
    );
  },
});