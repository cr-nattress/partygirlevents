import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  formatPostDate,
  extractHeadings,
  renderMarkdownToHtml,
  categoryMeta,
  blogAuthor,
} from "@/lib/blog";
import { TableOfContents, AuthorCard, ShareButtons, BlogPostCard } from "@/components/blog";
import { BlogPostContent } from "./blog-post-content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Need to handle async params in Next.js 15
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return createMetadata({ title: "Post Not Found", description: "" });
    return createMetadata({
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.ogImage ?? post.featuredImage.src,
    });
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const htmlContent = renderMarkdownToHtml(post.body);
  const related = getRelatedPosts(post, 3);
  const { prev, next } = getAdjacentPosts(post.slug);
  const catMeta = categoryMeta[post.category];

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.featuredImage.src,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: blogAuthor.name },
    publisher: {
      "@type": "Organization",
      name: "Party Girl Events",
      logo: { "@type": "ImageObject", url: "https://partygirl.events/logo.png" },
    },
    description: post.seoDescription ?? post.excerpt,
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://partygirl.events" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://partygirl.events/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[21/9] w-full md:aspect-[3/1]">
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-4 pt-6 md:px-8">
        <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent">Blog</Link>
          <span>/</span>
          <span className="text-foreground">{catMeta.label}</span>
        </nav>
      </div>

      {/* Post Header */}
      <header className="mx-auto max-w-4xl px-4 pt-6 md:px-8">
        <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700">
          {catMeta.label}
        </span>
        <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted">
          <span>By {blogAuthor.name}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <div className="mt-4">
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </header>

      {/* Content with TOC sidebar */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          {/* Main content */}
          <div>
            {/* Mobile TOC */}
            <div className="lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            <BlogPostContent html={htmlContent} slug={post.slug} />
          </div>

          {/* Desktop sidebar TOC */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>

      {/* Author */}
      <section className="mx-auto max-w-3xl px-4 pb-12 md:px-8">
        <AuthorCard />
      </section>

      {/* Prev/Next */}
      {(prev || next) && (
        <section className="border-t border-foreground/10 py-10">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 md:px-8">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group text-left">
                <span className="text-xs text-muted">← Previous</span>
                <p className="mt-1 text-sm font-medium text-foreground group-hover:text-accent">{prev.title}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group text-right">
                <span className="text-xs text-muted">Next →</span>
                <p className="mt-1 text-sm font-medium text-foreground group-hover:text-accent">{next.title}</p>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t border-foreground/10 bg-foreground/[0.02] py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <h2 className="text-center font-serif text-2xl font-semibold">You might also enjoy</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogPostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
