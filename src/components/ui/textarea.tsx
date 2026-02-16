import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, required, maxLength, showCount, value, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-foreground">
            {label}
            {required && <span className="ml-0.5 text-error">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          required={required}
          maxLength={maxLength}
          value={value}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground transition-colors duration-fast placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-error" : "border-foreground/20 hover:border-foreground/40",
            className
          )}
          {...props}
        />
        <div className="flex justify-between">
          {error ? (
            <p id={`${textareaId}-error`} className="text-sm text-error" role="alert">
              {error}
            </p>
          ) : helperText ? (
            <p id={`${textareaId}-helper`} className="text-sm text-muted">
              {helperText}
            </p>
          ) : (
            <span />
          )}
          {showCount && maxLength && (
            <span className="text-xs text-muted">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
