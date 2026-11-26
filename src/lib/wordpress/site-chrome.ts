import "server-only";
import { cache } from "react";
import { homeContent, type HomeContent } from "@/content/home";
import { getMenu, getSettings, getThemeOptions, type NavigationItem, type ThemeOptions } from "@/lib/wordpress/content";
import { siteHref } from "@/lib/wordpress/links";

export type SiteHeaderContent = HomeContent["header"];
export type SiteFooterContent = HomeContent["footer"];

function isExternalHref(url: string) {
  return /^https?:\/\//i.test(url) && !url.startsWith("/") ;
}

export type SiteChrome = {
  header: SiteHeaderContent;
  footer: SiteFooterContent;
  siteName: string;
};

/** CSS class an editor adds to a PRIMARY menu item to make it the header's call-to-action button. */
export const HEADER_CTA_CLASS = "menu-cta";

function href(item: NavigationItem) {
  // Internal WordPress links arrive as absolute URLs on the CMS host, and `path`
  // still includes the install's subdirectory (e.g. /wordpress/2026/finance/momentum/).
  // siteHref strips the CMS origin and that base path; external links pass through.
  if (item.url) return siteHref(item.url);
  return item.path || "#";
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
      target: item.target || (isExternalHref(href(item)) ? "_blank" : undefined),
      children: childrenOf(items, item).map((child) => ({ label: child.label, url: href(child), target: child.target || (isExternalHref(href(child)) ? "_blank" : undefined) })),
    }));

  return {
    logo: fallback.logo,
    links: links.length > 0 ? links : fallback.links,
    cta: cta ? { label: cta.label, url: href(cta), target: cta.target || (isExternalHref(href(cta)) ? "_blank" : undefined) } : fallback.cta,
  };
}

function linksFromItems(items: NavigationItem[]): { label: string; url: string; target?: string }[] {
  if (items.length === 0) return [];

  const hasChildren = items.some((item) => item.parentId !== null);
  if (!hasChildren) {
    return items.map((item) => ({
      label: item.label,
      url: href(item),
      target: item.target || (isExternalHref(href(item)) ? "_blank" : undefined),
    }));
  }

  const topLevel = items.filter((item) => !item.parentId);
  const result: { label: string; url: string; target?: string }[] = [];

  for (const parent of topLevel) {
    const children = childrenOf(items, parent);
    if (children.length > 0) {
      if (parent.url && parent.url !== "#" && !parent.url.endsWith("/#")) {
        result.push({
          label: parent.label,
          url: href(parent),
          target: parent.target || (isExternalHref(href(parent)) ? "_blank" : undefined),
        });
      }
      for (const child of children) {
        result.push({
          label: child.label,
          url: href(child),
          target: child.target || (isExternalHref(href(child)) ? "_blank" : undefined),
        });
      }
    } else {
      result.push({
        label: parent.label,
        url: href(parent),
        target: parent.target || (isExternalHref(href(parent)) ? "_blank" : undefined),
      });
    }
  }

  return result;
}

type FooterMenus = {
  company: NavigationItem[];
  services: NavigationItem[];
  explore: NavigationItem[];
  support: NavigationItem[];
};

/**
 * Maps WordPress footer menus to the 4 main footer columns:
 * - company-footer (COMPANY_FOOTER) → "Company" column
 * - services-footer (SERVICES_FOOTER) → "Services" column
 * - explore-footer (EXPLORE_FOOTER) → "Explore" column
 * - support-footer (SUPPORT_FOOTER) → "Support" column
 *
 * When WordPress menus are configured, the items (labels, URLs, targets)
 * come directly from WordPress. If a menu location is unassigned or empty,
 * it falls back to the default column in src/content/home.ts.
 */
function footerFromMenus(menus: FooterMenus, fallback: SiteFooterContent): SiteFooterContent {
  const findFallbackColumn = (match: string) =>
    fallback.columns.find((col) => col.title.toLowerCase().includes(match.toLowerCase()));

  const buildColumn = (title: string, items: NavigationItem[], fallbackMatch: string) => {
    const fallbackCol = findFallbackColumn(fallbackMatch);
    if (items.length > 0) {
      return {
        title,
        links: linksFromItems(items),
      };
    }
    return fallbackCol ?? { title, links: [] };
  };

  const companyCol = buildColumn("Company", menus.company, "company");
  const servicesCol = buildColumn("Services", menus.services, "services");
  const exploreCol = buildColumn("Explore", menus.explore, "explore");
  const supportCol = buildColumn("Support", menus.support, "support");

  // Keep any social / follow us column from fallback (e.g. LinkedIn)
  const socialCol = fallback.columns.find(
    (col) => col.title.toLowerCase().includes("follow") || col.title.toLowerCase().includes("social")
  );

  const columns = [companyCol, servicesCol, exploreCol, supportCol];
  if (socialCol) {
    columns.push(socialCol);
  }

  return { ...fallback, columns };
}

const LINKEDIN_PATTERN = /linkedin/i;

/**
 * Applies the "Theme Options" page: logo, description, email, copyright and the
 * LinkedIn URL. Each field falls back to the built-in footer when left empty.
 */
function footerWithThemeOptions(footer: SiteFooterContent, options: ThemeOptions): SiteFooterContent {
  const linkedin = options.footerLinkedin;
  const columns = linkedin
    ? footer.columns.map((column) => ({
        ...column,
        links: column.links.map((link) =>
          LINKEDIN_PATTERN.test(link.label) || LINKEDIN_PATTERN.test(link.url) ? { ...link, url: linkedin } : link,
        ),
      }))
    : footer.columns;

  return {
    ...footer,
    logo: options.footerLogo
      ? { url: options.footerLogo.url, alt: options.footerLogo.alt || footer.logo.alt }
      : footer.logo,
    text: options.footerDescription || footer.text,
    email: options.footerEmail || footer.email,
    legal: options.footerCopyright || footer.legal,
    columns,
  };
}

/**
 * Shared header and footer content, loaded once per request.
 *
 * Navigation comes from the WordPress PRIMARY header menu and the 4 footer menu locations:
 * - company-footer (COMPANY_FOOTER)
 * - services-footer (SERVICES_FOOTER)
 * - explore-footer (EXPLORE_FOOTER)
 * - support-footer (SUPPORT_FOOTER)
 *
 * Logo, footer text, email, copyright and the LinkedIn URL come from the ACF "Theme Options"
 * options page, field by field falling back to `src/content/home.ts`.
 */
export const getSiteChrome = cache(async (): Promise<SiteChrome> => {
  const [settings, themeOptions, primary, company, services, explore, support] = await Promise.all([
    getSettings(),
    getThemeOptions(),
    getMenu("PRIMARY"),
    getMenu("COMPANY_FOOTER"),
    getMenu("SERVICES_FOOTER"),
    getMenu("EXPLORE_FOOTER"),
    getMenu("SUPPORT_FOOTER"),
  ]);

  return {
    header: primary.length > 0 ? headerFromMenu(primary, homeContent.header) : homeContent.header,
    footer: footerWithThemeOptions(footerFromMenus({ company, services, explore, support }, homeContent.footer), themeOptions),
    siteName: settings.name,
  };
});
