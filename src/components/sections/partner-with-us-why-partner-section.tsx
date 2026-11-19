import { defineSection } from "@/lib/page-builder/types";
import type { PartnerWithUsWhyPartnerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { text } from "@/lib/wordpress/fields";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/button";
import Container from "../ui/container";

interface WhyPartnerReason {
  title: string;
  description: string;
  imageUrl: string;
}

const DEFAULT_REASONS: WhyPartnerReason[] = [
  {
    title: "Fast, predictable go-lives",
    description: "Battle-tested playbooks and clear RACI keep timelines tight",
    imageUrl: "https://web3.dddemo.net/wordpress/2026/finance/wp-content/uploads/2026/11/Fast-predictable-go-lives.png",
  },
  {
    title: "Automation-first delivery",
    description: "RPA/AI across P2P, O2C, R2R, People Ops, Payroll & Recruiting for fewer manual touches and cleaner data",
    imageUrl: "https://web3.dddemo.net/wordpress/2026/finance/wp-content/uploads/2026/11/Automation-first-delivery.png",
  },
  {
    title: "Compliance built-in",
    description: "Audit-ready approvals, SoD, logs, and reconciliations by design",
    imageUrl: "https://web3.dddemo.net/wordpress/2026/finance/wp-content/uploads/2026/11/Compliance-built-in.png",
  },
  {
    title: "Managed services",
    description: "Ongoing admin, enhancements, reporting, and quarterly optimization so your team stays focused on growth",
    imageUrl: "https://web3.dddemo.net/wordpress/2026/finance/wp-content/uploads/2026/11/Managed-services.png",
  },
];

function cleanHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export function PartnerWithUsWhyPartner({
  title = "Why Partner with <b>Finance in a box?</b>",
  reasons = DEFAULT_REASONS,
  ctaButton = { title: "Book a Partner Consultation", url: "/contact-us/" },
}: {
  title?: string;
  reasons?: WhyPartnerReason[];
  ctaButton?: { title?: string; url?: string };
}) {
  const cleanTitle = title.trim();
  let before = cleanTitle;
  let highlight = "Finance in a box?";
  let after = "";

  if (cleanTitle.includes("<b>")) {
    const parts = cleanTitle.split(/<\/?b>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.includes("<span>")) {
    const parts = cleanTitle.split(/<\/?span>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.includes("<i>")) {
    const parts = cleanTitle.split(/<\/?i>/);
    before = parts[0] ?? "";
    highlight = parts[1] ?? "";
    after = parts[2] ?? "";
  } else if (cleanTitle.toLowerCase().includes("finance in a box?")) {
    const idx = cleanTitle.toLowerCase().indexOf("finance in a box?");
    before = cleanTitle.slice(0, idx);
    highlight = cleanTitle.slice(idx, idx + "finance in a box?".length);
    after = cleanTitle.slice(idx + "finance in a box?".length);
  }

  return (
    <section className="bg-brand-blue py-14 sm:py-16 lg:py-20 why-section">
      <Container>
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] tracking-[-0.8px] capitalize">
            {before}
            {highlight && (
              <span className="italic font-bold">
                {highlight}
              </span>
            )}
            {after}
          </h2>
        </div>

        <div className="relative flex flex-col gap-8 lg:gap-10">
          {reasons.map((reason, idx) => {
            const isImageLeft = idx % 2 === 0;

            const imageBlock = (
              <div
                key={`img-${idx}`}
                className="relative w-full h-[260px] sm:h-[300px] md:h-full min-h-[260px] md:min-h-[320px] overflow-hidden"
              >
                <Image
                  src={reason.imageUrl}
                  alt={reason.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover image-hover-zoom"
                />
              </div>
            );

            const contentBlock = (
              <div
                key={`content-${idx}`}
                className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center items-center text-center h-full min-h-[220px] md:min-h-[320px]"
              >
                <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-white mb-3 sm:mb-4 font-display">
                  {reason.title}
                </h3>
                <p className="text-sm sm:text-base text-[#9CA3AF] max-w-[440px] leading-relaxed">
                  {cleanHtml(reason.description)}
                </p>
              </div>
            );

            return (
              <div
                key={idx}
                style={{ zIndex: idx + 1 }}
                className="group card-hover sticky top-[64px] sm:top-[80px] lg:top-[96px] xl:top-[108px] bg-[#131926] border border-white/8 rounded-[20px] overflow-hidden grid grid-cols-1 md:grid-cols-2 items-stretch transition-all duration-300 hover:border-white/16 hover:shadow-[0px_2px_34px_0px_#FFFFFF1A]"
              >
                {isImageLeft ? (
                  <>
                    {imageBlock}
                    {contentBlock}
                  </>
                ) : (
                  <>
                    {contentBlock}
                    {imageBlock}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {ctaButton?.title && (
          <div className="mt-12 text-center">
            <Link
              href={ctaButton.url || "/contact-us/"}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-[#0B101B] font-medium text-base hover:bg-gray-100 transition-colors shadow-lg group"
            >
              <span>{ctaButton.title}</span>
              <ArrowIcon className="text-[#0B101B]" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export const partnerWithUsWhyPartnerSection = defineSection<PartnerWithUsWhyPartnerSectionFragment>({
  layout: "PartnerWithUsWhyPartnerSection",
  render: (data) => {
    const rawTitle = text(data.title) || "Why Partner with <b>Finance in a box?</b>";
    const reasons = (data.reasons && data.reasons.length > 0)
      ? data.reasons.map((r, idx) => ({
          title: text(r?.title) || DEFAULT_REASONS[idx % DEFAULT_REASONS.length].title,
          description: text(r?.description) || DEFAULT_REASONS[idx % DEFAULT_REASONS.length].description,
          imageUrl: r?.image?.node?.sourceUrl || DEFAULT_REASONS[idx % DEFAULT_REASONS.length].imageUrl,
        }))
      : DEFAULT_REASONS;

    const ctaButton = {
      title: data.ctaButton?.title || "Book a Partner Consultation",
      url: data.ctaButton?.url || "/contact-us/",
    };

    return (
      <PartnerWithUsWhyPartner
        title={rawTitle}
        reasons={reasons}
        ctaButton={ctaButton}
      />
    );
  },
});
