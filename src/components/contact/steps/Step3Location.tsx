"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { FormValues } from "../InquiryForm";

const locations = [
  { id: "vail", name: "Vail" },
  { id: "beaver-creek", name: "Beaver Creek" },
  { id: "aspen", name: "Aspen" },
  { id: "breckenridge", name: "Breckenridge" },
  { id: "keystone", name: "Keystone" },
  { id: "not-sure", name: "Not Sure Yet" },
] as const;

export function Step3Location() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();
  const selected = watch("location") ?? [];

  function toggleLocation(locationId: string) {
    const current = [...selected];
    const index = current.indexOf(locationId);
    if (index === -1) {
      current.push(locationId);
    } else {
      current.splice(index, 1);
    }
    setValue("location", current, { shouldValidate: true });
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">
          Where in Colorado?
        </h2>
        <p className="mt-2 text-muted">
          Select all the locations you&apos;re considering.
        </p>
      </div>

      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3 md:grid-cols-3">
        {locations.map((loc) => {
          const isSelected = selected.includes(loc.id);

          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => toggleLocation(loc.id)}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-lg border-2 p-5 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                isSelected
                  ? "border-accent bg-accent/5 shadow-md"
                  : "border-foreground/10 bg-surface hover:border-foreground/20 hover:shadow-sm"
              )}
            >
              {/* Checkmark indicator */}
              <div
                className={cn(
                  "absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200",
                  isSelected
                    ? "bg-accent text-white"
                    : "border border-foreground/20 bg-surface"
                )}
              >
                {isSelected && (
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Placeholder thumbnail */}
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200",
                  isSelected ? "bg-accent/15" : "bg-foreground/5"
                )}
              >
                <svg
                  className={cn(
                    "h-6 w-6 transition-colors duration-200",
                    isSelected ? "text-accent" : "text-muted"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {loc.id === "not-sure" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21"
                    />
                  )}
                </svg>
              </div>

              <span
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isSelected ? "text-accent" : "text-foreground"
                )}
              >
                {loc.name}
              </span>
            </button>
          );
        })}
      </div>

      {errors.location && (
        <p className="text-center text-sm text-error" role="alert">
          {errors.location.message}
        </p>
      )}
    </div>
  );
}
