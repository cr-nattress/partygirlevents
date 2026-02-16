import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, PageHero, Container } from "@/components/layout";
import { Button } from "@/components/ui";
import { MetricCounter } from "@/components/about/MetricCounter";

export const metadata: Metadata = {
  title: "About Stephanie | Party Girl Events",
  description:
    "Meet Stephanie Fleck, Colorado mountain wedding planner with 150+ weddings planned across Vail, Aspen, Breckenridge and beyond.",
};

const metrics = [
  { value: 150, suffix: "+", label: "Weddings Planned" },
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 30, suffix: "+", label: "Mountain Venues" },
  { value: 200, suffix: "+", label: "Happy Couples" },
];

const pressFeatures = [
  "Martha Stewart Weddings",
  "Brides",
  "The Knot",
  "Buzzfeed",
  "The Sun",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        variant="minimal"
        headline="Meet Stephanie"
        subheadline="The woman behind the party, the plans, and the perfectly executed mountain celebrations."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />

      {/* Stephanie's Story */}
      <Section bg="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Portrait */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <Image
              src="/images/about/stephanie-portrait.jpg"
              alt="Stephanie Fleck, founder of Party Girl Events, in the Colorado mountains"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>

          {/* Story text */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
              A Love Letter to the Mountains
            </h2>

            <div className="mt-6 space-y-4 text-muted">
              <p className="leading-relaxed">
                I fell in love with the Colorado mountains the way most people
                fall in love with a person: unexpectedly, completely, and with
                the quiet certainty that my life would never be the same. I
                moved to the Vail Valley over a decade ago, and from the moment
                I watched the sun set behind the Gore Range, I knew this was
                where I was meant to build something meaningful.
              </p>

              <p className="leading-relaxed">
                Party Girl Events was born from two passions: an obsession with
                creating beautiful, seamless experiences and a deep love for
                these mountains. Before launching my own company, I spent years
                working in hospitality and event management at some of
                Colorado&apos;s most prestigious venues. I learned what makes an
                event truly great, not just the flowers and the food, but the
                feeling. The moment a couple looks around and realizes that
                everything is exactly as they imagined, or even better.
              </p>

              <p className="leading-relaxed">
                What sets mountain weddings apart is their raw, honest beauty.
                You cannot compete with a sunset over the Elk Mountains or a
                fresh snowfall turning the world into a wonderland. My job is
                not to compete with nature. It is to frame it, honor it, and
                create an experience where every detail serves the story you
                are telling together. I bring the logistics, the vendor
                relationships, and the altitude expertise. You bring the love.
              </p>

              <p className="leading-relaxed">
                I take on a limited number of weddings each year because I
                believe every couple deserves my full attention. When you work
                with me, you are not getting a coordinator. You are getting a
                creative partner, a mountain expert, and someone who genuinely
                cares about your celebration as much as you do. This is not
                just my business. It is my life&apos;s work, and I am honored
                every time a couple trusts me with their most important day.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* By the Numbers */}
      <Section bg="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            By the Numbers
          </h2>
          <p className="mt-3 text-muted">
            A decade of mountain celebrations, and counting.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {metrics.map((metric) => (
            <MetricCounter
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
      </Section>

      {/* HRC Pride Partnership */}
      <Section bg="white">
        <div className="mx-auto max-w-3xl">
          <div className="border-l-4 border-accent py-2 pl-6 md:pl-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Proud Partner of the Human Rights Campaign
            </h2>

            <div className="mt-4 space-y-4 text-muted">
              <p className="leading-relaxed">
                Love is love, and every couple deserves a wedding planner who
                celebrates them exactly as they are. I am a proud supporter
                of the Human Rights Campaign and an unwavering ally to the
                LGBTQ+ community. My commitment to inclusive planning is not a
                marketing statement. It is a core value that shapes everything
                I do.
              </p>

              <p className="leading-relaxed">
                Whether you are two brides, two grooms, or a couple that
                defines love on your own terms, you will find a warm, judgment-free
                partnership here. I have had the privilege of planning weddings
                for couples of all identities, and I bring the same care,
                creativity, and attention to detail to every single celebration.
                Your love story is unique, and your wedding should reflect that
                beautifully and authentically.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Awards & Press */}
      <Section bg="cream">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            As Featured In
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {pressFeatures.map((name) => (
              <span
                key={name}
                className="text-lg font-medium tracking-wide text-foreground/30 md:text-xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-white md:text-4xl">
            Let&apos;s See If We&apos;re a Good Fit
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Every great wedding starts with a conversation. Let&apos;s talk
            about your vision and see how we can bring it to life in the
            Colorado mountains.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Book a Discovery Call</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
