import { defineSection } from "@/lib/page-builder/types";
import type { CommonBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { listItems, media, splitEmphasis, text } from "@/lib/wordpress/fields";
import { slugFromUri } from "@/lib/wordpress/paths";
import type { HeroPageKey } from "@/components/hero/types";

function resolvePageKey(uri?: string): HeroPageKey {
  const slug = slugFromUri(uri);
  if (slug === "careers") return "careers";
  if (slug === "agentic-ai") return "agentic-ai";
  if (slug === "people-operations") return "people-operations";
  return "knowledge-hub";
}

/** `CommonBannerSection` — shared inner-page hero. */
export const commonBannerSection = defineSection<CommonBannerSectionFragment>({
  layout: "CommonBannerSection",
  hero: true,
  render: (data, context) => {
    const titleParts = splitEmphasis(data.title);
    const page = resolvePageKey(context?.uri);
    const bgImage = media(data.backgroundImage)?.url;

    return (
      <HeroSection
        page={page}
        overrides={{
          variant: page === "careers" ? "careers" : "agentic-ai",
          background: bgImage || undefined,
          eyebrow: text(data.subTitle),
          title: titleParts
            ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
            : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          titleMaxWidth: "lg:max-w-[587px]",
          tagLine: text(data.tagLine),
          description: page === "careers" ? text(data.description) : "",
          bullets: listItems(data.description),
          rightDescription:
            page !== "careers" && listItems(data.description).length === 0 ? text(data.description) : "",
          primaryCta: data.ctaButton
            ? {
                label: text(data.ctaButton.title),
                url: text(data.ctaButton.url),
                color: "white",
                onDark: true,
              }
            : undefined,
        }}
      />
    );
  },
});