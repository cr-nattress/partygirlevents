# US-001: CRM Integration (HoneyBook)

**Epic:** [04 — Integrations](README.md)
**Priority:** P0 — Must Have
**Points:** 3
**Status:** Not Started

---

## Description

Integrate the site with HoneyBook CRM so every inquiry form submission and quiz completion automatically creates or updates a contact in Stephanie's HoneyBook account. The integration maps all collected data (contact info, wedding details, style preferences, quiz results) to HoneyBook fields. An abstraction layer is built so the CRM can be swapped (e.g., from HoneyBook to Dubsado) without changing any form or page code.

---

## Acceptance Criteria

### Lead Sync on Form Submission
- [ ] On inquiry form submission: a new contact is created in HoneyBook (or existing contact is updated if email matches)
- [ ] All form fields are synced to the corresponding HoneyBook contact fields
- [ ] Lead source is tagged (e.g., "Website Inquiry Form", page URL, UTM parameters)
- [ ] Sync happens server-side via API route (`/api/integrations/crm`) — no client-side API calls to HoneyBook
- [ ] Form submission succeeds even if CRM sync fails (CRM sync is non-blocking)

### Lead Sync on Quiz Completion
- [ ] On style quiz completion (when contact info is provided): quiz results are synced to HoneyBook
- [ ] Quiz results stored as custom fields or notes on the HoneyBook contact: style preferences, budget range, wedding date, guest count, location
- [ ] If the user already submitted an inquiry form, the existing contact is updated (not duplicated)

### Field Mapping
- [ ] **Name** → HoneyBook contact name (first + last parsed if provided)
- [ ] **Email** → HoneyBook contact email (primary)
- [ ] **Phone** → HoneyBook contact phone
- [ ] **Wedding Date** → HoneyBook custom field or project date
- [ ] **Guest Count** → HoneyBook custom field
- [ ] **Budget Range** → HoneyBook custom field
- [ ] **Wedding Type** (ceremony + reception, elopement, etc.) → HoneyBook custom field or tag
- [ ] **Location** (venue or region) → HoneyBook custom field
- [ ] **Style Preferences** (from quiz) → HoneyBook notes or custom fields
- [ ] **Lead Source** → HoneyBook tag (e.g., "Website", "Quiz", specific page URL)
- [ ] **UTM Parameters** → HoneyBook notes (utm_source, utm_medium, utm_campaign)

### Error Handling & Retry
- [ ] Failed CRM syncs are caught and logged (not silently swallowed)
- [ ] Retry logic with exponential backoff: 3 attempts with 1s, 5s, 25s delays
- [ ] After all retries fail: error logged with full payload for manual recovery
- [ ] Failed syncs stored in Supabase `crm_sync_failures` table for retry or manual sync
- [ ] Admin notification (email or PostHog alert) when CRM sync failures exceed threshold (e.g., 3 failures in 1 hour)

### Abstraction Layer
- [ ] CRM integration uses an interface/abstraction in `src/lib/integrations/crm.ts`:
  ```typescript
  interface CRMProvider {
    createOrUpdateContact(data: LeadData): Promise<CRMResult>
    syncQuizResults(email: string, results: QuizResults): Promise<CRMResult>
  }
  ```
- [ ] HoneyBook-specific implementation in `src/lib/integrations/providers/honeybook.ts`
- [ ] Swapping to Dubsado (or another CRM) requires only a new provider implementation, not changes to forms or API routes
- [ ] CRM provider is selected via environment variable (`CRM_PROVIDER=honeybook`)

---

## Technical Notes

- HoneyBook API documentation may be limited — investigate their API capabilities early. Options:
  1. **HoneyBook API** (if available): direct REST API calls from the server
  2. **HoneyBook Webhooks** (if API is limited): use incoming webhooks to create contacts
  3. **Zapier/Make Integration** (fallback): if no direct API, use Zapier as middleware — site posts to a Zapier webhook which creates the HoneyBook contact
- The API route `/api/integrations/crm` should accept a standardized payload and route it through the CRM abstraction layer
- Store the raw form submission in Supabase `leads` table FIRST (Epic 02 handles this), then sync to CRM asynchronously
- The `crm_sync_failures` table schema: `id`, `lead_id`, `provider`, `payload`, `error`, `attempts`, `last_attempt_at`, `resolved_at`
- Consider using Vercel Cron or a queue (Inngest, QStash) for retry logic rather than in-process retries
- Environment variables needed: `CRM_PROVIDER`, `HONEYBOOK_API_KEY`, `HONEYBOOK_WEBHOOK_URL`

---

## Dependencies

- Epic 02 (inquiry form and quiz must be built and storing data in Supabase)
- HoneyBook API credentials or webhook URL (requires Stephanie's HoneyBook account access)
- Supabase `leads` table (from Epic 02 form stories)

---

## Definition of Done

- [ ] Inquiry form submission creates/updates a contact in HoneyBook with all mapped fields
- [ ] Quiz completion syncs results to the HoneyBook contact
- [ ] Duplicate contacts are not created for the same email address
- [ ] Failed syncs retry 3 times with exponential backoff
- [ ] Failed syncs after retries are logged in `crm_sync_failures` table
- [ ] CRM abstraction layer allows swapping providers without touching form code
- [ ] End-to-end test: submit form → verify data in Supabase → verify contact in HoneyBook
- [ ] Site form submission works even when HoneyBook API is unreachable
