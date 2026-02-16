import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const secret = process.env.ADMIN_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Admin access not configured" },
        { status: 503 },
      );
    }

    if (password !== secret) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
