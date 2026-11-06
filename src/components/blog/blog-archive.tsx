import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_CARD_CLASS, BlogCard } from "@/components/blog/blog-card";
import { ArticleHero } from "@/components/content/article-hero";
import { ContentStatus } from "@/components/content/content-status";
import { PageFrame } from "@/components/layout/page-frame";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { blogCardFromPost } from "@/lib/wordpress/cards";
import { getPosts } from "@/lib/wordpress/collections";
import { blogArchivePath } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";

export const POSTS_PER_PAGE = 9;

/** `/blog/` and `/blog/page/<n>/`: every published post, newest first, as Knowledge Hub cards. */
export async function BlogArchive({ page }: { page: number }) {
  const [chrome, result] = await Promise.all([getSiteChrome(), getPosts()]);
  if (result.status !== "ok") return <ContentStatus result={result} chrome={chrome} />;

  const totalPages = Math.max(1, Math.ceil(result.items.length / POSTS_PER_PAGE));
  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound();
  const cards = result.items.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE).map((post) => blogCardFromPost(post));

  return (
    <PageFrame chrome={chrome}>
      <ArticleHero
        chrome={chrome}
        eyebrow="Knowledge Hub"
        title="Our"
        highlight="Blog"
        meta={totalPages > 1 ? <p>Page {page} of {totalPages}</p> : null}
      />
      <Section theme="light" spacing="both">
        <Container>
          {cards.length === 0 ? (
            <p className="text-center text-[16px] font-light text-[#16181d]/70">No articles have been published yet.</p>
          ) : (
            <StaggerGroup staggerDelay={120} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((blog, idx) => (
                <StaggerItem key={blog.url} index={idx} className={BLOG_CARD_CLASS}>
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}

          {totalPages > 1 ? (
            <nav aria-label="Blog pages" className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <Link
                  key={number}
                  href={blogArchivePath(number)}
                  aria-current={number === page ? "page" : undefined}
                  className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[14px] font-medium transition-colors duration-300 ${
                    number === page
                      ? "border-[#121826] bg-[#121826] text-white"
                      : "border-[#121826]/15 text-[#121826] hover:border-[#23C55E] hover:text-[#23C55E]"
                  }`}
                >
                  {number}
                </Link>
              ))}
            </nav>
          ) : null}
        </Container>
      </Section>
    </PageFrame>
  );
}
