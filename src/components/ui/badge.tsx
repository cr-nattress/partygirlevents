import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-foreground/10 text-foreground",
  accent: "bg-accent-100 text-accent-700",
  secondary: "bg-secondary-100 text-secondary-700",
  outline: "border border-foreground/20 text-foreground bg-transparent",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
