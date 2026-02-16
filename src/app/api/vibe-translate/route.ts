import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    if (process.env.AI_VIBE_TRANSLATOR_ENABLED === "false") {
      return new Response("Vibe translator is temporarily unavailable.", {
        status: 503,
      });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const { allowed } = await checkRateLimit(`vibe:${ip}`, 5, 86_400_000);
    if (!allowed) {
      return new Response(
        "You've reached the daily limit for vibe translations. Book a free discovery call to explore your wedding style with Stephanie!",
        { status: 429 },
      );
    }

    const { description } = await req.json();

    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length < 10
    ) {
      return new Response(
        JSON.stringify({
          error:
            "Please describe your wedding vibe in at least a few words.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      maxTokens: 800,
      temperature: 0.8,
      system: `You are a creative wedding designer specializing in Colorado mountain weddings. A couple will describe their dream wedding vibe in casual language. Translate their description into a detailed, inspiring design direction.

Respond in this EXACT format (use these section headers):

**VIBE NAME:** [A creative 2-4 word name for their style, e.g., "Alpine Romance" or "Mountain Bohemian Luxe"]

**COLOR PALETTE:**
- [Color Name]: #[hex] — [where to use it]
- [Color Name]: #[hex] — [where to use it]
- [Color Name]: #[hex] — [where to use it]
- [Color Name]: #[hex] — [where to use it]
- [Color Name]: #[hex] — [where to use it]

**VENUE DIRECTION:**
[2-3 sentences about the ideal venue type and specific Colorado venue recommendations]

**FLORALS & DECOR:**
[2-3 sentences about floral style, specific flowers, and key decor elements]

**ATMOSPHERE & MUSIC:**
[2-3 sentences about the overall feel, lighting, and music style]

**STEPHANIE'S TIP:**
[1-2 sentences of practical mountain wedding advice related to this vibe]`,
      prompt: `Here's how the couple describes their dream wedding: "${description.trim()}"`,
    });

    return result.toDataStreamResponse();
  } catch {
    return new Response("Unable to generate vibe translation.", {
      status: 500,
    });
  }
}
