import { defineSection } from "@/lib/page-builder/types";
import type { YourOwnAgenticSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AgenticBuildYourOwn } from "@/components/agentic-ai/agentic-ai-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `YourOwnAgenticSection` — Build-your-own agent cards. */
export const yourOwnAgenticSection = defineSection<YourOwnAgenticSectionFragment>({
  layout: "YourOwnAgenticSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    return (
      <AgenticBuildYourOwn
        buildYourOwn={{
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          text: text(data.description),
          agents: (data.buildYourOwnAgentic ?? []).map((agent) => ({
            icon: media(agent?.icon)?.url ?? "",
            title: text(agent?.title),
            text: text(agent?.content),
            greatFor: text(agent?.greatFor),
          })),
        }}
      />
    );
  },
});