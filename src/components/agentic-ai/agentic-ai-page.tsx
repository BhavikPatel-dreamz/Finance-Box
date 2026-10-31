import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent } from "@/content/home";
import { mergeAgenticAi } from "./merge";
import { agenticAiContent, type AgenticAiContent } from "@/content/agentic-ai";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { Accordion } from "../ui/accordion";
import { FooterHero } from "../ui/footer-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";

export function AgenticAiPage({ sections }: { sections: RawSection[] }) {
  const content = mergeAgenticAi(agenticAiContent, sections);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#16181d]">

      {/* 1. Hero Section */}
      <section className="relative w-full h-[525px] flex flex-col overflow-hidden bg-[#07110d]">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(40,92,62,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(40,92,62,0.35) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
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
                <h1 className="text-[54px] font-medium leading-[1.1] tracking-[-0.8px] mb-6 text-white">
                  {content.hero.title}
                  <span className="text-[#23C55E]">{content.hero.highlight}</span>
                </h1>
                <p className="text-[16px] font-light leading-[160%] text-white/80 max-w-md">
                  {content.hero.text}
                </p>
              </div>

              <div className="max-w-md lg:justify-self-end">
                <ul className="space-y-6 mb-10">
                  {content.hero.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="mt-2 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                      <span className="text-[16px] font-light leading-[160%] text-white/80">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Updated Button Size */}
                <GreenButton
                  label={content.hero.cta.label}
                  href={content.hero.cta.url}
                  bgColor="#ffffff"
                  size={{
                    width: "232px",
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
      </section>

      {/* 2. What is Agentic AI Section */}
      <Section theme="light" spacing="both">
        <div className="mx-auto w-full max-w-[1280px]">

          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16">
            <div className="max-w-xl">
              <Eyebrow variant="light" className="mb-6">
                {content.whatIs.eyebrow}
              </Eyebrow>
              <h2 className="text-[54px] font-medium leading-[1.0] tracking-[-0.8px] mb-6">
                {content.whatIs.title}
                <span className="font-bold italic">{content.whatIs.highlight}</span>
              </h2>
              <p className="text-[16px] font-light leading-[160%] text-[#0B0D0C]">
                {content.whatIs.text1}
              </p>
            </div>
            <div className="max-w-md lg:pt-12">
              <p className="text-[16px] font-light leading-[160%] text-[#16181d]/70">
                {content.whatIs.text2}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.whatIs.features.map((feature, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="relative w-full h-[420px] rounded-[10px] overflow-hidden mb-6">
                  <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                </div>
                <h3 className="text-[18px] font-semibold leading-[1.2] mb-2">{feature.title}</h3>
                <p className="text-[16px] font-normal leading-[140%] text-[#121826]/80">{feature.text}</p>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* 3. Build your own Agentic AI Section */}
      <section className="bg-white px-6 pb-24">
        <div className="mx-auto w-full max-w-[1280px] bg-[#EDE9E6] rounded-[10px] p-12 lg:p-20 text-center">

          <h2 className="text-[50px] font-medium leading-[1.05] tracking-[-0.8px] mb-4">
            {content.buildYourOwn.title}
            <span className="text-[#23C55E] font-black italic">{content.buildYourOwn.highlight}</span>
          </h2>
          <p className="text-[16px] font-light leading-[160%] text-[#16181d]/70 max-w-2xl mx-auto mb-16">
            {content.buildYourOwn.text}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {content.buildYourOwn.agents.map((agent, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[10px] p-8 flex flex-col min-h-[255px]"
              >
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-lg border border-gray-200 bg-white mb-6">
                  <div className="relative w-6 h-6">
                    <Image src={agent.icon} alt={agent.title} fill className="object-contain" />
                  </div>
                </div>
                <h3 className="text-[18px] font-semibold leading-[1.2] mb-3">{agent.title}</h3>
                <p className="text-[14px] font-normal leading-[160%] text-[#121826]/80">{agent.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. People Ops, Payroll & IT Section */}
      <Section theme="dark" spacing="both">
        <div className="mx-auto w-full max-w-[1280px]">

          <h2 className="text-center text-[50px] font-medium leading-[1.05] tracking-[-0.8px] mb-16">
            {content.peopleOps.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 bg-[#191f2c] rounded-[10px] border border-white/5 overflow-hidden">
            {content.peopleOps.agents.map((agent, idx) => (
              <div
                key={idx}
                className="p-10 flex flex-col min-h-[286px] border-r border-b md:border-b-0 border-white/5 last:border-r-0"
              >
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/10 bg-white/5 mb-6">
                  <div className="relative w-6 h-6">
                    <Image src={agent.icon} alt={agent.title} fill className="object-contain" />
                  </div>
                </div>
                <h3 className="text-[22px] font-semibold leading-[1.2] mb-3">{agent.title}</h3>
                <p className="text-[16px] font-normal leading-[150%] text-white/70">{agent.text}</p>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* 5. Ops & Compliance Section */}
      <Section theme="light" spacing="both">
        <div className="mx-auto w-full max-w-[1280px]">

          <h2 className="text-center text-[44px] font-medium leading-[1.05] tracking-[-0.8px] mb-16">
            {content.opsCompliance.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {content.opsCompliance.cards.map((card, idx) => (
              <div key={idx} className="relative rounded-[10px] overflow-hidden min-h-[633px] flex items-end">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/90 via-[#121826]/20 to-transparent" />

                <div className="relative z-10 p-8 w-full text-white">
                  <h3 className="text-[24px] font-semibold leading-[1.2] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[16px] font-normal leading-[150%] text-white/80">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Section>

      {/* 6. Official Partner Stack */}
      <section className="bg-white pb-24 text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <h2 className="text-center text-[44px] font-medium leading-[1.05] tracking-[-0.8px] mb-12">
            {content.partners.title}
          </h2>
        </div>

        <div
          className="w-full overflow-x-auto overflow-y-hidden flex gap-4 px-6 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style dangerouslySetInnerHTML={{ __html: `.overflow-x-auto::-webkit-scrollbar { display: none; }` }} />
          <div className="flex gap-4 mx-auto min-w-max">
            {content.partners.logos.map((partner, idx) => (
              <div key={idx} className="shrink-0 flex h-[200px] w-[200px] items-center justify-center rounded-[10px] border border-gray-200 bg-white p-6">
                <div className="relative w-full h-[99px]">
                  <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Proven Architecture */}
      <section className="bg-white px-6 pb-24 text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px]">

          <div className="text-center mb-16">
            <h2 className="text-[50px] font-medium leading-[1.05] tracking-[-0.8px]">
              {content.provenArchitecture.title}
            </h2>
            <h2 className="text-[50px] font-black italic leading-[1.05] tracking-[-0.8px] text-[#23C55E]">
              {content.provenArchitecture.highlight}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {content.provenArchitecture.cards.map((card, idx) => (
              <div key={idx} className="bg-[#EDE9E680] rounded-[10px] p-6 flex flex-col">
                <div className="relative w-full h-[320px] rounded-[10px] overflow-hidden mb-6">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </div>

                <div className="mb-6">
                  <h3 className="text-[24px] font-semibold leading-[1.0] mb-2">{card.title}</h3>
                  {card.text && <p className="text-[16px] font-normal leading-[150%] text-[#121826]">{card.text}</p>}
                </div>

                <ul className="space-y-3 mt-auto">
                  {card.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="mt-2 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                      <span className="text-[16px] leading-[1.2] text-[#121826]">
                        <span className="font-medium">{bullet.boldText}</span>
                        <span className="font-light">{bullet.normalText}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Waitlist Section */}
      <Section theme="dark" spacing="both">
        <div className="mx-auto w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div className="max-w-md lg:pt-4">
            <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-6">
              {content.waitlist.title}
              <span className="font-black italic"> {content.waitlist.highlight}</span>
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-white/70">
              {content.waitlist.text}
            </p>
          </div>

          <div className="w-full bg-[#191F2D] rounded-[16px] p-8 md:p-10 border border-white/5">
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full h-[50px] rounded-[8px] border border-white/10 bg-[#121826] px-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E]"
              />
              <input
                type="email"
                placeholder="Work E-mail"
                className="w-full h-[50px] rounded-[8px] border border-white/10 bg-[#121826] px-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E]"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full h-[50px] rounded-[8px] border border-white/10 bg-[#121826] px-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E]"
              />
              <textarea
                placeholder="Write your message..."
                rows={5}
                className="w-full rounded-[8px] border border-white/10 bg-[#121826] p-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] resize-none"
              />
              <div className="mt-2">
                <GreenButton
                  label="Submit"
                  href="#"
                  bgColor="#ffffff"
                  textColor="#0B0D0C"
                  size={{
                    width: "140px",
                    height: "50px",
                    paddingX: "30px",
                    paddingY: "10px",
                    fontSize: "16px"
                  }}
                />
              </div>
            </form>
          </div>

        </div>
      </Section>

      {/* 9. Naya Section: FAQ */}
      <section className="bg-[#EDE9E6] px-6 py-24 text-[#16181d]">
        <div className="mx-auto w-full max-w-[880px]">
          <h2 className="text-center text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-12">
            {content.faq.title}
          </h2>

          <Accordion items={content.faq.items} />
        </div>
      </section>

      {/* 10. NAYA: Reusable Footer Hero */}
      <FooterHero
        variant="agentic-ai"
        title="Ready to co-pilot your back"
        highlight="office with Agentic AI?"
        text=""
        buttonLabel="Join the Talent Network"
        buttonUrl="/careers/open-roles"
      />

      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}