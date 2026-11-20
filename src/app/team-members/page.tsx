import type { Metadata } from "next";
import { ContentStatus } from "@/components/content/content-status";
import { PageFrame } from "@/components/layout/page-frame";
import { SectionRenderer } from "@/components/page-builder/section-renderer";
import {
  TeamHero,
  TeamLeaders,
  TeamExperts,
  TeamBanner,
  TeamContact,
} from "@/components/team/team-sections";
import { mapTeamMember } from "@/components/team/team-member";
import { getTeamMembers } from "@/lib/wordpress/collections";
import { getPublicPage } from "@/lib/wordpress/content";
import { TEAM_BASE, slugFromUri } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { teamPageContent, type TeamExpert, type TeamPageContent } from "@/content/team";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const pageResult = await getPublicPage("/team-members/");
  if (pageResult.status === "ok" && pageResult.page.seo) {
    const seo = pageResult.page.seo;
    return {
      title: seo.title || "Team Members — Experts Behind Your Back-Office Transformation",
      description:
        seo.description ||
        "Meet the leadership and expert team behind Finance in a Box. Senior finance operators, controllers, and FP&A specialists.",
      alternates: { canonical: TEAM_BASE },
      openGraph: {
        title: seo.openGraphTitle || "Team Members — Finance in a Box",
        description:
          seo.openGraphDescription ||
          "Meet the leadership and expert team behind Finance in a Box.",
        type: "website",
        url: TEAM_BASE,
        images: seo.image ? [{ url: seo.image }] : undefined,
      },
    };
  }

  return {
    title: "Team Members — Experts Behind Your Back-Office Transformation",
    description:
      "Meet the leadership and expert team behind Finance in a Box. Senior finance operators, controllers, and FP&A specialists.",
    alternates: { canonical: TEAM_BASE },
    openGraph: {
      title: "Team Members — Finance in a Box",
      description: "Meet the leadership and expert team behind Finance in a Box.",
      type: "website",
      url: TEAM_BASE,
    },
  };
}

export default async function TeamPage() {
  const [chrome, pageResult, membersResult] = await Promise.all([
    getSiteChrome(),
    getPublicPage("/team-members/"),
    getTeamMembers(),
  ]);

  // When WordPress exposes the page with Page Builder sections, render them through SectionRenderer
  if (pageResult.status === "ok" && pageResult.page.sections.length > 0) {
    return (
      <PageFrame chrome={chrome}>
        <SectionRenderer sections={pageResult.page.sections} uri="/team-members/" />
      </PageFrame>
    );
  }

  if (membersResult.status !== "ok" && membersResult.status !== "unconfigured") {
    return <ContentStatus result={membersResult} chrome={chrome} />;
  }

  const wpMembers = membersResult.status === "ok" ? membersResult.items.map((node) => mapTeamMember(node)) : [];

  // Merge WordPress team data into leaders
  const leaders: TeamPageContent["leaders"] = {
    ...teamPageContent.leaders,
    people: teamPageContent.leaders.people.map((leader) => {
      const match = wpMembers.find(
        (m) =>
          (m.name && m.name.toLowerCase().includes(leader.name.toLowerCase())) ||
          (leader.slug && m.url?.includes(leader.slug)),
      );
      if (!match) return leader;
      return {
        ...leader,
        name: match.name || leader.name,
        role: match.role || leader.role,
        image: match.image && !match.image.includes("why-team-bg.svg") ? match.image : leader.image,
        slug: leader.slug || slugFromUri(match.url) || undefined,
        linkedin: match.linkedin || leader.linkedin || "https://www.linkedin.com/",
        twitter: match.twitter || leader.twitter || "https://x.com/",
      };
    }),
  };

  // Merge WordPress team data into experts
  const baseExperts: TeamExpert[] = teamPageContent.experts.people.map((expert) => {
    const match = wpMembers.find(
      (m) =>
        (m.name && m.name.toLowerCase().includes(expert.name.toLowerCase())) ||
        (expert.slug && m.url?.includes(expert.slug)),
    );
    if (!match) return expert;
    return {
      ...expert,
      name: match.name || expert.name,
      role: match.role || expert.role,
      image: match.image && !match.image.includes("why-team-bg.svg") ? match.image : expert.image,
      slug: expert.slug || slugFromUri(match.url) || undefined,
    };
  });

  const knownNames = new Set([
    ...leaders.people.map((p) => p.name.toLowerCase()),
    ...baseExperts.map((p) => p.name.toLowerCase()),
  ]);

  const extraExperts: TeamExpert[] = wpMembers
    .filter((m) => m.name && !knownNames.has(m.name.toLowerCase()))
    .map((m) => ({
      name: m.name,
      role: m.role || "Specialist",
      image: m.image && !m.image.includes("why-team-bg.svg") ? m.image : "/media/placeholder.svg",
      slug: slugFromUri(m.url) || undefined,
    }));

  const experts: TeamPageContent["experts"] = {
    ...teamPageContent.experts,
    people: [...baseExperts, ...extraExperts],
  };

  return (
    <PageFrame chrome={chrome}>
      <TeamHero hero={teamPageContent.hero} />
      <TeamLeaders leaders={leaders} />
      <TeamExperts experts={experts} />
      <TeamBanner banner={teamPageContent.banner} />
      <TeamContact contact={teamPageContent.contact} />
    </PageFrame>
  );
}
