import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase";

const toolLeadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  source: z.enum(["budget_tool", "vibe_translator", "timeline_tool", "chat", "style_quiz"]),
  metadata: z.record(z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = toolLeadSchema.parse(body);

    // Store in Supabase (graceful fallback)
    let leadId: string | null = null;
    try {
      const supabase = createServerSupabaseClient();
      const { data: row, error } = await supabase
        .from("tool_leads")
        .insert({
          email: data.email,
          first_name: data.firstName || null,
          source: data.source,
          metadata: data.metadata || null,
        })
        .select("id")
        .single();

      if (!error && row) leadId = row.id;
    } catch {
      console.warn("Tool lead storage skipped: Supabase not available");
    }

    // Notify Stephanie via Resend
    try {
      if (process.env.RESEND_API_KEY) {
        const sourceLabels: Record<string, string> = {
          budget_tool: "Budget Estimator",
          vibe_translator: "Vibe Translator",
          timeline_tool: "Timeline Generator",
          chat: "AI Chat",
          style_quiz: "Style Quiz",
        };
        const sourceLabel = sourceLabels[data.source] || data.source;
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

        const metadataHtml = data.metadata
          ? Object.entries(data.metadata)
              .filter(([k]) => k !== "answers") // skip raw quiz JSON
              .map(
                ([k, v]) =>
                  `<li><strong>${k}:</strong> ${String(v)}</li>`,
              )
              .join("")
          : "";

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
            subject: `New Tool Lead: ${data.email} via ${sourceLabel}`,
            html: `
              <h2>New Lead from ${sourceLabel}</h2>
              <p><strong>Email:</strong> ${data.email}</p>
              ${data.firstName ? `<p><strong>Name:</strong> ${data.firstName}</p>` : ""}
              <p><strong>Source:</strong> ${sourceLabel}</p>
              ${metadataHtml ? `<h3>Tool Data</h3><ul>${metadataHtml}</ul>` : ""}
              <hr />
              <p style="color:#6b7280;font-size:13px;">This lead came from the ${sourceLabel} tool on partygirl.events</p>
            `,
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          console.error("Resend email failed:", res.status, errBody);
        }
      }
    } catch (emailErr) {
      console.error("Tool lead notification error:", emailErr);
    }

    return NextResponse.json({ success: true, leadId });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 },
      );
    }
    console.error("Tool lead API error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
