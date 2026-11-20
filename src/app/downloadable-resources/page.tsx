import type { Metadata } from "next";
import { PageFrame } from "@/components/layout/page-frame";
import { SectionRenderer } from "@/components/page-builder/section-renderer";
import { getPublicPage } from "@/lib/wordpress/content";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { downloadableResourcesContent } from "@/content/downloadable-resources";
import { DownloadableResourcesPageContent } from "@/components/downloadable-resources/downloadable-resources-sections";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "/downloadable-resources";

  // Check if WordPress has SEO metadata for this page
  const pageResult = await getPublicPage("/downloadable-resources/");
  if (pageResult.status === "ok" && pageResult.page.seo) {
    const seo = pageResult.page.seo;
    return {
      title: seo.title || "Downloadable Resources — Finance in a Box",
      description:
        seo.description ||
        "Access free production-ready financial templates, month-end close checklists, AR playbooks, and KPI dictionaries.",
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: seo.openGraphTitle || "Downloadable Resources — Finance in a Box",
        description: seo.openGraphDescription || seo.description,
        type: "website",
        url: canonicalUrl,
        images: seo.image ? [{ url: seo.image }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: seo.openGraphTitle || seo.title,
        description: seo.openGraphDescription || seo.description,
      },
    };
  }

  return {
    title: "Downloadable Resources — Finance in a Box",
    description:
      "Access free production-ready financial templates, month-end close checklists, AR playbooks, and KPI dictionaries built by senior finance operators.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Downloadable Resources — Finance in a Box",
      description:
        "Access free production-ready financial templates, month-end close checklists, AR playbooks, and KPI dictionaries built by senior finance operators.",
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: "Downloadable Resources — Finance in a Box",
      description:
        "Access free production-ready financial templates, month-end close checklists, AR playbooks, and KPI dictionaries built by senior finance operators.",
    },
  };
}

export default async function DownloadableResourcesPage() {
  const [chrome, pageResult] = await Promise.all([
    getSiteChrome(),
    getPublicPage("/downloadable-resources/"),
  ]);

  // If page is created in WordPress with Page Builder sections, render them dynamically
  if (pageResult.status === "ok" && pageResult.page.sections.length > 0) {
    return (
      <PageFrame chrome={chrome}>
        <SectionRenderer
          sections={pageResult.page.sections}
          uri="/downloadable-resources/"
        />
      </PageFrame>
    );
  }

  // Use WordPress page title if available, otherwise fallback to local content
  const pageTitle =
    pageResult.status === "ok" && pageResult.page.title
      ? pageResult.page.title
      : downloadableResourcesContent.bannerTitle;

  const content = {
    ...downloadableResourcesContent,
    bannerTitle: pageTitle,
    sectionTitle: pageTitle,
  };

  return (
    <PageFrame chrome={chrome}>
      <DownloadableResourcesPageContent content={content} />
    </PageFrame>
  );
}
