import { knowledgeHubContent, type KnowledgeHubContent } from "@/content/knowledge-hub";
import type { RawSection } from "@/lib/wordpress/content";

export function mergeKnowledgeHub(
  base: KnowledgeHubContent,
  sections: RawSection[]
): KnowledgeHubContent {
  const next: KnowledgeHubContent = structuredClone(base);
  
  next.blogs = next.blogs ?? base.blogs;
  next.resources = next.resources ?? base.resources;
  next.caseStudy = next.caseStudy ?? base.caseStudy;
  next.newsletter = next.newsletter ?? base.newsletter; // Naya

  return next;
}