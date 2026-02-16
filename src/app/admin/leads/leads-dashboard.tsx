"use client";

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface AiInsight {
  score: number;
  summary: string;
  priority: "Hot" | "Warm" | "Cool";
  talking_points: string[];
  red_flags: string[];
  confidence: number;
}

interface Inquiry {
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
  ai_insight: AiInsight | null;
  created_at: string;
}

interface ToolLead {
  id: string;
  email: string;
  first_name: string | null;
  source: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

type Tab = "inquiries" | "tool_leads";
type PriorityFilter = "all" | "Hot" | "Warm" | "Cool";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const SOURCE_LABELS: Record<string, string> = {
  budget_tool: "Budget Estimator",
  vibe_translator: "Vibe Translator",
  timeline_tool: "Timeline Generator",
  chat: "AI Chat",
};

const PRIORITY_COLORS: Record<string, string> = {
  Hot: "bg-red-100 text-red-700 border-red-200",
  Warm: "bg-orange-100 text-orange-700 border-orange-200",
  Cool: "bg-blue-100 text-blue-700 border-blue-200",
};

/* -------------------------------------------------------------------------- */
/*  Priority Badge                                                             */
/* -------------------------------------------------------------------------- */

function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_COLORS[priority] || "bg-gray-100 text-gray-600 border-gray-200"}`}
    >
      {priority}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Score Ring                                                                 */
/* -------------------------------------------------------------------------- */

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 8 ? "text-red-600" : score >= 5 ? "text-orange-500" : "text-blue-500";
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${color} border-current`}>
      {score}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Inquiry Row (expandable)                                                   */
/* -------------------------------------------------------------------------- */

function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
  const [expanded, setExpanded] = useState(false);
  const ai = inquiry.ai_insight;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-gray-50"
      >
        {ai ? <ScoreRing score={ai.score} /> : <div className="h-10 w-10" />}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {inquiry.first_name} {inquiry.last_name}
            </span>
            {ai && <PriorityBadge priority={ai.priority} />}
            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
              {inquiry.wedding_type}
            </span>
          </div>
          <div className="mt-0.5 flex items-center gap-3 text-sm text-gray-500">
            <span>{inquiry.email}</span>
            <span>{inquiry.budget_range}</span>
            {inquiry.preferred_date && <span>{inquiry.preferred_date}</span>}
          </div>
        </div>
        <span className="shrink-0 text-xs text-gray-400">
          {timeAgo(inquiry.created_at)}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-gray-50 bg-gray-50/50 px-4 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Contact */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Contact
              </h4>
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="text-gray-400">Email:</span>{" "}
                  <a href={`mailto:${inquiry.email}`} className="text-rose-600 underline">
                    {inquiry.email}
                  </a>
                </p>
                <p>
                  <span className="text-gray-400">Phone:</span>{" "}
                  {inquiry.phone ? (
                    <a href={`tel:${inquiry.phone}`} className="text-rose-600 underline">
                      {inquiry.phone}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
            </div>

            {/* Wedding Details */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Wedding Details
              </h4>
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="text-gray-400">Type:</span> {inquiry.wedding_type}
                </p>
                <p>
                  <span className="text-gray-400">Guests:</span>{" "}
                  {inquiry.guest_count || "Not specified"}
                </p>
                <p>
                  <span className="text-gray-400">Date:</span>{" "}
                  {inquiry.preferred_date || "Flexible"}
                </p>
                <p>
                  <span className="text-gray-400">Locations:</span>{" "}
                  {inquiry.locations.join(", ")}
                </p>
                <p>
                  <span className="text-gray-400">Budget:</span> {inquiry.budget_range}
                </p>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {ai && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
                AI Analysis
                <span className="ml-auto text-[10px] font-normal text-gray-300">
                  {Math.round(ai.confidence * 100)}% confidence
                </span>
              </h4>
              <p className="text-sm leading-relaxed text-gray-700">
                {ai.summary}
              </p>

              {ai.talking_points.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-500">Talking Points</p>
                  <ul className="mt-1 space-y-1">
                    {ai.talking_points.map((tp, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-600">
                        <span className="shrink-0 text-rose-400">&bull;</span>
                        {tp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {ai.red_flags.length > 0 && (
                <div className="mt-3 rounded-md bg-red-50 p-3">
                  <p className="text-xs font-medium text-red-700">Red Flags</p>
                  <ul className="mt-1 space-y-1">
                    {ai.red_flags.map((rf, i) => (
                      <li key={i} className="flex gap-2 text-sm text-red-600">
                        <span className="shrink-0">&#9888;</span>
                        {rf}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!ai && (
            <p className="mt-4 text-sm italic text-gray-400">
              AI analysis not available for this inquiry.
            </p>
          )}

          {/* Quick Actions */}
          <div className="mt-4 flex gap-2">
            <a
              href={`mailto:${inquiry.email}`}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Email
            </a>
            {inquiry.phone && (
              <a
                href={`tel:${inquiry.phone}`}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Call
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tool Lead Row                                                              */
/* -------------------------------------------------------------------------- */

function ToolLeadRow({ lead }: { lead: ToolLead }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-gray-50"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{lead.email}</span>
            <span className="rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-700">
              {SOURCE_LABELS[lead.source] || lead.source}
            </span>
          </div>
          {lead.first_name && (
            <p className="mt-0.5 text-sm text-gray-500">{lead.first_name}</p>
          )}
        </div>
        <span className="shrink-0 text-xs text-gray-400">
          {timeAgo(lead.created_at)}
        </span>
        {lead.metadata && (
          <svg
            className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </button>

      {expanded && lead.metadata && (
        <div className="border-t border-gray-50 bg-gray-50/50 px-4 py-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Tool Data
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            {Object.entries(lead.metadata).map(([key, value]) => (
              <p key={key}>
                <span className="text-gray-400">{key}:</span>{" "}
                {Array.isArray(value) ? value.join(", ") : String(value)}
              </p>
            ))}
          </div>
          <div className="mt-3">
            <a
              href={`mailto:${lead.email}`}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Email
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

export function LeadsDashboard({
  inquiries,
  toolLeads,
}: {
  inquiries: Inquiry[];
  toolLeads: ToolLead[];
}) {
  const [tab, setTab] = useState<Tab>("inquiries");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  // Stats
  const hotCount = inquiries.filter((i) => i.ai_insight?.priority === "Hot").length;
  const warmCount = inquiries.filter((i) => i.ai_insight?.priority === "Warm").length;
  const coolCount = inquiries.filter((i) => i.ai_insight?.priority === "Cool").length;

  // Filtered inquiries
  const filteredInquiries =
    priorityFilter === "all"
      ? inquiries
      : inquiries.filter((i) => i.ai_insight?.priority === priorityFilter);

  // Filtered tool leads
  const filteredToolLeads =
    sourceFilter === "all"
      ? toolLeads
      : toolLeads.filter((l) => l.source === sourceFilter);

  // Unique sources for filter
  const toolSources = [...new Set(toolLeads.map((l) => l.source))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">
              PG
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Leads</h1>
              <p className="text-xs text-gray-500">Party Girl Events</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="font-medium text-gray-700">{hotCount} hot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
              <span className="text-gray-500">{warmCount} warm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span className="text-gray-500">{coolCount} cool</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {/* Tabs */}
        <div className="mb-4 flex items-center gap-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setTab("inquiries")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "inquiries"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setTab("tool_leads")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === "tool_leads"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Tool Leads ({toolLeads.length})
          </button>
        </div>

        {/* Filters */}
        {tab === "inquiries" && (
          <div className="mb-4 flex gap-2">
            {(["all", "Hot", "Warm", "Cool"] as PriorityFilter[]).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  priorityFilter === p
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {p === "all" ? "All" : p}
              </button>
            ))}
          </div>
        )}

        {tab === "tool_leads" && toolSources.length > 1 && (
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setSourceFilter("all")}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                sourceFilter === "all"
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              All
            </button>
            {toolSources.map((s) => (
              <button
                key={s}
                onClick={() => setSourceFilter(s)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  sourceFilter === s
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {SOURCE_LABELS[s] || s}
              </button>
            ))}
          </div>
        )}

        {/* Lead List */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {tab === "inquiries" && (
            <>
              {filteredInquiries.length === 0 ? (
                <div className="px-4 py-12 text-center text-sm text-gray-400">
                  No inquiries yet.
                </div>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <InquiryRow key={inquiry.id} inquiry={inquiry} />
                ))
              )}
            </>
          )}

          {tab === "tool_leads" && (
            <>
              {filteredToolLeads.length === 0 ? (
                <div className="px-4 py-12 text-center text-sm text-gray-400">
                  No tool leads yet.
                </div>
              ) : (
                filteredToolLeads.map((lead) => (
                  <ToolLeadRow key={lead.id} lead={lead} />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
