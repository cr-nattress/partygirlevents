import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { CHAT_SYSTEM_PROMPT, CHAT_CONFIG } from "@/lib/ai/chat-config";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Basic rate limiting by checking message count
    if (messages.length > 50) {
      return new Response("Conversation limit reached. Please start a new chat or contact Stephanie directly at /contact.", {
        status: 429,
      });
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
    return new Response("I'm having trouble right now. Please try again or reach out to Stephanie directly at /contact.", {
      status: 500,
    });
  }
}
