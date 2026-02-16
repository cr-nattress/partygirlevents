import type { BlogPost, BlogCategory } from "@/types/content";
import { sampleBlogPosts } from "@/data/sample-content";

// Re-export for convenience
export type { BlogPost, BlogCategory };

// Author info (static for now - Stephanie is the only author)
export const blogAuthor = {
  name: "Stephanie",
  title: "Lead Planner & Founder",
  bio: "Stephanie is the founder of Party Girl Events and has been planning Colorado mountain weddings for over a decade. When she's not coordinating celebrations, you'll find her hiking with her dog or exploring new restaurants in the Vail Valley.",
  avatar: "/images/team/stephanie-avatar.jpg",
};

// Category metadata for display
export const categoryMeta: Record<BlogCategory, { label: string; description: string }> = {
  "colorado-guides": { label: "Colorado Guides", description: "Venue guides, seasonal tips, and everything you need to know about mountain weddings in Colorado." },
  "planning-tips": { label: "Planning Tips", description: "Expert advice on timelines, budgets, vendors, and the planning process." },
  "real-weddings": { label: "Real Weddings", description: "Stories and photos from real couples who celebrated in the Colorado mountains." },
  "inspiration-trends": { label: "Trends & Inspiration", description: "The latest wedding design trends, color palettes, and creative ideas." },
};

// Calculate reading time from content string
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Get all published posts sorted by date (newest first)
export function getAllPosts(options?: { category?: BlogCategory; featured?: boolean; limit?: number }): BlogPost[] {
  let posts = sampleBlogPosts.filter(p => p.status === "published");
  if (options?.category) posts = posts.filter(p => p.category === options.category);
  if (options?.featured) posts = posts.filter(p => /* no featured field yet */ true);
  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  if (options?.limit) posts = posts.slice(0, options.limit);
  return posts;
}

// Get single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  return sampleBlogPosts.find(p => p.slug === slug && p.status === "published") ?? null;
}

// Get posts by category
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts({ category });
}

// Get related posts (same category, excluding current, then by shared tags)
export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPost[] {
  const others = getAllPosts().filter(p => p.slug !== currentPost.slug);
  // Score by: same category (2 points) + each shared tag (1 point)
  const scored = others.map(p => {
    let score = 0;
    if (p.category === currentPost.category) score += 2;
    score += p.tags.filter(t => currentPost.tags.includes(t)).length;
    return { post: p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.post);
}

// Get adjacent posts for prev/next navigation
export function getAdjacentPosts(currentSlug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllPosts();
  const idx = posts.findIndex(p => p.slug === currentSlug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

// Format date for display
export function formatPostDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Extract headings from HTML/markdown content for TOC
export function extractHeadings(content: string): { id: string; text: string; level: 2 | 3 }[] {
  const headings: { id: string; text: string; level: 2 | 3 }[] = [];
  // Match ## and ### markdown headings
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }
  return headings;
}

// Convert markdown-ish body to simple HTML sections
// (This is a lightweight renderer for the blog body content)
export function renderMarkdownToHtml(content: string): string {
  return content
    // Headings
    .replace(/^### (.+)$/gm, (_, text) => {
      const id = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h3 id="${id}">${text.trim()}</h3>`;
    })
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h2 id="${id}">${text.trim()}</h2>`;
    })
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    // Ordered lists
    .replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>")
    // Horizontal rule
    .replace(/^---$/gm, "<hr />")
    // Paragraphs (lines that aren't already wrapped)
    .split("\n\n")
    .map(block => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");
}
