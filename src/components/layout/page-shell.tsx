import { SectionRenderer } from "@/components/sections/section-renderer";
import type { PublicPage, SiteSettings } from "@/lib/wordpress/content";
import { Container } from "@/components/ui/container";

export function PageShell({
  page,
  settings,
}: {
  page: PublicPage;
  settings: SiteSettings;
}) {
  const structuredData =
    page.uri === "/" && settings.source === "wordpress"
      ? {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: settings.name,
          url: settings.url,
        }
      : null;

  return (
    <Container as="main" className="flex flex-1 flex-col px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">{page.title}</h1>
      {page.sections.length > 0 || page.sectionError ? (
        <div className="mt-10">
          <SectionRenderer sections={page.sections} sectionError={page.sectionError} />
        </div>
      ) : null}
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}
    </Container>
  );
}

export function StatusMessage({ title, body }: { title: string; body: string }) {
  return (
    <Container as="main" className="flex flex-1 flex-col px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-2xl text-muted">{body}</p>
    </Container>
  );
}
