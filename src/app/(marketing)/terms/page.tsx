import type { Metadata } from "next";
import { Section, PageHero } from "@/components/layout";

export const metadata: Metadata = {
  title: "Terms of Service | Party Girl Events",
  description: "Terms of Service for Party Girl Events website.",
  robots: { index: false, follow: true },
};

/* ------------------------------------------------------------------ */
/*  Table of Contents                                                 */
/* ------------------------------------------------------------------ */

const sections = [
  { id: "acceptance-of-terms", title: "Acceptance of Terms" },
  { id: "site-usage", title: "Site Usage" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "user-submissions", title: "User Submissions" },
  { id: "ai-tool-disclaimers", title: "AI Tool Disclaimers" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "governing-law", title: "Governing Law" },
  { id: "changes-to-terms", title: "Changes to Terms" },
  { id: "contact-information", title: "Contact Information" },
];

export default async function TermsPage() {
  return (
    <>
      <PageHero
        variant="minimal"
        headline="Terms of Service"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms of Service", href: "/terms" },
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

        {/* Full Terms of Service Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-a:text-accent prose-a:underline-offset-2">
          <p>
            Welcome to the Party Girl Events website (&ldquo;Site&rdquo;). These
            Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
            use of our website at <strong>partygirlevents.com</strong> and any
            related services provided by Party Girl Events (&ldquo;we,&rdquo;
            &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing or using our
            Site, you agree to be bound by these Terms. If you do not agree to
            these Terms, please do not use our Site.
          </p>

          {/* 1 */}
          <h2 id="acceptance-of-terms">1. Acceptance of Terms</h2>
          <p>
            By accessing, browsing, or using this Site, you acknowledge that you
            have read, understood, and agree to be bound by these Terms of
            Service and our{" "}
            <a href="/privacy">Privacy Policy</a>, which is incorporated herein
            by reference. If you are using this Site on behalf of an
            organization, you represent and warrant that you have the authority
            to bind that organization to these Terms.
          </p>
          <p>
            You must be at least 18 years of age to use this Site. By using this
            Site, you represent and warrant that you are at least 18 years old.
          </p>

          {/* 2 */}
          <h2 id="site-usage">2. Site Usage</h2>
          <p>
            Our Site is provided for informational purposes and to facilitate
            communication about our wedding planning and event coordination
            services. You agree to use our Site only for lawful purposes and in
            a manner that does not:
          </p>
          <ul>
            <li>
              Infringe upon or violate the rights of any third party, including
              intellectual property, privacy, or publicity rights
            </li>
            <li>
              Violate any applicable local, state, national, or international
              law or regulation
            </li>
            <li>
              Attempt to gain unauthorized access to any portion of the Site,
              its servers, or any systems or networks connected to the Site
            </li>
            <li>
              Interfere with or disrupt the operation of the Site or the servers
              or networks used to make the Site available
            </li>
            <li>
              Use any automated system, including bots, scrapers, or crawlers,
              to access the Site for any purpose without our express written
              permission
            </li>
            <li>
              Transmit any viruses, malware, or other harmful code through the
              Site
            </li>
            <li>
              Impersonate any person or entity or misrepresent your affiliation
              with any person or entity
            </li>
          </ul>
          <p>
            Information provided on our Site, including pricing, service
            descriptions, and availability, is subject to change without notice.
            Website content does not constitute a binding offer or contract. A
            formal service agreement will govern the terms of any planning or
            coordination services.
          </p>

          {/* 3 */}
          <h2 id="intellectual-property">3. Intellectual Property</h2>
          <p>
            All content on this Site, including but not limited to text,
            photographs, graphics, logos, icons, design elements, page layouts,
            and software, is the property of Party Girl Events or our licensed
            content providers and is protected by United States and
            international copyright, trademark, and other intellectual property
            laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works
            of, publicly display, publicly perform, republish, download, store,
            or transmit any content on this Site without our prior written
            permission, except as follows:
          </p>
          <ul>
            <li>
              You may temporarily store copies of pages in your browser cache
              for the purpose of viewing the Site
            </li>
            <li>
              You may print or download one copy of a reasonable number of pages
              of the Site for your own personal, non-commercial use and not for
              further reproduction, publication, or distribution
            </li>
          </ul>
          <p>
            Photographs displayed on our Site are used with permission from our
            clients and photographers. These images may not be downloaded,
            copied, or used for any purpose without explicit written consent
            from both Party Girl Events and the respective photographer.
          </p>

          {/* 4 */}
          <h2 id="user-submissions">4. User Submissions</h2>
          <p>
            When you submit information through our Site, including inquiry
            forms, contact forms, or other interactive features, you grant Party
            Girl Events a non-exclusive, royalty-free, perpetual, and
            irrevocable right to use, reproduce, and process that information
            for the purposes of providing our services and communicating with
            you.
          </p>
          <p>You represent and warrant that:</p>
          <ul>
            <li>
              Any information you submit is accurate, truthful, and not
              misleading
            </li>
            <li>
              You have the right to submit the information and it does not
              violate the rights of any third party
            </li>
            <li>
              Your submission does not contain any unlawful, defamatory,
              obscene, or otherwise objectionable content
            </li>
          </ul>
          <p>
            We reserve the right to remove or refuse to process any submission
            that we determine, in our sole discretion, violates these Terms or
            is otherwise objectionable.
          </p>

          {/* 5 */}
          <h2 id="ai-tool-disclaimers">5. AI Tool Disclaimers</h2>
          <p>
            Portions of this Site may utilize artificial intelligence (AI)
            technologies, including but not limited to AI-assisted content
            generation, image optimization, chatbot features, or recommendation
            systems. With respect to any AI-powered features or content:
          </p>
          <ul>
            <li>
              <strong>No guarantee of accuracy:</strong> AI-generated content
              and recommendations are provided for informational purposes only
              and may contain inaccuracies or errors. You should not rely solely
              on AI-generated content for making important decisions regarding
              your wedding or event planning.
            </li>
            <li>
              <strong>Human oversight:</strong> All final planning decisions,
              vendor recommendations, and service delivery are overseen by our
              human team. AI tools are used to assist and enhance our services,
              not replace professional judgment.
            </li>
            <li>
              <strong>Data processing:</strong> If you interact with AI-powered
              features on our Site, your inputs may be processed by third-party
              AI service providers. Please refer to our{" "}
              <a href="/privacy">Privacy Policy</a> for details on how your data
              is handled.
            </li>
            <li>
              <strong>No professional advice:</strong> AI-generated content on
              this Site does not constitute professional advice (legal,
              financial, or otherwise). For specific guidance, please consult
              with the appropriate professional.
            </li>
          </ul>

          {/* 6 */}
          <h2 id="third-party-services">6. Third-Party Services</h2>
          <p>
            Our Site may contain links to third-party websites, services, and
            resources, including but not limited to vendor partners, venues,
            booking platforms (such as Calendly), client management platforms
            (such as HoneyBook), and social media platforms. These links are
            provided for your convenience and do not signify our endorsement of
            such third-party sites or services.
          </p>
          <p>
            We are not responsible for the content, privacy practices, terms of
            service, or availability of any third-party websites or services.
            Your interactions with third-party sites are governed by those
            sites&apos; own terms and policies. We encourage you to review the
            terms and privacy policies of any third-party site you visit through
            links on our Site.
          </p>
          <p>
            Our Site is hosted on <strong>Vercel</strong> and uses services
            including <strong>Supabase</strong> (database), <strong>Resend</strong>{" "}
            (email delivery), <strong>PostHog</strong> (analytics), and other
            third-party tools. Your use of our Site is subject to these service
            providers&apos; respective terms of service and acceptable use
            policies.
          </p>

          {/* 7 */}
          <h2 id="limitation-of-liability">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Party Girl Events
            and its owner, employees, agents, and affiliates shall not be liable
            for any direct, indirect, incidental, special, consequential, or
            punitive damages, including but not limited to:
          </p>
          <ul>
            <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
            <li>
              Damages resulting from your access to, use of, or inability to
              access or use the Site
            </li>
            <li>
              Damages resulting from any content, materials, or information
              obtained from or through the Site
            </li>
            <li>
              Damages resulting from unauthorized access to, alteration of, or
              the use or disclosure of your data or transmissions
            </li>
            <li>
              Damages resulting from any errors, inaccuracies, or omissions in
              the content on the Site
            </li>
          </ul>
          <p>
            This Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis. We make no warranties, expressed or implied,
            regarding the accuracy, completeness, reliability, or suitability of
            the information, content, products, or services presented on this
            Site. This limitation applies whether the alleged liability is based
            on contract, tort, negligence, strict liability, or any other legal
            theory, even if we have been advised of the possibility of such
            damages.
          </p>

          {/* 8 */}
          <h2 id="indemnification">8. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Party Girl Events
            and its owner, employees, agents, licensors, and suppliers from and
            against any claims, liabilities, damages, judgments, awards, losses,
            costs, expenses, or fees (including reasonable attorneys&apos; fees)
            arising out of or relating to:
          </p>
          <ul>
            <li>Your use of, or inability to use, the Site</li>
            <li>Your violation of these Terms</li>
            <li>
              Your violation of any rights of a third party, including
              intellectual property, privacy, or publicity rights
            </li>
            <li>
              Any content or information you submit to or through the Site
            </li>
          </ul>

          {/* 9 */}
          <h2 id="governing-law">9. Governing Law</h2>
          <p>
            These Terms of Service and any disputes arising out of or related to
            these Terms or your use of the Site shall be governed by and
            construed in accordance with the laws of the{" "}
            <strong>State of Colorado</strong>, without regard to its conflict
            of law principles.
          </p>
          <p>
            Any legal action or proceeding arising under these Terms shall be
            brought exclusively in the state or federal courts located in{" "}
            <strong>Eagle County, Colorado</strong>, and you hereby consent to
            the personal jurisdiction and venue of such courts.
          </p>
          <p>
            If any provision of these Terms is found to be unenforceable or
            invalid by a court of competent jurisdiction, that provision shall be
            enforced to the maximum extent permissible, and the remaining
            provisions of these Terms shall remain in full force and effect.
          </p>

          {/* 10 */}
          <h2 id="changes-to-terms">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify, amend, or replace these Terms of
            Service at any time at our sole discretion. When we make material
            changes, we will:
          </p>
          <ul>
            <li>
              Update the &ldquo;Last Updated&rdquo; date at the top of this
              page
            </li>
            <li>
              Post the revised Terms on this page
            </li>
            <li>
              Where practicable, provide notice of material changes through a
              prominent notice on our Site
            </li>
          </ul>
          <p>
            Your continued use of the Site after any changes to these Terms
            constitutes your acceptance of the revised Terms. If you do not
            agree to the updated Terms, you must discontinue your use of the
            Site. We encourage you to review this page periodically to stay
            informed of any changes.
          </p>

          {/* 11 */}
          <h2 id="contact-information">11. Contact Information</h2>
          <p>
            If you have any questions, concerns, or comments about these Terms
            of Service, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:hello@partygirlevents.com">
                hello@partygirlevents.com
              </a>
            </li>
            <li>
              <strong>Business name:</strong> Party Girl Events
            </li>
            <li>
              <strong>Location:</strong> Eagle County, Colorado, United States
            </li>
          </ul>
          <p>
            For privacy-related inquiries, please refer to our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
