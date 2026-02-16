"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { CaseStudy, Season } from "@/types/content";

const SEASONS: Season[] = ["spring", "summer", "fall", "winter"];

interface PortfolioGridProps {
  caseStudies: CaseStudy[];
}

export function PortfolioGrid({ caseStudies }: PortfolioGridProps) {
  const [activeSeason, setActiveSeason] = useState<Season | null>(null);
  const [activeStyle, setActiveStyle] = useState<string | null>(null);

  // Extract unique styles from all case studies
  const allStyles = useMemo(() => {
    const styles = new Set<string>();
    caseStudies.forEach((cs) => {
      cs.style.forEach((s) => styles.add(s));
    });
    return Array.from(styles).sort();
  }, [caseStudies]);

  // Filter case studies
  const filtered = useMemo(() => {
    return caseStudies.filter((cs) => {
      if (activeSeason && cs.season !== activeSeason) return false;
      if (activeStyle && !cs.style.includes(activeStyle)) return false;
      return true;
    });
  }, [caseStudies, activeSeason, activeStyle]);

  const hasActiveFilters = activeSeason !== null || activeStyle !== null;

  function clearFilters() {
    setActiveSeason(null);
    setActiveStyle(null);
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-10 space-y-4">
        {/* Season filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-muted">Season:</span>
          {SEASONS.map((season) => (
            <button
              key={season}
              onClick={() =>
                setActiveSeason(activeSeason === season ? null : season)
              }
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200",
                activeSeason === season
                  ? "bg-accent text-white"
                  : "bg-foreground/5 text-foreground hover:bg-foreground/10"
              )}
            >
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </button>
          ))}
        </div>

        {/* Style filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-muted">Style:</span>
          {allStyles.map((style) => (
            <button
              key={style}
              onClick={() =>
                setActiveStyle(activeStyle === style ? null : style)
              }
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200",
                activeStyle === style
                  ? "bg-accent text-white"
                  : "bg-foreground/5 text-foreground hover:bg-foreground/10"
              )}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm font-medium text-accent underline underline-offset-2 transition-colors duration-200 hover:text-accent/80"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted">
            No weddings match your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cs) => (
              <motion.div
                key={cs.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/portfolio/${cs.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-lg"
                >
                  <Image
                    src={cs.featuredImage.src}
                    alt={cs.featuredImage.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <Badge
                      variant="accent"
                      className="mb-3"
                    >
                      {cs.style[0]}
                    </Badge>
                    <h3 className="font-serif text-2xl font-semibold text-white">
                      {cs.coupleName}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      {cs.venueName}
                    </p>
                    <span className="mt-3 inline-flex items-center text-sm font-medium text-white/90 transition-colors duration-200 group-hover:text-white">
                      View Story
                      <span className="ml-1" aria-hidden="true">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
