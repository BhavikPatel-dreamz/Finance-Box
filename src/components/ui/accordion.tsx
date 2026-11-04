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
    <div className="flex flex-col gap-4 md:gap-6">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={index}
            className="bg-white rounded-[16px] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-4 py-3 px-4 md:p-8 text-left focus:outline-none cursor-pointer"
            >
              <span className="text-[18px] md:text-[25px] font-medium text-[#16181d]">
                {item.question}
              </span>

              {/* Circle Arrow Container */}
              <span
                className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-[#23C55E] text-[#121826]" : "bg-[#121826]/5 text-[#121826]"
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

            {/* Answer Content (animated) */}
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 md:px-8 pb-6 md:pb-8 text-[16px] md:text-[18px] font-normal leading-[160%] text-[#16181d]/70">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}