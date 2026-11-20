import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentStatus, NOINDEX } from "@/components/content/content-status";
import { PageFrame } from "@/components/layout/page-frame";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { FooterHero } from "@/components/ui/footer-hero";
import { getCaseStudies, getCaseStudy } from "@/lib/wordpress/collections";
import { CASE_STUDY_BASE, caseStudyPath, slugFromUri } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { caseStudyStaticParams } from "@/lib/wordpress/static-params";
import { plainText } from "@/lib/wordpress/text";
import { sanitizeRichText } from "@/lib/wordpress/rich-text";

export const instant = false;

export const generateStaticParams = caseStudyStaticParams;

type FallbackCaseStudy = {
  slug: string;
  title: string;
  tagline?: string;
  date: string;
  heroImage: string;
  excerpt: string;
  infoHtml?: string;
  contentHtml?: string;
  conclusionHtml?: string;
};

const FALLBACK_MAP: Record<string, FallbackCaseStudy> = {
  "flyr-labs": {
    slug: "flyr-labs",
    title: "FLYR Labs",
    tagline: "Global finance rebuilt, fast",
    date: "2024-11-02T05:25:31",
    heroImage: "/case-studies/flyr-labs-hero.jpg",
    excerpt:
      "The initial engagement was to provide Fractional CFO services, focusing on investor reporting and ensuring debt compliance...",
    infoHtml: `
      <h2>FLYR Labs – Global finance rebuilt, fast</h2>
      <p><strong>Client Name and Description:</strong> FLYR Labs provides AI for revenue optimization for major airlines around the world. In September 2021, the Company announced its $150M Series C round, bringing total announced investment to over $186M.</p>
      <p><strong>Client profile:</strong> The company had 250 employees across offices in the U.S., Poland, and Netherlands, when we were first engaged. During our engagement employee base grew to over 650, and the number of legal entities grew from four to ten</p>
      <p><strong>Time and duration of engagement:</strong> May 2022– Present</p>
    `,
  },
  deepscribe: {
    slug: "deepscribe",
    title: "DeepScribe",
    tagline: "Hiring engine to match growth",
    date: "2024-11-02T05:26:00",
    heroImage: "/case-studies/deepscribe.png",
    excerpt:
      "DeepScribe is a healthcare technology company specializing in AI-powered medical transcription services.",
  },
  "offshoring-enablement": {
    slug: "offshoring-enablement",
    title: "Offshoring Enablement",
    tagline: "Lower cost, wider talent pool",
    date: "2024-11-01T05:27:22",
    heroImage: "/case-studies/offshoring-enablement.png",
    excerpt:
      "We’ve enabled offshore capability in India for multiple North American clients, from compliance cleanups to dedicated teams.",
  },
  overjet: {
    slug: "overjet",
    title: "Overjet",
    date: "2025-11-22T09:22:08",
    heroImage: "/case-studies/overjet.jpg",
    excerpt:
      "Client Name and Description: Overjet is an AI-powered dental technology company that provides algorithms to analyze dental images...",
  },
  loopio: {
    slug: "loopio",
    title: "Loopio",
    date: "2025-11-22T09:19:19",
    heroImage: "/case-studies/loopio.jpg",
    excerpt:
      "Loopio’s RFP Response Software enables enterprises to supercharge their process of responding to RFPs, RFIs, and Security Questionnaires...",
  },
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const TESTIMONIALS_MAP: Record<string, Testimonial[]> = {
  "flyr-labs": [
    {
      quote:
        "“As a startup, we find our priorities in constant flux with a need to deliver at often unreasonable timelines. Finance functions support everything from operations to planning and need an ability to balance support of such a demanding environment while also doing the job right. Jim (FIAB) represents such balance, knowing where and when to deliver to the then-adequate level of need.”",
      author: "Alex Mans",
      role: "Flyr CEO",
    },
    {
      quote:
        "“Overall, Jim has been a reliable and forward-thinking interim CFO who has demonstrated the highest level of expertise, dedication, teamwork and professionalism. His contributions have been invaluable to our organization, and I would strongly recommend him to any organization looking for a skilled and experienced Finance Leader.”",
      author: "Steve Schoch",
      role: "the Company’s CFO",
    },
  ],
};

function formatCaseStudyDate(rawDate: string | null | undefined): string {
  if (!rawDate) return "2 November 2024";
  const match = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = match[1];
    const month = months[parseInt(match[2], 10) - 1] || "November";
    const day = parseInt(match[3], 10);
    return `${day} ${month} ${year}`;
  }
  return "2 November 2024";
}

function parseConclusion(html: string | null | undefined) {
  if (!html) return null;
  const safe = sanitizeRichText(html);
  if (!safe) return null;

  const ulMatch = safe.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
  if (!ulMatch) {
    return {
      introHtml: safe,
      bullets: [],
      outroHtml: null,
    };
  }

  const beforeUl = safe.substring(0, ulMatch.index).trim();
  const afterUl = safe.substring(ulMatch.index! + ulMatch[0].length).trim();

  const liMatches = [...ulMatch[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  const bullets = liMatches.map((m) => plainText(m[1]).trim()).filter(Boolean);

  return {
    introHtml: beforeUl || null,
    bullets,
    outroHtml: afterUl || null,
  };
}

export async function generateMetadata({ params }: PageProps<"/case-study/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCaseStudy(slug);
  const fallback = FALLBACK_MAP[slug];

  if (result.status !== "ok" && !fallback) {
    return { title: "Case study not found", robots: NOINDEX };
  }

  const study = result.status === "ok" ? result.item : null;
  const title = plainText(study?.title) || fallback?.title || "Case Study";
  const tagline = plainText(study?.caseStudiesOptions?.tagLine) || fallback?.tagline || "";
  const displayTitle = tagline && !title.toLowerCase().includes(tagline.toLowerCase()) ? `${title} – ${tagline}` : title;

  const description =
    (plainText(study?.excerpt) || plainText(study?.caseStudiesOptions?.featuredContent) || fallback?.excerpt || "").slice(0, 160);

  const image =
    study?.caseStudiesOptions?.frontFeatureImage?.node?.sourceUrl ||
    study?.featuredImage?.node?.sourceUrl ||
    fallback?.heroImage;

  return {
    title: `${displayTitle} | Finance in a Box`,
    description: description || undefined,
    alternates: { canonical: caseStudyPath(slug) },
    openGraph: {
      type: "article",
      title: `${displayTitle} | Finance in a Box`,
      description: description || undefined,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/case-study/[slug]">) {
  const { slug } = await params;
  const fallback = FALLBACK_MAP[slug];

  const [chrome, result, allStudiesResult] = await Promise.all([
    getSiteChrome(),
    getCaseStudy(slug),
    getCaseStudies(),
  ]);

  if (result.status !== "ok" && !fallback) {
    return <ContentStatus result={result} chrome={chrome} />;
  }

  const study = result.status === "ok" ? result.item : null;

  // Title and Tagline resolution
  const rawTitle = plainText(study?.title) || fallback?.title || "Case Study";
  const rawTagline = (plainText(study?.caseStudiesOptions?.tagLine) || fallback?.tagline || "").trim();

  let prefix = rawTitle;
  let highlight = rawTagline;

  const dashMatch = rawTitle.match(/^(.+?)\s*[–—\-]\s*(.+)$/);
  if (dashMatch) {
    prefix = dashMatch[1].trim();
    highlight = dashMatch[2].trim();
  } else if (!highlight) {
    prefix = rawTitle;
    highlight = "";
  }

  // Display title for card
  const cardTitle = highlight ? `${prefix} – ${highlight}` : prefix;

  // Metadata
  const dateFormatted = formatCaseStudyDate(study?.date || fallback?.date);

  // Hero Featured Image
  const heroImage =
    study?.caseStudiesOptions?.frontFeatureImage?.node?.sourceUrl ||
    study?.featuredImage?.node?.sourceUrl ||
    fallback?.heroImage ||
    "/case-studies/flyr-labs-hero.jpg";

  // Case Study Information Box (Client Name, Description, Profile, Engagement)
  let infoHtml = study?.caseStudiesOptions?.caseStudyInformation || fallback?.infoHtml || "";
  if (infoHtml) {
    infoHtml = sanitizeRichText(infoHtml);
    // If infoHtml doesn't include an h2, add one at the top matching cardTitle
    if (!infoHtml.includes("<h2") && cardTitle) {
      infoHtml = `<h2>${cardTitle}</h2>${infoHtml}`;
    }
  }

  // Main Content
  const contentHtml = sanitizeRichText(study?.content || fallback?.contentHtml || "");

  // Conclusion
  const conclusionHtml = study?.caseStudiesOptions?.conclusion || fallback?.conclusionHtml || "";
  const parsedConclusion = parseConclusion(conclusionHtml);

  // Testimonials
  const testimonials = TESTIMONIALS_MAP[slug] || [];

  // Related Case Studies (Exclude current slug, show up to 3)
  type RelatedItem = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    ctaUrl: string;
  };

  const PREFERRED_RELATED_ORDER = ["overjet", "deepscribe", "offshoring-enablement", "loopio", "flyr-labs"];

  let relatedStudies: RelatedItem[] = [];
  if (allStudiesResult.status === "ok" && allStudiesResult.items.length > 0) {
    const candidateStudies = allStudiesResult.items
      .map((node): RelatedItem => {
        const itemSlug = (node.slug ?? slugFromUri(node.uri) ?? "").toLowerCase();
        const itemFallback = FALLBACK_MAP[itemSlug];
        const itemTitle = plainText(node.title) || itemFallback?.title || "Untitled";
        const itemTagline = plainText(node.caseStudiesOptions?.tagLine)?.trim() || itemFallback?.tagline || "";
        const itemDisplayTitle =
          itemTagline && !itemTitle.toLowerCase().includes(itemTagline.toLowerCase())
            ? `${itemTitle} – ${itemTagline}`
            : itemTitle;

        const itemExcerpt =
          plainText(node.excerpt)?.trim() ||
          plainText(node.caseStudiesOptions?.caseStudyInformation)?.slice(0, 140) ||
          itemFallback?.excerpt ||
          "";

        const itemImage =
          node.featuredImage?.node?.sourceUrl ||
          node.caseStudiesOptions?.frontFeatureImage?.node?.sourceUrl ||
          itemFallback?.heroImage ||
          "/case-studies/overjet.jpg";

        return {
          id: String(node.databaseId),
          slug: itemSlug,
          title: itemDisplayTitle,
          excerpt: itemExcerpt,
          image: itemImage,
          ctaUrl: caseStudyPath(itemSlug),
        };
      })
      .filter((item) => item.slug && item.slug.toLowerCase() !== slug.toLowerCase());

    // Sort to prioritize Figma shown order: overjet, deepscribe, offshoring-enablement
    relatedStudies = candidateStudies
      .sort((a, b) => {
        const indexA = PREFERRED_RELATED_ORDER.indexOf(a.slug);
        const indexB = PREFERRED_RELATED_ORDER.indexOf(b.slug);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      })
      .slice(0, 3);
  }

  // Fallback related if fewer than 3
  if (relatedStudies.length < 3) {
    for (const prefSlug of PREFERRED_RELATED_ORDER) {
      if (prefSlug === slug.toLowerCase()) continue;
      if (relatedStudies.some((s) => s.slug === prefSlug)) continue;
      const fb = FALLBACK_MAP[prefSlug];
      if (fb) {
        relatedStudies.push({
          id: fb.slug,
          slug: fb.slug,
          title: fb.tagline ? `${fb.title} – ${fb.tagline}` : fb.title,
          excerpt: fb.excerpt,
          image: fb.heroImage,
          ctaUrl: caseStudyPath(fb.slug),
        });
      }
      if (relatedStudies.length >= 3) break;
    }
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
          {/* Subtle Radial Green Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[360px] bg-brand-green/12 blur-[130px] rounded-full pointer-events-none" />
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <Reveal immediate preset="slide-up" delay={60} distance={20}>
            <p className="mb-4 sm:mb-5 text-white/70 font-mono tracking-[1.5px] text-[12px] sm:text-[14px] uppercase font-medium">
              CASE STUDY, CUSTOMER SUCCESS
            </p>
          </Reveal>

          {/* Title */}
          <Reveal immediate preset="slide-up" delay={180} distance={24} className="max-w-[1040px] mx-auto">
            <h1 className="text-[30px] xs:text-[38px] sm:text-[46px] md:text-[50px] lg:text-[54px] leading-[1.14] font-medium tracking-tight text-white mb-5 sm:mb-6">
              {prefix}
              {highlight ? (
                <>
                  {" – "}
                  <span className="text-[#4EA947]">{highlight}</span>
                </>
              ) : null}
            </h1>
          </Reveal>

          {/* Meta: Author & Date */}
          <Reveal immediate preset="slide-up" delay={280} distance={20}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-[14px] sm:text-[16px] font-light text-white/80">
              <span>
                Author: <strong className="font-semibold text-white">Admin</strong>
              </span>
              <span>
                Date: <strong className="font-semibold text-white">{dateFormatted}</strong>
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. Main Content Body on White */}
      <section className="bg-white text-brand-blue py-7.5 sm:py-10 lg:py-15">
        <Container>
          {/* Hero Featured Image */}
          <Reveal preset="slide-up" distance={24} delay={100}>
            <div className="relative w-full h-[320px] sm:h-[460px] md:h-[540px] lg:h-[600px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#e5e7eb] shadow-sm">
              <Image
                src={heroImage}
                alt={cardTitle}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          {/* 3. Case Study Information Card (Light gray background matching Figma) */}
          {infoHtml ? (
            <Reveal preset="slide-up" distance={24} delay={180}>
              <div className="mt-10 bg-brand-sand/50 rounded-[10px] p-6 sm:p-10 lg:p-12.5">
                <div
                  className="case-study-info-content text-[15px] sm:text-[16px] text-brand-blue/80 font-light leading-[1.7] [&_h2]:leading-normal [&_h2]:text-[28px] sm:[&_h2]:text-[36px] md:[&_h2]:text-[42px] lg:[&_h2]:text-[50px] [&_h2]:font-bold [&_h2]:text-brand-blue [&_h2]:tracking-tight [&_h2]:mb-5 sm:[&_h2]:mb-6 [&_h3]:text-[18px] sm:[&_h3]:text-[20px] [&_h3]:font-bold [&_h3]:text-brand-blue [&_h3]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2.5 [&_p]:mb-7 [&_strong]:font-semibold [&_strong]:text-brand-blue [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: infoHtml }}
                />
              </div>
            </Reveal>
          ) : null}

          {/* 4. Main Body Content */}
          {contentHtml ? (
            <Reveal preset="slide-up" distance={24} delay={240}>
              <div className="mt-12 sm:mt-16 lg:mt-20">
                <div
                  className="case-study-main-content text-[15.5px] sm:text-[16.5px] text-brand-blue/80 font-light leading-[1.75] [&_h2]:leading-normal [&_h2]:text-[28px] sm:[&_h2]:text-[36px] md:[&_h2]:text-[42px] lg:[&_h2]:text-[50px] [&_h2]:font-semibold [&_h2]:text-brand-blue [&_h2]:tracking-tight [&_h2]:mt-12 sm:[&_h2]:mt-16 [&_h2]:mb-4 sm:[&_h2]:mb-5 first:[&_h2]:mt-0 [&_h3]:text-[22px] sm:[&_h3]:text-[28px] lg:[&_h3]:text-[38px] [&_h3]:font-semibold [&_h3]:text-brand-blue [&_h3]:tracking-tight [&_h3]:mt-10 sm:[&_h3]:mt-14 [&_h3]:mb-4 first:[&_h3]:mt-0 [&_h4]:text-[18px] sm:[&_h4]:text-[22px] lg:[&_h4]:text-[24px] [&_h4]:font-semibold [&_h4]:text-brand-blue [&_h4]:tracking-tight [&_h4]:mt-8 sm:[&_h4]:mt-10 [&_h4]:mb-3 [&_p]:mb-6  [&_strong]:font-semibold [&_strong]:text-brand-blue [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:mb-2 [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </div>
            </Reveal>
          ) : null}

          {/* 5. Client Testimonial Section */}
          {testimonials.length > 0 ? (
            <Reveal preset="slide-up" distance={24} delay={280}>
              <div className="mt-16 sm:mt-20 lg:mt-24">
                <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold text-brand-blue tracking-tight mb-6 sm:mb-8">
                  Client Testimonial
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4">
                  {testimonials.map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-brand-sand/50 rounded-[15px] sm:px-6 py-5 sm:py-7.5 flex flex-col justify-between border border-black/[0.04]"
                    >
                      <p className="text-[15px] sm:text-[16px] italic leading-[1.7] text-brand-blue/90 mb-6 sm:mb-8">
                        {t.quote}
                      </p>
                      <p className="text-[15px] sm:text-[16px] mt-auto">
                        <span className="font-semibold text-brand-blue">{t.author}, </span>
                        <span className="text-[#4EA947] italic font-normal">{t.role}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* 6. Conclusion Section (Dark theme with inner bullet card matching Figma) */}
      {parsedConclusion ? (
        <section className="bg-[#121826] text-white py-14 sm:py-16 lg:py-20">
          <Container className="max-w-[1280px]">
            <Reveal preset="slide-up" distance={24}>
              <h2 className="text-[30px] sm:text-[38px] lg:text-[42px] font-semibold text-white tracking-tight mb-4 sm:mb-5">
                Conclusion
              </h2>
            </Reveal>

            {parsedConclusion.introHtml ? (
              <Reveal preset="slide-up" distance={24} delay={100}>
                <div
                  className="text-white/80 text-[15px] sm:text-[16px] lg:text-[16.5px] font-light leading-[1.7] max-w-[1080px] mb-8 sm:mb-10 space-y-4 [&_p]:mb-4 last:[&_p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: parsedConclusion.introHtml }}
                />
              </Reveal>
            ) : null}

            {/* Inner Bullet Card */}
            {(parsedConclusion.bullets.length > 0 || parsedConclusion.outroHtml) ? (
              <Reveal preset="slide-up" distance={24} delay={180}>
                <div className="bg-[#182234]/70 border border-white/10 rounded-[20px] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
                  {/* Ambient subtle green glow in corner */}
                  <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-[#4EA947]/15 blur-[80px] rounded-full" />

                  {parsedConclusion.bullets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-4 sm:gap-y-5 relative z-10">
                      {parsedConclusion.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-[2px] bg-[#4EA947] shrink-0 mt-2" />
                          <span className="text-[14.5px] sm:text-[15.5px] text-white/95 leading-[1.6]">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {parsedConclusion.outroHtml ? (
                    <div
                      className="text-white/75 text-[14px] sm:text-[15px] font-light mt-8 pt-6 sm:pt-8 border-t border-white/10 leading-[1.65] relative z-10 [&_p]:mb-3 last:[&_p]:mb-0"
                      dangerouslySetInnerHTML={{ __html: parsedConclusion.outroHtml }}
                    />
                  ) : null}
                </div>
              </Reveal>
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* 7. Related Case Studies ("We specialize in following Case Studies") */}
      {relatedStudies.length > 0 ? (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <Container className="max-w-[1280px]">
            <Reveal preset="slide-up" distance={20}>
              <p className="text-[#4EA947] font-mono tracking-[1.5px] text-[12px] sm:text-[13px] uppercase font-medium text-center mb-3">
                PROJECTS BY FINANCEINABOX
              </p>
            </Reveal>

            <Reveal preset="slide-up" distance={24} delay={80}>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-semibold tracking-tight text-brand-blue text-center mb-12 sm:mb-16">
                We specialize in following <span className="italic font-serif">Case Studies</span>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {relatedStudies.map((item, idx) => (
                <Reveal key={item.id} preset="slide-up" distance={24} delay={120 + idx * 80}>
                  <article className="group flex flex-col items-start h-full">
                    {/* Image: exactly 560px on desktop with 5px radius */}
                    <Link
                      href={item.ctaUrl}
                      className="relative block w-full h-[320px] sm:h-[420px] lg:h-[560px] rounded-[5px] overflow-hidden bg-[#e5e7eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Title & Excerpt */}
                    <div className="flex flex-col flex-1 w-full pt-5 sm:pt-6">
                      <Link
                        href={item.ctaUrl}
                        title={item.title}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 rounded-[2px]"
                      >
                        <h3 className="text-[17px] sm:text-[18px] lg:text-[19px] font-semibold text-brand-blue tracking-tight leading-[1.3] mb-2 sm:mb-2.5 truncate transition-colors duration-300 group-hover:text-brand-green">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] text-brand-blue/70 font-light leading-[1.6] line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Explore All Button */}
            <Reveal preset="slide-up" distance={20} delay={360}>
              <div className="mt-12 sm:mt-16 flex justify-center">
                <Button
                  variant="dark"
                  size="50"
                  text="Explore All"
                  href="/case-study/"
                  showArrow
                />
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* 8. Footer Hero CTA Section matching Figma */}
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
