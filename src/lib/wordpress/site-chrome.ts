import "server-only";
import { cache } from "react";
import { homeContent, type HomeContent } from "@/content/home";
import { getMenu, getSettings, type NavigationItem } from "@/lib/wordpress/content";

export type SiteHeaderContent = HomeContent["header"];
export type SiteFooterContent = HomeContent["footer"];

export type SiteChrome = {
  header: SiteHeaderContent;
  footer: SiteFooterContent;
  siteName: string;
};

/** CSS class an editor adds to a PRIMARY menu item to make it the header's call-to-action button. */
export const HEADER_CTA_CLASS = "menu-cta";

function href(item: NavigationItem) {
  // Internal WordPress links arrive as absolute URLs on the CMS host; `path` is the site-relative form.
  return item.path?.startsWith("/") ? item.path : item.url || "#";
}

function childrenOf(items: NavigationItem[], parent: NavigationItem) {
  return items.filter((item) => item.parentId === parent.id);
}

/**
 * PRIMARY menu → header. Top-level items become nav links, their children the
 * dropdown entries. An item with the `menu-cta` class becomes the CTA button.
 */
function headerFromMenu(items: NavigationItem[], fallback: SiteHeaderContent): SiteHeaderContent {
  const topLevel = items.filter((item) => !item.parentId);
  const cta = topLevel.find((item) => item.cssClasses.includes(HEADER_CTA_CLASS));
  const links = topLevel
    .filter((item) => item !== cta)
    .map((item) => ({
      label: item.label,
      url: href(item),
      children: childrenOf(items, item).map((child) => ({ label: child.label, url: href(child) })),
    }));

  return {
    logo: fallback.logo,
    links: links.length > 0 ? links : fallback.links,
    cta: cta ? { label: cta.label, url: href(cta) } : fallback.cta,
  };
}

/** FOOTER menu → footer columns. Top-level items are column titles, their children the links. */
function footerFromMenu(items: NavigationItem[], fallback: SiteFooterContent): SiteFooterContent {
  const columns = items
    .filter((item) => !item.parentId)
    .map((column) => ({
      title: column.label,
      links: childrenOf(items, column).map((link) => ({ label: link.label, url: href(link) })),
    }))
    .filter((column) => column.links.length > 0);

  return { ...fallback, columns: columns.length > 0 ? columns : fallback.columns };
}

/**
 * Shared header and footer content, loaded once per request.
 *
 * Navigation comes from the WordPress PRIMARY and FOOTER menu locations when
 * menus are assigned there. Logo, footer text, email and legal line have no
 * WordPress source yet (no ACF options page exists), so they come from
 * `src/content/home.ts`.
 */
export const getSiteChrome = cache(async (): Promise<SiteChrome> => {
  const [settings, primary, footer] = await Promise.all([getSettings(), getMenu("PRIMARY"), getMenu("FOOTER")]);

  return {
    header: primary.length > 0 ? headerFromMenu(primary, homeContent.header) : homeContent.header,
    footer: footer.length > 0 ? footerFromMenu(footer, homeContent.footer) : homeContent.footer,
    siteName: settings.name,
  };
});
