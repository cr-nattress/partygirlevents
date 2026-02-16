"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "framer-motion";

interface MetricCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function MetricCounter({ value, suffix, label }: MetricCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const animate = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [value, prefersReducedMotion]);

  useEffect(() => {
    if (isInView) {
      animate();
    }
  }, [isInView, animate]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl font-semibold text-accent md:text-6xl">
        {displayValue}
        {suffix && <span>{suffix}</span>}
      </div>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
    </div>
  );
}
