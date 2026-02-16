import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHero } from "@/components/layout";
import { Button } from "@/components/ui";
import { getFAQs } from "@/lib/content";
import { FAQPage } from "@/components/faq/FAQPage";

export const metadata: Metadata = {
  title: "Wedding Planning FAQ | Party Girl Events",
  description:
    "Answers to your questions about Colorado mountain wedding planning, pricing, our process, and more.",
};

export default async function FAQPageRoute() {
  const allFaqs = await getFAQs();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <PageHero
        variant="minimal"
        headline="Frequently Asked Questions"
        subheadline="Everything you need to know about planning your Colorado mountain wedding."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ]}
      />

      {/* FAQ Content */}
      <Section bg="white">
        <FAQPage faqs={allFaqs} />
      </Section>

      {/* Bottom CTA */}
      <Section bg="cream">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Still Have Questions?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            We are always happy to chat. Reach out and we will get back to you
            within 24 hours.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
