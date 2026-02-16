"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";

interface Stage {
  number: number;
  title: string;
  description: string;
  whatYouDo: string;
  whatStephanieDoes: string;
  duration: string;
  ctaText?: string;
  ctaHref?: string;
}

const stages: Stage[] = [
  {
    number: 1,
    title: "Say Hello",
    description:
      "It all starts with a simple inquiry. Fill out the form on our contact page and tell us a little about your celebration. We will respond within 24 hours to set up a time to chat.",
    whatYouDo:
      "Fill out the inquiry form with your date, venue ideas, guest count, and a bit about your vision.",
    whatStephanieDoes:
      "Reviews your inquiry, researches your date and venue availability, and sends a personalized response within 24 hours.",
    duration: "Day 1",
  },
  {
    number: 2,
    title: "Discovery Call",
    description:
      "A complimentary 30-minute call where we get to know each other. This is a two-way conversation to make sure we are the right fit for your celebration.",
    whatYouDo:
      "Share your vision, priorities, and any questions you have about the planning process.",
    whatStephanieDoes:
      "Listens carefully, asks thoughtful questions, and provides honest guidance on what is realistic for your date, budget, and vision.",
    duration: "Week 1",
    ctaText: "Book Your Discovery Call",
    ctaHref: "/contact",
  },
  {
    number: 3,
    title: "Custom Proposal",
    description:
      "Based on our conversation, Stephanie creates a tailored proposal outlining the recommended service level, detailed pricing, and a planning roadmap specific to your wedding.",
    whatYouDo:
      "Review the proposal, ask any questions, and take the time you need to make your decision.",
    whatStephanieDoes:
      "Crafts a detailed proposal with the recommended service level, transparent pricing, and a customized planning roadmap. Delivered within 3-5 business days.",
    duration: "3-5 Days",
  },
  {
    number: 4,
    title: "Let's Make It Official",
    description:
      "Once you are ready to move forward, we sign the contract, collect the retainer, and officially begin your planning journey together.",
    whatYouDo:
      "Review and sign the contract, submit your retainer payment, and complete the onboarding questionnaire.",
    whatStephanieDoes:
      "Sends the contract and onboarding materials, sets up your shared planning portal, and schedules your kick-off session.",
    duration: "1-2 Weeks",
  },
  {
    number: 5,
    title: "The Fun Part",
    description:
      "This is where the magic happens. Together, we bring your vision to life through venue tours, vendor selection, design concepting, tastings, and all the details that make your celebration uniquely yours.",
    whatYouDo:
      "Attend tastings, review mood boards, make decisions on vendors and design, and enjoy the creative process.",
    whatStephanieDoes:
      "Sources and vets vendors, creates design concepts, manages the budget, coordinates logistics, and keeps everything on track and on timeline.",
    duration: "3-12 Months",
  },
  {
    number: 6,
    title: "Your Perfect Day",
    description:
      "The day you have been dreaming about. Stephanie and her team manage every detail from setup to send-off so you can be fully present with your partner, your people, and the moment.",
    whatYouDo:
      "Show up, be present, and soak in every single moment. This is your day to enjoy.",
    whatStephanieDoes:
      "Manages the full timeline, coordinates all vendors, handles any surprises behind the scenes, and ensures every detail is executed beautifully.",
    duration: "1-2 Days",
  },
  {
    number: 7,
    title: "After the Celebration",
    description:
      "The wedding may be over, but the service is not. Stephanie handles all the post-event logistics so you can start your married life without a to-do list.",
    whatYouDo:
      "Enjoy being newlyweds. Send photos when you get them.",
    whatStephanieDoes:
      "Coordinates vendor returns, handles final payments, collects your belongings, and checks in to make sure your transition to married life is seamless.",
    duration: "1-2 Weeks",
  },
];

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-8">
      {/* Left content (even stages on desktop) */}
      <div
        className={cn(
          "hidden md:block",
          isEven ? "md:text-right" : "md:order-3",
        )}
      >
        {isEven && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : prefersReducedMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="rounded-lg border border-foreground/5 bg-surface p-6 shadow-sm"
          >
            <StageContent stage={stage} />
          </motion.div>
        )}
      </div>

      {/* Center timeline marker */}
      <div className="absolute left-4 top-0 z-10 flex md:static md:flex-col md:items-center">
        <motion.div
          initial={prefersReducedMotion ? false : { scale: 0.5, opacity: 0 }}
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : prefersReducedMotion
                ? { scale: 1, opacity: 1 }
                : { scale: 0.5, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-serif text-lg font-semibold transition-colors duration-500",
            isInView
              ? "border-accent bg-accent text-white"
              : "border-foreground/20 bg-surface text-muted",
          )}
        >
          {stage.number}
        </motion.div>
      </div>

      {/* Right content (odd stages on desktop) */}
      <div
        className={cn(
          "hidden md:block",
          isEven ? "md:order-3" : "",
        )}
      >
        {!isEven && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : prefersReducedMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="rounded-lg border border-foreground/5 bg-surface p-6 shadow-sm"
          >
            <StageContent stage={stage} />
          </motion.div>
        )}
      </div>

      {/* Mobile content (always visible on mobile) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="ml-14 rounded-lg border border-foreground/5 bg-surface p-5 shadow-sm md:hidden"
      >
        <StageContent stage={stage} />
      </motion.div>
    </div>
  );
}

function StageContent({ stage }: { stage: Stage }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h3 className="font-serif text-xl font-semibold text-foreground md:text-2xl">
          {stage.title}
        </h3>
        <Badge variant="accent">{stage.duration}</Badge>
      </div>
      <p className="text-sm leading-relaxed text-muted">{stage.description}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-background p-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            What You Do
          </p>
          <p className="text-sm leading-relaxed text-muted">
            {stage.whatYouDo}
          </p>
        </div>
        <div className="rounded-md bg-background p-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-700">
            What Stephanie Does
          </p>
          <p className="text-sm leading-relaxed text-muted">
            {stage.whatStephanieDoes}
          </p>
        </div>
      </div>

      {stage.ctaText && stage.ctaHref && (
        <div className="mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={stage.ctaHref}>{stage.ctaText}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export function ProcessTimeline() {
  return (
    <div className="relative">
      {/* Desktop center line */}
      <div
        className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-foreground/10 md:block"
        aria-hidden="true"
      />

      {/* Mobile left line */}
      <div
        className="absolute left-[2.15rem] top-0 h-full w-px bg-foreground/10 md:hidden"
        aria-hidden="true"
      />

      <div className="space-y-12 md:space-y-16">
        {stages.map((stage, index) => (
          <StageCard key={stage.number} stage={stage} index={index} />
        ))}
      </div>
    </div>
  );
}
