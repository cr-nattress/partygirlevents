"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormValues } from "../InquiryForm";

/* -------------------------------------------------------------------------- */
/*  Shared sub-components                                                      */
/* -------------------------------------------------------------------------- */

function GuestCountTiles({
  options,
}: {
  options: string[];
}) {
  const { setValue, watch } = useFormContext<FormValues>();
  const selected = watch("guestCount");

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Estimated Guest Count
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setValue("guestCount", opt, { shouldValidate: true })}
            className={cn(
              "rounded-md border px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              selected === opt
                ? "border-accent bg-accent/10 text-accent"
                : "border-foreground/15 bg-surface text-foreground hover:border-foreground/30"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function VenueStatusCards() {
  const { setValue, watch } = useFormContext<FormValues>();
  const selected = watch("venueStatus");

  const options = [
    { value: "booked", label: "Venue Booked" },
    { value: "touring", label: "Still Touring" },
    { value: "need-help", label: "Need Venue Help" },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Venue Status
      </label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() =>
              setValue("venueStatus", opt.value, { shouldValidate: true })
            }
            className={cn(
              "rounded-md border px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              selected === opt.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-foreground/15 bg-surface text-foreground hover:border-foreground/30"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PlanningProgressCards() {
  const { setValue, watch } = useFormContext<FormValues>();
  const selected = watch("planningStatus");

  const options = [
    { value: "just-started", label: "Just Started" },
    { value: "in-progress", label: "In Progress" },
    { value: "almost-done", label: "Almost Done" },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Planning Progress
      </label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() =>
              setValue("planningStatus", opt.value, { shouldValidate: true })
            }
            className={cn(
              "rounded-md border px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              selected === opt.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-foreground/15 bg-surface text-foreground hover:border-foreground/30"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Variant renderers                                                          */
/* -------------------------------------------------------------------------- */

function FullWeddingDetails() {
  const { register } = useFormContext<FormValues>();

  return (
    <div className="space-y-5">
      <GuestCountTiles
        options={["Under 50", "50-100", "100-200", "200-300", "300+"]}
      />
      <Input
        label="Preferred Date"
        type="month"
        placeholder="Select month"
        {...register("preferredDate")}
      />
      <VenueStatusCards />
    </div>
  );
}

function ElopementDetails() {
  const { register } = useFormContext<FormValues>();

  return (
    <div className="space-y-5">
      <GuestCountTiles options={["Just Us", "2-10", "10-30", "30-50"]} />
      <Input
        label="Preferred Season or Date"
        placeholder="e.g., Fall 2026, June 2027"
        {...register("preferredDate")}
      />
      <VenueStatusCards />
    </div>
  );
}

function DestinationDetails() {
  const { register } = useFormContext<FormValues>();

  return (
    <div className="space-y-5">
      <GuestCountTiles
        options={["Under 50", "50-100", "100-200", "200-300", "300+"]}
      />
      <Input
        label="Preferred Date"
        type="month"
        placeholder="Select month"
        {...register("preferredDate")}
      />
      <Input
        label="Where are you traveling from?"
        placeholder="e.g., Austin, TX"
        {...register("eventDescription")}
      />
      <VenueStatusCards />
    </div>
  );
}

function DayOfDetails() {
  const { register } = useFormContext<FormValues>();

  return (
    <div className="space-y-5">
      <Input
        label="Wedding Date"
        type="month"
        placeholder="Select month"
        {...register("preferredDate")}
      />
      <GuestCountTiles
        options={["Under 50", "50-100", "100-200", "200-300", "300+"]}
      />
      <Input
        label="Venue Name"
        placeholder="e.g., The Sebastian, Vail"
        {...register("venueStatus")}
      />
      <PlanningProgressCards />
    </div>
  );
}

function OtherEventDetails() {
  const { register, watch } = useFormContext<FormValues>();

  return (
    <div className="space-y-5">
      <Input
        label="Type of Event"
        placeholder="e.g., Rehearsal dinner, corporate retreat"
        {...register("planningStatus")}
      />
      <GuestCountTiles
        options={["Under 25", "25-50", "50-100", "100-200", "200+"]}
      />
      <Input
        label="Preferred Date"
        type="month"
        placeholder="Select month"
        {...register("preferredDate")}
      />
      <Textarea
        label="Tell us more about your event"
        placeholder="Describe what you have in mind..."
        maxLength={500}
        showCount
        value={watch("eventDescription") ?? ""}
        {...register("eventDescription")}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main step                                                                  */
/* -------------------------------------------------------------------------- */

export function Step2EventDetails() {
  const { watch } = useFormContext<FormValues>();
  const weddingType = watch("weddingType");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Event Details
        </h2>
        <p className="mt-2 text-muted">
          Help us understand the scope of your celebration.
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        {weddingType === "full-wedding" && <FullWeddingDetails />}
        {weddingType === "elopement" && <ElopementDetails />}
        {weddingType === "destination" && <DestinationDetails />}
        {weddingType === "day-of" && <DayOfDetails />}
        {weddingType === "other" && <OtherEventDetails />}
      </div>
    </div>
  );
}
