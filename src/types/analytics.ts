export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_click"
  | "form_start"
  | "form_step_complete"
  | "form_submit"
  | "form_abandon"
  | "quiz_start"
  | "quiz_step_complete"
  | "quiz_complete"
  | "quiz_email_capture"
  | "case_study_view"
  | "gallery_filter"
  | "venue_guide_view"
  | "calendar_book"
  | "chat_start"
  | "chat_lead_capture"
  | "budget_tool_complete"
  | "vibe_translator_complete"
  | "exit_intent_shown"
  | "lead_magnet_download"
  | "external_link_click";

export interface EventProperties {
  page?: string;
  cta_text?: string;
  form_type?: string;
  step_number?: number;
  step_name?: string;
  wedding_type?: string;
  guest_count?: string;
  budget_range?: string;
  location?: string;
  [key: string]: unknown;
}
