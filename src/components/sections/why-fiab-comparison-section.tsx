import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabComparisonSectionFragment } from "@/lib/wordpress/generated/graphql";
import { WhyCompare } from "@/components/why/why-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";
import type { WhyContent } from "@/content/why-fiab";

export const whyFiabComparisonSection = defineSection<WhyFiabComparisonSectionFragment>({
  layout: "WhyFiabComparisonSection",
  render: (data) => {
    const columns = [
      { label: text("Finance", ""), featured: true, logo: media(data.fiabLogo) ?? null },
      { label: text(data.softwarePlatformLabel || "Software Platform", ""), featured: false, logo: null },
      { label: text(data.freelanceCfoLabel || "Freelance CFO", ""), featured: false, logo: null },
      { label: text(data.inHouseHireLabel || "In House Hire", ""), featured: false, logo: null },
    ];
    const rows = Array.isArray(data.comparisonRows)
      ? data.comparisonRows.map((r: any) => ({
          label: text(r?.feature, ""),
          values: [!!r?.fiab, !!r?.softwarePlatform, !!r?.freelanceCfo, !!r?.inHouseHire],
        }))
      : [];
    return (
      <WhyCompare
        compare={{
          title: (splitEmphasis(data.title)
            ? [splitEmphasis(data.title)!.before, splitEmphasis(data.title)!.after].filter(Boolean).join(" ").trim()
            : text(data.title, "")) || "",
          highlight: splitEmphasis(data.title)?.emphasis || "",
          text: text(data.description, ""),
          featureLabel: text(data.featuresColumnLabel || "Features", ""),
          columns,
          rows,
        }}
      />
    );
  },
});
