import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { mergeHome } from "@/components/home/merge";
import type { HomeContent } from "@/content/home";
import { homeContent } from "@/content/home";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { Founders } from "@/components/home/founders";

export function HomePage({ sections }: { sections: RawSection[] }) {
  const content = mergeHome(homeContent, sections);

  return (
    <div id="top" className="min-h-screen bg-[#07090f] text-white">
      <Hero hero={content.hero} header={content.header} />
      <LogoRow trust={content.trust} />
      <Founders founders={content.founders} />
      <Difference difference={content.difference} />
      <Growth growth={content.growth} />
      <HomeFooter footer={content.footer} />
    </div>
  );
}

export function Hero({ hero, header }: { hero: HomeContent["hero"]; header: HomeContent["header"] }) {
  return (
    <section id="product" className="relative overflow-hidden bg-[#07110d]">
      
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(40,92,62,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(40,92,62,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_at_bottom,rgba(35,197,94,0.15),transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-[1442px] h-[771px] px-6 flex flex-col">
        
        <HomeHeader header={header} surface="plain" logoHref="/" />

        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-6 pt-10">
          
          <div>
            <p className="inline-flex items-center gap-2 text-[14px] font-medium tracking-[1.5px] text-[#23C55E] uppercase font-mono">
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 text-[54px] lg:text-[84px] leading-[1.1] tracking-[-0.8px]">
              <span className="font-light">{hero.title}</span>{" "}
              <span className="font-bold text-[#23C55E]">{hero.highlight}</span>
            </h1>
            <p className="mt-8 max-w-xl text-[18px] font-light leading-[160%] text-white/80">
              {hero.text}
            </p>
            <div className="mt-10">
              <GreenButton
                label={hero.primary.label}
                href={hero.primary.url}
                bgColor="#ffffff"
                textColor="#07110d"
                size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
              />
            </div>
          </div>

          <div className="relative w-full flex flex-col items-end pt-32">
            
            <div className="relative w-full max-w-[519px]">
              
              <div className="absolute -top-[120px] -left-[80px] w-[176px] h-[137px] bg-[#121826] border border-white/10 p-5 z-20">
                <p className="text-[12px] font-mono text-white/70 uppercase tracking-[0.86px] leading-none mb-3">
                  {hero.closeLabel}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[40px] font-medium text-[#23C55E] leading-[16px]">
                    {hero.closeValue}
                  </span>
                  <span className="text-[12px] font-medium text-white/80 font-sans leading-[16px]">
                    {hero.closeUnit}
                  </span>
                </div>
                <p className="mt-2 text-[12px] font-normal text-white/60 leading-[13px]">
                  ↓ {hero.closeTrend}
                </p>
              </div>

              <div className="absolute -top-[160px] right-0 w-[196px] h-[152px] bg-[#121826] border border-white/10 p-5 z-20">
                <p className="text-[12px] font-mono text-white/70 uppercase tracking-[0.86px] leading-none mb-3">
                  {hero.runwayLabel}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[40px] font-medium text-[#23C55E] leading-[16px]">
                    {hero.runwayValue}
                  </span>
                  <span className="text-[12px] font-medium text-white/80 font-sans leading-[16px]">
                    {hero.runwayUnit}
                  </span>
                </div>
                <p className="mt-2 text-[12px] font-normal text-white/60 leading-[13px]">
                  {hero.runwayTrend}
                </p>
              </div>

              <div className="relative w-full h-[293px] overflow-hidden z-10">
                <Image
                  src="/home/chart.png"
                  alt={hero.chartTitle}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-12 flex justify-end w-full max-w-[519px]">
              <GreenButton
                label={hero.call.label}
                href={hero.call.url}
                bgColor="#23C55E"
                textColor="#07110d"
                size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoRow({ trust }: { trust: HomeContent["trust"] }) {
  const logos = [
    "/home/logos/standard-bots.png",
    "/home/logos/american-robotics.png",
    "/home/logos/ondas.png",
    "/home/logos/neumera.png",
    "/home/logos/vetcelerater.png",
    "/home/logos/embolx.png",
  ];

  return (
    <section className="bg-white text-[#1c2430] border-b border-[#13362A]/10">
      <div className="mx-auto flex w-full max-w-[1442px] h-[80px] items-center justify-between gap-8 px-6">
        <p className="w-[200px] shrink-0 text-[18px] leading-[1.2] font-medium tracking-[-0.6px]">
          {trust.lead} <span className="font-bold">{trust.stat}</span> {trust.detail}
        </p>
        <ul className="flex flex-1 items-center justify-between gap-4">
          {logos.map((src, idx) => (
            <li key={idx} className="flex items-center justify-center w-[170px] h-[60px]">
              <img src={src} alt="Partner Logo" className="w-full h-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Updated Difference Section with bg-[#121826]
function Difference({ difference }: { difference: HomeContent["difference"] }) {
  const icons = [
    "/icons/one-finace-team.png",
    "/icons/build-for-growing.png",
    "/icons/scale-with-company.png",
    "/icons/cost-intelligence.png",
    "/icons/automation.png",
  ];

  return (
    <section className="bg-[#121826] px-6 py-24 text-white">
      <div className="mx-auto w-full max-w-[1280px]">
        
        <h2 className="text-center text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-16">
          {difference.title.split("FIAB")[0]}
          <span className="font-black italic">FIAB</span>
          {difference.title.split("FIAB")[1]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-[9px] overflow-hidden">
          
          <div className="bg-white text-[#121826] p-10 flex flex-col min-h-[383px] border-r border-white/10">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#23C55E] mb-6">
              <img src={icons[0]} alt="Icon" className="h-6 w-6 object-contain" />
            </div>
            <h3 className="text-[24px] font-semibold leading-[1.2] mb-4">{difference.cards[0].title}</h3>
            <p className="text-[16px] leading-[140%] text-[#121826]/70">{difference.cards[0].text}</p>
          </div>

          {difference.cards.slice(1, 3).map((card, idx) => (
            <div key={idx} className="bg-[#0c1220] p-10 flex flex-col min-h-[383px] border-r border-white/10">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/20 mb-6">
                <img src={icons[idx + 1]} alt="Icon" className="h-6 w-6 object-contain" />
              </div>
              <h3 className="text-[24px] font-semibold leading-[1.2] mb-4">{card.title}</h3>
              <p className="text-[16px] leading-[140%] text-white/70">{card.text}</p>
            </div>
          ))}

          {difference.cards.slice(3, 5).map((card, idx) => (
            <div key={idx} className="bg-[#0c1220] p-10 flex flex-col min-h-[383px] border-t border-r border-white/10">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/20 mb-6">
                <img src={icons[idx + 3]} alt="Icon" className="h-6 w-6 object-contain" />
              </div>
              <h3 className="text-[24px] font-semibold leading-[1.2] mb-4">{card.title}</h3>
              <p className="text-[16px] leading-[140%] text-white/70">{card.text}</p>
            </div>
          ))}

          <div className="bg-[#23C55E] p-10 flex flex-col justify-between min-h-[383px] border-t border-white/10 text-white">
            <p className="text-[20px] font-mono font-medium tracking-wide uppercase">
              {difference.statEyebrow}
            </p>
            <div>
              <p className="text-[120px] font-normal leading-[40px] tracking-[-2px]">{difference.statValue}</p>
              <p className="text-[20px] font-medium leading-[1.1] mt-2">{difference.statLabel}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Growth({ growth }: { growth: HomeContent["growth"] }) {
  return (
    <section className="bg-[#121826] px-6 py-24 text-white">
      <div className="mx-auto w-full max-w-[1280px]">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div>
            <p className="text-[14px] font-mono font-medium tracking-[1.5px] uppercase text-[#23C55E] mb-4">
              — {growth.eyebrow}
            </p>
            <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px]">
              {growth.title}
            </h2>
          </div>
          <p className="max-w-md text-[16px] font-light leading-[160%] text-white/70 lg:pb-2">
            {growth.text}
          </p>
        </div>

        <div className="relative w-full h-[551px] rounded-[10px] overflow-hidden mb-8">
          <Image
            src="/home/build-together.png"
            alt="Clarity is Built Together"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-[#121826]/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="text-[40px] font-medium leading-[1.1] text-white max-w-lg">
              {growth.overlay}
            </h3>
            
            <ol className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-mono tracking-[1.08px] text-white uppercase">
              {growth.stages.map((stage, index) => (
                <li key={stage} className="inline-flex items-center gap-2">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#23C55E]" />
                  {String(index + 1).padStart(2, "0")} — {stage}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {growth.cards.map((card, idx) => (
            <div key={idx} className="bg-[#191f2c] rounded-[10px] p-8 border border-white/5 flex flex-col min-h-[344px]">
              <h3 className="text-[30px] font-semibold leading-[1.1] mb-3">{card.title}</h3>
              <p className="text-[16px] font-normal leading-[150%] text-white/60 mb-6">{card.text}</p>
              
              <ul className="mt-auto bg-[#091024] rounded-[8px] p-5 space-y-3">
                {card.items.map((item, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="mt-1.5 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                    <span className="text-[16px] font-medium leading-[1.2] text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <GreenButton
            label={growth.cta.label}
            href={growth.cta.url}
            bgColor="#23C55E"
            textColor="#07110d"
            size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
          />
        </div>

      </div>
    </section>
  );
}

export function HomeFooter({ footer }: { footer: HomeContent["footer"] }) {
  return (
    <footer className="bg-[#07090f] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[0.9fr_2.1fr]">
        <div>
          <img src={footer.logo.url} alt={footer.logo.alt} className="h-12 w-auto" />
          <p className="mt-6 max-w-[16rem] text-sm leading-6 text-white/70">{footer.text}</p>
          <a href={`mailto:${footer.email}`} className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M2 4.5 8 9l6-4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            {footer.email}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">{column.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <a href={item.url} className="inline-flex items-center gap-2 hover:text-white">
                      {item.label.toLowerCase() === "linkedin" ? <LinkedInMark /> : null}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-white/10 px-6 py-6">
        <p className="text-center text-xs text-white/45">{footer.legal}</p>
      </div>
    </footer>
  );
}

function LinkedInMark() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white">
      in
    </span>
  );
}