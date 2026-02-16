# US-004 — Video Testimonials

**Epic:** [06 — Differentiators](README.md)
**Priority:** P1 — Should Have
**Points:** 2
**Status:** Not Started

---

## Description

Add video testimonial support to the site with a reusable video testimonial component that displays 30-90 second client testimonial clips. Videos are embedded on the homepage testimonial section, services pages, and the about page. The component lazy-loads video for performance, never autoplays, provides a text testimonial fallback when video is unavailable, and includes a transcript for accessibility. Video testimonials are significantly more persuasive than text — hearing a real couple describe their experience creates emotional trust that text alone cannot match.

---

## Acceptance Criteria

### Video Testimonial Component
- [ ] Reusable `<VideoTestimonial>` component accepting: video URL, poster image, couple name, venue name, quote text, transcript
- [ ] Video player with play/pause controls, progress bar, volume control, and fullscreen toggle
- [ ] Custom-styled player matching the site's design system (no default browser chrome)
- [ ] Poster image (thumbnail) displayed before playback with a centered play button overlay
- [ ] No autoplay — video only plays on explicit user interaction
- [ ] Lazy-loaded: video element uses `loading="lazy"` or Intersection Observer to defer loading until near viewport
- [ ] Responsive: video scales proportionally (16:9 aspect ratio maintained) across all breakpoints
- [ ] Fallback: if video URL is unavailable or fails to load, display the text testimonial quote with couple name and venue

### Placement
- [ ] Integrated into the homepage testimonial carousel (Epic 02 US-001 Section 6) — video testimonials interspersed with text testimonials
- [ ] Displayed on relevant services pages where a testimonial references that service tier
- [ ] Displayed on the about page in a testimonials section
- [ ] CMS field on testimonial content model to optionally attach a video URL and transcript

### Accessibility
- [ ] Transcript available for every video: expandable text below the video player or accessible via a "Read Transcript" toggle
- [ ] Video player is keyboard accessible: Space/Enter to play/pause, arrow keys for seek, Tab for controls
- [ ] `aria-label` on the video player: "Video testimonial from [couple name]"
- [ ] Captions/subtitles support if `.vtt` caption files are provided (nice-to-have)

### Analytics
- [ ] PostHog events: `video_testimonial_played` (with couple name and page), `video_testimonial_completed`, `video_testimonial_paused`

---

## Technical Notes

- **Component:** `src/components/ui/video-testimonial.tsx`
- **Video Hosting:** Videos should be hosted on a CDN (Supabase Storage, Cloudflare R2, or similar) — not YouTube/Vimeo embeds, to avoid third-party tracking and maintain design control. If budget is a concern, Mux or Cloudflare Stream are cost-effective options.
- **Format:** MP4 (H.264) for broad compatibility. Consider WebM as a secondary format for smaller file sizes.
- **Optimization:** Compress videos to target < 10MB per clip (30-90 seconds). Use `ffmpeg` or a service like Mux for transcoding.
- **Poster Images:** Extract a representative frame from each video or use a styled thumbnail.
- **Lazy Loading:** Use `react-intersection-observer` hook to trigger video element mounting only when the component enters the viewport.
- **CMS Model Update:** Add optional `videoUrl`, `videoPoster`, and `transcript` fields to the existing `Testimonial` content model.

---

## Dependencies

- **Epic 01 US-003:** UI component library (base components for styling)
- **Epic 02 US-001:** Homepage testimonial carousel (integration point)
- **From Stephanie:** 3-5 video testimonial clips (30-90 seconds each), recorded by couples or extracted from wedding highlight videos. Written transcripts for each video.

---

## Definition of Done

- [ ] `<VideoTestimonial>` component renders correctly with video playback, poster image, and text fallback
- [ ] Videos lazy-load and do not autoplay on any page
- [ ] Component integrated on homepage, services pages, and about page
- [ ] Text fallback displays correctly when video is unavailable
- [ ] Transcript is accessible for every video testimonial
- [ ] Video player is keyboard accessible
- [ ] PostHog analytics events fire on play, pause, and completion
- [ ] Videos load without impacting page performance (Lighthouse score maintains > 85)
- [ ] Responsive design verified on mobile and desktop
