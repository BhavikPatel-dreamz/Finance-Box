import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_CARD_CLASS, BlogCard } from "@/components/blog/blog-card";
import { ContentStatus } from "@/components/content/content-status";
import { PageFrame } from "@/components/layout/page-frame";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { FooterHero } from "@/components/ui/footer-hero";
import { blogCardFromPost } from "@/lib/wordpress/cards";
import { getPosts } from "@/lib/wordpress/collections";
import { getPublicPage } from "@/lib/wordpress/content";
import { link, media, multilineText, splitEmphasis } from "@/lib/wordpress/fields";
import { plainText } from "@/lib/wordpress/text";
import { blogArchivePath } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import type { KnowledgeHubBlog } from "@/content/knowledge-hub";

export const POSTS_PER_PAGE = 9;

/** Fallback posts exactly matching the Figma "Our Blogs" design */
export const FIGMA_FALLBACK_BLOGS: KnowledgeHubBlog[] = [
  {
    image: "/knowledge-hub/blog1.png",
    category: "Consulting",
    date: "09 Oct, 2023",
    readTime: "3 min read",
    title: "The Most Effective Strategies For Right-Sizing Your R&D Team",
    author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
    url: "/blogs/the-most-effective-strategies-for-right-sizing-your-rd-team",
  },
  {
    image: "/knowledge-hub/blog2.png",
    category: "Consulting",
    date: "09 Oct, 2023",
    readTime: "3 min read",
    title: "Is Your Financial Model Worthless?",
    author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
    url: "/blogs/is-your-financial-model-worthless",
  },
  {
    image: "/knowledge-hub/blog3.png",
    category: "Consulting",
    date: "09 Oct, 2023",
    readTime: "3 min read",
    title: "Compensation Evolution: Reflecting On The Past To Navigate The Future",
    author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
    url: "/blogs/a-look-back-at-2023-the-year-of-inflation-and-adaptation",
  },
  {
    image: "/knowledge-hub/blog1.png",
    category: "Consulting",
    date: "09 Oct, 2023",
    readTime: "3 min read",
    title: "Optimizing All-Hands Meetings",
    author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
    url: "/blogs/the-strategic-value-of-all-hands-meetings",
  },
  {
    image: "/knowledge-hub/blog2.png",
    category: "Consulting",
    date: "09 Oct, 2023",
    readTime: "3 min read",
    title: "5 Strategic Lessons for Series A Founders Inspired by Travis Kelce & Taylor Swift’s Relationship",
    author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
    url: "/blogs/a-masterclass-in-strategy-timing-and-commitment-taylor-swift",
  },
  {
    image: "/knowledge-hub/blog3.png",
    category: "Consulting",
    date: "09 Oct, 2023",
    readTime: "3 min read",
    title: "Navigating the Waters of Early-Stage Funding: A Guide to SAFEs",
    author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
    url: "/blogs/safes-a-tool-that-has-transformed-the-way-founders-and-investors-execute-on-their-joint-ventures",
  },
];

/**
 * `/blog/` and `/blog/page/<n>/`:
 * Redesigned to 100% match Figma image 'Our Blogs.jpg':
 * - Dynamic Hero with min-height 525px, background mesh + green glows
 * - 3-column Blog Grid using shared Knowledge Hub BlogCard component
 * - Dynamic WordPress integration with fallback to Figma cards
 * - FooterHero CTA section 100% matching attached Figma design
 */
export async function BlogArchive({ page = 1 }: { page?: number }) {
  const [chrome, result, wpPageResult] = await Promise.all([
    getSiteChrome(),
    getPosts(),
    getPublicPage("/blogs/"),
  ]);

  if (result.status !== "ok" && !FIGMA_FALLBACK_BLOGS.length) {
    return <ContentStatus result={result} chrome={chrome} />;
  }

  let bannerSubTitle = "OUR BLOGS";
  let bannerTitle = "Knowledge That Moves";
  let bannerHighlight = "Businesses Forward";
  let bannerDescription =
    "Discover expert perspectives, industry insights, and practical strategies to optimize business operations and drive sustainable growth. Fresh perspectives and practical knowledge to help you transform operations, embrace innovation, and build for the future.";
  let bannerBg = "/foundation/foundation-foresight-hero-bg.jpg";

  let ctaTitle = "Let's build your future-ready back office.";
  let ctaDesc = "Get a tailored plan with time saved, cost impact, and go-live timeline for your stack.";
  let ctaButtonLabel = "Book a Partner Consultation";
  let ctaButtonUrl = "/contact-us/";

  if (wpPageResult.status === "ok") {
    const banner = wpPageResult.page.sections.find((s) => s.__typename?.includes("ServiceDetailBannerSection")) as
      | { subTitle?: unknown; title?: unknown; description?: unknown; backgroundImage?: unknown }
      | undefined;

    if (banner) {
      if (banner.subTitle) bannerSubTitle = String(banner.subTitle).toUpperCase();
      if (banner.title) {
        const parts = splitEmphasis(banner.title);
        if (parts) {
          bannerTitle = [parts.before, parts.after].filter(Boolean).join(" ").trim();
          bannerHighlight = parts.emphasis;
        } else {
          bannerTitle = String(banner.title);
          bannerHighlight = "";
        }
      }
      if (banner.description) {
        bannerDescription = multilineText(banner.description) || bannerDescription;
      }
      const bg = media(banner.backgroundImage)?.url;
      if (bg) bannerBg = bg;
    }

    const cta = wpPageResult.page.sections.find((s) => s.__typename?.includes("CtaSection")) as
      | { title?: unknown; description?: unknown; ctaButton?: unknown }
      | undefined;

    if (cta) {
      if (cta.title) ctaTitle = plainText(String(cta.title));
      if (cta.description) ctaDesc = plainText(String(cta.description));
      const btn = link(cta.ctaButton, { label: ctaButtonLabel, url: ctaButtonUrl });
      ctaButtonLabel = btn.label;
      ctaButtonUrl = btn.url;
    }
  }

  const allPosts: KnowledgeHubBlog[] =
    result.status === "ok" && result.items.length > 0
      ? result.items.map((post) => blogCardFromPost(post))
      : FIGMA_FALLBACK_BLOGS;

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  if (!Number.isInteger(page) || page < 1 || page > totalPages) {
    notFound();
  }

  const cards = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return (
    <PageFrame chrome={chrome}>
      {/* 1. Hero Section matching Figma 'Our Blogs.jpg' */}
      <section className="relative overflow-hidden bg-brand-blue text-white flex flex-col justify-center pt-32 sm:pt-36 lg:pt-40 pb-14 sm:pb-16 lg:pb-20 min-h-[450px] lg:min-h-[525px]">
        {/* Background Mesh Image with diamond pattern and green glows */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <Image
            src={bannerBg}
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
              {bannerSubTitle}
            </p>
          </Reveal>

          {/* Title */}
          <Reveal immediate preset="slide-up" delay={180} distance={24} className="max-w-[1060px] mx-auto">
            <h1 className="text-[30px] xs:text-[38px] sm:text-[46px] md:text-[50px] lg:text-[54px] leading-[1.14] font-medium tracking-tight text-white mb-5 sm:mb-6">
              {bannerTitle}{" "}
              {bannerHighlight && <span className="text-brand-green">{bannerHighlight}</span>}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal immediate preset="slide-up" delay={300} distance={20} className="max-w-[780px] mx-auto">
            <p className="text-[14px] sm:text-[15px] md:text-[16px] text-white/80 font-light leading-[1.65]">
              {bannerDescription}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2. Blog Cards Grid Section (using Knowledge Hub BlogCard component) */}
      <Section theme="light" spacing="both" className="case-studies-section">
        <Container >
          {cards.length === 0 ? (
            <p className="text-center text-[16px] font-light text-[#16181d]/70">
              No articles have been published yet.
            </p>
          ) : (
            <StaggerGroup staggerDelay={120} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cards.map((blog, idx) => (
                <StaggerItem key={blog.url || idx} index={idx} className={BLOG_CARD_CLASS}>
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}

          {/* Pagination when multiple pages exist */}
          {totalPages > 1 ? (
            <nav aria-label="Blog pages" className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <Link
                  key={number}
                  href={blogArchivePath(number)}
                  aria-current={number === page ? "page" : undefined}
                  className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[14px] font-medium transition-colors duration-300 ${
                    number === page
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-brand-blue/15 text-brand-blue hover:border-brand-green hover:text-brand-green"
                  }`}
                >
                  {number}
                </Link>
              ))}
            </nav>
          ) : null}
        </Container>
      </Section>

      {/* 3. Footer Hero CTA Section 100% matching Figma */}
      <FooterHero
        variant="partner-with-us"
        title={ctaTitle}
        text={ctaDesc}
        buttonLabel={ctaButtonLabel}
        buttonUrl={ctaButtonUrl}
        bgImage="/footer-cta-bg.svg"
      />
    </PageFrame>
  );
}
