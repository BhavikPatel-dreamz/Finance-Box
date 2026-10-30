"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import type { ServicesPhotoCard } from "@/content/services";

export function InvestorSlider({ cards }: { cards: ServicesPhotoCard[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full">
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto overflow-y-hidden pb-4 touch-pan-x [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDown ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{
          paddingLeft: "max(1rem, calc((100% - 1310px) / 2 + 15px))",
        }}
      >
        <div className="flex gap-4 sm:gap-5 min-w-max pr-6 sm:pr-12 lg:pr-20">
          {cards.map((card, idx) => {
            const imgSrc = card.image?.url || `/services/scroll/portfolio-${(idx % 6) + 1}.png`;

            return (
              <div
                key={idx}
                className="relative w-[285px] sm:w-[350px] lg:w-[400px] h-[430px] sm:h-[460px] lg:h-[490px] rounded-[14px] overflow-hidden shrink-0 group border border-white/5 select-none"
              >
                <Image
                  src={imgSrc}
                  alt={card.title || `Portfolio Card ${idx + 1}`}
                  fill
                  draggable={false}
                  className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  sizes="(max-width: 640px) 285px, (max-width: 1024px) 350px, 400px"
                />

                {/* Canonical Tailwind linear gradient overlay from Figma */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,38,0)_6.84%,rgba(18,24,38,0.729525)_45.64%,rgba(18,24,38,0.817256)_56.69%,#121826_92.91%)] pointer-events-none" />

                {(card.title || card.text) && (
                  <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 text-white z-10 pointer-events-none">
                    <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold leading-[1.2] mb-2 sm:mb-3 text-white">
                      {card.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-normal leading-[150%] text-white/70 line-clamp-2">
                      {card.text}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
