import { contactSections } from "@/components/sections/contact-form/section";
import { homeSections } from "@/components/sections/home/section";
// import { servicesSections } from "@/components/sections/services/section";
import { whySections } from "@/components/sections/why/section";

export type SectionRegistration = {
  key: string;
  matchesType: (typeName: string) => boolean;
  fields: readonly string[];
  selection?: string;
  render: (value: unknown) => { ok: true; node: React.ReactNode } | { ok: false };
};

export const sectionRegistry: readonly SectionRegistration[] = [
  ...homeSections,
  // ...servicesSections,
  ...whySections,
  ...contactSections,
];