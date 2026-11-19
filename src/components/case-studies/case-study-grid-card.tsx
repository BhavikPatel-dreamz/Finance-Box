import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type CaseStudyGridItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  ctaUrl: string;
};

export function CaseStudyGridCard({ study }: { study: CaseStudyGridItem }) {
  return (
    <article className="group flex flex-col items-start h-full">
      {/* Image container: strictly 5px radius and 560px height on desktop */}
      <Link
        href={study.ctaUrl}
        className="relative block w-full h-[320px] sm:h-[420px] lg:h-[560px] rounded-[5px] overflow-hidden bg-[#e5e7eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60"
      >
        <Image
          src={study.image}
          alt={study.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      {/* Text block */}
      <div className="flex flex-col flex-1 w-full pt-5 sm:pt-6">
        <Link
          href={study.ctaUrl}
          title={study.title}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/60 rounded-[2px]"
        >
          <h2 className="text-[17px] sm:text-[18px] lg:text-[19px] font-semibold text-brand-blue tracking-tight leading-[1.3] mb-2 sm:mb-2.5 truncate transition-colors duration-300 group-hover:text-brand-green">
            {study.title}
          </h2>
        </Link>

        <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] text-brand-blue/70 font-light leading-[1.6] mb-6 sm:mb-7 line-clamp-2 min-h-[44px] sm:min-h-[50px]">
          {study.excerpt}
        </p>

        <div className="mt-auto">
          <Button
            variant="green"
            size="50"
            text="Read a Full Case Study"
            href={study.ctaUrl}
          />
        </div>
      </div>
    </article>
  );
}
