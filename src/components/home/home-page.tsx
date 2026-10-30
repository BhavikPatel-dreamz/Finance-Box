import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { TrustedBy } from "@/components/home/trusted-by";
import { mergeHome } from "@/components/home/merge";
import type { HomeContent } from "@/content/home";
import { homeContent } from "@/content/home";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Founders } from "@/components/home/founders";
import { FooterHero } from "@/components/ui/footer-hero";

export function HomePage({ sections }: { sections: RawSection[] }) {
  const content = mergeHome(homeContent, sections);

  return (
    <div id="top" className="min-h-screen bg-[#07090f] text-white">
      <Hero hero={content.hero} header={content.header} />
      <TrustedBy trust={content.trust} />
      <Founders founders={content.founders} />
      <Difference difference={content.difference} />
      <Growth growth={content.growth} />
      
      {/* Naye Sections */}
      <Partners partners={content.partners} />
      <Decisions decisions={content.decisions} />
      <Leadership leadership={content.leadership} />
      <Pressure pressure={content.pressure} />
      
      <HomeFooter footer={content.footer} />
    </div>
  );
}

export function Hero({ hero, header }: { hero: HomeContent["hero"]; header: HomeContent["header"] }) {
  return (
    <section id="product" className="relative overflow-hidden bg-[#07110d] pb-12 sm:pb-16 lg:pb-0">
      
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(40,92,62,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(40,92,62,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_at_bottom,rgba(35,197,94,0.15),transparent_70%)]" />

      <div className="relative w-full min-h-[auto] lg:min-h-[771px] lg:h-[771px] flex flex-col">
        
        <HomeHeader header={header} surface="plain" logoHref="/" />

        <div className="relative flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center pb-8 lg:pb-6 pt-6 sm:pt-8 lg:pt-10">
          
          <div>
            <Eyebrow variant="dark">
              {hero.eyebrow}
            </Eyebrow>
            <h1 className="mt-4 sm:mt-6 text-[36px] sm:text-[48px] md:text-[58px] lg:text-[70px] xl:text-[84px] leading-[1.08] tracking-tight sm:tracking-[-0.8px]">
              <span className="font-light">{hero.title}</span>{" "}
              <span className="font-bold text-[#23C55E]">{hero.highlight}</span>
            </h1>
            <p className="mt-5 sm:mt-8 max-w-xl text-[16px] sm:text-[18px] font-light leading-[160%] text-white/80">
              {hero.text}
            </p>
            <div className="mt-8 sm:mt-10">
              <GreenButton
                label={hero.primary.label}
                href={hero.primary.url}
                bgColor="#ffffff"
                textColor="#07110d"
                size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
              />
            </div>
          </div>

          <div className="relative w-full flex flex-col items-center lg:items-end pt-24 sm:pt-28 lg:pt-32">
            
            <div className="relative w-full max-w-[519px]">
              
              <div className="absolute -top-[95px] sm:-top-[110px] lg:-top-[120px] left-0 sm:-left-[20px] lg:-left-[80px] w-[140px] sm:w-[165px] lg:w-[176px] h-auto min-h-[115px] sm:h-[130px] lg:h-[137px] bg-[#121826] border border-white/10 p-3.5 sm:p-4 lg:p-5 z-20">
                <p className="text-[10px] sm:text-[12px] font-mono text-white/70 uppercase tracking-[0.86px] leading-none mb-2 sm:mb-3">
                  {hero.closeLabel}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium text-[#23C55E] leading-tight sm:leading-[16px]">
                    {hero.closeValue}
                  </span>
                  <span className="text-[10px] sm:text-[12px] font-medium text-white/80 font-sans leading-none sm:leading-[16px]">
                    {hero.closeUnit}
                  </span>
                </div>
                <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-[12px] font-normal text-white/60 leading-tight sm:leading-[13px]">
                  ↓ {hero.closeTrend}
                </p>
              </div>

              <div className="absolute -top-[115px] sm:-top-[140px] lg:-top-[160px] right-0 w-[150px] sm:w-[180px] lg:w-[196px] h-auto min-h-[125px] sm:h-[140px] lg:h-[152px] bg-[#121826] border border-white/10 p-3.5 sm:p-4 lg:p-5 z-20">
                <p className="text-[10px] sm:text-[12px] font-mono text-white/70 uppercase tracking-[0.86px] leading-none mb-2 sm:mb-3">
                  {hero.runwayLabel}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium text-[#23C55E] leading-tight sm:leading-[16px]">
                    {hero.runwayValue}
                  </span>
                  <span className="text-[10px] sm:text-[12px] font-medium text-white/80 font-sans leading-none sm:leading-[16px]">
                    {hero.runwayUnit}
                  </span>
                </div>
                <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-[12px] font-normal text-white/60 leading-tight sm:leading-[13px]">
                  {hero.runwayTrend}
                </p>
              </div>

              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[293px] overflow-hidden z-10">
                <Image
                  src="/home/chart.png"
                  alt={hero.chartTitle}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-8 sm:mt-12 flex justify-center sm:justify-end w-full max-w-[519px]">
              <GreenButton
                label={hero.call.label}
                href={hero.call.url}
                bgColor="#23C55E"
                textColor="#07110d"
                onDark={true}
                size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

function Difference({ difference }: { difference: HomeContent["difference"] }) {
  const icons = [
    "/icons/one-finace-team.png",
    "/icons/build-for-growing.png",
    "/icons/scale-with-company.png",
    "/icons/cost-intelligence.png",
    "/icons/automation.png",
  ];

  return (
    <section className="bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
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
    <section className="bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
      <div className="mx-auto w-full max-w-[1280px]">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div>
            <Eyebrow variant="dark" className="mb-4">
              {growth.eyebrow}
            </Eyebrow>
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
            onDark={true}
            size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
          />
        </div>

      </div>
    </section>
  );
}

function Partners({ partners }: { partners: HomeContent["partners"] }) {
  return (
    <section className="bg-white px-6 py-16 text-[#16181d]">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="text-center text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-12">
          {partners.title.split("Partners")[0]}
          <span className="font-extrabold italic">Partners</span>
        </h2>
        
        <ul className="flex flex-wrap md:flex-nowrap items-start justify-between gap-6">
          {partners.logos.map((item, idx) => (
            <li key={idx} className="flex flex-col items-center text-center w-[calc(50%-12px)] md:w-auto shrink-0">
              <div className="w-[170px] h-[60px] flex items-center justify-center relative mb-3">
                {item.image ? (
                  <img src={item.image.url} alt={item.image.alt || item.name} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-xl font-bold">{item.name}</span>
                )}
              </div>
              {item.caption && (
                <span className="text-[10px] font-medium leading-tight text-[#8b919a] max-w-[140px]">
                  {item.caption}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Decisions({ decisions }: { decisions: HomeContent["decisions"] }) {
  return (
    <section id="insights" className="bg-white px-6 py-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col lg:flex-row rounded-[10px] overflow-hidden border border-gray-200">
          
          <div className="relative w-full lg:w-[640px] min-h-[500px] lg:min-h-[740px] shrink-0 overflow-hidden">
            <Image
              src="/home/founder-ceo.png"
              alt={decisions.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0C] via-[#0B0D0C]/50 to-transparent" />
            
            <div className="absolute top-8 right-8 bg-white rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#16181d]">
              {decisions.badge}
            </div>

            <div className="absolute bottom-0 left-0 w-full p-10 md:p-14">
              <p className="text-[30px] font-medium leading-[1.3] text-white mb-8">
                “{decisions.quote}”
              </p>
              <div>
                <p className="text-[16px] font-bold text-white">{decisions.name}</p>
                <p className="text-[14px] text-white/70 mt-1">{decisions.role}</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[640px] bg-[#EDE9E6] p-10 md:p-16 flex flex-col justify-center">
            <p className="text-[14px] font-mono font-medium tracking-[1.5px] uppercase text-[#121826]/60 mb-6">
              — {decisions.eyebrow}
            </p>
            <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] text-[#121826] mb-6">
              Built for Better<br />
              <span className="font-extrabold italic">Business Decisions.</span>
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-[#121826]/70 mb-10 max-w-md">
              {decisions.text}
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {decisions.cards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-[10px] p-6 flex items-center justify-between gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-1">
                    <p className="text-[30px] font-medium leading-[1.1] tracking-[-0.8px] text-[#23C55E] md:w-[100px] shrink-0">
                      {card.title}
                    </p>
                    <p className="text-[14px] font-light leading-[1.3] text-[#121826]/70">
                      {card.text}
                    </p>
                  </div>
                  <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#121826]/5 text-[#121826]">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <GreenButton
                label={decisions.cta.label}
                href={decisions.cta.url}
                bgColor="#121826"
                textColor="#ffffff"
                size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Leadership({ leadership }: { leadership: HomeContent["leadership"] }) {
  return (
    <section className="bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
      <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">
        
        <div className="w-full lg:w-[480px] shrink-0 pt-6">
          <p className="text-[14px] font-mono font-medium tracking-[1.5px] uppercase text-[#23C55E] mb-6">
            — {leadership.eyebrow}
          </p>
          <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-6">
            {leadership.title}
          </h2>
          <div className="text-[16px] font-light leading-[160%] text-white/70 whitespace-pre-line mb-10">
            {leadership.text}
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#2a2f3c] text-white/70 hover:bg-[#3a4050] hover:text-white transition-colors">
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M10 3.5 5.5 8 10 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#2a2f3c] text-white/70 hover:bg-[#3a4050] hover:text-white transition-colors">
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col sm:flex-row justify-center lg:justify-end gap-6">
          {leadership.people.map((person, idx) => (
            <div 
              key={idx} 
              className="relative w-full max-w-[320px] aspect-[320/390] rounded-[10px] overflow-hidden border border-white/10 shrink-0"
            >
              {person.image && (
                <Image
                  src={person.image.url}
                  alt={person.image.alt || person.name}
                  fill
                  className="object-cover object-top"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0C] via-[#0B0D0C]/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                <h3 className="text-[20px] font-semibold leading-tight text-white mb-1">
                  {person.name}
                </h3>
                <p className="text-[11px] font-mono tracking-[1px] text-white/60 uppercase">
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// --- NAYA SECTION: Pressure (Reusable Footer Hero) ---
function Pressure({ pressure }: { pressure: HomeContent["pressure"] }) {
  const emphasis = pressure.emphasis.trim();
  const parts = emphasis && pressure.title.includes(emphasis) ? pressure.title.split(emphasis) : null;
  
  const title = parts ? parts[0].trim() : pressure.title;
  const highlight = emphasis;

  return (
    <section id="contact" className="bg-white px-6 py-16">
      <FooterHero
        title={title}
        highlight={highlight}
        text={pressure.text}
        buttonLabel={pressure.cta.label}
        buttonUrl={pressure.cta.url}
      />
    </section>
  );
}

export function HomeFooter({ footer }: { footer: HomeContent["footer"] }) {
  return (
    <footer className="bg-[#07090f] text-white">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 py-14 lg:grid-cols-[0.9fr_2.1fr]">
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
      <div className="mx-auto max-w-[1280px] border-t border-white/10 px-6 py-6">
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