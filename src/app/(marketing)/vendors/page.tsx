import { Metadata } from "next";
import Link from "next/link";
import { Section, PageHero } from "@/components/layout";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Preferred Vendor Directory | Colorado Mountain Weddings | Party Girl Events",
  description:
    "Trusted wedding vendors for Colorado mountain celebrations. Photographers, florists, caterers, and more — hand-picked by a local planner with 150+ weddings.",
};

interface Vendor {
  name: string;
  category: string;
  location: string;
  description: string;
  website?: string;
  specialties: string[];
}

interface VendorCategory {
  name: string;
  slug: string;
  description: string;
  vendors: Vendor[];
}

const vendorDirectory: VendorCategory[] = [
  {
    name: "Photography",
    slug: "photography",
    description:
      "Mountain light is everything. These photographers understand altitude, golden hour at 10,000 feet, and how to capture the drama of a Colorado backdrop without losing the intimacy of the moment.",
    vendors: [
      {
        name: "Lucy Schultz Photography",
        category: "Photography",
        location: "Vail Valley",
        description:
          "Fine art editorial style with a documentary heart. Lucy is my go-to for couples who want photos that feel like a magazine spread but still capture real, unscripted emotion.",
        website: "https://lucyschultzphotography.com",
        specialties: ["Fine Art", "Editorial", "Mountain Weddings"],
      },
      {
        name: "Doug Loyer Photography",
        category: "Photography",
        location: "Summit County",
        description:
          "Doug has been photographing Colorado mountain weddings for over a decade. His work is warm, joyful, and consistently stunning. He knows every lighting angle at every major venue in Summit County.",
        website: "https://dougloyer.com",
        specialties: ["Wedding Photography", "Adventure Elopements", "Summit County"],
      },
      {
        name: "Kendra Elise Photography",
        category: "Photography",
        location: "Aspen / Roaring Fork Valley",
        description:
          "Kendra specializes in luxury weddings and has an incredible eye for the quiet, emotional moments. Her Aspen work is some of the best I have seen.",
        website: "https://kendraelise.com",
        specialties: ["Luxury Weddings", "Elopements", "Aspen"],
      },
    ],
  },
  {
    name: "Floral Design",
    slug: "floral",
    description:
      "Mountain florals require a designer who understands the altitude, the season, and the landscape. These florists create arrangements that feel like they belong in the mountains — not transplanted from a city studio.",
    vendors: [
      {
        name: "Mountain Flower Girl",
        category: "Floral Design",
        location: "Eagle / Vail Valley",
        description:
          "Jess creates lush, romantic arrangements that perfectly complement mountain settings. Her garden-style work with locally foraged greenery is exceptional, and she manages high-altitude logistics beautifully.",
        specialties: ["Garden Style", "Romantic", "Locally Sourced"],
      },
      {
        name: "Alpine Event Design",
        category: "Floral Design",
        location: "Breckenridge",
        description:
          "Full-service floral and event design studio specializing in mountain weddings. They handle everything from ceremony arches to reception tablescapes with a cohesive design vision.",
        specialties: ["Full Service", "Event Design", "Mountain Aesthetic"],
      },
    ],
  },
  {
    name: "Catering & Cake",
    slug: "catering",
    description:
      "Altitude affects everything — including baking and cooking. These culinary teams know how to deliver exceptional food and gorgeous cakes at 9,000+ feet.",
    vendors: [
      {
        name: "Two Bears Catering",
        category: "Catering",
        location: "Vail Valley / Summit County",
        description:
          "Farm-to-table mountain catering at its finest. Two Bears sources locally whenever possible and creates menus that celebrate Colorado's culinary scene. Their family-style service is perfect for mountain wedding receptions.",
        specialties: ["Farm-to-Table", "Family Style", "Colorado Cuisine"],
      },
      {
        name: "Mountain Flour Bakery",
        category: "Cake & Desserts",
        location: "Breckenridge",
        description:
          "Altitude baking is genuinely challenging, and Mountain Flour has perfected it. Beautiful wedding cakes and dessert tables that taste as incredible as they look, every time.",
        specialties: ["Wedding Cakes", "Dessert Tables", "High-Altitude Baking"],
      },
    ],
  },
  {
    name: "Music & Entertainment",
    slug: "music",
    description:
      "The right music transforms a reception. These musicians and DJs understand mountain acoustics, outdoor sound challenges, and how to read a crowd at 10,000 feet.",
    vendors: [
      {
        name: "Altitude Band",
        category: "Live Music",
        location: "Denver / Mountain Towns",
        description:
          "A high-energy live band that travels throughout the Colorado mountains. They are professional, versatile, and know how to get everyone on the dance floor — even at altitude.",
        specialties: ["Live Band", "Reception Music", "All Genres"],
      },
      {
        name: "Jake the DJ",
        category: "DJ",
        location: "Vail Valley",
        description:
          "Jake has been DJing mountain weddings for years and brings exceptional sound equipment designed for both indoor and outdoor mountain venues. His ability to read the room is unmatched.",
        specialties: ["Wedding DJ", "Outdoor Events", "Custom Playlists"],
      },
    ],
  },
  {
    name: "Officiant",
    slug: "officiant",
    description:
      "Your ceremony sets the tone for the entire celebration. These officiants create meaningful, personalized ceremonies that honor your story and feel authentic to who you are as a couple.",
    vendors: [
      {
        name: "Sarah Reynolds Ceremonies",
        category: "Officiant",
        location: "Vail / Aspen / Breckenridge",
        description:
          "Sarah writes deeply personal ceremonies and has a warm, grounded presence that puts couples at ease. She travels throughout the Colorado mountains and is equally wonderful for large weddings and intimate elopements.",
        specialties: ["Non-Denominational", "Elopements", "Personalized Ceremonies"],
      },
    ],
  },
  {
    name: "Hair & Beauty",
    slug: "beauty",
    description:
      "Mountain beauty has its own set of challenges — dry air, altitude glow, and the need for styles that hold up at elevation. These artists know exactly how to prepare you for your mountain moment.",
    vendors: [
      {
        name: "Peak Beauty Co",
        category: "Hair & Makeup",
        location: "Vail Valley / Summit County",
        description:
          "A team of talented artists who specialize in mountain bridal beauty. They travel to your venue or hotel and create looks that photograph beautifully in mountain light and last all day at altitude.",
        specialties: ["Bridal Hair", "Makeup", "On-Location"],
      },
    ],
  },
  {
    name: "Rentals & Decor",
    slug: "rentals",
    description:
      "Mountain venues often need supplemental furniture, linens, and decor. These rental companies specialize in mountain delivery and know exactly what works at elevation.",
    vendors: [
      {
        name: "Colorado Party Rentals",
        category: "Event Rentals",
        location: "Denver / Mountain Towns",
        description:
          "Comprehensive inventory of tables, chairs, linens, tableware, and lounge furniture with reliable mountain delivery. They understand the logistics of setting up at remote mountain venues.",
        specialties: ["Furniture", "Linens", "Tableware", "Mountain Delivery"],
      },
      {
        name: "Mountain Top Tents",
        category: "Tent & Structure Rentals",
        location: "Eagle / Vail Valley",
        description:
          "Sailcloth tents, clear-top tents, and frame structures designed for mountain terrain and weather. Essential for outdoor ceremonies and receptions that need weather protection.",
        specialties: ["Sailcloth Tents", "Clear-Top Tents", "Outdoor Events"],
      },
    ],
  },
];

export default function VendorsPage() {
  const totalVendors = vendorDirectory.reduce(
    (sum, cat) => sum + cat.vendors.length,
    0,
  );

  return (
    <>
      <PageHero
        variant="minimal"
        headline="Preferred Vendor Directory"
        subheadline={`${totalVendors} trusted professionals I have personally worked with on Colorado mountain weddings. Every vendor on this list has earned their spot through exceptional work, reliability, and a genuine love for what they do.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Vendors", href: "/vendors" },
        ]}
      />

      {/* Quick Jump Nav */}
      <Section bg="white">
        <div className="flex flex-wrap justify-center gap-3">
          {vendorDirectory.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="rounded-full border border-foreground/10 px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {category.name}
            </a>
          ))}
        </div>
      </Section>

      {/* Vendor Categories */}
      {vendorDirectory.map((category, index) => (
        <Section
          key={category.slug}
          bg={index % 2 === 0 ? "cream" : "white"}
        >
          <div id={category.slug} className="scroll-mt-24">
            <h2 className="font-serif text-3xl font-semibold">
              {category.name}
            </h2>
            <p className="mt-3 max-w-2xl text-muted">{category.description}</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.vendors.map((vendor) => (
                <div
                  key={vendor.name}
                  className="rounded-lg border border-foreground/10 bg-surface p-6"
                >
                  <h3 className="font-serif text-lg font-semibold">
                    {vendor.name}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{vendor.location}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {vendor.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {vendor.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  {vendor.website && (
                    <a
                      href={vendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-sm font-medium text-accent transition-colors hover:text-accent/80"
                    >
                      Visit Website
                      <svg
                        className="ml-1 h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      {/* Note + CTA */}
      <Section bg="cream" narrow>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-6 md:p-8">
          <h3 className="font-serif text-xl font-semibold">
            A note about this directory
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            This is not a paid listing. Every vendor here is someone I have
            personally worked with and trust to deliver exceptional results for
            my couples. My recommendations are based on quality, reliability, and
            how well they work within the unique demands of Colorado mountain
            celebrations. I update this list regularly as I discover new talent
            and as the industry evolves.
          </p>
        </div>
      </Section>

      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">
            Want a custom vendor team?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Finding the right vendors is one of the most important parts of
            wedding planning. I match every couple with vendors that fit their
            style, budget, and vision.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">Get Personalized Recommendations</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
