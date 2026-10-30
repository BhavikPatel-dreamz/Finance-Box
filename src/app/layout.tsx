import type { Metadata } from "next";
import { dmSans, dmMono } from "@/app/fonts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Financebox",
    template: "%s · Financebox",
  },
  description: "Financebox",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}>
      <body className={`${dmSans.className} flex min-h-full flex-col font-sans`}>{children}</body>
    </html>
  );
}
