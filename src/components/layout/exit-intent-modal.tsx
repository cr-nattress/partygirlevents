"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

const DISMISSED_KEY = "exit_intent_dismissed";
const DISMISS_DAYS = 7;

export function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  }, []);

  useEffect(() => {
    // Don't show if already dismissed within DISMISS_DAYS
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed) {
      const elapsed = Date.now() - Number(dismissed);
      if (elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }

    let triggered = false;

    function handleMouseLeave(e: MouseEvent) {
      // Only trigger when mouse moves toward browser chrome (top of viewport)
      if (e.clientY > 5 || triggered) return;
      triggered = true;
      setShow(true);
      trackEvent("exit_intent_triggered");
    }

    // Delay attaching the listener to avoid triggering on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    try {
      await fetch("/api/tool-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "style_quiz", // reuse existing source for lead capture
          metadata: { capture_type: "exit_intent", offer: "planning_checklist" },
        }),
      });
      setSubmitted(true);
      trackEvent("exit_intent_converted", { email });
    } catch {
      // Fail silently — don't block the user
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl sm:inset-x-auto"
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              className="absolute right-4 top-4 text-muted hover:text-foreground"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!submitted ? (
              <>
                <div className="mb-6 text-center">
                  <p className="text-3xl">&#x1F48D;</p>
                  <h2 className="mt-3 font-serif text-2xl font-semibold">
                    Wait — Don&rsquo;t Plan Without This
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Get our free <strong>Colorado Mountain Wedding Checklist</strong> —
                    the same planning timeline Stephanie uses with her couples.
                    Covers everything from 12 months out to the big day.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full rounded-lg border border-foreground/15 px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Me the Checklist"}
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-muted/60">
                  No spam, ever. Just helpful planning resources.
                </p>
              </>
            ) : (
              <div className="py-4 text-center">
                <p className="text-3xl">&#x2705;</p>
                <h2 className="mt-3 font-serif text-2xl font-semibold">
                  Check Your Inbox!
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Your Colorado Mountain Wedding Checklist is on its way.
                  In the meantime, explore our{" "}
                  <a href="/tools/style-quiz" className="text-accent hover:underline">
                    Style Quiz
                  </a>{" "}
                  to discover your wedding aesthetic.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-4 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
