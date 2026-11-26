import type { Metadata, Viewport } from "next";
import { dmSans, dmMono } from "@/app/fonts";
import "./globals.css";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { SharedHeader } from "@/components/layout/shared-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Financebox",
    template: "%s · Financebox",
  },
  description: "Financebox",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

/**
 * maximum-scale=1 stops mobile browsers from zooming in when a form field is
 * focused (iOS Safari does this for text under 16px).
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const chrome = await getSiteChrome();

  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}>
      <body className={`${dmSans.className} flex min-h-full flex-col font-sans`}>
        <SharedHeader header={chrome.header} />
        {children}
      </body>
    </html>
  );
}
