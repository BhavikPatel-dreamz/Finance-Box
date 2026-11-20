import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyGridCard, type CaseStudyGridItem } from "@/components/case-studies/case-study-grid-card";
import { PageFrame } from "@/components/layout/page-frame";
import { Reveal } from "@/components/motion/reveal";
import Container from "@/components/ui/container";
import { FooterHero } from "@/components/ui/footer-hero";
import Section from "@/components/ui/section";
import { getCaseStudies } from "@/lib/wordpress/collections";
import { CASE_STUDY_BASE, caseStudyPath, slugFromUri } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { plainText } from "@/lib/wordpress/text";

export const instant = false;

export const metadata: Metadata = {
  title: "Case Studies | Finance in a Box",
  description:
    "We help businesses streamline finance, HR, payroll, and people operations through intelligent system integration and automation.",
  alternates: { canonical: CASE_STUDY_BASE },
};

const FIGMA_CASE_STUDIES: CaseStudyGridItem[] = [
  {
    id: "flyr-labs",
    slug: "flyr-labs",
    title: "FLYR Labs – Global finance rebuilt, fast",
    excerpt:
      "The initial engagement was to provide Fractional CFO services, focusing on investor....",
    image: "/case-studies/flyr-labs.png",
    ctaUrl: "/case-study/flyr-labs/",
  },
  {
    id: "deepscribe",
    slug: "deepscribe",
    title: "DeepScribe – Hiring engine to match growth",
    excerpt:
      "DeepScribe is a healthcare technology company specializing in AI-powered medical transcription services.",
    image: "/case-studies/deepscribe.png",
    ctaUrl: "/case-study/deepscribe/",
  },
  {
    id: "offshoring-enablement",
    slug: "offshoring-enablement",
    title: "Offshoring Enablement – Lower cost, wider talent pool",
    excerpt:
      "We’ve enabled offshore capability in India for multiple North American clients...",
    image: "/case-studies/offshoring-enablement.png",
    ctaUrl: "/case-study/offshoring-enablement/",
  },
  {
    id: "overjet",
    slug: "overjet",
    title: "Overjet",
    excerpt:
      "Client Name and Description: Overjet is an AI-powered dental technology company...",
    image: "/case-studies/overjet.jpg",
    ctaUrl: "/case-study/overjet/",
  },
  {
    id: "loopio",
    slug: "loopio",
    title: "Loopio",
    excerpt:
      "Loopio’s RFP Response Software enables enterprises to supercharge their process of responding ...",
    image: "/case-studies/loopio.jpg",
    ctaUrl: "/case-study/loopio/",
  },
];

const PREFERRED_ORDER = [
  "flyr-labs",
  "deepscribe",
  "offshoring-enablement",
  "overjet",
  "loopio",
];

const FALLBACK_MAP = new Map(FIGMA_CASE_STUDIES.map((item) => [item.slug, item]));

export default async function CaseStudiesPage() {
  const [chrome, result] = await Promise.all([getSiteChrome(), getCaseStudies()]);

  let studies: CaseStudyGridItem[] = [];

  if (result.status === "ok" && result.items.length > 0) {
    const fetchedStudies = result.items.map((node): CaseStudyGridItem => {
      const slug = (node.slug ?? slugFromUri(node.uri) ?? "").toLowerCase();
      const fallback = FALLBACK_MAP.get(slug);

      const rawTitle = plainText(node.title) || fallback?.title || "Untitled";
      const tagline = plainText(node.caseStudiesOptions?.tagLine)?.trim() || "";

      let displayTitle = rawTitle;
      if (tagline && !rawTitle.toLowerCase().includes(tagline.toLowerCase())) {
        displayTitle = `${rawTitle} – ${tagline}`;
      }

      const rawExcerpt = plainText(node.excerpt)?.trim() || fallback?.excerpt || "";
      const image =
        node.featuredImage?.node?.sourceUrl ||
        node.caseStudiesOptions?.frontFeatureImage?.node?.sourceUrl ||
        fallback?.image ||
        "/case-studies/flyr-labs.png";

      return {
        id: String(node.databaseId),
        slug,
        title: displayTitle,
        excerpt: rawExcerpt,
        image,
        ctaUrl: slug ? caseStudyPath(slug) : fallback?.ctaUrl || "/case-study/",
      };
    });

    // Sort according to Figma order: flyr-labs, deepscribe, offshoring-enablement, overjet, loopio
    studies = fetchedStudies.sort((a, b) => {
      const indexA = PREFERRED_ORDER.indexOf(a.slug);
      const indexB = PREFERRED_ORDER.indexOf(b.slug);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  } else {
    studies = FIGMA_CASE_STUDIES;
  }

  return (
    <PageFrame chrome={chrome}>
      {/* 1. Hero Section matching Figma */}
      <section className="relative overflow-hidden bg-brand-blue text-white flex flex-col justify-center pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-16 lg:pb-20 min-h-[450px] lg:min-h-[525px]">
        {/* Background Mesh Image with diamond pattern and green glows */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/foundation/foundation-foresight-hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none opacity-90"
          />
          {/* Subtle Radial Green Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[360px] bg-brand-green/12 blur-[130px] rounded-full pointer-events-none" />
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <Reveal immediate preset="slide-up" delay={60} distance={20}>
            <p className="mb-4 sm:mb-5 text-white/70 font-mono tracking-[1.5px] text-[12px] sm:text-[14px] uppercase font-medium">
              CASE STUDIES
            </p>
          </Reveal>

          {/* Title */}
          <Reveal immediate preset="slide-up" delay={180} distance={24} className="max-w-[1020px] mx-auto">
            <h1 className="text-[30px] xs:text-[38px] sm:text-[46px] md:text-[50px] lg:text-[54px] leading-[1.14] font-medium tracking-tight text-white mb-5 sm:mb-6">
              Building Smarter{" "}
              <span className="text-brand-green">Business Operations</span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal immediate preset="slide-up" delay={300} distance={20} className="max-w-[760px] mx-auto">
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-white/80 font-light leading-[1.65]">
              We help businesses streamline finance, HR, payroll, and people operations through intelligent
              system integration and automation. Explore how we simplify complex workflows, connect business
              platforms, and build scalable operations that drive efficiency and long-term growth.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2. Case Study Cards Grid */}
      <Section theme="light" spacing="both" className="case-studies-section">
        <Container>
          {studies.length === 0 ? (
            <p className="text-center text-[16px] font-light text-[#16181d]/70">
              No case studies have been published yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 sm:gap-y-8 lg:gap-y-10">
              {studies.map((study, index) => (
                <Reveal key={study.id} preset="slide-up" distance={24} delay={(index % 3) * 80}>
                  <CaseStudyGridCard study={study} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* 3. Footer Hero CTA Section */}
      <FooterHero
        variant="partner-with-us"
        title="Let's build your future-ready back office."
        text="Get a tailored plan with time saved, cost impact, and go-live timeline for your stack."
        buttonLabel="Book a Partner Consultation"
        buttonUrl="/contact-us/"
        bgImage="/footer-cta-bg.svg"
      />
    </PageFrame>
  );
}
