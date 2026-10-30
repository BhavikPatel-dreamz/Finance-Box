import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent, type HomeContent } from "@/content/home";
import { mergeContactUs } from "./merge";
import { contactUsContent } from "@/content/contact-us";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";

function withSiteLinks<T extends { url: string }>(value: T): T {
  return { ...value, url: value.url.startsWith("#") ? `/${value.url}` : value.url };
}

function siteHeader(header: HomeContent["header"]): HomeContent["header"] {
  return {
    ...header,
    links: header.links.map((link) => ({
      ...link,
      ...withSiteLinks(link),
      children: link.children.map(withSiteLinks),
    })),
    cta: withSiteLinks(header.cta),
  };
}

function siteFooter(footer: HomeContent["footer"]): HomeContent["footer"] {
  return {
    ...footer,
    columns: footer.columns.map((column) => ({
      ...column,
      links: column.links.map(withSiteLinks),
    })),
  };
}

export function ContactUsPage({ sections }: { sections: RawSection[] }) {
  const content = mergeContactUs(contactUsContent, sections);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#16181d]">
      
      {/* Hero Section (Header + Hero = 525px) */}
      <section className="relative w-full h-[525px] flex flex-col overflow-hidden bg-[#07110d]">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url(/services/hex.svg)`,
              backgroundSize: "56px 64px"
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(ellipse_at_bottom,rgba(35,197,94,0.15),transparent_70%)]" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <HomeHeader header={siteHeader(homeContent.header)} surface="plain" logoHref="/" />

          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-12">
            <Eyebrow variant="dark" className="mb-6">
              {content.hero.eyebrow}
            </Eyebrow>
            <h1 className="text-[54px] font-medium leading-[1.0] tracking-[-0.8px] text-white mb-6">
              {content.hero.title} <span className="text-[#23C55E]">{content.hero.highlight}</span>
            </h1>
            <p className="text-[16px] font-light leading-[160%] text-white/80 max-w-2xl">
              {content.hero.text}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 text-[#121826]">
        <div className="mx-auto w-full max-w-[1280px] flex flex-col lg:flex-row gap-8">
          
          {/* Left Side: Image & Contact Info */}
          <div className="w-full lg:w-[478px] bg-white rounded-[10px] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="relative w-full h-[400px]">
              <Image
                src={content.formSection.image}
                alt="Contact Information"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-[24px] font-medium leading-[1.1] tracking-[-0.8px] mb-2">
                {content.formSection.contactTitle}
              </h3>
              <p className="text-[14px] font-light leading-[160%] text-[#16181d]/70 mb-8">
                {content.formSection.contactSubtitle}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#121826]">
                  <Image
                    src={content.formSection.email.icon}
                    alt="Email Icon"
                    width={18}
                    height={15}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-medium leading-[160%]">
                    {content.formSection.email.label}
                  </p>
                  <a href={`mailto:${content.formSection.email.value}`} className="text-[16px] font-light leading-[160%] text-[#121826] hover:underline">
                    {content.formSection.email.value}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full lg:w-[788px] bg-[#EDE9E6] rounded-[10px] p-8 md:p-12">
            <h2 className="text-[40px] font-medium leading-[1.1] tracking-[-0.8px] mb-4">
              {content.formSection.title}
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-[#16181d]/70 mb-10">
              {content.formSection.subtitle}
            </p>

            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.formSection.form.fields.slice(0, 2).map((field) => (
                  <input 
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full h-[50px] rounded-[10px] border border-gray-300 bg-white px-4 text-[14px] placeholder:text-gray-400 focus:outline-none focus:border-[#23C55E]"
                  />
                ))}
              </div>
              {content.formSection.form.fields.slice(2).map((field) => (
                <input 
                  key={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full h-[50px] rounded-[10px] border border-gray-300 bg-white px-4 text-[14px] placeholder:text-gray-400 focus:outline-none focus:border-[#23C55E]"
                />
              ))}
              <textarea 
                placeholder={content.formSection.form.notesPlaceholder}
                rows={5}
                className="w-full rounded-[10px] border border-gray-300 bg-white p-4 text-[14px] placeholder:text-gray-400 focus:outline-none focus:border-[#23C55E] resize-none"
              />
              <div className="mt-4">
                <GreenButton
                  label={content.formSection.form.submitLabel}
                  href="#"
                  bgColor="#121826"
                  textColor="#ffffff"
                  size={{
                    width: "217px",
                    height: "62px",
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

      {/* Stay Connected Section */}
      <section className="bg-white px-6 pb-24">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="text-center mb-16">
            <h2 className="text-[50px] font-medium leading-[1.05] tracking-[-0.8px]">
              {content.socialSection.title}{" "}
              <span className="text-[#23C55E] font-black italic">{content.socialSection.highlight}</span>
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-[#121826]/70 mt-4 max-w-2xl mx-auto">
              {content.socialSection.subtitle}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* LinkedIn Card */}
            <div className="relative w-full lg:w-1/2 rounded-[10px] bg-[#EDE9E6] p-10 flex flex-col justify-between min-h-[408px] overflow-hidden">
              <div className="relative z-10 max-w-sm">
                <h3 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-4">
                  {content.socialSection.linkedin.title}
                </h3>
                <p className="text-[16px] font-light leading-[160%] text-[#121826]/70">
                  {content.socialSection.linkedin.text}
                </p>
              </div>
              
              <div className="relative z-10 mt-8">
                <GreenButton
                  label={content.socialSection.linkedin.buttonLabel}
                  href={content.socialSection.linkedin.buttonUrl}
                  bgColor="#121826"
                  textColor="#ffffff"
                  size={{
                    width: "165px",
                    height: "62px",
                    paddingX: "30px",
                    paddingY: "10px",
                    fontSize: "16px"
                  }}
                />
              </div>
              
              <div className="absolute right-0 bottom-0 w-[243px] h-[177px]">
                <Image
                  src={content.socialSection.linkedin.image}
                  alt="Gift"
                  fill
                  className="object-contain object-right-bottom"
                />
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="w-full lg:w-1/2 rounded-[10px] bg-[#121826] p-10 text-white flex flex-col justify-between min-h-[408px]">
              <div>
                <h3 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-4">
                  {content.socialSection.newsletter.title}
                </h3>
                <p className="text-[16px] font-light leading-[160%] text-white/70">
                  {content.socialSection.newsletter.text}
                </p>
              </div>
              
              <div className="mt-8">
                <input 
                  type="email" 
                  placeholder={content.socialSection.newsletter.placeholder}
                  className="w-full h-[50px] rounded-[10px] border border-white/10 bg-[#191F2D] px-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] mb-4"
                />
                <GreenButton
                  label={content.socialSection.newsletter.buttonLabel}
                  href="#"
                  bgColor="#ffffff"
                  textColor="#121826"
                  size={{
                    width: "180px",
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

      <HomeFooter footer={siteFooter(homeContent.footer)} />
    </div>
  );
}