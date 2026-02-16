import { Metadata } from "next";
import Link from "next/link";
import { getVenues } from "@/lib/content";
import { Section, PageHero } from "@/components/layout";
import { Button } from "@/components/ui";
import type { VenueLocation } from "@/types/content";

export const metadata: Metadata = {
  title: "Colorado Mountain Wedding Venues | Party Girl Events",
  description:
    "Discover the best wedding venues in Vail, Aspen, Breckenridge, Beaver Creek, and Keystone. Curated venue guides from a local Colorado mountain wedding planner.",
};

const LOCATION_INFO: Record<
  string,
  { name: string; tagline: string; description: string }
> = {
  vail: {
    name: "Vail",
    tagline: "Elegant mountain village charm",
    description:
      "From luxury boutique hotels in Vail Village to hidden lakefront retreats in the backcountry, Vail offers an incredible range of wedding venues. The valley combines world-class sophistication with genuine mountain warmth.",
  },
  aspen: {
    name: "Aspen",
    tagline: "Five-star luxury meets mountain soul",
    description:
      "Aspen is synonymous with refined mountain living. Historic hotels, award-winning restaurants, and a vibrant cultural scene make it the perfect setting for couples who want their wedding to feel like a destination event.",
  },
  breckenridge: {
    name: "Breckenridge",
    tagline: "Rustic charm at 10,000 feet",
    description:
      "Breckenridge blends Old West character with stunning alpine scenery. Whether you dream of a mountaintop ceremony accessible only by gondola or a cozy lodge reception overlooking the town, Breck delivers.",
  },
  "beaver-creek": {
    name: "Beaver Creek",
    tagline: "Secluded resort elegance",
    description:
      "Tucked away from the bustle, Beaver Creek offers a more intimate, resort-focused wedding experience. World-class properties like The Ritz-Carlton create destination celebrations where guests feel transported.",
  },
  keystone: {
    name: "Keystone",
    tagline: "Intimate elopements and alpine magic",
    description:
      "Keystone and the surrounding Summit County area are beloved for intimate ceremonies and elopements. Sapphire Point Overlook above Lake Dillon is one of the most breathtaking ceremony sites in all of Colorado.",
  },
};

function PriceIndicator({ range }: { range: string }) {
  const filled = range.length;
  const max = 5;
  return (
    <span className="text-sm tracking-wider text-muted" aria-label={`Price level ${filled} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < filled ? "text-accent" : "text-foreground/20"}>
          $
        </span>
      ))}
    </span>
  );
}

export default async function VenuesPage() {
  const allVenues = await getVenues();

  // Group venues by location
  const venuesByLocation = allVenues.reduce(
    (acc, venue) => {
      if (!acc[venue.location]) acc[venue.location] = [];
      acc[venue.location].push(venue);
      return acc;
    },
    {} as Record<string, typeof allVenues>,
  );

  // Order locations consistently
  const locationOrder: VenueLocation[] = [
    "vail",
    "aspen",
    "breckenridge",
    "beaver-creek",
    "keystone",
  ];

  return (
    <>
      <PageHero
        variant="minimal"
        headline="Colorado Mountain Venue Guides"
        subheadline="Curated recommendations from a planner who has worked at every one of these venues. Honest notes, insider tips, and everything you need to find your perfect setting."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Venues", href: "/venues" },
        ]}
      />

      {/* Location Sections */}
      {locationOrder.map((locationKey, index) => {
        const info = LOCATION_INFO[locationKey];
        const locationVenues = venuesByLocation[locationKey] || [];
        if (locationVenues.length === 0) return null;

        return (
          <Section key={locationKey} bg={index % 2 === 0 ? "white" : "cream"}>
            <div className="mb-8">
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">
                {info.name}
              </h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-accent">
                {info.tagline}
              </p>
              <p className="mt-4 max-w-2xl text-muted">{info.description}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {locationVenues.map((venue) => (
                <Link
                  key={venue.slug}
                  href={`/venues/${venue.slug}`}
                  className="group rounded-lg border border-foreground/10 bg-surface p-6 transition-all duration-200 hover:border-accent/30 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-semibold transition-colors group-hover:text-accent">
                        {venue.name}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
                        <span>{venue.capacity.min}–{venue.capacity.max} guests</span>
                        <span aria-hidden="true">&middot;</span>
                        <PriceIndicator range={venue.priceRange} />
                      </div>
                    </div>
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-foreground/30 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {venue.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {venue.styleTags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {venue.seasons.map((season) => (
                      <span
                        key={season}
                        className="text-xs capitalize text-muted"
                      >
                        {season}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        );
      })}

      {/* CTA */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Need help choosing the right venue?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            I have planned weddings at every venue on this list. Let&apos;s talk about your vision and find the perfect match.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
