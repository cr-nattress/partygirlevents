import { Metadata } from "next";
import Link from "next/link";
import { Section, PageHero } from "@/components/layout";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Free Wedding Planning Tools | Party Girl Events",
  description:
    "Free AI-powered wedding planning tools: Style Quiz, Budget Estimator, Vibe Translator, and Timeline Generator. Start planning your Colorado mountain wedding today.",
};

const tools = [
  {
    name: "Wedding Style Quiz",
    href: "/tools/style-quiz",
    description:
      "Discover your unique wedding aesthetic and get a personalized style guide with venue recommendations, color palette, design elements, and insider tips from Stephanie.",
    features: [
      "6 quick questions about your style preferences",
      "AI-generated personalized style guide",
      "3 real Colorado venue recommendations",
      "Custom 5-color palette with hex codes",
      "Insider planning tip from a local expert",
    ],
    time: "3 min",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    name: "Budget Estimator",
    href: "/tools/budget-estimator",
    description:
      "Get a realistic cost breakdown for your Colorado mountain wedding. Input your details and receive an itemized estimate based on real local pricing data.",
    features: [
      "Colorado-specific pricing data",
      "Itemized category breakdown",
      "Adjust by location and season",
      "AI-powered budget commentary",
      "Tips on where to save and splurge",
    ],
    time: "5 min",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Vibe Translator",
    href: "/tools/vibe-translator",
    description:
      "Describe your dream wedding in your own words and our AI will translate it into a concrete design direction with specific recommendations for your Colorado celebration.",
    features: [
      "Natural language input — just describe your vibe",
      "AI-generated design direction",
      "Specific venue and vendor suggestions",
      "Color palette recommendation",
      "Actionable next steps",
    ],
    time: "2 min",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    name: "Timeline Generator",
    href: "/tools/timeline",
    description:
      "Build a detailed wedding day timeline tailored to your ceremony time, venue, and preferences. Includes altitude-specific tips for mountain celebrations.",
    features: [
      "Customized to your ceremony time",
      "Mountain-specific timing adjustments",
      "Altitude and weather considerations",
      "AI-powered optimization tips",
      "Downloadable timeline",
    ],
    time: "4 min",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHero
        variant="minimal"
        headline="Free Wedding Planning Tools"
        subheadline="AI-powered tools built from real Colorado mountain wedding planning experience. No account required — just answers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
        ]}
      />

      <Section bg="white">
        <div className="grid gap-8 md:grid-cols-2">
          {tools.map((tool) => (
            <div
              key={tool.href}
              className="flex flex-col rounded-lg border border-foreground/10 bg-surface p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {tool.icon}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold">
                    {tool.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    ~{tool.time} to complete
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {tool.description}
              </p>

              <ul className="mt-4 flex-1 space-y-2">
                {tool.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button variant="primary" size="md" asChild>
                  <Link href={tool.href}>Try {tool.name}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="cream" narrow>
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold">
            Built by a planner, powered by AI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            These tools are informed by 150+ Colorado mountain weddings and
            real local pricing, venue, and vendor data. They are designed to
            give you genuinely useful answers — not generic wedding advice you
            can find anywhere.
          </p>
        </div>
      </Section>

      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Ready for more than tools?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            When you are ready for hands-on planning support, I am here. Every
            consultation starts with a free 30-minute discovery call.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
