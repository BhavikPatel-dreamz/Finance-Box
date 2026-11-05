import { defineSection } from "@/lib/page-builder/types";
import type { HomeBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { link, splitEmphasis, text } from "@/lib/wordpress/fields";

function parseStatValue(raw: unknown): { value: string; unit: string } {
  if (typeof raw !== "string") return { value: "", unit: "" };
  const match = raw.match(/<(span|b|strong)[^>]*>([\s\S]*?)<\/\1>([\s\S]*)/i);
  if (match) {
    const value = text(match[2], "");
    const unit = text(match[3], "");
    return { value: value || "", unit: unit || "" };
  }
  const clean = text(raw, "");
  const idx = clean.indexOf(" ");
  if (idx > 0) {
    return { value: clean.slice(0, idx).trim(), unit: clean.slice(idx + 1).trim() };
  }
  return { value: clean, unit: "" };
}

/** `HomeBannerSection` — Home hero with stat cards and chart. */
export const homeBannerSection = defineSection<HomeBannerSectionFragment>({
  layout: "HomeBannerSection",
  hero: true,
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const [first, second] = data.statCards ?? [];
    const close = parseStatValue(first?.value);
    const runway = parseStatValue(second?.value);

    const primary = data.ctaButton
      ? { label: text(data.ctaButton.title), url: text(data.ctaButton.url), color: "white" }
      : undefined;
    const floating = data.floatingCtaButton
      ? { label: text(data.floatingCtaButton.title), url: text(data.floatingCtaButton.url), color: "green", onDark: true }
      : undefined;

    return (
      <HeroSection
        page="home"
        overrides={{
          eyebrow: text(data.subTitle),
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          description: text(data.description),
          primaryCta: primary,
          closeLabel: text(first?.label),
          closeValue: close.value,
          closeUnit: close.unit,
          closeTrend: text(first?.note),
          runwayLabel: text(second?.label),
          runwayValue: runway.value,
          runwayUnit: runway.unit,
          runwayTrend: text(second?.note),
          chartTitle: "",
          floatingCta: floating,
        }}
      />
    );
  },
});