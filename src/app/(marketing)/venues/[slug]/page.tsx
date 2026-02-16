import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVenues, getVenueBySlug } from "@/lib/content";
import { Section, PageHero } from "@/components/layout";
import { Button } from "@/components/ui";

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((v) => ({ slug: v.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

const LOCATION_NAMES: Record<string, string> = {
  vail: "Vail",
  aspen: "Aspen",
  breckenridge: "Breckenridge",
  "beaver-creek": "Beaver Creek",
  keystone: "Keystone",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return {};
  const locationName = LOCATION_NAMES[venue.location] || venue.location;
  return {
    title: `${venue.name} | ${locationName} Wedding Venue | Party Girl Events`,
    description: `${venue.name} wedding venue guide — capacity, pricing, seasons, and insider tips from a Colorado mountain wedding planner. ${venue.description.slice(0, 120)}...`,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function PriceIndicator({ range }: { range: string }) {
  const filled = range.length;
  const max = 5;
  return (
    <span className="tracking-wider" aria-label={`Price level ${filled} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < filled ? "text-accent" : "text-foreground/20"}>
          $
        </span>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  const locationName = LOCATION_NAMES[venue.location] || venue.location;

  return (
    <>
      <PageHero
        variant="minimal"
        headline={venue.name}
        subheadline={`${locationName}, Colorado`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Venues", href: "/venues" },
          { label: venue.name, href: `/venues/${venue.slug}` },
        ]}
      />

      {/* Quick Facts */}
      <Section bg="white">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-muted">Location</p>
            <p className="font-semibold">{locationName}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Capacity</p>
            <p className="font-semibold">
              {venue.capacity.min}–{venue.capacity.max} guests
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Price Range</p>
            <p className="font-semibold">
              <PriceIndicator range={venue.priceRange} />
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Seasons</p>
            <p className="font-semibold">
              {venue.seasons.map(capitalize).join(", ")}
            </p>
          </div>
          {venue.website && (
            <div>
              <p className="text-sm text-muted">Website</p>
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent transition-colors hover:text-accent/80"
              >
                Visit venue site
              </a>
            </div>
          )}
        </div>

        {/* Style Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {venue.styleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* Description */}
      <Section bg="cream" narrow>
        <h2 className="font-serif text-3xl font-semibold">About This Venue</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {venue.description}
        </p>
      </Section>

      {/* Stephanie's Notes */}
      {venue.stephNotes && (
        <Section bg="white" narrow>
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                SF
              </div>
              <div>
                <p className="font-semibold">Stephanie&apos;s Notes</p>
                <p className="text-sm text-muted">From a planner who has worked here</p>
              </div>
            </div>
            <p className="leading-relaxed text-muted">{venue.stephNotes}</p>
          </div>
        </Section>
      )}

      {/* Navigation */}
      <Section bg="cream" narrow>
        <Link
          href="/venues"
          className="inline-flex items-center text-sm font-medium text-accent transition-colors duration-200 hover:text-accent/80"
        >
          <span className="mr-1" aria-hidden="true">
            &larr;
          </span>
          Back to All Venues
        </Link>
      </Section>

      {/* CTA */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Love {venue.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            I can walk you through every detail of planning your celebration here — from the ceremony setup to the best photo spots. Let&apos;s chat.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Start Planning</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
