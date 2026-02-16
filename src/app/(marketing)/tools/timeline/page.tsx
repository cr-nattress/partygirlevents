import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { TimelineForm } from "./timeline-form";

export const metadata: Metadata = createMetadata({
  title: "Wedding Day Timeline Generator",
  description:
    "Build your perfect Colorado mountain wedding day timeline. Get a personalized minute-by-minute schedule with altitude-smart tips from an experienced mountain wedding planner.",
  path: "/tools/timeline",
});

export default function TimelinePage() {
  return (
    <main className="bg-background">
      <section className="px-4 pb-8 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Free Tool
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
            Your Wedding Day, Minute by Minute
          </h1>
          <p className="mt-4 text-lg text-muted">
            Tell us about your day and we&rsquo;ll build a timeline with
            Colorado mountain wisdom built in.
          </p>
        </div>
      </section>
      <TimelineForm />
    </main>
  );
}
