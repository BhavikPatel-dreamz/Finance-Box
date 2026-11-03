import { defineSection } from "@/lib/page-builder/types";
import type { ClientsTestimonialsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ClientsTestimonials } from "@/components/clients/clients-sections";
import { mergeClients } from "@/components/clients/merge";
import { clientsContent } from "@/content/clients";

/** `ClientsTestimonialsSection` — Featured testimonial and review list. */
export const clientsTestimonialsSection = defineSection<ClientsTestimonialsSectionFragment>({
  layout: "ClientsTestimonialsSection",
  render: (data) => {
    const content = fromSection(mergeClients, clientsContent, data);
    return <ClientsTestimonials reviewsSection={content.reviewsSection} />;
  },
});
