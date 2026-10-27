import { contactUsContent, type ContactUsContent } from "@/content/contact-us";
import type { RawSection } from "@/lib/wordpress/content";

export function mergeContactUs(
  base: ContactUsContent,
  sections: RawSection[]
): ContactUsContent {
  const next: ContactUsContent = structuredClone(base);
  return next;
}