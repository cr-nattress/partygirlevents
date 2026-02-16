"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

interface PageHeroProps {
  variant?: "fullscreen" | "split" | "minimal";
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  className?: string;
  breadcrumbs?: { label: string; href: string }[];
}

function Breadcrumbs({
  items,
  dark,
}: {
  items: { label: string; href: string }[];
  dark?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index > 0 && (
              <span
                className={cn(
                  "select-none",
                  dark ? "text-white/50" : "text-muted",
                )}
                aria-hidden="true"
              >
                /
              </span>
            )}
            <Link
              href={item.href}
              className={cn(
                "transition-colors duration-normal",
                dark
                  ? "text-white/60 hover:text-white"
                  : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function HeroCtas({
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  dark,
}: {
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  dark?: boolean;
}) {
  if (!ctaText || !ctaHref) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <Button variant="primary" size="lg" asChild>
        <Link href={ctaHref}>{ctaText}</Link>
      </Button>
      {secondaryCtaText && secondaryCtaHref && (
        <Button variant={dark ? "ghost" : "outline"} size="lg" asChild>
          <Link
            href={secondaryCtaHref}
            className={dark ? "text-white hover:text-white/80" : undefined}
          >
            {secondaryCtaText}
          </Link>
        </Button>
      )}
    </div>
  );
}

function FullscreenHero({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen items-end overflow-hidden",
        !backgroundImage && "bg-background",
        className,
      )}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-transparent" />
        </>
      )}

      <div className="relative z-10 w-full pb-16 md:pb-24">
        <Container>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs items={breadcrumbs} dark />
          )}
          <h1 className="text-hero font-serif text-white">{headline}</h1>
          {subheadline && (
            <p className="mt-4 max-w-2xl text-xl text-white/80">
              {subheadline}
            </p>
          )}
          <HeroCtas
            ctaText={ctaText}
            ctaHref={ctaHref}
            secondaryCtaText={secondaryCtaText}
            secondaryCtaHref={secondaryCtaHref}
            dark
          />
        </Container>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <svg
          className="h-6 w-6 animate-bounce text-white/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}

function SplitHero({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn("grid min-h-[60vh] gap-0 lg:grid-cols-2", className)}
    >
      {/* Left: Image area */}
      <div className="relative min-h-[40vh] bg-dark/10 lg:min-h-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        )}
      </div>

      {/* Right: Text content */}
      <div className="flex items-center bg-background">
        <Container className="py-12 md:py-16 lg:py-24">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumbs items={breadcrumbs} />
          )}
          <h1 className="text-display font-serif">{headline}</h1>
          {subheadline && (
            <p className="mt-4 max-w-xl text-lg text-muted">{subheadline}</p>
          )}
          <HeroCtas
            ctaText={ctaText}
            ctaHref={ctaHref}
            secondaryCtaText={secondaryCtaText}
            secondaryCtaHref={secondaryCtaHref}
          />
        </Container>
      </div>
    </section>
  );
}

function MinimalHero({
  headline,
  subheadline,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("bg-background py-16 md:py-24", className)}>
      <Container narrow className="text-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex justify-center">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-display font-serif">{headline}</h1>
        {subheadline && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            {subheadline}
          </p>
        )}
        <HeroCtas
          ctaText={ctaText}
          ctaHref={ctaHref}
          secondaryCtaText={secondaryCtaText}
          secondaryCtaHref={secondaryCtaHref}
        />
      </Container>
    </section>
  );
}

export function PageHero({ variant = "fullscreen", ...props }: PageHeroProps) {
  switch (variant) {
    case "fullscreen":
      return <FullscreenHero variant={variant} {...props} />;
    case "split":
      return <SplitHero variant={variant} {...props} />;
    case "minimal":
      return <MinimalHero variant={variant} {...props} />;
    default:
      return <FullscreenHero variant={variant} {...props} />;
  }
}
