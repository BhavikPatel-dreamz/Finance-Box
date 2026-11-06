"use client";

import { useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

export type AccordionProps = {
  items: AccordionItem[];
  theme?: "light" | "dark";
};

export function Accordion({ items, theme = "light" }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default 0th open

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={index}
            className={`rounded-[10px] overflow-hidden transition-colors duration-300 ${
              isDark
              ? "bg-[#121826]"
                : "bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-4 py-4 px-5 sm:p-6 md:p-6 text-left focus:outline-none cursor-pointer select-none"
            >
              <span
                className={`text-[17px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium leading-[1.25] tracking-tight ${
                  isDark ? "text-white" : "text-[#121826]"
                }`}
              >
                {item.question}
              </span>

              {/* Circle Arrow Container */}
              <span
                className={`flex h-[40px] w-[40px] sm:h-[46px] sm:w-[46px] shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isOpen
                    ? "bg-[#23C55E] text-[#121826]"
                    : isDark
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "bg-[#121826]/5 text-[#121826] hover:bg-[#121826]/10"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            {/* Answer Content (animated) */}
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-5 sm:px-6 md:px-6 pb-5 sm:pb-6 md:pb-8 text-[15px] sm:text-[16px] md:text-[17px] font-light leading-[160%] ${
                    isDark ? "text-white/75" : "text-[#121826]/75"
                  }`}
                >
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

export default Accordion;
