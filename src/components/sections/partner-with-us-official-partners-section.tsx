import { defineSection } from "@/lib/page-builder/types";
import type { PartnerWithUsOfficialPartnersSectionFragment } from "@/lib/wordpress/generated/graphql";
import { text } from "@/lib/wordpress/fields";
import Image from "next/image";
import Container from "../ui/container";

interface OfficialPartnerItem {
  title: string;
  description: string;
  iconUrl: string;
}

const DEFAULT_OFFICIAL_PARTNERS: OfficialPartnerItem[] = [
  {
    title: "Salesforce (CRM / RevOps)",
    description: "Lead-to-cash, CPQ/billing integrations, RevOps dashboards",
    iconUrl: "/icons/salesforce.svg",
  },
  {
    title: "NetSuite (ERP)",
    description: "Multi-entity finance at scale: P2P / O2C / R2R, rev-rec, approvals, real-time KPIs",
    iconUrl: "/icons/netsuite.svg",
  },
  {
    title: "Zoho (Suite)",
    description: "Books, People, Recruit, and Zoho One for integrated G&A with fast time-to-value",
    iconUrl: "/icons/zoho.svg",
  },
  {
    title: "Power BI (Analytics)",
    description: "Executive dashboards and self-serve analytics over ERP/HRIS/ATS/Payroll",
    iconUrl: "/icons/power-bi.svg",
  },
  {
    title: "ManageEngine (ITSM/IT Ops)",
    description: "HR + IT workflows for onboarding/offboarding, assets, and access",
    iconUrl: "/icons/manage-engine.svg",
  },
  {
    title: "Rippling (HRIS + Global Payroll)",
    description: "Unified HR, IT & finance workflows, multi-country payroll and provisioning",
    iconUrl: "/icons/rippling.svg",
  },
];

function cleanHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export function PartnerWithUsOfficialPartners({
  title = "Our Official <i>Partners</i>",
  items = DEFAULT_OFFICIAL_PARTNERS,
}: {
  title?: string;
  items?: OfficialPartnerItem[];
}) {
  const cleanTitle = title.trim();
  let before = cleanTitle;
  let highlight = "Partners";
  let after = "";

  if (cleanTitle.includes("<b>")) {
    const parts = cleanTitle.split(/<\/?b>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.includes("<span>")) {
    const parts = cleanTitle.split(/<\/?span>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.includes("<i>")) {
    const parts = cleanTitle.split(/<\/?i>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.toLowerCase().includes("partners")) {
    const idx = cleanTitle.toLowerCase().indexOf("partners");
    before = cleanTitle.slice(0, idx);
    highlight = cleanTitle.slice(idx, idx + "partners".length);
    after = cleanTitle.slice(idx + "partners".length);
  }

  return (
    <section className="bg-brand-blue text-white pt-14 sm:pt-16 lg:pt-20 pb-0 official-partners-section">
      <Container>
        <div className="wrapper">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] tracking-[-0.8px] capitalize">
              {before}
              {highlight && (
                <span className="italic font-bold">
                  {highlight}
                </span>
              )}
              {after}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/6 border border-white/7 rounded-[20px] p-8 sm:p-10 flex flex-col justify-between hover:border-white/8 transition-all duration-300 relative group overflow-hidden min-h-[170px] hover:shadow-[0px_2px_34px_0px_#FFFFFF1A]"
              >
                {/* Corner glowing ellipse matching Figma */}
                <div
                  className="pointer-events-none absolute -top-12 -left-12 w-[90px] h-[63px] rounded-full bg-brand-green opacity-80 blur-[90px] transition-opacity duration-300 group-hover:opacity-0"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-4 relative z-10">
                  <h3 className="text-xl sm:text-[30px] font-semibold text-white font-display">
                    {item.title}
                  </h3>
                  <div className="w-15 h-15 rounded-full border border-white/14 flex items-center justify-center shrink-0">
                    <Image
                      src={item.iconUrl}
                      alt={item.title}
                      width={22}
                      height={22}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>

                <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed mt-7">
                  {cleanHtml(item.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export const partnerWithUsOfficialPartnersSection = defineSection<PartnerWithUsOfficialPartnersSectionFragment>({
  layout: "PartnerWithUsOfficialPartnersSection",
  render: (data) => {
    const rawTitle = text(data.title) || "Our Official <i>Partners</i>";
    const items = DEFAULT_OFFICIAL_PARTNERS.map((defItem, idx) => ({
      ...defItem,
      iconUrl: defItem.iconUrl,
    }));

    return <PartnerWithUsOfficialPartners title={rawTitle} items={items} />;
  },
});
