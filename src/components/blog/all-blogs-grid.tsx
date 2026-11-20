import Link from "next/link";
import { BLOG_CARD_CLASS, BlogCard } from "@/components/blog/blog-card";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { blogCardFromPost } from "@/lib/wordpress/cards";
import { getPosts } from "@/lib/wordpress/collections";
import { blogArchivePath } from "@/lib/wordpress/paths";
import type { KnowledgeHubBlog } from "@/content/knowledge-hub";
import { FIGMA_FALLBACK_BLOGS, POSTS_PER_PAGE } from "@/components/blog/blog-archive";

export interface AllBlogsGridProps {
  page?: number;
}

export async function AllBlogsGrid({ page = 1 }: AllBlogsGridProps) {
  const result = await getPosts();

  const allPosts: KnowledgeHubBlog[] =
    result.status === "ok" && result.items.length > 0
      ? result.items.map((post) => blogCardFromPost(post))
      : FIGMA_FALLBACK_BLOGS;

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const cards = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <Section theme="light" spacing="both" className="case-studies-section">
      <Container>
        {cards.length === 0 ? (
          <p className="text-center text-[16px] font-light text-[#16181d]/70">
            No articles have been published yet.
          </p>
        ) : (
          <StaggerGroup staggerDelay={120} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((blog, idx) => (
              <StaggerItem key={blog.url || idx} index={idx} className={BLOG_CARD_CLASS}>
                <BlogCard blog={blog} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        {/* Pagination when multiple pages exist */}
        {totalPages > 1 ? (
          <nav aria-label="Blog pages" className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <Link
                key={number}
                href={blogArchivePath(number)}
                aria-current={number === currentPage ? "page" : undefined}
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[14px] font-medium transition-colors duration-300 ${
                  number === currentPage
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-brand-blue/15 text-brand-blue hover:border-brand-green hover:text-brand-green"
                }`}
              >
                {number}
              </Link>
            ))}
          </nav>
        ) : null}
      </Container>
    </Section>
  );
}
