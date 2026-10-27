import { careersContent, type CareersContent } from "@/content/careers";
import type { RawSection } from "@/lib/wordpress/content";

export function mergeCareers(
  base: CareersContent,
  sections: RawSection[]
): CareersContent {
  const next: CareersContent = structuredClone(base);
  
  next.whyWork = next.whyWork ?? base.whyWork;
  next.standOut = next.standOut ?? base.standOut;
  next.benefits = next.benefits ?? base.benefits;
  next.howWeHire = next.howWeHire ?? base.howWeHire;

  return next;
}