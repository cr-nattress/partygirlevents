import { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/content";
import { Section } from "@/components/layout";
import { PageHero } from "@/components/layout";
import { Button } from "@/components/ui";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio | Real Mountain Weddings | Party Girl Events",
  description:
    "Explore real Colorado mountain weddings planned by Party Girl Events. Vail, Aspen, Breckenridge and beyond.",
};

export default async function PortfolioPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      {/* Hero */}
      <PageHero
        variant="minimal"
        headline="Real Mountain Weddings"
        subheadline="Every love story is unique. Here are a few we have had the privilege of helping tell."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
        ]}
      />

      {/* Filter + Grid */}
      <Section bg="white">
        <PortfolioGrid caseStudies={caseStudies} />
      </Section>

      {/* CTA */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Dreaming of your own mountain wedding?
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
