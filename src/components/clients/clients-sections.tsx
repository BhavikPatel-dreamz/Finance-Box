import type { ReactNode } from "react";
import Image from "next/image";
import type { ClientsContent } from "@/content/clients";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import Container from "../ui/container";
import Section from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export type ClientsWhereFiabWorksContent = {
  title: string;
  text: string;
  industries: string[];
  image: { url: string; alt: string };
  portfolio: {
    title: string;
    text: string;
    image: { url: string; alt: string };
    cta: { label: string; url: string };
  };
};

export function ClientsBanner({ hero, header }: { hero: ClientsContent["hero"]; header: ReactNode }) {
  // Hero Section
  return (
    <div className="hero-section relative overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/clients/client-hero-bg.svg)" }}
      />

      <div className="relative z-1">
        {header}

        <Container>
          <div className="pt-10 md:pt-12 xl:pt-24 pb-10 sm:pb-12 xl:pb-20 flex flex-col items-center text-center">
            <Reveal immediate preset="slide-up" delay={80} distance={18}>
              <Eyebrow variant="dark-no-dash" className="mb-6">
                {hero.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal immediate preset="slide-up" delay={220} distance={32}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium leading-[1.12] tracking-tight text-white">
                {hero.title}
                <span className="font-extrabold italic"> {hero.highlight}</span>
              </h1>
            </Reveal>
            <Reveal immediate preset="slide-up" delay={380} distance={24}>
              <p className="mt-4 sm:mt-6 lg:mt-8 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[1.65] text-white/80 max-w-2xl">
                {hero.text}
              </p>
            </Reveal>
          </div>

          <Reveal
            immediate
            preset="slide-up"
            delay={520}
            distance={28}
            className="w-full overflow-hidden rounded-[16px] lg:rounded-none border border-white/10 lg:border-x-0 backdrop-blur-[3px] bg-black/[0.03] mb-12 sm:mb-16 xl:mb-20"
            style={{ WebkitBackdropFilter: "blur(3px)" }}
          >
            <div className="w-full backdrop-blur-md flex flex-col lg:flex-row">
              <div className="flex-1 px-5 py-6 sm:py-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                <Eyebrow variant="green-no-dash" className="mb-4 sm:mb-6 lg:mb-8">
                  {hero.clientProofTitle}
                </Eyebrow>
                <ul className="space-y-1 sm:space-y-1.5">
                  {hero.clientProofItems.map((item, idx) => (
                    <li key={idx} className="text-[17px] sm:text-[18px] lg:text-[20px] font-semibold leading-[130%]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                {hero.stats.map((stat, idx) => (
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
          </Reveal>
        </Container>
      </div>
    </div>
  );
}

export function ClientsCaseStudies({ caseStudies }: { caseStudies: ClientsContent["caseStudies"] }) {

  console.log("caseStudies", caseStudies);

  // Case Studies Section
  return (
    <Section theme="light" spacing="both" className="case-studies-section">
      <Container>
        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-tight mb-8 sm:mb-10 lg:mb-12">
            {caseStudies.title}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {caseStudies.items.map((study, index) => (
            <Reveal key={study.id} preset="slide-up" distance={24} delay={index * 80}>
              <CaseStudyCard index={index} study={study} reverse={index % 2 !== 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ClientsTrustedCompanies({ logosSection }: { logosSection: ClientsContent["logosSection"] }) {
  // Trusted Clients Logos Grid
  return (
    <Section theme="light" spacing="bottom" className="trusted-clients-logo">
      <Container>
        <Reveal preset="slide-up" distance={20} className="text-center mb-12 sm:mb-14 lg:mb-16">
          {(() => {
            let t1 = logosSection.title1;
            const h1 = logosSection.highlight1;
            const t2 = logosSection.title2;
            if (t1 && h1 && t1.endsWith(h1)) {
              t1 = t1.slice(0, -h1.length).trim();
            }
            if (t1 && t2 && t1.endsWith(t2)) {
              t1 = t1.slice(0, -t2.length).trim();
            }
            return (
              <>
                <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.2] tracking-[-0.8px] text-[#121826]">
                  {t1}{" "}
                  {h1 && <span className="text-[#23C55E] font-bold italic">{h1}</span>}
                </h2>
                {t2 && (
                  <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-bold italic leading-[1.2] tracking-[-0.8px] text-[#121826]">
                    {t2}
                  </h2>
                )}
              </>
            );
          })()}
        </Reveal>

        <StaggerGroup staggerDelay={60} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-[#E5E7EB] border border-black/10 rounded-[10px] overflow-hidden">
          {logosSection.logos.map((logo, index) => {
            const isSpan2 = index === 0 || index === 3 || index === 18;
            const isLastMobile = index === logosSection.logos.length - 1;

            return (
              <StaggerItem
                key={`${logo.name}-${index}`}
                index={index}
                className={`card-hover bg-white flex items-center justify-center p-4 sm:p-5 lg:p-6 min-h-[110px] sm:min-h-[130px] lg:min-h-[150px] ${
                  isSpan2 ? "lg:col-span-2" : "lg:col-span-1"
                } ${
                  isLastMobile ? "col-span-2 sm:col-span-1" : "col-span-1"
                }`}
              >
                <div className="relative w-[192px] max-w-full h-[67px] flex items-center justify-center">
                  {logo.image && <Image
                    src={logo.image}
                    alt={logo.name}
                    width={192}
                    height={67}
                    className="w-[192px] max-w-full h-[67px] max-h-full object-contain"
                  />}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}

export function ClientsTestimonials({ reviewsSection }: { reviewsSection: ClientsContent["reviewsSection"] }) {
  // Reviews Section
  return (
    <Section theme="dark" spacing="both" className="reviews-section">
      <Container>
        <div className="flex flex-col justify-center">
          <Reveal preset="slide-up" distance={20}>
            <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-10 sm:mb-12 lg:mb-16 text-white">
              {reviewsSection.title}
            </h2>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-7.5">
            <Reveal preset="slide-left" distance={20} className="group card-hover relative w-full lg:w-[calc(50%-15px)] rounded-[10px] border border-black/10 overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[740px]">
              {reviewsSection?.mainReview?.image && <Image
                src={reviewsSection.mainReview.image}
                alt={reviewsSection.mainReview.author}
                fill
                className="object-cover image-hover-zoom"
              />}
              <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-[#121826]/40 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 md:p-12">
                <p className="text-[20px] sm:text-[24px] lg:text-[30px] font-medium leading-[1.3] mb-4 sm:mb-6 text-white">
                  {reviewsSection.mainReview.quote}
                </p>
                <div>
                  <p className="text-[15px] sm:text-[16px] font-bold text-white">{reviewsSection.mainReview.author}</p>
                  <p className="text-[13px] sm:text-[14px] text-white/70 mt-0.5 sm:mt-1">{reviewsSection.mainReview.role}</p>
                </div>
              </div>
            </Reveal>

            <StaggerGroup staggerDelay={140} className="w-full lg:w-[calc(50%-15px)] flex flex-col justify-between gap-4">
              {reviewsSection.reviews.map((review, rIdx) => (
                <StaggerItem
                  key={review.id}
                  index={rIdx}
                  className="card-hover bg-[#182030] rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 border border-white/5 flex flex-col justify-between min-h-0 sm:min-h-[162px]"
                >
                  <p className="text-[15px] sm:text-[16px] lg:text-lg font-medium leading-[1.45] text-white">
                    {review.text}
                  </p>

                  <div className="flex items-center justify-between mt-4 sm:mt-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0">
                        {review.avatar && <Image
                          src={review.avatar}
                          alt={review.author}
                          fill
                          className="object-cover"
                        />}
                      </div>
                      <p className="text-[13px] sm:text-[14px] font-medium text-white/70">{review.author}</p>
                    </div>
                    <svg className="opacity-12" width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.69412 16.9412H6.77647L10.1647 10.1647V0H0V10.1647H5.08235L1.69412 16.9412ZM15.2471 16.9412H20.3294L23.7176 10.1647V0H13.5529V10.1647H18.6353L15.2471 16.9412Z" fill="white" />
                    </svg>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ClientsWhereFiabWorks({ works }: { works: ClientsWhereFiabWorksContent }) {
  // Where FIAB Works Section
  return (
    <Section spacing="both" className="fiab-works-section bg-[#EDE9E6] text-[#16181d]">
      <Container>
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <Reveal preset="slide-left" distance={20} className="pr-0 lg:pr-12">
              <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] tracking-[-0.8px] text-[#16181d]">
                {works.title}
              </h2>
              <p className="mt-4 sm:mt-6 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70">
                {works.text}
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
                {works.industries.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-white px-3.5 sm:px-5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-medium text-[#16181d] shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal preset="slide-right" distance={20} className="group card-hover relative w-full aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden shadow-sm">
              {works.image?.url && <Image
                src={works.image.url}
                alt={works.image.alt}
                fill
                className="object-cover image-hover-zoom"
              />}
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <Reveal preset="slide-left" distance={20} className="group card-hover relative w-full aspect-[4/3] rounded-[16px] sm:rounded-[24px] overflow-hidden order-2 lg:order-1 shadow-sm">
              {works.portfolio.image?.url && <Image
                src={works.portfolio.image.url}
                alt={works.portfolio.image.alt}
                fill
                className="object-cover image-hover-zoom"
              />}
            </Reveal>
            <Reveal preset="slide-right" distance={20} className="pr-0 lg:pl-12 order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] tracking-[-0.8px] text-[#16181d]">
                {works.portfolio.title}
              </h2>
              <p className="mt-4 sm:mt-6 text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70">
                {works.portfolio.text}
              </p>
              <div className="mt-6 sm:mt-8">
                <GreenButton
                  label={works.portfolio.cta.label}
                  href={works.portfolio.cta.url}
                  bgColor="#121826"
                  textColor="#ffffff"
                  className="w-full sm:w-auto"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </Container>
    </Section>
  );
}
