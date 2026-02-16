import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHero } from "@/components/layout";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import { getServices, getFAQs } from "@/lib/content";
import type { Service } from "@/types/content";

export const metadata: Metadata = {
  title: "Our Services & Investment | Party Girl Events",
  description:
    "Colorado mountain wedding planning packages: Full Service, Wedding Management, Elopements, and Events. Investment starts at $2,500.",
};

/* ------------------------------------------------------------------ */
/*  Key inclusions shown in the comparison table for each tier        */
/* ------------------------------------------------------------------ */
const tierHighlights: Record<string, string[]> = {
  "full-service": [
    "Unlimited planning consultations",
    "Complete vendor sourcing & management",
    "Custom design concept & mood boards",
    "Budget creation & ongoing tracking",
    "Venue selection guidance & site visits",
    "Up to 14 hours day-of coverage",
    "Rehearsal coordination",
    "Post-wedding wrap-up",
  ],
  "wedding-management": [
    "Up to 5 planning consultations",
    "Full vendor contract review",
    "Detailed master timeline",
    "Venue walkthrough & layout planning",
    "Rehearsal coordination",
    "Up to 12 hours day-of coverage",
    "Vendor payment schedule management",
    "Post-wedding wrap-up",
  ],
  elopements: [
    "Up to 3 planning consultations",
    "Location scouting & permit acquisition",
    "Officiant & photographer sourcing",
    "Custom ceremony timeline",
    "Vendor coordination (up to 5 vendors)",
    "Weather contingency planning",
    "Altitude preparation guide",
    "Up to 4 hours day-of coordination",
  ],
};

export default async function ServicesPage() {
  const services = await getServices();
  const pricingFaqs = await getFAQs("pricing");

  // Separate wedding tiers from special events
  const weddingTiers = services.filter((s) => s.slug !== "special-events");
  const specialEvents = services.find((s) => s.slug === "special-events");

  return (
    <>
      {/* ============================================================ */}
      {/* 1. Hero                                                      */}
      {/* ============================================================ */}
      <PageHero
        variant="minimal"
        headline="Your Investment in Unforgettable"
        subheadline="Planning your mountain wedding is one of the most personal journeys you will ever take. Here is how we can walk it together."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      {/* ============================================================ */}
      {/* 2. Investment Context                                        */}
      {/* ============================================================ */}
      <Section bg="white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted">
            Your wedding planner is typically 8&ndash;12% of your overall
            wedding budget &mdash; and for good reason. A planner who
            specializes in Colorado mountain weddings brings expertise that
            protects your investment, saves you time, and ensures every detail
            is handled with care. Below you will find three service tiers
            designed around how much support you need, from full creative
            partnership to expert day-of execution.
          </p>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 3. Comparison Table / Cards                                  */}
      {/* ============================================================ */}
      <Section bg="cream">
        <h2 className="mb-12 text-center font-serif text-3xl md:text-4xl">
          Wedding Planning Services
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {weddingTiers.map((service) => (
            <ServiceTierCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 4. Special Events                                            */}
      {/* ============================================================ */}
      {specialEvents && (
        <Section bg="white">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">
                {specialEvents.name}
              </h2>
              <p className="mt-2 text-lg font-medium text-accent">
                {specialEvents.tagline}
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                {specialEvents.description}
              </p>
              <p className="mt-4 text-sm text-muted">
                Starting at{" "}
                <span className="font-semibold text-foreground">
                  {specialEvents.startingPrice}
                </span>
              </p>
              <div className="mt-6">
                <Button variant="primary" size="lg" asChild>
                  <Link href={`/services/${specialEvents.slug}`}>
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                "Rehearsal Dinners",
                "Welcome Parties",
                "Farewell Brunches",
                "Corporate Retreats",
              ].map((event) => (
                <div
                  key={event}
                  className="rounded-lg border border-foreground/5 bg-surface p-6 text-center"
                >
                  <p className="font-medium">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ============================================================ */}
      {/* 5. Pricing FAQ                                               */}
      {/* ============================================================ */}
      <Section bg="cream">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-3xl md:text-4xl">
            Pricing Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {pricingFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* 6. CTA                                                       */}
      {/* ============================================================ */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-white md:text-4xl">
            Not sure which service is right for you?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Every wedding is different, and so is every couple. Let&apos;s have
            a conversation about your vision and find the perfect fit.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Tier Card                                                 */
/* ------------------------------------------------------------------ */

function ServiceTierCard({ service }: { service: Service }) {
  const isPopular = service.slug === "full-service";
  const highlights =
    tierHighlights[service.slug] ?? service.inclusions.slice(0, 8);

  return (
    <Card
      className={
        isPopular
          ? "relative border-accent ring-2 ring-accent ring-offset-2 ring-offset-background"
          : ""
      }
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="accent">Most Popular</Badge>
        </div>
      )}

      <CardHeader className="text-center">
        <h3 className="font-serif text-2xl">{service.name}</h3>
        <p className="mt-1 text-sm text-muted">{service.tagline}</p>
      </CardHeader>

      <CardContent>
        <ul className="mt-2 space-y-3">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
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
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-4">
        <p className="text-center">
          <span className="text-sm text-muted">Starting at</span>
          <br />
          <span className="text-2xl font-semibold">{service.startingPrice}</span>
        </p>
        <Button
          variant={isPopular ? "primary" : "outline"}
          size="lg"
          asChild
          className="w-full"
        >
          <Link href={`/services/${service.slug}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
