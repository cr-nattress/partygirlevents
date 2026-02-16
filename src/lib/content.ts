// =============================================================================
// Content Fetching Utilities
// =============================================================================
// Abstraction layer for all content fetching. Currently pulls from local sample
// data. When a CMS is integrated (Payload, Sanity, etc.), only this file needs
// to change — all consuming pages and components use these functions.

import { draftMode } from "next/headers";
import {
  samplePages as pages,
  sampleCaseStudies as caseStudies,
  sampleBlogPosts as blogPosts,
  sampleVenues as venues,
  sampleFAQs as faqs,
  sampleTestimonials as testimonials,
  sampleServices as services,
} from "@/data/sample-content";
import type {
  Page,
  CaseStudy,
  BlogPost,
  Venue,
  FAQ,
  Testimonial,
  Service,
  ContentStatus,
  Season,
  VenueLocation,
  BlogCategory,
  FAQCategory,
  PaginatedResult,
} from "@/types/content";

// =============================================================================
// Preview Mode
// =============================================================================

async function isPreviewMode(): Promise<boolean> {
  try {
    const { isEnabled } = await draftMode();
    return isEnabled;
  } catch {
    return false;
  }
}

/**
 * Filter items by content status. Published items always pass.
 * Draft items only pass when preview mode is active.
 */
function filterByStatus<T extends { status: ContentStatus }>(
  items: T[],
  includedrafts: boolean
): T[] {
  if (includedrafts) {
    return items;
  }
  return items.filter((item) => item.status === "published");
}

// =============================================================================
// Pages
// =============================================================================

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const preview = await isPreviewMode();
  const filtered = filterByStatus(pages, preview);
  return filtered.find((page) => page.slug === slug) ?? null;
}

export async function getPages(): Promise<Page[]> {
  const preview = await isPreviewMode();
  return filterByStatus(pages, preview);
}

// =============================================================================
// Case Studies
// =============================================================================

export async function getCaseStudies(filters?: {
  season?: Season;
  style?: string;
  serviceLevel?: string;
  venue?: string;
  limit?: number;
}): Promise<CaseStudy[]> {
  const preview = await isPreviewMode();
  let results = filterByStatus(caseStudies, preview);

  if (filters) {
    if (filters.season) {
      results = results.filter((cs) => cs.season === filters.season);
    }
    if (filters.style) {
      results = results.filter((cs) => cs.style.includes(filters.style!));
    }
    if (filters.serviceLevel) {
      results = results.filter(
        (cs) => cs.serviceLevel === filters.serviceLevel
      );
    }
    if (filters.venue) {
      results = results.filter((cs) => cs.venue === filters.venue);
    }
    if (filters.limit) {
      results = results.slice(0, filters.limit);
    }
  }

  return results;
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const preview = await isPreviewMode();
  const filtered = filterByStatus(caseStudies, preview);
  return filtered.find((cs) => cs.slug === slug) ?? null;
}

// =============================================================================
// Blog Posts
// =============================================================================

export async function getBlogPosts(options?: {
  page?: number;
  pageSize?: number;
  category?: BlogCategory;
  tag?: string;
}): Promise<PaginatedResult<BlogPost>> {
  const preview = await isPreviewMode();
  let filtered = filterByStatus(blogPosts, preview);

  // Apply category filter
  if (options?.category) {
    filtered = filtered.filter((post) => post.category === options.category);
  }

  // Apply tag filter
  if (options?.tag) {
    filtered = filtered.filter((post) => post.tags.includes(options.tag!));
  }

  // Sort by publishedAt descending
  filtered.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Pagination
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 10;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const items = filtered.slice(startIndex, startIndex + pageSize);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const preview = await isPreviewMode();
  const filtered = filterByStatus(blogPosts, preview);
  return filtered.find((post) => post.slug === slug) ?? null;
}

// =============================================================================
// Venues
// =============================================================================

export async function getVenues(location?: VenueLocation): Promise<Venue[]> {
  const preview = await isPreviewMode();
  let filtered = filterByStatus(venues, preview);

  if (location) {
    filtered = filtered.filter((venue) => venue.location === location);
  }

  return filtered;
}

export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  const preview = await isPreviewMode();
  const filtered = filterByStatus(venues, preview);
  return filtered.find((venue) => venue.slug === slug) ?? null;
}

// =============================================================================
// FAQs
// =============================================================================

export async function getFAQs(category?: FAQCategory): Promise<FAQ[]> {
  const preview = await isPreviewMode();
  let filtered = filterByStatus(faqs, preview);

  if (category) {
    filtered = filtered.filter((faq) => faq.category === category);
  }

  // Sort by category then sortOrder
  filtered.sort((a, b) => {
    const categoryCompare = a.category.localeCompare(b.category);
    if (categoryCompare !== 0) return categoryCompare;
    return a.sortOrder - b.sortOrder;
  });

  return filtered;
}

// =============================================================================
// Testimonials
// =============================================================================

export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  const preview = await isPreviewMode();
  let filtered = filterByStatus(testimonials, preview);

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}

// =============================================================================
// Services
// =============================================================================

export async function getServices(): Promise<Service[]> {
  const preview = await isPreviewMode();
  const filtered = filterByStatus(services, preview);

  // Sort by sortOrder
  return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceBySlug(
  slug: string
): Promise<Service | null> {
  const preview = await isPreviewMode();
  const filtered = filterByStatus(services, preview);
  return filtered.find((service) => service.slug === slug) ?? null;
}
