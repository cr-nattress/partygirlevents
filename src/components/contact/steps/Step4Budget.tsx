"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { FormValues } from "../InquiryForm";

const budgetOptions: Record<string, string[]> = {
  "full-wedding": [
    "Under $5K",
    "$5K - $10K",
    "$10K - $20K",
    "$20K - $35K",
    "$35K+",
    "Discuss on call",
  ],
  destination: [
    "Under $5K",
    "$5K - $10K",
    "$10K - $20K",
    "$20K - $35K",
    "$35K+",
    "Discuss on call",
  ],
  elopement: [
    "Under $2.5K",
    "$2.5K - $5K",
    "$5K - $10K",
    "$10K+",
    "Discuss on call",
  ],
  "day-of": [
    "Under $2K",
    "$2K - $3.5K",
    "$3.5K - $5K",
    "$5K+",
    "Discuss on call",
  ],
  other: [
    "Under $5K",
    "$5K - $10K",
    "$10K - $20K",
    "$20K - $35K",
    "$35K+",
    "Discuss on call",
  ],
};

export function Step4Budget() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();
  const weddingType = watch("weddingType");
  const selected = watch("budgetRange");

  const options = budgetOptions[weddingType] ?? budgetOptions["full-wedding"];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          What&apos;s your investment range?
        </h2>
        <p className="mt-2 text-muted">
          This helps us recommend the right service level for you.
        </p>
      </div>

      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3 md:grid-cols-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() =>
              setValue("budgetRange", opt, { shouldValidate: true })
            }
            className={cn(
              "rounded-lg border-2 px-4 py-4 text-center text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              selected === opt
                ? "border-accent bg-accent/10 text-accent shadow-md"
                : "border-foreground/10 bg-surface text-foreground hover:border-foreground/20 hover:shadow-sm"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {errors.budgetRange && (
        <p className="text-center text-sm text-error" role="alert">
          {errors.budgetRange.message}
        </p>
      )}

      <p className="text-center text-sm text-muted">
        No judgment — this helps us recommend the right service level.
      </p>
    </div>
  );
}
