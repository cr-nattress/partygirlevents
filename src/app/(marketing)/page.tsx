import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServices, getCaseStudies, getTestimonials } from "@/lib/content";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardImage } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/home/AnimatedSection";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";

export const metadata: Metadata = {
  title: "Colorado Mountain Wedding Planner | Party Girl Events",
  description:
    "Intimate, elevated, and stress-free Colorado mountain wedding planning. From Vail to Aspen, Party Girl Events makes your mountain wedding vision real.",
};

const pressLogos = [
  "Martha Stewart",
  "Brides",
  "The Knot",
  "Buzzfeed",
  "The Sun",
];

const howItWorksSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "A complimentary 30-minute conversation to learn about your vision, your story, and how we can help bring it to life.",
  },
  {
    number: "02",
    title: "Custom Proposal",
    description:
      "We craft a tailored proposal with services, timeline, and investment that matches your unique celebration.",
  },
  {
    number: "03",
    title: "Planning Together",
    description:
      "From venue selection to vendor coordination, we handle every detail while keeping you in the loop at every step.",
  },
  {
    number: "04",
    title: "Your Perfect Day",
    description:
      "Relax and be fully present. We execute every detail flawlessly so you can soak in every moment.",
  },
];

const coloradoVenues = [
  {
    name: "Vail",
    tagline: "World-class luxury in the heart of the Rockies",
    image: "/images/venues/vail-placeholder.jpg",
  },
  {
    name: "Beaver Creek",
    tagline: "Intimate elegance at 8,100 feet",
    image: "/images/venues/beaver-creek-placeholder.jpg",
  },
  {
    name: "Aspen",
    tagline: "Iconic mountain glamour and golden aspens",
    image: "/images/venues/aspen-placeholder.jpg",
  },
  {
    name: "Breckenridge",
    tagline: "Historic charm meets alpine adventure",
    image: "/images/venues/breckenridge-placeholder.jpg",
  },
  {
    name: "Keystone",
    tagline: "Lakeside ceremonies with mountain panoramas",
    image: "/images/venues/keystone-placeholder.jpg",
  },
];

export default async function HomePage() {
  const [services, caseStudies, testimonials] = await Promise.all([
    getServices(),
    getCaseStudies({ limit: 3 }),
    getTestimonials(5),
  ]);

  const topServices = services.slice(0, 3);

  const testimonialData = testimonials.map((t) => ({
    coupleName: t.coupleName,
    quote: t.quote,
    venue: t.venue,
  }));

  return (
    <>
      {/* ================================================================= */}
      {/* Section 1: Hero */}
      {/* ================================================================= */}
      <PageHero
        variant="fullscreen"
        headline="Colorado Mountain Weddings — Reimagined"
        subheadline="Intimate, elevated, and stress-free. From Vail to Aspen, we make your mountain wedding vision real."
        ctaText="Start Planning"
        ctaHref="/contact"
        backgroundImage="/images/hero-summer.jpg"
      />

      {/* ================================================================= */}
      {/* Section 2: Press Logo Bar */}
      {/* ================================================================= */}
      <Section bg="white" className="py-10 md:py-12 lg:py-14">
        <div className="text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-16">
            {pressLogos.map((name) => (
              <span
                key={name}
                className="text-sm font-medium uppercase tracking-wider text-muted/40"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/* Section 3: Services Preview */}
      {/* ================================================================= */}
      <Section bg="white" id="services">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              What We Do
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Every love story is different. Our services are designed to meet
              you exactly where you are in the planning journey.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-3">
          {topServices.map((service, index) => (
            <AnimatedSection key={service.slug} delay={index * 0.15}>
              <Card className="flex h-full flex-col">
                {service.featuredImage && (
                  <CardImage>
                    <div className="relative aspect-[4/3] w-full bg-muted/10">
                      <Image
                        src={service.featuredImage.src}
                        alt={service.featuredImage.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                  </CardImage>
                )}
                <CardContent className="flex flex-1 flex-col">
                  <h3 className="font-serif text-xl font-semibold">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted">
                    {service.tagline}
                  </p>
                  <p className="mt-4 text-sm font-medium text-accent">
                    Starting at {service.startingPrice}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/services/${service.slug}`}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ================================================================= */}
      {/* Section 4: Featured Weddings */}
      {/* ================================================================= */}
      <Section bg="cream" id="portfolio">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Real Mountain Weddings
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              Every couple brings their own story to the mountains. Here are a
              few we have had the honor of helping tell.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid gap-6 md:grid-cols-2 md:grid-rows-2">
            {caseStudies.map((study, index) => (
              <Link
                key={study.slug}
                href={`/portfolio/${study.slug}`}
                className={`group relative block overflow-hidden rounded-lg ${
                  index === 0 ? "md:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full bg-muted/10 ${
                    index === 0
                      ? "aspect-[3/4] md:aspect-auto md:h-full"
                      : "aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={study.featuredImage.src}
                    alt={study.featuredImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={
                      index === 0
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 50vw, 100vw"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {study.style.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="default"
                        className="bg-white/20 text-white backdrop-blur-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white md:text-2xl">
                    {study.coupleName}
                  </h3>
                  <p className="mt-1 text-sm text-white/80">
                    {study.venueName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      {/* ================================================================= */}
      {/* Section 5: How It Works */}
      {/* ================================================================= */}
      <Section bg="white" id="process">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              From first conversation to final sparkler, here is what the
              journey looks like.
            </p>
          </div>
        </AnimatedSection>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <AnimatedSection key={step.number} delay={index * 0.1}>
              <div className="text-center md:text-left">
                <span className="font-serif text-4xl font-bold text-accent/20">
                  {step.number}
                </span>
                <h3 className="mt-2 font-serif text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-12 text-center">
            <Button variant="outline" size="md" asChild>
              <Link href="/process">See Our Full Process</Link>
            </Button>
          </div>
        </AnimatedSection>
      </Section>

      {/* ================================================================= */}
      {/* Section 6: Testimonial Carousel */}
      {/* ================================================================= */}
      <Section bg="cream" id="testimonials">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Kind Words
            </h2>
          </div>
        </AnimatedSection>
        <TestimonialCarousel testimonials={testimonialData} />
      </Section>

      {/* ================================================================= */}
      {/* Section 7: Colorado Venues */}
      {/* ================================================================= */}
      <Section bg="white" id="venues">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Colorado Mountain Venues
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              From world-class resorts to hidden alpine meadows, we know the
              best places to say &ldquo;I do&rdquo; in the Rockies.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible">
            {coloradoVenues.map((venue) => (
              <Link
                key={venue.name}
                href="/contact"
                className="group flex-shrink-0 basis-[260px] md:basis-auto"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted/10">
                  <Image
                    src={venue.image}
                    alt={`${venue.name} wedding venue`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 20vw, 260px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-serif text-lg font-semibold text-white">
                      {venue.name}
                    </h3>
                    <p className="mt-1 text-xs text-white/70">
                      {venue.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      {/* ================================================================= */}
      {/* Section 8: Instagram Placeholder */}
      {/* ================================================================= */}
      <Section bg="cream" id="instagram">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Follow the Journey
            </h2>
            <p className="mt-2 text-sm text-muted">@partygirlevents</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-lg bg-foreground/5"
              >
                <div className="flex h-full items-center justify-center">
                  <svg
                    className="h-6 w-6 text-foreground/10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Instagram feed coming soon
          </p>
        </AnimatedSection>
      </Section>

      {/* ================================================================= */}
      {/* Section 9: Final CTA */}
      {/* ================================================================= */}
      <Section bg="dark" id="cta">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Ready to Start Planning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Every great celebration starts with a conversation. Tell us about
              your vision and let&apos;s create something extraordinary together.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Start Planning</Link>
              </Button>
              <Link
                href="/portfolio"
                className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}
