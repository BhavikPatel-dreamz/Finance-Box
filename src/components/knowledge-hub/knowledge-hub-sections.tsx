import type { ReactNode } from "react";
import Image from "next/image";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import Container from "../ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { KnowledgeHubContent } from "@/content/knowledge-hub";

export function KnowledgeHubBanner({ hero, header }: { hero: KnowledgeHubContent["hero"]; header: ReactNode }) {
  // 1. Hero Section
  return (
    <section className="hero-section relative min-h-[auto] sm:min-h-[460px] lg:h-[525px] overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
      />

      <div className="relative z-10 flex flex-col justify-center h-full">
        {header}

        <Container>
          <div className="flex-1 flex items-center pt-6 sm:pt-8 lg:pt-0 pb-10 sm:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center w-full">
              <Reveal immediate preset="slide-up" delay={80} distance={24}>
                <Eyebrow variant="dark" className="mb-4 sm:mb-6">
                  {hero.eyebrow}
                </Eyebrow>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-4 sm:mb-6 lg:max-w-[400px]">
                  {hero.title}
                  <span className="text-[#23C55E]">{hero.highlight}</span>
                </h1>
              </Reveal>
              <Reveal immediate preset="slide-up" delay={260} distance={24} className="max-w-md lg:justify-self-end">
                <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] lg:leading-[160%] text-white/80 mb-6 sm:mb-8">
                  {hero.text}
                </p>
                <div>
                  <GreenButton
                    label={hero.cta.label}
                    href={hero.cta.url}
                    bgColor="#ffffff"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export function KnowledgeHubBlogs({ blogs }: { blogs: KnowledgeHubContent["blogs"] }) {
  // 2. Our Blogs Section
  return (
    <Section theme="light" spacing="both">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.15] lg:leading-[1.05] tracking-[-0.8px] mb-8 sm:mb-12 lg:mb-16">
            {blogs.title}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.items.map((blog, idx) => (
            <StaggerItem
              key={idx}
              index={idx}
              className="group card-hover relative rounded-[10px] overflow-hidden h-[480px] sm:h-[540px] md:h-[580px] lg:h-[661px] flex items-end bg-gray-100 shadow-sm"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover image-hover-zoom"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[24.97%] to-black/50 to-[100%]" />

              <div className="relative bg-[#121826] rounded-[14px] sm:rounded-[16px] p-4.5 sm:p-5 lg:p-6 m-3 sm:m-3.5 lg:m-4 w-[calc(100%-24px)] sm:w-[calc(100%-28px)] lg:w-[calc(100%-32px)] text-white flex flex-col justify-between min-h-[210px] sm:min-h-[225px] lg:min-h-[247px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3 text-[11px] sm:text-[11.5px] lg:text-[12px] font-normal text-white/60 mb-3 sm:mb-3.5 lg:mb-4">
                    <span className="text-white font-medium uppercase font-mono tracking-wider">{blog.category}</span>
                    <span className="opacity-40">|</span>
                    <span className="font-mono">{blog.date}</span>
                    <span className="opacity-40">|</span>
                    <span className="font-mono">{blog.readTime}</span>
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold leading-[1.25] lg:leading-[1.2] mb-4 sm:mb-5 lg:mb-6">
                    {blog.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
                  </div>
                  <span className="text-[13px] sm:text-[14px] font-medium text-white/80">{blog.author.name}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal preset="slide-up" delay={200} className="mt-8 sm:mt-10 lg:mt-12.5 flex justify-center">
          <GreenButton
            label={blogs.cta.label}
            href={blogs.cta.url}
            bgColor="#121826"
            textColor="#ffffff"
          />
        </Reveal>

      </Container>
    </Section>
  );
}

export function KnowledgeHubResources({ resources }: { resources: KnowledgeHubContent["resources"] }) {
  // 3. Resources Banner
  return (
    <Section theme="cream" className="py-10 sm:py-12 md:py-15">
      <Container>
        <Reveal preset="slide-up" distance={20} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] font-medium leading-[1.15] lg:leading-[1.05] tracking-[-0.8px] mb-3 sm:mb-4">
              {resources.title}
              <span className="text-[#23C55E] font-black italic">{resources.highlight}</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#121826]/70 lg:text-[#121826]/60">
              {resources.text}
            </p>
          </div>
          <div className="shrink-0">
            <GreenButton
              label={resources.cta.label}
              href={resources.cta.url}
              bgColor="#121826"
              textColor="#ffffff"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export function KnowledgeHubCaseStudies({ caseStudy }: { caseStudy: KnowledgeHubContent["caseStudy"] }) {
  // 4. Case Study Section
  return (
    <Section theme="light" spacing="both">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] leading-[1.15] lg:leading-[1.05] mb-8 sm:mb-12 lg:mb-16">
            {caseStudy.title}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 md:gap-4 lg:gap-5">
          {caseStudy.items.map((item, idx) => (
            <StaggerItem key={idx} index={idx} className="group card-hover flex flex-col">
              <div className="relative w-full aspect-[414/560] max-h-[460px] sm:max-h-[500px] md:max-h-none lg:aspect-auto lg:h-[560px] rounded-[6px] sm:rounded-[8px] lg:rounded-[5px] overflow-hidden mb-4 sm:mb-5 lg:mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover image-hover-zoom"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-[16px] sm:text-[17px] lg:text-[18px] font-semibold leading-[1.3] lg:leading-[1.2] mb-2">
                {item.title}
              </h3>
              <p className="text-[13px] sm:text-[14px] font-normal leading-[160%] text-[#121826]/70">
                {item.text}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal preset="slide-up" delay={200} className="mt-8 sm:mt-10 lg:mt-12.5 flex justify-center">
          <GreenButton
            label={caseStudy.cta.label}
            href={caseStudy.cta.url}
            bgColor="#121826"
            textColor="#ffffff"
          />
        </Reveal>

      </Container>
    </Section>
  );
}

export function KnowledgeHubNewsletter({ newsletter }: { newsletter: KnowledgeHubContent["newsletter"] }) {
  // 5. Newsletter Section
  return (
    <Section theme="dark" spacing="both">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">

          {/* Left Side: Text & CTA */}
          <Reveal preset="slide-left" distance={20} className="w-full max-w-xl lg:max-w-md lg:pt-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] lg:leading-[1.1] tracking-[-0.8px] mb-4 sm:mb-6">
              {newsletter.title} <br className="hidden sm:inline" />
              <span className="font-black italic">{newsletter.highlight}</span>
            </h2>
            <p className="text-[14px] sm:text-[16px] font-light leading-[160%] text-white/70 mb-6 sm:mb-8">
              {newsletter.text}
            </p>

            <GreenButton
              label={newsletter.cta.label}
              href={newsletter.cta.url}
              bgColor="#23C55E"
              onDark={true}
            />
          </Reveal>

          {/* Right Side: Form */}
          <Reveal preset="slide-right" distance={20} className="w-full bg-[#191F2D] rounded-[10px] p-4.5 sm:p-6 md:p-7.5 border border-white/6">
            <form className="flex flex-col gap-3.5 sm:gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full h-[46px] sm:h-[50px] rounded-[10px] border border-white/10 bg-[#121826] py-3 sm:py-4 px-4 sm:px-5 text-[15px] sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] transition-colors duration-200"
              />
              <input
                type="email"
                placeholder="Work E-mail"
                className="w-full h-[46px] sm:h-[50px] rounded-[10px] border border-white/10 bg-[#121826] py-3 sm:py-4 px-4 sm:px-5 text-[15px] sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] transition-colors duration-200"
              />
              <input
                type="text"
                placeholder="Role"
                className="w-full h-[46px] sm:h-[50px] rounded-[10px] border border-white/10 bg-[#121826] py-3 sm:py-4 px-4 sm:px-5 text-[15px] sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] transition-colors duration-200"
              />
              <textarea
                placeholder="Write your message..."
                rows={5}
                className="w-full rounded-[10px] border border-white/10 bg-[#121826] py-3 sm:py-4 px-4 sm:px-5 text-[15px] sm:text-base text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] transition-colors duration-200 resize-none"
              />
              <div className="mt-2">
                <GreenButton
                  label="Submit"
                  href="#"
                  bgColor="#ffffff"
                  size="50"
                />
              </div>
            </form>
          </Reveal>

        </div>
      </Container>
    </Section>
  );
}