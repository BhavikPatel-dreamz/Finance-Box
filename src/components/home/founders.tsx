"use client";

import { useState } from "react";
import type { HomeContent } from "@/content/home";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import Container from "../ui/container";
import Section from "../ui/section";

export function Founders({ founders }: { founders: HomeContent["founders"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section theme="light" spacing="both" className="founders-section">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-10 xl:gap-16">

          {/* Left Side: Text */}
          <div>
            <Eyebrow variant="light" className="mb-4 sm:mb-6 lg:mb-8">
              {founders.eyebrow}
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
              {founders.title}{" "}
              <span className="text-[#23C55E]">{founders.highlight}</span>
            </h2>
            <p className="text-[14px] sm:text-base font-light leading-[1.6] sm:leading-[1.65] text-[#66707c] mt-4 sm:mt-5 mb-8 sm:mb-10 max-w-md">
              {founders.text}
            </p>
            <GreenButton
              label={founders.cta.label}
              href={founders.cta.url}
              bgColor="#121826"
              textColor="#ffffff"
            />
          </div>

          {/* Right Side: Accordion */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {founders.cards.map((card, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#121826] rounded-[14px] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5.5 text-left focus:outline-none"
                  >
                    <span className="text-[17px] sm:text-[20px] md:text-[25px] font-medium text-white pr-3 sm:pr-4">
                      {card.title}
                    </span>

                    <span
                      className={`flex h-10 w-10 sm:h-[46px] sm:w-[46px] shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-[#23C55E] text-[#121826]" : "bg-white/10 text-white"
                        }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && card.text && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-[14px] sm:text-base md:text-lg font-light leading-[160%] text-white/70">
                      {card.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}