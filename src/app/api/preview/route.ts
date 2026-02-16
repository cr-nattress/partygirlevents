import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug") || "/";

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(slug, request.url));
}
