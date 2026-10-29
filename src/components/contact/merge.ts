import { contactUsContent, type ContactUsContent } from "@/content/contact-us";
import type { RawSection } from "@/lib/wordpress/content";

function str(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function keep(value: unknown, fallback: string) {
  return str(value) ?? fallback;
}

// HTML tags (<p>, <span>, <br>) ko clean karne ke liye
function cleanHtml(value: unknown, fallback: string) {
  const text = str(value);
  if (!text) return fallback;
  return text.replace(/<[^>]*>?/gm, "").trim() || fallback;
}

function media(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, any>;
  const nested = item.node ?? item;
  return nested.sourceUrl ?? nested.url ?? null;
}

export function mergeContactUs(
  base: ContactUsContent,
  sections: RawSection[]
): ContactUsContent {
  const next: ContactUsContent = structuredClone(base);

  for (const section of sections) {
    const typeName = typeof section.__typename === "string" ? section.__typename : "";

    // 1. Contact Banner (Hero)
    if (/ContactBannerSectionLayout$/.test(typeName)) {
      const rawTitle = str(section.title) ?? "";
      // Title mein se <span> nikaal kar highlight alag karo
      const match = rawTitle.match(/(.*)<span>(.*)<\/span>/);
      
      if (match) {
        next.hero.title = match[1].trim();
        next.hero.highlight = match[2].trim();
      } else {
        next.hero.title = cleanHtml(section.title, next.hero.title);
      }
      
      next.hero.eyebrow = cleanHtml(section.subtitle, next.hero.eyebrow);
      next.hero.text = cleanHtml(section.description, next.hero.text);
    }

    // 2. Contact Form
    if (/ContactFormSectionLayout$/.test(typeName)) {
      next.formSection.title = cleanHtml(section.formTitle, next.formSection.title);
      next.formSection.subtitle = cleanHtml(section.formDescription, next.formSection.subtitle);
      next.formSection.image = media(section.contactImage) ?? next.formSection.image;
      next.formSection.email.value = keep(section.contactEmail, next.formSection.email.value);
    }

    // 3. Contact Connected (Social)
    if (/ContactConnectedSectionLayout$/.test(typeName)) {
      const rawSocialTitle = str(section.connectedTitle) ?? "";
      const match = rawSocialTitle.match(/(.*)<span>(.*)<\/span>/);
      
      if (match) {
        next.socialSection.title = match[1].trim();
        next.socialSection.highlight = match[2].trim();
      } else {
        next.socialSection.title = cleanHtml(section.connectedTitle, next.socialSection.title);
      }

      next.socialSection.subtitle = cleanHtml(section.connectedDescription, next.socialSection.subtitle);

      const linkedin = section.linkedinBox as Record<string, any> | undefined;
      if (linkedin) {
        next.socialSection.linkedin.title = cleanHtml(linkedin.title, next.socialSection.linkedin.title);
        next.socialSection.linkedin.text = cleanHtml(linkedin.description, next.socialSection.linkedin.text);
        next.socialSection.linkedin.image = media(linkedin.image) ?? next.socialSection.linkedin.image;
        
        const cta = linkedin.ctaButton as Record<string, any> | undefined;
        if (cta) {
          next.socialSection.linkedin.buttonLabel = keep(cta.title, next.socialSection.linkedin.buttonLabel);
          next.socialSection.linkedin.buttonUrl = keep(cta.url, next.socialSection.linkedin.buttonUrl);
        }
      }

      const newsletter = section.newsletterBox as Record<string, any> | undefined;
      if (newsletter) {
        next.socialSection.newsletter.title = cleanHtml(newsletter.title, next.socialSection.newsletter.title);
        next.socialSection.newsletter.text = cleanHtml(newsletter.description, next.socialSection.newsletter.text);
      }
    }
  }

  return next;
}