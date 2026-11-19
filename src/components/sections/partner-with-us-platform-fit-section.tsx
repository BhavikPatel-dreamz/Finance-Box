import { defineSection } from "@/lib/page-builder/types";
import type { PartnerWithUsPlatformFitSectionFragment } from "@/lib/wordpress/generated/graphql";
import { text } from "@/lib/wordpress/fields";
import Image from "next/image";
import Container from "../ui/container";

interface PlatformFitItem {
  title: string;
  description: string;
  iconUrl: string;
  isWhiteIcon?: boolean;
}

const DEFAULT_PLATFORMS: PlatformFitItem[] = [
  {
    title: "Scaling finance / multi-entity",
    description: "NetSuite",
    iconUrl: "/icons/scalling-finance.svg",
  },
  {
    title: "Integrated SMB suite",
    description: "Zoho (Books / People / Recruit / One)",
    iconUrl: "/icons/Integrated-SMB-suite.svg",
  },
  {
    title: "CRM/RevOps alignment",
    description: "Salesforce (+ CPQ/billing integrations)",
    iconUrl: "/icons/CRM-RevOps-alignment.svg",
  },
  {
    title: "HRIS + Global Payroll",
    description: "Rippling, ADP, Gusto",
    iconUrl: "/icons/HRIS-Global-Payroll.svg",
  },
  {
    title: "HRMS + Payroll (India-first)",
    description: "Keka",
    iconUrl: "/icons/HRMS-Payroll.svg",
  },
  {
    title: "ITSM tied to People Ops",
    description: "ManageEngine",
    iconUrl: "/icons/ITSM-tied-to-People-Ops.svg",
  },
  {
    title: "Executive analytics",
    description: "Power BI",
    iconUrl: "/icons/Executive-analytics.svg",
  },
  {
    title: "Early-stage accounting",
    description: "QuickBooks (with a path to NetSuite)",
    iconUrl: "/icons/Early-stage-accounting.svg",
  },
];

export function PartnerWithUsPlatformFit({
  title = "Platform Fit <span>by need</span>",
  items = DEFAULT_PLATFORMS,
}: {
  title?: string;
  items?: PlatformFitItem[];
}) {
  const cleanTitle = title.trim();
  let before = cleanTitle;
  let highlight = "by need";
  let after = "";

  if (cleanTitle.includes("<span>")) {
    const parts = cleanTitle.split(/<\/?span>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.includes("<b>")) {
    const parts = cleanTitle.split(/<\/?b>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.includes("<i>")) {
    const parts = cleanTitle.split(/<\/?i>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.toLowerCase().includes("by need")) {
    const idx = cleanTitle.toLowerCase().indexOf("by need");
    before = cleanTitle.slice(0, idx);
    highlight = cleanTitle.slice(idx, idx + "by need".length);
    after = cleanTitle.slice(idx + "by need".length);
  }

  return (
    <section className="bg-white text-brand-blue py-14 sm:py-16 lg:py-20 partner-with-platform-fit-section">
      <Container>
        <div className="bg-brand-sand/50 lg:px-12.5 sm:px-10 px-5 py-14 sm:py-16 lg:py-20 rounded-[10px]">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] tracking-[-0.8px]">
              {before}
              {highlight && (
                <span className="text-brand-green italic font-bold">
                  {highlight}
                </span>
              )}
              {after}
            </h2>
          </div>

          <div className="space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-white text-brand-blue rounded-[10px] overflow-hidden">
              {items.slice(0, 4).map((item, idx) => (
                <div key={idx} className="p-8 flex flex-col justify-start">
                  <div className="w-15 h-15 rounded-full border border-[#1219280D] flex items-center justify-center mb-5 text-brand-blue shrink-0">
                    <Image
                      src={item.iconUrl}
                      alt={item.title}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-blue mb-1 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-blue/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-white text-brand-blue rounded-[10px] overflow-hidden">
              {items.slice(4, 8).map((item, idx) => (
                <div key={idx + 4} className="p-8 flex flex-col justify-start">
                  <div className="w-15 h-15 rounded-full border border-[#1219280D] flex items-center justify-center mb-5 text-brand-blue shrink-0">
                    <Image
                      src={item.iconUrl}
                      alt={item.title}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-blue mb-1 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-blue/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export const partnerWithUsPlatformFitSection = defineSection<PartnerWithUsPlatformFitSectionFragment>({
  layout: "PartnerWithUsPlatformFitSection",
  render: (data) => {
    const rawTitle = text(data.title) || "Platform Fit <span>by need</span>";
    const items = (data.platformFits && data.platformFits.length > 0)
      ? data.platformFits.map((pf, idx) => ({
          title: text(pf?.title) || DEFAULT_PLATFORMS[idx % DEFAULT_PLATFORMS.length].title,
          description: text(pf?.description) || DEFAULT_PLATFORMS[idx % DEFAULT_PLATFORMS.length].description,
          iconUrl: pf?.icon?.node?.sourceUrl || DEFAULT_PLATFORMS[idx % DEFAULT_PLATFORMS.length].iconUrl,
        }))
      : DEFAULT_PLATFORMS;

    return <PartnerWithUsPlatformFit title={rawTitle} items={items} />;
  },
});
