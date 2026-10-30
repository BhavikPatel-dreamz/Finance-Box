"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/content/home";
import { Container } from "@/components/ui/container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface TrustedByProps {
  trust?: HomeContent["trust"];
  className?: string;
}

const defaultTrust: HomeContent["trust"] = {
  lead: "Trusted by",
  stat: "40+",
  detail: "growing companies in the USA and globally",
};

const partnerLogos = [
  { name: "Standard Bots", src: "/home/logos/standard-bots.png" },
  { name: "American Robotics", src: "/home/logos/american-robotics.png" },
  { name: "Ondas", src: "/home/logos/ondas.png" },
  { name: "Neumera Consulting", src: "/home/logos/neumera.png" },
  { name: "Vetcelerator", src: "/home/logos/vetcelerater.png" },
  { name: "Embolx", src: "/home/logos/embolx.png" },
];

export function TrustedBy({ trust = defaultTrust, className = "" }: TrustedByProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const frozenTranslateRef = useRef<number | null>(null);

  // Duplicate partner logos so Swiper has plenty of slides for seamless continuous loop on any screen width
  const trackLogos = [
    ...partnerLogos,
    ...partnerLogos,
    ...partnerLogos,
    ...partnerLogos,
  ];

  useEffect(() => {
    if (!swiperInstance || !swiperInstance.el) return;

    const swiper = swiperInstance;
    const el = swiper.el;

    // Instant stop on the spot (0ms delay, no continuing transition)
    const handleMouseEnter = () => {
      if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;

      try {
        const style = window.getComputedStyle(swiper.wrapperEl);
        const transform =
          style.transform || style.getPropertyValue("-webkit-transform");
        if (!transform || transform === "none") return;

        const matrix = new DOMMatrixReadOnly(transform);
        const curX = matrix.m41;
        frozenTranslateRef.current = curX;

        swiper.autoplay?.stop();
        swiper.wrapperEl.style.transitionDuration = "0ms";
        swiper.setTranslate(curX);
        swiper.animating = false;
      } catch {
        swiper.autoplay?.stop();
      }
    };

    // Smooth resume from the exact stopped point
    const handleMouseLeave = () => {
      if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;

      const curX = frozenTranslateRef.current;
      frozenTranslateRef.current = null;

      try {
        const currentTranslate =
          curX !== null && curX !== undefined ? curX : swiper.getTranslate();
        let nextIndex = swiper.activeIndex + 1;
        if (swiper.slides && nextIndex >= swiper.slides.length) {
          nextIndex = 0;
        }

        const targetTranslate =
          swiper.snapGrid && swiper.snapGrid[nextIndex] !== undefined
            ? -swiper.snapGrid[nextIndex]
            : swiper.snapGrid && swiper.snapGrid[0] !== undefined
              ? -swiper.snapGrid[0]
              : currentTranslate - 190;

        const remainingDist = Math.abs(targetTranslate - currentTranslate);
        const slideWidth =
          swiper.slides?.[swiper.activeIndex]?.swiperSlideSize || 160;
        const spaceBetween =
          typeof swiper.params?.spaceBetween === "number"
            ? swiper.params.spaceBetween
            : 40;
        const singleSlideDist = slideWidth + spaceBetween;
        const remainingDuration = Math.max(
          150,
          Math.min(4000, Math.round((remainingDist / singleSlideDist) * 4000))
        );

        swiper.slideTo(nextIndex, remainingDuration, false);
        swiper.autoplay?.start();
      } catch {
        swiper.autoplay?.start();
      }
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [swiperInstance]);

  return (
    <section className={`trusted-by py-4.25 w-full bg-white text-[#1c2430] border-b border-[#13362A]/7 overflow-hidden ${className}`}>
      <Container bleed="right">
        <div className="lg:flex block items-center justify-between">
          {/* Left-side Text: Aligns with 1280px Container */}
          <div className="lg:text-left text-center lg:w-[210px] shrink-0">
            <p className="text-[16px] lg:text-[18px] leading-[1.2] font-medium text-[#121826] tracking-[-0.6px]">
              {trust.lead}{" "}
              <span className="text-[#23C55E]">{trust.stat}</span>
              <br />
              <span>{trust.detail}</span>
            </p>
          </div>

          {/* Right-side Logos: Bleeds to edge of screen with zero right spacing */}
          <div className="flex-1 min-w-0 overflow-hidden relative lg:mt-0 mt-3">
            {/* Left Fade Gradient Mask */}
            <div
              className="lg:block hidden pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-[80px]"
              style={{
                background:
                  "linear-gradient(90deg, #FFFFFF 59.32%, rgba(255, 255, 255, 0) 100%)",
              }}
              aria-hidden="true"
            />

            <Swiper
              onSwiper={setSwiperInstance}
              modules={[Autoplay]}
              loop={true}
              slidesPerView="auto"
              spaceBetween={40}
              speed={4000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              allowTouchMove={true}
              className="trusted-by-swiper w-full flex items-center cursor-pointer [&_.swiper-wrapper]:![transition-timing-function:linear]"
            >
              {trackLogos.map((logo, idx) => (
                <SwiperSlide
                  key={`${logo.name}-${idx}`}
                  className="!w-auto flex items-center"
                >
                  <div className="flex h-[75px] w-[130px] sm:w-[160px] shrink-0 items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-full w-full object-contain pointer-events-none select-none"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TrustedBy;
