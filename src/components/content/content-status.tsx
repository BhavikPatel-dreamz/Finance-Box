import { notFound } from "next/navigation";
import { MessagePage } from "@/components/layout/page-frame";
import type { SiteChrome } from "@/lib/wordpress/site-chrome";

type Status = { status: "not-found" } | { status: "unavailable" } | { status: "unconfigured" };

/**
 * Same failure behaviour as WordPress pages: a missing item is a 404, while an
 * unconfigured or failing WordPress shows a message (never a cached 404).
 */
export function ContentStatus({ result, chrome }: { result: Status; chrome: SiteChrome }) {
  if (result.status === "not-found") notFound();
  return (
    <MessagePage
      chrome={chrome}
      title="Financebox"
      body={
        result.status === "unconfigured"
          ? "The WordPress GraphQL endpoint is not configured yet."
          : "The content service is unavailable. Please try again shortly."
      }
    />
  );
}

export const NOINDEX = { index: false, follow: false } as const;
