import { defineSection } from "@/lib/page-builder/types";
import type { ServicesBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HeroSection } from "@/components/hero";
import { mergeServices } from "@/components/services/merge";
import { servicesContent } from "@/content/services";

/** `ServicesBannerSection` — Services hero with tier cards. */
export const servicesBannerSection = defineSection<ServicesBannerSectionFragment>({
  layout: "ServicesBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeServices, servicesContent, data);
    return (
      <HeroSection
        page="services"
        headerNode={header}
        overrides={{
          eyebrow: content.hero.eyebrow,
          title: content.hero.title,
          highlight: content.hero.highlight,
          description: content.hero.text,
          primaryCta: content.hero.primary
            ? {
                label: content.hero.primary.label,
                url: content.hero.primary.url,
                color: "white",
                bgColor: "#ffffff",
                textColor: "#07110d",
              }
            : undefined,
          tiers: content.hero.tiers,
        }}
      />
    );
  },
});
