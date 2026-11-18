import { defineSection } from "@/lib/page-builder/types";
import type { CommonBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { TeamHero } from "@/components/team/team-sections";
import { listItems, media, multilineText, splitEmphasis, text } from "@/lib/wordpress/fields";
import { slugFromUri } from "@/lib/wordpress/paths";
import type { HeroPageKey } from "@/components/hero/types";

function resolvePageKey(uri?: string): HeroPageKey | "team-member" {
  const slug = slugFromUri(uri);
  if (slug === "careers") return "careers";
  if (slug === "agentic-ai") return "agentic-ai";
  if (slug === "people-operations") return "people-operations";
  if (slug === "team-member" || slug === "team-members") return "team-member";
  return "knowledge-hub";
}

/** `CommonBannerSection` — shared inner-page hero. */
export const commonBannerSection = defineSection<CommonBannerSectionFragment>({
  layout: "CommonBannerSection",
  hero: true,
  render: (data, context) => {
    const titleParts = splitEmphasis(data.title);
    const page = resolvePageKey(context?.uri);
    const backgroundImage = media(data.backgroundImage)?.url;

    if (page === "team-member") {
      const paragraphs = multilineText(data.description).split("\n\n").filter(Boolean);
      return (
        <TeamHero
          hero={{
            eyebrow: text(data.subTitle, "TEAM MEMBER"),
            title: titleParts ? titleParts.before.trim() : (text(data.title) || "Experts Behind Your"),
            highlight: titleParts ? titleParts.emphasis : "Back-Office Transformation",
            paragraphs:
              paragraphs.length > 0
                ? paragraphs
                : [
                    "We pair senior operators with automation‑first thinking.",
                    "The result? Reliable finance and operations, faster closes, and decisions you can trust.",
                  ],
            backgroundImage: backgroundImage || "/team-members-hero-bg.webp",
          }}
        />
      );
    }

    const titleMaxWidth = page === "people-operations" ? "lg:max-w-[590px] md:max-w-[90%]" : "lg:max-w-[480px]";

    return (
      <HeroSection
        page={page}
        overrides={{
          variant: page === "careers" ? "careers" : "agentic-ai",
          // Use the WordPress "Background Image" when set; otherwise keep the
          // hero's existing default background.
          ...(backgroundImage ? { background: backgroundImage } : {}),
          eyebrow: text(data.subTitle),
          title: titleParts
            ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
            : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          titleMaxWidth,
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
