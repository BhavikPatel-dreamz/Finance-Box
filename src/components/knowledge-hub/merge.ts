import {
  knowledgeHubContent,
  type KnowledgeHubContent,
  type KnowledgeHubBlog,
  type KnowledgeHubLink,
  type KnowledgeHubCaseStudy,
} from "@/content/knowledge-hub";
import type { RawSection } from "@/lib/wordpress/content";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                    */
/* -------------------------------------------------------------------------- */

function str(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function keep(value: unknown, fallback: string): string {
  return str(value) ?? fallback;
}

function cleanHtml(value: unknown, fallback: string): string {
  const text = str(value);
  if (!text) return fallback;
  const stripped = text
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<[^>]*>?/gm, "") // Remove HTML tags
    
    // 👇 NAYA: HTML Entities decode karo (WordPress Excerpt fix)
    .replace(/&#8230;/gi, "...")
    .replace(/&#8217;/gi, "'")
    .replace(/&#8216;/gi, "'")
    .replace(/&#8220;/gi, '"')
    .replace(/&#8221;/gi, '"')
    .replace(/&#8211;/gi, "–")
    .replace(/&#8212;/gi, "—")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .trim();
  return stripped || fallback;
}

function media(value: unknown): { url: string; alt: string } | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, any>;
  const nested = item.node ?? item;
  const url = nested.sourceUrl ?? nested.url ?? null;
  if (!url || typeof url !== "string") return null;
  return {
    url,
    alt: typeof nested.altText === "string" ? nested.altText : "",
  };
}

function link(value: unknown, fallback: { label: string; url: string }) {
  if (!value || typeof value !== "object") return fallback;
  const item = value as Record<string, any>;
  return {
    label: keep(item.title ?? item.label, fallback.label),
    url: keep(item.url, fallback.url),
  };
}

function rows(value: unknown): Record<string, any>[] {
  return Array.isArray(value) ? (value as Record<string, any>[]) : [];
}

function matchesLayout(typeName: string, layoutName: string): boolean {
  return typeName.endsWith(`${layoutName}Layout`);
}

/* -------------------------------------------------------------------------- */
/*                              Section Mergers                                */
/* -------------------------------------------------------------------------- */

/** Common Banner Section → hero. */
function mergeHero(next: KnowledgeHubContent, section: Record<string, any>): void {
  next.hero.eyebrow = cleanHtml(section.subTitle, next.hero.eyebrow);
  next.hero.title = cleanHtml(section.title, next.hero.title);
  
  const rawTitle = str(section.title) ?? "";
  const boldMatch = rawTitle.match(/<b>(.*?)<\/b>/i) || rawTitle.match(/<strong>(.*?)<\/strong>/i);
  if (boldMatch && boldMatch[1]) {
    next.hero.highlight = cleanHtml(boldMatch[1], "").trim();
  } else {
    next.hero.highlight = cleanHtml(section.highlight, next.hero.highlight);
  }

  next.hero.text = cleanHtml(section.description, next.hero.text);
  next.hero.cta = link(section.ctaButton, next.hero.cta);
}

/** Our Blog Section → blogs. */
function mergeBlogs(next: KnowledgeHubContent, section: Record<string, any>): void {
  next.blogs.title = cleanHtml(section.title, next.blogs.title);
  next.blogs.cta = link(section.allBlogCta, next.blogs.cta);

  const blogs = rows(section.selectBlog?.nodes ?? section.selectBlog);
  if (blogs.length > 0) {
    next.blogs.items = blogs.map((post, index) => {
      const fallback = next.blogs.items[index];
      return {
        image: media(post.featuredImage)?.url ?? fallback?.image ?? "",
        category: "Consulting", // ACF me category nahi hai, static rakh rahe hain
        date: post.date ? new Date(post.date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }) : fallback?.date ?? "",
        readTime: "3 min read", // ACF me nahi hai, static
        title: cleanHtml(post.title, fallback?.title ?? ""),
        author: {
          name: "By Guruprasad", // ACF me nahi hai, static
          avatar: "/knowledge-hub/guruprasad.png",
        },
        url: post.uri ?? fallback?.url ?? "/",
      } satisfies KnowledgeHubBlog;
    });
  }
}

/** Simple CTA Section → resources. */
function mergeResources(next: KnowledgeHubContent, section: Record<string, any>): void {
  next.resources.title = cleanHtml(section.title, next.resources.title);
  next.resources.text = cleanHtml(section.description, next.resources.text);
  next.resources.cta = link(section.ctaButton, next.resources.cta);
}

/** Case Study Section → caseStudy. */
function mergeCaseStudy(next: KnowledgeHubContent, section: Record<string, any>): void {
  next.caseStudy.title = cleanHtml(section.title, next.caseStudy.title);
  
  const caseStudies = rows(section.selectCaseStudy?.nodes ?? section.selectCaseStudy);
  if (caseStudies.length > 0) {
    next.caseStudy.items = caseStudies.map((post, index) => {
      const fallback = next.caseStudy.items[index];
      return {
        image: media(post.featuredImage)?.url ?? fallback?.image ?? "",
        title: cleanHtml(post.title, fallback?.title ?? ""),
        // Yahan excerpt clean ho raha hai, jisse &#8230; hat jayega
        text: cleanHtml(post.excerpt, fallback?.text ?? ""),
      };
    });
  }
}

/** Join Waitlist Section → newsletter. */
function mergeNewsletter(next: KnowledgeHubContent, section: Record<string, any>): void {
  next.newsletter.title = cleanHtml(section.title, next.newsletter.title);
  next.newsletter.text = cleanHtml(section.description, next.newsletter.text);
  next.newsletter.cta = link(section.ctaButton, next.newsletter.cta);
}

/** CTA Section → pressure. */
function mergePressure(next: KnowledgeHubContent, section: Record<string, any>): void {
  const rawTitle = str(section.title) ?? "";
  const boldMatch = rawTitle.match(/<b>(.*?)<\/b>/i) || rawTitle.match(/<strong>(.*?)<\/strong>/i);
  const cleanTitle = cleanHtml(section.title, next.pressure.title);

  if (boldMatch && boldMatch[1]) {
    const highlight = cleanHtml(boldMatch[1], "").trim();
    if (highlight) {
      const remainder = cleanTitle.replace(highlight, "").replace(/\s+/g, " ").trim();
      next.pressure.title = remainder || cleanTitle;
      next.pressure.emphasis = highlight;
    } else {
      next.pressure.title = cleanTitle;
    }
  } else {
    next.pressure.title = cleanTitle;
  }

  next.pressure.text = cleanHtml(section.description, next.pressure.text);
  next.pressure.cta = link(section.ctaButton, next.pressure.cta);
}

/* -------------------------------------------------------------------------- */
/*                              Public Entry Point                             */
/* -------------------------------------------------------------------------- */

export function mergeKnowledgeHub(
  base: KnowledgeHubContent,
  sections: RawSection[],
): KnowledgeHubContent {
  const next: KnowledgeHubContent = structuredClone(base);

  for (const section of sections ?? []) {
    const typeName =
      typeof section.__typename === "string" ? section.__typename : "";
    const data = section as Record<string, any>;

    if (matchesLayout(typeName, "CommonBannerSection")) {
      mergeHero(next, data);
      continue;
    }

    if (matchesLayout(typeName, "OurBlogSection")) {
      mergeBlogs(next, data);
      continue;
    }

    if (matchesLayout(typeName, "SimpleCtaSection")) {
      mergeResources(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CaseStudySection")) {
      mergeCaseStudy(next, data);
      continue;
    }

    if (matchesLayout(typeName, "JoinWaitlistSection")) {
      mergeNewsletter(next, data);
      continue;
    }

    if (matchesLayout(typeName, "CtaSection")) {
      mergePressure(next, data);
      continue;
    }
  }

  return next;
}

export function mergeKnowledgeHubContent(sections: RawSection[]): KnowledgeHubContent {
  return mergeKnowledgeHub(knowledgeHubContent, sections);
}