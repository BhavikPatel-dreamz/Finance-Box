import { defineSection } from "@/lib/page-builder/types";
import type { PeopleOperationsIntroSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { PeopleOperationsIntro } from "@/components/people-operations/people-operations-sections";
import { mergePeopleOperations } from "@/components/people-operations/merge";
import { peopleOperationsContent } from "@/content/people-operations";

/** `PeopleOperationsIntroSection` — Image with intro text. */
export const peopleOperationsIntroSection = defineSection<PeopleOperationsIntroSectionFragment>({
  layout: "PeopleOperationsIntroSection",
  render: (data) => {
    const content = fromSection(mergePeopleOperations, peopleOperationsContent, data);
    return <PeopleOperationsIntro intro={content.intro} />;
  },
});
