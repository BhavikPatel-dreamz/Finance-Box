import { defineSection } from "@/lib/page-builder/types";
import type { PartnerWithUsWhoWePartnerWithSectionFragment } from "@/lib/wordpress/generated/graphql";
import { text } from "@/lib/wordpress/fields";
import Image from "next/image";
import Container from "../ui/container";

interface PartnerTypeItem {
  title: string;
  description: string;
  iconUrl: string;
}

const DEFAULT_PARTNER_TYPES: PartnerTypeItem[] = [
  {
    title: "Platform vendors",
    description: "(ERP, HRIS, Payroll, ATS, ITSM) seeking proven implementers + managed services",
    iconUrl: "/icons/platform-vendors.svg",
  },
  {
    title: "Systems Integrators",
    description: "Needing capacity, specialization, or US↔India delivery",
    iconUrl: "/icons/system-integration.svg",
  },
  {
    title: "VC/PE & Accelerators",
    description: "Standardizing portfolio back offices",
    iconUrl: "/icons/vc-pe-accelators.svg",
  },
  {
    title: "Accounting & Fractional CFO firms",
    description: "Expanding into automation & run-state execution",
    iconUrl: "/icons/account-fractional.svg",
  },
];

function cleanHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export function PartnerWithUsWhoWePartnerWith({
  title = "Who we <span>Partner with?</span>",
  items = DEFAULT_PARTNER_TYPES,
}: {
  title?: string;
  items?: PartnerTypeItem[];
}) {
  const cleanTitle = title.trim();
  let before = cleanTitle;
  let highlight = "Partner with?";
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
  } else if (cleanTitle.toLowerCase().includes("partner with?")) {
    const idx = cleanTitle.toLowerCase().indexOf("partner with?");
    before = cleanTitle.slice(0, idx);
    highlight = cleanTitle.slice(idx, idx + "partner with?".length);
    after = cleanTitle.slice(idx + "partner with?".length);
  }

  return (
    <section className="bg-white text-brand-blue pt-14 sm:pt-16 lg:pt-20 pb-0 who-we-partner-section">
      <Container>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-brand-blue border border-white/8 rounded-[16px] p-8 sm:p-10 flex flex-col justify-between hover:border-white/16 transition-all duration-300 relative group overflow-hidden min-h-[170px] hover:shadow-[0px_2px_34px_0px_#FFFFFF1A]"
            >
              {/* Corner glowing ellipse matching Figma */}
              <div
                className="pointer-events-none absolute -top-12 -left-12 w-40 h-40 rounded-full bg-brand-green opacity-80 blur-[90px] transition-opacity duration-300 group-hover:opacity-0"
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-4 relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {item.title}
                </h3>
                <div className="w-11 h-11 rounded-full bg-[#1C2536] border border-[#2D3748] flex items-center justify-center shrink-0">
                  <Image
                    src={item.iconUrl}
                    alt={item.title}
                    width={22}
                    height={22}
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed mt-4 relative z-10">
                {cleanHtml(item.description)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export const partnerWithUsWhoWePartnerWithSection = defineSection<PartnerWithUsWhoWePartnerWithSectionFragment>({
  layout: "PartnerWithUsWhoWePartnerWithSection",
  render: (data) => {
    const rawTitle = text(data.title) || "Who we <span>Partner with?</span>";
    const items = (data.partnerTypes && data.partnerTypes.length > 0)
      ? data.partnerTypes.map((pt, idx) => ({
          title: text(pt?.title) || DEFAULT_PARTNER_TYPES[idx % DEFAULT_PARTNER_TYPES.length].title,
          description: text(pt?.description) || DEFAULT_PARTNER_TYPES[idx % DEFAULT_PARTNER_TYPES.length].description,
          iconUrl: DEFAULT_PARTNER_TYPES[idx % DEFAULT_PARTNER_TYPES.length].iconUrl,
        }))
      : DEFAULT_PARTNER_TYPES;

    return <PartnerWithUsWhoWePartnerWith title={rawTitle} items={items} />;
  },
});
