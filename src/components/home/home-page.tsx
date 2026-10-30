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
import Container from "../ui/container";

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
  const isDefaultTitle =
    hero.title === "Your Finance Function," &&
    hero.highlight === "Built and Run For You";

  return (
    <section id="product" className="hero-section relative overflow-hidden bg-[#121826] text-white">

      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/home/homepage-hero-bg.svg)" }}
      />
      <div className="relative w-full min-h-[auto] lg:min-h-[771px] lg:h-[771px] flex flex-col justify-between">

        <HomeHeader header={header} surface="plain" logoHref="/" />

        <Container className="relative flex-1 flex flex-col justify-end lg:justify-start pb-10 sm:pb-12 lg:pb-8">
          <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-start pt-4 sm:pt-6 lg:pt-16">

            {/* Left Column */}
            <div className="lg:col-span-7 lg:pl-3 pt-2 sm:pt-4 lg:pt-[73px]">
              <p className="font-mono text-[12px] sm:text-[13px] font-medium uppercase tracking-[1.5px] text-[#23C55E]">
                {hero.eyebrow}
              </p>

              <h1 className="mt-4 sm:mt-5 text-[38px] sm:text-[52px] md:text-[64px] lg:text-[76px] xl:text-[84px] leading-[1.05] tracking-tight sm:tracking-[-0.8px]">
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

              <p className="mt-5 sm:mt-6 max-w-[550px] text-[16px] sm:text-[18px] font-light leading-[160%] text-white/80">
                {hero.text}
              </p>

              <div className="mt-6 sm:mt-7">
                <GreenButton
                  label={hero.primary.label}
                  href={hero.primary.url}
                  color="white"
                  size={{ width: "auto", height: "58px", paddingX: "32px", fontSize: "16px" }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end pt-28 sm:pt-36 lg:pt-[252px] lg:-mr-[38px]">

              <div className="relative w-full max-w-[519px]">

                {/* Month-End Close Card */}
                <div className="absolute -top-[95px] sm:-top-[110px] lg:-top-[123px] left-0 sm:-left-[20px] lg:-left-[118px] w-[140px] sm:w-[170px] lg:w-[196px] h-auto min-h-[115px] sm:h-[135px] lg:h-[152px] bg-[#121826] border border-white/10 p-3.5 sm:p-4 lg:p-5 z-10 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] sm:text-[11px] lg:text-[12px] font-mono text-white/70 uppercase tracking-[0.86px] leading-none mb-2 sm:mb-3">
                      {hero.closeLabel}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium text-[#23C55E] leading-none">
                        {hero.closeValue}
                      </span>
                      <span className="text-[11px] sm:text-[12px] font-normal text-white/80 font-sans leading-none">
                        {hero.closeUnit}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] lg:text-[12px] font-normal text-white/60 leading-none">
                    ↓ {hero.closeTrend}
                  </p>
                </div>

                {/* Runway Card */}
                <div className="absolute -top-[115px] sm:-top-[140px] lg:-top-[195px] right-0 lg:right-[87px] w-[150px] sm:w-[180px] lg:w-[194px] h-auto min-h-[125px] sm:h-[140px] lg:h-[147px] bg-[#121826] border border-white/10 p-3.5 sm:p-4 lg:p-5 z-20 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] sm:text-[11px] lg:text-[12px] font-mono text-white/70 uppercase tracking-[0.86px] leading-none mb-2 sm:mb-3">
                      {hero.runwayLabel}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium text-[#23C55E] leading-none">
                        {hero.runwayValue}
                      </span>
                      <span className="text-[11px] sm:text-[12px] font-normal text-white/80 font-sans leading-none">
                        {hero.runwayUnit}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] lg:text-[12px] font-normal text-white/60 leading-none">
                    {hero.runwayTrend}
                  </p>
                </div>

                {/* Chart Card */}
                <div className="relative w-full h-[200px] sm:h-[250px] md:h-[293px] z-20">
                  <Image
                    src="/home/chart.png"
                    alt={hero.chartTitle}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Book a Call Button */}
              <div className="mt-8 lg:mt-[38px] flex justify-center lg:justify-end w-full max-w-[519px] lg:pr-[7px]">
                <GreenButton
                  label={hero.call.label}
                  href={hero.call.url}
                  color="green"
                  onDark={true}
                  size={{ width: "182px", height: "58px", fontSize: "16px" }}
                />
              </div>

            </div>
          </div>
        </Container>
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
    <section className="differance-section bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
      <Container>

        <h2 className="text-center text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] mb-16">
          {difference.title.split("FIAB")[0]}
          <span className="font-black italic">FIAB</span>
          {difference.title.split("FIAB")[1]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-[9px] overflow-hidden">

          <div className="bg-white text-[#121826] p-10 flex flex-col min-h-[383px] border-r border-white/10">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#23C55E] mb-6">
              <img src={icons[0]} alt="Icon" className="h-6 w-6 object-contain" />
            </div>
            <h3 className="sm:text-[22px] text-[18px] font-semibold leading-[1.2] mb-4">{difference.cards[0].title}</h3>
            <p className="text-[16px] font-normal leading-[140%] text-[#121826]/70">{difference.cards[0].text}</p>
          </div>

          {difference.cards.slice(1, 3).map((card, idx) => (
            <div key={idx} className="bg-white/1 p-10 flex flex-col min-h-[383px] border-r border-white/10">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/20 mb-6">
                <img src={icons[idx + 1]} alt="Icon" className="h-6 w-6 object-contain" />
              </div>
              <h3 className="sm:text-[22px] text-[18px] font-semibold leading-[1.2] mb-4">{card.title}</h3>
              <p className="text-[16px] font-normal leading-[140%] text-white/70">{card.text}</p>
            </div>
          ))}

          {difference.cards.slice(3, 5).map((card, idx) => (
            <div key={idx} className="bg-white/1 p-10 flex flex-col min-h-[383px] border-t border-r border-white/10">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/20 mb-6">
                <img src={icons[idx + 3]} alt="Icon" className="h-6 w-6 object-contain" />
              </div>
              <h3 className="sm:text-[22px] text-[18px] font-semibold leading-[1.2] mb-4">{card.title}</h3>
              <p className="text-[16px] font-normal leading-[140%] text-white/70">{card.text}</p>
            </div>
          ))}

          <div className="bg-[#23C55E] p-10 flex flex-col justify-between min-h-[383px] border-t border-white/10 text-white">
            <p className="text-[20px] font-mono font-medium tracking-wide uppercase">
              {difference.statEyebrow}
            </p>
            <div>
              <p className="text-[120px] font-normal leading-tight tracking-[-2px]">{difference.statValue}</p>
              <p className="text-[20px] font-medium leading-[1.1] mt-2">{difference.statLabel}</p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}

function Growth({ growth }: { growth: HomeContent["growth"] }) {
  return (
    <section className="growth-section bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
      <Container>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div>
            <Eyebrow variant="green" className="mb-6">
              {growth.eyebrow}
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
              {growth.title}
            </h2>
          </div>
          <p className="max-w-[363px] text-[16px] font-light leading-[160%] text-white/70 lg:pb-2">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/65 from-[11.52%] via-[#121826]/0 via-[66.82%] to-[#121826]/50 to-[112.07%]" />

          <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="text-2xl sm:text-3xl md:text-[40px] font-medium leading-[1.1] text-white max-w-lg">
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
            <div key={idx} className="rounded-[10px] p-8 border border-[#FFFFFF24] flex flex-col min-h-[344px]">
              <h3 className="text-[30px] font-semibold leading-[1.1] mb-5">{card.title}</h3>
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

      </Container>
    </section>
  );
}

function Partners({ partners }: { partners: HomeContent["partners"] }) {
  return (
    <section className="partners-section bg-white px-6 py-16 text-[#16181d]">
      <Container>
        <h2 className="text-center text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] mb-12">
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
      </Container>
    </section>
  );
}

function Decisions({ decisions }: { decisions: HomeContent["decisions"] }) {
  return (
    <section id="insights" className="decisions-section bg-white px-6 py-20">
      <Container>
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
            <h2 className="text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] text-[#121826] mb-6">
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
      </Container>
    </section>
  );
}

function Leadership({ leadership }: { leadership: HomeContent["leadership"] }) {
  return (
    <section className="leadership-section bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
      <Container>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">

          <div className="w-full lg:w-[480px] shrink-0 pt-6">
            <p className="text-[14px] font-mono font-medium tracking-[1.5px] uppercase text-[#23C55E] mb-6">
              — {leadership.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] mb-6">
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
      </Container>
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
    <footer className="footer-section bg-[#07090f] text-white">
      <Container>
        <div className="grid gap-12 px-6 py-14 lg:grid-cols-[0.9fr_2.1fr]">
          <div>
            <img src={footer.logo.url} alt={footer.logo.alt} className="h-16 w-auto" />
            <p className="mt-6 max-w-[16rem] text-base font-light leading-[140%] text-white/80">{footer.text}</p>
            <a href={`mailto:${footer.email}`} className="mt-9 inline-flex items-center gap-3 text-base font-semibold text-white hover:text-[#23C55E] transition duration-300 group">
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 12C1.0875 12 0.7345 11.8533 0.441 11.5597C0.1475 11.2662 0.0005 10.913 0 10.5V1.5C0 1.0875 0.147 0.7345 0.441 0.441C0.735 0.1475 1.088 0.0005 1.5 0H13.5C13.9125 0 14.2657 0.147 14.5597 0.441C14.8538 0.735 15.0005 1.088 15 1.5V10.5C15 10.9125 14.8533 11.2657 14.5597 11.5597C14.2662 11.8538 13.913 12.0005 13.5 12H1.5ZM7.69725 6.591C7.76575 6.572 7.83125 6.54375 7.89375 6.50625L13.2 3.1875C13.3 3.125 13.375 3.047 13.425 2.9535C13.475 2.86 13.5 2.75675 13.5 2.64375C13.5 2.39375 13.3938 2.20625 13.1813 2.08125C12.9688 1.95625 12.75 1.9625 12.525 2.1L7.5 5.25L2.475 2.1C2.25 1.9625 2.03125 1.9595 1.81875 2.091C1.60625 2.2225 1.5 2.40675 1.5 2.64375C1.5 2.76875 1.525 2.87825 1.575 2.97225C1.625 3.06625 1.7 3.138 1.8 3.1875L7.10625 6.50625C7.16875 6.54375 7.2345 6.572 7.3035 6.591C7.3725 6.61 7.438 6.61925 7.5 6.61875C7.562 6.61825 7.62775 6.609 7.69725 6.591Z" fill="white" className="group-hover:fill-[#23C55E] transition duration-300" />
              </svg>
              {footer.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-medium tracking-[1.5px] text-white/70 uppercase">{column.title}</h2>
                <ul className="mt-7.5 space-y-5 text-sm font-normal text-white">
                  {column.links.map((item) => (
                    <li key={item.label}>
                      <a href={item.url} className="inline-flex items-center gap-2 hover:text-[#23C55E] transition duration-300 group">
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
      </Container>
      <div className="border-t border-white/20 py-6">
        <Container>
          <p className="text-center text-sm font-light text-white/70">{footer.legal}</p>
        </Container>
      </div>
    </footer>
  );
}

function LinkedInMark() {
  return (
    <span className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/10 group-hover:bg-[#23C55E] transition duration-300">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.68268 0C0.752805 0 0.000150441 0.755307 0 1.68467C0 2.61494 0.752654 3.3701 1.68283 3.3701C2.61044 3.3701 3.36415 2.61494 3.36415 1.68467C3.36415 0.755156 2.61029 0 1.68268 0ZM0.231378 4.64848H3.13293V14H0.231378V4.64848ZM10.5196 4.41595C9.10812 4.41595 8.1617 5.19115 7.77432 5.92626H7.7355V4.64848H4.9525V13.9998H7.85149V9.37367C7.85149 8.15406 8.08332 6.97272 9.59284 6.97272C11.0807 6.97272 11.1006 8.3676 11.1006 9.45188V13.9997H14V8.87048C14 6.35274 13.4577 4.41595 10.5196 4.41595Z" fill="white" className="group-hover:fill-[#121826]" />
      </svg>
    </span>
  );
}