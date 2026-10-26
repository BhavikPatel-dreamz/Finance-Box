"use client";

import { useRef } from "react";
import type { ServicesPhotoCard } from "@/content/services";

export function InvestorSlider({ cards }: { cards: ServicesPhotoCard[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  function move(direction: number) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("article");
    const distance = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <div className="relative mt-12">
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => (
          <article
            key={card.title}
            className="relative h-[28rem] w-[min(24rem,78vw)] shrink-0 snap-start overflow-hidden rounded-[22px] border border-white/15"
          >
            {card.image ? (
              <img src={card.image.url} alt={card.image.alt || card.title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-[#121820]" />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070b12] via-[#070b12]/75 to-transparent px-5 pt-16 pb-5">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">{card.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-5 flex justify-end gap-3 pr-[max(1.5rem,calc((100%-72rem)/2))]">
        <SliderButton label="Previous cards" direction="left" onClick={() => move(-1)} />
        <SliderButton label="Next cards" direction="right" onClick={() => move(1)} />
      </div>
    </div>
  );
}

function SliderButton({
  label,
  direction,
  onClick,
}: {
  label: string;
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:border-white/50"
    >
      <svg viewBox="0 0 16 16" className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`} aria-hidden="true">
        <path d="M4 8h8M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
