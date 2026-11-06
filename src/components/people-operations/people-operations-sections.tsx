import Image from "next/image";
import Section from "@/components/ui/section";
import Container from "../ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { PeopleOperationsContent } from "@/content/people-operations";

export function PeopleOperationsIntro({ intro }: { intro: PeopleOperationsContent["intro"] }) {
  // 2. Intro Section
  return (
    <Section theme="light" spacing="both">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12 xl:gap-20">
          <Reveal
            preset="slide-left"
            distance={20}
            className="group card-hover w-full max-w-[460px] sm:max-w-[520px] mx-auto lg:mx-0 lg:max-w-[554px] lg:w-[45%] xl:w-[554px] shrink-0 relative aspect-[554/643] rounded-[14px] sm:rounded-[16px] overflow-hidden"
          >
            {intro.image && <Image
              src={intro.image}
              alt="FIAB People Operations"
              fill
              className="object-cover image-hover-zoom"
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 45vw, 554px"
            />}
          </Reveal>
          <Reveal preset="slide-right" distance={20} className="w-full min-w-0 lg:flex-1">
            <h2 className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-medium leading-[1.25] lg:leading-[1.3] tracking-[-0.8px] mb-4 sm:mb-6 max-w-[590px]">
              {(() => {
                let title = intro.title;
                const hl = intro.highlight;
                if (title && hl && title.endsWith(hl)) {
                  title = title.slice(0, -hl.length).trim();
                }
                return (
                  <>
                    {title}{" "}
                    {hl && (
                      <span className="font-bold italic text-[#23C55E]">
                        {hl}
                      </span>
                    )}
                  </>
                );
              })()}
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70 max-w-[560px]">
              {intro.text}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function PeopleOperationsWhatWeDo({ whatWeDo }: { whatWeDo: PeopleOperationsContent["whatWeDo"] }) {
  // 3. What We Do Section
  return (
    <Section theme="dark" spacing="both" className="relative">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] leading-[1.15] lg:leading-[1.05] mb-8 sm:mb-12 lg:mb-16">
            {whatWeDo.title}
          </h2>
        </Reveal>

        <div className="relative flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {whatWeDo.items.map((card, idx) => (
            <div
              key={idx}
              style={{ zIndex: idx + 1 }}
              className={`group card-hover sticky top-[64px] sm:top-[80px] lg:top-[96px] xl:top-[108px] bg-[#191F2D] border border-white/8 rounded-[16px] overflow-hidden flex flex-col md:flex-row md:min-h-[460px] lg:min-h-[520px] xl:min-h-[592px] ${card.reverse ? "md:flex-row-reverse" : "md:flex-row"
                }`}
            >
              {/* Background green glow (CSS only, sits behind content) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{
                  background: card.reverse
                    ? "radial-gradient(ellipse 70% 70% at 100% 100%, rgba(35,197,94,0.22) 0%, rgba(35,197,94,0) 70%)"
                    : "radial-gradient(ellipse 70% 70% at 0% 0%, rgba(35,197,94,0.22) 0%, rgba(35,197,94,0) 70%)",
                }}
              />

              {/* Content Container */}
              <div className="relative z-10 min-w-0 w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-16 flex flex-col justify-center">
                <h3 className="text-[19px] sm:text-[23px] lg:text-[28px] xl:text-[30px] font-semibold leading-[1.25] lg:leading-[1.2] mb-2 sm:mb-3 lg:mb-4">
                  {card.title}
                </h3>
                <p className="text-[13px] sm:text-[15px] lg:text-[16px] font-light leading-[150%] text-white/70 mb-3.5 sm:mb-5 lg:mb-8">
                  {card.text}
                </p>

                <ul className="space-y-1.5 sm:space-y-2.5 xl:space-y-3">
                  {card.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 sm:gap-2.5 xl:gap-3">
                      <span className="mt-1.5 sm:mt-2 h-[5px] w-[5px] sm:h-[6px] sm:w-[6px] shrink-0 bg-[#23C55E]" />
                      <span className="min-w-0 text-[12.5px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-medium leading-[1.3] lg:leading-[1.2] text-white/90">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Container: on top when stacked on mobile (<md), beside the text from md up */}
              <div className="relative z-10 order-first md:order-none w-full md:w-1/2 aspect-[16/9] sm:aspect-[640/360] md:aspect-auto h-[300px] sm:h-[400px] md:h-auto min-h-0 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover image-hover-zoom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>

      </Container>
    </Section>
  );
}

export function PeopleOperationsWhereWeHelp({ whereWeHelp }: { whereWeHelp: PeopleOperationsContent["whereWeHelp"] }) {
  // 4. Where we help Section
  return (
    <Section theme="light" spacing="top">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] leading-[1.15] lg:leading-[1.05] mb-8 sm:mb-10 lg:mb-12.5">
            {(() => {
              let title = whereWeHelp.title;
              const hl = whereWeHelp.highlight;
              if (title && hl && title.endsWith(hl)) {
                title = title.slice(0, -hl.length).trim();
              }
              return (
                <>
                  {title}{" "}
                  {hl && <span className="font-extrabold italic">{hl}</span>}
                </>
              );
            })()}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whereWeHelp.cards.map((card, idx) => (
            <StaggerItem
              key={idx}
              index={idx}
              className="card-hover bg-[#EDE9E6] rounded-[10px] py-6 px-5 sm:py-8 sm:px-6 lg:py-10 lg:px-7 min-h-[120px] sm:min-h-[135px] lg:min-h-[145px] flex flex-col justify-center border border-[#FFFFFF24]"
            >
              <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] font-semibold leading-[1.2] lg:leading-[1.1] mb-1.5 sm:mb-2">
                {card.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[150%] text-[#121826]/70">
                {card.text}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </Container>
    </Section>
  );
}