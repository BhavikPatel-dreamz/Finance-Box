import { contactSections } from "@/components/sections/contact-form/section";
import { homeSections } from "@/components/sections/home/section";
import { servicesSections } from "@/components/sections/services/section";
import { whySections } from "@/components/sections/why/section";
import { clientsSections } from "@/components/sections/clients/section";
import { careersSections } from "@/components/sections/careers/section"; // 👈 NAYA

export type SectionRegistration = {
  key: string;
  matchesType: (typeName: string) => boolean;
  fields: readonly string[];
  selection?: string;
  render: (value: unknown) => { ok: true; node: React.ReactNode } | { ok: false };
};

export const sectionRegistry: readonly SectionRegistration[] = [
  ...homeSections,
  ...servicesSections,
  ...clientsSections,
  ...careersSections, // 👈 NAYA
  ...whySections,
  ...contactSections,
];