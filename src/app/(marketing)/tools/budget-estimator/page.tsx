import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { BudgetEstimatorForm } from "./budget-form";

export const metadata: Metadata = createMetadata({
  title: "Colorado Wedding Budget Estimator",
  description:
    "Get an honest estimate for your Colorado mountain wedding. Real pricing data for Vail, Aspen, Breckenridge, and more. Free and instant.",
  path: "/tools/budget-estimator",
});

export default function BudgetEstimatorPage() {
  return (
    <main className="bg-background">
      <section className="px-4 pb-8 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Free Tool
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
            Colorado Wedding Budget Estimator
          </h1>
          <p className="mt-4 text-lg text-muted">
            Real pricing data from a planner who works in these mountains every
            week. No fluff, no upsell &mdash; just honest numbers.
          </p>
        </div>
      </section>
      <BudgetEstimatorForm />
    </main>
  );
}
