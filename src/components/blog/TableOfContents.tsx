"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function TableOfContents({ headings }: { headings: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile: collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-foreground/10 bg-surface px-4 py-3 text-sm font-medium"
        >
          <span>Table of Contents</span>
          <svg className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <nav className="mt-2 rounded-lg border border-foreground/10 bg-surface p-4">
            <TOCList headings={headings} activeId={activeId} onClick={() => setIsOpen(false)} />
          </nav>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">On this page</p>
        <TOCList headings={headings} activeId={activeId} />
      </nav>
    </>
  );
}

function TOCList({ headings, activeId, onClick }: { headings: TOCItem[]; activeId: string; onClick?: () => void }) {
  return (
    <ul className="space-y-2">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              onClick?.();
            }}
            className={cn(
              "block text-sm transition-colors hover:text-accent",
              h.level === 3 && "pl-4",
              activeId === h.id ? "font-medium text-accent" : "text-muted"
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
