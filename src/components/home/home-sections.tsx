import type { ReactNode } from "react";
import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import type { HomeContent } from "@/content/home";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FooterHero } from "@/components/ui/footer-hero";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import Container from "../ui/container";
import Section from "../ui/section";

export function HomeHero({ hero, header }: { hero: HomeContent["hero"]; header: ReactNode }) {
  const isDefaultTitle =
    Boolean(hero.title) &&
    hero.title.replace(/,$/, "").trim() === "Your Finance Function" &&
    hero.highlight?.trim() === "Built and Run For You";

  return (
    <section id="product" className="hero-section relative overflow-hidden bg-[#121826] text-white">

      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/home/homepage-hero-bg.svg)" }}
      />
      <div className="relative w-full min-h-[auto] lg:min-h-[660px] xl:min-h-[771px] lg:h-auto xl:min-h-[771px] flex flex-col justify-between">

        {header}

        <Container className="relative flex-1 flex flex-col justify-end lg:justify-start pb-10 sm:pb-12 lg:pb-8">
          <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-0 items-start pt-4 sm:pt-6 lg:pt-10 xl:pt-16">

            {/* Left Column */}
            <div className="lg:col-span-7">
              <Reveal immediate preset="slide-up" delay={80} distance={18}>
                <Eyebrow variant="green-no-dash" className="mb-4 sm:mb-5">
                  {hero.eyebrow}
                </Eyebrow>
              </Reveal>

              <Reveal immediate preset="slide-up" delay={220} distance={32}>
                <h1 className="text-[34px] sm:text-[50px] lg:text-[54px] lg:text-[54px] xl:text-[76px] 2xl:text-[84px] leading-[1.08] sm:leading-[1.05] tracking-tight sm:tracking-[-0.8px] max-w-[651px]">
                  {isDefaultTitle ? (
                    <>
                      <span className="font-light text-white block">Your Finance</span>
                      <span className="block">
                        <span className="font-light text-white">Function, </span>
                        <span className="font-bold text-[#23C55E]">Built</span>
                      </span>
                      <span className="font-bold text-[#23C55E] block">and Run For You</span>
                    </>
                  ) : (
                    <>
                      <span className="font-light">{hero.title}</span>{" "}
                      <span className="font-bold text-[#23C55E]">{hero.highlight}</span>
                    </>
                  )}
                </h1>
              </Reveal>

              <Reveal immediate preset="slide-up" delay={380} distance={24}>
                <p className="mt-4 sm:mt-6 max-w-[550px] text-[15px] sm:text-[16px] xl:text-[18px] font-light leading-[160%] text-white/80">
                  {hero.text}
                </p>
              </Reveal>

              <Reveal immediate preset="slide-up" delay={540} distance={20}>
                <div className="mt-6 sm:mt-7">
                  <GreenButton
                    label={hero.primary.label}
                    href={hero.primary.url}
                    color="white"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end pt-28 sm:pt-36 lg:pt-[180px] xl:pt-[200px] lg:mr-0 xl:-mr-[38px]">

              <div className="relative w-full max-w-[420px] lg:max-w-[440px] xl:max-w-[519px]">

                {/* Month-End Close Card */}
                <Reveal
                  immediate
                  preset="slide-up"
                  delay={460}
                  distance={28}
                  className="card-hover absolute -top-[95px] sm:-top-[110px] lg:-top-[125px] xl:-top-[143px] left-0 sm:-left-[20px] lg:-left-[50px] xl:-left-[118px] w-[130px] min-[360px]:w-[140px] sm:w-[170px] lg:w-[175px] xl:w-[196px] h-auto min-h-[115px] sm:h-[135px] lg:h-[140px] xl:h-[152px] bg-[#050D1F] border [border-image-source:linear-gradient(139.46deg,rgba(255,255,255,0.1)_1.38%,rgba(255,255,255,0.06)_76.95%)] [border-image-slice:1] p-3 sm:p-4 xl:p-5 z-1 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-mono text-white uppercase tracking-[0.86px] leading-none">
                      {hero.closeLabel}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                      <span className="text-[26px] sm:text-[34px] lg:text-[34px] xl:text-[40px] font-medium text-[#23C55E] leading-none">
                        {hero.closeValue}
                      </span>
                      <span className="text-[11px] sm:text-[12px] font-normal text-white font-sans leading-none">
                        {hero.closeUnit}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-normal text-white leading-none">
                      {hero.closeTrend
                        ? hero.closeTrend.startsWith("↓")
                          ? hero.closeTrend
                          : `↓ ${hero.closeTrend}`
                        : "↓ Down from 18"}
                    </p>
                  </div>
                </Reveal>

                {/* Runway Card */}
                <Reveal
                  immediate
                  preset="slide-up"
                  delay={620}
                  distance={28}
                  className="card-hover absolute -top-[115px] sm:-top-[140px] lg:-top-[165px] xl:-top-[195px] right-0 lg:right-[20px] xl:right-[87px] w-[138px] min-[360px]:w-[150px] sm:w-[180px] lg:w-[175px] xl:w-[194px] h-auto min-h-[125px] sm:h-[140px] lg:h-[138px] xl:h-[147px] bg-[#050D1F] border [border-image-source:linear-gradient(139.46deg,rgba(255,255,255,0.1)_1.38%,rgba(255,255,255,0.06)_76.95%)] [border-image-slice:1] p-3 sm:p-4 xl:p-5 z-1 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-mono text-white uppercase tracking-[0.86px] leading-none mb-2 sm:mb-3">
                      {hero.runwayLabel}
                    </p>
                    <div className="flex items-baseline gap-1 sm:gap-1.5">
                      <span className="text-[26px] sm:text-[34px] lg:text-[34px] xl:text-[40px] font-medium text-[#23C55E] leading-none">
                        {hero.runwayValue}
                      </span>
                      <span className="text-[11px] sm:text-[12px] font-normal text-white font-sans leading-none">
                        {hero.runwayUnit}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-normal text-white leading-none">
                    {hero.runwayTrend}
                  </p>
                </Reveal>

                {/* Chart Card */}
                <Reveal immediate preset="scale-up" delay={300} duration={900} className="relative w-full h-[200px] sm:h-[250px] md:h-[270px] xl:h-[293px]">
                  <Image
                    src="/home/chart.png"
                    alt={hero.chartTitle}
                    fill
                    priority
                    className="object-contain"
                  />
                </Reveal>
              </div>

              {/* Book a Call Button */}
              <Reveal immediate preset="slide-up" delay={740} distance={20} className="mt-6 sm:mt-8 lg:mt-6 xl:mt-[38px] flex justify-center lg:justify-end w-full max-w-[420px] lg:max-w-[440px] xl:max-w-[519px] lg:pr-0 xl:pr-[7px]">
                <GreenButton
                  label={hero.call.label}
                  href={hero.call.url}
                  color="green"
                  onDark={true}
                />
              </Reveal>

            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function HoverLine({ className = "bg-[#23C55E]" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none ${className}`}
    />
  );
}

const DEFAULT_DIFFERENCE_ICONS = [
  "/icons/one-finace-team.svg",
  "/icons/build-for-growing.svg",
  "/icons/scale-with-company.svg",
  "/icons/cost-intelligence.svg",
  "/icons/automation.svg",
];

function resolveDifferenceIcon(icon?: { url: string } | string | null, title?: string | null, idx = 0): string {
  if (typeof icon === "string" && icon) return icon;
  if (icon && typeof icon === "object" && "url" in icon && icon.url) return icon.url;
  const t = (title ?? "").toLowerCase();
  if (t.includes("finance team") || t.includes("function") || t.includes("one")) return "/icons/one-finace-team.svg";
  if (t.includes("growing") || t.includes("built")) return "/icons/build-for-growing.svg";
  if (t.includes("scale") || t.includes("company")) return "/icons/scale-with-company.svg";
  if (t.includes("cost") || t.includes("intelligence")) return "/icons/cost-intelligence.svg";
  if (t.includes("automation") || t.includes("finops") || t.includes("platform") || t.includes("ai")) return "/icons/automation.svg";
  return DEFAULT_DIFFERENCE_ICONS[idx % DEFAULT_DIFFERENCE_ICONS.length];
}

export function HomeDifference({ difference }: { difference: HomeContent["difference"] }) {
  const card0 = difference.cards[0];
  const icon0 = resolveDifferenceIcon(card0?.icon, card0?.title, 0);

  return (
    <Section theme="dark" spacing="both" className="differance-section">
      <Container>

        <Reveal preset="slide-up" distance={24}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[44px] xl:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] mb-8 sm:mb-12 lg:mb-16">
            {difference.title.split("FIAB")[0]}
            <span className="font-black italic">FIAB</span>
            {difference.title.split("FIAB")[1]}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={140} className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-[14px] sm:rounded-[16px] overflow-hidden">

          {card0 && (
            <StaggerItem index={0} className="card-hover group relative overflow-hidden bg-white text-[#121826] transition-colors duration-500 hover:bg-[#F6FBF8] p-6 sm:p-8 md:p-8 xl:p-10 flex flex-col min-h-0 md:min-h-[383px] border-b md:border-b-0 md:border-r border-white/10">
              <div className="flex h-12 w-12 sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-[#23C55E] mb-4 sm:mb-6 transition-colors duration-500 group-hover:bg-[#23C55E]/10">
                {icon0 && (
                  <SafeImage
                    src={icon0}
                    fallbackSrc={DEFAULT_DIFFERENCE_ICONS[0]}
                    alt={card0.title}
                    width={24}
                    height={24}
                    unoptimized
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                )}
              </div>
              <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold leading-[1.2] mb-3 sm:mb-4">{card0.title}</h3>
              <p className="text-[14px] sm:text-[15px] md:text-[16px] font-light leading-[1.6] text-[#121826]/70">{card0.text}</p>
              <HoverLine />
            </StaggerItem>
          )}

          {difference.cards.slice(1, 3).map((card, idx) => {
            const cardIdx = idx + 1;
            const iconSrc = resolveDifferenceIcon(card.icon, card.title, cardIdx);
            return (
              <StaggerItem key={idx} index={cardIdx} className="card-hover group relative overflow-hidden bg-white/1 transition-colors duration-500 hover:bg-white/5 p-6 sm:p-8 md:p-8 xl:p-10 flex flex-col min-h-0 md:min-h-[383px] border-b md:border-b-0 md:border-r border-white/10">
                <div className="flex h-12 w-12 sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-white/20 mb-4 sm:mb-6 transition-colors duration-500 group-hover:border-[#23C55E] group-hover:bg-[#23C55E]/10">
                  {iconSrc && (
                    <SafeImage
                      src={iconSrc}
                      fallbackSrc={DEFAULT_DIFFERENCE_ICONS[cardIdx]}
                      alt={card.title}
                      width={24}
                      height={24}
                      unoptimized
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  )}
                </div>
                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold leading-[1.2] mb-3 sm:mb-4">{card.title}</h3>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] font-light leading-[1.6] text-white/70 transition-colors duration-500 group-hover:text-white/90">{card.text}</p>
                <HoverLine />
              </StaggerItem>
            );
          })}

          {difference.cards.slice(3, 5).map((card, idx) => {
            const cardIdx = idx + 3;
            const iconSrc = resolveDifferenceIcon(card.icon, card.title, cardIdx);
            return (
              <StaggerItem key={idx} index={cardIdx} className="card-hover group relative overflow-hidden bg-white/1 transition-colors duration-500 hover:bg-white/5 p-6 sm:p-8 md:p-8 xl:p-10 flex flex-col min-h-0 md:min-h-[383px] border-b md:border-b-0 md:border-t md:border-r border-white/10">
                <div className="flex h-12 w-12 sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-white/20 mb-4 sm:mb-6 transition-colors duration-500 group-hover:border-[#23C55E] group-hover:bg-[#23C55E]/10">
                  {iconSrc && (
                    <SafeImage
                      src={iconSrc}
                      fallbackSrc={DEFAULT_DIFFERENCE_ICONS[cardIdx]}
                      alt={card.title}
                      width={24}
                      height={24}
                      unoptimized
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  )}
                </div>
                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold leading-[1.2] mb-3 sm:mb-4">{card.title}</h3>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] font-light leading-[1.6] text-white/70 transition-colors duration-500 group-hover:text-white/90">{card.text}</p>
                <HoverLine />
              </StaggerItem>
            );
          })}

          <StaggerItem index={5} className="card-hover group relative overflow-hidden bg-[#23C55E] transition-colors duration-500 hover:bg-[#1FAF53] p-6 sm:p-8 md:p-8 xl:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[383px] md:border-t border-white/10 text-white">
            <p className="text-[14px] sm:text-[16px] md:text-[20px] font-mono font-medium tracking-wide uppercase">
              {difference.statEyebrow}
            </p>
            <div className="mt-6 md:mt-0">
              <p className="origin-left text-[64px] sm:text-[84px] md:text-[120px] font-normal leading-tight tracking-[-2px] transition-transform duration-500 ease-out motion-reduce:transition-none">{difference.statValue}</p>
              <p className="text-[16px] sm:text-[18px] md:text-[20px] font-medium leading-[1.1] mt-1 sm:mt-2">{difference.statLabel}</p>
            </div>
            <HoverLine className="bg-white" />
          </StaggerItem>

        </StaggerGroup>
      </Container>
    </Section>
  );
}

export function HomeGrowth({ growth }: { growth: HomeContent["growth"] }) {
  return (
    <Section theme="dark" spacing="bottom" className="growth-section">
      <Container>

        <Reveal preset="slide-up" distance={24}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <Eyebrow variant="green" className="mb-4 sm:mb-6">
                {growth.eyebrow}
              </Eyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
                {growth.title}
              </h2>
            </div>
            <p className="max-w-[363px] text-[14px] sm:text-[15px] xl:text-[16px] font-light leading-[160%] text-white/70 lg:pb-2">
              {growth.text}
            </p>
          </div>
        </Reveal>

        <Reveal preset="scale-up" distance={0} className="group relative w-full h-[360px] sm:h-[440px] lg:h-[480px] xl:h-[551px] rounded-[16px] sm:rounded-[20px] overflow-hidden mb-6 sm:mb-8">
          <Image
            src="/home/build-together.png"
            alt="Clarity is Built Together"
            fill
            className="object-cover image-hover-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/85 from-[11.52%] via-[#121826]/30 via-[66.82%] to-[#121826]/50 to-[112.07%]" />

          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <h3 className="text-2xl sm:text-3xl md:text-[40px] font-medium leading-[1.15] text-white max-w-lg">
              {growth.overlay}
            </h3>

            <ol className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-[11px] sm:text-[12px] font-mono tracking-[1px] text-white uppercase">
              {growth.stages.map((stage, index) => (
                <li key={stage} className="inline-flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#23C55E]" />
                  {String(index + 1).padStart(2, "0")} — {stage}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {growth.cards.map((card, idx) => (
            <StaggerItem
              key={idx}
              index={idx}
              className="group relative overflow-hidden rounded-[14px] sm:rounded-[16px] p-6 sm:p-7 md:p-8 border border-[#FFFFFF24] flex flex-col min-h-0 md:min-h-[344px] transition-colors duration-500 hover:bg-white/[0.04]"
            >
              <h3 className="text-[22px] sm:text-[26px] md:text-[30px] font-semibold leading-[1.15] mb-3 sm:mb-5">{card.title}</h3>
              <p className="text-[14px] sm:text-[15px] md:text-[16px] font-light leading-[150%] text-white/60 mb-5 sm:mb-7 transition-colors duration-500 group-hover:text-white/80">{card.text}</p>

              <ul className="mt-auto bg-[#091024] rounded-[8px] p-4 sm:p-5 space-y-3 sm:space-y-4">
                {card.items.map((item, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="mt-1.5 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-[1.2] text-white/90">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom line: grows left to right on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-[4px] w-full origin-left scale-x-0 bg-[#23C55E] transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal preset="slide-up" delay={150} className="mt-8 sm:mt-10 flex justify-center">
          <GreenButton
            label={growth.cta.label}
            href={growth.cta.url}
            bgColor="#23C55E"
            textColor="#07110d"
            onDark={true}
          />
        </Reveal>

      </Container>
    </Section>
  );
}



export function HomeDecisions({ decisions }: { decisions: HomeContent["decisions"] }) {
  return (
    <Section id="insights" theme="light" spacing="bottom" className="decisions-section">
      <Container>
        <div className="flex flex-col lg:flex-row rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden border border-[#E8E6E3]">

          <Reveal preset="slide-left" distance={20} className="group relative w-full lg:w-1/2 xl:w-[640px] min-h-[420px] sm:min-h-[500px] lg:min-h-[620px] xl:min-h-[740px] shrink-0 overflow-hidden">
            {decisions.portrait?.url ? (
              <Image
                src={decisions.portrait.url}
                alt={decisions.name}
                fill
                className="object-cover image-hover-zoom"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0C] via-[#0B0D0C]/50 to-transparent" />

            <div className="absolute top-5 right-5 sm:top-8 sm:right-8 bg-white rounded-[7px] px-2.5 py-1.5 sm:py-2 text-[12px] sm:text-[14px] font-medium tracking-[1px] uppercase text-[#121826]">
              {decisions.badge}
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 lg:p-8 xl:p-14">
              <p className="text-[20px] sm:text-[24px] lg:text-[26px] xl:text-[30px] font-medium leading-[1.3] text-white mb-6 lg:mb-8 xl:mb-10">
                “{decisions.quote}”
              </p>
              <div>
                <p className="text-[15px] sm:text-[16px] font-bold text-white">{decisions.name}</p>
                <p className="text-[13px] sm:text-[14px] font-normal text-[#A8AFA9] mt-0.5 sm:mt-1">{decisions.role}</p>
              </div>
            </div>
          </Reveal>

          <Reveal preset="slide-right" distance={20} className="w-full lg:w-1/2 xl:w-[640px] bg-[#F5F3F2] p-6 sm:p-10 lg:p-8 xl:p-16 flex flex-col justify-center">
            <Eyebrow variant="light" className="mb-4 sm:mb-6">
              {decisions.eyebrow}
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] text-[#121826] mb-4 sm:mb-6">
              Built for Better<br />
              <span className="font-extrabold italic">Business Decisions.</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] xl:text-[16px] font-light leading-[160%] text-[#121826]/80 mb-6 sm:mb-8 xl:mb-10">
              {decisions.text}
            </p>

            <StaggerGroup staggerDelay={130} className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 xl:mb-10">
              {decisions.cards.map((card, idx) => (
                <StaggerItem key={idx} index={idx} className="card-hover bg-white rounded-[10px] p-3.5 sm:pl-4 sm:pr-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 xl:gap-6 flex-1">
                    <p className="text-[22px] sm:text-[26px] lg:text-[26px] xl:text-[30px] font-medium leading-[1.1] tracking-[-0.8px] text-[#23C55E] md:w-[90px] xl:w-[100px] shrink-0">
                      {card.title}
                    </p>
                    <p className="text-[13px] sm:text-[14px] font-light leading-[1.35] text-[#121826]/70">
                      {card.text}
                    </p>
                  </div>
                  <div className="flex h-[38px] w-[38px] sm:h-[46px] sm:w-[46px] shrink-0 items-center justify-center rounded-full bg-[#121826]/5 text-[#121826]">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div>
              <GreenButton
                label={decisions.cta.label}
                href={decisions.cta.url}
                bgColor="#121826"
                textColor="#ffffff"
              />
            </div>
          </Reveal>

        </div>
      </Container>
    </Section>
  );
}

// --- NAYA SECTION: Pressure (Reusable Footer Hero) ---
export function HomePressure({ pressure }: { pressure: HomeContent["pressure"] }) {
  const emphasis = pressure.emphasis.trim();
  const parts = emphasis && pressure.title.includes(emphasis) ? pressure.title.split(emphasis) : null;

  const title = parts ? parts[0].trim() : pressure.title;
  const highlight = emphasis;

  return (
    <section id="contact" className="bg-white">
      <FooterHero
        variant="home"
        title={title}
        highlight={highlight}
        text={pressure.text}
        buttonLabel={pressure.cta.label}
        buttonUrl={pressure.cta.url}
      />
    </section>
  );
}
