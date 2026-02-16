"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types/content";
import { formatPostDate, categoryMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function BlogPostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group overflow-hidden rounded-lg bg-surface shadow-sm transition-shadow hover:shadow-md",
        featured && "md:col-span-2 md:grid md:grid-cols-2"
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className={cn("relative overflow-hidden", featured ? "aspect-[4/3]" : "aspect-[16/10]")}>
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
        </div>
        <div className="p-5">
          <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-700">
            {categoryMeta[post.category].label}
          </span>
          <h2 className={cn(
            "mt-3 font-serif font-semibold text-foreground",
            featured ? "text-2xl" : "text-lg"
          )}>
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted">
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
