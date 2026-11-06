import { defineSection } from "@/lib/page-builder/types";
import type { PeopleOperationsIntroSectionFragment } from "@/lib/wordpress/generated/graphql";
import { PeopleOperationsIntro } from "@/components/people-operations/people-operations-sections";
import { media, text } from "@/lib/wordpress/fields";

/** `PeopleOperationsIntroSection` — Image with intro text. */
export const peopleOperationsIntroSection = defineSection<PeopleOperationsIntroSectionFragment>({
  layout: "PeopleOperationsIntroSection",
  render: (data) => {
    const image = media(data.image);
    const title = text(data.title);
    if (!image || !title) return null;
    return (
      <PeopleOperationsIntro
        intro={{
          image: image.url,
          title,
          highlight: "",
          text: text(data.description),
        }}
      />
    );
  },
});
