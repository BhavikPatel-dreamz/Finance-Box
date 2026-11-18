import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleHero } from "@/components/content/article-hero";
import { ContentStatus, NOINDEX } from "@/components/content/content-status";
import { PageFrame } from "@/components/layout/page-frame";
import Container from "@/components/ui/container";
import { GreenButton } from "@/components/ui/green-button";
import {
  getTeamMemberProfile,
  type TeamMemberProfile,
} from "@/content/team-members-data";
import { getTeamMember } from "@/lib/wordpress/collections";
import { teamPath } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { teamStaticParams } from "@/lib/wordpress/static-params";

export const instant = false;

export const generateStaticParams = teamStaticParams;

export async function generateMetadata({
  params,
}: PageProps<"/team-members/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const localProfile = getTeamMemberProfile(slug);

  if (localProfile) {
    const title = `${localProfile.name}${localProfile.role ? ` — ${localProfile.role}` : ""} · Finance in a Box`;
    const description = (localProfile.quote || localProfile.bio || "").slice(0, 160);
    return {
      title,
      description: description || undefined,
      alternates: { canonical: teamPath(localProfile.slug) },
      openGraph: {
        type: "profile",
        title,
        description: description || undefined,
        images: localProfile.image ? [{ url: localProfile.image }] : undefined,
      },
    };
  }

  const result = await getTeamMember(slug);
  if (result.status !== "ok") return { title: "Team member not found", robots: NOINDEX };

  const member = result.item;
  const description = [member.excerpt, member.content].filter(Boolean).join(" — ").slice(0, 160);
  const image = result.item.featuredImage?.node.sourceUrl;
  return {
    title: member.title || "Team Member",
    description: description || undefined,
    alternates: { canonical: teamPath(result.item.slug ?? "") },
    openGraph: {
      type: "profile",
      title: member.title || "Team Member",
      description: description || undefined,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function TeamMemberPage({
  params,
}: PageProps<"/team-members/[slug]">) {
  const { slug } = await params;
  const [chrome, result] = await Promise.all([getSiteChrome(), getTeamMember(slug)]);

  const localProfile = getTeamMemberProfile(slug);

  let member: TeamMemberProfile;

  if (localProfile) {
    member = localProfile;
  } else if (result.status === "ok") {
    const node = result.item;
    member = {
      slug: node.slug || slug,
      name: node.title || "",
      role: node.excerpt || "",
      image: node.featuredImage?.node?.sourceUrl || "/team/jitheesh.png",
      quote: "",
      bio: node.content || "",
    };
  } else {
    return <ContentStatus result={result} chrome={chrome} />;
  }

  return (
    <PageFrame chrome={chrome}>
      {/* 1. Hero Part matching exact user request */}
      <ArticleHero
        chrome={chrome}
        eyebrow="About Us"
        title="Our"
        highlight="Team"
      />

      {/* 2. Main Profile Content */}
      <section className="bg-[#07090F] text-white py-12 sm:py-16 lg:py-20">
        <Container className="max-w-[1240px]">
          {/* Back to Team Breadcrumb */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/team-members"
              className="group inline-flex items-center gap-2 font-mono text-[13px] sm:text-[14px] text-white/60 hover:text-brand-green transition-colors duration-200"
            >
              <span className="font-sans transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
              <span>Back to Team</span>
            </Link>
          </div>

          {/* Unified Profile Card: Simple, Clean & Cohesive with Theme */}
          <div className="relative overflow-hidden rounded-[20px] bg-[#0D1527] border border-white/10 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[400px_1fr]">
              {/* Left Column: Framed Portrait & Identity */}
              <div className="p-5 sm:p-8 lg:p-10 flex flex-col items-center justify-start border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.015]">
                <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px] aspect-[240/320] rounded-[16px] overflow-hidden bg-[#0A1224] ring-1 ring-white/10 shadow-xl select-none">
                  <div
                    className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-40 pointer-events-none"
                    style={{ backgroundImage: "url(/why/why-team-bg.svg)" }}
                    aria-hidden="true"
                  />
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover object-center image-hover-zoom relative z-1"
                    priority
                  />
                </div>

                <div className="mt-5 text-center w-full">
                  <h1 className="text-[22px] sm:text-[25px] font-bold text-white tracking-tight">
                    {member.name}
                  </h1>
                  {member.role && (
                    <p className="mt-1.5 font-mono text-[12px] sm:text-[13px] uppercase tracking-wider text-brand-green font-medium">
                      {member.role}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Statement, Bio & Dossier */}
              <div className="p-5 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between text-white">
                <div>
                  {/* Headline Statement */}
                  {member.quote && (
                    <div>
                      <h2 className="text-[20px] sm:text-[23px] lg:text-[25px] font-medium leading-[135%] text-white tracking-tight">
                        &ldquo;{member.quote}&rdquo;
                      </h2>
                    </div>
                  )}

                  {/* Bio Narrative */}
                  {member.bio && (
                    <div className="mt-4 sm:mt-5">
                      <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[170%] text-white/80">
                        {member.bio}
                      </p>
                    </div>
                  )}

                  {/* Structured Sections */}
                  <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 border-t border-white/10 pt-6">
                    {/* Focus & Expertise */}
                    {member.focusText && (
                      <div>
                        <h3 className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider text-white font-mono">
                          {(member.focusTitle || "FOCUS & EXPERTISE").replace(/:\s*$/, "")}:
                        </h3>
                        <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light leading-relaxed">
                          {member.focusText}
                        </p>
                      </div>
                    )}

                    {/* Notable Work */}
                    {member.work && (
                      <div>
                        <h3 className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider text-white font-mono">
                          NOTABLE WORK:
                        </h3>
                        <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light leading-relaxed">
                          {member.work}
                        </p>
                      </div>
                    )}

                    {/* Tools & Platforms */}
                    {member.tools && (
                      <div>
                        <h3 className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider text-white font-mono">
                          TOOLS & PLATFORMS:
                        </h3>
                        <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light leading-relaxed">
                          {member.tools}
                        </p>
                      </div>
                    )}

                    {/* Industries */}
                    {member.industries && (
                      <div>
                        <h3 className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider text-white font-mono">
                          INDUSTRIES:
                        </h3>
                        <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light leading-relaxed">
                          {member.industries}
                        </p>
                      </div>
                    )}

                    {/* Partnerships */}
                    {member.partnerships && (
                      <div>
                        <h3 className="text-[12px] sm:text-[13px] font-medium uppercase tracking-wider text-white font-mono">
                          PARTNERSHIPS:
                        </h3>
                        <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light leading-relaxed">
                          {member.partnerships}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Link at Bottom of Card */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium uppercase tracking-wider font-mono text-brand-green hover:text-white transition-colors duration-300"
                  >
                    Talk to Us <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Back & Consultation CTA */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 sm:pt-10">
            <Link
              href="/team-members"
              className="group inline-flex items-center gap-2 font-mono text-[13px] sm:text-[14px] text-white/70 hover:text-brand-green transition-colors duration-200"
            >
              <span className="font-sans transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
              <span>Meet the whole team</span>
            </Link>

            <GreenButton
              label="Schedule a Consultation"
              href="/contact-us"
              variant="green"
            />
          </div>
        </Container>
      </section>
    </PageFrame>
  );
}
