import type { WhyTeamMember } from "@/content/why-fiab";
import type { TeamCardFragment } from "@/lib/wordpress/generated/graphql";
import { slugFromUri, teamPath } from "@/lib/wordpress/paths";
import { plainText } from "@/lib/wordpress/text";

type TeamNode = Partial<Pick<TeamCardFragment, "title" | "excerpt" | "content" | "slug" | "uri" | "featuredImage">>;

const EMPTY_MEMBER: WhyTeamMember = {
  name: "",
  role: "",
  quote: "",
  bio: "",
  focusTitle: "",
  focusText: "",
  work: "",
  tools: "",
  industries: "",
  image: "/why/why-team-bg.svg",
};

/**
 * Team member (WordPress `team` post) → profile card data.
 *
 * The bio in `content` is split into the card's parts: the first paragraph is
 * the quote, following paragraphs the bio, and lines starting with
 * "Focus & expertise:", "Partnerships:", "Notable work:", "Tools & platforms:"
 * or "Industries:" fill those fields. `excerpt` is the role.
 * Used by the Why FIAB team section and the /team/<slug>/ profile page.
 */
export function mapTeamMember(node: TeamNode, fallback: WhyTeamMember = EMPTY_MEMBER): WhyTeamMember {
  const contentHtml = node.content || "";
  const slug = node.slug ?? slugFromUri(node.uri);

  const textWithNewlines = contentHtml
    .replace(/<\/p>|<br\s*\/?>|<\/li>|<\/h[1-6]>/gi, "\n")
    .replace(/<[^>]*>?/gm, "")
    .replace(/&#038;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');

  const lines = textWithNewlines
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean);

  const result: Partial<WhyTeamMember> = {};
  const introLines: string[] = [];

  const isKnownPrefix = (line: string) => {
    const l = line.toLowerCase();
    return (
      l.startsWith("focus & expertise:") ||
      l.startsWith("focus & expertise :") ||
      l.startsWith("focus:") ||
      l.startsWith("focus :") ||
      l.startsWith("partnerships:") ||
      l.startsWith("partnerships :") ||
      l.startsWith("notable work:") ||
      l.startsWith("notable work :") ||
      l.startsWith("tools & platforms:") ||
      l.startsWith("tools & platforms :") ||
      l.startsWith("industries:") ||
      l.startsWith("industries :")
    );
  };

  for (const line of lines) {
    if (isKnownPrefix(line)) break;
    introLines.push(line);
  }

  if (introLines.length > 0) result.quote = introLines[0];
  if (introLines.length > 1) result.bio = introLines.slice(1).join(" ");

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    if (lowerLine.startsWith("focus & expertise:") || lowerLine.startsWith("focus & expertise :") || lowerLine.startsWith("focus:") || lowerLine.startsWith("focus :")) {
      result.focusTitle = "FOCUS & EXPERTISE:";
      result.focusText = line.replace(/^.*?[:]\s*/i, "");
    } else if (lowerLine.startsWith("partnerships:") || lowerLine.startsWith("partnerships :")) {
      result.partnerships = "PARTNERSHIPS:\n" + line.replace(/^.*?[:]\s*/i, "");
    } else if (lowerLine.startsWith("notable work:") || lowerLine.startsWith("notable work :")) {
      result.work = line.replace(/^.*?[:]\s*/i, "");
    } else if (lowerLine.startsWith("tools & platforms:") || lowerLine.startsWith("tools & platforms :")) {
      result.tools = line.replace(/^.*?[:]\s*/i, "");
    } else if (lowerLine.startsWith("industries:") || lowerLine.startsWith("industries :")) {
      result.industries = line.replace(/^.*?[:]\s*/i, "");
    }
  }

  return {
    name: plainText(node.title) || fallback.name,
    role: plainText(node.excerpt) || fallback.role,
    image: node.featuredImage?.node?.sourceUrl || fallback.image,
    quote: result.quote ?? fallback.quote,
    bio: result.bio ?? fallback.bio,
    focusTitle: result.focusTitle ?? fallback.focusTitle,
    focusText: result.focusText ?? fallback.focusText,
    partnerships: result.partnerships ?? fallback.partnerships,
    work: result.work ?? fallback.work,
    tools: result.tools ?? fallback.tools,
    industries: result.industries ?? fallback.industries,
    imagePosition: fallback.imagePosition ?? "right",
    url: slug ? teamPath(slug) : fallback.url,
  };
}
