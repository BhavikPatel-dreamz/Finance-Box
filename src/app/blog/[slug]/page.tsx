import type { Metadata } from "next";
import Image from "next/image";
import { BLOG_CARD_CLASS, BlogCard } from "@/components/blog/blog-card";
import { ArticleHero } from "@/components/content/article-hero";
import { BackLink } from "@/components/content/back-link";
import { ContentStatus, NOINDEX } from "@/components/content/content-status";
import { RichText } from "@/components/content/rich-text";
import { PageFrame } from "@/components/layout/page-frame";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { blogCardFromPost, formatPostDate, primaryCategory, readingTime } from "@/lib/wordpress/cards";
import { getPost, getPosts } from "@/lib/wordpress/collections";
import { BLOG_BASE, blogPath } from "@/lib/wordpress/paths";
import { getSiteChrome } from "@/lib/wordpress/site-chrome";
import { plainText } from "@/lib/wordpress/text";

/** Single blog post (WordPress `post`). WordPress serves posts at `/<slug>/`; the site serves them here. */
export const instant = false;

function description(post: { excerpt?: string | null; content?: string | null }) {
  return (plainText(post.excerpt) || plainText(post.content)).slice(0, 160);
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const result = await getPost((await params).slug);
  if (result.status !== "ok") return { title: "Article not found", robots: NOINDEX };

  const post = result.item;
  const title = plainText(post.title);
  const image = post.featuredImage?.node.sourceUrl;
  return {
    title,
    description: description(post) || undefined,
    alternates: { canonical: blogPath(post.slug ?? "") },
    openGraph: {
      type: "article",
      title,
      description: description(post) || undefined,
      url: blogPath(post.slug ?? ""),
      publishedTime: post.date ?? undefined,
      authors: post.author?.node.name ? [post.author.node.name] : undefined,
      tags: post.tags?.nodes.map((tag) => tag.name ?? "").filter(Boolean),
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [chrome, result, all] = await Promise.all([getSiteChrome(), getPost(slug), getPosts()]);
  if (result.status !== "ok") return <ContentStatus result={result} chrome={chrome} />;

  const post = result.item;
  const title = plainText(post.title);
  const image = post.featuredImage?.node;
  const author = post.author?.node.name ? plainText(post.author.node.name) : "";
  const tags = (post.tags?.nodes ?? []).map((tag) => plainText(tag.name)).filter(Boolean);
  const body = post.content?.trim() ? post.content : post.excerpt;
  const more = all.status === "ok" ? all.items.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => blogCardFromPost(item)) : [];

  return (
    <PageFrame chrome={chrome}>
      <ArticleHero
        chrome={chrome}
        eyebrow={primaryCategory(post)}
        title={title}
        meta={
          <p className="font-mono">
            {[formatPostDate(post.date), readingTime(post.content), author && `By ${author}`].filter(Boolean).join("  |  ")}
          </p>
        }
      />

      <article className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          {image?.sourceUrl ? (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-[10px] bg-gray-100">
              <Image
                src={image.sourceUrl}
                alt={image.altText || title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          ) : null}

          <RichText html={body} />

          {tags.length > 0 ? (
            <ul aria-label="Tags" className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag} className="rounded-full bg-[#EDE9E6] px-3.5 py-1.5 text-[12px] font-medium text-[#121826]">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-12 border-t border-black/[0.08] pt-8">
            <BackLink href={BLOG_BASE}>All articles</BackLink>
          </div>
        </div>
      </article>

      {more.length > 0 ? (
        <Section theme="cream" spacing="both">
          <Container>
            <h2 className="mb-8 sm:mb-12 text-center text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-[-0.8px]">
              More articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {more.map((blog) => (
                <div key={blog.url} className={BLOG_CARD_CLASS}>
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </PageFrame>
  );
}
