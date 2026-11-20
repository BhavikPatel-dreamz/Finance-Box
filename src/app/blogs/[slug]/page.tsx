import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BLOG_CARD_CLASS, BlogCard } from "@/components/blog/blog-card";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { PageFrame } from "@/components/layout/page-frame";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { SafeImage } from "@/components/ui/safe-image";
import { FooterHero } from "@/components/ui/footer-hero";
import { blogCardFromPost, formatPostDate, primaryCategory } from "@/lib/wordpress/cards";
import { getPost, getPosts } from "@/lib/wordpress/collections";
import { BLOG_BASE, blogPath } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { plainText } from "@/lib/wordpress/text";
import { postStaticParams } from "@/lib/wordpress/static-params";
import { sanitizeRichText } from "@/lib/wordpress/rich-text";

export const instant = false;

// Prerender every post WordPress has at build time; newer ones render on first request.
export const generateStaticParams = postStaticParams;

function cleanExcerpt(post: { excerpt?: string | null; content?: string | null }) {
  const raw = plainText(post.excerpt) || plainText(post.content) || "";
  const cleaned = raw.replace(/\[&hellip;\]|\[\.\.\.\]/g, "").trim();
  const sentences = cleaned.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 0) {
    let result = "";
    for (const s of sentences) {
      if ((result + s).length <= 240) {
        result += (result ? " " : "") + s.trim();
      } else {
        break;
      }
    }
    if (result.trim()) return result.trim();
  }
  return cleaned.slice(0, 200).trim();
}

/**
 * Splits a title into a white prefix and a green highlight word/phrase matching Figma.
 * Example: "Finance in a Box Welcomes GyroHR" -> "Finance in a Box " + "Welcomes GyroHR"
 */
function splitBlogTitle(title: string): { before: string; highlight: string } {
  const lower = title.toLowerCase();

  // Exact match for the Figma design post
  if (lower.includes("welcomes gyrohr")) {
    const idx = title.toLowerCase().indexOf("welcomes gyrohr");
    return { before: title.slice(0, idx).trim(), highlight: title.slice(idx).trim() };
  }

  // Common subtitle splitters
  if (title.includes(":")) {
    const [before, ...rest] = title.split(":");
    return { before: `${before.trim()}:`, highlight: rest.join(":").trim() };
  }
  if (title.includes(" – ")) {
    const [before, ...rest] = title.split(" – ");
    return { before: `${before.trim()} –`, highlight: rest.join(" – ").trim() };
  }
  if (title.includes(" - ")) {
    const [before, ...rest] = title.split(" - ");
    return { before: `${before.trim()} -`, highlight: rest.join(" - ").trim() };
  }

  const words = title.trim().split(/\s+/);
  if (words.length <= 2) {
    return { before: words[0] || "", highlight: words.slice(1).join(" ") };
  }

  // Highlight roughly the last 2-3 words
  const splitIndex = Math.max(1, words.length - (words.length > 5 ? 3 : 2));
  return {
    before: words.slice(0, splitIndex).join(" "),
    highlight: words.slice(splitIndex).join(" "),
  };
}

type BlogPostProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPost(slug);

  if (result.status !== "ok") {
    if (slug === "finance-in-a-box-welcomes-gyrohr") {
      return {
        title: "Finance in a Box Welcomes GyroHR",
        description: "GyroHR, founded by Rakhi Shaha, has joined forces with Finance in a Box.",
        alternates: { canonical: blogPath(slug) },
      };
    }
    return { title: "Article not found" };
  }

  const post = result.item;
  const title = plainText(post.title);
  const image = post.featuredImage?.node?.sourceUrl;
  const desc = cleanExcerpt(post);

  return {
    title,
    description: desc || undefined,
    alternates: { canonical: blogPath(post.slug ?? slug) },
    openGraph: {
      type: "article",
      title,
      description: desc || undefined,
      url: blogPath(post.slug ?? slug),
      publishedTime: post.date ?? undefined,
      authors: post.author?.node?.name ? [plainText(post.author.node.name)] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

/** Fallback content for the Figma Blog Details post when WordPress is offline */
const FIGMA_GYROHR_FALLBACK = {
  title: "Finance in a Box Welcomes GyroHR",
  slug: "finance-in-a-box-welcomes-gyrohr",
  date: "2026-09-15T07:30:04",
  excerpt:
    "Most founders didn’t start a company because they wanted to become experts in payroll compliance, month-end close, or performance review cycles. They started it to build something.",
  content: `
    <p>Most founders didn’t start a company because they wanted to become experts in payroll compliance, month-end close, or performance review cycles. They started it to build something. But growth has a way of pulling attention toward the back office anyway, and the more a company scales, the more that back office splits across disconnected vendors, each with their own systems, their own point of contact, and their own version of what’s actually going on.</p>
    <p>We built Finance in a Box to close that gap on the finance side. Today, we’re closing it further.</p>
    <p><strong>GyroHR, founded by Rakhi Shaha, has joined forces with Finance in a Box.</strong></p>
    <p>Rakhi and her team bring years of hands-on HR expertise directly into the platform our clients already rely on. Recruiting, HR operations, performance management, leadership development, learning and development, and HR advisory are now part of what FIAB offers, delivered by the same team already handling your books, with reach across both the US and India.</p>
    <h3>Why this, and why now</h3>
    <p>Growing companies don’t experience finance, people, and operations as separate problems. They experience them as one continuous problem: too much complexity, not enough senior judgment in the room, and a growing list of vendors who don’t talk to each other. A finance team that doesn’t understand the HR picture, and an HR function that doesn’t understand the cash picture, end up solving half a problem each.</p>
    <p>That’s the thinking behind bringing GyroHR into FIAB. As Rakhi put it, <strong>“businesses do not experience finance, people, and operations as separate functions. When a company is growing, all of these have to work together. Strong organizations are built when the foundation behind the business is equally strong.”</strong></p>
    <p>This is the same instinct that led Founder & CEO Amit Mulchandani to start FIAB in the first place: give founders one accountable partner instead of a patchwork of vendors, so they can spend their time on the business they’re actually building, not on stitching together the systems behind it.</p>
    <h3>What’s available now</h3>
    <ul>
      <li>Recruiting, from individual roles to broader hiring support</li>
      <li>HR operations, the day-to-day infrastructure that keeps a people function running</li>
      <li>Performance management, building the processes that help teams actually grow</li>
      <li>Leadership development and learning & development, for companies investing in the people who’ll take them to their next stage</li>
      <li>HR advisory, senior judgment on the people decisions that don’t have an obvious playbook</li>
    </ul>
    <p>All of it is available in both the US and India.</p>
    <h3>What doesn’t change</h3>
    <p>If you’re already a FIAB client, your finance team and how we support you stays exactly the same. Nothing about your current engagement shifts because of this. What changes is what’s now available to you if you need it: a people function you don’t have to go find somewhere else.</p>
    <p>Rakhi is taking on the role of Chief People & HR Practice Officer at FIAB, a mandate that spans two things she cares about deeply: building FIAB’s own internal culture as the company scales, and growing the client-facing HR practice alongside FIAB’s existing finance capabilities. In her words: <strong>“This is not about leaving behind what we built at GyroHR. It’s about taking everything that experience taught us and building on a much larger canvas.”</strong></p>
    <h3>One partner, more of what you actually need</h3>
    <p>To every client who has trusted FIAB with their finance function, thank you. This is one more step toward the reason we started this company: so founders and CEOs can spend their time on the business they’re building, not on untangling finance, HR, and the rest of the back office themselves.</p>
    <p>If HR is on your radar right now, whether it’s a single hire, building out a people function from scratch, or expanding your team into India, we’re already set up to help. Reach out, and let’s talk about what that looks like for you.</p>
  `,
  featuredImage: {
    node: {
      sourceUrl:
        "https://web3.dddemo.net/wordpress/2026/finance/wp-content/uploads/2026/11/Finance-in-a-Box-Welcomes-GyroHR.png",
      altText: "Finance in a Box Welcomes GyroHR",
    },
  },
  author: {
    node: {
      name: "Guruprasad",
      avatar: { url: "/knowledge-hub/guruprasad.png" },
    },
  },
  categories: {
    nodes: [{ name: "Blog", slug: "blog" }, { name: "Innovation", slug: "innovation" }],
  },
  tags: { nodes: [] },
};

/**
 * Single blog post detail page:
 * Redesigned to 100% match Figma image 'Blog Details Page.jpg':
 * - Dynamic Hero with min-height 525px, background mesh + green glows
 * - Large container featured image with rounded corners
 * - Two-column reading layout: Main article + Sidebar (Search, Categories, Tags Clouds, Promo Card)
 * - Green square bullets for bulleted lists
 * - Related Blog Section with 3-column BlogCard grid
 * - FooterHero CTA section 100% matching attached Figma design
 */
export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const [chrome, result, all] = await Promise.all([getSiteChrome(), getPost(slug), getPosts()]);

  // Use dynamic WordPress post if found, otherwise use fallback if matching GyroHR slug
  let post: any = null;
  if (result.status === "ok") {
    post = result.item;
  } else if (slug === "finance-in-a-box-welcomes-gyrohr" || slug === "1") {
    post = FIGMA_GYROHR_FALLBACK;
  } else {
    notFound();
  }

  const rawTitle = plainText(post.title);
  const { before: titleBefore, highlight: titleHighlight } = splitBlogTitle(rawTitle);

  const excerptText = cleanExcerpt(post);
  const featuredImageUrl =
    post.featuredImage?.node?.sourceUrl ||
    "https://web3.dddemo.net/wordpress/2026/finance/wp-content/uploads/2026/11/Finance-in-a-Box-Welcomes-GyroHR.png";
  const featuredImageAlt = post.featuredImage?.node?.altText || rawTitle;

  const rawAuthor = post.author?.node?.name ? plainText(post.author.node.name) : "Guruprasad";
  const authorName = rawAuthor.replace(/^by\s+/i, "");
  const authorAvatar =
    post.author?.node?.avatar?.url && !post.author.node.avatar.url.includes("gravatar.com")
      ? post.author.node.avatar.url
      : "/knowledge-hub/guruprasad.png";

  const postDate = formatPostDate(post.date) || "15 Sep, 2026";

  const rawCategories: string[] = (post.categories?.nodes ?? [])
    .map((c: any) => plainText(c?.name))
    .filter((n: string | null | undefined): n is string => Boolean(n));
  const displayCategories: string[] = rawCategories.length > 0 ? rawCategories : ["Blog", "Innovation"];

  const rawContent = post.content?.trim() ? post.content : post.excerpt;
  const sanitizedHtml = sanitizeRichText(rawContent);

  // Related articles (up to 3 items, excluding current post)
  const moreArticles =
    all.status === "ok" && all.items.length > 0
      ? all.items
          .filter((item) => item.slug !== post.slug)
          .slice(0, 3)
          .map((item) => blogCardFromPost(item))
      : [];

  return (
    <PageFrame chrome={chrome}>
      {/* 1. Hero Section matching Figma 'Blog Details Page.jpg' */}
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
              OUR BLOGS
            </p>
          </Reveal>

          {/* Title */}
          <Reveal immediate preset="slide-up" delay={180} distance={24} className="max-w-[1060px] mx-auto">
            <h1 className="text-[30px] xs:text-[38px] sm:text-[46px] md:text-[50px] lg:text-[54px] leading-[1.14] font-medium tracking-tight text-white mb-5 sm:mb-6">
              {titleBefore}{" "}
              {titleHighlight ? (
                <span className="text-brand-green">{titleHighlight}</span>
              ) : null}
            </h1>
          </Reveal>

          {/* Description / Excerpt */}
          {excerptText ? (
            <Reveal immediate preset="slide-up" delay={300} distance={20} className="max-w-[780px] mx-auto">
              <p className="text-[14px] sm:text-[15px] md:text-[16px] text-white/80 font-light leading-[1.65]">
                {excerptText}
              </p>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* 2. Main Article Section */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container >
          {/* Featured Image matching Figma */}
          {featuredImageUrl ? (
            <Reveal preset="slide-up" distance={20}>
              <div className="relative w-full aspect-[16/7.5] min-h-[260px] sm:min-h-[380px] lg:min-h-[580px] max-h-[600px] rounded-[20px] sm:rounded-[20px] overflow-hidden bg-gray-100 mb-7.5 sm:mb-8 lg:mb-10">
                <SafeImage
                  src={featuredImageUrl}
                  fallbackSrc="/knowledge-hub/blog1.png"
                  alt={featuredImageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </Reveal>
          ) : null}

          {/* Two-Column Grid: Article Content + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-16 items-start">
            {/* Left Column: Article Body */}
            <article className="flex-1 min-w-0 w-full">
              <Reveal preset="slide-up" distance={20} delay={100}>
                {/* Category Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4.5 sm:mb-5">
                  {displayCategories.map((category, idx) => (
                    <span
                      key={idx}
                      className="bg-brand-green/10 text-brand-green px-4.25 py-2 rounded-[5px] font-semibold text-[18px] tracking-wide"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Author, Date, Comments Row matching Figma */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[13.5px] sm:text-[14px] text-brand-blue/80 pb-5 sm:pb-6 mb-8 border-b border-black/[0.08]">
                  {/* Author */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full overflow-hidden border border-black/10 shrink-0">
                      <SafeImage
                        src={authorAvatar}
                        fallbackSrc="/knowledge-hub/guruprasad.png"
                        alt={authorName}
                        fill
                        className="object-cover"
                        sizes="38px"
                      />
                    </div>
                    <span className="font-semibold text-brand-blue">By {authorName}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-brand-blue/70">
                    <svg
                      className="w-4 h-4 text-brand-green shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{postDate}</span>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-2 text-brand-blue/70">
                    <svg
                      className="w-4 h-4 text-brand-green shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>0 Comments</span>
                  </div>
                </div>

                {/* Sanitized Rich Text Body with green square bullets */}
                <div
                  className="blog-content-body"
                  dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                />
              </Reveal>
            </article>

            {/* Right Column: Sidebar matching Figma */}
            <div className="w-full lg:w-[360px] xl:w-[380px] shrink-0">
              <Reveal preset="slide-up" distance={20} delay={180}>
                <BlogSidebar />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Related Blog Section matching Figma */}
      {moreArticles.length > 0 ? (
        <Section theme="light" spacing="bottom" className="case-studies-section">
          <Container >
            <Reveal preset="slide-up" distance={20}>
              <p className="mb-2.5 text-center text-brand-green font-mono uppercase tracking-[1.5px] text-[12px] sm:text-[13px] font-medium">
                NEWS & ARTICALS
              </p>
              <h2 className="text-center text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight mb-8 sm:mb-12 text-brand-blue">
                Related <span className="italic font-bold">Blog</span>
              </h2>
            </Reveal>

            <StaggerGroup staggerDelay={120} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moreArticles.map((blog, idx) => (
                <StaggerItem key={blog.url || idx} index={idx} className={BLOG_CARD_CLASS}>
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </Section>
      ) : null}

      {/* 4. Footer Hero CTA Section 100% matching Figma */}
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
