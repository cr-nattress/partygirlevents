"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { label?: string }
>(({ className, label, id, ...props }, ref) => {
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex items-center gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded border border-foreground/20 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label htmlFor={checkboxId} className="text-sm font-medium text-foreground cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
