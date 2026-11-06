import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { ArticleHero } from "@/components/content/article-hero";
import { ContentStatus } from "@/components/content/content-status";
import { PageFrame } from "@/components/layout/page-frame";
import { Reveal } from "@/components/motion/reveal";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { caseStudyCardFromNode } from "@/lib/wordpress/cards";
import { getCaseStudies } from "@/lib/wordpress/collections";
import { CASE_STUDY_BASE } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";

/** Case study archive (WordPress `case-study`), using the Clients page cards. */
export const instant = false;

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How Finance in a Box rebuilt finance functions for growing companies.",
  alternates: { canonical: CASE_STUDY_BASE },
};

export default async function CaseStudiesPage() {
  const [chrome, result] = await Promise.all([getSiteChrome(), getCaseStudies()]);
  if (result.status !== "ok") return <ContentStatus result={result} chrome={chrome} />;
  const studies = result.items.map((node) => caseStudyCardFromNode(node));

  return (
    <PageFrame chrome={chrome}>
      <ArticleHero chrome={chrome} eyebrow="Clients" title="Case" highlight="Studies" />
      <Section theme="light" spacing="both" className="case-studies-section">
        <Container>
          {studies.length === 0 ? (
            <p className="text-center text-[16px] font-light text-[#16181d]/70">No case studies have been published yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {studies.map((study, index) => (
                <Reveal key={study.id} preset="slide-up" distance={24} delay={index * 80}>
                  <CaseStudyCard index={index} study={study} reverse={index % 2 !== 0} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </PageFrame>
  );
}
