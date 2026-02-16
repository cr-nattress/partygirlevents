import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { CHAT_SYSTEM_PROMPT, CHAT_CONFIG } from "@/lib/ai/chat-config";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    if (process.env.AI_CHAT_ENABLED === "false") {
      return new Response(
        "Chat is temporarily unavailable. Please contact Stephanie directly at /contact.",
        { status: 503 },
      );
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const { allowed } = await checkRateLimit(`chat:${ip}`, 50, 86_400_000);
    if (!allowed) {
      return new Response(
        "You've reached the daily chat limit. Contact Stephanie directly at /contact for immediate help.",
        { status: 429 },
      );
    }

    const { messages } = await req.json();

    // Message count safety check
    if (messages.length > 50) {
      return new Response(
        "Conversation limit reached. Please start a new chat or contact Stephanie directly at /contact.",
        { status: 429 },
      );
    }

    const result = streamText({
      model: openai(CHAT_CONFIG.model),
      system: CHAT_SYSTEM_PROMPT,
      messages,
      maxTokens: CHAT_CONFIG.maxTokens,
      temperature: CHAT_CONFIG.temperature,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      "I'm having trouble right now. Please try again or reach out to Stephanie directly at /contact.",
      { status: 500 },
    );
  }
}
