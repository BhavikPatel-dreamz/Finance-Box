import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent } from "@/content/home";
import { mergePeopleOperations } from "./merge";
import { peopleOperationsContent } from "@/content/people-operations";
import type { RawSection } from "@/lib/wordpress/content";
import { FooterHero } from "../ui/footer-hero";
import { Eyebrow } from "@/components/ui/eyebrow";

export function PeopleOperationsPage({ sections }: { sections: RawSection[] }) {
  const content = mergePeopleOperations(peopleOperationsContent, sections);

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

      {/* 2. Intro Section */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 text-[#121826] text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-[554px] shrink-0 relative aspect-[554/643] rounded-[16px] overflow-hidden">
            <Image src={content.intro.image} alt="FIAB People Operations" fill className="object-cover" />
          </div>
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

      {/* 3. Naya Section: What We Do */}
      <section className="bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
        <div className="mx-auto w-full max-w-[1280px]">

          <h2 className="text-center text-[50px] font-medium leading-[1.05] tracking-[-0.8px] mb-16">
            {content.whatWeDo.title}
          </h2>

          <div className="flex flex-col gap-8">
            {content.whatWeDo.items.map((card, idx) => (
              <div
                key={idx}
                className={`relative bg-[#191F2D] rounded-[16px] overflow-hidden min-h-[592px] flex flex-col ${card.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Background Gradient Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.bgImage}
                    alt="Background Gradient"
                    fill
                    className="object-cover opacity-100"
                  />
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-10 lg:p-16 flex flex-col justify-center lg:w-1/2">
                  <h3 className="text-[30px] font-semibold leading-[1.2] mb-4">
                    {card.title}
                  </h3>
                  <p className="text-[16px] font-light leading-[150%] text-white/70 mb-8">
                    {card.text}
                  </p>

                  <ul className="space-y-3">
                    {card.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="mt-2 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                        <span className="text-[16px] font-medium leading-[1.2] text-white/90">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Container */}
                <div className="relative z-10 w-full lg:w-1/2 min-h-[300px] lg:min-h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={`object-cover ${card.reverse ? 'lg:rounded-r-[16px]' : 'lg:rounded-l-[16px]'}`}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Naya Section: Where we help */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 text-[#121826] text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px]">

          <h2 className="text-center text-[50px] font-medium leading-[1.05] tracking-[-0.8px] mb-16">
            {content.whereWeHelp.title}
            <span className="font-extrabold italic">{content.whereWeHelp.highlight}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.whereWeHelp.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#EDE9E6] rounded-[10px] p-8 min-h-[145px] flex flex-col justify-center border border-gray-200"
              >
                <h3 className="text-[30px] font-semibold leading-[1.1] mb-2">{card.title}</h3>
                <p className="text-[16px] font-normal leading-[150%] text-[#121826]/70">{card.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. NAYA: Reusable Footer Hero */}
      <FooterHero
        title="Need to strengthen"
        highlight="your people function?"
        text="Whether you're building your HR function, scaling your team or looking to streamline existing processes, let's talk about where you need support."
        buttonLabel="Book a Discovery Call"
        buttonUrl="/contact-us"
      />

      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}