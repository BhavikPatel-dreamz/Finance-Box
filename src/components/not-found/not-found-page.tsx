import { HeroSection } from "@/components/hero";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import type { SiteChrome } from "@/lib/wordpress/site-chrome";

export function NotFoundPage({ chrome }: { chrome: SiteChrome }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#07110d] text-white selection:bg-[#23C55E]/30 selection:text-white overflow-x-clip">
      {/* 404 Hero Section */}
      <HeroSection
        page="not-found"
        headerNode={<SiteHeader header={chrome.header} />}
      />

      {/* Site Footer */}
      <SiteFooter footer={chrome.footer} />
    </div>
  );
}
