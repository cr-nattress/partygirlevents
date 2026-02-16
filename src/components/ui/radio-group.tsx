"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { label?: string }
>(({ className, label, id, ...props }, ref) => {
  const radioId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={radioId}
        className={cn(
          "aspect-square h-5 w-5 rounded-full border border-foreground/20 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-accent" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <label htmlFor={radioId} className="text-sm font-medium text-foreground cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
