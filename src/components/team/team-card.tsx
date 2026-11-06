import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import type { WhyTeamMember } from "@/content/why-fiab";

/**
 * Team member profile card: portrait on one side, name, role, quote, bio and
 * focus areas on the other. Moved from the Why FIAB team section; also the
 * main block of the /team/<slug>/ profile page.
 */
export function TeamProfileCard({ member, linkToProfile = false }: { member: WhyTeamMember; linkToProfile?: boolean }) {
  const isImageRight = member.imagePosition === "right";
  return (
    <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col lg:flex-row lg:min-h-[715px]">

      <div
        className={`relative w-full lg:w-1/2 min-h-[380px] sm:min-h-[480px] lg:min-h-full overflow-hidden flex items-end justify-center ${isImageRight ? "lg:order-last" : ""
          }`}
      >
        <div
          className={`absolute inset-0 bg-cover bg-no-repeat bg-center ${isImageRight ? "" : "-scale-x-100"
            }`}
          style={{ backgroundImage: "url(/why/why-team-bg.svg)" }}
          aria-hidden="true"
        />

        <div className="relative z-1 w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-full flex items-end justify-center">
          <SafeImage
            src={member.image}
            fallbackSrc="/why/why-team-member-1.png"
            alt={member.name}
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </div>

      <div className={`relative z-1 flex flex-col justify-center p-6 sm:p-8 md:p-11 w-full lg:w-1/2 text-white bg-[rgba(255,255,255,0.04)] ${isImageRight ? "lg:order-first" : ""}`}>
        <div>
          <h3 className="text-[24px] sm:text-[28px] font-bold leading-[110%] tracking-[-0.8px]">
            {linkToProfile && member.url ? (
              <Link href={member.url} className="hover:text-[#23C55E] transition-colors duration-300">
                {member.name}
              </Link>
            ) : (
              member.name
            )}
          </h3>
          <p className="mt-2 text-[13px] sm:text-[14px] font-normal uppercase tracking-wide text-white/60 font-mono">
            {member.role}
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <p className="text-[19px] sm:text-[22px] lg:text-[24px] font-normal leading-[125%] text-white">
            {member.quote}
          </p>
          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] font-light leading-[150%] text-white/80">
            {member.bio}
          </p>
        </div>

        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          {member.focusTitle && member.focusText && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono">{member.focusTitle}</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.focusText}</p>
            </div>
          )}
          {member.partnerships && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono whitespace-pre-line">{member.partnerships.split('\n')[0]}</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.partnerships.split('\n')[1]}</p>
            </div>
          )}
          {member.work && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono">NOTABLE WORK:</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.work}</p>
            </div>
          )}
          {member.tools && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono">TOOLS & PLATFORMS:</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.tools}</p>
            </div>
          )}
          {member.industries && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono">INDUSTRIES:</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.industries}</p>
            </div>
          )}
          {linkToProfile && member.url ? (
            <Link
              href={member.url}
              className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium uppercase tracking-wider font-mono text-[#23C55E] hover:text-white transition-colors duration-300"
            >
              Full profile <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
