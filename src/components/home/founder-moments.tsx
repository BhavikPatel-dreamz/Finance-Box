"use client";

import { useState } from "react";
import type { HomeContent } from "@/content/home";
import { GreenButton } from "../ui/green-button";

function headingParts(title: string, highlight: string) {
  const trimmed = title.trim();
  const mark = highlight.trim();
  if (mark && trimmed.toLowerCase().endsWith(mark.toLowerCase()) && trimmed.length > mark.length) {
    return { title: trimmed.slice(0, -mark.length).trim(), highlight: mark };
  }
  return { title: trimmed, highlight: mark };
}

export function FounderMoments({ founders }: { founders: HomeContent["founders"] }) {
  const [open, setOpen] = useState(0);
  const heading = headingParts(founders.title, founders.highlight);

  return (
    <section id="about" className="bg-white text-[#12141a]">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#9aa1ab] uppercase">— {founders.eyebrow}</p>
          <h2 className="mt-5 max-w-[16ch] text-[2.65rem] leading-[1.02] font-semibold tracking-[-0.03em] sm:text-5xl">
            {heading.title}
            <span className="mt-1 block text-[#3DDC84]">{heading.highlight}</span>
          </h2>
          <p className="mt-5 max-w-[28rem] text-[15px] leading-6 text-[#66707c]">{founders.text}</p>
          <GreenButton
            label={founders.cta.label}
            href={founders.cta.url}
            bgColor="#1b2028"
            textColor="#ffffff"
            size={{
              width: "184px",
              height: "62px",
              paddingX: "30px",
              paddingY: "10px",
              fontSize: "16px"
            }}
          />
        </div>
        <div className="grid gap-3">
          {founders.cards.map((card, index) => {
            const expanded = open === index;
            return (
              <article key={`${card.title}-${index}`} className="rounded-[18px] bg-[#171c24] px-6 py-5 text-white">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  <span className="text-[17px] leading-snug font-semibold">{card.title}</span>
                  <span
                    className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${expanded ? "bg-[#3DDC84] text-[#0b1f12]" : "bg-[#2c3340] text-white"}`}
                  >
                    <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${expanded ? "" : "rotate-180"}`} aria-hidden="true">
                      <path d="M3.25 10.25 8 5.5l4.75 4.75" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                {expanded && card.text ? <p className="mt-2 max-w-lg pr-10 text-sm leading-6 text-[#a8b0bb]">{card.text}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
