import Link from "next/link";
import type { NavigationItem, SiteSettings } from "@/lib/wordpress/content";

function itemHref(item: NavigationItem) {
  if (item.path.startsWith("/")) return item.path;
  return item.url;
}

export function SiteFooter({
  settings,
  menu,
}: {
  settings: SiteSettings;
  menu: NavigationItem[];
}) {
  const items = menu.filter((item) => !item.parentId);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {settings.name}</p>
        {items.length > 0 ? (
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-4">
              {items.map((item) => {
                const href = itemHref(item);
                const external = href.startsWith("http");
                return (
                  <li key={item.id}>
                    {external ? (
                      <a href={href} rel={item.target === "_blank" ? "noreferrer" : undefined}>
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
      </div>
    </footer>
  );
}
