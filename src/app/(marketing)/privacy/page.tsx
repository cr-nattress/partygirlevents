import type { Metadata } from "next";
import { Section, PageHero } from "@/components/layout";

export const metadata: Metadata = {
  title: "Privacy Policy | Party Girl Events",
  description: "Privacy Policy for Party Girl Events website.",
  robots: { index: false, follow: true },
};

/* ------------------------------------------------------------------ */
/*  Table of Contents                                                 */
/* ------------------------------------------------------------------ */

const sections = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-your-information", title: "How We Use Your Information" },
  { id: "cookies-and-tracking", title: "Cookies & Tracking" },
  { id: "third-party-data-sharing", title: "Third-Party Data Sharing" },
  { id: "data-retention", title: "Data Retention" },
  { id: "gdpr-rights", title: "GDPR Rights" },
  { id: "ccpa-rights", title: "CCPA Rights" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "data-security", title: "Data Security" },
  { id: "contact-for-data-requests", title: "Contact for Data Requests" },
  { id: "changes-to-this-policy", title: "Changes to This Policy" },
];

export default async function PrivacyPage() {
  return (
    <>
      <PageHero
        variant="minimal"
        headline="Privacy Policy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
      />

      <Section bg="white" narrow>
        <p className="mb-8 text-sm text-muted">
          <strong>Last Updated:</strong> February 15, 2026
        </p>

        {/* Table of Contents */}
        <nav
          aria-label="Table of Contents"
          className="mb-12 rounded-lg border border-foreground/10 bg-background p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Table of Contents
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-accent underline-offset-2 transition-colors hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Full Privacy Policy Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-accent prose-a:underline-offset-2">
          <p>
            Party Girl Events (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;) respects your privacy and is committed to
            protecting the personal information you share with us. This Privacy
            Policy describes how we collect, use, disclose, and safeguard your
            information when you visit our website at{" "}
            <strong>partygirlevents.com</strong> or engage our wedding planning
            and event coordination services.
          </p>

          {/* 1 */}
          <h2 id="information-we-collect">1. Information We Collect</h2>

          <h3>Information You Provide Directly</h3>
          <p>
            When you contact us through our website, request a consultation,
            submit an inquiry form, or engage our planning services, we may
            collect:
          </p>
          <ul>
            <li>Your name and the name of your partner</li>
            <li>Email address and phone number</li>
            <li>Wedding date, venue preferences, and event details</li>
            <li>Budget range and guest count</li>
            <li>Mailing address</li>
            <li>
              Any other information you choose to share through forms, emails, or
              consultations
            </li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <p>
            When you visit our website, certain information is collected
            automatically through analytics and tracking technologies:
          </p>
          <ul>
            <li>Browser type, version, and device information</li>
            <li>Operating system</li>
            <li>IP address and approximate geographic location</li>
            <li>Pages visited, time spent on pages, and navigation paths</li>
            <li>Referring website or source</li>
            <li>Interaction events (clicks, scrolls, form interactions)</li>
          </ul>
          <p>
            This data is collected using{" "}
            <strong>PostHog</strong> (product analytics) and{" "}
            <strong>Vercel Analytics</strong> (web performance analytics). Both
            services collect aggregated, privacy-focused analytics data to help
            us understand how visitors use our website and improve the
            experience.
          </p>

          <h3>Information from Third-Party Platforms</h3>
          <p>
            If you book a consultation through <strong>Calendly</strong> or
            interact with us through <strong>HoneyBook</strong> (our client
            management platform), those services may share your contact
            information with us in accordance with their own privacy policies.
          </p>

          {/* 2 */}
          <h2 id="how-we-use-your-information">
            2. How We Use Your Information
          </h2>
          <p>We use the personal information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and consultation requests</li>
            <li>
              Provide wedding planning, event coordination, and related services
            </li>
            <li>
              Send transactional emails (booking confirmations, planning
              updates) via <strong>Resend</strong>
            </li>
            <li>
              Send relevant content, tips, and updates with your explicit
              consent
            </li>
            <li>
              Analyze website usage to improve our site, content, and services
            </li>
            <li>
              Manage client relationships through <strong>HoneyBook</strong>
            </li>
            <li>Process payments and maintain financial records</li>
            <li>Comply with legal obligations</li>
          </ul>

          {/* 3 */}
          <h2 id="cookies-and-tracking">3. Cookies &amp; Tracking</h2>
          <p>Our website uses cookies and similar tracking technologies for:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Required for the website to
              function properly (session management, security).
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used by PostHog and Vercel
              Analytics to collect anonymized usage data including page views,
              session duration, and interaction events.
            </li>
            <li>
              <strong>Functional cookies:</strong> Remember your preferences
              (such as form progress) to improve your experience.
            </li>
          </ul>
          <p>
            We do not use advertising or remarketing cookies. You can manage
            your cookie preferences through your browser settings. Disabling
            cookies may affect the functionality of certain features on our
            website.
          </p>
          <p>
            <strong>PostHog</strong> is configured to respect Do Not Track (DNT)
            browser signals. When DNT is enabled, analytics data will not be
            collected for your session.
          </p>

          {/* 4 */}
          <h2 id="third-party-data-sharing">4. Third-Party Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with the following categories
            of service providers who assist us in operating our website and
            delivering our services:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> &mdash; Website hosting and deployment.
              Vercel processes server requests and may have access to IP
              addresses and request metadata.
            </li>
            <li>
              <strong>Supabase</strong> &mdash; Database and backend services.
              Form submissions and inquiry data are stored securely in Supabase.
            </li>
            <li>
              <strong>PostHog</strong> &mdash; Product analytics. Collects
              anonymized usage data to help us improve the website experience.
            </li>
            <li>
              <strong>Resend</strong> &mdash; Transactional email delivery.
              Processes your email address to send booking confirmations and
              planning communications.
            </li>
            <li>
              <strong>HoneyBook</strong> &mdash; Client relationship management.
              Stores client contact information, contracts, and event details.
            </li>
            <li>
              <strong>Calendly</strong> &mdash; Consultation scheduling. Collects
              your name, email, and scheduling preferences when you book a call.
            </li>
            <li>
              <strong>Vendors and partners</strong> &mdash; We may share your
              event-related information with vendors directly involved in your
              wedding or event, but only with your explicit consent.
            </li>
          </ul>
          <p>
            We may also disclose your information when required by law,
            regulation, or legal process, or to protect the rights, property,
            or safety of Party Girl Events, our clients, or others.
          </p>

          {/* 5 */}
          <h2 id="data-retention">5. Data Retention</h2>
          <p>We retain your personal information as follows:</p>
          <ul>
            <li>
              <strong>Inquiry and consultation data:</strong> Retained for up to
              2 years after your last interaction, unless you request deletion
              sooner.
            </li>
            <li>
              <strong>Client records:</strong> Retained for up to 7 years after
              the completion of services for tax, legal, and business record
              purposes.
            </li>
            <li>
              <strong>Website analytics data:</strong> PostHog data is retained
              for 12 months. Vercel Analytics data is retained according to
              Vercel&apos;s data retention policy.
            </li>
            <li>
              <strong>Email communications:</strong> Retained for up to 3 years
              unless you unsubscribe or request deletion.
            </li>
          </ul>
          <p>
            When your data is no longer needed for the purposes described above,
            we will securely delete or anonymize it.
          </p>

          {/* 6 */}
          <h2 id="gdpr-rights">6. GDPR Rights</h2>
          <p>
            If you are located in the European Economic Area (EEA), the United
            Kingdom, or Switzerland, you have the following rights under the
            General Data Protection Regulation (GDPR):
          </p>
          <ul>
            <li>
              <strong>Right of access:</strong> You may request a copy of the
              personal data we hold about you.
            </li>
            <li>
              <strong>Right to rectification:</strong> You may request that we
              correct inaccurate or incomplete data.
            </li>
            <li>
              <strong>Right to erasure:</strong> You may request that we delete
              your personal data, subject to legal retention requirements.
            </li>
            <li>
              <strong>Right to restrict processing:</strong> You may request
              that we limit how we use your data.
            </li>
            <li>
              <strong>Right to data portability:</strong> You may request your
              data in a structured, commonly used, machine-readable format.
            </li>
            <li>
              <strong>Right to object:</strong> You may object to the processing
              of your personal data for certain purposes, including direct
              marketing.
            </li>
            <li>
              <strong>Right to withdraw consent:</strong> Where processing is
              based on consent, you may withdraw your consent at any time.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:hello@partygirlevents.com">
              hello@partygirlevents.com
            </a>
            . We will respond to your request within 30 days.
          </p>

          {/* 7 */}
          <h2 id="ccpa-rights">7. CCPA Rights</h2>
          <p>
            If you are a California resident, you have the following rights under
            the California Consumer Privacy Act (CCPA):
          </p>
          <ul>
            <li>
              <strong>Right to know:</strong> You may request that we disclose
              the categories and specific pieces of personal information we have
              collected about you, the sources of collection, the business
              purpose for collecting the information, and the categories of
              third parties with whom we share the information.
            </li>
            <li>
              <strong>Right to delete:</strong> You may request that we delete
              your personal information, subject to certain legal exceptions.
            </li>
            <li>
              <strong>Right to opt-out of sale:</strong> We do not sell your
              personal information. If this practice ever changes, we will
              provide a clear &ldquo;Do Not Sell My Personal Information&rdquo;
              option.
            </li>
            <li>
              <strong>Right to non-discrimination:</strong> We will not
              discriminate against you for exercising your CCPA rights.
            </li>
          </ul>
          <p>
            To exercise your CCPA rights, please contact us at{" "}
            <a href="mailto:hello@partygirlevents.com">
              hello@partygirlevents.com
            </a>
            . We will verify your identity before processing your request and
            respond within 45 days.
          </p>

          {/* 8 */}
          <h2 id="childrens-privacy">8. Children&apos;s Privacy</h2>
          <p>
            Our website and services are not directed to individuals under the
            age of 16. We do not knowingly collect personal information from
            children under 16. If we become aware that we have inadvertently
            collected personal information from a child under 16, we will take
            steps to delete that information as soon as possible. If you believe
            that a child under 16 has provided us with personal information,
            please contact us at{" "}
            <a href="mailto:hello@partygirlevents.com">
              hello@partygirlevents.com
            </a>
            .
          </p>

          {/* 9 */}
          <h2 id="data-security">9. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. These measures include:
          </p>
          <ul>
            <li>
              Encrypted data transmission via HTTPS/TLS across all website
              interactions
            </li>
            <li>
              Secure database storage through <strong>Supabase</strong> with
              row-level security policies and encrypted connections
            </li>
            <li>
              Access controls limiting personnel access to personal data on a
              need-to-know basis
            </li>
            <li>
              Regular review of data processing practices and security measures
            </li>
            <li>
              Secure hosting infrastructure provided by <strong>Vercel</strong>,
              which maintains SOC 2 Type 2 compliance
            </li>
          </ul>
          <p>
            While we strive to protect your personal information, no method of
            electronic transmission or storage is 100% secure. We cannot
            guarantee absolute security but are committed to implementing
            industry-standard protections.
          </p>

          {/* 10 */}
          <h2 id="contact-for-data-requests">10. Contact for Data Requests</h2>
          <p>
            For any questions about this Privacy Policy, to exercise your data
            rights, or to submit a data-related request, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:hello@partygirlevents.com">
                hello@partygirlevents.com
              </a>
            </li>
            <li>
              <strong>Subject line:</strong> &ldquo;Privacy Request&rdquo;
            </li>
            <li>
              <strong>Business name:</strong> Party Girl Events
            </li>
            <li>
              <strong>Location:</strong> Eagle County, Colorado, United States
            </li>
          </ul>
          <p>
            We will acknowledge your request within 5 business days and provide
            a substantive response within 30 days (or 45 days for CCPA
            requests).
          </p>

          {/* 11 */}
          <h2 id="changes-to-this-policy">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technologies, legal requirements, or
            other factors. When we make material changes, we will:
          </p>
          <ul>
            <li>Update the &ldquo;Last Updated&rdquo; date at the top of this page</li>
            <li>
              Post a notice on our website for a reasonable period of time
            </li>
            <li>
              Where required by law, notify you directly via email of any
              material changes
            </li>
          </ul>
          <p>
            Your continued use of our website after changes are posted
            constitutes your acceptance of the updated Privacy Policy. We
            encourage you to review this page periodically.
          </p>
        </div>
      </Section>
    </>
  );
}
