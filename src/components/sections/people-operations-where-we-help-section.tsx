import { defineSection } from "@/lib/page-builder/types";
import type { PeopleOperationsWhereWeHelpSectionFragment } from "@/lib/wordpress/generated/graphql";
import { PeopleOperationsWhereWeHelp } from "@/components/people-operations/people-operations-sections";
import { splitEmphasis, text } from "@/lib/wordpress/fields";

/** `PeopleOperationsWhereWeHelpSection` — Help area cards. */
export const peopleOperationsWhereWeHelpSection = defineSection<PeopleOperationsWhereWeHelpSectionFragment>({
  layout: "PeopleOperationsWhereWeHelpSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    return (
      <PeopleOperationsWhereWeHelp
        whereWeHelp={{
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          cards: (data.helpItems ?? []).map((item) => ({
            title: text(item?.title),
            text: text(item?.description),
          })),
        }}
      />
    );
  },
});