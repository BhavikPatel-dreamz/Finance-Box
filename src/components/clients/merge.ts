import { clientsContent, type ClientsContent } from "@/content/clients";
import type { RawSection } from "@/lib/wordpress/content";

export function mergeClients(
  base: ClientsContent,
  sections: RawSection[]
): ClientsContent {
  const next: ClientsContent = structuredClone(base);
  return next;
}