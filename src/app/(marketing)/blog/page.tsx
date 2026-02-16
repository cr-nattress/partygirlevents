import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getAllPosts, categoryMeta } from "@/lib/blog";
import type { BlogCategory } from "@/types/content";
import { BlogIndex } from "./blog-index";

export const metadata: Metadata = createMetadata({
  title: "Wedding Planning Blog",
  description: "Expert tips, trends, and real wedding stories from a Colorado mountain wedding planner. Venue guides, planning advice, and inspiration for your dream mountain celebration.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = Object.entries(categoryMeta).map(([value, meta]) => ({
    value: value as BlogCategory,
    label: meta.label,
  }));

  return (
    <main>
      {/* Hero */}
      <section className="bg-background px-4 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">
            The Journal
          </h1>
          <p className="mt-4 text-lg text-muted">
            Insights, inspiration, and honest advice for planning your Colorado mountain wedding.
          </p>
        </div>
      </section>

      <BlogIndex posts={posts} categories={categories} />
    </main>
  );
}
