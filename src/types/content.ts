// =============================================================================
// Enums & Shared Types
// =============================================================================

export type ContentStatus = "draft" | "published";

export type Season = "spring" | "summer" | "fall" | "winter";

export type VenueLocation =
  | "vail"
  | "beaver-creek"
  | "aspen"
  | "breckenridge"
  | "keystone"
  | "other";

export type BlogCategory =
  | "colorado-guides"
  | "planning-tips"
  | "real-weddings"
  | "inspiration-trends";

export type FAQCategory =
  | "pricing"
  | "process"
  | "services"
  | "colorado"
  | "logistics";

// =============================================================================
// Content Image
// =============================================================================

export interface ContentImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

// =============================================================================
// Pagination
// =============================================================================

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// =============================================================================
// Page
// =============================================================================

export interface Page {
  slug: string;
  title: string;
  body: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  publishedAt?: string;
  status: ContentStatus;
}

// =============================================================================
// Case Study
// =============================================================================

export interface CaseStudy {
  slug: string;
  coupleName: string;
  venue: string;
  venueName: string;
  date: string;
  guestCount: number;
  season: Season;
  style: string[];
  serviceLevel: "full-service" | "wedding-management" | "elopement" | "event";
  excerpt: string;
  featuredImage: ContentImage;
  narrativeSections: { title: string; body: string }[];
  gallery: ContentImage[];
  vendorCredits: { name: string; category: string; url?: string }[];
  testimonial?: { quote: string; couplePhoto?: string };
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  status: ContentStatus;
  publishedAt: string;
}

// =============================================================================
// Blog Post
// =============================================================================

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: BlogCategory;
  tags: string[];
  featuredImage: ContentImage;
  author: string;
  readingTime: number;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  status: ContentStatus;
  publishedAt: string;
}

// =============================================================================
// Venue
// =============================================================================

export interface Venue {
  slug: string;
  name: string;
  location: VenueLocation;
  description: string;
  photos: ContentImage[];
  capacity: { min: number; max: number };
  priceRange: string;
  seasons: Season[];
  styleTags: string[];
  website?: string;
  stephNotes?: string;
  status: ContentStatus;
}

// =============================================================================
// FAQ
// =============================================================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  sortOrder: number;
  status: ContentStatus;
}

// =============================================================================
// Testimonial
// =============================================================================

export interface Testimonial {
  id: string;
  coupleName: string;
  quote: string;
  photo?: string;
  venue?: string;
  date?: string;
  videoUrl?: string;
  rating?: number;
  status: ContentStatus;
}

// =============================================================================
// Service
// =============================================================================

export interface Service {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  startingPrice: string;
  investmentContext?: string;
  perfectFor: string;
  typicalTimeline?: string;
  featuredImage?: ContentImage;
  cta: { text: string; href: string };
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  sortOrder: number;
  status: ContentStatus;
}
