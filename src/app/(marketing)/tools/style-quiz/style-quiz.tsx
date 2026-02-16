"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { EmailCapture } from "@/components/tools/EmailCapture";
import type { StyleGuideResult } from "@/app/api/style-quiz/route";

/* ------------------------------------------------------------------ */
/*  Quiz Data                                                          */
/* ------------------------------------------------------------------ */

interface QuizOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: "setting",
    question: "Your dream ceremony setting?",
    options: [
      { id: "mountaintop", label: "Mountaintop", emoji: "\u26F0\uFE0F", description: "Above the treeline with panoramic views" },
      { id: "forest", label: "Forest Glade", emoji: "\uD83C\uDF32", description: "Surrounded by towering pines and aspen" },
      { id: "lodge", label: "Luxury Lodge", emoji: "\uD83C\uDFD4\uFE0F", description: "Elegant indoor space with mountain backdrop" },
      { id: "lakeside", label: "Lakeside", emoji: "\uD83C\uDFDE\uFE0F", description: "Calm waters reflecting the peaks" },
    ],
  },
  {
    id: "season",
    question: "What season speaks to you?",
    options: [
      { id: "winter", label: "Winter", emoji: "\u2744\uFE0F", description: "Snow-covered wonderland and cozy fires" },
      { id: "summer", label: "Summer", emoji: "\u2600\uFE0F", description: "Wildflowers, long days, and golden light" },
      { id: "fall", label: "Autumn", emoji: "\uD83C\uDF41", description: "Golden aspens and crisp mountain air" },
      { id: "spring", label: "Spring", emoji: "\uD83C\uDF38", description: "Fresh blooms and snow-capped peaks" },
    ],
  },
  {
    id: "vibe",
    question: "How would guests describe your celebration?",
    options: [
      { id: "elegant", label: "Black-Tie Elegant", emoji: "\u2728", description: "Refined, luxurious, and unforgettable" },
      { id: "boho", label: "Boho Romantic", emoji: "\uD83C\uDF3F", description: "Free-spirited, natural, and dreamy" },
      { id: "rustic", label: "Mountain Rustic", emoji: "\uD83E\uDEB5", description: "Warm, authentic, and down-to-earth" },
      { id: "modern", label: "Modern Minimal", emoji: "\u25FB\uFE0F", description: "Clean lines, bold choices, less is more" },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    options: [
      { id: "food", label: "Incredible Food", emoji: "\uD83C\uDF7D\uFE0F", description: "A culinary experience guests will rave about" },
      { id: "photos", label: "Stunning Photos", emoji: "\uD83D\uDCF8", description: "Every moment captured beautifully" },
      { id: "music", label: "Amazing Music", emoji: "\uD83C\uDFB6", description: "A dance floor that never empties" },
      { id: "florals", label: "Breathtaking Florals", emoji: "\uD83C\uDF3A", description: "Flowers that take your breath away" },
    ],
  },
  {
    id: "size",
    question: "Your ideal guest count?",
    options: [
      { id: "elopement", label: "Just Us", emoji: "\uD83D\uDC95", description: "2-10 people, intimate and personal" },
      { id: "micro", label: "Micro Wedding", emoji: "\uD83E\uDEC2", description: "20-50 of your closest people" },
      { id: "medium", label: "Classic Celebration", emoji: "\uD83C\uDF89", description: "75-150 guests, the full experience" },
      { id: "large", label: "Grand Affair", emoji: "\uD83C\uDF86", description: "150+ guests, go big or go home" },
    ],
  },
  {
    id: "detail",
    question: "Which detail makes your heart skip?",
    options: [
      { id: "sunset", label: "Golden Hour Ceremony", emoji: "\uD83C\uDF05", description: "Saying vows as the sun dips behind the peaks" },
      { id: "sparkler", label: "Sparkler Send-Off", emoji: "\uD83C\uDF87", description: "A tunnel of light to end the night" },
      { id: "tablescape", label: "Designer Tablescape", emoji: "\uD83D\uDD6F\uFE0F", description: "Every place setting is a work of art" },
      { id: "firstlook", label: "Emotional First Look", emoji: "\uD83E\uDD79", description: "A private, tear-jerking moment" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Style Profiles                                                     */
/* ------------------------------------------------------------------ */

interface StyleProfile {
  name: string;
  tagline: string;
  color: string;
  traits: string[];
}

function computeStyleProfile(answers: Record<string, string>): StyleProfile {
  const scores: Record<string, number> = {
    "Alpine Elegance": 0,
    "Mountain Bohemian": 0,
    "Rustic Luxe": 0,
    "Modern Alpine": 0,
  };

  const mapping: Record<string, Record<string, string>> = {
    setting: { mountaintop: "Alpine Elegance", forest: "Mountain Bohemian", lodge: "Rustic Luxe", lakeside: "Modern Alpine" },
    season: { winter: "Alpine Elegance", summer: "Mountain Bohemian", fall: "Rustic Luxe", spring: "Modern Alpine" },
    vibe: { elegant: "Alpine Elegance", boho: "Mountain Bohemian", rustic: "Rustic Luxe", modern: "Modern Alpine" },
    priority: { food: "Rustic Luxe", photos: "Alpine Elegance", music: "Mountain Bohemian", florals: "Modern Alpine" },
    size: { elopement: "Mountain Bohemian", micro: "Modern Alpine", medium: "Alpine Elegance", large: "Rustic Luxe" },
    detail: { sunset: "Mountain Bohemian", sparkler: "Alpine Elegance", tablescape: "Rustic Luxe", firstlook: "Modern Alpine" },
  };

  for (const [questionId, answer] of Object.entries(answers)) {
    const style = mapping[questionId]?.[answer];
    if (style) scores[style] += 1;
  }

  const topStyle = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  const profiles: Record<string, StyleProfile> = {
    "Alpine Elegance": {
      name: "Alpine Elegance",
      tagline: "Refined luxury meets mountain grandeur",
      color: "#1e3a5f",
      traits: ["Sophisticated color palettes", "Luxury venue spaces", "Dramatic floral installations", "Fine dining experience", "Black-tie optional dress code"],
    },
    "Mountain Bohemian": {
      name: "Mountain Bohemian",
      tagline: "Free-spirited romance in the wild",
      color: "#8b6f47",
      traits: ["Organic textures and wildflowers", "Outdoor ceremony under open sky", "Live acoustic music", "Farm-to-table dining", "Relaxed and personal atmosphere"],
    },
    "Rustic Luxe": {
      name: "Rustic Luxe",
      tagline: "Warmth and sophistication hand in hand",
      color: "#6b4423",
      traits: ["Natural wood and candlelight", "Artisanal food stations", "Cozy lodge atmosphere", "Seasonal local ingredients", "Elegant yet approachable"],
    },
    "Modern Alpine": {
      name: "Modern Alpine",
      tagline: "Clean, bold, and breathtakingly simple",
      color: "#374151",
      traits: ["Minimalist design with impact", "Architectural floral work", "Curated color story", "Unexpected venue choices", "Every detail intentional"],
    },
  };

  return profiles[topStyle];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<StyleProfile | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [guide, setGuide] = useState<StyleGuideResult | null>(null);
  const [guideLoading, setGuideLoading] = useState(false);

  const totalSteps = QUESTIONS.length;
  const isQuizDone = step >= totalSteps;

  async function fetchGuide(styleName: string, quizAnswers: Record<string, string>) {
    setGuideLoading(true);
    try {
      const summary = Object.entries(quizAnswers)
        .map(([qId, aId]) => {
          const q = QUESTIONS.find((q) => q.id === qId);
          const a = q?.options.find((o) => o.id === aId);
          return `${q?.question} → ${a?.label}`;
        })
        .join("\n");

      const res = await fetch("/api/style-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Style: ${styleName}\nAnswers:\n${summary}` }),
      });

      if (res.ok) {
        const data = await res.json();
        setGuide(data);
      }
    } catch {
      // Fail silently — guide is a nice-to-have
    } finally {
      setGuideLoading(false);
    }
  }

  function handleSelect(questionId: string, optionId: string) {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    trackEvent("style_quiz_answer", { question: questionId, answer: optionId, step: step + 1 });

    if (step + 1 < totalSteps) {
      setStep(step + 1);
    } else {
      const computed = computeStyleProfile(newAnswers);
      setProfile(computed);
      setStep(totalSteps);
      trackEvent("style_quiz_completed", { style: computed.name });
      fetchGuide(computed.name, newAnswers);
    }
  }

  // Quiz in progress
  if (!isQuizDone) {
    const question = QUESTIONS[step];
    const progress = (step / totalSteps) * 100;

    return (
      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <div className="mb-2 flex justify-between text-xs text-muted">
              <span>Question {step + 1} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="mb-8 text-center font-serif text-2xl font-semibold md:text-3xl">
                {question.question}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(question.id, option.id)}
                    className="group rounded-xl border border-foreground/10 bg-white p-5 text-left transition-all hover:border-accent hover:shadow-md"
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <p className="mt-2 font-semibold text-foreground group-hover:text-accent">{option.label}</p>
                    <p className="mt-1 text-sm text-muted">{option.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-muted hover:text-foreground">
              &larr; Back
            </button>
          )}
        </div>
      </section>
    );
  }

  // Results
  return (
    <section className="px-4 pb-16 md:px-8">
      <div className="mx-auto max-w-2xl">
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Style header */}
            <div className="text-center">
              <div
                className="mx-auto mb-4 inline-block rounded-full px-6 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: profile.color }}
              >
                Your Style
              </div>
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">{profile.name}</h2>
              <p className="mt-2 text-lg text-muted">{profile.tagline}</p>
            </div>

            {/* Traits */}
            <div className="rounded-xl border border-foreground/10 bg-white p-6">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Signature Traits</h3>
              <div className="flex flex-wrap gap-2">
                {profile.traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-foreground/10 px-3 py-1.5 text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Email gate */}
            {!unlocked ? (
              <div className="rounded-xl border border-foreground/10 bg-white p-6">
                <EmailCapture
                  source="style_quiz"
                  headline="Unlock Your Full Style Guide"
                  description="Get personalized venue recommendations, a curated color palette, design element ideas, and an insider planning tip."
                  ctaLabel="Reveal My Style Guide"
                  variant="inline"
                  metadata={{ style: profile.name, answers: JSON.stringify(answers) }}
                  onCaptured={() => setUnlocked(true)}
                />
              </div>
            ) : (
              <>
                {guideLoading ? (
                  <LoadingGuide />
                ) : guide ? (
                  <StyleGuideDisplay guide={guide} profileColor={profile.color} />
                ) : (
                  <div className="rounded-xl border border-foreground/10 bg-white p-6 text-center text-sm text-muted">
                    We couldn&rsquo;t generate your style guide right now. Try refreshing the page.
                  </div>
                )}
              </>
            )}

            {/* CTA */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
              <p className="font-semibold text-foreground">
                Love your style? Let&rsquo;s bring it to life.
              </p>
              <p className="mt-1 text-sm text-muted">
                Stephanie specializes in {profile.name.toLowerCase()} weddings across the Colorado mountains.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-block rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                Book a Discovery Call
              </a>
            </div>

            {/* Retake */}
            <div className="text-center">
              <button
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                  setProfile(null);
                  setUnlocked(false);
                  setGuide(null);
                }}
                className="text-sm text-muted hover:text-foreground"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading skeleton                                                   */
/* ------------------------------------------------------------------ */

function LoadingGuide() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-foreground/10 bg-white p-6">
        <div className="flex items-center gap-3">
          <svg className="h-5 w-5 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium text-muted">Creating your personalized style guide...</span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-foreground/5" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-foreground/5" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-foreground/5" />
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-28 animate-pulse rounded-xl border border-foreground/5 bg-foreground/[0.02]" />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Style Guide Display                                                */
/* ------------------------------------------------------------------ */

function StyleGuideDisplay({ guide, profileColor }: { guide: StyleGuideResult; profileColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, staggerChildren: 0.1 }}
      className="space-y-6"
    >
      {/* Description */}
      <div className="rounded-xl border border-foreground/10 bg-white p-6">
        <div className="border-l-4 pl-4" style={{ borderColor: profileColor }}>
          <p className="font-serif text-lg leading-relaxed text-foreground/80 italic">
            &ldquo;{guide.description}&rdquo;
          </p>
          <p className="mt-2 text-xs font-medium text-muted">&mdash; Stephanie Fleck, Party Girl Events</p>
        </div>
      </div>

      {/* Color Palette */}
      <div className="rounded-xl border border-foreground/10 bg-white p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Your Color Palette</h3>
        <div className="flex gap-3">
          {guide.colors.map((color) => (
            <div key={color.hex} className="flex-1 text-center">
              <div
                className="mx-auto aspect-square w-full max-w-[72px] rounded-xl shadow-sm ring-1 ring-black/5"
                style={{ backgroundColor: color.hex }}
              />
              <p className="mt-2 text-xs font-medium text-foreground">{color.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Venue Recommendations */}
      <div className="rounded-xl border border-foreground/10 bg-white p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Venue Recommendations</h3>
        <div className="space-y-4">
          {guide.venues.map((venue) => (
            <div key={venue.name} className="flex gap-4">
              <div
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: profileColor }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">{venue.name}</p>
                <p className="text-xs text-muted">{venue.location}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">{venue.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Elements */}
      <div className="rounded-xl border border-foreground/10 bg-white p-6">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Design Elements</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {guide.designElements.map((element) => (
            <div key={element} className="flex items-start gap-2.5">
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: profileColor }} />
              <p className="text-sm leading-relaxed text-foreground/80">{element}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insider Tip */}
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: `${profileColor}0D`, borderLeft: `4px solid ${profileColor}` }}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-lg">&#x1F48E;</span>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: profileColor }}>
              Insider Tip from Stephanie
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{guide.insiderTip}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
