import Image from "next/image";
import { HomeFooter } from "@/components/home/home-page";
import { HomeHeader } from "@/components/home/home-header";
import { mergeClients } from "./merge";
import { homeContent } from "@/content/home";
import { clientsContent, type ClientCaseStudy } from "@/content/clients";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { FooterHero } from "@/components/ui/footer-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import Container from "../ui/container";
import Section from "@/components/ui/section";

export function ClientsPage({ sections }: { sections: RawSection[] }) {
  const content = mergeClients(clientsContent, sections);

  const tags = [
    "Technology & SaaS",
    "Professional Services",
    "Healthcare",
    "E-commerce",
    "Startups & Scale-ups",
  ];

  return (
    <div id="top" className="min-h-screen bg-[#07110d] text-white">

      {/* Hero Section */}
      <div className="hero-section relative overflow-hidden bg-[#121826] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url(/clients/client-hero-bg.svg)" }}
        />

        <div className="relative z-10">
          <HomeHeader header={homeContent.header} surface="plain" logoHref="/" />

          <Container>
            <div className="pt-14 sm:pt-18 md:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 flex flex-col items-center text-center">
              <Eyebrow variant="dark-no-dash" className="mb-6">
                {content.hero.eyebrow}
              </Eyebrow>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium leading-[1.12] tracking-tight text-white">
                {content.hero.title}
                <span className="font-extrabold italic"> {content.hero.highlight}</span>
              </h1>
              <p className="mt-4 sm:mt-6 lg:mt-8 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[1.65] text-white/80 max-w-2xl">
                {content.hero.text}
              </p>
            </div>

            <div
              className="w-full overflow-hidden rounded-[16px] lg:rounded-none border border-white/10 lg:border-x-0 backdrop-blur-[3px] bg-black/[0.03] mb-12 sm:mb-16 lg:mb-20"
              style={{ WebkitBackdropFilter: "blur(3px)" }}
            >
              <div className="w-full backdrop-blur-md flex flex-col lg:flex-row">
                <div className="flex-1 px-5 py-6 sm:py-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                  <Eyebrow variant="green-no-dash" className="mb-4 sm:mb-6 lg:mb-8">
                    {content.hero.clientProofTitle}
                  </Eyebrow>
                  <ul className="space-y-1 sm:space-y-1.5">
                    {content.hero.clientProofItems.map((item, idx) => (
                      <li key={idx} className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold leading-[130%]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                  {content.hero.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col justify-between p-6 sm:p-6 lg:p-8 text-left">
                      <p className="text-4xl sm:text-4xl lg:text-[52px] font-semibold leading-[100%] tracking-[-0.8px]">
                        {stat.value}
                      </p>
                      <p className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Case Studies Section */}
      <Section theme="light" spacing="both" className="case-studies-section">
        <Container>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight mb-8 sm:mb-10 lg:mb-12">
            {content.caseStudies.title}
          </h2>

          <div className="flex flex-col gap-3">
            {content.caseStudies.items.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} reverse={index % 2 !== 0} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Trusted Clients Logos Grid */}
      <Section theme="light" spacing="both" className="trusted-clients-logo">
        <Container>
          <div className="text-center mb-12 sm:mb-14 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.2] tracking-[-0.8px] text-[#121826]">
              {content.logosSection.title1}{" "}
              <span className="text-[#23C55E] font-bold italic">{content.logosSection.highlight1}</span>
            </h2>
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-bold italic leading-[1.2] tracking-[-0.8px] text-[#121826]">
              {content.logosSection.title2}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-[#E5E7EB] border border-[#E5E7EB] rounded-[16px] sm:rounded-[20px] overflow-hidden">
            {content.logosSection.logos.map((logo, index) => {
              // Figma layout: Row 1 ends (index 0 and 3) span 2 columns, Row 4 center (index 18 Cargomatic) spans 2 columns
              const isSpan2 = index === 0 || index === 3 || index === 18;
              const isLastMobile = index === content.logosSection.logos.length - 1;

              return (
                <div
                  key={logo.name}
                  className={`bg-white flex items-center justify-center p-4 sm:p-5 lg:p-6 min-h-[110px] sm:min-h-[130px] lg:min-h-[150px] ${
                    isSpan2 ? "lg:col-span-2" : "lg:col-span-1"
                  } ${
                    isLastMobile ? "col-span-2 sm:col-span-1" : "col-span-1"
                  }`}
                >
                  <div className="relative w-[192px] max-w-full h-[67px] flex items-center justify-center">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      width={192}
                      height={67}
                      className="w-[192px] max-w-full h-[67px] max-h-full object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Reviews Section */}
      <Section theme="dark" spacing="both" className="reviews-section">
        <Container>
          <div className="flex flex-col justify-center">
            <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-10 sm:mb-12 lg:mb-16 text-white">
              {content.reviewsSection.title}
            </h2>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-7.5">
              <div className="relative w-full lg:w-[calc(50%-15px)] rounded-[10px] border border-white/12 overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[740px]">
                <Image
                  src={content.reviewsSection.mainReview.image}
                  alt={content.reviewsSection.mainReview.author}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-[#121826]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-12">
                  <p className="text-[20px] sm:text-[24px] lg:text-[30px] font-medium leading-[1.3] mb-4 sm:mb-6 text-white">
                    {content.reviewsSection.mainReview.quote}
                  </p>
                  <div>
                    <p className="text-[15px] sm:text-[16px] font-bold text-white">{content.reviewsSection.mainReview.author}</p>
                    <p className="text-[13px] sm:text-[14px] text-white/70 mt-0.5 sm:mt-1">{content.reviewsSection.mainReview.role}</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[calc(50%-15px)] flex flex-col justify-between gap-4">
                {content.reviewsSection.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-[#182030] rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 border border-white/5 flex flex-col justify-between min-h-0 sm:min-h-[162px]"
                  >
                    <p className="text-[15px] sm:text-[16px] lg:text-lg font-medium leading-[1.45] text-white">
                      {review.text}
                    </p>

                    <div className="flex items-center justify-between mt-4 sm:mt-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={review.avatar}
                            alt={review.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-[13px] sm:text-[14px] font-medium text-white/70">{review.author}</p>
                      </div>
                      <svg className="opacity-12" width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.69412 16.9412H6.77647L10.1647 10.1647V0H0V10.1647H5.08235L1.69412 16.9412ZM15.2471 16.9412H20.3294L23.7176 10.1647V0H13.5529V10.1647H18.6353L15.2471 16.9412Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Where FIAB Works Section */}
      <Section spacing="both" className="fiab-works-section bg-[#EDE9E6] text-[#16181d]">
        <Container>
          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="pr-0 lg:pr-12">
                <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] tracking-[-0.8px] text-[#16181d]">
                  Where FIAB Works
                </h2>
                <p className="mt-4 sm:mt-6 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70">
                  Technology and SaaS, e-commerce and retail, professional services, manufacturing and supply chain, robotics, healthcare technology, and logistics, across the US and internationally.
                </p>
                <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-white px-3.5 sm:px-5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-medium text-[#16181d] shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative w-full aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden shadow-sm">
                <Image
                  src="/clients/FIABworks.png"
                  alt="FIAB Works"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="relative w-full aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden order-2 lg:order-1 shadow-sm">
                <Image
                  src="/clients/IntroducingFIAB.png"
                  alt="Introducing FIAB"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="pr-0 lg:pl-12 order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] tracking-[-0.8px] text-[#16181d]">
                  Introducing FIAB to a Portfolio Company?
                </h2>
                <p className="mt-4 sm:mt-6 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70">
                  There is a dedicated page covering how an engagement starts, what your founders will experience, and the results other portfolio companies have seen.
                </p>
                <div className="mt-6 sm:mt-8">
                  {/* Yahan custom color aur size apply kiya hai */}
                  <GreenButton
                    label="For VCs & Advisors"
                    href="/vc-advisors"
                    bgColor="#121826"
                    textColor="#ffffff"
                    size={{
                      width: "257px",
                      height: "62px",
                      paddingX: "30px",
                      paddingY: "10px",
                      fontSize: "16px"
                    }}
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* NEW: Reusable Footer Hero */}
      <FooterHero
        variant="clients"
        title="Your company could be"
        highlight="the next case study"
        text="Tell us where the pressure is. A 30-minute discovery call maps what to fix first."
        buttonLabel="Join the Talent Network"
        buttonUrl="/#contact"
      />

      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}

// Case Study Card Component
function CaseStudyCard({ study, reverse }: { study: ClientCaseStudy; reverse: boolean }) {
  return (
    <div className={`relative isolate flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} overflow-hidden rounded-[16px] bg-[#121826] min-h-[500px] lg:p-12.5`}>
      {/* Green corner glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[110px] ${reverse ? '-left-[110px]' : '-right-[110px]'} h-[220px] w-[220px] rounded-full bg-[#23C55E] blur-[90px] -z-10`}
      />

      <div className="relative z-10 rounded-t-[16px] lg:rounded-[10px] overflow-hidden w-full lg:w-1/2 min-h-[260px] sm:min-h-[320px] lg:min-h-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:py-0 lg:px-8 xl:px-12 lg:w-1/2 text-white">
        <Eyebrow variant="green-no-dash" className="mb-3 sm:mb-4">
          {study.label}
        </Eyebrow>
        <h3 className="text-2xl sm:text-[26px] lg:text-[30px] font-semibold leading-[1.15] tracking-tight mb-6 sm:mb-8">
          {study.title}
        </h3>

        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
          <div>
            <h4 className="text-[13px] sm:text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1.5 sm:mb-2">CHALLENGE:</h4>
            <p className="text-[13.5px] sm:text-[14px] font-light leading-[150%] text-white/70">{study.challenge}</p>
          </div>
          <div>
            <h4 className="text-[13px] sm:text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1.5 sm:mb-2">SOLUTION:</h4>
            <p className="text-[13.5px] sm:text-[14px] font-light leading-[150%] text-white/70">{study.solution}</p>
          </div>
          <div>
            <h4 className="text-[13px] sm:text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1.5 sm:mb-2">OUTCOME:</h4>
            <p className="text-[13.5px] sm:text-[14px] font-light leading-[150%] text-white/70">{study.outcome}</p>
          </div>
        </div>

        <div>
          <GreenButton
            label="Read a Full Case Study"
            href={study.ctaUrl}
            onDark={true}
            size="50"
          />
        </div>
      </div>
    </div>
  );
}