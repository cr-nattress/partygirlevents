/**
 * Reusable JSON-LD structured data components for SEO.
 * Each component renders a <script type="application/ld+json"> tag.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://partygirl.events";

/* ------------------------------------------------------------------ */
/*  Organization — renders on every page via root layout               */
/* ------------------------------------------------------------------ */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: "Party Girl Events",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/images/hero-summer.jpg`,
    description:
      "Intimate, elevated, and stress-free Colorado mountain wedding planning. From Vail to Aspen, Party Girl Events makes your mountain wedding vision real.",
    telephone: "+19705550123",
    email: "hello@partygirlevents.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vail",
      addressRegion: "CO",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.6403,
      longitude: -106.3742,
    },
    areaServed: [
      { "@type": "City", name: "Vail" },
      { "@type": "City", name: "Beaver Creek" },
      { "@type": "City", name: "Aspen" },
      { "@type": "City", name: "Breckenridge" },
      { "@type": "City", name: "Keystone" },
    ],
    priceRange: "$$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [
      "https://www.instagram.com/partygirlevents",
    ],
    founder: {
      "@type": "Person",
      name: "Stephanie Fleck",
      jobTitle: "Founder & Lead Wedding Planner",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  WebSite with SearchAction — homepage                               */
/* ------------------------------------------------------------------ */

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Party Girl Events",
    url: SITE_URL,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Service — for service detail pages                                 */
/* ------------------------------------------------------------------ */

interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  price: string;
  image?: string;
}

export function ServiceJsonLd({ name, description, url, price, image }: ServiceJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "Party Girl Events",
    },
    areaServed: {
      "@type": "State",
      name: "Colorado",
    },
    ...(image && { image }),
    offers: {
      "@type": "Offer",
      price: price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        description: `Starting at ${price}`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Person — for about page                                            */
/* ------------------------------------------------------------------ */

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Stephanie Fleck",
    jobTitle: "Founder & Lead Wedding Planner",
    worksFor: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: "Party Girl Events",
    },
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/images/about/stephanie-portrait.jpg`,
    description:
      "Colorado mountain wedding planner with 150+ weddings planned across Vail, Aspen, Breckenridge and beyond.",
    knowsAbout: [
      "Wedding Planning",
      "Colorado Mountain Weddings",
      "Event Coordination",
      "Elopement Planning",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Breadcrumb — generic                                               */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
