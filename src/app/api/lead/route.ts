import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Implement in Epic 02 US-007
  // - Validate with Zod
  // - Store in Supabase inquiries table
  // - Send notification email via Resend
  // - Sync to HoneyBook CRM
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 }
  );
}
