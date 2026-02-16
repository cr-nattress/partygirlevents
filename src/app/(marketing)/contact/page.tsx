import { Metadata } from "next";
import { PageHero } from "@/components/layout";
import { Section } from "@/components/layout";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://partygirl.events";

export const metadata: Metadata = {
  title: "Get in Touch | Party Girl Events",
  description:
    "Ready to plan your Colorado mountain wedding? Fill out our inquiry form and Stephanie will be in touch within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: siteUrl },
        { name: "Contact", url: `${siteUrl}/contact` },
      ]} />

      <PageHero
        variant="minimal"
        headline="Let's Start Planning"
        subheadline="Tell us about your dream wedding and we'll be in touch within 24 hours."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <Section bg="white">
        <InquiryForm />
      </Section>
      <Section bg="cream" narrow>
        <div className="text-center">
          <p className="text-muted">
            Prefer to reach out directly? Email us at{" "}
            <a
              href="mailto:hello@partygirlevents.com"
              className="text-accent hover:underline"
            >
              hello@partygirlevents.com
            </a>{" "}
            or call{" "}
            <a
              href="tel:+19705550123"
              className="text-accent hover:underline"
            >
              (970) 555-0123
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
