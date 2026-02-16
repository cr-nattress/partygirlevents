import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { timeline, input } = await req.json();

    const eventSummary = timeline.events
      .map(
        (e: { time: string; label: string; duration: number }) =>
          `${e.time} — ${e.label} (${e.duration} min)`,
      )
      .join("\n");

    const prompt = `You are Stephanie, a Colorado mountain wedding planner with 10+ years of experience. A couple has just generated their wedding day timeline using your website tool. Review their timeline and provide 3-4 specific, actionable tips.

Their wedding details:
- Ceremony time: ${input.ceremonyTime}
- Venue type: ${input.venueType}
- Guest count: ${input.guestCount}
- Season: ${input.season}
- Reception style: ${input.receptionStyle}
- First look: ${input.hasFirstLook ? "Yes" : "No"}
- Cocktail hour: ${input.hasCocktailHour ? "Yes" : "No"}
- Extras: ${input.extras.length > 0 ? input.extras.join(", ") : "None"}
- Sunset time: ${timeline.sunsetTime}

Their timeline:
${eventSummary}

Total event duration: ${timeline.totalHours} hours

Give 3-4 specific tips about their timeline. Focus on Colorado mountain logistics, timing optimizations, and things couples often overlook. Be warm and practical — not salesy. Each tip should be 1-2 sentences. End by mentioning that a discovery call can help fine-tune every detail.`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      prompt,
      maxTokens: 300,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch {
    return new Response("Unable to generate timeline tips.", { status: 500 });
  }
}
