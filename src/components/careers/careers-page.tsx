import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent } from "@/content/home";
import { Button } from "@/components/ui/button";
import { mergeCareers } from "./merge";
import { careersContent, type CareersContent } from "@/content/careers";
import type { RawSection } from "@/lib/wordpress/content";
import { Accordion } from "../ui/accordion";
import { FooterHero } from "../ui/footer-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import Container from "../ui/container";
import { ProcessGrid } from "@/components/ui/process-grid";

export function CareersPage({ sections }: { sections: RawSection[] }) {
  const content = mergeCareers(careersContent, sections);

  return (
    <div className="min-h-screen flex flex-col bg-[#07110d] text-white">

      {/* 1. Hero Section */}
      <section className="hero-section relative overflow-hidden bg-[#121826] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url(/careers/careers-page-hero-bg.svg)" }}
          aria-hidden="true"
        />

        <div className="relative w-full min-h-[auto] lg:min-h-[660px] xl:min-h-[771px] lg:h-auto xl:h-[771px] z-10 flex items-center justify-center flex-col h-full">
          <HomeHeader header={homeContent.header} surface="plain" logoHref="/" />

          <Container>
            <div className="flex-1 flex items-center pb-12 sm:pb-16 lg:pb-24 pt-8 sm:pt-12 lg:pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                <div>
                  <Eyebrow variant="dark" className="mb-4 sm:mb-6">
                    {content.hero.eyebrow}
                  </Eyebrow>
                  <h1 className="text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white">
                    Build the operating<br />
                    system <span className="text-[#23C55E]">for growth</span><br />
                    <span className="text-[#23C55E]">companies</span>
                  </h1>
                </div>

                <div className="max-w-md lg:justify-self-end">
                  <p className="text-[15px] sm:text-[16px] font-light leading-[160%] text-white/80 mb-6 sm:mb-8">
                    {content.hero.text}
                  </p>
                  <div>
                    <Button
                      color="white"
                      text={content.hero.cta.label}
                      href={content.hero.cta.url}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* 2. Why work at FIAB Section */}
      <Section theme="light" spacing="both" className="why-work-section bg-white">
        <Container>
          <div className="rounded-[20px] sm:rounded-[24px] bg-[#F5F3F2] border border-[#E8E6E3] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14">
            <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 xl:gap-16">
              {/* Left Column (Image) */}
              <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] rounded-[16px] overflow-hidden shrink-0">
                <Image
                  src={content.whyWork.image}
                  alt="Why work at FIAB"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  priority
                />
              </div>

              {/* Right Column (Text & Points) */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-[30px] sm:text-[38px] lg:text-[46px] xl:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-6 sm:mb-8 text-[#121826]">
                  {content.whyWork.title}{" "}
                  <span className="text-[#23C55E] font-black italic">{content.whyWork.highlight}</span>
                </h2>

                <div className="flex flex-col gap-3.5 sm:gap-4">
                  {content.whyWork.points.map((point, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-[12px] sm:rounded-[14px] p-5 sm:p-6 border border-[#E8E6E3]/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                    >
                      <p className="text-[14px] sm:text-[16px] font-normal leading-[160%] text-[#121826]/80">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. What Makes FIAB Stand Out Section */}
      <Section theme="light" spacing="both" className="why-fiab-section bg-white pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <h2 className="text-center text-[30px] sm:text-[38px] lg:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-8 sm:mb-12 lg:mb-16 text-[#121826]">
            {content.standOut.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {content.standOut.cards.map((card, idx) => (
              <div
                key={idx}
                className="relative rounded-[16px] overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[580px] flex items-end shadow-sm"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050D1F] via-[#050D1F]/70 to-transparent pointer-events-none" />

                <div className="relative z-10 p-6 sm:p-7 lg:p-8 w-full text-white">
                  <h3 className="text-[19px] sm:text-[21px] lg:text-[22px] font-semibold leading-[1.25] mb-3 text-white">
                    {card.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-light leading-[150%] text-white/85">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. Benefits & Perks Section */}
      <Section theme="dark" spacing="both" className="benefits-section bg-[#121826]">
        <Container>
          <h2 className="text-center text-[30px] sm:text-[38px] lg:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-8 sm:mb-12 lg:mb-16 text-white">
            {content.benefits.title}
          </h2>

          <div className="rounded-[16px] sm:rounded-[20px] border border-white/10 bg-[#121826] overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {content.benefits.items.map((benefit, idx) => (
                <div
                  key={idx}
                  className={twMerge(
                    "p-7 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] lg:min-h-[234px]",
                    // Mobile (1 col)
                    idx < 5 ? "border-b border-white/10" : "",
                    // Tablet (2 cols)
                    idx < 4 ? "sm:border-b sm:border-white/10" : "sm:border-b-0",
                    idx % 2 === 0 ? "sm:border-r sm:border-white/10" : "sm:border-r-0",
                    // Desktop (3 cols)
                    idx < 3 ? "lg:border-b lg:border-white/10" : "lg:border-b-0",
                    idx % 3 !== 2 ? "lg:border-r lg:border-white/10" : "lg:border-r-0"
                  )}
                >
                  <div>
                    <div className="inline-flex h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-white/10 bg-white/5 mb-5 sm:mb-6">
                      <Image
                        src={benefit.icon}
                        alt={benefit.title}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-[19px] sm:text-[21px] lg:text-[22px] font-semibold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[150%] text-white/70">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. How We Hire Section */}
      <section className="how-hire-section bg-[#121826] pb-16 sm:pb-20 lg:pb-24 pt-0 sm:pt-6 text-white">
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-[32px] sm:text-[42px] lg:text-[54px] font-medium leading-[1.05] tracking-[-0.8px] text-white">
              {content.howWeHire.title}
            </h2>
            <p className="text-[14px] sm:text-[16px] font-light leading-[160%] text-white/70 max-w-md text-left lg:text-right">
              {content.howWeHire.text}
            </p>
          </div>

          <ProcessGrid steps={content.howWeHire.steps} />
        </Container>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="faq-section bg-[#F5F3F2] py-14 sm:py-16 lg:py-24 text-[#121826]">
        <Container>
          <div className="mx-auto w-full max-w-[880px]">
            <h2 className="text-center text-[30px] sm:text-[38px] lg:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-10 sm:mb-12 text-[#121826]">
              {content.faq.title}
            </h2>

            <Accordion items={content.faq.items} />
          </div>
        </Container>
      </section>

      {/* 7. Reusable Footer Hero (CTA Banner) */}
      <FooterHero
        variant="careers"
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
