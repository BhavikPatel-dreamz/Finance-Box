import { defineSection } from "@/lib/page-builder/types";
import type { PeopleOperationsWhereWeHelpSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { PeopleOperationsWhereWeHelp } from "@/components/people-operations/people-operations-sections";
import { mergePeopleOperations } from "@/components/people-operations/merge";
import { peopleOperationsContent } from "@/content/people-operations";

/** `PeopleOperationsWhereWeHelpSection` — Help area cards. */
export const peopleOperationsWhereWeHelpSection = defineSection<PeopleOperationsWhereWeHelpSectionFragment>({
  layout: "PeopleOperationsWhereWeHelpSection",
  render: (data) => {
    const content = fromSection(mergePeopleOperations, peopleOperationsContent, data);
    return <PeopleOperationsWhereWeHelp whereWeHelp={content.whereWeHelp} />;
  },
});
