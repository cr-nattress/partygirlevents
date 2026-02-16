import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout";
import { Section } from "@/components/layout";
import { VibeTranslatorForm } from "./vibe-form";

export const metadata: Metadata = createMetadata({
  title: "Wedding Vibe Translator",
  description:
    "Describe your dream wedding in your own words and our AI will translate it into a curated design direction with colors, venue suggestions, florals, and atmosphere recommendations for your Colorado mountain celebration.",
  path: "/tools/vibe-translator",
});

export default function VibeTranslatorPage() {
  return (
    <>
      <PageHero
        variant="minimal"
        headline="Translate Your Vibe"
        subheadline="Describe your dream wedding in your own words. We'll turn it into a design direction."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools/budget-estimator" },
          { label: "Vibe Translator", href: "/tools/vibe-translator" },
        ]}
      />
      <Section bg="white">
        <VibeTranslatorForm />
      </Section>
    </>
  );
}
