import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent } from "@/content/home";
import { mergeKnowledgeHub } from "./merge";
import { knowledgeHubContent } from "@/content/knowledge-hub";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { FooterHero } from "../ui/footer-hero";
import { Eyebrow } from "@/components/ui/eyebrow";

export function KnowledgeHubPage({ sections }: { sections: RawSection[] }) {
  const content = mergeKnowledgeHub(knowledgeHubContent, sections);

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
                <div>
                  <GreenButton
                    label={content.hero.cta.label}
                    href={content.hero.cta.url}
                    bgColor="#ffffff"
                    size={{ width: "275px", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Blogs Section */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 text-[#121826] text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px]">

          <h2 className="text-center text-[44px] font-medium leading-[1.05] tracking-[-0.8px] mb-16">
            {content.blogs.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.blogs.items.map((blog, idx) => (
              <div key={idx} className="relative rounded-[10px] overflow-hidden h-[661px] flex items-end bg-gray-100">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-transparent opacity-80" />

                <div className="relative z-10 bg-[#121826] rounded-[10px] p-6 m-4 w-[calc(100%-32px)] text-white flex flex-col justify-between min-h-[247px]">
                  <div>
                    <div className="flex items-center gap-3 text-[12px] font-normal text-white/70 mb-4">
                      <span className="text-[#23C55E] font-medium">{blog.category}</span>
                      <span>|</span>
                      <span>{blog.date}</span>
                      <span>|</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-[24px] font-semibold leading-[1.2] mb-6">{blog.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-[38px] h-[38px] rounded-full overflow-hidden border border-white/10">
                      <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
                    </div>
                    <span className="text-[14px] font-medium text-white/80">{blog.author.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <GreenButton
              label={content.blogs.cta.label}
              href={content.blogs.cta.url}
              bgColor="#121826"
              textColor="#ffffff"
              size={{ width: "232px", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
            />
          </div>

        </div>
      </section>

      {/* 3. Resources Banner */}
      <section className="bg-[#EDE9E6] px-6 py-16 text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[50px] font-medium leading-[1.05] tracking-[-0.8px] mb-4">
              {content.resources.title}
              <span className="text-[#23C55E] font-black italic">{content.resources.highlight}</span>
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-[#121826]/70">
              {content.resources.text}
            </p>
          </div>
          <div className="shrink-0">
            <GreenButton
              label={content.resources.cta.label}
              href={content.resources.cta.url}
              bgColor="#121826"
              textColor="#ffffff"
              size={{ width: "273px", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
            />
          </div>
        </div>
      </section>

      {/* 4. Case Study Section */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 text-[#121826] text-[#16181d]">
        <div className="mx-auto w-full max-w-[1280px]">

          <h2 className="text-center text-[50px] font-medium leading-[1.05] tracking-[-0.8px] mb-16">
            {content.caseStudy.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.caseStudy.items.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="relative w-full h-[560px] rounded-[5px] overflow-hidden mb-6">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <h3 className="text-[18px] font-semibold leading-[1.2] mb-2">{item.title}</h3>
                <p className="text-[14px] font-normal leading-[160%] text-[#121826]/70">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <GreenButton
              label={content.caseStudy.cta.label}
              href={content.caseStudy.cta.url}
              bgColor="#121826"
              textColor="#ffffff"
              size={{ width: "250px", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
            />
          </div>

        </div>
      </section>

      {/* 5. Naya Section: Newsletter */}
      <section className="bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
        <div className="mx-auto w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Side: Text & CTA */}
          <div className="max-w-md lg:pt-4">
            <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-6">
              {content.newsletter.title} <br />
              <span className="font-black italic">{content.newsletter.highlight}</span>
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-white/70 mb-8">
              {content.newsletter.text}
            </p>

            {/* Updated Button Size */}
            <GreenButton
              label={content.newsletter.cta.label}
              href={content.newsletter.cta.url}
              bgColor="#23C55E"
              onDark={true}
              size={{
                width: "250px",
                height: "50px",
                paddingX: "20px",
                paddingY: "10px",
                fontSize: "16px"
              }}
            />
          </div>

          {/* Right Side: Form */}
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
                placeholder="Role"
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
      </section>

      {/* 6. NAYA: Reusable Footer Hero */}
      <FooterHero
        title="Want a specific"
        highlight="playbook?"
        text="Tell us what you're building—close, RevOps, compliance, or hiring—and we'll share a right-sized plan."
        buttonLabel="Join the Talent Network"
        buttonUrl="/careers"
      />

      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}