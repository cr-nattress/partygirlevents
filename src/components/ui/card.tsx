import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { glass?: boolean }>(
  ({ className, glass = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-foreground/5 transition-shadow duration-normal ease-default",
        glass
          ? "bg-white/10 backdrop-blur-xl"
          : "bg-surface shadow-sm hover:shadow-md",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-0", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-t border-foreground/5 p-6 pt-4", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

const CardImage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("overflow-hidden rounded-t-lg", className)} {...props} />
  )
);
CardImage.displayName = "CardImage";

export { Card, CardHeader, CardContent, CardFooter, CardImage };
