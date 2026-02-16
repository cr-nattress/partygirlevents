"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie_consent";

type ConsentValue = "accepted" | "declined";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      // Delay showing banner slightly so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl border border-foreground/10 bg-white px-6 py-5 shadow-lg sm:flex-row sm:gap-6">
        <p className="flex-1 text-sm leading-relaxed text-muted">
          We use cookies and analytics to understand how visitors interact with
          our site and improve your experience. You can accept or decline
          non-essential cookies.{" "}
          <a href="/privacy" className="text-accent underline hover:no-underline">
            Privacy Policy
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-foreground/15 px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-foreground/5"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
