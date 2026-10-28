import { peopleOperationsContent, type PeopleOperationsContent } from "@/content/people-operations";
import type { RawSection } from "@/lib/wordpress/content";

export function mergePeopleOperations(
  base: PeopleOperationsContent,
  sections: RawSection[]
): PeopleOperationsContent {
  const next: PeopleOperationsContent = structuredClone(base);
  next.intro = next.intro ?? base.intro;
  next.whatWeDo = next.whatWeDo ?? base.whatWeDo;
  next.whereWeHelp = next.whereWeHelp ?? base.whereWeHelp; // Naya
  return next;
}