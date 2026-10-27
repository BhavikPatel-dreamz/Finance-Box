import Image from "next/image";
import { HomeFooter } from "@/components/home/home-page";
import { HomeHeader } from "@/components/home/home-header";
import { mergeClients } from "./merge";
import { homeContent } from "@/content/home";
import { clientsContent, type ClientCaseStudy } from "@/content/clients";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { FooterHero } from "@/components/ui/footer-hero";

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
      <div className="relative overflow-hidden bg-[#07110d]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/Clients-hero-bg.png"
            alt="Clients Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07110d]/60 via-transparent to-[#07110d]" />
        </div>

        <div className="relative z-10">
          <HomeHeader header={homeContent.header} surface="plain" logoHref="/" />

          <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-20 flex flex-col items-center text-center">
            <p className="text-[14px] font-medium tracking-[1.5px] uppercase text-[#23C55E] font-mono">
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-6 text-[54px] leading-[1] font-medium tracking-[-0.8px]">
              {content.hero.title}
              <span className="font-extrabold italic"> {content.hero.highlight}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] font-light leading-[160%] text-white/80">
              {content.hero.text}
            </p>
          </div>

          <div className="mx-auto w-full max-w-[1140px] px-6 pb-20">
            <div className="w-full border border-white/10 bg-[#07110d]/60 backdrop-blur-md flex flex-col lg:flex-row">
              <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
                <p className="text-[14px] font-medium tracking-[1.5px] uppercase text-[#23C55E] font-mono mb-4">
                  {content.hero.clientProofTitle}
                </p>
                <ul className="space-y-2">
                  {content.hero.clientProofItems.map((item, idx) => (
                    <li key={idx} className="text-[18px] font-medium leading-[140%]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                {content.hero.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col justify-center p-8 text-left">
                    <p className="text-[52px] font-semibold leading-[100%] tracking-[-0.8px]">
                      {stat.value}
                    </p>
                    <p className="mt-4 text-[16px] font-light leading-[160%] text-white/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <section className="bg-white px-6 py-20 text-[#16181d]">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-[40px] font-medium tracking-tight mb-12">
            {content.caseStudies.title}
          </h2>
          
          <div className="flex flex-col gap-8">
            {content.caseStudies.items.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} reverse={index % 2 !== 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Clients Logos Grid */}
      <section className="bg-white px-6 pb-24 text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="text-center mb-16">
            <h2 className="text-[50px] font-medium leading-[1.2] tracking-[-0.8px]">
              {content.logosSection.title1}{" "}
              <span className="text-[#23C55E] font-extrabold italic">{content.logosSection.highlight1}</span>
            </h2>
            <h2 className="text-[50px] font-extrabold italic leading-[1.2] tracking-[-0.8px]">
              {content.logosSection.title2}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-gray-200">
            {content.logosSection.logos.map((logo) => (
              <div 
                key={logo.name} 
                className="flex items-center justify-center p-6 border-r border-b border-gray-200 min-h-[120px]"
              >
                <div className="relative w-full h-12">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-[#121826] py-20 px-6">
        <div className="mx-auto w-full max-w-6xl min-h-[985px] flex flex-col justify-center">
          <h2 className="text-center text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-16 text-white">
            {content.reviewsSection.title}
          </h2>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-[calc(50%-12px)] rounded-[10px] overflow-hidden min-h-[500px] lg:min-h-[740px]">
              <Image
                src={content.reviewsSection.mainReview.image}
                alt={content.reviewsSection.mainReview.author}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-[#121826]/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <p className="text-[30px] font-medium leading-[1.3] mb-6 text-white">
                  {content.reviewsSection.mainReview.quote}
                </p>
                <div>
                  <p className="text-[16px] font-bold text-white">{content.reviewsSection.mainReview.author}</p>
                  <p className="text-[14px] text-white/70 mt-1">{content.reviewsSection.mainReview.role}</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[calc(50%-12px)] flex flex-col justify-between gap-4">
              {content.reviewsSection.reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-[#182030] rounded-[20px] p-6 border border-white/5 flex flex-col justify-between min-h-[162px]"
                >
                  <p className="text-[16px] font-medium leading-[1.4] text-white">
                    {review.text}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={review.avatar}
                          alt={review.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[14px] text-white/70">{review.author}</p>
                    </div>
                    <svg className="w-8 h-8 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Where FIAB Works Section */}
      <section className="bg-[#EDE9E6] px-6 py-24 text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col gap-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="pr-0 lg:pr-12">
              <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] text-[#16181d]">
                Where FIAB Works
              </h2>
              <p className="mt-6 text-[16px] font-light leading-[160%] text-[#16181d]/70">
                Technology and SaaS, e-commerce and retail, professional services, manufacturing and supply chain, robotics, healthcare technology, and logistics, across the US and internationally.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-[#16181d] shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
              <Image
                src="/clients/FIABworks.png"
                alt="FIAB Works"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden order-2 lg:order-1">
              <Image
                src="/clients/IntroducingFIAB.png"
                alt="Introducing FIAB"
                fill
                className="object-cover"
              />
            </div>
            <div className="pr-0 lg:pl-12 order-1 lg:order-2">
              <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] text-[#16181d]">
                Introducing FIAB to a Portfolio Company?
              </h2>
              <p className="mt-6 text-[16px] font-light leading-[160%] text-[#16181d]/70">
                There is a dedicated page covering how an engagement starts, what your founders will experience, and the results other portfolio companies have seen.
              </p>
              <div className="mt-8">
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
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* NEW: Reusable Footer Hero */}
      <FooterHero
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
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} overflow-hidden rounded-[16px] bg-[#121826] min-h-[500px]`}>
      <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-full">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center p-8 md:p-12 lg:w-1/2 text-white">
        <p className="text-[14px] font-medium tracking-[1.5px] uppercase text-[#23C55E] font-mono mb-4">
          {study.label}
        </p>
        <h3 className="text-[30px] font-semibold leading-[1.1] tracking-tight mb-8">
          {study.title}
        </h3>

        <div className="space-y-6 mb-10">
          <div>
            <h4 className="text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1">CHALLENGE:</h4>
            <p className="text-[14px] font-light leading-[145%] text-white/70">{study.challenge}</p>
          </div>
          <div>
            <h4 className="text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1">SOLUTION:</h4>
            <p className="text-[14px] font-light leading-[145%] text-white/70">{study.solution}</p>
          </div>
          <div>
            <h4 className="text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1">OUTCOME:</h4>
            <p className="text-[14px] font-light leading-[145%] text-white/70">{study.outcome}</p>
          </div>
        </div>

        <div>
          {/* Yahan custom green size apply kiya hai */}
          <GreenButton 
            label="Read a Full Case Study" 
            href={study.ctaUrl}
            size={{
              width: "243px",
              height: "50px",
              paddingX: "20px",
              paddingY: "10px",
              fontSize: "14px"
            }}
          />
        </div>
      </div>
    </div>
  );
}