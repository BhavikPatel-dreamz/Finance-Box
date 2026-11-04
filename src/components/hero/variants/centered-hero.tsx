import React from "react";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GreenButton } from "@/components/ui/green-button";
import Container from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function CenteredHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "green-no-dash");

  return (
    <Container className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {eyebrowData && (
          <Reveal immediate preset="slide-up" delay={80} distance={18}>
            <Eyebrow
              variant={eyebrowData.variant}
              className={eyebrowData.className || "mb-4 sm:mb-6"}
            >
              {eyebrowData.text}
            </Eyebrow>
          </Reveal>
        )}

        <Reveal immediate preset="slide-up" delay={220} distance={32}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-4 sm:mb-6">
            {config.title}{" "}
            {config.highlight && (
              <span className="text-[#23C55E]">{config.highlight}</span>
            )}
          </h1>
        </Reveal>

        {config.description && (
          <Reveal immediate preset="slide-up" delay={380} distance={24}>
            <p className="text-[14px] sm:text-[16px] font-light leading-[160%] text-white/80 max-w-2xl mb-8">
              {config.description}
            </p>
          </Reveal>
        )}

        {(config.primaryCta || config.secondaryCta) && (
          <Reveal immediate preset="slide-up" delay={500} distance={20}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {config.primaryCta && (
                <GreenButton
                  label={config.primaryCta.label}
                  href={config.primaryCta.url}
                  color={config.primaryCta.color || "green"}
                  onDark={true}
                  className={config.primaryCta.className}
                />
              )}
              {config.secondaryCta && (
                <GreenButton
                  label={config.secondaryCta.label}
                  href={config.secondaryCta.url}
                  color={config.secondaryCta.color || "white"}
                  bgColor={config.secondaryCta.bgColor}
                  textColor={config.secondaryCta.textColor}
                  className={config.secondaryCta.className}
                />
              )}
            </div>
          </Reveal>
        )}
      </div>
    </Container>
  );
}
