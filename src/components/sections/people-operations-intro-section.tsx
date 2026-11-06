import { defineSection } from "@/lib/page-builder/types";
import type { PeopleOperationsIntroSectionFragment } from "@/lib/wordpress/generated/graphql";
import { PeopleOperationsIntro } from "@/components/people-operations/people-operations-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `PeopleOperationsIntroSection` — Image with intro text. */
export const peopleOperationsIntroSection = defineSection<PeopleOperationsIntroSectionFragment>({
  layout: "PeopleOperationsIntroSection",
  render: (data) => {
    const image = media(data.image);
    const titleParts = splitEmphasis(data.title);
    let title = text(data.title);
    let highlight = "";

    if (titleParts) {
      title = [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim();
      highlight = titleParts.emphasis;
    } else {
      const target = "need to build and manage an effective people function.";
      if (title.toLowerCase().includes(target.toLowerCase())) {
        const idx = title.toLowerCase().indexOf(target.toLowerCase());
        highlight = title.slice(idx, idx + target.length);
        title = title.slice(0, idx).trim();
      }
    }

    if (!image || !title) return null;
    return (
      <PeopleOperationsIntro
        intro={{
          image: image.url,
          title,
          highlight,
          text: text(data.description),
        }}
      />
    );
  },
});

