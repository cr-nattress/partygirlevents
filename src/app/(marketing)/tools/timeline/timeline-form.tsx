"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompletion } from "ai/react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import {
  generateTimeline,
  formatTime,
  type TimelineInput,
  type TimelineResult,
  type TimelineEvent,
} from "@/lib/timeline-generator";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TOTAL_STEPS = 3;

const CEREMONY_TIMES = Array.from({ length: 17 }, (_, i) => {
  const minutes = 10 * 60 + i * 30; // 10:00 AM to 6:00 PM
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  return {
    value: `${h24.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
    label: formatTime(minutes),
  };
});

const VENUE_TYPES: {
  value: TimelineInput["venueType"];
  label: string;
  icon: string;
  desc: string;
}[] = [
  {
    value: "hotel",
    label: "Hotel / Resort",
    icon: "\u2302",
    desc: "All-in-one with on-site rooms",
  },
  {
    value: "outdoor",
    label: "Outdoor",
    icon: "\u25B2",
    desc: "Open-air mountain ceremony",
  },
  {
    value: "lodge",
    label: "Lodge / Barn",
    icon: "\u2726",
    desc: "Rustic mountain charm",
  },
  {
    value: "private-estate",
    label: "Private Estate",
    icon: "\u2662",
    desc: "Exclusive and intimate",
  },
  {
    value: "restaurant",
    label: "Restaurant",
    icon: "\u2606",
    desc: "Built-in catering & ambiance",
  },
];

const SEASONS: {
  value: TimelineInput["season"];
  label: string;
  months: string;
}[] = [
  { value: "summer", label: "Summer", months: "Jun \u2013 Sep" },
  { value: "fall", label: "Fall", months: "Sep \u2013 Oct" },
  { value: "winter", label: "Winter", months: "Nov \u2013 Mar" },
  { value: "spring", label: "Spring", months: "Apr \u2013 May" },
];

const RECEPTION_STYLES: {
  value: TimelineInput["receptionStyle"];
  label: string;
  icon: string;
  desc: string;
}[] = [
  {
    value: "seated-dinner",
    label: "Seated Dinner",
    icon: "\u2662",
    desc: "Classic plated or buffet dinner",
  },
  {
    value: "cocktail-reception",
    label: "Cocktail Reception",
    icon: "\u2726",
    desc: "Passed apps & food stations",
  },
  {
    value: "brunch",
    label: "Brunch",
    icon: "\u2606",
    desc: "Morning celebration",
  },
  {
    value: "family-style",
    label: "Family Style",
    icon: "\u25CB",
    desc: "Shared platters, communal feel",
  },
];

const EXTRAS_OPTIONS: { value: string; label: string }[] = [
  { value: "sparkler-exit", label: "Sparkler Exit" },
  { value: "sunset-photos", label: "Sunset Photos" },
  { value: "live-band", label: "Live Band" },
  { value: "after-party", label: "After-Party" },
  { value: "lawn-games", label: "Lawn Games" },
  { value: "photo-booth", label: "Photo Booth" },
];

const CATEGORY_COLORS: Record<TimelineEvent["category"], string> = {
  prep: "bg-foreground/20",
  ceremony: "bg-accent",
  photos: "bg-secondary",
  reception: "bg-foreground",
  extras: "bg-accent/50",
};

const CATEGORY_LABELS: Record<TimelineEvent["category"], string> = {
  prep: "Prep",
  ceremony: "Ceremony",
  photos: "Photos",
  reception: "Reception",
  extras: "Extras",
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
/*  Step 1: Ceremony Details                                                   */
/* -------------------------------------------------------------------------- */

function Step1CeremonyDetails({
  ceremonyTime,
  setCeremonyTime,
  venueType,
  setVenueType,
  guestCount,
  setGuestCount,
  season,
  setSeason,
}: {
  ceremonyTime: string;
  setCeremonyTime: (v: string) => void;
  venueType: TimelineInput["venueType"] | "";
  setVenueType: (v: TimelineInput["venueType"]) => void;
  guestCount: number;
  setGuestCount: (v: number) => void;
  season: TimelineInput["season"] | "";
  setSeason: (v: TimelineInput["season"]) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Ceremony Details
        </h2>
        <p className="mt-2 text-muted">
          These details shape the foundation of your wedding day timeline.
        </p>
      </div>

      {/* Ceremony time */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Ceremony Time
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
          {CEREMONY_TIMES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setCeremonyTime(t.value)}
              className={cn(
                "rounded-md border px-3 py-2.5 text-sm font-medium transition-all duration-200",
                ceremonyTime === t.value
                  ? "border-accent bg-accent/10 text-accent shadow-sm"
                  : "border-foreground/10 bg-surface text-foreground hover:border-accent/40 hover:bg-accent/5",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Venue type */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Venue Type
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {VENUE_TYPES.map((v) => (
            <button
              key={v.value}
              type="button"
              onClick={() => setVenueType(v.value)}
              className={cn(
                "group flex items-start gap-4 rounded-lg border p-5 text-left transition-all duration-200",
                venueType === v.value
                  ? "border-accent bg-accent/10 shadow-sm"
                  : "border-foreground/10 bg-surface hover:border-accent/40 hover:bg-accent/5",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-colors duration-200",
                  venueType === v.value
                    ? "bg-accent text-white"
                    : "bg-foreground/5 text-muted group-hover:bg-accent/10 group-hover:text-accent",
                )}
              >
                {v.icon}
              </span>
              <div>
                <span
                  className={cn(
                    "block font-medium",
                    venueType === v.value ? "text-accent" : "text-foreground",
                  )}
                >
                  {v.label}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {v.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
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
/*  Step 2: Reception Style                                                    */
/* -------------------------------------------------------------------------- */

function Step2ReceptionStyle({
  receptionStyle,
  setReceptionStyle,
  hasFirstLook,
  setHasFirstLook,
  hasCocktailHour,
  setHasCocktailHour,
  extras,
  toggleExtra,
}: {
  receptionStyle: TimelineInput["receptionStyle"] | "";
  setReceptionStyle: (v: TimelineInput["receptionStyle"]) => void;
  hasFirstLook: boolean;
  setHasFirstLook: (v: boolean) => void;
  hasCocktailHour: boolean;
  setHasCocktailHour: (v: boolean) => void;
  extras: string[];
  toggleExtra: (v: string) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Reception &amp; Extras
        </h2>
        <p className="mt-2 text-muted">
          These choices shape the flow and feel of your celebration.
        </p>
      </div>

      {/* Reception format */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Reception Style
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {RECEPTION_STYLES.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => setReceptionStyle(style.value)}
              className={cn(
                "group flex items-start gap-4 rounded-lg border p-5 text-left transition-all duration-200",
                receptionStyle === style.value
                  ? "border-accent bg-accent/10 shadow-sm"
                  : "border-foreground/10 bg-surface hover:border-accent/40 hover:bg-accent/5",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-colors duration-200",
                  receptionStyle === style.value
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
                    receptionStyle === style.value
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

      {/* Toggles */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* First look */}
        <button
          type="button"
          onClick={() => setHasFirstLook(!hasFirstLook)}
          className={cn(
            "flex items-center gap-4 rounded-lg border p-5 text-left transition-all duration-200",
            hasFirstLook
              ? "border-accent bg-accent/10 shadow-sm"
              : "border-foreground/10 bg-surface hover:border-accent/40 hover:bg-accent/5",
          )}
        >
          <div
            className={cn(
              "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200",
              hasFirstLook ? "bg-accent" : "bg-foreground/20",
            )}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                hasFirstLook ? "translate-x-5" : "translate-x-0",
              )}
            />
          </div>
          <div>
            <span
              className={cn(
                "block text-sm font-medium",
                hasFirstLook ? "text-accent" : "text-foreground",
              )}
            >
              First Look
            </span>
            <span className="block text-xs text-muted">
              See each other before the ceremony
            </span>
          </div>
        </button>

        {/* Cocktail hour */}
        <button
          type="button"
          onClick={() => setHasCocktailHour(!hasCocktailHour)}
          className={cn(
            "flex items-center gap-4 rounded-lg border p-5 text-left transition-all duration-200",
            hasCocktailHour
              ? "border-accent bg-accent/10 shadow-sm"
              : "border-foreground/10 bg-surface hover:border-accent/40 hover:bg-accent/5",
          )}
        >
          <div
            className={cn(
              "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200",
              hasCocktailHour ? "bg-accent" : "bg-foreground/20",
            )}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                hasCocktailHour ? "translate-x-5" : "translate-x-0",
              )}
            />
          </div>
          <div>
            <span
              className={cn(
                "block text-sm font-medium",
                hasCocktailHour ? "text-accent" : "text-foreground",
              )}
            >
              Cocktail Hour
            </span>
            <span className="block text-xs text-muted">
              Drinks &amp; apps between ceremony and reception
            </span>
          </div>
        </button>
      </div>

      {/* Extras */}
      <div>
        <label className="mb-3 block text-sm font-medium text-foreground">
          Fun Extras{" "}
          <span className="font-normal text-muted">(select any)</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {EXTRAS_OPTIONS.map((opt) => {
            const isSelected = extras.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleExtra(opt.value)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200",
                  isSelected
                    ? "border-accent bg-accent text-white shadow-sm"
                    : "border-foreground/15 bg-surface text-foreground hover:border-accent/40 hover:bg-accent/5",
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
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step 3: Timeline Results                                                   */
/* -------------------------------------------------------------------------- */

function TimelineView({
  result,
  input,
}: {
  result: TimelineResult;
  input: TimelineInput;
}) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      trackEvent("timeline_results_viewed", {
        ceremonyTime: input.ceremonyTime,
        venueType: input.venueType,
        guestCount: input.guestCount,
        season: input.season,
        receptionStyle: input.receptionStyle,
        totalHours: result.totalHours,
      });
      hasTrackedRef.current = true;
    }
  }, [input, result]);

  return (
    <div className="space-y-10">
      {/* Summary header */}
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Your Wedding Day Timeline
        </p>
        <p className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {result.totalHours} Hours of Celebration
        </p>
        <p className="mt-2 text-muted">
          Sunset at {result.sunsetTime} &middot; {input.guestCount} guests
          &middot;{" "}
          {input.season.charAt(0).toUpperCase() + input.season.slice(1)}{" "}
          wedding
        </p>
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap justify-center gap-4">
        {(
          Object.entries(CATEGORY_LABELS) as [
            TimelineEvent["category"],
            string,
          ][]
        ).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className={cn("h-3 w-3 rounded-full", CATEGORY_COLORS[key])}
            />
            <span className="text-xs text-muted">{label}</span>
          </div>
        ))}
      </div>

      {/* Vertical timeline */}
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-foreground/10 sm:left-28" />

          <div className="space-y-0">
            {result.events.map((event, i) => (
              <motion.div
                key={`${event.time}-${event.label}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group relative flex gap-4 py-3"
              >
                {/* Time label */}
                <div className="w-[4.5rem] shrink-0 pt-0.5 text-right sm:w-24">
                  <span className="text-sm font-semibold text-foreground">
                    {event.time}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative z-10 flex shrink-0 items-start pt-1.5">
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full ring-2 ring-white",
                      CATEGORY_COLORS[event.category],
                    )}
                  />
                </div>

                {/* Event details */}
                <div className="min-w-0 flex-1 pb-2">
                  <p className="text-sm font-medium text-foreground">
                    {event.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {event.duration} min
                  </p>
                  {event.note && (
                    <p className="mt-1.5 text-xs leading-relaxed text-muted/80 italic">
                      {event.note}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Altitude notes */}
      <div className="mx-auto max-w-2xl rounded-lg border border-foreground/10 bg-surface p-5 sm:p-6">
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
          Altitude &amp; Mountain Tips
        </h4>
        <ul className="space-y-2">
          {result.altitudeNotes.map((note) => (
            <li
              key={note}
              className="flex gap-2 text-sm leading-relaxed text-muted"
            >
              <span className="shrink-0 text-accent">&bull;</span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* AI Tips */}
      <AITimelineTips result={result} input={input} />

      {/* Actions */}
      <div className="mx-auto max-w-2xl rounded-lg border border-accent/20 bg-accent/5 p-6 text-center sm:p-8">
        <h3 className="font-serif text-xl font-semibold">
          Ready to bring this timeline to life?
        </h3>
        <p className="mt-2 text-sm text-muted">
          This is a great starting point. A free discovery call will help us
          fine-tune every detail for your specific venue and vision.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="primary"
            size="lg"
            asChild
            onClick={() =>
              trackEvent("timeline_cta_clicked", {
                cta: "discovery_call",
              })
            }
          >
            <a href="/contact">Book a Discovery Call</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              trackEvent("timeline_cta_clicked", { cta: "download_pdf" });
              alert("Coming soon! We're working on downloadable PDF timelines.");
            }}
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  AI Timeline Tips (auto-triggers on mount)                                  */
/* -------------------------------------------------------------------------- */

function AITimelineTips({
  result,
  input,
}: {
  result: TimelineResult;
  input: TimelineInput;
}) {
  const { completion, isLoading, complete } = useCompletion({
    api: "/api/timeline-tips",
  });

  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!hasCalledRef.current) {
      hasCalledRef.current = true;
      complete("", {
        body: { timeline: result, input },
      });
    }
  }, [result, input, complete]);

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
        Stephanie&rsquo;s Timeline Tips
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
          Reviewing your timeline...
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
          {completion}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main form component                                                        */
/* -------------------------------------------------------------------------- */

export function TimelineForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Step 1 state
  const [ceremonyTime, setCeremonyTime] = useState("");
  const [venueType, setVenueType] = useState<
    TimelineInput["venueType"] | ""
  >("");
  const [guestCount, setGuestCount] = useState(100);
  const [season, setSeason] = useState<TimelineInput["season"] | "">("");

  // Step 2 state
  const [receptionStyle, setReceptionStyle] = useState<
    TimelineInput["receptionStyle"] | ""
  >("");
  const [hasFirstLook, setHasFirstLook] = useState(false);
  const [hasCocktailHour, setHasCocktailHour] = useState(true);
  const [extras, setExtras] = useState<string[]>([]);

  // Results
  const [timelineResult, setTimelineResult] =
    useState<TimelineResult | null>(null);

  const hasTrackedStart = useRef(false);

  useEffect(() => {
    if (!hasTrackedStart.current) {
      trackEvent("timeline_started");
      hasTrackedStart.current = true;
    }
  }, []);

  const toggleExtra = useCallback((value: string) => {
    setExtras((prev) =>
      prev.includes(value)
        ? prev.filter((e) => e !== value)
        : [...prev, value],
    );
  }, []);

  /* ---- Validation ---- */

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return ceremonyTime !== "" && venueType !== "" && season !== "";
      case 2:
        return receptionStyle !== "";
      default:
        return false;
    }
  }

  /* ---- Navigation ---- */

  function goNext() {
    if (!canAdvance()) return;

    trackEvent("timeline_step_completed", { step });

    if (step === 2) {
      // Generate timeline
      const input: TimelineInput = {
        ceremonyTime,
        venueType: venueType as TimelineInput["venueType"],
        guestCount,
        season: season as TimelineInput["season"],
        receptionStyle: receptionStyle as TimelineInput["receptionStyle"],
        hasFirstLook,
        hasCocktailHour,
        extras,
      };
      const result = generateTimeline(input);
      setTimelineResult(result);
    }

    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function goBack() {
    if (step === 3) {
      setTimelineResult(null);
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
                <Step1CeremonyDetails
                  ceremonyTime={ceremonyTime}
                  setCeremonyTime={setCeremonyTime}
                  venueType={venueType}
                  setVenueType={setVenueType}
                  guestCount={guestCount}
                  setGuestCount={setGuestCount}
                  season={season}
                  setSeason={setSeason}
                />
              )}
              {step === 2 && (
                <Step2ReceptionStyle
                  receptionStyle={receptionStyle}
                  setReceptionStyle={setReceptionStyle}
                  hasFirstLook={hasFirstLook}
                  setHasFirstLook={setHasFirstLook}
                  hasCocktailHour={hasCocktailHour}
                  setHasCocktailHour={setHasCocktailHour}
                  extras={extras}
                  toggleExtra={toggleExtra}
                />
              )}
              {step === 3 && timelineResult && (
                <TimelineView
                  result={timelineResult}
                  input={
                    {
                      ceremonyTime,
                      venueType:
                        venueType as TimelineInput["venueType"],
                      guestCount,
                      season: season as TimelineInput["season"],
                      receptionStyle:
                        receptionStyle as TimelineInput["receptionStyle"],
                      hasFirstLook,
                      hasCocktailHour,
                      extras,
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
              {step === 2 ? "Build My Timeline" : "Next"}
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
