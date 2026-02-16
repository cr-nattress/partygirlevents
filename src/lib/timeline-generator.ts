/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface TimelineInput {
  ceremonyTime: string; // "14:00", "16:00", etc.
  venueType: "hotel" | "outdoor" | "lodge" | "private-estate" | "restaurant";
  guestCount: number;
  hasCocktailHour: boolean;
  hasFirstLook: boolean;
  receptionStyle:
    | "seated-dinner"
    | "cocktail-reception"
    | "brunch"
    | "family-style";
  season: "summer" | "fall" | "winter" | "spring";
  extras: string[];
}

export interface TimelineEvent {
  time: string; // "2:00 PM"
  label: string;
  duration: number; // minutes
  category: "prep" | "ceremony" | "photos" | "reception" | "extras";
  note?: string;
}

export interface TimelineResult {
  events: TimelineEvent[];
  totalHours: number;
  sunsetTime: string;
  altitudeNotes: string[];
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const SUNSET_TIMES: Record<string, string> = {
  summer: "8:15 PM",
  fall: "6:30 PM",
  winter: "4:45 PM",
  spring: "7:15 PM",
};

const SUNSET_MINUTES: Record<string, number> = {
  summer: 20 * 60 + 15, // 8:15 PM
  fall: 18 * 60 + 30, // 6:30 PM
  winter: 16 * 60 + 45, // 4:45 PM
  spring: 19 * 60 + 15, // 7:15 PM
};

const GOLDEN_HOUR_NOTES: Record<string, string> = {
  summer:
    "Golden hour starts around 7:15 PM in summer — schedule photos accordingly for that warm mountain glow.",
  fall: "Fall golden hour hits around 5:30 PM with aspens adding stunning color. Plan photos early enough to catch it.",
  winter:
    "Winter golden hour is brief, starting around 3:45 PM. If outdoor photos matter, plan them before the ceremony.",
  spring:
    "Spring golden hour begins around 6:15 PM — beautiful soft light, but watch for afternoon rain showers.",
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Parse "HH:MM" (24h) into minutes since midnight. */
function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Convert minutes since midnight to "3:00 PM" format. */
export function formatTime(minutes: number): string {
  // Clamp to 0..1439
  const clamped = ((minutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(clamped / 60);
  const m = clamped % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

/** Get cocktail hour duration adjusted by guest count. */
function cocktailDuration(guestCount: number): number {
  if (guestCount <= 50) return 45;
  if (guestCount <= 100) return 60;
  if (guestCount <= 200) return 75;
  return 90;
}

/** Get ceremony duration by venue type. */
function ceremonyDuration(venueType: TimelineInput["venueType"]): number {
  switch (venueType) {
    case "outdoor":
      return 25; // shorter to mitigate weather
    case "restaurant":
      return 25;
    default:
      return 30;
  }
}

/** Get transition buffer based on venue and guest count. */
function transitionBuffer(
  venueType: TimelineInput["venueType"],
  guestCount: number,
): number {
  const base = venueType === "outdoor" ? 20 : 15;
  if (guestCount > 200) return base + 15;
  if (guestCount > 100) return base + 10;
  return base;
}

/* -------------------------------------------------------------------------- */
/*  Main generator                                                             */
/* -------------------------------------------------------------------------- */

export function generateTimeline(input: TimelineInput): TimelineResult {
  const events: TimelineEvent[] = [];
  const ceremonyStart = parseTime(input.ceremonyTime);
  const sunsetMin = SUNSET_MINUTES[input.season] ?? 19 * 60;

  /* ---- Pre-ceremony events (work backwards) ---- */

  // Hair & makeup start: 3.5 hours before ceremony
  const hamStart = ceremonyStart - 210;
  events.push({
    time: formatTime(hamStart),
    label: "Hair & Makeup Begins",
    duration: 120,
    category: "prep",
    note: "Colorado's dry mountain air can affect hair hold — ask your stylist about altitude-friendly products.",
  });

  // Bridal party arrives for prep: 2 hours before
  const bridalPrepStart = ceremonyStart - 120;
  events.push({
    time: formatTime(bridalPrepStart),
    label: "Bridal Party Gets Ready",
    duration: 60,
    category: "prep",
  });

  // Partner getting ready: 1.5 hours before
  const partnerPrepStart = ceremonyStart - 90;
  events.push({
    time: formatTime(partnerPrepStart),
    label: "Partner Gets Ready",
    duration: 45,
    category: "prep",
  });

  // First look: 1 hour before ceremony
  if (input.hasFirstLook) {
    const firstLookStart = ceremonyStart - 60;
    events.push({
      time: formatTime(firstLookStart),
      label: "First Look",
      duration: 20,
      category: "photos",
      note: "A first look gives you a private, emotional moment and frees up time after the ceremony for the party.",
    });

    // Couple portraits after first look
    events.push({
      time: formatTime(firstLookStart + 20),
      label: "Couple Portraits",
      duration: 30,
      category: "photos",
      note: "Getting portraits done before the ceremony means you can head straight to cocktail hour with your guests.",
    });
  }

  // Vendor arrival (2 hours before ceremony)
  events.push({
    time: formatTime(ceremonyStart - 120),
    label: "Vendors Arrive & Set Up",
    duration: 90,
    category: "prep",
    note: input.venueType === "outdoor"
      ? "Outdoor setups need extra time — mountain weather can shift quickly."
      : undefined,
  });

  // Guest arrival: 30 min before ceremony
  events.push({
    time: formatTime(ceremonyStart - 30),
    label: "Guests Arrive & Are Seated",
    duration: 30,
    category: "ceremony",
    note: "Have water stations set up for guests — altitude dehydrates quickly, especially in summer.",
  });

  /* ---- Ceremony ---- */

  const cerDuration = ceremonyDuration(input.venueType);
  events.push({
    time: formatTime(ceremonyStart),
    label: "Ceremony Begins",
    duration: cerDuration,
    category: "ceremony",
    note: input.venueType === "outdoor"
      ? "Keep outdoor ceremonies under 30 minutes — sun exposure and altitude can wear on guests."
      : undefined,
  });

  let cursor = ceremonyStart + cerDuration;

  /* ---- Post-ceremony ---- */

  // Family & bridal party photos (if no first look, couple portraits happen here too)
  const photosDuration = input.hasFirstLook ? 20 : 45;
  events.push({
    time: formatTime(cursor),
    label: input.hasFirstLook
      ? "Family & Group Photos"
      : "Couple, Family & Group Photos",
    duration: photosDuration,
    category: "photos",
    note: !input.hasFirstLook
      ? "Without a first look, your guests will wait during photos — a cocktail hour is highly recommended."
      : undefined,
  });
  cursor += photosDuration;

  /* ---- Cocktail hour ---- */

  if (input.hasCocktailHour) {
    const cocktailDur = cocktailDuration(input.guestCount);
    events.push({
      time: formatTime(cursor),
      label: "Cocktail Hour",
      duration: cocktailDur,
      category: "reception",
      note: "Remind your bartender that alcohol hits harder at altitude — consider lighter pours and extra water stations.",
    });
    cursor += cocktailDur;
  }

  // Transition to reception
  const transBuffer = transitionBuffer(input.venueType, input.guestCount);
  events.push({
    time: formatTime(cursor),
    label: "Guests Move to Reception",
    duration: transBuffer,
    category: "reception",
  });
  cursor += transBuffer;

  /* ---- Reception ---- */

  // Grand entrance
  events.push({
    time: formatTime(cursor),
    label: "Grand Entrance & Welcome",
    duration: 10,
    category: "reception",
  });
  cursor += 10;

  // First dance
  events.push({
    time: formatTime(cursor),
    label: "First Dance",
    duration: 5,
    category: "reception",
  });
  cursor += 5;

  // Dinner service based on style
  switch (input.receptionStyle) {
    case "seated-dinner": {
      events.push({
        time: formatTime(cursor),
        label: "Dinner Service Begins",
        duration: 75,
        category: "reception",
        note: "Plated dinners take longer at altitude — ovens and cooking times may need adjustment. Your caterer should know.",
      });
      cursor += 75;
      break;
    }
    case "cocktail-reception": {
      events.push({
        time: formatTime(cursor),
        label: "Passed Appetizers & Food Stations",
        duration: 90,
        category: "reception",
        note: "Cocktail receptions keep energy high and let guests mingle naturally. Plan for 8-10 passed items per person.",
      });
      cursor += 90;
      break;
    }
    case "brunch": {
      events.push({
        time: formatTime(cursor),
        label: "Brunch Service",
        duration: 60,
        category: "reception",
        note: "Mountain brunch weddings are underrated — beautiful morning light and lower venue costs.",
      });
      cursor += 60;
      break;
    }
    case "family-style": {
      events.push({
        time: formatTime(cursor),
        label: "Family-Style Dinner",
        duration: 80,
        category: "reception",
        note: "Family-style creates a warm, communal feel that matches the mountain setting perfectly.",
      });
      cursor += 80;
      break;
    }
  }

  // Toasts & speeches
  events.push({
    time: formatTime(cursor),
    label: "Toasts & Speeches",
    duration: 20,
    category: "reception",
    note: "Limit speeches to 3-4 and keep them to 3 minutes each — your guests (and your timeline) will thank you.",
  });
  cursor += 20;

  // Cake cutting
  events.push({
    time: formatTime(cursor),
    label: "Cake Cutting",
    duration: 10,
    category: "reception",
  });
  cursor += 10;

  // Parent dances
  events.push({
    time: formatTime(cursor),
    label: "Parent Dances",
    duration: 10,
    category: "reception",
  });
  cursor += 10;

  // Open dancing
  const dancingDuration = input.receptionStyle === "brunch" ? 45 : 90;
  events.push({
    time: formatTime(cursor),
    label: "Open Dancing",
    duration: dancingDuration,
    category: "reception",
    note: input.extras.includes("live-band")
      ? "Live bands bring incredible energy — make sure your venue can handle the sound at altitude."
      : undefined,
  });
  cursor += dancingDuration;

  /* ---- Sunset photos (if selected and timing is right) ---- */

  if (input.extras.includes("sunset-photos")) {
    // Insert sunset photos near sunset time if it falls during the event
    const sunsetPhotoTime = sunsetMin - 20;
    if (sunsetPhotoTime > ceremonyStart && sunsetPhotoTime < cursor + 60) {
      events.push({
        time: formatTime(sunsetPhotoTime),
        label: "Sunset Golden Hour Photos",
        duration: 20,
        category: "photos",
        note: GOLDEN_HOUR_NOTES[input.season],
      });
    }
  }

  /* ---- Extras ---- */

  if (input.extras.includes("lawn-games")) {
    // Lawn games happen during cocktail hour or reception
    const lawnGamesTime = input.hasCocktailHour
      ? ceremonyStart + cerDuration + photosDuration
      : cursor - dancingDuration;
    events.push({
      time: formatTime(lawnGamesTime),
      label: "Lawn Games Available",
      duration: 60,
      category: "extras",
      note: "Cornhole, croquet, and giant Jenga are mountain wedding favorites.",
    });
  }

  if (input.extras.includes("photo-booth")) {
    events.push({
      time: formatTime(cursor - dancingDuration),
      label: "Photo Booth Opens",
      duration: dancingDuration,
      category: "extras",
      note: "Set up the photo booth near the dance floor — it doubles as entertainment during breaks.",
    });
  }

  if (input.extras.includes("sparkler-exit")) {
    events.push({
      time: formatTime(cursor),
      label: "Sparkler Send-Off",
      duration: 15,
      category: "extras",
      note: "Check your venue's fire policy — some mountain venues restrict sparklers during dry summer months.",
    });
    cursor += 15;
  }

  if (input.extras.includes("after-party")) {
    events.push({
      time: formatTime(cursor + 15),
      label: "After-Party Begins",
      duration: 120,
      category: "extras",
      note: "Hotel venues make after-parties easy — guests can walk to their rooms. Lodge lobbies work great for a casual wind-down.",
    });
    cursor += 135;
  }

  /* ---- Sort events by time ---- */

  const sorted = events.sort((a, b) => {
    return eventToMinutes(a) - eventToMinutes(b);
  });

  // Calculate total hours
  const firstEvent = sorted[0];
  const lastEvent = sorted[sorted.length - 1];
  const firstMin = eventToMinutes(firstEvent);
  const lastMin = eventToMinutes(lastEvent) + lastEvent.duration;
  const totalHours = Math.round(((lastMin - firstMin) / 60) * 10) / 10;

  /* ---- Altitude notes ---- */

  const altitudeNotes: string[] = [
    "Hydration is critical at altitude — have water available at every transition point, not just the bar.",
    "Alcohol affects guests 2-3x faster above 7,000 feet. Consider lighter cocktails and encourage water between drinks.",
  ];

  if (input.venueType === "outdoor") {
    altitudeNotes.push(
      "Sunscreen and shade are essential for outdoor mountain ceremonies — UV exposure is 25% stronger at altitude.",
    );
  }

  if (input.season === "winter") {
    altitudeNotes.push(
      "Have a hot cocoa or cider station for guests — warmth is a wedding favor in the Colorado winter.",
    );
  }

  if (input.season === "summer") {
    altitudeNotes.push(
      "Afternoon thunderstorms roll in like clockwork in Colorado summers, usually around 2-4 PM. Always have a rain plan.",
    );
  }

  if (input.guestCount > 150) {
    altitudeNotes.push(
      "With a larger guest list, build in extra transition time between events. Mountain venues can have tricky walkways and elevations.",
    );
  }

  return {
    events: sorted,
    totalHours,
    sunsetTime: SUNSET_TIMES[input.season] ?? "7:00 PM",
    altitudeNotes,
  };
}

/* -------------------------------------------------------------------------- */
/*  Internal helpers                                                           */
/* -------------------------------------------------------------------------- */

/** Convert a TimelineEvent's display time back to minutes for sorting. */
function eventToMinutes(event: TimelineEvent): number {
  const match = event.time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (!match) return 0;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const period = match[3];
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + m;
}
