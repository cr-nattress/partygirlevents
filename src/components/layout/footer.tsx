import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Venues", href: "/venues" },
  { label: "Vendors", href: "/vendors" },
  { label: "FAQ", href: "/faq" },
];

const serviceLinks = [
  { label: "Full Service Planning", href: "/services#full-service" },
  { label: "Wedding Management", href: "/services#wedding-management" },
  { label: "Elopement Planning", href: "/services#elopement" },
  { label: "Special Events", href: "/services#special-events" },
];

const toolLinks = [
  { label: "Wedding Style Quiz", href: "/tools/style-quiz" },
  { label: "Budget Estimator", href: "/tools/budget-estimator" },
  { label: "Vibe Translator", href: "/tools/vibe-translator" },
  { label: "Timeline Generator", href: "/tools/timeline" },
];

const featuredIn = [
  "Martha Stewart",
  "Brides",
  "The Knot",
  "Buzzfeed",
  "The Sun",
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-sm uppercase tracking-wider text-white/60">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/70 transition-colors duration-normal hover:text-accent"
      >
        {children}
      </Link>
    </li>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6c-2.5 0-5 1.5-5 4.5 0 2 1 3.5 2.5 4l.5-2c-.5-.3-1-1-1-2 0-1.8 1.3-3 3-3s3 1.2 3 3c0 2-1 3.5-2 3.5-.7 0-1-.5-.8-1.2l.6-2.3c.2-.6-.1-1.2-.7-1.2-.6 0-1.1.7-1.1 1.5 0 .8.3 1.3.3 1.3l-1 4.5c-.1.5 0 1.5.1 2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Follow us on Instagram",
    href: "#",
    icon: <InstagramIcon />,
  },
  {
    label: "Follow us on Pinterest",
    href: "#",
    icon: <PinterestIcon />,
  },
  {
    label: "Follow us on Facebook",
    href: "#",
    icon: <FacebookIcon />,
  },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Main footer content */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {/* Column 1 — Brand & Contact */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl">Party Girl Events</h2>
              <p className="text-sm text-white/70">
                Colorado Mountain Wedding &amp; Event Planning
              </p>
              <div className="space-y-2 pt-2 text-sm text-white/70">
                <p>
                  <a
                    href="tel:+19705550123"
                    className="transition-colors duration-normal hover:text-accent"
                  >
                    (970) 555-0123
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:hello@partygirlevents.com"
                    className="transition-colors duration-normal hover:text-accent"
                  >
                    hello@partygirlevents.com
                  </a>
                </p>
              </div>
              <p className="pt-2 text-xs text-white/50">
                Serving Vail, Beaver Creek, Aspen, Breckenridge &amp; beyond
              </p>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <FooterHeading>Quick Links</FooterHeading>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Column 3 — Services */}
            <div>
              <FooterHeading>Services</FooterHeading>
              <ul className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Column 4 — Free Tools */}
            <div>
              <FooterHeading>Free Tools</FooterHeading>
              <ul className="space-y-2.5">
                {toolLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Column 5 — Connect */}
            <div>
              <FooterHeading>Stay Connected</FooterHeading>
              <form action="#" className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-8 border-white/20 bg-white/10 text-sm text-white placeholder:text-white/40 hover:border-white/30 focus-visible:ring-accent"
                />
                <Button type="submit" size="sm" variant="primary">
                  Subscribe
                </Button>
              </form>
              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-white/60 transition-colors duration-normal hover:text-accent"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* As Featured In */}
      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:gap-6">
            <span className="shrink-0 text-xs uppercase tracking-wider text-white/40">
              As Featured In
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {featuredIn.map((name) => (
                <span key={name} className="text-sm text-white/30">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-xs text-white/40">
              &copy; 2026 Party Girl Events. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-white/40 transition-colors duration-normal hover:text-white/70"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-white/40 transition-colors duration-normal hover:text-white/70"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
