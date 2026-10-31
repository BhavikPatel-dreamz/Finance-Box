import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent, type HomeContent } from "@/content/home";
import { mergeContactUs } from "./merge";
import { contactUsContent } from "@/content/contact-us";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import Container from "../ui/container";

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

      {/* Hero Section (Header + Hero = 525px on Desktop) */}
      <section className="hero-section relative min-h-[auto] sm:min-h-[460px] lg:h-[525px] overflow-hidden bg-[#121826] text-white flex flex-col">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
          <HomeHeader header={siteHeader(homeContent.header)} surface="plain" logoHref="/" />

          <Container className="flex-1 flex items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-0">
              <Eyebrow variant="green-no-dash" className="mb-4 sm:mb-6 lg:mb-8">
                {content.hero.eyebrow}
              </Eyebrow>
              <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-4 sm:mb-6 lg:mb-8">
                {content.hero.title} <span className="text-[#23C55E]">{content.hero.highlight}</span>
              </h1>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/80 max-w-2xl px-2">
                {content.hero.text}
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Form Section */}
      <Section theme="light" spacing="both" className="contact-form-section">
        <Container>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-3.75">

            {/* Left Side: Image & Contact Info */}
            <div className="relative w-full lg:w-[476px] min-h-[420px] sm:min-h-[480px] lg:min-h-0 bg-white rounded-[10px] overflow-hidden flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <Image
                  src={content.formSection.image}
                  alt="Contact Information"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 m-3 sm:m-4 lg:m-0 p-6 sm:p-8 bg-white border border-[#1219280D] rounded-[8px] lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
                <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-[1.1] tracking-[-0.8px] mb-2">
                  {content.formSection.contactTitle}
                </h3>
                <p className="text-[13.5px] sm:text-[14px] font-light leading-[160%] text-[#16181d]/70 mb-6 sm:mb-8">
                  {content.formSection.contactSubtitle}
                </p>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="flex h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] items-center justify-center rounded-full bg-white border border-[#1219280D] shrink-0">
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.2762 3.53321L9.45703 0.164068C9.23697 0.0561233 8.99511 0 8.75 0C8.50489 0 8.26303 0.0561233 8.04297 0.164068L1.22383 3.53321C0.856641 3.71136 0.547078 3.98936 0.330625 4.33536C0.114171 4.68135 -0.000415217 5.08134 1.13057e-06 5.48946V12.7008C1.13057e-06 13.907 0.99297 14.8883 2.21367 14.8883H15.2863C16.507 14.8883 17.5 13.907 17.5 12.7008V5.48946C17.5004 5.08134 17.3858 4.68135 17.1694 4.33536C16.9529 3.98936 16.6434 3.71136 16.2762 3.53321ZM8.60859 1.28204C8.65261 1.26045 8.70098 1.24922 8.75 1.24922C8.79902 1.24922 8.84739 1.26045 8.89141 1.28204L15.5078 4.55L8.78906 7.87032C8.74505 7.89191 8.69668 7.90313 8.64766 7.90313C8.59864 7.90313 8.55026 7.89191 8.50625 7.87032L1.88867 4.60196L8.60859 1.28204Z" fill="#121826" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] sm:text-[14px] font-medium leading-[160%]">
                      {content.formSection.email.label}
                    </p>
                    <a href={`mailto:${content.formSection.email.value}`} className="text-[15px] sm:text-[16px] font-light leading-[160%] text-[#121826] hover:underline truncate block">
                      {content.formSection.email.value}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-[788px] bg-[#EDE9E6]/50 rounded-[10px] p-6 sm:p-8 md:p-10 lg:py-15 lg:px-12.5">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-medium leading-[1.15] sm:leading-[1.1] tracking-tight sm:tracking-[-0.8px] mb-2.5 sm:mb-4">
                {content.formSection.title}
              </h2>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70 mb-6 sm:mb-8 lg:mb-10">
                {content.formSection.subtitle}
              </p>

              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.formSection.form.fields.slice(0, 2).map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full h-[48px] sm:h-[50px] rounded-[10px] border border-[#747C761A] bg-white px-4 sm:px-5 text-[14px] font-normal placeholder:text-[#121826]/70 focus:outline-none focus:border-[#23C55E]"
                    />
                  ))}
                </div>
                {content.formSection.form.fields.slice(2).map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full h-[48px] sm:h-[50px] rounded-[10px] border border-[#747C761A] bg-white px-4 sm:px-5 text-[14px] placeholder:text-[#121826]/70 focus:outline-none focus:border-[#23C55E]"
                  />
                ))}
                <textarea
                  placeholder={content.formSection.form.notesPlaceholder}
                  rows={5}
                  className="w-full rounded-[10px] border border-[#747C761A] bg-white py-3.5 sm:py-4 px-4 sm:px-5 text-[14px] placeholder:text-[#121826]/70 focus:outline-none focus:border-[#23C55E] resize-none"
                />
                <div className="mt-2 sm:mt-4 flex justify-start">
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
        </Container>
      </Section>

      {/* Stay Connected Section */}
      <section className="bg-white px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24 stay-connect-section">
        <Container>
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-medium leading-[1.1] sm:leading-[1.05] tracking-tight sm:tracking-[-0.8px]">
              {content.socialSection.title}{" "}
              <span className="text-[#23C55E] font-black italic">{content.socialSection.highlight}</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#121826]/70 mt-3 sm:mt-4 max-w-[740px] mx-auto">
              {content.socialSection.subtitle}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-4">

            {/* LinkedIn Card */}
            <div className="relative w-full lg:w-1/2 rounded-[10px] bg-[#EDE9E6] p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[408px] overflow-hidden">
              <div className="relative z-10 max-w-[70%] sm:max-w-[65%] lg:max-w-none">
                <h3 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-medium leading-[1.1] tracking-tight sm:tracking-[-0.8px] mb-3 sm:mb-4">
                  {content.socialSection.linkedin.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#121826]/70">
                  {content.socialSection.linkedin.text}
                </p>
              </div>

              <div className="relative z-10 mt-6 sm:mt-8">
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

              <div className="absolute right-3 bottom-4 sm:right-6 sm:bottom-6 lg:right-11 lg:bottom-8 w-[140px] h-[105px] sm:w-[180px] sm:h-[135px] lg:w-[243px] lg:h-[177px] pointer-events-none">
                <Image
                  src={content.socialSection.linkedin.image}
                  alt="Gift"
                  fill
                  className="object-contain object-right-bottom"
                />
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="w-full lg:w-1/2 rounded-[10px] bg-[#121826] p-6 sm:p-8 md:p-10 lg:p-12.5 text-white flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[408px]">
              <div>
                <h3 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-medium leading-[1.1] tracking-tight sm:tracking-[-0.8px] mb-3 sm:mb-4 lg:mb-6.5">
                  {content.socialSection.newsletter.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/70 max-w-[495px]">
                  {content.socialSection.newsletter.text}
                </p>
              </div>

              <div className="mt-6 sm:mt-8">
                <input
                  type="email"
                  placeholder={content.socialSection.newsletter.placeholder}
                  className="w-full h-[48px] sm:h-[50px] rounded-[10px] border border-[#FFFFFF0F] bg-[#191F2D] px-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] mb-6 sm:mb-8 lg:mb-10"
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
        </Container>
      </section>

      <HomeFooter footer={siteFooter(homeContent.footer)} />
    </div>
  );
}