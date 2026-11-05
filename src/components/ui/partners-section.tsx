import type { ReactNode } from "react";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export type PartnerLogoItem = {
  name: string;
  image?: { url: string; alt?: string } | string | null;
  logo?: string;
  caption?: string;
};

export type PartnersVariant = "plain" | "bordered";

export type PartnersSectionProps = {
  /** The section title. Can be a string or custom ReactNode */
  title?: ReactNode;
  /**
   * Optional keyword in `title` to highlight with font-extrabold and italic.
   * If `title` is a string and contains `highlight`, that substring will be styled.
   */
  highlight?: string;
  /** List of partner logos to show in the marquee */
  logos?: PartnerLogoItem[];
  /** plain: logos only | bordered: each logo inside a bordered square card */
  variant?: PartnersVariant;
  /** Custom marquee scroll speed (default: "65s") */
  marqueeDuration?: string;
  /** Custom class for the section wrapper */
  className?: string;
  /** Custom class for the container */
  containerClassName?: string;
  /** Custom class for the heading */
  titleClassName?: string;
  /** Optional id for anchor scrolling */
  id?: string;
};

// NOTE: the track's right padding must equal its gap, otherwise the loop jumps.
const variantStyles: Record<PartnersVariant, { track: string; item: string }> = {
  plain: {
    track: "gap-10 sm:gap-14 md:gap-16 pr-10 sm:pr-14 md:pr-16",
    item: "w-[150px] sm:w-[170px] h-[60px]",
  },
  bordered: {
    track: "gap-6 pr-6",
    item: "w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[220px] lg:h-[220px] rounded-[10px] border border-[#121826]/6 bg-white p-6 sm:p-8",
  },
};

function getLogoUrl(item: PartnerLogoItem): string | null {
  if (!item) return null;
  if (typeof item.image === "string" && item.image) return item.image;
  if (item.image && typeof item.image === "object" && item.image.url) return item.image.url;
  if (item.logo) return item.logo;
  return null;
}

function getLogoAlt(item: PartnerLogoItem): string {
  if (!item) return "Partner logo";
  if (item.image && typeof item.image === "object" && item.image.alt) return item.image.alt;
  return item.name || "Partner logo";
}

function renderTitle(title?: ReactNode, highlight?: string) {
  if (!title) return null;
  if (typeof title !== "string") return title;

  if (highlight && title.includes(highlight)) {
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="font-extrabold italic">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    );
  }

  if (highlight) {
    return (
      <>
        {title} <span className="font-extrabold italic">{highlight}</span>
      </>
    );
  }

  return title;
}

function LogoTrack({
  logos,
  variant,
  duration,
  keyPrefix,
  hidden = false,
}: {
  logos: PartnerLogoItem[];
  variant: PartnersVariant;
  duration: string;
  keyPrefix: string;
  hidden?: boolean;
}) {
  const styles = variantStyles[variant];

  return (
    <ul
      className={`flex shrink-0 items-center ${styles.track} animate-marquee group-hover:[animation-play-state:paused]`}
      style={{ animationDuration: duration }}
      aria-hidden={hidden || undefined}
    >
      {logos.map((item, idx) => {
        const url = getLogoUrl(item);
        const alt = getLogoAlt(item);
        return (
          <li
            key={`${keyPrefix}-${idx}`}
            className="flex flex-col items-center justify-center shrink-0"
          >
            <div className={`relative flex items-center justify-center ${styles.item}`}>
              {url ? (
                <Image
                  src={url}
                  alt={alt}
                  fill
                  sizes="100vw"
                  className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <span className="text-xl font-bold">{item.name}</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function PartnersSection({
  title,
  highlight,
  logos = [],
  variant = "plain",
  marqueeDuration = "65s",
  className = "",
  containerClassName = "",
  titleClassName = "",
  id,
}: PartnersSectionProps) {
  const logoList = logos || [];
  // Repeat logos so each track easily fills wide screens for seamless infinite looping
  const repeatCount = Math.max(2, Math.ceil(12 / (logoList.length || 1)));
  const trackLogos = Array.from({ length: repeatCount }, () => logoList).flat();

  return (
    <section
      id={id}
      className={`partners-section bg-white py-12 sm:py-14 lg:py-20 text-[#16181d] overflow-hidden ${className}`.trim()}
    >
      {title && (
        <Container className={containerClassName}>
          <Reveal preset="slide-up" distance={20}>
            <h2
              className={`text-center text-3xl sm:text-4xl lg:text-[44px] xl:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] mb-8 sm:mb-10 lg:mb-12 ${titleClassName}`.trim()}
            >
              {renderTitle(title, highlight)}
            </h2>
          </Reveal>
        </Container>
      )}

      {/* Infinite Logo Slider */}
      <div className="group relative w-full overflow-hidden">
        <div className="flex w-max select-none">
          <LogoTrack
            logos={trackLogos}
            variant={variant}
            duration={marqueeDuration}
            keyPrefix="partner-logo-a"
          />
          {/* Duplicate track for a seamless loop */}
          <LogoTrack
            logos={trackLogos}
            variant={variant}
            duration={marqueeDuration}
            keyPrefix="partner-logo-b"
            hidden
          />
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;