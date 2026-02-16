import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

interface InquiryRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  wedding_type: string;
  budget_range: string;
  preferred_date: string | null;
  locations: string[];
  ai_insight: {
    score: number;
    summary: string;
    priority: "Hot" | "Warm" | "Cool";
    talking_points: string[];
    red_flags: string[];
  } | null;
  created_at: string;
}

interface ToolLeadRow {
  id: string;
  email: string;
  first_name: string | null;
  source: string;
  created_at: string;
}

const SOURCE_LABELS: Record<string, string> = {
  budget_tool: "Budget Estimator",
  vibe_translator: "Vibe Translator",
  timeline_tool: "Timeline Generator",
  chat: "AI Chat",
  style_quiz: "Style Quiz",
};

const PRIORITY_COLORS: Record<string, string> = {
  Hot: "#dc2626",
  Warm: "#ea580c",
  Cool: "#2563eb",
};

function buildDigestHtml(
  inquiries: InquiryRow[],
  toolLeads: ToolLeadRow[],
  siteUrl: string,
): string {
  const hotLeads = inquiries.filter((i) => i.ai_insight?.priority === "Hot");
  const warmLeads = inquiries.filter((i) => i.ai_insight?.priority === "Warm");
  const coolLeads = inquiries.filter(
    (i) => !i.ai_insight || i.ai_insight.priority === "Cool",
  );

  function inquiryCard(inquiry: InquiryRow): string {
    const ai = inquiry.ai_insight;
    const priorityColor = ai ? PRIORITY_COLORS[ai.priority] || "#6b7280" : "#6b7280";

    const talkingPoints = ai?.talking_points.length
      ? `<ul style="margin:8px 0 0;padding-left:20px;">${ai.talking_points.map((tp) => `<li style="font-size:13px;color:#4b5563;margin-bottom:4px;">${tp}</li>`).join("")}</ul>`
      : "";

    const redFlags = ai?.red_flags.length
      ? `<div style="background:#fef2f2;border-radius:6px;padding:8px 12px;margin-top:8px;"><strong style="color:#991b1b;font-size:12px;">Red Flags:</strong><ul style="margin:4px 0 0;padding-left:16px;">${ai.red_flags.map((rf) => `<li style="font-size:12px;color:#991b1b;">${rf}</li>`).join("")}</ul></div>`
      : "";

    return `
      <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:12px;background:white;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          ${ai ? `<span style="background:${priorityColor};color:white;padding:2px 10px;border-radius:10px;font-size:12px;font-weight:bold;">${ai.priority}</span>` : ""}
          ${ai ? `<span style="font-weight:bold;font-size:14px;">${ai.score}/10</span>` : ""}
        </div>
        <p style="margin:0;font-weight:600;font-size:15px;color:#111827;">${inquiry.first_name} ${inquiry.last_name}</p>
        <p style="margin:4px 0;font-size:13px;color:#6b7280;">${inquiry.email}${inquiry.phone ? ` &middot; ${inquiry.phone}` : ""}</p>
        <p style="margin:4px 0;font-size:13px;color:#6b7280;">${inquiry.wedding_type} &middot; ${inquiry.budget_range} &middot; ${inquiry.locations.join(", ")}</p>
        ${ai ? `<p style="margin:10px 0 0;font-size:13px;color:#374151;line-height:1.5;">${ai.summary}</p>` : ""}
        ${talkingPoints}
        ${redFlags}
        <div style="margin-top:12px;">
          <a href="mailto:${inquiry.email}" style="display:inline-block;background:#e11d48;color:white;padding:6px 16px;border-radius:6px;font-size:13px;font-weight:500;text-decoration:none;">Reply</a>
        </div>
      </div>`;
  }

  function toolLeadsList(leads: ToolLeadRow[]): string {
    if (leads.length === 0) return "";
    const rows = leads
      .map(
        (l) =>
          `<tr><td style="padding:8px 12px;font-size:13px;border-bottom:1px solid #f3f4f6;">${l.email}</td><td style="padding:8px 12px;font-size:13px;border-bottom:1px solid #f3f4f6;">${SOURCE_LABELS[l.source] || l.source}</td></tr>`,
      )
      .join("");

    return `
      <h2 style="font-size:16px;color:#111827;margin:24px 0 12px;">Tool Leads (${leads.length})</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;background:white;">
        <thead><tr style="background:#f9fafb;">
          <th style="padding:8px 12px;text-align:left;font-size:12px;color:#6b7280;font-weight:600;">Email</th>
          <th style="padding:8px 12px;text-align:left;font-size:12px;color:#6b7280;font-weight:600;">Source</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  const hotSection = hotLeads.length
    ? `<h2 style="font-size:16px;color:#dc2626;margin:24px 0 12px;">Hot Leads (${hotLeads.length})</h2>${hotLeads.map(inquiryCard).join("")}`
    : "";

  const warmSection = warmLeads.length
    ? `<h2 style="font-size:16px;color:#ea580c;margin:24px 0 12px;">Warm Leads (${warmLeads.length})</h2>${warmLeads.map(inquiryCard).join("")}`
    : "";

  const coolSection = coolLeads.length
    ? `<h2 style="font-size:16px;color:#2563eb;margin:24px 0 12px;">Cool Leads (${coolLeads.length})</h2><p style="font-size:13px;color:#6b7280;">${coolLeads.length} cool lead${coolLeads.length === 1 ? "" : "s"} &mdash; <a href="${siteUrl}/admin/leads" style="color:#e11d48;">view in dashboard</a></p>`
    : "";

  return `
    <div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;padding:24px;">
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="font-size:20px;color:#111827;margin:0;">Daily Lead Digest</h1>
        <p style="font-size:13px;color:#6b7280;margin:4px 0 0;">Party Girl Events &middot; ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
      </div>

      <div style="background:white;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:24px;text-align:center;">
        <div style="display:inline-block;margin:0 12px;">
          <span style="font-size:24px;font-weight:bold;color:#dc2626;">${hotLeads.length}</span>
          <span style="font-size:12px;color:#6b7280;display:block;">Hot</span>
        </div>
        <div style="display:inline-block;margin:0 12px;">
          <span style="font-size:24px;font-weight:bold;color:#ea580c;">${warmLeads.length}</span>
          <span style="font-size:12px;color:#6b7280;display:block;">Warm</span>
        </div>
        <div style="display:inline-block;margin:0 12px;">
          <span style="font-size:24px;font-weight:bold;color:#2563eb;">${coolLeads.length}</span>
          <span style="font-size:12px;color:#6b7280;display:block;">Cool</span>
        </div>
        <div style="display:inline-block;margin:0 12px;">
          <span style="font-size:24px;font-weight:bold;color:#7c3aed;">${toolLeads.length}</span>
          <span style="font-size:12px;color:#6b7280;display:block;">Tool</span>
        </div>
      </div>

      ${hotSection}
      ${warmSection}
      ${coolSection}
      ${toolLeadsList(toolLeads)}

      <div style="text-align:center;margin-top:24px;">
        <a href="${siteUrl}/admin/leads" style="display:inline-block;background:#e11d48;color:white;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;">View All Leads</a>
      </div>

      <p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:24px;">
        Sent by Party Girl Events Lead Digest
      </p>
    </div>`;
}

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sends this header for cron jobs)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerSupabaseClient();
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Fetch new inquiries and tool leads from the last 24h
    const [inquiriesResult, toolLeadsResult] = await Promise.all([
      supabase
        .from("inquiries")
        .select("*")
        .gte("created_at", since)
        .order("created_at", { ascending: false }),
      supabase
        .from("tool_leads")
        .select("*")
        .gte("created_at", since)
        .order("created_at", { ascending: false }),
    ]);

    const inquiries = (inquiriesResult.data as InquiryRow[]) || [];
    const toolLeads = (toolLeadsResult.data as ToolLeadRow[]) || [];

    // Don't send empty digests
    if (inquiries.length === 0 && toolLeads.length === 0) {
      return NextResponse.json({ sent: false, reason: "No new leads" });
    }

    // Build and send digest email
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://partygirl.events";

    const totalLeads = inquiries.length + toolLeads.length;
    const hotCount = inquiries.filter((i) => i.ai_insight?.priority === "Hot").length;
    const subject = hotCount > 0
      ? `${hotCount} Hot Lead${hotCount > 1 ? "s" : ""} + ${totalLeads - hotCount} more — Daily Digest`
      : `${totalLeads} New Lead${totalLeads > 1 ? "s" : ""} — Daily Digest`;

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Party Girl Events <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
          to: process.env.NOTIFICATION_EMAIL || "stephanie@partygirl.events",
          subject,
          html: buildDigestHtml(inquiries, toolLeads, siteUrl),
        }),
      });
    }

    return NextResponse.json({
      sent: true,
      inquiries: inquiries.length,
      toolLeads: toolLeads.length,
    });
  } catch (error) {
    console.error("Lead digest cron error:", error);
    return NextResponse.json(
      { error: "Failed to send digest" },
      { status: 500 },
    );
  }
}
