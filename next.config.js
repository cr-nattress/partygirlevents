/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Common WordPress URL patterns → new Next.js routes
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-stephanie", destination: "/about", permanent: true },
      { source: "/our-story", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/get-in-touch", destination: "/contact", permanent: true },
      { source: "/inquiry", destination: "/contact", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/pricing", destination: "/services", permanent: true },
      { source: "/packages", destination: "/services", permanent: true },
      { source: "/wedding-planning", destination: "/services/full-service", permanent: true },
      { source: "/full-service-planning", destination: "/services/full-service", permanent: true },
      { source: "/day-of-coordination", destination: "/services/wedding-management", permanent: true },
      { source: "/wedding-management", destination: "/services/wedding-management", permanent: true },
      { source: "/elopement-planning", destination: "/services/elopements", permanent: true },
      { source: "/elopement", destination: "/services/elopements", permanent: true },
      { source: "/special-events", destination: "/services/special-events", permanent: true },
      { source: "/gallery", destination: "/portfolio", permanent: true },
      { source: "/our-work", destination: "/portfolio", permanent: true },
      { source: "/weddings", destination: "/portfolio", permanent: true },
      { source: "/real-weddings", destination: "/portfolio", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/frequently-asked-questions", destination: "/faq", permanent: true },
      { source: "/our-process", destination: "/process", permanent: true },
      { source: "/how-it-works", destination: "/process", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      // WordPress feed and admin paths
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/wp-admin", destination: "/", permanent: false },
      { source: "/wp-login.php", destination: "/", permanent: false },
      { source: "/wp-content/:path*", destination: "/", permanent: false },
      // WordPress category/tag patterns
      { source: "/category/:slug", destination: "/blog", permanent: true },
      { source: "/tag/:slug", destination: "/blog", permanent: true },
    ];
  },
};

module.exports = nextConfig;
