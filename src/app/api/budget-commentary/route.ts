import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    if (process.env.AI_BUDGET_COMMENTARY_ENABLED === "false") {
      return new Response("Budget commentary is temporarily unavailable.", {
        status: 503,
      });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const { allowed } = await checkRateLimit(
      `budget:${ip}`,
      20,
      86_400_000,
    );
    if (!allowed) {
      return new Response(
        "You've reached the daily limit for budget estimates. Book a free discovery call for personalized guidance!",
        { status: 429 },
      );
    }

    const { breakdown, input } = await req.json();

    const prompt = `You are Stephanie, a Colorado mountain wedding planner. A couple is using the budget estimator on your website. Based on their inputs, provide a brief (3-4 sentences) personalized commentary about their budget.

Their inputs:
- Guest count: ${input.guestCount}
- Location: ${input.location}
- Season: ${input.season}
- Style: ${input.weddingStyle}
- Priorities: ${input.priorities.join(", ")}
- Estimated range: $${breakdown.totalLow.toLocaleString()} to $${breakdown.totalHigh.toLocaleString()}

Give practical, encouraging advice. Mention one specific tip for their location/season combo. Be warm and honest — not salesy. Sign off by suggesting they book a free discovery call if they'd like personalized guidance.`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      prompt,
      maxTokens: 300,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch {
    return new Response("Unable to generate commentary.", { status: 500 });
  }
}
