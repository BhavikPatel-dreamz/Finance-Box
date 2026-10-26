import type { ReactNode } from "react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageShell, StatusMessage } from "@/components/layout/page-shell";
import { HomePage } from "@/components/home/home-page";
import { ServicesPage } from "@/components/services/services-page";
import { WhyPage } from "@/components/why/why-page";
import { homeContent } from "@/content/home";
import { servicesContent } from "@/content/services";
import { whyContent } from "@/content/why-fiab";
import { getMenu, getPreviewPage, getPublicPage, getSettings } from "@/lib/wordpress/content";
import { uriFromSlug } from "@/lib/wordpress/uri";

export const instant = false;

async function loadPage(slug: string[] | undefined) {
  const uri = uriFromSlug(slug);
  if (!uri) return { uri: null, result: { status: "not-found" as const } };
  const { isEnabled } = await draftMode();
  const result = isEnabled ? await getPreviewPage(uri) : await getPublicPage(uri);
  return { uri, result, preview: isEnabled };
}

export async function generateMetadata({
  params,
}: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadPage(slug);

  if (loaded.uri === "/") {
    return {
      title: `${homeContent.hero.title} ${homeContent.hero.highlight}`,
      description: homeContent.hero.text,
    };
  }

  if (loaded.uri === "/services/") {
    return {
      title: `${servicesContent.hero.title} ${servicesContent.hero.highlight}`,
      description: servicesContent.hero.text,
    };
  }

  if (loaded.uri === "/why-fiab/") {
    return {
      title: `${whyContent.hero.title} ${whyContent.hero.highlight.replace(/\n/g, " ")}`,
      description: whyContent.hero.text,
    };
  }

  if (loaded.result.status !== "ok") {
    return {
      title: loaded.result.status === "not-found" ? "Not found" : "Financebox",
      robots: { index: false, follow: false },
    };
  }

  const { seo } = loaded.result.page;
  return {
    title: seo.title,
    description: seo.description || undefined,
    alternates: { canonical: seo.canonical },
    robots: loaded.preview ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: seo.openGraphTitle,
      description: seo.openGraphDescription || undefined,
      url: seo.canonical,
      images: seo.image ? [{ url: seo.image }] : undefined,
    },
  };
}

async function CmsChrome({ children }: { children: ReactNode }) {
  const [settings, menu, footerMenu] = await Promise.all([
    getSettings(),
    getMenu("PRIMARY"),
    getMenu("FOOTER"),
  ]);

  return (
    <>
      <SiteHeader settings={settings} menu={menu} />
      {children}
      <SiteFooter settings={settings} menu={footerMenu} />
    </>
  );
}

export default async function WordPressPage({ params }: PageProps<"/[[...slug]]">) {
  const { slug } = await params;
  const loaded = await loadPage(slug);
  if (loaded.uri === "/") {
    const sections = loaded.result.status === "ok" ? loaded.result.page.sections : [];
    return <HomePage sections={sections} />;
  }
  if (loaded.uri === "/services/") {
    const sections = loaded.result.status === "ok" ? loaded.result.page.sections : [];
    return <ServicesPage sections={sections} />;
  }
  if (loaded.uri === "/why-fiab/") {
    const sections = loaded.result.status === "ok" ? loaded.result.page.sections : [];
    return <WhyPage sections={sections} />;
  }
  if (!loaded.uri || loaded.result.status === "not-found") notFound();

  if (loaded.result.status === "unconfigured") {
    return (
      <CmsChrome>
        <StatusMessage
          title="Financebox"
          body="The WordPress GraphQL endpoint is not configured yet. Pages and sections will render here after it is connected."
        />
      </CmsChrome>
    );
  }

  if (loaded.result.status === "unavailable") {
    return (
      <CmsChrome>
        <StatusMessage
          title="Financebox"
          body="The content service is unavailable. Please try again shortly."
        />
      </CmsChrome>
    );
  }

  const settings = await getSettings();
  return (
    <CmsChrome>
      <PageShell page={loaded.result.page} settings={settings} />
    </CmsChrome>
  );
}
