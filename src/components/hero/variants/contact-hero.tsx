import React from "react";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GreenButton } from "@/components/ui/green-button";
import Container from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function ContactHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "green-no-dash");

  return (
    <Container className="flex-1 flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-0">
        {eyebrowData && (
          <Reveal immediate preset="slide-up" delay={80} distance={18}>
            <Eyebrow
              variant="white-no-dash"
              className={eyebrowData.className || "mb-4 sm:mb-6 lg:mb-8"}
            >
              {eyebrowData.text}
            </Eyebrow>
          </Reveal>
        )}

        <Reveal immediate preset="slide-up" delay={220} distance={32}>
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-4 sm:mb-6 lg:mb-8">
            {config.title}{" "}
            {config.highlight && (
              <span className="text-[#23C55E]">{config.highlight}</span>
            )}
          </h1>
        </Reveal>

        {config.description && (
          <Reveal immediate preset="slide-up" delay={380} distance={24}>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/80 max-w-[800px] px-2">
              {config.description}
            </p>
          </Reveal>
        )}

        {config.primaryCta && (
          <Reveal immediate preset="slide-up" delay={500} distance={20}>
            <div className="mt-8">
              <GreenButton
                label={config.primaryCta.label}
                href={config.primaryCta.url}
                color={config.primaryCta.color || "green"}
                bgColor={config.primaryCta.bgColor}
                textColor={config.primaryCta.textColor}
                onDark={true}
                className={config.primaryCta.className}
              />
            </div>
          </Reveal>
        )}
      </div>
    </Container>
  );
}
