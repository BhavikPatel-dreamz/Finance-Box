import { sectionRegistry } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

function SectionDiagnostic({
  kind,
  typeName,
}: {
  kind: "unknown" | "invalid";
  typeName: string;
}) {
  const label = typeName || "unknown";
  if (process.env.NODE_ENV === "production") {
    console.error(`Financebox ${kind} section: ${label}`);
    return null;
  }

  return (
    <p role="status" className="border border-border px-4 py-3 text-sm text-muted">
      {kind === "unknown"
        ? `Unsupported section “${label}”. Register a component before it can render.`
        : `Section “${label}” was skipped because its content did not match the expected fields.`}
    </p>
  );
}

export function SectionRenderer({
  sections,
  sectionError,
}: {
  sections: RawSection[];
  sectionError: string | null;
}) {
  return (
    <div className="flex flex-col gap-12">
      {sectionError && process.env.NODE_ENV !== "production" ? (
        <p role="status" className="border border-border px-4 py-3 text-sm text-muted">
          {sectionError}
        </p>
      ) : null}
      {sections.map((section, index) => {
        const typeName = typeof section.__typename === "string" ? section.__typename : "";
        const registration = sectionRegistry.find((item) => item.matchesType(typeName));
        if (!registration) {
          return <SectionDiagnostic key={`${typeName}-${index}`} kind="unknown" typeName={typeName} />;
        }

        const rendered = registration.render(section);
        if (!rendered.ok) {
          return <SectionDiagnostic key={`${typeName}-${index}`} kind="invalid" typeName={typeName} />;
        }

        return <div key={`${registration.key}-${index}`}>{rendered.node}</div>;
      })}
    </div>
  );
}
