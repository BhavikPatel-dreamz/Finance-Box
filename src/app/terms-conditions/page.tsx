import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { termsConditionsContent } from "@/content/terms-conditions";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";

// Static legal page: there is no WordPress page for it, so it is not part of the page builder.
export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms-conditions" },
};

export default async function TermsConditionsPage() {
  return <LegalPageLayout content={termsConditionsContent} chrome={await getSiteChrome()} />;
}
