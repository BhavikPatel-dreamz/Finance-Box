import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { privacyPolicyContent } from "@/content/privacy-policy";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";

// Static legal page: there is no WordPress page for it, so it is not part of the page builder.
export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  return <LegalPageLayout content={privacyPolicyContent} chrome={await getSiteChrome()} />;
}
