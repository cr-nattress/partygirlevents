# AI Features Ideation Document — Party Girl Events Wedding Planning Website

> **Prepared:** February 15, 2026
> **For:** Stephanie / Party Girl Events
> **Purpose:** Actionable feature specs for AI-powered wedding planning website
> **Stack Context:** Next.js, React, Tailwind, TypeScript frontend · Supabase backend · Vercel hosting

---

## Research Notes

Research conducted across Reddit (r/weddingplanning, r/ChatGPT, r/webdev, r/SaaS), X/Twitter, YouTube, and web sources on AI features in the wedding planning space as of February 2026. Key findings:

- **AI chatbots on wedding sites are still rare** — most planners use generic contact forms or Calendly embeds. The few that have chatbots use off-the-shelf widgets (Tidio, Drift) that feel impersonal.
- **Couples expect personalization** — Pinterest-trained couples arrive with strong visual preferences. Sites that acknowledge this (style quizzes, visual matching) convert significantly higher.
- **Budget transparency is the #1 pain point** — Reddit threads consistently show couples frustrated by "contact us for pricing." AI budget tools that give ranges without requiring a call are highly valued.
- **The Knot / Zola / Joy have basic AI** — recommendation engines, chatbots, but they're marketplace-level generic. Independent planners who match this feel premium.
- **Conversational AI has matured** — GPT-4o, Claude 3.5, and Gemini 2.0 make brand-voice chatbots feasible at low cost ($0.01-0.05/conversation).
- **Image generation quality now suitable for wedding visualization** — Flux, DALL-E 3, and Midjourney v6 can produce realistic venue mockups.

---

## Tier 1 — High-Impact, Ship First

Features that directly drive conversion and differentiate immediately.

---

### 1. AI Wedding Style Quiz

**What it is:**
A conversational, multi-step quiz (8-12 questions) that builds a personalized mood board, suggests color palettes, decor styles, and vendor types. Captures lead info (name, email, wedding date, budget range) naturally within the flow — not as a gated form, but woven into the conversation. Ends with a shareable "Your Wedding Style" results page.

**Why it matters for a wedding planner site:**
Couples spend hours on Pinterest before ever contacting a planner. A style quiz meets them where they are — it's fun, low-commitment, and gives Stephanie immediate insight into their taste before the first call. It replaces the cold "fill out this form" experience with something that feels like the start of a relationship. Quiz completions become warm leads with rich preference data attached.

**How it works technically:**
- **Frontend:** React multi-step form component with animated transitions (Framer Motion). Each question shows curated image options (stored in Supabase Storage or Cloudinary).
- **AI Layer:** On quiz completion, send answers to OpenAI GPT-4o-mini via API. Prompt includes Stephanie's style categories and portfolio mapping. Model returns: color palette (hex codes), decor style name, 3-5 vendor type recommendations, and a "vibe description" paragraph.
- **Mood Board Generation:** Pull matching images from a pre-tagged portfolio library (Supabase + pgvector for similarity search) or use curated stock. Display as a Pinterest-style grid.
- **Data:** Answers + AI results stored in Supabase `quiz_results` table. Email captured mid-quiz (after engagement, before results — "Where should we send your mood board?").
- **APIs:** OpenAI GPT-4o-mini ($0.15/1M input tokens — pennies per quiz), Supabase for storage, optional: Resend or SendGrid for emailing results.

**Implementation complexity:** Medium

**Estimated build time:** 2-3 weeks

**Dependencies:**
- Curated image library (50-100 tagged images across styles)
- Stephanie's style taxonomy (e.g., "Mountain Rustic," "Modern Minimalist," "Garden Romance," "Boho Luxe," "Classic Elegance")
- OpenAI API key
- Supabase project with `quiz_results` table

**Example user flow:**
1. Visitor lands on homepage → sees "Discover Your Wedding Style" CTA
2. Click → full-screen quiz opens (no page navigation, modal/overlay)
3. Q1: "What's your dream setting?" → 4 image cards (Mountain, Garden, Urban Loft, Beach)
4. Q2: "Pick the table setting that speaks to you" → 4 styled images
5. Q3: "What's your color vibe?" → palette swatches (Warm Earth, Cool Neutrals, Bold Jewel, Soft Pastels)
6. Q4-Q7: Similar visual multiple-choice (flowers, lighting, formality level, guest count range)
7. Q8: "When's the big day?" → date picker
8. Q9: "What's your budget range?" → slider ($10K-$15K, $15K-$25K, $25K-$50K, $50K+)
9. Q10: "Where should we send your results?" → name + email (feels natural, not gated)
10. Loading animation ("Building your mood board...") → 2-3 seconds while GPT generates
11. Results page: personalized mood board, color palette, style name, "Stephanie's recommendation" blurb
12. CTA: "Love this? Let's make it real → Book a free consultation"
13. Results emailed as beautiful HTML email with same content + Stephanie's portfolio matches

**Competitive advantage:**
The Knot has a generic style quiz but it funnels to their marketplace. Independent planners almost never have this. Zola's quiz is basic multiple-choice with no AI synthesis. This would be the first independent planner site with an AI-powered style quiz that generates a custom mood board — massive differentiator. Couples would share results on social media (free marketing).

**Revenue/conversion impact estimate:**
- Quiz completion rate: 40-60% of starters (visual quizzes have high completion)
- Email capture rate: 70-80% of completers (they want results)
- Consultation booking from quiz leads: 15-25% (vs. 3-5% from cold form fills)
- Estimated impact: **3-5x improvement in lead quality and conversion to consultation**

---

### 2. AI Concierge Chat

**What it is:**
A branded AI chatbot trained on Stephanie's services, pricing structure, FAQs, portfolio, and personality. Available 24/7 on every page. Not a generic "How can I help you?" widget — it sounds like Stephanie's brand voice, knows her packages, can answer "Do you do elopements?" or "What's your availability in September?" and can qualify leads and book consultations directly.

**Why it matters for a wedding planner site:**
Couples research planners at 10pm on a Tuesday. If they have a question and the only option is a contact form, 60% bounce. A concierge that can answer immediately — in the brand's voice — keeps them engaged. It also pre-qualifies leads: by the time Stephanie gets the inquiry, she knows their date, budget, style, and specific questions. Saves hours of back-and-forth emails.

**How it works technically:**
- **Model:** OpenAI GPT-4o or Anthropic Claude 3.5 Sonnet via API (both excellent at maintaining brand voice with system prompts).
- **Knowledge Base:** RAG (Retrieval-Augmented Generation) architecture:
  - Stephanie's FAQ document, service descriptions, pricing tiers → chunked and embedded in Pinecone or Supabase pgvector
  - Portfolio metadata (wedding type, venue, guest count, season)
  - Blog posts and planning guides
  - Availability calendar (read-only API to Supabase or Google Calendar)
- **System Prompt:** Detailed brand voice guide — warm but professional, Colorado-specific references, knows local venues, uses Stephanie's actual phrases.
- **Frontend:** Floating chat bubble (bottom-right), expands to chat panel. Built with Vercel AI SDK (`useChat` hook) for streaming responses.
- **Lead Capture:** After 2-3 exchanges, bot naturally asks for contact info. Stores conversation + extracted data in Supabase `leads` table.
- **Handoff:** If query is complex or high-value, bot says "Let me connect you with Stephanie directly" and creates a priority notification (email + optional Telegram alert).
- **Booking:** Integrates with Calendly or Cal.com API to offer available consultation slots inline.

**Implementation complexity:** Medium-High

**Estimated build time:** 3-4 weeks

**Dependencies:**
- Stephanie's FAQ document (can start with 20-30 Q&As)
- Service descriptions and pricing structure (even ranges)
- Brand voice guide (10-15 example responses showing tone)
- Pinecone or pgvector index for RAG
- OpenAI or Anthropic API key
- Calendly/Cal.com integration for booking
- Notification system (email/Telegram) for handoffs

**Example user flow:**
1. Visitor browsing portfolio page → chat bubble pulses gently after 30 seconds
2. Click → "Hey! I'm Stephanie's AI assistant 💕 I know everything about our services, pricing, and availability. What can I help with?"
3. User: "Do you do mountain elopements?"
4. Bot: "Absolutely! Mountain elopements are one of our specialties 🏔️ We've planned intimate ceremonies at Sapphire Point, Breckenridge, and some hidden gems in the San Juans. Our elopement packages start at $X and include [brief overview]. Want to see some of our past mountain elopements, or do you have a date in mind?"
5. User: "What about October 2026?"
6. Bot: "October is gorgeous for a mountain elopement — peak fall colors! Let me check... We have availability in early and mid-October 2026. A few things to consider for fall mountain ceremonies: [weather tips, golden hour timing]. Would you like to book a free consultation call with Stephanie to start planning? I can pull up her calendar right now."
7. User: "Sure!"
8. Bot: Shows 3 available time slots inline → user picks one → booking confirmed
9. Stephanie receives: lead name, email, date preference, budget (if discussed), full conversation transcript, style tags

**Competitive advantage:**
Most wedding planner chatbots are Tidio/Intercom bots with decision trees — they feel robotic and can't handle unexpected questions. AI-powered concierge that actually knows the business is extremely rare in the independent planner space. The Knot has AI but it's marketplace-generic. This feels like texting Stephanie's assistant.

**Revenue/conversion impact estimate:**
- After-hours inquiry capture: +30-40% more leads (previously lost to bounce)
- Lead qualification savings: 5-10 hours/week of email back-and-forth eliminated
- Consultation booking rate from chat: 20-30% of engaged conversations
- Estimated impact: **30-40% increase in qualified leads, significant time savings**

---

### 3. Smart Inquiry Form

**What it is:**
An adaptive inquiry form that changes follow-up questions based on previous answers. If someone selects "Elopement" → they see mountain/venue questions, not "how many guests" at 200+ scale. If budget is under $15K → services shown are appropriately scoped. Progressive disclosure: starts with 3 questions, reveals more based on answers. Feels conversational, not bureaucratic.

**Why it matters for a wedding planner site:**
Standard contact forms are one-size-fits-all. A couple planning a 200-person ballroom wedding and a couple planning a 10-person elopement get the same questions. This feels lazy and impersonal. Smart forms show you understand different wedding types and collect the RIGHT information for each — Stephanie gets better lead data, couples feel heard from the first interaction.

**How it works technically:**
- **Frontend:** React Hook Form + conditional rendering logic. Each answer triggers a state update that shows/hides subsequent fields.
- **AI Layer (optional but recommended):** After form submission, GPT-4o-mini analyzes the full submission and generates a "lead summary" with: wedding type classification, estimated service fit, suggested package, and any red flags (e.g., date conflict, budget mismatch). Stored with the lead.
- **Branching Logic:**
  ```
  Q1: Wedding Type → [Full Wedding, Elopement, Destination, Day-of Coordination]
  
  IF "Elopement":
    Q2: Location preference → [Mountain, Forest, Urban, Undecided]
    Q3: Guest count → [Just us, 2-10, 10-30]
    Q4: Date range → date picker
    Q5: Budget → [$5K-$10K, $10K-$15K, $15K-$25K]
  
  IF "Full Wedding":
    Q2: Guest count → [50-100, 100-150, 150-200, 200+]
    Q3: Venue status → [Booked, Touring, Haven't started]
    Q4: Date → date picker
    Q5: Budget → [$25K-$50K, $50K-$75K, $75K-$100K, $100K+]
    Q6: Services needed → [Full planning, Partial planning, Month-of]
  ```
- **Data:** Supabase `inquiries` table with JSONB column for flexible schema per wedding type.
- **Notifications:** Real-time alert to Stephanie via email + Telegram with AI-generated lead summary.

**Implementation complexity:** Low-Medium

**Estimated build time:** 1-2 weeks

**Dependencies:**
- Branching logic document (Stephanie defines the paths)
- Service package definitions per wedding type
- Supabase table schema
- Email notification setup

**Example user flow:**
1. Visitor clicks "Get in Touch" or "Start Planning"
2. Step 1 (full-screen, one question): "What are you dreaming of?" → 4 beautiful cards: Full Wedding / Intimate Elopement / Destination Wedding / Day-of Coordination
3. Selects "Intimate Elopement" → smooth transition
4. Step 2: "Where does your heart take you?" → Mountain Ceremony / Forest Clearing / Urban Rooftop / Surprise Me
5. Selects "Mountain Ceremony" → Step 3: "How many people will share this moment?" → Just us two / A handful of loved ones (2-10) / An intimate gathering (10-30)
6. Step 4: "When are you thinking?" → Season selector + year, or specific date
7. Step 5: "What feels right for your investment?" → Budget ranges appropriate to elopement
8. Step 6: Contact info (name, email, phone) + "Anything else Stephanie should know?" textarea
9. Submit → "Thank you, [Name]! Stephanie will reach out within 24 hours with ideas for your mountain elopement 🏔️"
10. Stephanie receives: formatted summary with AI analysis — "High-intent elopement lead, mountain preference, fall timing, budget aligned with Elopement Package B. Suggested response: share Sapphire Point portfolio + Package B pricing."

**Competitive advantage:**
Almost zero wedding planners have adaptive forms. Most use Honeybook or generic WordPress contact forms. This alone signals sophistication and care. The AI-generated lead summary is invisible to the couple but saves Stephanie 10-15 minutes of assessment per inquiry.

**Revenue/conversion impact estimate:**
- Form completion rate: +25-35% vs. standard long forms (progressive disclosure reduces abandonment)
- Lead quality: significantly higher (right questions asked per type)
- Response time optimization: AI summary lets Stephanie send perfect first response faster
- Estimated impact: **25-35% more form completions, faster response time, better first impression**

---

### 4. Personalized Content

**What it is:**
Returning visitors see content tailored to their interests. If someone took the style quiz and got "Mountain Rustic," the homepage hero shows mountain wedding imagery, blog feed prioritizes mountain venue guides, and portfolio defaults to outdoor/mountain weddings. If they browsed elopement pages, elopement content surfaces first. First-time visitors get the default experience.

**Why it matters for a wedding planner site:**
Couples visit a planner's website 3-7 times before reaching out. Each return visit is a chance to reinforce "this planner gets me." Generic content on repeat visits feels stale. Personalized content creates a "they know me" feeling that builds trust and shortens the decision cycle.

**How it works technically:**
- **Tracking:** Cookie-based visitor ID (first-party, privacy-friendly). Store browsing behavior in localStorage + Supabase if they've provided email.
- **Segments:** Define 4-6 visitor segments:
  - Mountain/Outdoor enthusiast
  - Elopement planner
  - Large wedding planner
  - Budget-conscious
  - Luxury/high-end
  - Destination wedding
- **Content Tagging:** Tag all portfolio items, blog posts, and testimonials with segments in Supabase.
- **Personalization Logic:** Next.js middleware or client-side hook checks visitor segment → reorders content arrays.
  ```typescript
  // Pseudocode
  const segment = getVisitorSegment(cookies, quizResults);
  const portfolio = await getPortfolio({ orderBy: segment });
  const blogs = await getBlogs({ boost: segment });
  ```
- **No AI API calls needed for serving** — personalization is rule-based with pre-tagged content. AI is only used during quiz/chat to SET the segment.
- **Fallback:** Unknown visitors get default ordering. No content is hidden, just reordered.

**Implementation complexity:** Low-Medium

**Estimated build time:** 1-2 weeks (after quiz is built, since quiz provides segment data)

**Dependencies:**
- Style quiz (provides primary segmentation data)
- Content tagging system in Supabase (portfolio, blogs, testimonials tagged by segment)
- Cookie consent banner (for compliance)
- At least 3-4 pieces of content per segment to make personalization noticeable

**Example user flow:**
1. First visit: Default homepage — hero image is Stephanie's most popular/versatile shot
2. Takes style quiz → result: "Boho Mountain" → segment stored in cookie + Supabase
3. Second visit (3 days later):
   - Hero image: boho mountain wedding from portfolio
   - "Featured Weddings" section: mountain/outdoor weddings shown first
   - Blog sidebar: "Top 10 Colorado Mountain Venues" pinned at top
   - Testimonial carousel: leads with a mountain wedding couple's quote
4. Third visit: Same personalization reinforced, plus "Welcome back! Ready to start planning your mountain wedding?" subtle banner
5. If they later browse destination wedding pages extensively → segment updates to include "destination-curious," content blends both interests

**Competitive advantage:**
Essentially zero independent wedding planners personalize content. Even The Knot's personalization is basic (saved vendors). This is Amazon/Netflix-level personalization applied to a wedding planner site — feels magical when done right.

**Revenue/conversion impact estimate:**
- Return visit engagement: +20-30% time on site for personalized vs. generic
- Conversion rate for return visitors: +15-25% improvement
- "She just gets me" sentiment → stronger emotional connection pre-consultation
- Estimated impact: **15-25% improvement in return visitor conversion**

---

## Tier 2 — Differentiators

Features that make the site feel premium and forward-thinking.

---

### 5. Wedding Vibe Translator

**What it is:**
Upload a Pinterest board screenshot, paste a Pinterest board URL, or describe your wedding vision in natural language → AI analyzes it and outputs a structured mood board with: color palette (hex codes + names), decor style category, venue type recommendations, flower suggestions, table setting style, and an estimated budget range for the described vision in the Colorado market.

**Why it matters for a wedding planner site:**
Couples often come to a planner with a Pinterest board and say "I want this feeling" but can't articulate specifics. The Vibe Translator bridges the gap — it takes their inspiration and translates it into actionable planning language. This makes the first consultation dramatically more productive and shows Stephanie speaks their visual language.

**How it works technically:**
- **Image Analysis:** OpenAI GPT-4o Vision API or Anthropic Claude 3.5 Sonnet (both support image input). Upload image → model analyzes colors, textures, setting, formality level, floral types, lighting.
- **Text Analysis:** If user types a description ("Romantic garden party with lots of candles, dusty rose and sage, farm tables"), GPT-4o extracts the same structured data.
- **Pinterest URL Parsing (optional, V2):** Use Pinterest API or web scraping to pull board images, then batch-analyze.
- **Output Generation:**
  ```json
  {
    "style_name": "Romantic Garden",
    "color_palette": [
      {"name": "Dusty Rose", "hex": "#DCAE96"},
      {"name": "Sage", "hex": "#B2AC88"},
      {"name": "Cream", "hex": "#FFFDD0"},
      {"name": "Gold", "hex": "#D4AF37"}
    ],
    "decor_elements": ["farm tables", "taper candles", "loose floral runners", "linen napkins"],
    "venue_types": ["Garden estate", "Greenhouse", "Vineyard"],
    "flower_suggestions": ["garden roses", "ranunculus", "eucalyptus", "pampas grass"],
    "estimated_budget_range": "$35,000 - $55,000 (100 guests, Colorado)",
    "stephanie_note": "This vibe pairs beautifully with our Garden Romance package. I'd recommend Chatfield Farms or The Manor House for this aesthetic."
  }
  ```
- **Frontend:** Drag-and-drop upload zone + text input. Results displayed as a beautiful mood board card with color swatches and sections.
- **Stephanie's Knowledge:** System prompt includes Stephanie's venue recommendations per style, typical Colorado pricing data, and preferred vendor partners per aesthetic.

**Implementation complexity:** Medium

**Estimated build time:** 2-3 weeks

**Dependencies:**
- OpenAI GPT-4o Vision API or Claude 3.5 Sonnet (vision)
- Colorado wedding pricing data (Stephanie provides ranges per style/size)
- Venue recommendation database (Stephanie's preferred venues tagged by style)
- Image upload infrastructure (Supabase Storage or Cloudinary)

**Example user flow:**
1. User navigates to "Translate Your Vision" page
2. Option A: Drags Pinterest screenshot onto upload zone
3. Option B: Types "I want a moody, intimate dinner party vibe. Think long tables, lots of candles, dark florals, a converted warehouse or industrial space. Maybe 60 guests."
4. Loading: "Translating your vision..." (3-5 seconds)
5. Results page:
   - **Style:** "Industrial Romance"
   - **Color Palette:** 4 color swatches with hex codes (Burgundy, Black, Gold, Deep Green)
   - **Venue Matches:** "Based on your vibe, I'd suggest: Moss Denver, The Hangar at Stanley, Blanc"
   - **Florals:** "Dark dahlias, burgundy ranunculus, black calla lilies, trailing amaranthus"
   - **Budget Range:** "$40,000 - $60,000 for 60 guests in Denver"
   - **Stephanie's Note:** "Love this vibe! I just did a similar wedding at Moss last fall — let me show you."
6. CTA: "Want to make this real? → Book a consultation" + "Save this mood board" (requires email)

**Competitive advantage:**
No wedding planner website offers this. Pinterest itself doesn't translate boards into actionable plans. This is genuinely novel and highly shareable ("Look what this planner's site did with my Pinterest board!").

**Revenue/conversion impact estimate:**
- Viral potential: High — shareable results drive referral traffic
- Lead capture via "save mood board": 50-60% email capture rate
- Consultation quality: dramatically better first meetings (planner already knows the vision)
- Estimated impact: **Strong brand differentiation, 10-15% traffic increase from shares, high-quality leads**

---

### 6. AI Budget Estimator

**What it is:**
A conversational budget tool where couples input their guest count, location (Colorado regions), style preferences, and priority areas → get a realistic budget breakdown with ranges. Not generic national averages — based on actual Colorado market data that Stephanie provides. Shows line items: venue, catering per head, florals, photography, DJ/band, planner fees, rentals, attire, etc.

**Why it matters for a wedding planner site:**
Budget is the #1 anxiety point for couples and the #1 reason they hesitate to contact a planner. "I don't even know if I can afford a planner" is a real barrier. An honest, data-backed budget tool builds trust immediately and positions Stephanie as transparent and helpful — not gatekeeping pricing information.

**How it works technically:**
- **Frontend:** Multi-step conversational form (similar to quiz) or actual chat interface.
- **Data Layer:** Supabase table `budget_data` with Colorado-specific pricing:
  ```sql
  CREATE TABLE budget_ranges (
    category TEXT,          -- 'venue', 'catering', 'florals', etc.
    region TEXT,            -- 'Denver Metro', 'Mountain', 'Colorado Springs', etc.
    style_tier TEXT,        -- 'budget', 'mid', 'premium', 'luxury'
    per_unit_low NUMERIC,
    per_unit_high NUMERIC,
    unit TEXT,              -- 'flat', 'per_guest', 'per_hour'
    notes TEXT
  );
  ```
- **Calculation Engine:** Deterministic logic (not AI) for math — multiply per-guest rates × guest count, add flat fees, apply regional multipliers.
- **AI Enhancement:** GPT-4o-mini generates natural language commentary on the budget: "For a mountain wedding with 100 guests, catering tends to run higher due to logistics — expect $85-$120/person vs. $65-$95 in Denver."
- **Output:** Beautiful budget breakdown card with bar chart visualization (Recharts or Chart.js), total range, and per-category ranges.

**Implementation complexity:** Medium

**Estimated build time:** 2-3 weeks

**Dependencies:**
- Colorado wedding pricing data from Stephanie (critical — this makes it real, not generic)
- Regional multiplier data
- Budget calculation logic
- Chart library (Recharts for Next.js)

**Example user flow:**
1. User clicks "What Will Your Wedding Cost?"
2. Q1: "How many guests?" → slider (10 to 300)
3. Q2: "Where in Colorado?" → Denver Metro / Mountain Towns / Colorado Springs / Western Slope
4. Q3: "What's your style?" → 4 cards matching style quiz categories
5. Q4: "What matters most?" → rank: Food & Drink, Photography, Florals & Decor, Venue, Entertainment (drag to reorder)
6. Loading → "Crunching Colorado wedding data..."
7. Results:
   - **Estimated Total:** $42,000 - $58,000
   - Breakdown bar chart showing each category
   - Line items with ranges
   - "Where to splurge vs. save" AI-generated tips based on their priority ranking
   - "Stephanie's take: With this budget and style, my [Package Name] would be a great fit at $X."
8. CTA: "Let's build a real budget together → Book a consultation"
9. Option to download as PDF or email to partner

**Competitive advantage:**
The Knot has a generic budget calculator but it's national averages. WeddingWire is similar — broad and impersonal. A Colorado-specific estimator backed by a local planner's real data is genuinely useful and builds trust. No independent planner offers this.

**Revenue/conversion impact estimate:**
- Tool usage: high (budget is the #1 searched wedding topic)
- SEO value: "Colorado wedding budget calculator" → high-intent keyword
- Trust building: positions Stephanie as transparent and knowledgeable
- Estimated impact: **Strong SEO traffic driver, 15-20% of tool users become leads**

---

### 7. Vendor Match Engine

**What it is:**
Based on style quiz results + budget + location, the system recommends vetted vendor partners from Stephanie's preferred vendor network. "Based on your Mountain Rustic style and $40K budget, here are photographers, florists, and caterers Stephanie loves working with." Each recommendation includes why they're a good match.

**Why it matters for a wedding planner site:**
Vendor referrals are a core part of a planner's value. Automating initial recommendations (while Stephanie provides the curated list) scales this value to website visitors who haven't booked yet. It also strengthens vendor relationships — partners get referrals, creating reciprocal referral opportunities.

**How it works technically:**
- **Vendor Database:** Supabase table:
  ```sql
  CREATE TABLE vendors (
    id UUID PRIMARY KEY,
    name TEXT,
    category TEXT,         -- 'photographer', 'florist', 'caterer', etc.
    regions TEXT[],         -- ['Denver', 'Mountain', 'Statewide']
    style_tags TEXT[],      -- ['rustic', 'modern', 'boho', 'luxury']
    price_tier TEXT,        -- 'budget', 'mid', 'premium', 'luxury'
    stephanie_note TEXT,    -- personal endorsement
    website TEXT,
    instagram TEXT,
    portfolio_images TEXT[],
    featured BOOLEAN
  );
  ```
- **Matching Logic:** SQL query filtered by style tags, region, price tier. Ranked by Stephanie's preference (featured flag, manual sort order).
- **AI Enhancement:** GPT-4o-mini generates personalized "why this vendor" blurbs based on the couple's quiz answers + vendor profile.
- **Display:** Card grid per category, 2-3 vendors each, with images, blurb, and links.

**Implementation complexity:** Medium

**Estimated build time:** 2-3 weeks

**Dependencies:**
- Stephanie's vendor database (names, categories, style tags, price tiers, notes)
- Vendor permission to be listed (may need agreements)
- Style quiz completion (provides matching data)
- Vendor photos/portfolio images

**Example user flow:**
1. After style quiz → results page includes "Vendors Stephanie Loves for Your Style"
2. OR standalone "Find Your Dream Team" page
3. Filters pre-set from quiz (or manual selection): Style: Mountain Rustic, Budget: Mid, Region: Mountain
4. Results:
   - **📸 Photography:** "Mountain Magic Photo Co. — Sarah captures the golden hour like nobody else. Perfect for your intimate mountain vibe. Mid-range pricing." + 3 portfolio thumbnails
   - **💐 Florals:** "Wildflower Design Studio — Emily specializes in loose, organic arrangements that look like they were just picked from an alpine meadow."
   - **🍽️ Catering:** "Peak to Plate — Farm-to-table mountain catering. They handle remote venues like pros."
5. Each card: website link, Instagram link, "Tell them Stephanie sent you!"
6. Option to save vendor list → requires email capture

**Competitive advantage:**
The Knot/WeddingWire have vendor directories but they're pay-to-play marketplaces — not curated recommendations. A planner's personal, curated vendor list with AI-matched reasoning is a premium experience that marketplaces can't replicate.

**Revenue/conversion impact estimate:**
- Vendor partner goodwill: referral reciprocity drives leads back to Stephanie
- Email capture: "Save your vendor list" → 40-50% capture rate
- Differentiator in consultations: "We already matched you with vendors before our first call"
- Estimated impact: **Strengthens vendor partnerships, captures emails, enhances perceived value**

---

### 8. AI Timeline Generator

**What it is:**
Input your wedding date → get a personalized, backward-planned timeline with milestones, deadlines, and reminders. "Your wedding is October 15, 2026 — that's 8 months away. Here's what you should be doing now and what's coming up." Adapts based on wedding type (full wedding vs. elopement has very different timelines).

**How it works technically:**
- **Core Logic:** Deterministic timeline engine — predefined milestones at set intervals before wedding date (12 months out: book venue, 9 months: hire photographer, etc.).
- **Customization:** Wedding type and guest count shift milestones. Elopement timeline is shorter and different. Destination wedding adds travel logistics milestones.
- **AI Enhancement:** GPT-4o-mini generates natural language descriptions and Colorado-specific tips for each milestone ("Book your mountain venue NOW — September and October dates at popular venues like The Black Canyon Inn fill 12-18 months out").
- **Output:** Interactive timeline (vertical scroll) with checkboxes. Option to export to Google Calendar (using Google Calendar API — add events with reminders).
- **Data:** Template timelines in Supabase `timeline_templates` table, customized on generation.

**Implementation complexity:** Low-Medium

**Estimated build time:** 1-2 weeks

**Dependencies:**
- Timeline template data (Stephanie's recommended planning timeline per wedding type)
- Google Calendar API integration (optional, for export)
- Wedding date and type from user input

**Example user flow:**
1. "Build Your Timeline" → enter wedding date + wedding type + guest count
2. Instant result: scrollable timeline with ~20-30 milestones
3. Each milestone: checkbox, date, title, description, Stephanie's tip
4. "Add to Google Calendar" button → exports all milestones as calendar events with reminders
5. "Get weekly reminders" → email capture for automated reminder emails
6. CTA at key milestones: "This is when most couples hire a planner → Book a consultation"

**Competitive advantage:**
Free timeline tools exist (The Knot, Zola) but they're generic. A Colorado-specific timeline from an actual planner, with real venue booking insights and seasonal tips, is more valuable.

**Revenue/conversion impact estimate:**
- High utility → frequent return visits to check off milestones
- Email capture via "weekly reminders": 60-70% capture rate
- Natural consultation CTA at "hire a planner" milestone
- Estimated impact: **Strong retention tool, 10-15% of timeline users convert to leads**

---

### 9. Smart Gallery

**What it is:**
AI-tagged portfolio where visitors can filter using natural language: "Show me outdoor summer weddings under 50 guests" or "mountain elopements with lots of greenery" or "modern Denver weddings." Every portfolio image is tagged with metadata (season, venue type, guest count, style, colors, setting) and searchable via semantic search.

**How it works technically:**
- **Image Tagging:** One-time batch process — run all portfolio images through GPT-4o Vision API to generate tags:
  ```json
  {
    "season": "fall",
    "setting": "outdoor",
    "venue_type": "mountain",
    "guest_count_estimate": "under_50",
    "style_tags": ["rustic", "intimate", "boho"],
    "colors": ["burgundy", "gold", "green"],
    "elements": ["arch", "candles", "aspen_trees", "long_table"],
    "mood": "romantic",
    "time_of_day": "golden_hour"
  }
  ```
- **Embeddings:** Generate text embeddings (OpenAI `text-embedding-3-small`) for each image's combined tag text. Store in Supabase pgvector.
- **Search:** User's natural language query → embedded → cosine similarity search against image embeddings → return top matches.
- **Frontend:** Search bar at top of gallery + filter chips. Results load as masonry grid. Smooth, fast.
- **Fallback:** Also support traditional filter dropdowns (Season, Venue Type, Guest Count, Style) for users who prefer clicking.

**Implementation complexity:** Medium

**Estimated build time:** 2-3 weeks

**Dependencies:**
- Portfolio images (50-200+ high-quality images)
- GPT-4o Vision API for batch tagging
- Supabase with pgvector extension
- OpenAI Embeddings API
- Stephanie's manual review/correction of AI-generated tags

**Example user flow:**
1. Visit "Our Work" / Portfolio page
2. See search bar: "Describe your dream wedding and I'll show you something similar..."
3. Type: "intimate mountain ceremony with wildflowers"
4. Gallery filters in real-time → shows 8-12 matching images from mountain elopements with floral elements
5. Click any image → lightbox with details: venue name, guest count, season, style notes
6. "Love this wedding? See the full story →" links to blog post
7. "Want something like this? → Let's talk"

**Competitive advantage:**
No wedding planner has natural language portfolio search. Most planners have basic grid galleries or categorized albums. This feels like a premium tech experience while showcasing real work.

**Revenue/conversion impact estimate:**
- Time on portfolio pages: +40-50% (search invites exploration)
- "I want this" moments: direct conversion path from inspired browsing to inquiry
- Estimated impact: **Increases portfolio engagement, 10-15% improvement in portfolio→inquiry conversion**

---

## Tier 3 — AI-Forward / Experimental

Bleeding edge features for maximum wow factor.

---

### 10. AI Wedding Day Visualizer

**What it is:**
Describe your vision + upload a venue photo → AI generates a visualization of your wedding setup. See your ceremony arch at your actual venue, your reception table layout with your color palette, your dance floor with your lighting scheme. Not final design — inspiration-grade visualization.

**How it works technically:**
- **Image Generation:** Flux Pro or DALL-E 3 API for generating wedding scene images. Alternatively, Replicate-hosted Flux models for cost efficiency.
- **Venue Photo Input:** User uploads photo of their venue (empty). GPT-4o Vision analyzes the space.
- **Prompt Construction:** System combines: venue description + user's style quiz results + specific requests ("add a floral arch with roses and eucalyptus at the end of the aisle") → generates a detailed image prompt.
- **Inpainting (advanced):** Use Flux inpainting to modify the actual venue photo — add decorations to the real space. This is more technically complex but dramatically more impressive.
- **Output:** 2-4 generated images showing different angles/options. Watermarked with Stephanie's brand.

**Implementation complexity:** High

**Estimated build time:** 4-6 weeks

**Dependencies:**
- Image generation API (Replicate/Flux Pro, DALL-E 3, or Midjourney API)
- Style quiz data or manual input
- Venue photo upload infrastructure
- Careful prompt engineering for realistic wedding scenes
- Content moderation (ensure appropriate outputs)

**Example user flow:**
1. "Visualize Your Wedding" page
2. Upload venue photo (or select from Stephanie's venue photo library)
3. Describe additions: "Ceremony arch with white roses and eucalyptus, wooden chairs with sage green sashes, petal-lined aisle, string lights overhead"
4. Select color palette (from quiz or manual)
5. "Generating your vision..." (15-30 seconds)
6. 3 visualization options appear — different angles/interpretations
7. "Love it? Let's make it real → Book a consultation"
8. Save/share options (requires email)

**Competitive advantage:**
Extremely novel. Some interior design sites (Havenly, Modsy) do room visualization but nobody does this for weddings. Would generate significant press/social media attention.

**Revenue/conversion impact estimate:**
- Viral potential: Very high — couples would share generated images on social media
- PR/press value: "This Colorado wedding planner lets you see your wedding before you plan it"
- Estimated impact: **Brand awareness driver, PR generator, moderate direct conversion**

---

### 11. Voice-Powered Planning Assistant

**What it is:**
Voice interface for hands-free wedding planning queries. Either on-site (browser speech recognition) or via Alexa/Google Home skill. "Hey Google, ask Party Girl Events how many weeks until my wedding" or "Alexa, what should I be doing this month for my October wedding?"

**How it works technically:**
- **On-site:** Web Speech API (browser-native) for speech-to-text → process with existing AI Concierge → text-to-speech response (ElevenLabs API for natural voice, or browser TTS).
- **Alexa/Google:** Build an Alexa Skill / Google Action. Backend: AWS Lambda or Vercel serverless function → calls same AI Concierge API. User links their wedding profile (date, type, timeline) during setup.
- **Voice Model:** ElevenLabs with a warm, friendly voice clone (or select from their library). Gives the brand a literal voice.

**Implementation complexity:** High

**Estimated build time:** 4-8 weeks (on-site: 2 weeks, smart speaker: 4-6 additional weeks for certification)

**Dependencies:**
- AI Concierge (Tier 1) must be built first
- ElevenLabs API key (for premium voice)
- Alexa Developer / Google Actions console accounts
- Certification process for smart speaker skills (2-4 weeks)

**Example user flow:**
1. On-site: Click microphone icon in chat → "What venues do you recommend for a fall mountain elopement?"
2. AI responds via voice + text: "For a fall mountain elopement, I love Sapphire Point for its accessibility, or if you want something more remote, the Maroon Bells area is breathtaking in September..."
3. Smart speaker: "Alexa, open Party Girl Events" → "Welcome back, Sarah! Your wedding is 147 days away. This month, you should be finalizing your catering menu and scheduling your hair and makeup trial."

**Competitive advantage:**
No wedding planner has a voice assistant. This is pure "wow factor" and press magnet.

**Revenue/conversion impact estimate:**
- Direct conversion: Low (voice users are already engaged clients, not new leads)
- Brand perception: Extremely high — positions Stephanie as tech-forward
- PR value: High — "First wedding planner with Alexa skill" is a story
- Estimated impact: **Brand differentiation and PR, minimal direct revenue**

---

### 12. Predictive Availability

**What it is:**
AI analyzes Stephanie's historical booking patterns + Colorado wedding industry trends to suggest optimal dates. "Saturday dates in September are 95% booked by March. Friday September dates are 60% cheaper and still have availability. Consider September 12 — it's a Friday with ideal weather historically."

**How it works technically:**
- **Data Sources:** Stephanie's booking history (Supabase), Colorado weather data (NOAA API), venue availability patterns (manual input or API if venues offer it), industry trend data.
- **Model:** Simple statistical model (not deep learning needed) — analyze booking velocity by month, day-of-week, and lead time. Use historical weather data for "ideal weather probability" scores.
- **Output:** Calendar heat map showing: demand level (color), weather probability, suggested dates, pricing impact of day-of-week choice.
- **AI Layer:** GPT-4o generates natural language insights from the data patterns.

**Implementation complexity:** Medium-High

**Estimated build time:** 3-4 weeks

**Dependencies:**
- 2+ years of Stephanie's booking data
- Colorado weather historical data
- Venue pricing data (day-of-week differentials)

**Example user flow:**
1. "Find Your Perfect Date" tool
2. Select: preferred month(s), day-of-week flexibility (Y/N), guest count, venue preference
3. Calendar heat map: green (great availability + weather), yellow (moderate), red (high demand)
4. Click any date → popup: "Saturday, Sept 19: High demand — book 12+ months ahead. Average weather: 72°F, 15% rain chance. Typical venue premium: +20% vs. Friday."
5. "September Fridays are hidden gems — same gorgeous weather, better vendor availability, and typically $5-10K savings overall."

**Competitive advantage:**
Unique tool. No planner offers data-driven date selection. Positions Stephanie as analytical and honest about industry dynamics.

**Revenue/conversion impact estimate:**
- Utility drives engagement and trust
- Nudges couples toward less popular dates → better for Stephanie's schedule
- Estimated impact: **Moderate conversion driver, helps optimize Stephanie's calendar utilization**

---

### 13. AI-Generated Blog Content

**What it is:**
AI auto-generates venue guides, trend articles, seasonal planning tips, and "X vs. Y" comparison posts. Stephanie reviews and edits for personal voice and accuracy, then publishes. 4-8 posts/month with minimal effort. Fuel for SEO strategy targeting "Colorado wedding" long-tail keywords.

**How it works technically:**
- **Content Pipeline:**
  1. Keyword research (Ahrefs/SEMrush data or manual) → target keyword selected
  2. GPT-4o or Claude generates first draft with: outline, SEO title, meta description, headers, body content (1,500-2,500 words)
  3. System prompt includes Stephanie's voice guide, Colorado expertise, and "write from experience" directive
  4. Draft appears in admin dashboard for review
  5. Stephanie edits (typically 15-30 min vs. 2-3 hours to write from scratch)
  6. Publish via CMS (Next.js MDX or Supabase content table)
- **Content Types:**
  - Venue guides: "The Ultimate Guide to [Venue Name]" (template-driven, consistent format)
  - Seasonal: "Fall Mountain Wedding Planning: What You Need to Know for 2026"
  - Comparison: "Elopement vs. Micro Wedding: Which is Right for You?"
  - Trend: "2026 Colorado Wedding Trends We're Seeing"
- **Automation:** Cron job or Supabase Edge Function generates drafts on schedule. Stephanie gets weekly email: "3 new blog drafts ready for review."

**Implementation complexity:** Low-Medium

**Estimated build time:** 1-2 weeks for pipeline setup

**Dependencies:**
- OpenAI or Anthropic API key
- SEO keyword targets (manual or from SEO tool)
- Stephanie's brand voice guide
- CMS infrastructure
- Stephanie's commitment to review/edit (15-30 min per post)

**Example user flow (admin):**
1. System generates 2 drafts on Monday: "Best Venues for a Winter Wedding in Breckenridge" and "How Much Does a Colorado Wedding Planner Cost in 2026?"
2. Stephanie gets email notification with preview links
3. Opens admin dashboard → reviews first draft → adds personal anecdote about a Breckenridge wedding she planned, corrects a venue detail, adjusts tone
4. Clicks "Publish" → live on site with proper SEO metadata
5. Auto-shared to social (optional integration)

**Competitive advantage:**
Most planners blog inconsistently (1-2 posts/month) because it's time-consuming. AI-assisted content at 4-8 posts/month builds massive SEO moat. The human-edited approach keeps quality high and avoids the "AI content" penalty.

**Revenue/conversion impact estimate:**
- SEO traffic: +50-100% within 6 months with consistent publishing
- Long-tail keyword capture: "best mountain wedding venues Breckenridge" → direct lead gen
- Authority building: more content = higher domain authority
- Estimated impact: **Major long-term SEO driver, 20-40% organic traffic increase over 6 months**

---

### 14. Sentiment-Aware Follow-ups

**What it is:**
AI analyzes incoming inquiry tone, urgency signals, and content to automatically prioritize leads. A message that says "OMG we just got engaged and our date is in 4 months HELP" gets flagged as urgent and hot. A message that says "We're starting to look at planners for 2028" gets tagged as warm/long-term. Stephanie sees a prioritized inbox instead of chronological.

**How it works technically:**
- **Analysis Pipeline:** When inquiry hits Supabase → trigger Edge Function → send message text to GPT-4o-mini with classification prompt:
  ```
  Analyze this wedding inquiry and classify:
  - Urgency: [urgent/normal/long-term]
  - Temperature: [hot/warm/cool]  
  - Budget signal: [luxury/mid/budget/unknown]
  - Timeline: [under 6 months / 6-12 months / 12+ months]
  - Key concerns: [list top 3]
  - Suggested response priority: [respond today / within 48h / weekly batch]
  - Draft first-line response: [personalized opening line]
  ```
- **Dashboard:** Admin view shows leads sorted by priority score (computed from urgency × temperature × timeline proximity). Color-coded cards.
- **Notifications:** Urgent/hot leads trigger immediate notification (Telegram/SMS). Others batch into daily digest email.

**Implementation complexity:** Low-Medium

**Estimated build time:** 1-2 weeks

**Dependencies:**
- Inquiry system (Smart Inquiry Form or AI Concierge)
- Supabase Edge Functions
- OpenAI API
- Admin dashboard
- Notification system (Telegram bot or SMS via Twilio)

**Example user flow (admin):**
1. 3 inquiries come in overnight
2. Stephanie opens admin dashboard at 8am:
   - 🔴 **URGENT:** "Getting married in May, venue booked, need a planner ASAP, budget $50K" → Priority: Respond NOW
   - 🟡 **WARM:** "Looking at fall 2027, wondering about packages" → Priority: Respond within 48h
   - 🟢 **NURTURE:** "Just engaged, 2028, starting research" → Priority: Add to newsletter, respond weekly
3. Each lead card shows: sentiment summary, suggested response opening, estimated budget, priority action
4. Stephanie responds to the urgent lead first, saves 20 minutes of assessment

**Competitive advantage:**
Enterprise CRMs (HubSpot, Salesforce) have lead scoring, but they're expensive and not wedding-specific. A lightweight, AI-powered priority system built for a solo planner is unique and practical.

**Revenue/conversion impact estimate:**
- Response time to hot leads: minutes instead of hours → captures time-sensitive bookings
- Reduced cognitive load: Stephanie focuses energy on highest-value leads
- Estimated impact: **5-10% improvement in hot lead conversion, significant time savings**

---

## AI Ethics & Trust

### The Wedding Space is Emotional — AI Must Be Handled Carefully

Weddings are deeply personal, emotional, and high-stakes. AI features must enhance the human connection, not replace it. Key principles:

1. **Transparency:** Always disclose when AI is involved. "Stephanie's AI assistant" not "Stephanie" (when it's the bot). Couples should never feel deceived.

2. **Warmth over efficiency:** AI responses should feel warm and personal, not corporate or robotic. Better to be slightly slower and more thoughtful than instant and generic.

3. **Human escalation:** Every AI interaction must have a clear path to a real human. "Want to talk to Stephanie directly?" should always be one click away. Never trap users in bot loops.

4. **AI as augmentation, not replacement:** Position AI as "Stephanie's assistant" — it handles the 80% of routine queries so Stephanie can focus on the 20% that require her personal expertise and creativity.

5. **Avoid the "uncanny valley":** Don't make AI pretend to be human. A friendly AI assistant is trustworthy. An AI pretending to be Stephanie is creepy. Clear boundaries.

6. **Sensitive topics:** Wedding planning involves family dynamics, budget stress, relationship tensions. AI should be empathetic but know when to step back: "That sounds like something best discussed with Stephanie directly — she's really thoughtful about navigating family dynamics."

7. **No manipulation:** AI should inform and assist, not pressure. No fake urgency ("Only 2 dates left!"), no dark patterns, no exploiting emotional vulnerability.

8. **Feedback loops:** Let users rate AI interactions ("Was this helpful?"). Use feedback to improve. Show couples their input shapes the experience.

---

## Data & Privacy

### What Data Is Collected

| Data Type | Source | Purpose | Retention |
|-----------|--------|---------|-----------|
| Quiz answers | Style quiz | Personalization, lead qualification | Until account deletion or 2 years |
| Chat transcripts | AI Concierge | Lead qualification, training improvement | 1 year |
| Contact info | Forms, quiz, chat | Lead follow-up | Until unsubscribe + 30 days |
| Browsing behavior | Cookies (first-party) | Content personalization | Session-based or 90 days |
| Budget inputs | Budget estimator | Personalization | Ephemeral (not stored unless saved) |
| Uploaded images | Vibe Translator, Visualizer | Feature functionality | Deleted after 30 days unless saved |
| Vendor preferences | Vendor Match | Recommendations | Tied to quiz results |

### GDPR/CCPA Compliance

1. **Cookie Consent Banner:** Required. Use a compliant banner (e.g., CookieYes, Osano) that allows granular consent. Personalization cookies require explicit opt-in.

2. **Privacy Policy:** Update to include:
   - What AI features collect
   - How data is used (personalization, lead qualification)
   - Third-party processors (OpenAI, Anthropic, Supabase, Vercel)
   - Data retention periods
   - Right to delete, export, and opt-out

3. **Data Processing Agreements:** Ensure DPAs with:
   - OpenAI (they have standard DPA)
   - Anthropic (standard DPA available)
   - Supabase (SOC2 compliant, DPA available)
   - Vercel (DPA available)

4. **Right to Delete:** Implement "Delete my data" flow — removes quiz results, chat transcripts, contact info, browsing data. Supabase soft-delete with 30-day purge.

5. **Data Minimization:** Don't collect more than needed. Budget estimator doesn't need to store results unless user explicitly saves. Chat transcripts auto-purge after 1 year.

6. **OpenAI/Anthropic Data Usage:** Use API (not consumer products) — API data is NOT used for training by default. Verify current policies and include this in privacy policy for transparency.

7. **CCPA Specific:**
   - "Do Not Sell My Personal Information" link in footer
   - Opt-out mechanism for data sharing with third-party analytics
   - Annual privacy policy review

### Security Measures

- All data encrypted at rest (Supabase default) and in transit (TLS)
- API keys stored in environment variables, never client-side
- Row-level security in Supabase for user data
- Rate limiting on all AI endpoints (prevent abuse/cost overruns)
- Input sanitization on all user inputs before sending to AI models
- No PII in AI model prompts beyond what's necessary for the feature

---

## Tech Stack for AI Features

### Recommended Architecture

```
┌─────────────────────────────────────────────┐
│                  Frontend                     │
│  Next.js 14+ (App Router) · React · Tailwind │
│  Vercel AI SDK (useChat, useCompletion)       │
│  Framer Motion (animations)                   │
│  Recharts (budget charts)                     │
├─────────────────────────────────────────────┤
│               API Layer                       │
│  Next.js Route Handlers (app/api/*)           │
│  Vercel Edge Functions (low-latency)          │
│  Rate limiting (upstash/ratelimit)            │
├─────────────────────────────────────────────┤
│              AI Services                      │
│  OpenAI GPT-4o (chat, analysis, vision)       │
│  OpenAI GPT-4o-mini (budget tasks)            │
│  OpenAI text-embedding-3-small (search)       │
│  Anthropic Claude 3.5 Sonnet (alternative)    │
│  Replicate Flux Pro (image generation)        │
│  ElevenLabs (voice, if implementing Tier 3)   │
├─────────────────────────────────────────────┤
│             Data Layer                        │
│  Supabase (PostgreSQL + pgvector + Auth)      │
│  Supabase Storage (images, uploads)           │
│  Supabase Edge Functions (triggers)           │
│  Supabase Realtime (admin notifications)      │
├─────────────────────────────────────────────┤
│            Infrastructure                     │
│  Vercel (hosting, edge, serverless)           │
│  Cloudflare (DNS, caching, DDoS protection)   │
│  Upstash Redis (rate limiting, caching)       │
│  Resend (transactional email)                 │
└─────────────────────────────────────────────┘
```

### API Cost Estimates (Monthly)

| Service | Usage Estimate | Monthly Cost |
|---------|---------------|-------------|
| OpenAI GPT-4o | ~500 chat conversations, ~200 quiz completions | $15-30 |
| OpenAI GPT-4o-mini | ~1000 budget/classification calls | $2-5 |
| OpenAI Embeddings | ~500 gallery searches | $1-2 |
| OpenAI GPT-4o Vision | ~100 vibe translations, one-time gallery tagging | $5-15 |
| Replicate Flux Pro | ~50 visualizations (Tier 3) | $10-25 |
| Supabase Pro | Database, storage, auth, edge functions | $25 |
| Vercel Pro | Hosting, serverless functions | $20 |
| Upstash Redis | Rate limiting, caching | $0-10 |
| Resend | Transactional emails | $0-20 |
| ElevenLabs | Voice (Tier 3 only) | $5-22 |
| **Total (Tier 1 only)** | | **$60-80/mo** |
| **Total (Tier 1+2)** | | **$80-120/mo** |
| **Total (All Tiers)** | | **$120-180/mo** |

### Key Libraries & Packages

```json
{
  "ai": "^3.0.0",                    // Vercel AI SDK
  "@ai-sdk/openai": "^0.0.40",       // OpenAI provider
  "@ai-sdk/anthropic": "^0.0.30",    // Anthropic provider (backup)
  "@supabase/supabase-js": "^2.39",  // Supabase client
  "framer-motion": "^11.0",          // Quiz animations
  "recharts": "^2.12",               // Budget charts
  "react-dropzone": "^14.2",         // Image upload (Vibe Translator)
  "@upstash/ratelimit": "^1.0",      // Rate limiting
  "resend": "^3.0",                  // Emails
  "zod": "^3.22"                     // Input validation
}
```

### Implementation Priority & Roadmap

```
MONTH 1 (Weeks 1-4):
├── Smart Inquiry Form (1-2 weeks) ← fastest win
├── AI Concierge Chat (3-4 weeks, start week 1)
└── Content tagging setup for personalization

MONTH 2 (Weeks 5-8):
├── AI Wedding Style Quiz (2-3 weeks)
├── Personalized Content (1-2 weeks, after quiz)
└── Sentiment-Aware Follow-ups (1-2 weeks)

MONTH 3 (Weeks 9-12):
├── AI Budget Estimator (2-3 weeks)
├── AI Timeline Generator (1-2 weeks)
└── AI-Generated Blog Content pipeline (1-2 weeks)

MONTH 4 (Weeks 13-16):
├── Smart Gallery with NL search (2-3 weeks)
├── Vendor Match Engine (2-3 weeks)
└── Wedding Vibe Translator (2-3 weeks)

MONTH 5+ (Tier 3, as desired):
├── AI Wedding Day Visualizer
├── Predictive Availability
└── Voice-Powered Planning Assistant
```

---

## Quick Reference: Feature Matrix

| Feature | Tier | Complexity | Build Time | Monthly Cost | Conversion Impact |
|---------|------|-----------|------------|-------------|-------------------|
| AI Wedding Style Quiz | 1 | Medium | 2-3 wks | $5-10 | ⭐⭐⭐⭐⭐ |
| AI Concierge Chat | 1 | Med-High | 3-4 wks | $15-30 | ⭐⭐⭐⭐⭐ |
| Smart Inquiry Form | 1 | Low-Med | 1-2 wks | $2-5 | ⭐⭐⭐⭐ |
| Personalized Content | 1 | Low-Med | 1-2 wks | $0 | ⭐⭐⭐ |
| Wedding Vibe Translator | 2 | Medium | 2-3 wks | $5-15 | ⭐⭐⭐⭐ |
| AI Budget Estimator | 2 | Medium | 2-3 wks | $2-5 | ⭐⭐⭐⭐ |
| Vendor Match Engine | 2 | Medium | 2-3 wks | $2-5 | ⭐⭐⭐ |
| AI Timeline Generator | 2 | Low-Med | 1-2 wks | $2-5 | ⭐⭐⭐ |
| Smart Gallery | 2 | Medium | 2-3 wks | $3-5 | ⭐⭐⭐ |
| AI Wedding Day Visualizer | 3 | High | 4-6 wks | $10-25 | ⭐⭐ |
| Voice Assistant | 3 | High | 4-8 wks | $5-22 | ⭐ |
| Predictive Availability | 3 | Med-High | 3-4 wks | $2-5 | ⭐⭐ |
| AI Blog Content | 3 | Low-Med | 1-2 wks | $5-10 | ⭐⭐⭐ |
| Sentiment Follow-ups | 3 | Low-Med | 1-2 wks | $2-5 | ⭐⭐⭐ |

---

*This document is designed to be actionable. A developer can pick up any feature section and begin implementation. For questions or prioritization discussions, reference the Tier system and roadmap above.*
