import Link from "next/link";
import type { NavigationItem, SiteSettings } from "@/lib/wordpress/content";
import { Container } from "@/components/ui/container";

function itemHref(item: NavigationItem) {
  if (item.path.startsWith("/")) return item.path;
  return item.url;
}

export function SiteHeader({
  settings,
  menu,
}: {
  settings: SiteSettings;
  menu: NavigationItem[];
}) {
  const items = menu.filter((item) => !item.parentId);

  return (
    <header className="border-b border-border">
      <Container size="header" className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {settings.name}
        </Link>
        {items.length > 0 ? (
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-5">
              {items.map((item) => {
                const href = itemHref(item);
                const external = href.startsWith("http");
                return (
                  <li key={item.id}>
                    {external ? (
                      <a
                        href={href}
                        target={item.target || undefined}
                        rel={item.target === "_blank" ? "noreferrer" : undefined}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={href}>{item.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
