"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompletion } from "ai/react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { EmailCapture } from "@/components/tools/EmailCapture";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const MAX_CHARS = 500;
const MIN_CHARS = 10;

const INSPIRATION_CHIPS = [
  { label: "Candlelit", text: "candlelit" },
  { label: "Wildflowers", text: "wildflowers" },
  { label: "Modern Minimal", text: "modern minimal" },
  { label: "Boho Chic", text: "boho chic" },
  { label: "Black Tie", text: "black tie" },
  { label: "Garden Party", text: "garden party" },
  { label: "Adventure", text: "adventure" },
  { label: "Cozy Lodge", text: "cozy lodge" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Parsing utilities                                                          */
/* -------------------------------------------------------------------------- */

interface ParsedVibe {
  vibeName: string;
  colors: { name: string; hex: string; usage: string }[];
  venue: string;
  florals: string;
  atmosphere: string;
  stephanieTip: string;
}

function parseVibeResponse(text: string): ParsedVibe | null {
  if (!text || text.length < 50) return null;

  const vibeName = extractSection(text, "VIBE NAME:");
  const venue = extractSection(text, "VENUE DIRECTION:");
  const florals = extractSection(text, "FLORALS & DECOR:");
  const atmosphere = extractSection(text, "ATMOSPHERE & MUSIC:");
  const stephanieTip = extractSection(text, "STEPHANIE'S TIP:");
  const colors = extractColors(text);

  if (!vibeName) return null;

  return { vibeName, colors, venue, florals, atmosphere, stephanieTip };
}

function extractSection(text: string, header: string): string {
  const headerPattern = header.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `\\*\\*${headerPattern}\\*\\*\\s*(.+?)(?=\\n\\*\\*[A-Z]|$)`,
    "s",
  );
  const match = text.match(regex);
  if (!match) return "";
  return match[1].trim();
}

function extractColors(
  text: string,
): { name: string; hex: string; usage: string }[] {
  const colors: { name: string; hex: string; usage: string }[] = [];
  // Match lines like: - Color Name: #hex — usage description
  const colorRegex =
    /^-\s*(.+?):\s*#([0-9A-Fa-f]{3,8})\s*[—\-–]\s*(.+)$/gm;
  let match;
  while ((match = colorRegex.exec(text)) !== null) {
    colors.push({
      name: match[1].trim(),
      hex: `#${match[2].trim()}`,
      usage: match[3].trim(),
    });
  }
  return colors;
}

/* -------------------------------------------------------------------------- */
/*  Color Swatch component                                                     */
/* -------------------------------------------------------------------------- */

function ColorSwatch({
  color,
  index,
}: {
  color: { name: string; hex: string; usage: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="flex items-center gap-3"
    >
      <div
        className="h-12 w-12 shrink-0 rounded-full border border-foreground/10 shadow-sm"
        style={{ backgroundColor: color.hex }}
        title={color.hex}
      />
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">
          {color.name}{" "}
          <span className="font-mono text-xs text-muted">{color.hex}</span>
        </p>
        <p className="text-sm text-muted">{color.usage}</p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Result Card component                                                      */
/* -------------------------------------------------------------------------- */

function ResultCard({
  title,
  icon,
  children,
  delay = 0,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-lg border border-foreground/10 bg-background p-5 sm:p-6"
    >
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
        {icon}
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-foreground/80">
        {children}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Results View                                                               */
/* -------------------------------------------------------------------------- */

function VibeResults({
  parsed,
  onReset,
}: {
  parsed: ParsedVibe;
  onReset: () => void;
}) {
  const hasTrackedRef = useRef(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      trackEvent("vibe_translate_completed", {
        vibeName: parsed.vibeName,
        colorCount: parsed.colors.length,
      });
      hasTrackedRef.current = true;
    }
  }, [parsed]);

  return (
    <div className="space-y-10">
      {/* Vibe Name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Your Wedding Vibe
        </p>
        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {parsed.vibeName}
        </h2>
      </motion.div>

      {/* Color Palette */}
      {parsed.colors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="mb-5 text-center font-serif text-lg font-semibold">
            Your Color Palette
          </h3>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {parsed.colors.map((color, i) => (
              <ColorSwatch key={`${color.hex}-${i}`} color={color} index={i} />
            ))}
          </div>

          {/* Palette preview strip */}
          <div className="mx-auto mt-6 flex max-w-md overflow-hidden rounded-lg shadow-sm">
            {parsed.colors.map((color, i) => (
              <div
                key={`strip-${color.hex}-${i}`}
                className="h-10 flex-1"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Detail Cards */}
      <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
        {parsed.venue && (
          <ResultCard
            title="Venue Direction"
            delay={0.2}
            icon={
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
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z"
                />
              </svg>
            }
          >
            {parsed.venue}
          </ResultCard>
        )}

        {parsed.florals && (
          <ResultCard
            title="Florals & Decor"
            delay={0.3}
            icon={
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
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            }
          >
            {parsed.florals}
          </ResultCard>
        )}

        {parsed.atmosphere && (
          <ResultCard
            title="Atmosphere & Music"
            delay={0.4}
            icon={
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
                  d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                />
              </svg>
            }
          >
            {parsed.atmosphere}
          </ResultCard>
        )}
      </div>

      {/* Stephanie's Tip */}
      {parsed.stephanieTip && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto max-w-2xl rounded-lg border border-secondary/20 bg-secondary-50 p-5 sm:p-6"
        >
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-secondary-700">
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
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            Stephanie&rsquo;s Tip
          </h4>
          <p className="text-sm leading-relaxed text-foreground/80">
            {parsed.stephanieTip}
          </p>
        </motion.div>
      )}

      {/* Save vibe board — email capture */}
      {!saved ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <EmailCapture
            source="vibe_translator"
            headline="Save your vibe board"
            description="Enter your email to save this design direction. We'll send you a copy so you can share it with your partner or reference it when venue shopping."
            ctaLabel="Save & Email"
            metadata={{
              vibeName: parsed.vibeName,
              colorCount: parsed.colors.length,
              colors: parsed.colors.map((c) => c.hex),
            }}
            onCaptured={() => setSaved(true)}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl rounded-lg border border-green-200 bg-green-50 p-5 text-center"
        >
          <p className="font-medium text-green-800">
            Saved! Check your inbox for your vibe board.
          </p>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mx-auto max-w-2xl rounded-lg border border-accent/20 bg-accent/5 p-6 text-center sm:p-8"
      >
        <h3 className="font-serif text-xl font-semibold">
          Love this direction? Let&rsquo;s make it real.
        </h3>
        <p className="mt-2 text-sm text-muted">
          Book a free discovery call and we&rsquo;ll start turning your vibe
          into a concrete plan with real Colorado venues, vendors, and timelines.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="primary"
            size="lg"
            asChild
            onClick={() =>
              trackEvent("vibe_cta_clicked", {
                cta: "discovery_call",
                vibeName: parsed.vibeName,
              })
            }
          >
            <Link href="/contact">Book a Free Discovery Call</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={onReset}>
            Start Over
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main form component                                                        */
/* -------------------------------------------------------------------------- */

export function VibeTranslatorForm() {
  const [description, setDescription] = useState("");
  const [parsed, setParsed] = useState<ParsedVibe | null>(null);
  const [phase, setPhase] = useState<"input" | "loading" | "results">("input");
  const hasTrackedStartRef = useRef(false);

  const { completion, isLoading, complete, setCompletion } = useCompletion({
    api: "/api/vibe-translate",
  });

  /* Track start event once */
  useEffect(() => {
    if (!hasTrackedStartRef.current) {
      trackEvent("vibe_translator_started");
      hasTrackedStartRef.current = true;
    }
  }, []);

  /* Parse the streaming response as it arrives */
  useEffect(() => {
    if (completion) {
      const result = parseVibeResponse(completion);
      if (result && result.vibeName && phase !== "results") {
        setParsed(result);
      }
      // Keep updating the parsed result as more content streams in
      if (result) {
        setParsed(result);
      }
    }
  }, [completion, phase]);

  /* Transition to results when loading finishes and we have data */
  useEffect(() => {
    if (!isLoading && parsed && phase === "loading") {
      setPhase("results");
    }
  }, [isLoading, parsed, phase]);

  const handleSubmit = useCallback(async () => {
    if (description.trim().length < MIN_CHARS) return;

    trackEvent("vibe_translator_submitted", {
      descriptionLength: description.trim().length,
    });

    setPhase("loading");
    setParsed(null);

    await complete("", {
      body: { description: description.trim() },
    });
  }, [description, complete]);

  const handleReset = useCallback(() => {
    setDescription("");
    setParsed(null);
    setCompletion("");
    setPhase("input");
  }, [setCompletion]);

  const handleChipClick = useCallback(
    (text: string) => {
      setDescription((prev) => {
        const trimmed = prev.trim();
        if (trimmed.length === 0) return text;
        const separator = trimmed.endsWith(",") ? " " : ", ";
        const next = trimmed + separator + text;
        return next.length <= MAX_CHARS ? next : prev;
      });
    },
    [],
  );

  const charCount = description.length;
  const canSubmit = description.trim().length >= MIN_CHARS && !isLoading;

  return (
    <section className="pb-20">
      <Container narrow>
        <AnimatePresence mode="wait">
          {/* ---- Input Phase ---- */}
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                  Describe your dream wedding
                </h2>
                <p className="mt-2 text-muted">
                  Think mood, colors, feelings, references &mdash; there are no
                  wrong answers.
                </p>
              </div>

              {/* Textarea */}
              <div>
                <textarea
                  value={description}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) {
                      setDescription(e.target.value);
                    }
                  }}
                  placeholder="Tell us about your dream wedding... think mood, colors, feelings, references. For example: 'Rustic but elegant, lots of candles, autumn vibes, intimate gathering, not stuffy, think Napa Valley meets mountain lodge'"
                  rows={5}
                  className={cn(
                    "w-full resize-none rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 transition-colors duration-200",
                    "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
                    "border-foreground/10",
                  )}
                />
                <div className="mt-1.5 flex items-center justify-between">
                  <p className="text-xs text-muted">
                    {charCount < MIN_CHARS && charCount > 0 && (
                      <span className="text-accent">
                        At least {MIN_CHARS} characters needed
                      </span>
                    )}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      charCount > MAX_CHARS * 0.9
                        ? "text-accent"
                        : "text-muted",
                    )}
                  >
                    {charCount}/{MAX_CHARS}
                  </p>
                </div>
              </div>

              {/* Inspiration Chips */}
              <div>
                <p className="mb-3 text-center text-sm text-muted">
                  Need inspiration? Click to add:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {INSPIRATION_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => handleChipClick(chip.text)}
                      className={cn(
                        "rounded-full border border-foreground/15 bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all duration-200",
                        "hover:border-accent/40 hover:bg-accent/5 hover:text-accent",
                        "active:scale-95",
                      )}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  Translate My Vibe
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                </Button>
              </div>
            </motion.div>
          )}

          {/* ---- Loading Phase ---- */}
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex min-h-[300px] flex-col items-center justify-center space-y-6 text-center"
            >
              <div className="relative">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-foreground/10 border-t-accent" />
              </div>
              <div>
                <p className="font-serif text-xl font-semibold text-foreground">
                  Translating your vibe...
                </p>
                <p className="mt-2 text-sm text-muted">
                  Our AI wedding designer is crafting your personalized design
                  direction.
                </p>
              </div>

              {/* Show streaming preview */}
              {parsed?.vibeName && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <p className="text-sm text-muted">Your vibe is shaping up as...</p>
                  <p className="mt-1 font-serif text-2xl font-semibold text-accent">
                    {parsed.vibeName}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ---- Results Phase ---- */}
          {phase === "results" && parsed && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <VibeResults parsed={parsed} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
