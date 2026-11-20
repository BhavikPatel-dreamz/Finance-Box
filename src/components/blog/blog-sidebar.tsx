import Link from "next/link";
import Image from "next/image";
import { BlogVideoCard } from "@/components/blog/blog-video-card";

export type BlogCategoryItem = {
  name: string;
  slug: string;
  count?: number | null;
};

export type BlogTagItem = {
  name: string;
  slug: string;
  count?: number | null;
};

export const FIGMA_SIDEBAR_CATEGORIES: BlogCategoryItem[] = [
  { name: "Audit & Assurancy", slug: "audit-assurancy" },
  { name: "Blog", slug: "blog" },
  { name: "Business Audit", slug: "business-audit" },
  { name: "Business Plans", slug: "business-plans" },
  { name: "Economics", slug: "economics" },
  { name: "Finance & Accounting", slug: "finance-accounting" },
  { name: "Financial Advise", slug: "financial-advise" },
  { name: "Funding Trends", slug: "funding-trends" },
  { name: "Innovation", slug: "innovation" },
  { name: "International", slug: "international" },
  { name: "International Tax", slug: "international-tax" },
  { name: "Manage Investment", slug: "manage-investment" },
  { name: "Tax Strategy", slug: "tax-strategy" },
  { name: "Uncategorized", slug: "uncategorized" },
];

export const FIGMA_SIDEBAR_TAGS: BlogTagItem[] = [
  { name: "Consulting", slug: "consulting" },
  { name: "Market", slug: "market" },
  { name: "Meetings", slug: "meetings" },
  { name: "Planning", slug: "planning" },
  { name: "Startups", slug: "startups" },
  { name: "Strategy", slug: "strategy" },
];

export function BlogSidebar({
  categories = FIGMA_SIDEBAR_CATEGORIES,
  tags = FIGMA_SIDEBAR_TAGS,
  videoUrl,
}: {
  categories?: BlogCategoryItem[];
  tags?: BlogTagItem[];
  videoUrl?: string;
}) {
  // Merge any dynamic categories/tags with Figma defaults so none are missing
  const mergedCategories = Array.from(
    new Map(
      [...FIGMA_SIDEBAR_CATEGORIES, ...categories].map((item) => [item.name.toLowerCase(), item])
    ).values()
  );

  const mergedTags = Array.from(
    new Map(
      [...FIGMA_SIDEBAR_TAGS, ...tags].map((item) => [item.name.toLowerCase(), item])
    ).values()
  );

  return (
    <aside aria-label="Blog sidebar" className="w-full space-y-7 sm:space-y-8">
      {/* 1. Search Box matching Figma */}
      <div className="relative">
        <form action="/blogs" method="GET">
          <input
            type="text"
            name="search"
            placeholder="Search here..."
            className="w-full h-[52px] sm:h-[60px] pl-6.25 pr-12 rounded-[8px] border border-[#191F2D26] bg-white text-[16px] text-brand-blue placeholder:text-brand-blue/70 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
          />
          <button
            type="submit"
            aria-label="Search articles"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-blue/60 hover:text-brand-green transition-colors p-1"
          >
            <Image src="/icons/search-black.svg" alt="search-black.svg" width={20} height={20} />
          </button>
        </form>
      </div>

      {/* 2. Categories Box matching Figma */}
      <div className="rounded-[13px] border border-[#191F2D26] p-6 sm:p-7.5 bg-white">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-brand-blue pb-3 mb-4.5">
          Categories
        </h3>
        <ul className="space-y-3.5">
          {mergedCategories.map((cat) => (
            <li key={cat.slug} className="flex items-center text-[14.5px] sm:text-[15px] text-brand-blue/80 hover:text-brand-green transition-colors group">
              {/* Green square bullet matching Figma */}
              <span className="w-2 h-2 rounded-[1.5px] bg-brand-green mr-3 shrink-0 group-hover:scale-125 transition-transform" />
              <Link href={`/blogs?category=${cat.slug}`} className="hover:underline">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Tags Clouds Box matching Figma */}
      <div className="rounded-[13px] p-6 sm:p-7 bg-brand-sand/40">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-brand-blue mb-4.5">
          Tags Clouds
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {mergedTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/blogs?tag=${tag.slug}`}
              className="px-3.5 py-2 rounded-[5px] bg-white text-[16px] font-normal text-brand-blue/80 hover:bg-brand-green hover:text-white transition-all duration-200"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Promo Video/Banner Card matching Figma (Interactive video modal on click) */}
      <BlogVideoCard
        title="Businessman collecting coins with profit chart analysis"
        videoUrl={videoUrl}
        imageSrc="/media/video-thumb.png"
      />
    </aside>
  );
}
