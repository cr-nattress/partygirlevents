"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

import { Step1WeddingType } from "./steps/Step1WeddingType";
import { Step2EventDetails } from "./steps/Step2EventDetails";
import { Step3Location } from "./steps/Step3Location";
import { Step4Budget } from "./steps/Step4Budget";
import { Step5ContactInfo } from "./steps/Step5ContactInfo";
import { StepConfirmation } from "./steps/StepConfirmation";

/* -------------------------------------------------------------------------- */
/*  Schema                                                                     */
/* -------------------------------------------------------------------------- */

const formSchema = z.object({
  weddingType: z.enum([
    "full-wedding",
    "elopement",
    "destination",
    "day-of",
    "other",
  ]),
  guestCount: z.string().optional(),
  preferredDate: z.string().optional(),
  venueStatus: z.string().optional(),
  planningStatus: z.string().optional(),
  eventDescription: z.string().optional(),
  location: z.array(z.string()).min(1, "Please select at least one location"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  notes: z.string().max(500).optional(),
  referralSource: z.string().optional(),
  honeypot: z.string().max(0),
});

export type FormValues = z.infer<typeof formSchema>;

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TOTAL_STEPS = 5;
const SESSION_KEY = "pge-inquiry-form";

/** Fields to validate per step before allowing "Next" */
const stepValidationFields: Record<number, (keyof FormValues)[]> = {
  1: ["weddingType"],
  2: [],
  3: ["location"],
  4: ["budgetRange"],
  5: ["firstName", "lastName", "email", "honeypot"],
};

/* -------------------------------------------------------------------------- */
/*  Animation variants                                                         */
/* -------------------------------------------------------------------------- */

function slideVariants(direction: number) {
  return {
    initial: { x: direction > 0 ? 200 : -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: direction > 0 ? -200 : 200, opacity: 0 },
  };
}

/* -------------------------------------------------------------------------- */
/*  ProgressBar                                                                */
/* -------------------------------------------------------------------------- */

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          Step {step} of {total}
        </span>
        <span className="text-muted">{pct}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Step ${step} of ${total}`}
        className="h-2 w-full overflow-hidden rounded-full bg-foreground/10"
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  InquiryForm                                                                */
/* -------------------------------------------------------------------------- */

export function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weddingType: undefined as unknown as FormValues["weddingType"],
      guestCount: "",
      preferredDate: "",
      venueStatus: "",
      planningStatus: "",
      eventDescription: "",
      location: [],
      budgetRange: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
      referralSource: "",
      honeypot: "",
    },
    mode: "onTouched",
  });

  const { handleSubmit, trigger, watch, reset, getValues } = form;

  /* ---- Session persistence: hydrate on mount ---- */
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<FormValues>;
        reset({ ...getValues(), ...parsed });
      }
    } catch {
      // ignore parse errors
    }
    // Run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Session persistence: save on change (debounced) ---- */
  const saveToSession = useCallback(
    (data: FormValues) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
        } catch {
          // storage quota exceeded or unavailable
        }
      }, 300);
    },
    []
  );

  useEffect(() => {
    const subscription = watch((data) => {
      saveToSession(data as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, saveToSession]);

  /* ---- Navigation ---- */
  async function goNext() {
    const fields = stepValidationFields[currentStep] ?? [];
    if (fields.length > 0) {
      const isValid = await trigger(fields);
      if (!isValid) return;
    }
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function goBack() {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  /* ---- Submit ---- */
  async function onSubmit(data: FormValues) {
    // Honeypot check
    if (data.honeypot) return;

    setIsSubmitting(true);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Clear session storage
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setSubmitted(true);
  }

  /* ---- Render ---- */
  if (submitted) {
    return (
      <Container narrow>
        <StepConfirmation firstName={getValues("firstName")} />
      </Container>
    );
  }

  const variants = slideVariants(direction);

  return (
    <Container narrow>
      <ProgressBar step={currentStep} total={TOTAL_STEPS} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="relative min-h-[400px]"
      >
        <FormProvider {...form}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {currentStep === 1 && (
                <Step1WeddingType onAdvance={goNext} />
              )}
              {currentStep === 2 && <Step2EventDetails />}
              {currentStep === 3 && <Step3Location />}
              {currentStep === 4 && <Step4Budget />}
              {currentStep === 5 && <Step5ContactInfo />}
            </motion.div>
          </AnimatePresence>
        </FormProvider>

        {/* Navigation buttons */}
        <div
          className={cn(
            "mt-10 flex items-center",
            currentStep === 1 ? "justify-center" : "justify-between"
          )}
        >
          {currentStep > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={goBack}
            >
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </Button>
          )}

          {currentStep > 1 && currentStep < TOTAL_STEPS && (
            <Button type="button" variant="primary" size="lg" onClick={goNext}>
              Next
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          )}

          {currentStep === TOTAL_STEPS && (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting}
            >
              Send My Inquiry
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
}
