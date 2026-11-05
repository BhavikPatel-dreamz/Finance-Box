import "server-only";
import type { CaseStudyCardFragment, PostCardFragment } from "@/lib/wordpress/generated/graphql";
import type { KnowledgeHubBlog } from "@/content/knowledge-hub";
import type { ClientCaseStudy } from "@/content/clients";
import { blogPath, caseStudyPath, slugFromUri } from "@/lib/wordpress/paths";
import { plainText } from "@/lib/wordpress/text";
import { wordCount } from "@/lib/wordpress/rich-text";

/**
 * Maps WordPress posts and case studies to the card shapes the existing
 * designs use, so the Knowledge Hub, Clients page, archives and detail pages
 * all show the same data the same way.
 */

export type BlogCard = KnowledgeHubBlog;
export type CaseStudyCard = ClientCaseStudy;

const DEFAULT_BLOG_IMAGE = "/knowledge-hub/blog1.png";
const DEFAULT_CASE_STUDY_IMAGE = "/clients/case-study-1.png";
const DEFAULT_AVATAR = "/knowledge-hub/guruprasad.png";
const GENERIC_CATEGORIES = new Set(["blog", "uncategorized"]);

export function formatPostDate(date: string | null | undefined) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

export function readingTime(html: string | null | undefined) {
  return `${Math.max(1, Math.round(wordCount(html) / 200))} min read`;
}

/** The most specific category: "Finance Accounting" rather than the catch-all "Blog". */
export function primaryCategory(post: Pick<PostCardFragment, "categories">) {
  const names = (post.categories?.nodes ?? []).map((category) => plainText(category.name)).filter(Boolean);
  return names.find((name) => !GENERIC_CATEGORIES.has(name.toLowerCase())) ?? names[0] ?? "Blog";
}

export function blogCardFromPost(post: PostCardFragment, fallback?: Partial<BlogCard>): BlogCard {
  const slug = post.slug ?? slugFromUri(post.uri);
  const author = post.author?.node;
  return {
    image: post.featuredImage?.node.sourceUrl || fallback?.image || DEFAULT_BLOG_IMAGE,
    category: primaryCategory(post),
    date: formatPostDate(post.date) || fallback?.date || "",
    readTime: readingTime(post.content),
    title: plainText(post.title) || fallback?.title || "Untitled",
    author: {
      name: author?.name ? `By ${plainText(author.name)}` : fallback?.author?.name || "",
      avatar: author?.avatar?.url || fallback?.author?.avatar || DEFAULT_AVATAR,
    },
    url: slug ? blogPath(slug) : fallback?.url || "/blog/",
  };
}

export type CaseStudyParts = { challenge: string; solution: string; outcome: string };

/**
 * Editors write the summary as paragraphs that start with a bold label:
 * "<p><strong>Challenge:</strong> …</p><p><strong>Solution:</strong> …</p>".
 */
export function caseStudyParts(html: string | null | undefined): CaseStudyParts {
  const parts: CaseStudyParts = { challenge: "", solution: "", outcome: "" };
  for (const block of (html ?? "").split(/<\/p>|<br\s*\/?>/i)) {
    const text = plainText(block);
    const match = text.match(/^(challenge|solution|outcome)\s*:\s*([\s\S]*)$/i);
    if (match) parts[match[1].toLowerCase() as keyof CaseStudyParts] = match[2].trim();
  }
  return parts;
}

export function caseStudyCardFromNode(node: CaseStudyCardFragment, fallback?: Partial<CaseStudyCard>): CaseStudyCard {
  const slug = node.slug ?? slugFromUri(node.uri);
  const options = node.caseStudiesOptions;
  const parts = caseStudyParts(options?.featuredContent);
  return {
    id: String(node.databaseId),
    label: plainText(options?.tagLine) || fallback?.label || "",
    title: plainText(node.title) || fallback?.title || "Untitled",
    challenge: parts.challenge || fallback?.challenge || "",
    solution: parts.solution || fallback?.solution || "",
    outcome: parts.outcome || fallback?.outcome || "",
    image:
      options?.frontFeatureImage?.node.sourceUrl ||
      node.featuredImage?.node.sourceUrl ||
      fallback?.image ||
      DEFAULT_CASE_STUDY_IMAGE,
    ctaUrl: slug ? caseStudyPath(slug) : fallback?.ctaUrl || "/case-study/",
  };
}
