"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface TestimonialCarouselProps {
  testimonials: {
    coupleName: string;
    quote: string;
    venue?: string;
  }[];
}

export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(advance, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [advance, isPaused]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[current];

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div aria-live="polite" className="relative min-h-[200px]">
        <blockquote
          key={current}
          className="transition-opacity duration-500 ease-in-out"
          style={{ opacity: 1 }}
        >
          <p className="font-serif text-xl leading-relaxed text-foreground md:text-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="mt-6">
            <cite className="not-italic">
              <span className="block text-base font-medium text-foreground">
                {testimonial.coupleName}
              </span>
              {testimonial.venue && (
                <span className="mt-1 block text-sm text-muted">
                  {testimonial.venue}
                </span>
              )}
            </cite>
          </footer>
        </blockquote>
      </div>

      {/* Dots navigation */}
      {testimonials.length > 1 && (
        <div
          className="mt-8 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === current}
              aria-label={`Show testimonial ${index + 1} of ${testimonials.length}`}
              onClick={() => setCurrent(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                index === current
                  ? "scale-110 bg-accent"
                  : "bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
