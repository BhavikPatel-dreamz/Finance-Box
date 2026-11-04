"use client";

import Link from "next/link";
import { BLOG_CARD_CLASS, BlogCard } from "@/components/blog/blog-card";
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
    <section className="hero-section relative min-h-[auto] sm:min-h-[460px] lg:min-h-[525px] overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
      />

      <div className="relative z-1 flex flex-col justify-center h-full">
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
            <StaggerItem key={blog.url || idx} index={idx} className={BLOG_CARD_CLASS}>
              <BlogCard blog={blog} />
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
              {(() => {
                let title = resources.title;
                const hl = resources.highlight;
                if (title && hl && title.endsWith(hl)) {
                  title = title.slice(0, -hl.length).trim();
                }
                return (
                  <>
                    {title}{" "}
                    {hl && (
                      <span className="text-[#23C55E] font-black italic">
                        {hl}
                      </span>
                    )}
                  </>
                );
              })()}
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
            <StaggerItem key={item.url || idx} index={idx} className="group card-hover relative flex flex-col">
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
                {item.url ? (
                  <Link href={item.url} className="after:absolute after:inset-0 after:content-[''] hover:text-[#23C55E] transition-colors duration-300">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
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

export function KnowledgeHubNewsletter({ newsletter, form }: { newsletter: KnowledgeHubContent["newsletter"]; form: ReactNode }) {
  return (
    <Section theme="dark" spacing="both">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">

          {/* Left Side: Text & CTA */}
          <Reveal preset="slide-left" distance={20} className="w-full max-w-xl lg:max-w-md lg:pt-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] lg:leading-[1.1] tracking-[-0.8px] mb-4 sm:mb-6">
              {(() => {
                let title = newsletter.title;
                const hl = newsletter.highlight;
                if (title && hl && title.endsWith(hl)) {
                  title = title.slice(0, -hl.length).trim();
                }
                return (
                  <>
                    {title} <br className="hidden sm:inline" />
                    {hl && <span className="font-black italic">{hl}</span>}
                  </>
                );
              })()}
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
            {form}
          </Reveal>

        </div>
      </Container>
    </Section>
  );
}