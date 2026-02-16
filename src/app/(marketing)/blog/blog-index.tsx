"use client";

import { useState, useMemo } from "react";
import type { BlogPost, BlogCategory } from "@/types/content";
import { BlogPostCard } from "@/components/blog";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const POSTS_PER_PAGE = 9;

export function BlogIndex({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: { value: BlogCategory; label: string }[];
}) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function handleCategoryChange(cat: BlogCategory | "all") {
    setActiveCategory(cat);
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    if (value.trim()) {
      trackEvent("blog_search_used", { query: value, results_count: filtered.length });
    }
  }

  return (
    <section className="px-4 pb-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Filters */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === "all"
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-muted hover:bg-foreground/10"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeCategory === cat.value
                    ? "bg-foreground text-background"
                    : "bg-foreground/5 text-muted hover:bg-foreground/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-full border border-foreground/10 bg-surface py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent sm:w-64"
            />
          </div>
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((post, i) => (
              <BlogPostCard key={post.slug} post={post} featured={i === 0 && page === 1 && activeCategory === "all"} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted">No posts found.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-4 text-sm font-medium text-accent hover:text-accent-600"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  p === page
                    ? "bg-foreground text-background"
                    : "text-muted hover:bg-foreground/5"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
