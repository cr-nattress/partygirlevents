import { createServerSupabaseClient } from "@/lib/supabase";
import { LeadsDashboard } from "./leads-dashboard";

export const dynamic = "force-dynamic";

interface InquiryRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  wedding_type: string;
  guest_count: string | null;
  preferred_date: string | null;
  locations: string[];
  budget_range: string;
  status: string;
  ai_insight: {
    score: number;
    summary: string;
    priority: "Hot" | "Warm" | "Cool";
    talking_points: string[];
    red_flags: string[];
    confidence: number;
  } | null;
  created_at: string;
}

interface ToolLeadRow {
  id: string;
  email: string;
  first_name: string | null;
  source: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

async function getInquiries(): Promise<InquiryRow[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;
    return (data as InquiryRow[]) || [];
  } catch {
    return [];
  }
}

async function getToolLeads(): Promise<ToolLeadRow[]> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("tool_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw error;
    return (data as ToolLeadRow[]) || [];
  } catch {
    return [];
  }
}

export default async function AdminLeadsPage() {
  const [inquiries, toolLeads] = await Promise.all([
    getInquiries(),
    getToolLeads(),
  ]);

  return <LeadsDashboard inquiries={inquiries} toolLeads={toolLeads} />;
}
