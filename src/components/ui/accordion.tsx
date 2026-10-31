"use client";

import { useState } from "react";

type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default 0th open

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="bg-white rounded-[16px] overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
            >
              <span className="text-[18px] md:text-[25px] font-medium text-[#16181d]">
                {item.question}
              </span>
              
              {/* Circle Arrow Container */}
              <span 
                className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-[#23C55E] text-[#121826]" : "bg-[#121826]/5 text-[#121826]"
                }`}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            {/* Answer Content */}
            {isOpen && item.answer && (
              <div className="px-6 md:px-8 pb-8 text-[16px] md:text-[18px] font-normal leading-[160%] text-[#16181d]/70">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}