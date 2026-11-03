const isProduction = process.env.NODE_ENV === "production";

export type SectionProblem = "unknown-layout" | "render-error";

/** Logs a section that could not render. Never includes field values or stack traces. */
export function reportSectionProblem(problem: SectionProblem, layout: string, uri: string, index: number, error?: unknown) {
  const reason = problem === "unknown-layout" ? "no registered component" : "render failed";
  const detail = error instanceof Error ? `: ${error.message}` : "";
  console.error(`[page-builder] Skipped section ${index} "${layout}" on ${uri} (${reason})${isProduction ? "" : detail}`);
}

/**
 * Shown in development only, so a missing or broken section is obvious while
 * building. Production renders nothing in its place.
 */
export function SectionFallback({ problem, layout }: { problem: SectionProblem; layout: string }) {
  if (isProduction) return null;

  return (
    <div role="status" className="border-y-2 border-dashed border-amber-500 bg-amber-50 px-6 py-5 text-sm text-amber-950">
      <p className="font-semibold">
        {problem === "unknown-layout" ? "Unregistered page-builder section" : "Section failed to render"}:{" "}
        <code className="font-mono">{layout}</code>
      </p>
      <p className="mt-1">
        {problem === "unknown-layout"
          ? "WordPress returned this layout but no React component is registered for it. Follow docs/section-development.md to add one. This notice is hidden in production and the section is skipped."
          : "Its mapping threw an error (see the server log). The rest of the page rendered normally. In production the section is skipped."}
      </p>
    </div>
  );
}
