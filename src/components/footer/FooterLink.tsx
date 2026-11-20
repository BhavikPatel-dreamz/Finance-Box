"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type FooterLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

/**
 * Normalizes a URL path for active-state matching:
 * 1. Strips query strings (?...) and hashes (#...)
 * 2. Strips 2-letter locale prefixes (e.g., "/en/services" -> "/services")
 * 3. Removes trailing slashes, preserving root "/"
 */
export function normalizePath(path: string): string {
  if (!path) return "";
  let clean = path.split(/[?#]/)[0].trim();
  if (!clean) return "";

  // Strip 2-letter locale prefix (e.g. /en/team -> /team, /en -> /)
  clean = clean.replace(/^\/[a-zA-Z]{2}(?=\/|$)/, "") || "/";

  // Remove trailing slashes (except root "/")
  if (clean.length > 1 && clean.endsWith("/")) {
    clean = clean.replace(/\/+$/, "");
  }

  return clean;
}

/**
 * Determines whether an internal footer link is active based on current pathname:
 * - External, mailto, tel, hash-only, and LinkedIn links are never active
 * - Home ("/") requires an exact match
 * - Other internal routes are active if pathname equals href or starts with `${href}/`
 */
export function isActiveLink(
  currentPathname: string | null | undefined,
  href: string
): boolean {
  if (!currentPathname || !href) return false;

  // External links (http/https, mailto:, tel:), hash-only links, or LinkedIn are never active
  if (
    /^(https?:\/\/|mailto:|tel:)/i.test(href) ||
    href.startsWith("#") ||
    /linkedin/i.test(href) ||
    /linkedin/i.test(currentPathname)
  ) {
    return false;
  }

  const normalizedCurrent = normalizePath(currentPathname);
  const normalizedHref = normalizePath(href);

  if (!normalizedCurrent || !normalizedHref) return false;

  // Home ("/") is active only on an exact match
  if (normalizedHref === "/") {
    return normalizedCurrent === "/";
  }

  // Any other href is active if pathname equals href or starts with `${href}/`
  return (
    normalizedCurrent === normalizedHref ||
    normalizedCurrent.startsWith(`${normalizedHref}/`)
  );
}

/**
 * Client-side footer navigation link with active state detection,
 * accessible keyboard focus ring, and zero-layout-shift underline indicator.
 */
export function FooterLink({
  href,
  label,
  external,
  className = "",
  icon,
}: FooterLinkProps) {
  const pathname = usePathname();

  const isExternal =
    external ||
    /^(https?:\/\/|mailto:|tel:)/i.test(href) ||
    /linkedin/i.test(href);

  const active = !isExternal && isActiveLink(pathname, href);

  const baseClasses =
    `group relative inline-flex items-center gap-2 leading-snug break-words [overflow-wrap:anywhere] max-w-full text-[13px] sm:text-[14px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:rounded pb-1 ${className}`.trim();

  // Active: green accent color (text-brand-green), font-medium, and 2px green underline with underline-offset-4
  // Inactive: text-white, hover:text-brand-green, font-normal
  // Note: underline space is reserved with decoration-transparent when inactive to prevent layout shift.
  const stateClasses = active
    ? "text-brand-green font-medium underline decoration-brand-green decoration-2 underline-offset-4"
    : "text-white hover:text-brand-green font-normal underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-brand-green/60";

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${stateClasses}`}
      >
        {icon}
        <span className="break-words [overflow-wrap:anywhere]">{label}</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${baseClasses} ${stateClasses}`}
    >
      {icon}
      <span className="break-words [overflow-wrap:anywhere]">{label}</span>
    </Link>
  );
}

export default FooterLink;
