"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { HomeContent } from "@/content/home";
import Container from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface LeadershipProps {
  leadership: HomeContent["leadership"];
}

const fallbackPeople = [
  {
    image: { url: "/home/amit-mulchandani.png", alt: "Amit Mulchandani" },
    name: "Amit Mulchandani",
    role: "FOUNDER & CEO, FINANCE IN A BOX",
  },
  {
    image: { url: "/home/Berena-Reynoso.png", alt: "Berena Reynoso" },
    name: "Berena Reynoso",
    role: "HEAD OF OPERATIONS",
  },
];

export function Leadership({ leadership }: LeadershipProps) {
  // Use uploaded leadership people or fallback to Amit & Berena
  const basePeople =
    leadership?.people && leadership.people.length > 0
      ? leadership.people
      : fallbackPeople;

  // Duplicate items as needed so the carousel has plenty of slides to cycle through
  const people =
    basePeople.length <= 2
      ? [...basePeople, ...basePeople, ...basePeople]
      : basePeople;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const cardRef = useRef<HTMLDivElement>(null);
  const [stepWidth, setStepWidth] = useState(344); // 320px + 24px gap

  // Touch swipe support for mobile/tablet
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1280) {
        setVisibleCount(1);
      } else {
        setVisibleCount(2);
      }

      if (cardRef.current) {
        setStepWidth(cardRef.current.offsetWidth + 24); // card width + 24px gap
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, people.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
  };

  return (
    <section id="leadership" className="leadership-section bg-[#121826] py-14 sm:py-16 lg:py-20 text-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 lg:gap-10 xl:gap-16">

          {/* Left Column: Heading, Copy, Slider Navigation */}
          <div className="w-full lg:w-[420px] xl:w-[500px] 2xl:w-[530px] shrink-0">
            <Eyebrow variant="green" className="mb-4 sm:mb-5">
              {leadership.eyebrow}
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[50px] font-medium leading-[1.12] tracking-[-0.8px] mb-4 sm:mb-6 text-white">
              {leadership.title}
            </h2>
            <div className="space-y-4 text-[14px] sm:text-[15px] xl:text-[16px] font-light leading-[160%] text-white/80 max-w-[500px] mb-6 sm:mb-10">
              {leadership.text.split(/\n\n+/).map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous leader"
                onClick={handlePrev}
                className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#2a2f3c] text-white/70 hover:bg-[#3a4050] hover:text-white transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M10 3.5 5.5 8 10 12.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next leader"
                onClick={handleNext}
                className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#2a2f3c] text-white/70 hover:bg-[#3a4050] hover:text-white transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M6 3.5 10.5 8 6 12.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Sliding Leader Cards Viewport */}
          <div
            className="w-full lg:flex-1 xl:w-[664px] min-w-0 overflow-hidden relative shrink-0"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex gap-6 transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * stepWidth}px)`,
              }}
            >
              {people.map((person, idx) => (
                <div
                  key={`${person.name}-${idx}`}
                  ref={idx === 0 ? cardRef : null}
                  className="group relative w-[280px] sm:w-[300px] xl:w-[320px] h-[370px] xl:h-[390px] rounded-[10px] overflow-hidden shrink-0 bg-[#050D1F] select-none"
                >
                  {/* Background: leadership-bg.svg */}
                  <div
                    className="absolute inset-0 bg-[url('/home/leadership-bg.svg')] bg-cover bg-center pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Person's Image */}
                  {person.image && (
                    <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
                      <Image
                        src={person.image.url}
                        alt={person.image.alt || person.name}
                        fill
                        priority
                        className="object-contain object-bottom pointer-events-none"
                        sizes="390px"
                      />
                    </div>
                  )}

                  {/* Gradient Overlay: on top of leader's image and below leader's text */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,31,0)_0%,rgba(5,13,31,0.1)_58.85%,rgba(5,13,31,0.6)_82.56%,rgba(5,13,31,0.92)_100%)]"
                    aria-hidden="true"
                  />

                  {/* Name and Role Typography */}
                  <div className="absolute bottom-0 left-0 w-full pb-6 px-4 text-center z-10 pointer-events-none">
                    <h3 className="text-[20px] font-medium text-white leading-tight mb-1">
                      {person.name}
                    </h3>
                    <p className="text-[11px] font-mono tracking-[1px] uppercase text-white/60">
                      {person.role}
                    </p>
                  </div>

                  {/* Card Border: 1px rounded gradient border matching Figma */}
                  <svg
                    className="pointer-events-none absolute inset-0 w-full h-full z-20"
                    viewBox="0 0 320 390"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="319"
                      height="389"
                      rx="9.5"
                      stroke={`url(#leader-border-${idx})`}
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                    <defs>
                      <linearGradient
                        id={`leader-border-${idx}`}
                        x1="160"
                        y1="0"
                        x2="160"
                        y2="390"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="white" stopOpacity="0.15" />
                        <stop offset="0.2334" stopColor="white" stopOpacity="0.15" />
                        <stop offset="0.6574" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
