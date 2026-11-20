import "server-only";
import { cache } from "react";
import { homeContent, type HomeContent } from "@/content/home";
import { getMenu, getSettings, type NavigationItem } from "@/lib/wordpress/content";
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

function cleanLabel(rawLabel: string): string {
  if (!rawLabel) return "";
  // Strip repeated consecutive characters (e.g. "aaaaaaaaaa")
  let label = rawLabel.replace(/(.)\1{3,}/g, "").trim();
  // Strip duplicated words/phrases
  label = label.replace(/\b(\w+)\s+\1\b/gi, "$1").trim();

  const lower = label.toLowerCase();
  if (lower.startsWith("why fiab")) return "Why FIAB";
  if (lower === "team members" || lower === "team") return "Team";
  if (lower === "contact us" || lower === "contact") return "Contact";
  if (lower.includes("vcs") || lower.includes("advisors")) return "For VCs & Advisors";
  if (lower === "foundation") return "Foundation";
  if (lower === "momentum") return "Momentum";
  if (lower === "foresight") return "Foresight";
  if (lower === "partner with us") return "Partner With Us";
  if (lower === "people operations") return "People Operations";
  if (lower === "clients") return "Clients";
  if (lower === "agentic ai") return "Agentic AI";
  if (lower === "knowledge hub") return "Knowledge Hub";
  if (lower === "privacy policy") return "Privacy Policy";
  if (lower === "terms & conditions" || lower === "terms and conditions") return "Terms & Conditions";
  if (lower === "linkedin") return "LinkedIn";
  return label;
}

const TARGET_ORDER: Record<string, string[]> = {
  company: ["Why FIAB", "Team", "Careers", "Contact"],
  services: ["Foundation", "Momentum", "Foresight", "Partner With Us", "People Operations"],
  explore: ["Clients", "Agentic AI", "Knowledge Hub", "For VCs & Advisors"],
  support: ["Privacy Policy", "Terms & Conditions"],
};

function cleanAndOrderColumnLinks(
  columnKey: keyof typeof TARGET_ORDER,
  wpItems: NavigationItem[],
  fallbackLinks: { label: string; url: string; target?: string }[]
): { label: string; url: string; target?: string }[] {
  const targetList = TARGET_ORDER[columnKey];
  const wpMapped = linksFromItems(wpItems);

  const linkMap = new Map<string, { label: string; url: string; target?: string }>();

  // 1. Populate from fallback defaults first
  for (const link of fallbackLinks) {
    const cleaned = cleanLabel(link.label);
    linkMap.set(cleaned.toLowerCase(), { ...link, label: cleaned });
  }

  // 2. Override with WordPress links if present
  for (const link of wpMapped) {
    const cleaned = cleanLabel(link.label);
    if (cleaned) {
      const key = cleaned.toLowerCase();
      linkMap.set(key, { ...link, label: cleaned });
    }
  }

  // 3. Emit links in the exact TARGET_ORDER
  const result: { label: string; url: string; target?: string }[] = [];
  const emittedKeys = new Set<string>();

  for (const targetLabel of targetList) {
    const key = targetLabel.toLowerCase();
    const link = linkMap.get(key);
    if (link) {
      result.push({ ...link, label: targetLabel });
      emittedKeys.add(key);
    }
  }

  // 4. Any extra links added in WordPress that aren't in targetList
  for (const [key, link] of linkMap.entries()) {
    if (!emittedKeys.has(key)) {
      result.push(link);
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
 * - company-footer (COMPANY_FOOTER) → "Company" column (Why FIAB, Team, Careers, Contact)
 * - services-footer (SERVICES_FOOTER) → "Services" column (Foundation, Momentum, Foresight, Partner With Us, People Operations)
 * - explore-footer (EXPLORE_FOOTER) → "Explore" column (Clients, Agentic AI, Knowledge Hub, For VCs & Advisors)
 * - support-footer (SUPPORT_FOOTER) → "Support" column (Privacy Policy, Terms & Conditions)
 * Preserves the social column ("Follow us") from fallback.
 */
function footerFromMenus(menus: FooterMenus, fallback: SiteFooterContent): SiteFooterContent {
  const findFallbackColumn = (match: string) =>
    fallback.columns.find((col) => col.title.toLowerCase().includes(match.toLowerCase()));

  const buildColumn = (
    title: string,
    key: keyof typeof TARGET_ORDER,
    items: NavigationItem[]
  ) => {
    const fallbackCol = findFallbackColumn(key);
    const links = cleanAndOrderColumnLinks(key, items, fallbackCol?.links ?? []);
    return { title, links };
  };

  const companyCol = buildColumn("Company", "company", menus.company);
  const servicesCol = buildColumn("Services", "services", menus.services);
  const exploreCol = buildColumn("Explore", "explore", menus.explore);
  const supportCol = buildColumn("Support", "support", menus.support);

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

/**
 * Shared header and footer content, loaded once per request.
 *
 * Navigation comes from the WordPress PRIMARY header menu and the 4 footer menu locations:
 * - company-footer (COMPANY_FOOTER)
 * - services-footer (SERVICES_FOOTER)
 * - explore-footer (EXPLORE_FOOTER)
 * - support-footer (SUPPORT_FOOTER)
 *
 * Logo, footer text, email and legal line have no WordPress source yet (no ACF options page exists),
 * so they come from `src/content/home.ts`.
 */
export const getSiteChrome = cache(async (): Promise<SiteChrome> => {
  const [settings, primary, company, services, explore, support] = await Promise.all([
    getSettings(),
    getMenu("PRIMARY"),
    getMenu("COMPANY_FOOTER"),
    getMenu("SERVICES_FOOTER"),
    getMenu("EXPLORE_FOOTER"),
    getMenu("SUPPORT_FOOTER"),
  ]);

  return {
    header: primary.length > 0 ? headerFromMenu(primary, homeContent.header) : homeContent.header,
    footer: footerFromMenus({ company, services, explore, support }, homeContent.footer),
    siteName: settings.name,
  };
});
