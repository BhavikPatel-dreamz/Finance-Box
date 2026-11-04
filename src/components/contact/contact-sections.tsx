"use client";

import { useState } from "react";
import Image from "next/image";
import { GreenButton } from "@/components/ui/green-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import Container from "../ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { ContactUsContent } from "@/content/contact-us";
import { useFormSubmit } from "@/hooks/use-form-submit";

export function ContactBanner({ hero, header }: { hero: ContactUsContent["hero"]; header: React.ReactNode }) {
  return (
    <section className="hero-section relative min-h-[auto] sm:min-h-[460px] lg:h-[525px] overflow-hidden bg-[#121826] text-white flex flex-col">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
        {header}

        <Container className="flex-1 flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-0">
            <Reveal immediate preset="slide-up" delay={80} distance={18}>
              <Eyebrow variant="green-no-dash" className="mb-4 sm:mb-6 lg:mb-8">
                {hero.eyebrow}
              </Eyebrow>
            </Reveal>
            <Reveal immediate preset="slide-up" delay={220} distance={32}>
              <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-4 sm:mb-6 lg:mb-8">
                {hero.title} <span className="text-[#23C55E]">{hero.highlight}</span>
              </h1>
            </Reveal>
            <Reveal immediate preset="slide-up" delay={380} distance={24}>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/80 max-w-2xl px-2">
                {hero.text}
              </p>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}

export function ContactFormBlock({ formSection }: { formSection: ContactUsContent["formSection"] }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  
  const { status, message, submitForm } = useFormSubmit();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitForm("/api/contact", {
      name: formData.name,
      email: formData.email,
      subject: formData.company, 
      message: formData.message,
    });

    if (success) {
      setFormData({ name: "", email: "", company: "", message: "" });
    }
  };

  return (
    <Section theme="light" spacing="both" className="contact-form-section">
      <Container>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-3.75">

          {/* Left Side: Image & Contact Info */}
          <Reveal preset="slide-left" distance={20} className="card-hover relative w-full lg:w-[476px] min-h-[420px] sm:min-h-[480px] lg:min-h-0 bg-white rounded-[10px] overflow-hidden flex flex-col justify-end transition-all duration-300">
            <div className="absolute inset-0 z-0">
              <Image
                src={formSection.image}
                alt="Contact Information"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative m-3 sm:m-4 lg:m-0 p-6 sm:p-8 bg-white border border-[#1219280D] rounded-[8px] lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
              <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-[1.1] tracking-[-0.8px] mb-2">
                {formSection.contactTitle}
              </h3>
              <p className="text-[13.5px] sm:text-[14px] font-light leading-[160%] text-[#16181d]/70 mb-6 sm:mb-8">
                {formSection.contactSubtitle}
              </p>

              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="flex h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] items-center justify-center rounded-full bg-white border border-[#1219280D] shrink-0">
                  <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.2762 3.53321L9.45703 0.164068C9.23697 0.0561233 8.99511 0 8.75 0C8.50489 0 8.26303 0.0561233 8.04297 0.164068L1.22383 3.53321C0.856641 3.71136 0.547078 3.98936 0.330625 4.33536C0.114171 4.68135 -0.000415217 5.08134 1.13057e-06 5.48946V12.7008C1.13057e-06 13.907 0.99297 14.8883 2.21367 14.8883H15.2863C16.507 14.8883 17.5 13.907 17.5 12.7008V5.48946C17.5004 5.08134 17.3858 4.68135 17.1694 4.33536C16.9529 3.98936 16.6434 3.71136 16.2762 3.53321ZM8.60859 1.28204C8.65261 1.26045 8.70098 1.24922 8.75 1.24922C8.79902 1.24922 8.84739 1.26045 8.89141 1.28204L15.5078 4.55L8.78906 7.87032C8.74505 7.89191 8.69668 7.90313 8.64766 7.90313C8.59864 7.90313 8.55026 7.89191 8.50625 7.87032L1.88867 4.60196L8.60859 1.28204Z" fill="#121826" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] sm:text-[14px] font-medium leading-[160%]">
                    {formSection.email.label}
                  </p>
                  <a href={`mailto:${formSection.email.value}`} className="text-[15px] sm:text-[16px] font-light leading-[160%] text-[#121826] hover:underline truncate block">
                    {formSection.email.value}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Side: Form */}
          <Reveal preset="slide-right" distance={20} className="w-full lg:w-[788px] bg-[#EDE9E6]/50 rounded-[10px] p-6 sm:p-8 md:p-10 xl:py-15 xl:px-12.5">
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-medium leading-[1.15] sm:leading-[1.1] tracking-tight sm:tracking-[-0.8px] mb-2.5 sm:mb-4">
              {formSection.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70 mb-6 sm:mb-8 lg:mb-10">
              {formSection.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full h-[48px] sm:h-[50px] rounded-[10px] border border-[#747C761A] bg-white px-4 sm:px-5 text-[14px] font-normal placeholder:text-[#121826]/70 focus:outline-none focus:border-[#23C55E] transition-colors duration-200"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Write your email"
                  required
                  className="w-full h-[48px] sm:h-[50px] rounded-[10px] border border-[#747C761A] bg-white px-4 sm:px-5 text-[14px] font-normal placeholder:text-[#121826]/70 focus:outline-none focus:border-[#23C55E] transition-colors duration-200"
                />
              </div>
              
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company"
                className="w-full h-[48px] sm:h-[50px] rounded-[10px] border border-[#747C761A] bg-white px-4 sm:px-5 text-[14px] placeholder:text-[#121826]/70 focus:outline-none focus:border-[#23C55E] transition-colors duration-200"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your notes..."
                rows={5}
                required
                className="w-full rounded-[10px] border border-[#747C761A] bg-white py-3.5 sm:py-4 px-4 sm:px-5 text-[14px] placeholder:text-[#121826]/70 focus:outline-none focus:border-[#23C55E] transition-colors duration-200 resize-none"
              />

              <div className="mt-2 sm:mt-4 flex flex-col justify-start items-start gap-3">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center h-[50px] px-8 rounded-[10px] bg-[#121826] text-white text-[15px] font-medium transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending..." : formSection.form.submitLabel}
                </button>

                {status === "success" && (
                  <p className="text-sm font-medium text-green-600">Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-sm font-medium text-red-600">{message}</p>
                )}
              </div>
            </form>
          </Reveal>

        </div>
      </Container>
    </Section>
  );
}

export function ContactConnected({ socialSection }: { socialSection: ContactUsContent["socialSection"] }) {
  const [email, setEmail] = useState("");
  
  const { status, message, submitForm } = useFormSubmit();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const success = await submitForm("/api/newsletter", { email });
    if (success) setEmail(""); 
  };

  return (
    <section className="bg-white px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24 stay-connect-section">
      <Container>
        <Reveal preset="slide-up" distance={20} className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-medium leading-[1.1] sm:leading-[1.05] tracking-tight sm:tracking-[-0.8px]">
            {socialSection.title}{" "}
            <span className="text-[#23C55E] font-black italic">{socialSection.highlight}</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#121826]/70 mt-3 sm:mt-4 max-w-[740px] mx-auto">
            {socialSection.subtitle}
          </p>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-4">
          {/* LinkedIn Card */}
          <StaggerItem index={0} className="card-hover relative w-full lg:w-1/2 rounded-[10px] bg-[#EDE9E6] p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[408px] overflow-hidden">
            <div className="relative z-10 max-w-[70%] sm:max-w-[65%] lg:max-w-none">
              <h3 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-medium leading-[1.1] tracking-tight sm:tracking-[-0.8px] mb-3 sm:mb-4">
                {socialSection.linkedin.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#121826]/70">
                {socialSection.linkedin.text}
              </p>
            </div>

            <div className="relative z-10 mt-6 sm:mt-8">
              <GreenButton
                label={socialSection.linkedin.buttonLabel}
                href={socialSection.linkedin.buttonUrl}
                bgColor="#121826"
                textColor="#ffffff"
              />
            </div>

            <div className="absolute right-3 bottom-4 sm:right-6 sm:bottom-6 lg:right-11 lg:bottom-8 w-[140px] h-[105px] sm:w-[180px] sm:h-[135px] lg:w-[243px] lg:h-[177px] pointer-events-none">
              <Image
                src={socialSection.linkedin.image}
                alt="Gift"
                fill
                className="object-contain object-right-bottom"
              />
            </div>
          </StaggerItem>

          {/* Newsletter Card */}
          <StaggerItem index={1} className="card-hover w-full lg:w-1/2 rounded-[10px] bg-[#121826] p-6 sm:p-8 md:p-10 lg:p-12.5 text-white flex flex-col justify-between min-h-[340px] sm:min-h-[380px] lg:min-h-[408px]">
            <div>
              <h3 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-medium leading-[1.1] tracking-tight sm:tracking-[-0.8px] mb-3 sm:mb-4 lg:mb-6.5">
                {socialSection.newsletter.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/70 max-w-[495px]">
                {socialSection.newsletter.text}
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-6 sm:mt-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={socialSection.newsletter.placeholder}
                required
                className="w-full h-[48px] sm:h-[50px] rounded-[10px] border border-[#FFFFFF0F] bg-[#191F2D] px-4 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] mb-4 transition-colors duration-200"
              />
              
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 h-[50px] px-8 rounded-full bg-white text-[#121826] text-[15px] font-medium transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Subscribing..." : socialSection.newsletter.buttonLabel}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-sm font-medium text-green-400 mt-3">Subscribed successfully!</p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-red-400 mt-3">{message}</p>
              )}
            </form>
          </StaggerItem>
        </StaggerGroup>
      </Container>
    </section>
  );
}