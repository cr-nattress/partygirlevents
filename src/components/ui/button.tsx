import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = {
  variant: {
    primary: "bg-accent text-white hover:bg-accent-600 active:bg-accent-700",
    secondary: "bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700",
    ghost: "bg-transparent text-foreground hover:bg-foreground/5",
    outline: "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5",
  },
  size: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-8 text-base",
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const content = asChild ? (
      children
    ) : (
      <>
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </>
    );
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-normal ease-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
