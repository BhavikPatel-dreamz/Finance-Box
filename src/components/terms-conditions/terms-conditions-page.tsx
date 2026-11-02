import type { RawSection } from "@/lib/wordpress/content";
import { termsConditionsContent } from "@/content/terms-conditions";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export function TermsConditionsPage({ sections = [] }: { sections?: RawSection[] }) {
  // sections are available for future CMS overrides
  return <LegalPageLayout content={termsConditionsContent} />;
}
