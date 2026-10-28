import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent } from "@/content/home";
import { mergePeopleOperations } from "./merge";
import { peopleOperationsContent } from "@/content/people-operations";
import type { RawSection } from "@/lib/wordpress/content";

export function PeopleOperationsPage({ sections }: { sections: RawSection[] }) {
  const content = mergePeopleOperations(peopleOperationsContent, sections);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#16181d]">
      
      {/* 1. Hero Section (Header + Hero = 525px) */}
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

          <div className="flex-1 flex items-center w-full max-w-6xl mx-auto px-6 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              
              <div>
                <p className="text-[14px] font-medium tracking-[1.5px] uppercase text-[#23C55E] font-mono mb-6">
                  {content.hero.eyebrow}
                </p>
                <h1 className="text-[54px] font-medium leading-[1.1] tracking-[-0.8px] text-white mb-6">
                  {content.hero.title}
                  <span className="text-[#23C55E]">{content.hero.highlight}</span>
                </h1>
              </div>

              <div className="max-w-md lg:justify-self-end">
                <p className="text-[16px] font-light leading-[160%] text-white/80 mb-8">
                  {content.hero.text}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Naya Section: Intro (Image Left, Text Right) */}
      <section className="bg-white px-6 py-24 text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Image */}
          <div className="w-full lg:w-[554px] shrink-0 relative aspect-[554/643] rounded-[16px] overflow-hidden">
            <Image
              src={content.intro.image}
              alt="FIAB People Operations"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Text */}
          <div className="w-full lg:flex-1">
            <h2 className="text-[36px] font-medium leading-[1.3] tracking-[-0.8px] mb-6">
              {content.intro.title}
              <span className="font-bold italic text-[#23C55E]">{content.intro.highlight}</span>
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-[#16181d]/70">
              {content.intro.text}
            </p>
          </div>

        </div>
      </section>

      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}