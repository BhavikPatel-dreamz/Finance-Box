import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found/not-found-page";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  return <NotFoundPage chrome={await getSiteChrome()} />;
}
