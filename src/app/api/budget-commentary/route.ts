import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
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
