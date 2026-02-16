import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const leadSchema = z.object({
  weddingType: z.enum([
    "full-wedding",
    "elopement",
    "destination",
    "day-of",
    "other",
  ]),
  guestCount: z.string().optional(),
  preferredDate: z.string().optional(),
  venueStatus: z.string().optional(),
  planningStatus: z.string().optional(),
  eventDescription: z.string().optional(),
  location: z.array(z.string()).min(1),
  budgetRange: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().max(500).optional(),
  referralSource: z.string().optional(),
  honeypot: z.string().max(0),
});

const aiAnalysisSchema = z.object({
  score: z.number().min(1).max(10),
  summary: z.string(),
  priority: z.enum(["Hot", "Warm", "Cool"]),
  talking_points: z.array(z.string()),
  red_flags: z.array(z.string()),
  confidence: z.number().min(0).max(1),
});

type AiAnalysis = z.infer<typeof aiAnalysisSchema>;

function buildAnalysisPrompt(data: z.infer<typeof leadSchema>): string {
  return `You are a lead-scoring assistant for Party Girl Events, a Colorado mountain wedding and event planning company run by Stephanie.

SERVICE OFFERINGS & PRICING MINIMUMS:
- Full Service Wedding Planning: $8,000+
- Wedding Management (month-of coordination): $4,500+
- Elopement Planning: $3,000+
- Special Events: $2,500+

COLORADO MOUNTAIN CONTEXT:
Primary service areas include Vail, Aspen, Breckenridge, Beaver Creek, and Keystone. Mountain weddings have unique logistics (altitude, weather windows, vendor travel).

SCORING CRITERIA (1-10 scale):
- Budget fit: Does their budget align with service pricing minimums?
- Date timeline: Is the date realistic? Closer dates with urgency score higher.
- Service match: Does the wedding type match offered services?
- Detail level: Did they provide thorough information (guest count, venue status, planning status)?
- Engagement signals: Notes, referral source, and specificity suggest genuine interest.

PRIORITY MAPPING:
- Hot (score 8-10): Strong budget fit, clear timeline, high engagement
- Warm (score 5-7): Moderate fit, some gaps or unknowns
- Cool (score 1-4): Budget mismatch, vague details, or misaligned services

Analyze the following lead and return ONLY valid JSON matching this exact schema:
{
  "score": <number 1-10>,
  "summary": "<2-3 sentence analysis for Stephanie>",
  "priority": "<Hot|Warm|Cool>",
  "talking_points": ["<point 1>", "<point 2>", ...],
  "red_flags": ["<flag 1>", ...] or [],
  "confidence": <number 0-1>
}

LEAD DETAILS:
- Name: ${data.firstName} ${data.lastName}
- Wedding Type: ${data.weddingType}
- Guest Count: ${data.guestCount || "not specified"}
- Preferred Date: ${data.preferredDate || "flexible"}
- Venue Status: ${data.venueStatus || "unknown"}
- Planning Status: ${data.planningStatus || "unknown"}
- Locations: ${data.location.join(", ")}
- Budget Range: ${data.budgetRange}
- Event Description: ${data.eventDescription || "none"}
- Notes: ${data.notes || "none"}
- Referral Source: ${data.referralSource || "not specified"}

Return ONLY the JSON object, no markdown fences or extra text.`;
}

async function runAiAnalysis(
  data: z.infer<typeof leadSchema>,
): Promise<AiAnalysis | null> {
  const prompt = buildAnalysisPrompt(data);

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    maxTokens: 500,
    temperature: 0.3,
    prompt,
  });

  const parsed = JSON.parse(text);
  return aiAnalysisSchema.parse(parsed);
}

function buildAiAnalysisHtml(analysis: AiAnalysis): string {
  const priorityColors: Record<string, string> = {
    Hot: "#dc2626",
    Warm: "#ea580c",
    Cool: "#2563eb",
  };
  const color = priorityColors[analysis.priority] || "#6b7280";

  const talkingPointsHtml = analysis.talking_points
    .map((tp) => `<li>${tp}</li>`)
    .join("");

  const redFlagsHtml =
    analysis.red_flags.length > 0
      ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:12px;margin-top:12px;">
          <strong style="color:#991b1b;">Red Flags:</strong>
          <ul style="margin:4px 0 0 0;padding-left:20px;">${analysis.red_flags.map((rf) => `<li style="color:#991b1b;">${rf}</li>`).join("")}</ul>
        </div>`
      : "";

  return `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-top:20px;">
      <h3 style="margin:0 0 12px 0;">AI Lead Analysis</h3>
      <p>
        <span style="background:${color};color:white;padding:4px 12px;border-radius:12px;font-weight:bold;font-size:14px;">${analysis.priority}</span>
        <span style="margin-left:12px;font-size:16px;font-weight:bold;">${analysis.score}/10</span>
        <span style="margin-left:8px;color:#6b7280;font-size:13px;">(confidence: ${Math.round(analysis.confidence * 100)}%)</span>
      </p>
      <p style="margin:12px 0;">${analysis.summary}</p>
      <strong>Talking Points:</strong>
      <ul style="margin:4px 0 0 0;padding-left:20px;">${talkingPointsHtml}</ul>
      ${redFlagsHtml}
    </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = leadSchema.parse(body);

    // Honeypot check — silent success for bots
    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    // Store in Supabase (graceful fallback)
    let leadId: string | null = null;
    try {
      const supabase = createServerSupabaseClient();
      const { data: row, error } = await supabase
        .from("inquiries")
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          wedding_type: data.weddingType,
          guest_count: data.guestCount || null,
          preferred_date: data.preferredDate || null,
          venue_status: data.venueStatus || null,
          planning_status: data.planningStatus || null,
          event_description: data.eventDescription || null,
          locations: data.location,
          budget_range: data.budgetRange,
          notes: data.notes || null,
          referral_source: data.referralSource || null,
          status: "new",
        })
        .select("id")
        .single();

      if (!error && row) leadId = row.id;
    } catch {
      // Supabase not configured — continue without storage
      console.warn("Lead storage skipped: Supabase not available");
    }

    // AI lead analysis (graceful fallback with retry)
    const aiEnabled = process.env.AI_INQUIRY_ANALYSIS_ENABLED !== "false";
    let aiAnalysis: AiAnalysis | null = null;

    if (aiEnabled && process.env.OPENAI_API_KEY) {
      try {
        aiAnalysis = await runAiAnalysis(data);
      } catch {
        // Retry once after a short delay
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          aiAnalysis = await runAiAnalysis(data);
        } catch {
          // AI analysis unavailable — continue without it
          console.warn("AI lead analysis failed after retry");
        }
      }

      // Store structured analysis alongside the lead
      if (aiAnalysis && leadId) {
        try {
          const supabase = createServerSupabaseClient();
          await supabase
            .from("inquiries")
            .update({ ai_insight: aiAnalysis })
            .eq("id", leadId);
        } catch {
          // Non-critical
        }
      }
    }

    // Send notification email via Resend (graceful fallback)
    try {
      if (process.env.RESEND_API_KEY) {
        const aiSection = aiAnalysis
          ? buildAiAnalysisHtml(aiAnalysis)
          : `<p style="color:#6b7280;margin-top:20px;"><em>AI analysis unavailable for this inquiry.</em></p>`;

        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `Party Girl Events <${fromEmail}>`,
            to:
              process.env.NOTIFICATION_EMAIL || "hello@partygirlevents.com",
            subject: `New Inquiry: ${data.firstName} ${data.lastName} — ${data.weddingType}`,
            html: `
              <h2>New Wedding Inquiry</h2>
              <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
              <p><strong>Wedding Type:</strong> ${data.weddingType}</p>
              <p><strong>Guest Count:</strong> ${data.guestCount || "Not specified"}</p>
              <p><strong>Preferred Date:</strong> ${data.preferredDate || "Flexible"}</p>
              <p><strong>Locations:</strong> ${data.location.join(", ")}</p>
              <p><strong>Budget Range:</strong> ${data.budgetRange}</p>
              <p><strong>Notes:</strong> ${data.notes || "None"}</p>
              <p><strong>Referral Source:</strong> ${data.referralSource || "Not specified"}</p>
              ${aiSection}
            `,
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          console.error("Resend email failed:", res.status, errBody);
        }
      }
    } catch (emailErr) {
      console.error("Email notification error:", emailErr);
    }

    return NextResponse.json({ success: true, leadId });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }
    console.error("Lead API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
