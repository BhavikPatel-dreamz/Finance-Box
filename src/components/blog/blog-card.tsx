import Image from "next/image";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import type { KnowledgeHubBlog } from "@/content/knowledge-hub";

/** Classes for the element that wraps a `BlogCard` (a grid item). Moved from the Knowledge Hub "Our Blog" section. */
export const BLOG_CARD_CLASS =
  "group card-hover relative rounded-[10px] overflow-hidden h-[480px] sm:h-[540px] md:h-[580px] lg:h-[661px] flex items-end bg-gray-100 shadow-sm";

/**
 * Blog post card: image with a dark panel for category, date, reading time,
 * title and author. The title link is stretched over the whole card.
 * Used by the Knowledge Hub "Our Blog" section and the /blog archive.
 */
export function BlogCard({ blog }: { blog: KnowledgeHubBlog }) {
  return (
    <>
      <SafeImage
        src={blog.image}
        fallbackSrc="/knowledge-hub/blog1.png"
        alt={blog.title}
        fill
        className="object-cover image-hover-zoom"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[24.97%] to-black/50 to-[100%]" />

      <div className="relative bg-[#121826] rounded-[14px] sm:rounded-[16px] p-4.5 sm:p-5 lg:p-6 m-3 sm:m-3.5 lg:m-4 w-[calc(100%-24px)] sm:w-[calc(100%-28px)] lg:w-[calc(100%-32px)] text-white flex flex-col justify-between min-h-[210px] sm:min-h-[225px] lg:min-h-[247px]">
        <div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3 text-[11px] sm:text-[11.5px] lg:text-[12px] font-normal text-white/60 mb-3 sm:mb-3.5 lg:mb-4">
            <span className="text-white font-medium uppercase font-mono tracking-wider">{blog.category}</span>
            <span className="opacity-40">|</span>
            <span className="font-mono">{blog.date}</span>
            <span className="opacity-40">|</span>
            <span className="font-mono">{blog.readTime}</span>
          </div>
          <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold leading-[1.25] lg:leading-[1.2] mb-4 sm:mb-5 lg:mb-6">
            {blog.url ? (
              <Link
                href={blog.url}
                className="after:absolute after:inset-0 after:content-[''] hover:text-[#23C55E] focus-visible:outline-none focus-visible:text-[#23C55E] transition-colors duration-300"
              >
                {blog.title}
              </Link>
            ) : (
              blog.title
            )}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full overflow-hidden border border-white/10 shrink-0">
            <SafeImage src={blog.author.avatar} fallbackSrc="/knowledge-hub/guruprasad.png" alt={blog.author.name} fill className="object-cover" sizes="38px" />
          </div>
          <span className="text-[13px] sm:text-[14px] font-medium text-white/80">{blog.author.name}</span>
        </div>
      </div>
    </>
  );
}
