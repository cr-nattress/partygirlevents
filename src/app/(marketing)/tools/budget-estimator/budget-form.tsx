"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompletion } from "ai/react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import {
  calculateBudget,
  formatCurrency,
  type BudgetInput,
  type BudgetBreakdown,
} from "@/lib/budget-calculator";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TOTAL_STEPS = 4;

const LOCATIONS = [
  { value: "vail" as const, label: "Vail" },
  { value: "aspen" as const, label: "Aspen" },
  { value: "breckenridge" as const, label: "Breckenridge" },
  { value: "beaver-creek" as const, label: "Beaver Creek" },
  { value: "keystone" as const, label: "Keystone" },
  { value: "other-colorado" as const, label: "Other Colorado" },
];

const SEASONS = [
  { value: "summer" as const, label: "Summer", months: "Jun \u2013 Sep" },
  { value: "fall" as const, label: "Fall", months: "Sep \u2013 Oct" },
  { value: "winter" as const, label: "Winter", months: "Nov \u2013 Mar" },
  { value: "spring" as const, label: "Spring", months: "Apr \u2013 May" },
];

const STYLES = [
  {
    value: "intimate-luxury" as const,
    label: "Intimate Luxury",
    desc: "Small guest list, elevated everything",
    icon: "\u2726",
  },
  {
    value: "classic-elegant" as const,
    label: "Classic Elegant",
    desc: "Timeless design, full-scale celebration",
    icon: "\u2662",
  },
  {
    value: "rustic-mountain" as const,
    label: "Rustic Mountain",
    desc: "Natural materials, relaxed atmosphere",
    icon: "\u25B2",
  },
  {
    value: "adventure-elopement" as const,
    label: "Adventure Elopement",
    desc: "Just the two of you, epic location",
    icon: "\u2605",
  },
  {
    value: "modern-minimal" as const,
    label: "Modern Minimal",
    desc: "Clean lines, curated simplicity",
    icon: "\u25CB",
  },
];

const PRIORITY_OPTIONS = [
  { value: "venue", label: "Venue" },
  { value: "catering", label: "Food & Drink" },
  { value: "photography", label: "Photography" },
  { value: "florals", label: "Florals" },
  { value: "music", label: "Music" },
  { value: "planner", label: "Planner" },
  { value: "attire", label: "Attire" },
];

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
/*  Progress dots                                                              */
/* -------------------------------------------------------------------------- */

function ProgressDots({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="mb-10 flex items-center justify-center gap-3">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isCompleted = step < current;
        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                isActive &&
                  "bg-accent text-white shadow-glow ring-2 ring-accent/30",
                isCompleted && "bg-accent/20 text-accent",
                !isActive && !isCompleted && "bg-foreground/10 text-muted",
              )}
            >
              {isCompleted ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
            {i < total - 1 && (
              <div
                className={cn(
                  "h-px w-8 transition-colors duration-300",
                  isCompleted ? "bg-accent/40" : "bg-foreground/10",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 1: Basics                                                             */
/* -------------------------------------------------------------------------- */

function Step1Basics({
  guestCount,
  setGuestCount,
  location,
  setLocation,
  season,
  setSeason,
}: {
  guestCount: number;
  setGuestCount: (v: number) => void;
  location: BudgetInput["location"] | "";
  setLocation: (v: BudgetInput["location"]) => void;
  season: BudgetInput["season"] | "";
  setSeason: (v: BudgetInput["season"]) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Tell us the basics
        </h2>
        <p className="mt-2 text-muted">
          These three details shape your budget more than anything else.
        </p>
      </div>

      {/* Guest count */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Guest Count
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={10}
            max={300}
            step={5}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-foreground/10 accent-accent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md"
          />
          <span className="w-16 shrink-0 rounded-md bg-foreground/5 py-2 text-center text-lg font-semibold text-foreground">
            {guestCount}
          </span>
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>10</span>
          <span>300</span>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Location
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.value}
              type="button"
              onClick={() => setLocation(loc.value)}
              className={cn(
                "rounded-md border px-4 py-3 text-sm font-medium transition-all duration-200",
                location === loc.value
                  ? "border-accent bg-accent/10 text-accent shadow-sm"
                  : "border-foreground/10 bg-surface text-foreground hover:border-accent/40 hover:bg-accent/5",
              )}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Season */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Season
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SEASONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSeason(s.value)}
              className={cn(
                "rounded-md border px-4 py-3 text-center transition-all duration-200",
                season === s.value
                  ? "border-accent bg-accent/10 shadow-sm"
                  : "border-foreground/10 bg-surface hover:border-accent/40 hover:bg-accent/5",
              )}
            >
              <span
                className={cn(
                  "block text-sm font-medium",
                  season === s.value ? "text-accent" : "text-foreground",
                )}
              >
                {s.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {s.months}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 2: Style                                                              */
/* -------------------------------------------------------------------------- */

function Step2Style({
  weddingStyle,
  setWeddingStyle,
}: {
  weddingStyle: BudgetInput["weddingStyle"] | "";
  setWeddingStyle: (v: BudgetInput["weddingStyle"]) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          What&rsquo;s your vibe?
        </h2>
        <p className="mt-2 text-muted">
          Your wedding style affects vendor selection and overall budget range.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {STYLES.map((style) => (
          <button
            key={style.value}
            type="button"
            onClick={() => setWeddingStyle(style.value)}
            className={cn(
              "group flex items-start gap-4 rounded-lg border p-5 text-left transition-all duration-200",
              weddingStyle === style.value
                ? "border-accent bg-accent/10 shadow-sm"
                : "border-foreground/10 bg-surface hover:border-accent/40 hover:bg-accent/5",
            )}
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-colors duration-200",
                weddingStyle === style.value
                  ? "bg-accent text-white"
                  : "bg-foreground/5 text-muted group-hover:bg-accent/10 group-hover:text-accent",
              )}
            >
              {style.icon}
            </span>
            <div>
              <span
                className={cn(
                  "block font-medium",
                  weddingStyle === style.value
                    ? "text-accent"
                    : "text-foreground",
                )}
              >
                {style.label}
              </span>
              <span className="mt-0.5 block text-sm text-muted">
                {style.desc}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 3: Priorities                                                         */
/* -------------------------------------------------------------------------- */

function Step3Priorities({
  priorities,
  togglePriority,
}: {
  priorities: string[];
  togglePriority: (value: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Where should we splurge?
        </h2>
        <p className="mt-2 text-muted">
          Pick your <strong>top 3 priorities</strong>. We&rsquo;ll allocate more
          budget where it matters most to you.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {PRIORITY_OPTIONS.map((opt) => {
          const isSelected = priorities.includes(opt.value);
          const isDisabled = !isSelected && priorities.length >= 3;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={isDisabled}
              onClick={() => togglePriority(opt.value)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                isSelected
                  ? "border-accent bg-accent text-white shadow-sm"
                  : "border-foreground/15 bg-surface text-foreground",
                !isSelected &&
                  !isDisabled &&
                  "hover:border-accent/40 hover:bg-accent/5",
                isDisabled && "cursor-not-allowed opacity-40",
              )}
            >
              {isSelected && (
                <svg
                  className="-ml-0.5 mr-1.5 inline h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
              {opt.label}
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm text-muted">
        {priorities.length}/3 selected
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 4: Results                                                            */
/* -------------------------------------------------------------------------- */

function CategoryBar({
  category,
  maxHigh,
}: {
  category: BudgetBreakdown["categories"][number];
  maxHigh: number;
}) {
  const [showTip, setShowTip] = useState(false);
  const widthPct = Math.max((category.high / maxHigh) * 100, 8);

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={() => setShowTip((prev) => !prev)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-foreground">
          {category.label}
          <svg
            className={cn(
              "ml-1.5 inline h-3.5 w-3.5 text-muted transition-transform duration-200",
              showTip && "rotate-180",
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
        <span className="text-sm text-muted">
          {formatCurrency(category.low)} &ndash;{" "}
          {formatCurrency(category.high)}
        </span>
      </button>

      {/* Bar */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-foreground/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${widthPct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />
      </div>

      {/* Expandable tip */}
      <AnimatePresence>
        {showTip && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden text-sm leading-relaxed text-muted"
          >
            {category.tip}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultsView({
  breakdown,
  input,
}: {
  breakdown: BudgetBreakdown;
  input: BudgetInput;
}) {
  const maxHigh = Math.max(...breakdown.categories.map((c) => c.high));
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      trackEvent("budget_results_viewed", {
        location: input.location,
        season: input.season,
        style: input.weddingStyle,
        guestCount: input.guestCount,
        totalLow: breakdown.totalLow,
        totalHigh: breakdown.totalHigh,
      });
      hasTrackedRef.current = true;
    }
  }, [input, breakdown]);

  return (
    <div className="space-y-10">
      {/* Total range */}
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Your Estimated Budget
        </p>
        <p className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {formatCurrency(breakdown.totalLow)} &ndash;{" "}
          {formatCurrency(breakdown.totalHigh)}
        </p>
        <p className="mt-2 text-muted">
          {formatCurrency(breakdown.perGuest.low)} &ndash;{" "}
          {formatCurrency(breakdown.perGuest.high)} per guest
        </p>
      </div>

      {/* Category bars */}
      <div className="mx-auto max-w-2xl space-y-5">
        <h3 className="font-serif text-lg font-semibold">
          Budget Breakdown
        </h3>
        {breakdown.categories.map((cat) => (
          <CategoryBar key={cat.name} category={cat} maxHigh={maxHigh} />
        ))}
      </div>

      {/* Notes */}
      <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-foreground/10 bg-surface p-5">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            Location Insight
          </h4>
          <p className="text-sm leading-relaxed text-muted">
            {breakdown.locationNote}
          </p>
        </div>
        <div className="rounded-lg border border-foreground/10 bg-surface p-5">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-secondary-600">
            Season Insight
          </h4>
          <p className="text-sm leading-relaxed text-muted">
            {breakdown.seasonNote}
          </p>
        </div>
      </div>

      {/* AI Commentary */}
      <AICommentary breakdown={breakdown} input={input} />

      {/* CTA */}
      <div className="mx-auto max-w-2xl rounded-lg border border-accent/20 bg-accent/5 p-6 text-center sm:p-8">
        <h3 className="font-serif text-xl font-semibold">
          Want a personalized plan?
        </h3>
        <p className="mt-2 text-sm text-muted">
          This estimator gives you a solid starting range. A free 20-minute
          discovery call will give you a detailed plan tailored to your vision.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="primary"
            size="lg"
            asChild
            onClick={() =>
              trackEvent("budget_cta_clicked", {
                cta: "discovery_call",
                location: input.location,
              })
            }
          >
            <a href="/contact">Book a Free Discovery Call</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            onClick={() =>
              trackEvent("budget_cta_clicked", {
                cta: "start_over",
              })
            }
          >
            <a href="/tools/budget-estimator">Start Over</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  AI Commentary (auto-triggers on mount)                                     */
/* -------------------------------------------------------------------------- */

function AICommentary({
  breakdown,
  input,
}: {
  breakdown: BudgetBreakdown;
  input: BudgetInput;
}) {
  const { completion, isLoading, complete } = useCompletion({
    api: "/api/budget-commentary",
  });

  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!hasCalledRef.current) {
      hasCalledRef.current = true;
      complete("", {
        body: { breakdown, input },
      });
    }
  }, [breakdown, input, complete]);

  if (!completion && !isLoading) return null;

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-secondary/20 bg-secondary-50 p-5 sm:p-6">
      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-secondary-700">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        Stephanie&rsquo;s Take
      </h4>
      {isLoading && !completion ? (
        <div className="flex items-center gap-2 text-sm text-muted">
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Thinking about your wedding...
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-foreground/80">
          {completion}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main form component                                                        */
/* -------------------------------------------------------------------------- */

export function BudgetEstimatorForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Form state
  const [guestCount, setGuestCount] = useState(100);
  const [location, setLocation] = useState<BudgetInput["location"] | "">("");
  const [season, setSeason] = useState<BudgetInput["season"] | "">("");
  const [weddingStyle, setWeddingStyle] = useState<
    BudgetInput["weddingStyle"] | ""
  >("");
  const [priorities, setPriorities] = useState<string[]>([]);

  // Results
  const [breakdown, setBreakdown] = useState<BudgetBreakdown | null>(null);

  const hasTrackedStart = useRef(false);

  useEffect(() => {
    if (!hasTrackedStart.current) {
      trackEvent("budget_started");
      hasTrackedStart.current = true;
    }
  }, []);

  const togglePriority = useCallback((value: string) => {
    setPriorities((prev) => {
      if (prev.includes(value)) return prev.filter((p) => p !== value);
      if (prev.length >= 3) return prev;
      return [...prev, value];
    });
  }, []);

  /* ---- Validation ---- */

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return location !== "" && season !== "";
      case 2:
        return weddingStyle !== "";
      case 3:
        return priorities.length >= 1 && priorities.length <= 3;
      default:
        return false;
    }
  }

  /* ---- Navigation ---- */

  function goNext() {
    if (!canAdvance()) return;

    trackEvent("budget_step_completed", { step });

    if (step === 3) {
      // Calculate results
      const input: BudgetInput = {
        guestCount,
        location: location as BudgetInput["location"],
        season: season as BudgetInput["season"],
        weddingStyle: weddingStyle as BudgetInput["weddingStyle"],
        priorities,
      };
      const result = calculateBudget(input);
      setBreakdown(result);
    }

    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function goBack() {
    if (step === 4) {
      setBreakdown(null);
    }
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

  const variants = slideVariants(direction);

  return (
    <section className="pb-20">
      <Container narrow>
        <ProgressDots current={step} total={TOTAL_STEPS} />

        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {step === 1 && (
                <Step1Basics
                  guestCount={guestCount}
                  setGuestCount={setGuestCount}
                  location={location}
                  setLocation={setLocation}
                  season={season}
                  setSeason={setSeason}
                />
              )}
              {step === 2 && (
                <Step2Style
                  weddingStyle={weddingStyle}
                  setWeddingStyle={setWeddingStyle}
                />
              )}
              {step === 3 && (
                <Step3Priorities
                  priorities={priorities}
                  togglePriority={togglePriority}
                />
              )}
              {step === 4 && breakdown && (
                <ResultsView
                  breakdown={breakdown}
                  input={
                    {
                      guestCount,
                      location: location as BudgetInput["location"],
                      season: season as BudgetInput["season"],
                      weddingStyle:
                        weddingStyle as BudgetInput["weddingStyle"],
                      priorities,
                    }
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons (hidden on results step) */}
        {step < TOTAL_STEPS && (
          <div
            className={cn(
              "mt-10 flex items-center",
              step === 1 ? "justify-center" : "justify-between",
            )}
          >
            {step > 1 && (
              <Button type="button" variant="ghost" size="md" onClick={goBack}>
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

            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={goNext}
              disabled={!canAdvance()}
            >
              {step === 3 ? "See My Budget" : "Next"}
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
          </div>
        )}

        {/* Back button on results page */}
        {step === TOTAL_STEPS && (
          <div className="mt-6 flex justify-center">
            <Button type="button" variant="ghost" size="md" onClick={goBack}>
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
              Adjust Selections
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
