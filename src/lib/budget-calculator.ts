export interface BudgetInput {
  guestCount: number;
  location:
    | "vail"
    | "aspen"
    | "breckenridge"
    | "beaver-creek"
    | "keystone"
    | "other-colorado";
  season: "summer" | "fall" | "winter" | "spring";
  weddingStyle:
    | "intimate-luxury"
    | "classic-elegant"
    | "rustic-mountain"
    | "adventure-elopement"
    | "modern-minimal";
  priorities: string[];
}

export interface BudgetBreakdown {
  totalLow: number;
  totalHigh: number;
  categories: {
    name: string;
    label: string;
    low: number;
    high: number;
    percentage: number;
    tip: string;
  }[];
  perGuest: { low: number; high: number };
  locationNote: string;
  seasonNote: string;
}

/* -------------------------------------------------------------------------- */
/*  Colorado-specific pricing data                                             */
/* -------------------------------------------------------------------------- */

const LOCATION_MULTIPLIERS: Record<string, number> = {
  vail: 1.3,
  aspen: 1.5,
  "beaver-creek": 1.25,
  breckenridge: 1.0,
  keystone: 0.9,
  "other-colorado": 0.85,
};

const SEASON_MULTIPLIERS: Record<string, number> = {
  summer: 1.15,
  fall: 1.1,
  winter: 0.9,
  spring: 0.8,
};

const STYLE_ADJUSTMENTS: Record<string, number> = {
  "intimate-luxury": 1.4,
  "classic-elegant": 1.15,
  "rustic-mountain": 0.95,
  "adventure-elopement": 0.6,
  "modern-minimal": 1.0,
};

/** Base per-guest ranges (Colorado mountain average) */
const BASE_CATEGORIES = [
  {
    name: "venue",
    label: "Venue & Rentals",
    baseLow: 80,
    baseHigh: 250,
    pct: 28,
    tip: "Many Colorado mountain venues include tables, chairs, and basic linens. Ask what\u2019s included before renting separately.",
  },
  {
    name: "catering",
    label: "Catering & Bar",
    baseLow: 100,
    baseHigh: 300,
    pct: 30,
    tip: "Altitude affects alcohol tolerance \u2014 consider lighter cocktail options. Passed appetizers work beautifully for mountain receptions.",
  },
  {
    name: "photography",
    label: "Photography & Video",
    baseLow: 30,
    baseHigh: 100,
    pct: 10,
    tip: "Mountain light is magical but tricky. Hire a photographer who knows Colorado\u2019s golden hour timing and weather patterns.",
  },
  {
    name: "florals",
    label: "Florals & Decor",
    baseLow: 25,
    baseHigh: 100,
    pct: 10,
    tip: "Colorado\u2019s natural beauty reduces decor needs. Wildflower-inspired arrangements often cost less than imported exotic blooms.",
  },
  {
    name: "music",
    label: "Music & Entertainment",
    baseLow: 15,
    baseHigh: 60,
    pct: 5,
    tip: "Sound carries differently at altitude. Test speaker placement during setup \u2014 mountain acoustics can be surprising.",
  },
  {
    name: "planner",
    label: "Wedding Planner",
    baseLow: 25,
    baseHigh: 80,
    pct: 12,
    tip: "A mountain wedding planner isn\u2019t a luxury \u2014 it\u2019s a logistics necessity. Weather plans, altitude prep, and vendor relationships are worth every penny.",
  },
  {
    name: "attire",
    label: "Attire & Beauty",
    baseLow: 10,
    baseHigh: 40,
    pct: 5,
    tip: "Consider altitude-friendly fabrics and comfortable shoes for mountain terrain. Hair and makeup artists should know how to work in dry mountain air.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Location & Season notes                                                    */
/* -------------------------------------------------------------------------- */

const LOCATION_NOTES: Record<string, string> = {
  vail: "Vail is a premium mountain destination. Venue fees are among the highest in Colorado, but the walkable village and world-class infrastructure reduce transportation costs.",
  aspen:
    "Aspen is the most expensive market in Colorado. Budget 30\u201350% more than other mountain towns. The payoff is unmatched venue quality and a legendary setting.",
  breckenridge:
    "Breckenridge offers the best value-to-scenery ratio in Summit County. Great variety from rustic lodges to modern venues, with reasonable pricing.",
  "beaver-creek":
    "Beaver Creek is Vail\u2019s quieter, more exclusive neighbor. Slightly lower than Vail pricing with equally stunning venues and a more intimate village feel.",
  keystone:
    "Keystone is the most budget-friendly of the major resort towns. The Keystone Conference Center and lakeside venues offer beautiful settings at accessible prices.",
  "other-colorado":
    "Colorado\u2019s lesser-known mountain towns (Telluride, Steamboat, Estes Park, etc.) often offer significant savings with equally stunning scenery.",
};

const SEASON_NOTES: Record<string, string> = {
  summer:
    "Peak season (June\u2013September) means the best weather but highest demand. Book venues 12\u201318 months ahead. Afternoon thunderstorms are normal \u2014 always have an indoor backup.",
  fall: "September\u2013October brings golden aspens and crisp air. One of the most photographed seasons. Weather is less predictable \u2014 plan for anything from 70\u00b0F to snow.",
  winter:
    "November\u2013March offers magical snow-covered venues, lower demand, and 10\u201320% savings on many vendors. Plan for road conditions and guest transportation.",
  spring:
    "April\u2013May is the shoulder season. Expect mud season (April) but beautiful conditions by late May. Budget savings of 15\u201325% are common.",
};

/* -------------------------------------------------------------------------- */
/*  Calculator                                                                 */
/* -------------------------------------------------------------------------- */

export function calculateBudget(input: BudgetInput): BudgetBreakdown {
  const locationMult = LOCATION_MULTIPLIERS[input.location] ?? 1.0;
  const seasonMult = SEASON_MULTIPLIERS[input.season] ?? 1.0;
  const styleMult = STYLE_ADJUSTMENTS[input.weddingStyle] ?? 1.0;

  const categories = BASE_CATEGORIES.map((cat) => {
    const isPriority = input.priorities.includes(cat.name);
    const priorityMult = isPriority ? 1.25 : 0.9;

    const low = Math.round(
      cat.baseLow *
        input.guestCount *
        locationMult *
        seasonMult *
        styleMult *
        priorityMult,
    );
    const high = Math.round(
      cat.baseHigh *
        input.guestCount *
        locationMult *
        seasonMult *
        styleMult *
        priorityMult,
    );

    return {
      name: cat.name,
      label: cat.label,
      low,
      high,
      percentage: cat.pct,
      tip: cat.tip,
    };
  });

  const totalLow = categories.reduce((sum, c) => sum + c.low, 0);
  const totalHigh = categories.reduce((sum, c) => sum + c.high, 0);

  return {
    totalLow,
    totalHigh,
    categories,
    perGuest: {
      low: Math.round(totalLow / input.guestCount),
      high: Math.round(totalHigh / input.guestCount),
    },
    locationNote: LOCATION_NOTES[input.location] ?? "",
    seasonNote: SEASON_NOTES[input.season] ?? "",
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
