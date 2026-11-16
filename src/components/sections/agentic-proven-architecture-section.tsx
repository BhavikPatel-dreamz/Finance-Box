import { defineSection } from "@/lib/page-builder/types";
import type { AgenticProvenArchitectureSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AgenticProvenArchitecture } from "@/components/agentic-ai/agentic-ai-sections";
import { media, text } from "@/lib/wordpress/fields";
import { plainText } from "@/lib/wordpress/text";

function parseArchitectureCardContent(rawContent: string | null | undefined): {
  text: string;
  bullets: Array<{ boldText: string; normalText: string }>;
} {
  if (!rawContent || typeof rawContent !== "string") return { text: "", bullets: [] };

  let textContent = "";
  const ulIdx = rawContent.toLowerCase().indexOf("<ul");
  if (ulIdx !== -1) {
    const beforeUl = rawContent.slice(0, ulIdx);
    textContent = plainText(beforeUl);
  } else if (!rawContent.toLowerCase().includes("<li")) {
    textContent = plainText(rawContent);
  }

  const liMatches = [...rawContent.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)];
  const bullets = liMatches
    .map((m) => {
      const rawLi = m[1];
      const strongMatch = rawLi.match(/^([\s\S]*?)<(strong|b)\b[^>]*>([\s\S]*?)<\/\2>([\s\S]*)$/i);
      if (strongMatch) {
        const boldText = plainText(strongMatch[3]);
        const normalText = plainText(strongMatch[4]);
        return {
          boldText,
          normalText,
        };
      }
      return {
        boldText: "",
        normalText: plainText(rawLi),
      };
    })
    .filter((b) => b.boldText || b.normalText);

  return { text: textContent, bullets };
}

/** `AgenticProvenArchitectureSection` — Architecture cards. */
export const agenticProvenArchitectureSection = defineSection<AgenticProvenArchitectureSectionFragment>({
  layout: "AgenticProvenArchitectureSection",
  render: (data) => {
    return (
      <AgenticProvenArchitecture
        provenArchitecture={{
          title: text(data.title),
          highlight: text(data.highlightTitle),
          cards: (data.architectureCards ?? []).map((card) => {
            const { text: cardText, bullets } = parseArchitectureCardContent(card?.content);
            return {
              image: media(card?.image)?.url ?? "",
              title: text(card?.title),
              text: cardText,
              bullets,
            };
          }),
        }}
      />
    );
  },
});