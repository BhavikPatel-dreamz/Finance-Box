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
      <div className="mx-auto max-w-[1140px]">
      {/* Centered Heading */}
      <div className="pt-10 md:pt-12 xl:pt-24 pb-10 sm:pb-12 xl:pb-15 flex flex-col items-center text-center">
        {eyebrowData && (
          <Reveal immediate preset="slide-up" delay={80} distance={18}>
            <Eyebrow
              className={eyebrowData.className || "mb-5"}
              variant="green"
              noDash
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
            <p className="mt-4 sm:mt-5 lg:mt-4 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[1.65] text-white/80 max-w-172.5">
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
            className="w-full overflow-hidden rounded-[16px] lg:rounded-none border border-white/10 lg:border-x-0 backdrop-blur-[3px] bg-black/[0.03] mb-12 sm:mb-16 lg:mb-27"
          style={{ WebkitBackdropFilter: "blur(3px)" }}
        >
          <div className="w-full backdrop-blur-md flex flex-col lg:flex-row">
            {/* Left Proof Column */}
            {config.clientProofItems && (
              <div className="flex-1 px-5 py-6 sm:py-6 lg:py-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center items-center text-center lg:items-stretch lg:text-left">
                {config.clientProofTitle && (
                  <Eyebrow variant="green-no-dash" className="mb-3 lg:mb-8">
                    {config.clientProofTitle}
                  </Eyebrow>
                )}
                {/* Phones: a centered block with left-aligned items so the markers line up.
                    Tablet (sm–lg): one centered line. Desktop: plain stacked list. */}
                <ul className="inline-flex flex-col items-start gap-y-1.5 text-left sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-1 lg:block">
                  {(() => {
                    let items = config.clientProofItems;
                    if (
                      items.length === 1 &&
                      items[0].trim().toLowerCase() === "client proof" &&
                      config.stats &&
                      config.stats.length > 0
                    ) {
                      items = config.stats
                        .map((s) => {
                          const val = (s.value || "").trim();
                          const lbl = (s.label || "").trim();
                          if (!val && !lbl) return "";
                          if (!val) return lbl;
                          if (!lbl) return val;
                          const formattedLabel = lbl.charAt(0).toLowerCase() + lbl.slice(1);
                          return `${val} ${formattedLabel}`;
                        })
                        .filter(Boolean);
                    }
                    return items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2.5 lg:block text-[15px] sm:text-[16px] lg:text-[20px] font-semibold leading-[130%] text-white"
                      >
                        <span aria-hidden="true" className="inline-block lg:hidden h-[6px] w-[6px] shrink-0 bg-brand-green" />
                        {item}
                      </li>
                    ));
                  })()}
                </ul>
              </div>
            )}

            {/* Right 3 Stats Columns */}
            {config.stats && (
              <div className="flex-[2] grid grid-cols-3 divide-x divide-white/10">
                {config.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between px-2 py-5 sm:p-6 lg:p-8 text-center lg:text-left"
                  >
                    <p className="text-[28px] sm:text-4xl lg:text-[52px] font-semibold leading-[100%] tracking-[-0.8px]">
                      {stat.value}
                    </p>
                    <p className="mt-2 sm:mt-4 text-[12px] sm:text-[15px] lg:text-[16px] font-light leading-[140%] sm:leading-[160%] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      )}
      </div>
    </Container>
  );
}
