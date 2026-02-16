"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StepConfirmationProps {
  firstName: string;
}

export function StepConfirmation({ firstName }: StepConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-lg text-center"
    >
      {/* Success icon */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
        <svg
          className="h-8 w-8 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 className="font-serif text-3xl font-semibold md:text-4xl">
        Thank you, {firstName}!
      </h2>

      <p className="mt-4 text-lg text-muted">
        Stephanie will be in touch within 24 hours.
      </p>

      {/* What to expect */}
      <div className="mt-8 rounded-lg border border-foreground/10 bg-background p-6 text-left">
        <h3 className="font-serif text-lg font-semibold">
          What to Expect Next
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
              1
            </span>
            <span>
              We&apos;ll review your inquiry and reach out via email within 24
              hours.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
              2
            </span>
            <span>
              We&apos;ll schedule a complimentary discovery call to learn more
              about your vision.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
              3
            </span>
            <span>
              You&apos;ll receive a personalized proposal tailored to your
              celebration.
            </span>
          </li>
        </ul>
      </div>

      {/* CTA buttons */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button variant="primary" size="lg" asChild>
          <Link href="/contact#discovery-call">Book a Discovery Call</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/portfolio">Explore Our Portfolio</Link>
        </Button>
      </div>
    </motion.div>
  );
}
