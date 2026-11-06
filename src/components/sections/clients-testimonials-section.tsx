import { defineSection } from "@/lib/page-builder/types";
import type { ClientsTestimonialsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ClientsTestimonials } from "@/components/clients/clients-sections";
import { media, text } from "@/lib/wordpress/fields";

/** `ClientsTestimonialsSection` — Featured testimonial and review list. */
export const clientsTestimonialsSection = defineSection<ClientsTestimonialsSectionFragment>({
  layout: "ClientsTestimonialsSection",
  render: (data) => {
    return (
      <ClientsTestimonials
        reviewsSection={{
          title: text(data.title),
          mainReview: {
            quote: text(data.featuredQuote),
            author: text(data.featuredName),
            role: text(data.featuredDesignation),
            image: media(data.featuredImage)?.url ?? "",
          },
          reviews: (data.testimonials ?? []).map((item, index) => ({
            id: String(index + 1),
            text: text(item?.content),
            author: text(item?.authorInfo),
            role: "",
            avatar: media(item?.authorImage)?.url ?? "",
          })),
        }}
      />
    );
  },
});