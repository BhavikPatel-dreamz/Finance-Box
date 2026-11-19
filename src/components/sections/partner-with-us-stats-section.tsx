import { defineSection } from "@/lib/page-builder/types";
import type { PartnerWithUsStatsSectionFragment } from "@/lib/wordpress/generated/graphql";
import Image from "next/image";
import Container from "../ui/container";

interface StatItem {
  iconUrl: string;
  title: string;
  description: string;
}

const DEFAULT_STATS: StatItem[] = [
  {
    iconUrl: "/icons/time-saved.svg",
    title: "Time Saved",
    description: "on close, payroll, onboarding, recruiting cycles",
  },
  {
    iconUrl: "/icons/growth-chart.svg",
    title: "$ Saved",
    description: "via automation + right-sized licensing + clean integrations",
  },
  {
    iconUrl: "/icons/user-circle.svg",
    title: "Avg Go-Live",
    description: "by scope (finance, HR/payroll, recruiting, ITSM)",
  },
];

export function PartnerWithUsStats({ stats = DEFAULT_STATS }: { stats?: StatItem[] }) {
  return (
    <section className="bg-white text-brand-blue pt-14 sm:pt-16 lg:pt-20 pb-0 partner-stats-section">
      <Container>
        {/* Outer light container */}
        <div className="bg-brand-sand/50 rounded-[10px] p-5 sm:p-7 md:p-12.5">
          {/* Inner white card */}
          <div className="bg-white rounded-[10px]">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 md:px-9.25 md:py-7.5 flex flex-col justify-start items-start"
                >
                  <div className="w-15 h-15 rounded-full border border-[#1219280D] flex items-center justify-center mb-5 shrink-0">
                    <Image
                      src={stat.iconUrl}
                      alt={stat.title}
                      width={26}
                      height={26}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="text-base sm:text-lg font-semibold text-brand-blue mb-2 font-display">
                      {stat.title}
                    </h3>
                    <p className="text-sm text-brand-blue/70 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export const partnerWithUsStatsSection = defineSection<PartnerWithUsStatsSectionFragment>({
  layout: "PartnerWithUsStatsSection",
  render: (data) => {
    const dynamicStats = data.stats && data.stats.length > 0 && data.stats[0]?.label
      ? data.stats.map((s, i) => ({
          iconUrl: DEFAULT_STATS[i % DEFAULT_STATS.length].iconUrl,
          title: s?.number || DEFAULT_STATS[i % DEFAULT_STATS.length].title,
          description: s?.label || DEFAULT_STATS[i % DEFAULT_STATS.length].description,
        }))
      : DEFAULT_STATS;

    return <PartnerWithUsStats stats={dynamicStats} />;
  },
});
