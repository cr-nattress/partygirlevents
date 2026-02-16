"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function FloatingCta() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const distanceFromBottom =
      document.body.scrollHeight - scrollY - window.innerHeight;

    const pastThreshold = scrollY > 500;
    const nearFooter = distanceFromBottom < 200;

    setVisible(pastThreshold && !nearFooter);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* Desktop: floating button */}
      <div
        aria-label="Start planning your wedding"
        className={cn(
          "fixed bottom-8 right-8 z-40 hidden md:block",
          "motion-safe:transition-all motion-safe:duration-300",
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <Button variant="primary" size="lg" className="shadow-lg" asChild>
          <Link href="/contact">Start Planning</Link>
        </Button>
      </div>

      {/* Mobile: full-width bar */}
      <div
        aria-label="Start planning your wedding"
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 md:hidden",
          "border-t bg-background/95 p-4 backdrop-blur",
          "motion-safe:transition-all motion-safe:duration-300",
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          asChild
        >
          <Link href="/contact">Start Planning</Link>
        </Button>
      </div>
    </>
  );
}
