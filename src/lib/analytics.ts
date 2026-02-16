import posthog from "posthog-js";

let initialized = false;

export function initPostHog() {
  if (
    typeof window === "undefined" ||
    initialized ||
    !process.env.NEXT_PUBLIC_POSTHOG_KEY
  )
    return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
  });

  initialized = true;
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  posthog.capture(event, properties);
}

export { posthog };
