import type { Metadata } from "next";
import { ArticleHero } from "@/components/content/article-hero";
import { ContentStatus } from "@/components/content/content-status";
import { PageFrame } from "@/components/layout/page-frame";
import { Reveal } from "@/components/motion/reveal";
import { TeamProfileCard } from "@/components/team/team-card";
import { mapTeamMember } from "@/components/team/team-member";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { getTeamMembers } from "@/lib/wordpress/collections";
import { TEAM_BASE } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";

/** Team list (WordPress `team`): every published member as a Why FIAB profile card, linking to their profile. */
export const instant = false;

export const metadata: Metadata = {
  title: "Our Team",
  description: "The people behind Finance in a Box.",
  alternates: { canonical: TEAM_BASE },
};

export default async function TeamPage() {
  const [chrome, result] = await Promise.all([getSiteChrome(), getTeamMembers()]);
  if (result.status !== "ok") return <ContentStatus result={result} chrome={chrome} />;

  // Alternate the portrait side, as on the Why FIAB team section.
  const members = result.items.map((node, index) => ({
    ...mapTeamMember(node),
    imagePosition: index % 2 === 0 ? ("right" as const) : ("left" as const),
  }));

  return (
    <PageFrame chrome={chrome}>
      <ArticleHero chrome={chrome} eyebrow="About Us" title="Our" highlight="Team" />
      <Section theme="dark" spacing="both" className="team-section">
        <Container>
          {members.length === 0 ? (
            <p className="text-center text-[16px] font-light text-white/70">No team members have been published yet.</p>
          ) : (
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
              {members.map((member, index) => (
                <Reveal key={member.url ?? member.name} preset="slide-up" delay={index * 100} distance={24} className="card-hover">
                  <TeamProfileCard member={member} linkToProfile />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </PageFrame>
  );
}
