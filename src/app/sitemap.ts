import type { MetadataRoute } from "next";
import { getCaseStudies, getBlogPosts, getVenues } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://partygirl.events";

  // Static pages
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/venues", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/vendors", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tools/style-quiz", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/budget-estimator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/vibe-translator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/timeline", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/process", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Dynamic pages
  const [caseStudies, blogResult, venues] = await Promise.all([
    getCaseStudies(),
    getBlogPosts(),
    getVenues(),
  ]);

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/portfolio/${cs.slug}`,
    lastModified: new Date(cs.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogResult.items.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const venueEntries: MetadataRoute.Sitemap = venues.map((venue) => ({
    url: `${siteUrl}/venues/${venue.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...caseStudyEntries,
    ...blogEntries,
    ...venueEntries,
  ];
}
