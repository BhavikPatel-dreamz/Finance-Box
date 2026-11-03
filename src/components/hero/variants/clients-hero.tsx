import React from "react";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import Container from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function ClientsHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "dark-no-dash");

  return (
    <Container>
      {/* Centered Heading */}
      <div className="pt-10 md:pt-12 xl:pt-24 pb-10 sm:pb-12 xl:pb-20 flex flex-col items-center text-center">
        {eyebrowData && (
          <Reveal immediate preset="slide-up" delay={80} distance={18}>
            <Eyebrow
              variant={eyebrowData.variant}
              className={eyebrowData.className || "mb-6"}
            >
              {eyebrowData.text}
            </Eyebrow>
          </Reveal>
        )}

        <Reveal immediate preset="slide-up" delay={220} distance={32}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium leading-[1.12] tracking-tight text-white">
            {config.title}
            {config.highlight && (
              <span className="font-extrabold italic"> {config.highlight}</span>
            )}
          </h1>
        </Reveal>

        {config.description && (
          <Reveal immediate preset="slide-up" delay={380} distance={24}>
            <p className="mt-4 sm:mt-6 lg:mt-8 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[1.65] text-white/80 max-w-2xl">
              {config.description}
            </p>
          </Reveal>
        )}
      </div>

      {/* Client Proof Banner & Stats Strip */}
      {(config.clientProofItems || config.stats) && (
        <Reveal
          immediate
          preset="slide-up"
          delay={520}
          distance={28}
          className="w-full overflow-hidden rounded-[16px] lg:rounded-none border border-white/10 lg:border-x-0 backdrop-blur-[3px] bg-black/[0.03] mb-12 sm:mb-16 xl:mb-20"
          style={{ WebkitBackdropFilter: "blur(3px)" }}
        >
          <div className="w-full backdrop-blur-md flex flex-col lg:flex-row">
            {/* Left Proof Column */}
            {config.clientProofItems && (
              <div className="flex-1 px-5 py-6 sm:py-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                {config.clientProofTitle && (
                  <Eyebrow variant="green-no-dash" className="mb-4 sm:mb-6 lg:mb-8">
                    {config.clientProofTitle}
                  </Eyebrow>
                )}
                <ul className="space-y-1 sm:space-y-1.5">
                  {config.clientProofItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold leading-[130%]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Right 3 Stats Columns */}
            {config.stats && (
              <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                {config.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between p-6 sm:p-6 lg:p-8 text-left"
                  >
                    <p className="text-4xl sm:text-4xl lg:text-[52px] font-semibold leading-[100%] tracking-[-0.8px]">
                      {stat.value}
                    </p>
                    <p className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      )}
    </Container>
  );
}
