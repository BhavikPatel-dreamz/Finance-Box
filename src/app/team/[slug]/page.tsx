import type { Metadata } from "next";
import { ArticleHero } from "@/components/content/article-hero";
import { BackLink } from "@/components/content/back-link";
import { ContentStatus, NOINDEX } from "@/components/content/content-status";
import { PageFrame } from "@/components/layout/page-frame";
import { TeamProfileCard } from "@/components/team/team-card";
import { mapTeamMember } from "@/components/team/team-member";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { getTeamMember } from "@/lib/wordpress/collections";
import { TEAM_BASE, teamPath } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";

/** Team member profile (WordPress `team`), using the Why FIAB team card. */
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/team/[slug]">): Promise<Metadata> {
  const result = await getTeamMember((await params).slug);
  if (result.status !== "ok") return { title: "Team member not found", robots: NOINDEX };

  const member = mapTeamMember(result.item);
  const description = [member.role, member.quote].filter(Boolean).join(" — ").slice(0, 160);
  const image = result.item.featuredImage?.node.sourceUrl;
  return {
    title: member.role ? `${member.name}, ${member.role}` : member.name,
    description: description || undefined,
    alternates: { canonical: teamPath(result.item.slug ?? "") },
    openGraph: { type: "profile", title: member.name, description: description || undefined, images: image ? [{ url: image }] : undefined },
  };
}

export default async function TeamMemberPage({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const [chrome, result] = await Promise.all([getSiteChrome(), getTeamMember(slug)]);
  if (result.status !== "ok") return <ContentStatus result={result} chrome={chrome} />;

  const member = mapTeamMember(result.item);

  return (
    <PageFrame chrome={chrome}>
      <ArticleHero chrome={chrome} eyebrow="Our Team" title={member.name} meta={member.role ? <p className="font-mono uppercase tracking-wide">{member.role}</p> : null} />
      <Section theme="dark" spacing="both">
        <Container>
          <TeamProfileCard member={member} />
        </Container>
      </Section>
      <div className="bg-white py-8">
        <Container>
          <BackLink href={TEAM_BASE}>Meet the whole team</BackLink>
        </Container>
      </div>
    </PageFrame>
  );
}
