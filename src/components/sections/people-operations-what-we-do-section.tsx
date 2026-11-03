import { defineSection } from "@/lib/page-builder/types";
import type { PeopleOperationsWhatWeDoSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { PeopleOperationsWhatWeDo } from "@/components/people-operations/people-operations-sections";
import { mergePeopleOperations } from "@/components/people-operations/merge";
import { peopleOperationsContent } from "@/content/people-operations";

/** `PeopleOperationsWhatWeDoSection` — Alternating service rows. */
export const peopleOperationsWhatWeDoSection = defineSection<PeopleOperationsWhatWeDoSectionFragment>({
  layout: "PeopleOperationsWhatWeDoSection",
  render: (data) => {
    const content = fromSection(mergePeopleOperations, peopleOperationsContent, data);
    return <PeopleOperationsWhatWeDo whatWeDo={content.whatWeDo} />;
  },
});
