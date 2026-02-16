import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import "@/styles/globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://partygirl.events";

export const metadata: Metadata = {
  title: {
    default: "Party Girl Events | Colorado Mountain Wedding Planner",
    template: "%s | Party Girl Events",
  },
  description:
    "Intimate, elevated, and stress-free mountain wedding planning. From Vail to Aspen, Party Girl Events makes your Colorado wedding vision real.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "Party Girl Events",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/api/og?title=${encodeURIComponent("Party Girl Events")}&subtitle=${encodeURIComponent("Colorado Mountain Wedding Planner")}`,
        width: 1200,
        height: 630,
        alt: "Party Girl Events — Colorado Mountain Wedding Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Suspense fallback={null}>
          <PostHogProvider>{children}</PostHogProvider>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
