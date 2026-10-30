import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent } from "@/content/home";
import { GreenButton } from "@/components/ui/green-button";
import { mergeCareers } from "./merge";
import { careersContent, type CareersContent } from "@/content/careers";
import type { RawSection } from "@/lib/wordpress/content";
import { Accordion } from "../ui/accordion";
import { FooterHero } from "../ui/footer-hero";
import { Eyebrow } from "@/components/ui/eyebrow";


export function CareersPage({ sections }: { sections: RawSection[] }) {
  const content = mergeCareers(careersContent, sections);

  return (
    <div className="min-h-screen flex flex-col bg-[#07110d] text-white">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[660px] flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url(/services/hex.svg)`,
              backgroundSize: "56px 64px"
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_at_bottom,rgba(35,197,94,0.15),transparent_70%)]" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <HomeHeader header={homeContent.header} surface="plain" logoHref="/" />

          <div className="flex-1 flex items-center w-full max-w-[1280px] mx-auto px-6 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              <div>
                <Eyebrow variant="dark" className="mb-6">
                  {content.hero.eyebrow}
                </Eyebrow>
                <h1 className="text-[54px] font-medium leading-[1.0] tracking-[-0.8px]">
                  {content.hero.title} <br className="hidden lg:block" />
                  <span className="text-[#23C55E]">{content.hero.highlight}</span> <br className="hidden lg:block" />
                  <span className="text-[#23C55E]">{content.hero.highlight2}</span>
                </h1>
              </div>

              <div className="max-w-md lg:justify-self-end">
                <p className="text-[16px] font-light leading-[160%] text-white/80 mb-8">
                  {content.hero.text}
                </p>
                <div>
                  <GreenButton 
                    label={content.hero.cta.label} 
                    href={content.hero.cta.url} 
                    bgColor="#ffffff"
                    textColor="#07110d"
                    size={{
                      width: "227px",
                      height: "62px",
                      paddingX: "30px",
                      paddingY: "10px",
                      fontSize: "16px"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why work at FIAB Section */}
      <section className="bg-[#EDE9E6] px-6 py-24 text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[10px] overflow-hidden">
              <Image
                src={content.whyWork.image}
                alt="Why work at FIAB"
                fill
                className="object-cover"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-10 text-[#16181d]">
                {content.whyWork.title}{" "}
                <span className="text-[#23C55E] font-extrabold italic">{content.whyWork.highlight}</span>
              </h2>
              
              <div className="flex flex-col gap-4">
                {content.whyWork.points.map((point, idx) => (
                  <div key={idx} className="bg-white rounded-[10px] p-6 shadow-sm">
                    <p className="text-[16px] font-light leading-[160%] text-[#16181d]/80">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What Makes FIAB Stand Out Section */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 text-[#121826] text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 className="text-center text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-16 text-[#16181d]">
            {content.standOut.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.standOut.cards.map((card, idx) => (
              <div key={idx} className="relative rounded-[10px] overflow-hidden min-h-[620px] flex items-end">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07110d] via-[#07110d]/80 to-transparent" />
                
                <div className="relative z-10 p-8 w-full text-white">
                  <h3 className="text-[22px] font-semibold leading-[1.2] mb-4">
                    {card.title}
                  </h3>
                  <p className="text-[16px] font-normal leading-[140%] text-white/80">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Benefits & Perks Section */}
      <section className="bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 className="text-center text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-16">
            {content.benefits.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
            {content.benefits.items.map((benefit, idx) => (
              <div key={idx} className="p-10 border-r border-b border-white/10 flex flex-col min-h-[234px]">
                <div className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/10 bg-white/5 mb-6">
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[22px] font-semibold mb-2">{benefit.title}</h3>
                <p className="text-[16px] font-light leading-[150%] text-white/70">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How We Hire Section */}
      <section className="bg-[#121826] px-6 pb-24 text-white">
        <div className="mx-auto w-full max-w-[1280px]">
          
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16">
            <h2 className="text-[54px] font-medium leading-[1.05] tracking-[-0.8px]">
              {content.howWeHire.title}
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-white/70 max-w-xl text-right">
              {content.howWeHire.text}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 border-t border-l border-white/10">
            {content.howWeHire.steps.map((step, idx) => (
              <div key={idx} className="p-8 border-r border-b border-white/10 flex flex-col min-h-[311px]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[65px] w-[3px] bg-[#23C55E]" />
                  <span className="text-[40px] font-extrabold leading-none">{step.number}</span>
                </div>
                <h3 className="text-[30px] font-semibold mb-2">{step.title}</h3>
                <p className="text-[16px] font-normal leading-[150%] text-white/70">{step.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Naya Section: Frequently Asked Questions */}
      <section className="bg-[#EDE9E6] px-6 py-24 text-[#16181d]">
        <div className="mx-auto w-full max-w-[880px]">
          <h2 className="text-center text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-12">
            {content.faq.title}
          </h2>
          
          <Accordion items={content.faq.items} />
        </div>
      </section>

      {/* 7. NAYA: Reusable Footer Hero */}
      <FooterHero
        title="Build your"
        highlight="next chapter here"
        text="Whether you love closing the books, designing automations, or building dashboards, FIAB gives you room to own real outcomes."
        buttonLabel="Join the Talent Network"
        buttonUrl="/careers/open-roles"
      />

      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}