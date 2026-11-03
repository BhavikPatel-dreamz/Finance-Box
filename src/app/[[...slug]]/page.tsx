import type { Metadata } from "next";
import { cookies, draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { SectionRenderer } from "@/components/page-builder/section-renderer";
import { MessagePage, PageFrame, siteHeaderNode } from "@/components/layout/page-frame";
import { getPreviewPage, getPublicPage, getSettings, type PageLoadResult } from "@/lib/wordpress/content";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { decodePreviewTarget, PREVIEW_COOKIE } from "@/lib/wordpress/preview";
import { uriFromSlug } from "@/lib/wordpress/uri";

/**
 * The single template for every WordPress page: `/`, `/about`,
 * `/services/web-development`, …
 *
 * 1. Resolve the route to a WordPress URI (reserved and malformed paths 404).
 * 2. Load the published page, or the draft when Draft Mode is on.
 * 3. Render the shared header, the page-builder sections in WordPress order,
 *    and the shared footer.
 */

// Navigations into this route wait on WordPress data; do not validate them as instant.
export const instant = false;

type Loaded = { uri: string; result: PageLoadResult; preview: boolean };

async function loadPage(slug: string[] | undefined): Promise<Loaded | null> {
  const uri = uriFromSlug(slug);
  if (!uri) return null;

  const { isEnabled } = await draftMode();
  if (isEnabled) {
    const target = decodePreviewTarget((await cookies()).get(PREVIEW_COOKIE)?.value);
    if (target && target.path === uri) {
      return { uri, result: await getPreviewPage(target.id), preview: true };
    }
  }

  return { uri, result: await getPublicPage(uri), preview: isEnabled };
}

const NOINDEX = { index: false, follow: false } as const;

export async function generateMetadata({ params }: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadPage(slug);

  if (!loaded || loaded.result.status === "not-found") return { title: "Page not found", robots: NOINDEX };
  if (loaded.result.status !== "ok") return { robots: NOINDEX };

  const { page } = loaded.result;
  const { seo } = page;
  const noindex = loaded.preview || seo.noindex;

  return {
    title: seo.title,
    description: seo.description || undefined,
    alternates: noindex ? undefined : { canonical: seo.canonical },
    robots: noindex ? NOINDEX : { index: true, follow: true },
    openGraph: {
      type: "website",
      title: seo.openGraphTitle,
      description: seo.openGraphDescription || undefined,
      url: seo.canonical,
      images: seo.image ? [{ url: seo.image }] : undefined,
    },
  };
}

function websiteJsonLd(name: string, url: string) {
  // Escape "<" so a WordPress value can never close the script element.
  return JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name, url }).replace(/</g, "\\u003c");
}

export default async function WordPressPage({ params }: PageProps<"/[[...slug]]">) {
  const { slug } = await params;
  const [loaded, chrome] = await Promise.all([loadPage(slug), getSiteChrome()]);

  if (!loaded || loaded.result.status === "not-found") notFound();

  if (loaded.result.status === "unconfigured") {
    return (
      <MessagePage
        chrome={chrome}
        title="Financebox"
        body="The WordPress GraphQL endpoint is not configured yet. Set WORDPRESS_GRAPHQL_URL to render pages."
      />
    );
  }

  if (loaded.result.status === "unavailable") {
    return <MessagePage chrome={chrome} title="Financebox" body="The content service is unavailable. Please try again shortly." />;
  }

  const { page } = loaded.result;
  const header = siteHeaderNode(chrome);

  if (page.sections.length === 0) {
    return (
      <MessagePage
        chrome={chrome}
        title={page.title}
        body={
          process.env.NODE_ENV === "production"
            ? undefined
            : "This WordPress page has no Page Builder sections yet. Add sections in WordPress to build it."
        }
      />
    );
  }

  const settings = page.isFrontPage ? await getSettings() : null;

  return (
    <PageFrame chrome={chrome}>
      {loaded.preview ? (
        <p role="status" className="fixed bottom-4 left-4 z-[100] rounded-full bg-amber-400 px-4 py-2 text-sm font-medium text-black shadow-lg">
          Preview —{" "}
          {/* A Route Handler, not a page: <Link> would prefetch it and exit preview on hover. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="underline" href={`/api/preview/exit?redirect=${encodeURIComponent(page.uri)}`}>
            exit
          </a>
        </p>
      ) : null}
      <SectionRenderer sections={page.sections} uri={page.uri} header={header} />
      {settings?.source === "wordpress" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLd(settings.name, page.seo.canonical) }}
        />
      ) : null}
    </PageFrame>
  );
}
