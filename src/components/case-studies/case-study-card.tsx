import Image from "next/image";
import type { ClientCaseStudy } from "@/content/clients";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GreenButton } from "@/components/ui/green-button";

/**
 * Case study card: image beside tag line, title, challenge / solution /
 * outcome and a link to the full case study. Moved from the Clients page; used
 * by the Clients "Featured case studies" section and the /case-study archive.
 */
export function CaseStudyCard({ index, study, reverse }: { index: number; study: ClientCaseStudy; reverse: boolean }) {
  return (
    <div className={`relative isolate flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} overflow-hidden rounded-[16px] bg-[#121826] min-h-[500px] lg:p-12.5`}>
      {/* Green corner glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-[110px] ${reverse ? "-left-[110px]" : "-right-[110px]"} h-[220px] w-[220px] rounded-full bg-[#23C55E] blur-[90px] -z-10`}
      />

      <div className="relative z-1 rounded-t-[16px] lg:rounded-[10px] overflow-hidden w-full lg:w-1/2 min-h-[260px] sm:min-h-[320px] lg:min-h-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Padding only on the side facing the image, so the outer spacing matches the image side */}
      <div
        className={`relative z-1 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:py-0 lg:w-1/2 text-white ${reverse ? "lg:pl-0 lg:pr-8 xl:pr-12" : "lg:pr-0 lg:pl-8 xl:pl-12"
          }`}
      >
        <Eyebrow variant="green-no-dash" className="mb-3 sm:mb-4">
          Case study {index + 1}: {study.title}
        </Eyebrow>
        <h3 className="text-2xl sm:text-[26px] lg:text-[30px] font-semibold leading-[1.15] tracking-tight mb-6 sm:mb-8">
          {study.label}
        </h3>

        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
          <div>
            <h4 className="text-[13px] sm:text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1.5 sm:mb-2">CHALLENGE:</h4>
            <p className="text-[13.5px] sm:text-[14px] font-light leading-[150%] text-white/70">{study.challenge}</p>
          </div>
          <div>
            <h4 className="text-[13px] sm:text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1.5 sm:mb-2">SOLUTION:</h4>
            <p className="text-[13.5px] sm:text-[14px] font-light leading-[150%] text-white/70">{study.solution}</p>
          </div>
          <div>
            <h4 className="text-[13px] sm:text-[14px] font-medium tracking-[1.5px] uppercase font-mono mb-1.5 sm:mb-2">OUTCOME:</h4>
            <p className="text-[13.5px] sm:text-[14px] font-light leading-[150%] text-white/70">{study.outcome}</p>
          </div>
        </div>

        <div>
          <GreenButton
            label="Read a Full Case Study"
            href={study.ctaUrl}
            onDark={true}
            size="50"
            className="text-[16px] md:text-[16px] lg:text-[16px]"
          />
        </div>
      </div>
    </div>
  );
}
