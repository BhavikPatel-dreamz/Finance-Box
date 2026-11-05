import { defineSection } from "@/lib/page-builder/types";
import type { PeopleOperationsWhatWeDoSectionFragment } from "@/lib/wordpress/generated/graphql";
import { PeopleOperationsWhatWeDo } from "@/components/people-operations/people-operations-sections";
import { listItems, media, text } from "@/lib/wordpress/fields";

/** `PeopleOperationsWhatWeDoSection` — Alternating service rows. */
export const peopleOperationsWhatWeDoSection = defineSection<PeopleOperationsWhatWeDoSectionFragment>({
  layout: "PeopleOperationsWhatWeDoSection",
  render: (data) => {
    const title = text(data.title);
    const items = (data.whatWeDoItems ?? []).map((item, index) => {
      const image = media(item?.image);
      return {
        title: text(item?.title),
        text: text(item?.description),
        bullets: listItems(item?.points),
        image: image?.url ?? "",
        bgImage: image?.url ?? "",
        reverse: index % 2 === 1,
      };
    }).filter((item) => item.title || item.text);
    if (!title || items.length === 0) return null;
    return <PeopleOperationsWhatWeDo whatWeDo={{ title, items }} />;
  },
});
