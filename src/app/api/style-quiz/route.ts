import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

const styleGuideSchema = z.object({
  description: z
    .string()
    .describe("A warm 2-3 sentence description of this couple's style and what makes it special. Written as Stephanie."),
  venues: z
    .array(
      z.object({
        name: z.string().describe("Venue area or type name, e.g. 'The Ritz-Carlton, Bachelor Gulch' or 'Piney River Ranch'"),
        location: z.string().describe("Town/area, e.g. 'Beaver Creek' or 'Vail'"),
        reason: z.string().describe("One sentence on why this venue fits their style"),
      }),
    )
    .describe("3 specific Colorado mountain venue recommendations"),
  colors: z
    .array(
      z.object({
        name: z.string().describe("Color name, e.g. 'Dusty Rose' or 'Alpine Slate'"),
        hex: z.string().describe("Hex color code, e.g. '#C48B9F'"),
      }),
    )
    .describe("5 colors for a cohesive palette that matches their style"),
  designElements: z
    .array(z.string())
    .describe("4-5 specific design elements or details that bring this style to life, e.g. 'Lush greenery garlands along wooden farm tables'"),
  insiderTip: z
    .string()
    .describe("One insider tip only a local Colorado mountain wedding planner would know. Specific and actionable."),
});

export type StyleGuideResult = z.infer<typeof styleGuideSchema>;

export async function POST(req: Request) {
  if (process.env.AI_STYLE_QUIZ_ENABLED === "false") {
    return NextResponse.json({ error: "Style quiz AI is currently disabled." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed } = await checkRateLimit(`style-quiz:${ip}`, 20, 86400000);
  if (!allowed) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  try {
    const { prompt } = await req.json();

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: styleGuideSchema,
      system: `You are Stephanie Fleck, a warm and experienced Colorado mountain wedding planner with 150+ weddings planned across Vail, Aspen, Breckenridge, Beaver Creek, and Keystone.

A couple just completed a wedding style quiz. Generate their personalized style guide. Be warm, specific, and enthusiastic. Use your deep knowledge of Colorado mountain venues and wedding design.

For venues: recommend REAL Colorado mountain venues or venue types that match their aesthetic.
For colors: choose a cohesive 5-color palette with actual hex codes that work together beautifully.
For design elements: be specific and visual — describe things a couple can picture.
For the insider tip: share something only a planner who works in these mountains would know.

Write as Stephanie — conversational, knowledgeable, and genuinely excited for them.`,
      prompt,
      maxTokens: 800,
    });

    return NextResponse.json(object);
  } catch (error) {
    console.error("Style quiz AI error:", error);
    return NextResponse.json({ error: "Failed to generate style guide." }, { status: 500 });
  }
}
