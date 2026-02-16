import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { Section, PageHero } from "@/components/layout";
import { Button } from "@/components/ui";

// ---------------------------------------------------------------------------
// Static Params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((cs) => ({ slug: cs.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title:
      cs.seoTitle ||
      `${cs.coupleName} | ${cs.venueName} Wedding | Party Girl Events`,
    description: cs.seoDescription || cs.excerpt,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatServiceLevel(level: string): string {
  switch (level) {
    case "full-service":
      return "Full Service";
    case "wedding-management":
      return "Wedding Management";
    case "elopement":
      return "Elopement";
    case "event":
      return "Special Event";
    default:
      return level;
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);

  if (!cs) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <PageHero
        variant="split"
        headline={cs.coupleName}
        subheadline={cs.excerpt}
        backgroundImage={cs.featuredImage.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: cs.coupleName, href: `/portfolio/${cs.slug}` },
        ]}
      />

      {/* Quick Facts Bar */}
      <Section bg="white">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-muted">Date</p>
            <p className="font-semibold">{formatDate(cs.date)}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Venue</p>
            <p className="font-semibold">{cs.venueName}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Guests</p>
            <p className="font-semibold">{cs.guestCount}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Season</p>
            <p className="font-semibold">{capitalize(cs.season)}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Style</p>
            <p className="font-semibold">{cs.style.join(", ")}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Service</p>
            <p className="font-semibold">
              {formatServiceLevel(cs.serviceLevel)}
            </p>
          </div>
        </div>
      </Section>

      {/* Narrative Sections */}
      {cs.narrativeSections.map((section, index) => (
        <Section key={index} bg={index % 2 === 0 ? "white" : "cream"} narrow>
          <h2 className="font-serif text-3xl font-semibold">{section.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {section.body}
          </p>
        </Section>
      ))}

      {/* Testimonial */}
      {cs.testimonial && (
        <Section bg="cream" narrow>
          <blockquote className="text-center">
            <p className="font-serif text-2xl italic leading-relaxed">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm font-medium text-muted">
              &mdash; {cs.coupleName}
            </footer>
          </blockquote>
        </Section>
      )}

      {/* Gallery */}
      {cs.gallery.length > 0 && (
        <Section bg="white">
          <h2 className="mb-8 font-serif text-3xl font-semibold">Gallery</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cs.gallery.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Vendor Credits */}
      {cs.vendorCredits.length > 0 && (
        <Section bg="cream" narrow>
          <h2 className="mb-8 font-serif text-3xl font-semibold">
            Vendor Team
          </h2>
          <ul className="space-y-3">
            {cs.vendorCredits.map((vendor, index) => (
              <li key={index} className="flex items-baseline gap-2">
                <span className="font-semibold">{vendor.name}</span>
                <span className="text-sm text-muted">{vendor.category}</span>
                {vendor.url && (
                  <a
                    href={vendor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent transition-colors duration-200 hover:text-accent/80"
                  >
                    Visit
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Navigation */}
      <Section bg="white" narrow>
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm font-medium text-accent transition-colors duration-200 hover:text-accent/80"
        >
          <span className="mr-1" aria-hidden="true">
            &larr;
          </span>
          Back to Portfolio
        </Link>
      </Section>

      {/* CTA */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Dreaming of your own Colorado mountain wedding?
          </h2>
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
