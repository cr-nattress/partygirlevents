"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import type { FAQ, FAQCategory } from "@/types/content";

const categoryDisplayNames: Record<FAQCategory, string> = {
  pricing: "Pricing & Value",
  process: "Process & Working Together",
  services: "Services & Packages",
  colorado: "Colorado-Specific",
  logistics: "Logistics & Practical",
};

const categoryAnchors: Record<FAQCategory, string> = {
  pricing: "pricing",
  process: "process",
  services: "services",
  colorado: "colorado",
  logistics: "logistics",
};

const categoryOrder: FAQCategory[] = [
  "pricing",
  "process",
  "services",
  "colorado",
  "logistics",
];

interface FAQPageProps {
  faqs: FAQ[];
}

export function FAQPage({ faqs }: FAQPageProps) {
  const [search, setSearch] = useState("");

  const groupedFaqs = useMemo(() => {
    const groups: Partial<Record<FAQCategory, FAQ[]>> = {};
    for (const faq of faqs) {
      if (!groups[faq.category]) {
        groups[faq.category] = [];
      }
      groups[faq.category]!.push(faq);
    }
    return groups;
  }, [faqs]);

  const availableCategories = useMemo(() => {
    return categoryOrder.filter(
      (cat) => groupedFaqs[cat] && groupedFaqs[cat]!.length > 0,
    );
  }, [groupedFaqs]);

  const filteredFaqs = useMemo(() => {
    if (!search.trim()) return null;

    const query = search.toLowerCase().trim();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query),
    );
  }, [search, faqs]);

  const isSearching = search.trim().length > 0;

  return (
    <div>
      {/* Search input */}
      <div className="mb-8">
        <div className="relative">
          <Input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
            aria-label="Search frequently asked questions"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category jump-to navigation */}
      {!isSearching && availableCategories.length > 1 && (
        <nav
          className="mb-10 flex flex-wrap gap-2"
          aria-label="FAQ categories"
        >
          {availableCategories.map((cat) => (
            <a
              key={cat}
              href={`#${categoryAnchors[cat]}`}
              className="rounded-full border border-foreground/10 px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {categoryDisplayNames[cat]}
            </a>
          ))}
        </nav>
      )}

      {/* Search results */}
      {isSearching && (
        <div>
          {filteredFaqs && filteredFaqs.length > 0 ? (
            <div>
              <p className="mb-6 text-sm text-muted">
                {filteredFaqs.length} result
                {filteredFaqs.length !== 1 ? "s" : ""} found
              </p>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left text-base font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="prose prose-sm max-w-none text-muted">
                        <FAQAnswer answer={faq.answer} />
                      </div>
                      <p className="mt-3 text-xs text-muted/60">
                        Category: {categoryDisplayNames[faq.category]}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-serif text-xl text-foreground">
                No matching questions found
              </p>
              <p className="mt-2 text-muted">
                Try a different search term, or{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-700"
                >
                  contact us directly
                </Link>{" "}
                and we will be happy to help.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Grouped FAQs by category */}
      {!isSearching && (
        <div className="space-y-12">
          {availableCategories.map((category) => (
            <div key={category} id={categoryAnchors[category]}>
              <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                {categoryDisplayNames[category]}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {groupedFaqs[category]!.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left text-base font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="prose prose-sm max-w-none text-muted">
                        <FAQAnswer answer={faq.answer} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Renders an FAQ answer with inline links styled distinctly.
 * Detects markdown-style links [text](url) and converts them to styled anchors.
 */
function FAQAnswer({ answer }: { answer: string }) {
  // Split answer into paragraphs
  const paragraphs = answer.split(/\n\n+/);

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="leading-relaxed">
          {renderWithLinks(paragraph)}
        </p>
      ))}
    </>
  );
}

function renderWithLinks(text: string): React.ReactNode[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the link
    const [, linkText, href] = match;
    const isExternal = href.startsWith("http");
    parts.push(
      <Link
        key={`${href}-${match.index}`}
        href={href}
        className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-700"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {linkText}
      </Link>,
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
