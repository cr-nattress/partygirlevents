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

    // Send notification email via Resend (graceful fallback)
    try {
      if (process.env.RESEND_API_KEY) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Party Girl Events <notifications@partygirl.events>",
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
            `,
          }),
        });
      }
    } catch {
      console.warn("Email notification skipped: Resend not available");
    }

    // AI lead scoring (non-blocking, graceful fallback)
    let aiInsight: string | null = null;
    try {
      if (process.env.OPENAI_API_KEY) {
        const { text } = await generateText({
          model: openai("gpt-4o-mini"),
          maxTokens: 200,
          prompt: `You are a wedding planning business assistant. Briefly score this lead (Hot/Warm/Cool) and provide 1-2 sentences of insight for the planner.

Lead details:
- Type: ${data.weddingType}
- Guest count: ${data.guestCount || "unknown"}
- Date: ${data.preferredDate || "flexible"}
- Location: ${data.location.join(", ")}
- Budget: ${data.budgetRange}
- Planning status: ${data.planningStatus || "unknown"}
- Notes: ${data.notes || "none"}

Format: [HOT/WARM/COOL]: Brief insight`,
        });
        aiInsight = text;

        // Store AI insight alongside the lead if we have a leadId
        if (leadId) {
          try {
            const supabase = createServerSupabaseClient();
            await supabase
              .from("inquiries")
              .update({ ai_insight: aiInsight })
              .eq("id", leadId);
          } catch {
            // Non-critical
          }
        }
      }
    } catch {
      // AI scoring failed — not critical
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
