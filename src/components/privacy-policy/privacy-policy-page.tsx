import type { RawSection } from "@/lib/wordpress/content";
import { privacyPolicyContent } from "@/content/privacy-policy";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export function PrivacyPolicyPage({ sections = [] }: { sections?: RawSection[] }) {
  // sections are available for future CMS overrides
  return <LegalPageLayout content={privacyPolicyContent} />;
}
