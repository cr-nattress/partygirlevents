"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function BlogPostContent({ html, slug }: { html: string; slug: string }) {
  useEffect(() => {
    trackEvent("blog_post_viewed", { post_slug: slug });
  }, [slug]);

  return (
    <article
      className="prose prose-lg max-w-none
        prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
        prose-h2:mt-12 prose-h2:text-2xl prose-h2:md:text-3xl
        prose-h3:mt-8 prose-h3:text-xl
        prose-p:leading-relaxed prose-p:text-foreground/85
        prose-strong:text-foreground
        prose-a:text-accent prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-accent-600
        prose-li:text-foreground/85
        prose-blockquote:border-l-accent prose-blockquote:font-serif prose-blockquote:italic
        prose-hr:border-foreground/10
        prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
