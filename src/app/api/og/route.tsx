import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "Party Girl Events";
  const subtitle =
    searchParams.get("subtitle") || "Colorado Mountain Wedding Planner";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative accent stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#e11d48",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            textAlign: "center",
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#e11d48",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginBottom: 24,
            }}
          >
            Party Girl Events
          </div>

          <div
            style={{
              fontSize: title.length > 40 ? 48 : 56,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            partygirl.events
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
