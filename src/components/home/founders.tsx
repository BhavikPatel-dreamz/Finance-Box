"use client";

import { useState } from "react";
import type { HomeContent } from "@/content/home";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Founders({ founders }: { founders: HomeContent["founders"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20 text-[#121826] text-[#121826]">
      <div className="mx-auto w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Text */}
        <div>
          <Eyebrow variant="light" className="mb-6">
            {founders.eyebrow}
          </Eyebrow>
          <h2 className="text-[54px] font-medium leading-[1.0] tracking-[-0.8px] mb-6">
            {founders.title}{" "}
            <span className="text-[#23C55E]">{founders.highlight}</span>
          </h2>
          <p className="text-[16px] font-light leading-[160%] text-[#121826]/70 mb-10 max-w-md">
            {founders.text}
          </p>
          <GreenButton
            label={founders.cta.label}
            href={founders.cta.url}
            bgColor="#121826"
            textColor="#ffffff"
            size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
          />
        </div>

        {/* Right Side: Accordion */}
        <div className="flex flex-col gap-4">
          {founders.cards.map((card, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-[#121826] rounded-[16px] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-[20px] font-medium text-white pr-4">
                    {card.title}
                  </span>
                  
                  <span 
                    className={`flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen ? "bg-[#23C55E] text-[#121826]" : "bg-white/10 text-white"
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
                  <div className="px-6 pb-6 text-[16px] font-light leading-[160%] text-white/70">
                    {card.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}