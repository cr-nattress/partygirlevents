import posthog from "posthog-js";

let initialized = false;

function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie_consent") === "accepted";
}

export function initPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (
    typeof window === "undefined" ||
    initialized ||
    !key ||
    key.includes("your-")
  )
    return;

  // Only fully initialize if user has given consent
  const consent = hasAnalyticsConsent();

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    persistence: consent ? "localStorage+cookie" : "memory",
    opt_out_capturing_by_default: !consent,
  });

  initialized = true;
}

/**
 * Call after the user accepts cookies to enable full tracking.
 */
export function enableAnalytics() {
  if (typeof window === "undefined") return;
  posthog.opt_in_capturing();
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}

export { posthog };
