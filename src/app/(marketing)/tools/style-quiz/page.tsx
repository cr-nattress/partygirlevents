import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { StyleQuiz } from "./style-quiz";

export const metadata: Metadata = createMetadata({
  title: "Wedding Style Quiz",
  description:
    "Discover your unique wedding style in 60 seconds. Take our free quiz and get a personalized style profile for your Colorado mountain celebration.",
  path: "/tools/style-quiz",
});

export default function StyleQuizPage() {
  return (
    <main className="bg-background">
      <section className="px-4 pb-8 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Free Quiz
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
            What&rsquo;s Your Wedding Style?
          </h1>
          <p className="mt-4 text-lg text-muted">
            Answer 6 quick questions and we&rsquo;ll reveal your unique wedding
            aesthetic &mdash; plus personalized tips for bringing it to life in
            the Colorado mountains.
          </p>
        </div>
      </section>
      <StyleQuiz />
    </main>
  );
}
