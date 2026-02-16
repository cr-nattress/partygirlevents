import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHero } from "@/components/layout";
import { Button } from "@/components/ui";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";

export const metadata: Metadata = {
  title: "How It Works | Party Girl Events",
  description:
    "From first inquiry to 'I Do' -- discover the 7-stage wedding planning journey with Party Girl Events in the Colorado mountains.",
};

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        variant="minimal"
        headline="Your Planning Journey"
        subheadline="From first hello to happily ever after, here is exactly what working together looks like."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How It Works", href: "/process" },
        ]}
      />

      {/* Timeline */}
      <Section bg="white">
        <ProcessTimeline />
      </Section>

      {/* Bottom CTA */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-white md:text-4xl">
            Ready to Start? This Is Where It Begins.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Your mountain wedding journey starts with a simple hello. Fill out
            our inquiry form and let&apos;s start the conversation.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
