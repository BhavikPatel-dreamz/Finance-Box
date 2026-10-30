import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { GreenButton } from "@/components/ui/green-button";
import { FooterHero } from "@/components/ui/footer-hero"; // Import FooterHero
import { servicesContent, type ServicesContent } from "@/content/services";
import { homeContent } from "@/content/home";
import Image from "next/image";

export function ServicesPage() {
  const content = servicesContent;

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#16181d]">
      
      {/* Hero Section */}
      <section className="relative w-full h-[660px] flex flex-col overflow-hidden bg-[#07110d]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(40,92,62,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(40,92,62,0.35) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_at_bottom,rgba(35,197,94,0.15),transparent_70%)]" />

        <div className="relative z-10 flex flex-col h-full mx-auto w-full max-w-[1442px] px-6">
          <HomeHeader header={homeContent.header} surface="plain" logoHref="/" />

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12 pt-6">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-[14px] font-medium tracking-[1.5px] text-[#23C55E] uppercase font-mono mb-6">
                <span className="h-px w-6 bg-white/40" />
                {content.hero.eyebrow}
              </p>
              <h1 className="text-[54px] leading-[1.0] tracking-[-0.8px] text-white mb-6">
                <span className="font-medium">{content.hero.title}</span>
                <span className="block text-[#23C55E] mt-1">{content.hero.highlight}</span>
              </h1>
              <p className="text-[16px] font-light leading-[160%] text-white/70 mb-10 max-w-xl">
                {content.hero.text}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <GreenButton
                  label={content.hero.primary.label}
                  href={content.hero.primary.url}
                  bgColor="#ffffff"
                  textColor="#07110d"
                  size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
                />
              </div>
            </div>

            <div className="relative w-full flex flex-col gap-4 max-w-[506px] lg:justify-self-end">
              {content.hero.tiers.map((tier, idx) => (
                <div 
                  key={idx} 
                  className="w-full h-[125px] bg-[#050D1F] border border-[#232835] rounded-[15px] p-5 flex items-center gap-5 relative overflow-hidden group hover:border-[#23C55E]/50 transition-colors"
                >
                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#232835] bg-[#121826] text-[14px] font-semibold text-[#23C55E]">
                    {tier.number}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[12px] font-mono font-medium tracking-[1.5px] text-white/50 uppercase mb-1">
                      {tier.label}
                    </p>
                    <h3 className="text-[20px] font-semibold leading-[30px] text-white">
                      {tier.title} <span className="font-semibold text-[#23C55E]">{tier.highlight}</span>
                    </h3>
                    <p className="text-[14px] font-normal leading-[16px] text-white/60 mt-1">
                      {tier.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServicesStages stages={content.stages} />
      <ServicesDepthIntro depth={content.depth} />
      <ServicesDetails details={content.details} />
      <ServicesCfo cfo={content.cfo} />
      <ServicesProcess process={content.process} />
      
      {/* Naya Section: Investors */}
      <ServicesInvestors investors={content.investors} />

      {/* NAYA SECTION: Reusable Footer Hero */}
      <FooterHero
        title="Tell Us Where"
        highlight="The Pressure Is"
        text="A 30-minute discovery call is enough to map where your finance function is leaking time or cash, and what to fix first."
        buttonLabel="Join the Talent Network"
        buttonUrl="/contact-us"
      />

      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}

// ... (Baaki saare components: Stages, DepthIntro, Details, Cfo, Process, Investors waise hi rahenge)

// --- Component: Stages ---
function ServicesStages({ stages }: { stages: ServicesContent["stages"] }) {
  const iconMap = {
    gear: "/icons/set-the-foundation.png",
    people: "/icons/build-momentum.png",
    person: "/icons/lead-with-foresight.png",
    target: "/icons/optimize-and-expand.png",
  };

  return (
    <section className="bg-white px-6 py-24 text-[#121826]">
      <div className="mx-auto w-full max-w-[1280px]">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div>
            <p className="text-[14px] font-mono font-medium tracking-[1.5px] uppercase text-[#121826]/50 mb-4">
              — {stages.eyebrow}
            </p>
            <h2 className="text-[54px] font-medium leading-[1.0] tracking-[-0.8px]">
              {stages.title.split("Company")[0]}
              <br />
              <span className="font-black italic">Company Today?</span>
            </h2>
          </div>
          <p className="max-w-md text-[16px] font-light leading-[160%] text-[#121826]/70">
            {stages.text}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stages.cards.map((card, idx) => {
            const iconSrc = iconMap[card.icon] || "/icons/set-the-foundation.png"; 
            
            return (
              <div 
                key={idx} 
                className="bg-[#121826] rounded-[16px] p-8 flex flex-col justify-between min-h-[226px] relative group border border-white/5"
              >
                <div className="flex justify-between items-start gap-4 mb-6">
                  <h3 className="text-[30px] font-semibold leading-[1.2] text-white">
                    {card.title}
                  </h3>
                  <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Image 
                      src={iconSrc} 
                      alt={card.title} 
                      width={22} 
                      height={22} 
                      className="object-contain" 
                    />
                  </div>
                </div>

                <p className="text-[14px] font-medium tracking-[0.06em] uppercase text-white/70 mb-4 max-w-[80%] leading-[16px]">
                  {card.label}
                </p>

                <p className="text-[18px] font-normal leading-[150%] text-white/70">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- Component: Depth Intro ---
function ServicesDepthIntro({ depth }: { depth: ServicesContent["depth"] }) {
  return (
    <section className="bg-[#121826] px-6 py-24 text-white">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col items-center text-center">
        
        <p className="text-[14px] font-mono font-medium tracking-[1.5px] uppercase text-[#23C55E] mb-6">
          {depth.eyebrow}
        </p>
        
        <h2 className="text-[50px] leading-[1.1] tracking-[-0.8px] mb-10">
          <span className="font-medium">What's</span>
          <span className="font-extrabold italic"> Inside Each Tier</span>
        </h2>

        <GreenButton
          label={depth.cta.label}
          href={depth.cta.url}
          bgColor="#ffffff"
          textColor="#121826"
          size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "18px" }}
        />

      </div>
    </section>
  );
}

// --- Component: Details ---
function ServicesDetails({ details }: { details: ServicesContent["details"] }) {
  return (
    <section className="bg-[#191F2D] px-6 py-24 text-white">
      <div className="mx-auto w-full max-w-[1442px] flex flex-col gap-24">
        {details.map((detail, idx) => (
          <div 
            key={detail.anchor} 
            id={detail.anchor} 
            className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start"
          >
            <div className="max-w-md">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-[14px] font-semibold text-[#23C55E] mb-6">
                {detail.number}
              </div>
              <h2 className="text-[36px] font-medium leading-[1.1] tracking-[-0.8px] mb-6 text-white">
                {detail.title}
              </h2>
              <p className="text-[16px] font-light leading-[160%] text-white/70 mb-10">
                {detail.text}
              </p>
              <GreenButton
                label={detail.cta.label}
                href={detail.cta.url}
                bgColor="#23C55E"
                textColor="#121826"
                size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/5 rounded-[9px] overflow-hidden">
              {detail.items.map((item, itemIdx) => {
                const isLastItem = itemIdx === detail.items.length - 1;
                const isOddTotal = detail.items.length % 2 !== 0;
                const isFullWidth = isLastItem && isOddTotal;

                return (
                  <div 
                    key={itemIdx} 
                    className={`bg-[#121826] p-8 flex flex-col justify-start min-h-[191px] border-b border-white/5 
                      ${isFullWidth ? 'sm:col-span-2 border-r-0' : 'border-r'} 
                      ${itemIdx >= detail.items.length - (isFullWidth ? 1 : 2) ? 'border-b-0' : ''}
                    `}
                  >
                    <h3 className="text-[22px] font-semibold leading-[1.2] mb-3 text-white">
                      {item.title}
                    </h3>
                    <p className="text-[16px] font-normal leading-[140%] text-white/70">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Component: Fractional CFO ---
function ServicesCfo({ cfo }: { cfo: ServicesContent["cfo"] }) {
  const images = [
    "/services/cfo-dilivers-1.png",
    "/services/cfo-dilivers-2.png",
    "/services/cfo-dilivers-3.png"
  ];

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto w-full max-w-[1280px] bg-[#EDE9E6] rounded-[24px] p-10 md:p-16 text-[#121826]">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div>
            <h2 className="text-[54px] font-medium leading-[1.0] tracking-[-0.8px]">
              {cfo.title.split("\n")[0]}
              <br />
              <span className="font-black italic">{cfo.title.split("\n")[1]}</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[16px] font-light leading-[160%] text-[#121826]/70 mb-6">
              {cfo.text}
            </p>
            <GreenButton
              label={cfo.cta.label}
              href={cfo.cta.url}
              bgColor="#121826"
              textColor="#ffffff"
              size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cfo.cards.map((card, idx) => (
            <div 
              key={idx} 
              className="relative w-full h-[490px] rounded-[10px] overflow-hidden"
            >
              <Image
                src={images[idx] || card.image?.url || ""}
                alt={card.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="bg-[#121826] rounded-[8px] p-6 w-[286px] h-[154px] flex flex-col justify-center text-white">
                  <h3 className="text-[18px] font-extrabold uppercase tracking-[1px] leading-[20px] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[14px] font-normal leading-[140%] text-white/70 line-clamp-4">
                    {card.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Component: Process ---
function ServicesProcess({ process }: { process: ServicesContent["process"] }) {
  return (
    <section className="bg-[#121826] px-6 py-24 text-white">
      <div className="mx-auto w-full max-w-[1280px]">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-4">
            {process.title}
          </h2>
          <p className="text-[16px] font-light leading-[160%] text-white/70 max-w-2xl">
            {process.text}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-t border-l border-white/10">
          {process.steps.map((step, idx) => (
            <div 
              key={idx} 
              className="relative p-8 border-r border-b border-white/10 flex flex-col bg-[#191F2D] min-h-[311px]"
            >
              {/* TOP PART: Number with short green line on the left */}
              <div className="h-[80px] shrink-0 flex items-start gap-4">
                {/* Short Green Line (equal to number height) */}
                <div className="w-[3px] h-[40px] bg-[#23C55E] mt-0.5" />
                
                <span className="text-[40px] font-extrabold leading-none">
                  {step.number}
                </span>
              </div>
              
              {/* BOTTOM PART: Title & Text (Aligned to bottom) */}
              <div className="flex flex-col flex-grow justify-end">
                <h3 className="text-[30px] font-semibold mb-2 leading-none">
                  {step.title}
                </h3>
                <p className="text-[16px] font-normal leading-[150%] text-white/70">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- Component: Investors (Updated Images & Contained Scroll) ---
function ServicesInvestors({ investors }: { investors: ServicesContent["investors"] }) {
  const cardImages = [
    "/services/scroll/portfolio-1.png",
    "/services/scroll/portfolio-2.png",
    "/services/scroll/portfolio-3.png",
    "/services/scroll/portfolio-4.png",
    "/services/scroll/portfolio-5.png",
    "/services/scroll/portfolio-6.png"
  ];

  return (
    <section className="bg-[#121826] py-24 text-white overflow-hidden">
      
      {/* Header Area - Contained */}
      <div className="mx-auto w-full max-w-[1442px] px-6 mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="max-w-2xl">
            <p className="text-[14px] font-mono font-medium tracking-[1.5px] uppercase text-[#23C55E] mb-6">
              — {investors.eyebrow}
            </p>
            <h2 className="text-[54px] font-medium leading-[1.0] tracking-[-0.8px]">
              {investors.title.split("\n")[0]}<br />
              {investors.title.split("\n")[1]}{" "}
              <span className="font-black italic">{investors.highlight}</span><br />
              {investors.title.split("\n")[2]}
            </h2>
          </div>
          
          <div className="max-w-xl lg:pb-2">
            <p className="text-[16px] font-light leading-[160%] text-white/70 mb-8">
              {investors.text}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <GreenButton
                label={investors.primary.label}
                href={investors.primary.url}
                bgColor="#ffffff"
                textColor="#121826"
                size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
              />
              <GreenButton
                label={investors.secondary.label}
                href={investors.secondary.url}
                bgColor="transparent"
                textColor="#ffffff"
                className="border border-white/30 hover:bg-white/10"
                size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontally Scrollable Cards - Contained within max-w */}
      <div className="mx-auto w-full max-w-[1442px] px-6">
        <div 
          className="w-full overflow-x-auto overflow-y-hidden flex gap-6 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style dangerouslySetInnerHTML={{__html: `.overflow-x-auto::-webkit-scrollbar { display: none; }`}} />
          
          <div className="flex gap-6 min-w-max pr-6">
            {cardImages.map((imgSrc, idx) => {
              const card = investors.cards[idx] || { title: "", text: "" };
              
              return (
                <div 
                  key={idx} 
                  className="relative w-[400px] h-[490px] rounded-[14px] overflow-hidden shrink-0 group"
                >
                  <Image
                    src={imgSrc}
                    alt={card.title || `Portfolio Card ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0C] via-[#0B0D0C]/60 to-transparent opacity-90" />
                  
                  {(card.title || card.text) && (
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                      <h3 className="text-[22px] font-semibold leading-[24px] mb-3">
                        {card.title}
                      </h3>
                      <p className="text-[14px] font-normal leading-[140%] text-white/80">
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
    </section>
  );
}