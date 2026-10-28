import { agenticAiContent, type AgenticAiContent } from "@/content/agentic-ai";
import type { RawSection } from "@/lib/wordpress/content";

export function mergeAgenticAi(
  base: AgenticAiContent,
  sections: RawSection[]
): AgenticAiContent {
  const next: AgenticAiContent = structuredClone(base);
  
  next.whatIs = next.whatIs ?? base.whatIs;
  next.buildYourOwn = next.buildYourOwn ?? base.buildYourOwn;
  next.peopleOps = next.peopleOps ?? base.peopleOps;
  next.opsCompliance = next.opsCompliance ?? base.opsCompliance;
  next.partners = next.partners ?? base.partners;
  next.provenArchitecture = next.provenArchitecture ?? base.provenArchitecture;
  next.waitlist = next.waitlist ?? base.waitlist;
  next.faq = next.faq ?? base.faq; // Naya

  return next;
}