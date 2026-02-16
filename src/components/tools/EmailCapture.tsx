"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

interface EmailCaptureProps {
  source: "budget_tool" | "vibe_translator" | "timeline_tool" | "style_quiz";
  /** Headline above the email input */
  headline: string;
  /** Supporting text below headline */
  description: string;
  /** Button label */
  ctaLabel: string;
  /** Optional metadata to send with the lead */
  metadata?: Record<string, unknown>;
  /** Called after successful email submission */
  onCaptured: (email: string) => void;
  /** Visual style variant */
  variant?: "inline" | "card";
}

export function EmailCapture({
  source,
  headline,
  description,
  ctaLabel,
  metadata,
  onCaptured,
  variant = "card",
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValidEmail) return;

      setStatus("loading");
      setErrorMsg("");

      try {
        const res = await fetch("/api/tool-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source, metadata }),
        });

        if (!res.ok) throw new Error("Failed to save");

        trackEvent(`${source}_email_captured`, { email });
        onCaptured(email);
      } catch {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    },
    [email, isValidEmail, source, metadata, onCaptured],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        variant === "card" &&
          "mx-auto max-w-2xl rounded-lg border border-accent/20 bg-accent/5 p-6 sm:p-8",
        variant === "inline" && "mx-auto max-w-md",
      )}
    >
      <div className={cn(variant === "card" && "text-center")}>
        <h3 className="font-serif text-xl font-semibold">{headline}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "mt-5",
          variant === "card"
            ? "flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            : "flex gap-3",
        )}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={cn(
            "flex h-12 w-full rounded-md border bg-background px-4 text-sm text-foreground placeholder:text-muted/60 transition-colors duration-200",
            "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
            "border-foreground/20",
            variant === "card" && "sm:max-w-xs",
          )}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!isValidEmail || status === "loading"}
          loading={status === "loading"}
          className="shrink-0"
        >
          {ctaLabel}
        </Button>
      </form>

      {errorMsg && (
        <p className="mt-3 text-center text-sm text-red-600">{errorMsg}</p>
      )}

      <p className="mt-3 text-center text-xs text-muted/60">
        No spam, ever. Just your results.
      </p>
    </motion.div>
  );
}
