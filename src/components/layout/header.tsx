"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Full Service Planning", href: "/services#full-service" },
      { label: "Wedding Management", href: "/services#management" },
      { label: "Elopement Planning", href: "/services#elopements" },
      { label: "Special Events", href: "/services#events" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Tools",
    href: "/tools/style-quiz",
    children: [
      { label: "Wedding Style Quiz", href: "/tools/style-quiz" },
      { label: "Budget Estimator", href: "/tools/budget-estimator" },
      { label: "Vibe Translator", href: "/tools/vibe-translator" },
      { label: "Timeline Generator", href: "/tools/timeline" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Scroll listener
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Escape key closes mobile menu
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    },
    [mobileOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "h-16 bg-background/80 shadow-sm backdrop-blur-xl"
          : "h-20 bg-background",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8 lg:px-16"
      >
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-serif font-bold tracking-tight text-foreground transition-all duration-300",
            scrolled ? "text-lg" : "text-xl",
          )}
        >
          Party Girl Events
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);

            if ("children" in link && link.children) {
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-accent"
                        : "text-foreground/80 hover:text-accent",
                    )}
                    {...(active ? { "aria-current": "page" as const } : {})}
                  >
                    {link.label}
                    <svg
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        openDropdown === link.label && "rotate-180",
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <div
                    className={cn(
                      "absolute left-0 top-full pt-2 transition-all duration-200",
                      openDropdown === link.label
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0",
                    )}
                  >
                    <ul className="w-56 rounded-md border border-foreground/10 bg-surface p-2 shadow-lg">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-sm px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-accent"
                      : "text-foreground/80 hover:text-accent",
                  )}
                  {...(active ? { "aria-current": "page" as const } : {})}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button variant="primary" size="sm" asChild>
            <Link href="/contact">Start Planning</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex w-6 flex-col items-center gap-[5px]">
            <span
              className={cn(
                "block h-[2px] w-6 rounded-full bg-foreground transition-all duration-300",
                mobileOpen && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-6 rounded-full bg-foreground transition-all duration-300",
                mobileOpen && "scale-x-0 opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-6 rounded-full bg-foreground transition-all duration-300",
                mobileOpen && "-translate-y-[7px] -rotate-45",
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-background/98 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Close button in top-right */}
          <button
            type="button"
            className="absolute right-4 top-5 flex h-10 w-10 items-center justify-center"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6 text-foreground"
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

          {/* Nav Links */}
          <nav
            className="flex flex-1 flex-col items-center justify-center gap-6"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);

              return (
                <div key={link.href} className="flex flex-col items-center">
                  <Link
                    href={link.href}
                    className={cn(
                      "text-2xl font-medium transition-colors",
                      active
                        ? "text-accent"
                        : "text-foreground/80 hover:text-accent",
                    )}
                    onClick={() => setMobileOpen(false)}
                    {...(active ? { "aria-current": "page" as const } : {})}
                  >
                    {link.label}
                  </Link>

                  {"children" in link && link.children && (
                    <div className="mt-2 flex flex-col items-center gap-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-base text-foreground/60 transition-colors hover:text-accent"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile CTA */}
            <div className="mt-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  Start Planning
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
