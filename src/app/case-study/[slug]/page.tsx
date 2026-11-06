import type { Metadata } from "next";
import Image from "next/image";
import { ArticleHero } from "@/components/content/article-hero";
import { BackLink } from "@/components/content/back-link";
import { ContentStatus, NOINDEX } from "@/components/content/content-status";
import { RichText } from "@/components/content/rich-text";
import { PageFrame } from "@/components/layout/page-frame";
import { GreenButton } from "@/components/ui/green-button";
import { caseStudyCardFromNode } from "@/lib/wordpress/cards";
import { getCaseStudy } from "@/lib/wordpress/collections";
import { CASE_STUDY_BASE, caseStudyPath } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { plainText } from "@/lib/wordpress/text";

/** Single case study (WordPress `case-study`). */
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/case-study/[slug]">): Promise<Metadata> {
  const result = await getCaseStudy((await params).slug);
  if (result.status !== "ok") return { title: "Case study not found", robots: NOINDEX };

  const study = result.item;
  const title = plainText(study.title);
  const description = (plainText(study.excerpt) || plainText(study.caseStudiesOptions?.tagLine)).slice(0, 160);
  const image = study.featuredImage?.node.sourceUrl || study.caseStudiesOptions?.frontFeatureImage?.node.sourceUrl;
  return {
    title: `${title} — Case Study`,
    description: description || undefined,
    alternates: { canonical: caseStudyPath(study.slug ?? "") },
    openGraph: { type: "article", title, description: description || undefined, images: image ? [{ url: image }] : undefined },
  };
}

const PARTS = [
  ["Challenge", "challenge"],
  ["Solution", "solution"],
  ["Outcome", "outcome"],
] as const;

export default async function CaseStudyPage({ params }: PageProps<"/case-study/[slug]">) {
  const { slug } = await params;
  const [chrome, result] = await Promise.all([getSiteChrome(), getCaseStudy(slug)]);
  if (result.status !== "ok") return <ContentStatus result={result} chrome={chrome} />;

  const study = result.item;
  const card = caseStudyCardFromNode(study);
  const parts = PARTS.filter(([, key]) => card[key]);

  return (
    <PageFrame chrome={chrome}>
      <ArticleHero chrome={chrome} eyebrow={card.label || "Case Study"} title={card.title} />

      <article className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[16px] bg-[#121826]">
            <Image src={card.image} alt={card.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 896px" />
          </div>

          {study.excerpt ? <RichText html={study.excerpt} className="text-[17px] sm:text-[18px] text-[#121826]" /> : null}

          {parts.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
              {parts.map(([label, key]) => (
                <div key={key} className="rounded-[16px] bg-[#121826] p-6 sm:p-7 text-white">
                  <h2 className="mb-2 text-[13px] sm:text-[14px] font-medium uppercase tracking-[1.5px] font-mono text-[#23C55E]">{label}</h2>
                  <p className="text-[14px] sm:text-[15px] font-light leading-[160%] text-white/80">{card[key]}</p>
                </div>
              ))}
            </div>
          ) : null}

          <RichText html={study.content} className="mt-10" />

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-black/[0.08] pt-8">
            <BackLink href={CASE_STUDY_BASE}>All case studies</BackLink>
            <GreenButton label="Talk to Us" href="/contact-us/" bgColor="#121826" textColor="#ffffff" />
          </div>
        </div>
      </article>
    </PageFrame>
  );
}
