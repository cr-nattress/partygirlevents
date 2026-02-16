"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { FormValues } from "../InquiryForm";

const weddingTypes = [
  {
    value: "full-wedding" as const,
    title: "Full Wedding",
    description: "The complete experience from vision to celebration",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    value: "elopement" as const,
    title: "Intimate Elopement",
    description: "Just the two of you (and maybe a few loved ones)",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    value: "destination" as const,
    title: "Destination Wedding",
    description: "Bringing your loved ones to the mountains",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    value: "day-of" as const,
    title: "Day-of Coordination",
    description: "You've planned it, we'll perfect it",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "other" as const,
    title: "Other Event",
    description: "Rehearsal dinners, corporate events, and more",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
] as const;

interface Step1WeddingTypeProps {
  onAdvance: () => void;
}

export function Step1WeddingType({ onAdvance }: Step1WeddingTypeProps) {
  const { setValue, watch } = useFormContext<FormValues>();
  const selected = watch("weddingType");

  function handleSelect(value: FormValues["weddingType"]) {
    setValue("weddingType", value, { shouldValidate: true });
    onAdvance();
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          What are you dreaming of?
        </h2>
        <p className="mt-2 text-muted">
          Select the option that best describes your event.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {weddingTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => handleSelect(type.value)}
            className={cn(
              "group flex flex-col items-center gap-3 rounded-lg border-2 p-4 text-center transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:p-6",
              selected === type.value
                ? "border-accent bg-accent/5 shadow-md"
                : "border-foreground/10 bg-surface hover:border-foreground/20"
            )}
          >
            <div
              className={cn(
                "transition-colors duration-200",
                selected === type.value
                  ? "text-accent"
                  : "text-muted group-hover:text-foreground"
              )}
            >
              {type.icon}
            </div>
            <div>
              <p className="font-medium">{type.title}</p>
              <p className="mt-1 text-xs text-muted md:text-sm">
                {type.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
