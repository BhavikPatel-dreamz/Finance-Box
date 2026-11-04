"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { homeContent, type HomeContent } from "@/content/home";
import Container from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

interface LeadershipProps {
  leadership: HomeContent["leadership"];
}

const fallbackPeople = homeContent.leadership.people;

// Per-person image scale for assets exported with extra padding
const IMAGE_SCALE: Record<string, number> = {
  "Neeti Chauhan": 1.3,
};

const CLONES = 3; // copies on each end; must be >= the number of cards visible at once
const DURATION = 600; // ms
const GAP = 24; // px, matches gap-6

export function Leadership({ leadership }: LeadershipProps) {
  const basePeople =
    leadership?.people && leadership.people.length > 0
      ? leadership.people
      : homeContent.leadership.people;

  // Ensure all team members from home.ts are present even if only a partial list was supplied
  const defaultPeople = homeContent.leadership.people;
  const existingNames = new Set(basePeople.map((p) => p.name.trim().toLowerCase()));
  const missingPeople = defaultPeople.filter(
    (p) => !existingNames.has(p.name.trim().toLowerCase())
  );
  const people = missingPeople.length > 0 ? [...basePeople, ...missingPeople] : basePeople;

  const total = people.length;
  const slides = [...people.slice(-CLONES), ...people, ...people.slice(0, CLONES)];

  const [position, setPosition] = useState(CLONES);
  const [animate, setAnimate] = useState(false);
  const [stepWidth, setStepWidth] = useState(320 + GAP);
  const cardRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef(CLONES);
  const lockRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (cardRef.current) setStepWidth(cardRef.current.offsetWidth + GAP);
    };
    measure();
    // Enable the transition only after the first measurement so it doesn't animate on load
    const frame = requestAnimationFrame(() => setAnimate(true));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const go = (direction: 1 | -1) => {
    if (lockRef.current) return;
    lockRef.current = true;

    positionRef.current += direction;
    setPosition(positionRef.current);

    // After the slide finishes, silently jump from a clone to the matching real slide
    timerRef.current = window.setTimeout(() => {
      const current = positionRef.current;
      let next = current;
      if (current >= CLONES + total) next = current - total;
      else if (current < CLONES) next = current + total;

      if (next === current) {
        lockRef.current = false;
        return;
      }

      positionRef.current = next;
      setAnimate(false);
      setPosition(next);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          lockRef.current = false;
        })
      );
    }, DURATION);
  };

  const handlePrev = () => go(-1);
  const handleNext = () => go(1);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      if (distance > 45) handleNext();
      else if (distance < -45) handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <Section id="leadership" theme="dark" spacing="both" className="leadership-section overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-10 lg:gap-10 xl:gap-16">

          {/* Left Column: Heading, Copy, Slider Navigation */}
          <Reveal preset="slide-up" distance={20} className="w-full lg:w-[420px] xl:w-[500px] 2xl:w-[530px] shrink-0">
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
                className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#2a2f3c] text-white/70 hover:bg-[#3a4050] hover:text-white active:scale-95 transition-all cursor-pointer"
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
                className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#2a2f3c] text-white/70 hover:bg-[#3a4050] hover:text-white active:scale-95 transition-all cursor-pointer"
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
          </Reveal>

          {/* Right Column: Sliding Leader Cards Viewport */}
          <div
            className="w-full lg:flex-1 xl:w-[664px] min-w-0 overflow-hidden relative shrink-0"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex gap-6 will-change-transform"
              style={{
                transform: `translateX(-${position * stepWidth}px)`,
                transition: animate ? `transform ${DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
              }}
            >
              {slides.map((person, idx) => {
                const isReal = idx >= CLONES && idx < CLONES + total;
                return (
                  <div
                    key={`${person.name}-${idx}`}
                    ref={idx === CLONES ? cardRef : null}
                    aria-hidden={isReal ? undefined : true}
                    className="group relative w-[280px] sm:w-[300px] xl:w-[320px] h-[370px] xl:h-[390px] rounded-[10px] overflow-hidden shrink-0 bg-[#050D1F] select-none"
                  >
                    {/* Background: leadership-bg.svg */}
                    <div
                      className="absolute inset-0 bg-[url('/home/leadership-bg.svg')] bg-cover bg-center pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Person's Image */}
                    {person.image && (
                      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden origin-bottom transition-transform duration-700 ease-out motion-reduce:transition-none">
                        <Image
                          src={person.image.url}
                          alt={person.image.alt || person.name}
                          fill
                          priority={isReal}
                          className="object-contain object-bottom origin-bottom pointer-events-none"
                          style={
                            IMAGE_SCALE[person.name]
                              ? { transform: `scale(${IMAGE_SCALE[person.name]})` }
                              : undefined
                          }
                          sizes="390px"
                        />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,31,0)_0%,rgba(5,13,31,0.1)_58.85%,rgba(5,13,31,0.6)_82.56%,rgba(5,13,31,0.92)_100%)]"
                      aria-hidden="true"
                    />

                    {/* Name and Role */}
                    <div className="absolute bottom-0 left-0 w-full pb-6 px-4 text-center z-1 pointer-events-none transition-transform duration-500 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                      <h3 className="text-[20px] font-medium text-white leading-tight mb-1">
                        {person.name}
                      </h3>
                      <p className="text-[11px] font-mono tracking-[1px] uppercase text-white/60 transition-colors duration-500 group-hover:text-[#23C55E]">
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
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}