import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, PageHero } from "@/components/layout";
import { Button } from "@/components/ui";
import { getServices, getServiceBySlug } from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  Static params & metadata                                          */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle || `${service.name} | Party Girl Events`,
    description: service.seoDescription || service.tagline,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* ============================================================ */}
      {/* 1. Hero                                                      */}
      {/* ============================================================ */}
      <PageHero
        variant="split"
        headline={service.name}
        subheadline={service.tagline}
        ctaText={service.cta.text}
        ctaHref={service.cta.href}
        backgroundImage={service.featuredImage?.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      />

      {/* ============================================================ */}
      {/* 2. Description                                               */}
      {/* ============================================================ */}
      <Section bg="white" narrow>
        <div className="prose prose-lg mx-auto max-w-none">
          <p className="text-lg leading-relaxed text-muted">
            {service.description}
          </p>
          {service.typicalTimeline && (
            <p className="mt-6 text-sm text-muted">
              <span className="font-semibold text-foreground">
                Typical timeline:
              </span>{" "}
              {service.typicalTimeline}
            </p>
          )}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 3. What's Included                                           */}
      {/* ============================================================ */}
      <Section bg="cream">
        <h2 className="mb-8 font-serif text-3xl md:text-4xl">
          What&apos;s Included
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {service.inclusions.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <svg
                className="mt-1 h-5 w-5 shrink-0 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 4. Perfect For You If...                                     */}
      {/* ============================================================ */}
      <Section bg="white" narrow>
        <h2 className="mb-6 font-serif text-3xl md:text-4xl">
          Perfect For You If&hellip;
        </h2>
        <p className="text-lg leading-relaxed text-muted">
          {service.perfectFor}
        </p>
      </Section>

      {/* ============================================================ */}
      {/* 5. What's NOT Included                                       */}
      {/* ============================================================ */}
      {service.exclusions.length > 0 && (
        <Section bg="cream">
          <h2 className="mb-8 font-serif text-3xl md:text-4xl">
            What&apos;s Not Included
          </h2>
          <p className="mb-6 text-muted">
            Transparency builds trust. Here is what falls outside this service
            so there are never any surprises.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.exclusions.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="leading-relaxed text-muted">{item}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ============================================================ */}
      {/* 6. Investment                                                */}
      {/* ============================================================ */}
      <Section bg="white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl">
            Your Investment
          </h2>
          <p className="text-5xl font-semibold tracking-tight text-accent md:text-6xl">
            {service.startingPrice}
          </p>
          <p className="mt-1 text-sm text-muted">starting investment</p>
          {service.investmentContext && (
            <p className="mt-6 text-muted leading-relaxed">
              {service.investmentContext}
            </p>
          )}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 7. CTA                                                       */}
      {/* ============================================================ */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-white md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Every celebration begins with a conversation. Tell me about your
            vision and let&apos;s see how we can bring it to life.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href={service.cta.href}>{service.cta.text}</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
