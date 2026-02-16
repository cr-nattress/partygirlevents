// =============================================================================
// Sample Content Data
// Realistic sample data for development while the CMS is not yet provisioned.
// =============================================================================

import type {
  Service,
  CaseStudy,
  BlogPost,
  Venue,
  FAQ,
  Testimonial,
  Page,
} from "@/types/content";

// =============================================================================
// Services
// =============================================================================

export const sampleServices: Service[] = [
  {
    slug: "full-service",
    name: "Full Service Planning",
    tagline: "Your vision, beautifully realized from first dream to final dance",
    description:
      "Full Service Planning is for couples who want a trusted partner by their side from the very beginning. From the moment you say yes to the moment you say I do, I handle every detail so you can focus on what matters most: each other. I will guide you through vendor selection, design concepting, budget management, timeline creation, and day-of execution. Whether you are dreaming of a grand celebration at The Sebastian or an intimate gathering beneath the aspens, this is the ultimate white-glove experience tailored to life at altitude.",
    inclusions: [
      "Unlimited planning consultations (virtual and in-person)",
      "Complete vendor sourcing, vetting, and management",
      "Custom design concept with mood boards, color palettes, and styling direction",
      "Detailed budget creation and ongoing tracking",
      "Venue selection guidance and site visits",
      "Full contract review for all vendor agreements",
      "Accommodation and guest travel coordination",
      "Welcome party and farewell brunch planning",
      "Custom timeline and logistics plan",
      "Rehearsal coordination",
      "Up to 14 hours of day-of coverage with lead planner and assistant",
      "Post-wedding wrap-up and vendor returns",
    ],
    exclusions: [
      "Vendor fees and rentals (managed on your behalf but billed separately)",
      "Stationery design and printing costs",
      "Travel costs for destination planning outside the Vail Valley",
    ],
    startingPrice: "$8,000",
    investmentContext:
      "Most full-service weddings in the Colorado mountains range from $8,000 to $15,000+ for planning, depending on guest count, complexity, and multi-day events. This investment typically represents 10-15% of your overall wedding budget.",
    perfectFor:
      "Couples who want everything handled from start to finish, are planning from out of state, or simply want the peace of mind that comes with having an experienced mountain wedding expert in their corner.",
    typicalTimeline: "10-18 months before the wedding",
    featuredImage: {
      src: "/images/services/full-service-planning.jpg",
      alt: "Stephanie reviewing floral arrangements with a couple at a Vail mountain venue",
      width: 1200,
      height: 800,
    },
    cta: { text: "Start Planning Together", href: "/contact" },
    seoTitle:
      "Full Service Wedding Planning | Party Girl Events | Colorado Mountains",
    seoDescription:
      "Comprehensive wedding planning services for Colorado mountain weddings. From venue selection to day-of coordination, Party Girl Events handles every detail.",
    sortOrder: 1,
    status: "published",
  },
  {
    slug: "wedding-management",
    name: "Wedding Management",
    tagline: "You have done the planning. Let me bring it all together.",
    description:
      "Wedding Management is designed for the couple who loves the planning process and has already made many of their big decisions, but wants a seasoned professional to step in, refine the details, and execute flawlessly on the wedding day. I will review every contract, build your master timeline, coordinate your rehearsal, and ensure your day unfolds exactly as you have envisioned. Think of me as your strategic partner for the home stretch, bringing mountain expertise and calm confidence when it matters most.",
    inclusions: [
      "Up to 5 planning consultations in the final 3 months",
      "Full vendor contract review and confirmation",
      "Detailed master timeline and logistics plan",
      "Venue walkthrough and layout planning",
      "Rehearsal coordination",
      "Up to 12 hours of day-of coverage with lead planner and assistant",
      "Vendor payment schedule management",
      "Guest transportation and accommodation guidance",
      "Emergency kit and altitude prep recommendations",
      "Post-wedding wrap-up and vendor returns",
    ],
    exclusions: [
      "Vendor sourcing and initial selection",
      "Design concepting and mood board creation",
      "Budget creation (though I will review and advise on existing budgets)",
      "Planning consultations beyond the included sessions",
    ],
    startingPrice: "$4,500",
    investmentContext:
      "Wedding management typically ranges from $4,500 to $7,500 depending on guest count and event complexity. This is ideal when you have already secured your key vendors and need expert coordination to tie everything together.",
    perfectFor:
      "Organized, detail-oriented couples who have enjoyed the planning process but want a professional to manage logistics, the rehearsal, and the wedding day itself.",
    typicalTimeline: "3-6 months before the wedding",
    featuredImage: {
      src: "/images/services/wedding-management.jpg",
      alt: "Elegant mountain wedding reception with string lights and mountain views at sunset",
      width: 1200,
      height: 800,
    },
    cta: { text: "Let's Talk Details", href: "/contact" },
    seoTitle:
      "Wedding Management Services | Party Girl Events | Vail & Aspen",
    seoDescription:
      "Expert wedding management for Colorado mountain weddings. Contract review, timeline creation, and flawless day-of execution by Party Girl Events.",
    sortOrder: 2,
    status: "published",
  },
  {
    slug: "elopements",
    name: "Elopement Planning",
    tagline: "Small ceremony, big mountains, all the magic",
    description:
      "An elopement in the Colorado mountains is one of the most breathtaking ways to begin your marriage. Whether it is just the two of you on a rocky ridge at sunrise or an intimate gathering of your closest people in an alpine meadow, I will help you create a ceremony that feels as vast and extraordinary as the peaks around you. I handle all the logistics, including permits, vendors, weather contingencies, and altitude considerations, so your only job is to be present in the moment.",
    inclusions: [
      "Up to 3 planning consultations",
      "Location scouting and permit acquisition",
      "Officiant and photographer sourcing",
      "Custom ceremony timeline",
      "Vendor coordination for up to 5 vendors",
      "Weather contingency planning with backup locations",
      "Altitude preparation guide for you and guests",
      "Up to 4 hours of day-of coordination",
      "Celebration dinner reservation and coordination (if desired)",
    ],
    exclusions: [
      "Vendor fees (photographer, officiant, florist, etc.)",
      "Permit fees",
      "Reception or dinner party planning beyond a celebration dinner",
      "Travel and accommodation booking",
    ],
    startingPrice: "$3,000",
    investmentContext:
      "Elopement planning ranges from $3,000 to $5,000 depending on location accessibility, number of guests (up to 20), and whether you are adding a celebration dinner or additional events.",
    perfectFor:
      "Couples who value intimacy and adventure, want a meaningful ceremony without the scale of a traditional wedding, or are drawn to the magic of exchanging vows surrounded by Colorado peaks.",
    typicalTimeline: "2-6 months before the ceremony",
    featuredImage: {
      src: "/images/services/elopement-planning.jpg",
      alt: "Couple exchanging vows on a mountain ridge with panoramic Colorado Rockies views",
      width: 1200,
      height: 800,
    },
    cta: { text: "Plan Your Elopement", href: "/contact" },
    seoTitle: "Colorado Mountain Elopement Planning | Party Girl Events",
    seoDescription:
      "Intimate elopement planning in the Colorado mountains. Location scouting, permits, and day-of coordination for unforgettable mountain ceremonies.",
    sortOrder: 3,
    status: "published",
  },
  {
    slug: "special-events",
    name: "Special Events",
    tagline:
      "Because the celebrations beyond the wedding day matter too",
    description:
      "The wedding day is just one part of your love story. From rehearsal dinners under the stars to welcome parties at a mountain lodge, farewell brunches with panoramic views, and milestone celebrations like anniversaries or corporate retreats, I bring the same attention to detail and creative vision to every event. Colorado's mountain setting provides an extraordinary backdrop for gatherings of all kinds, and I know these venues, vendors, and seasons inside and out.",
    inclusions: [
      "Up to 3 planning consultations",
      "Venue selection and site visits",
      "Vendor sourcing and coordination for up to 5 vendors",
      "Custom event design and styling direction",
      "Detailed event timeline",
      "Menu planning and catering coordination",
      "Up to 6 hours of day-of coordination",
      "Guest experience touches and welcome amenities",
    ],
    exclusions: [
      "Vendor fees and rentals",
      "Food and beverage costs",
      "Printed materials and signage production",
      "Events requiring more than 6 hours of on-site coordination (available as add-on)",
    ],
    startingPrice: "$2,500",
    investmentContext:
      "Special event planning starts at $2,500 for intimate gatherings and scales based on guest count, event duration, and complexity. Multi-day wedding weekend packages are also available.",
    perfectFor:
      "Couples planning rehearsal dinners, welcome parties, or farewell brunches, as well as individuals and companies hosting milestone celebrations, corporate retreats, or holiday events in the mountains.",
    typicalTimeline: "2-4 months before the event",
    featuredImage: {
      src: "/images/services/special-events.jpg",
      alt: "Beautifully styled rehearsal dinner on a mountain terrace at golden hour",
      width: 1200,
      height: 800,
    },
    cta: { text: "Plan Your Event", href: "/contact" },
    seoTitle:
      "Special Event Planning | Rehearsal Dinners & Celebrations | Party Girl Events",
    seoDescription:
      "Rehearsal dinners, welcome parties, corporate events, and milestone celebrations in the Colorado mountains. Expert planning by Party Girl Events.",
    sortOrder: 4,
    status: "published",
  },
];

// =============================================================================
// Case Studies
// =============================================================================

export const sampleCaseStudies: CaseStudy[] = [
  {
    slug: "sarah-and-james-vail-summer-wedding",
    coupleName: "Sarah & James",
    venue: "vail",
    venueName: "The Sebastian - Vail",
    date: "2025-07-19",
    guestCount: 120,
    season: "summer",
    style: ["Mountain Modern", "Elegant", "Greenery-Forward"],
    serviceLevel: "full-service",
    excerpt:
      "A midsummer celebration at The Sebastian where modern elegance met the wild beauty of the Vail Valley. Sarah and James brought their Chicago sophistication to the mountains for an unforgettable weekend.",
    featuredImage: {
      src: "/images/case-studies/sarah-james-featured.jpg",
      alt: "Sarah and James sharing their first dance under string lights at The Sebastian in Vail",
      width: 1600,
      height: 1067,
    },
    narrativeSections: [
      {
        title: "Their Story",
        body: "Sarah and James met at a mutual friend's birthday dinner in Chicago and bonded over their shared love of skiing. Three years later, James proposed at the top of Blue Sky Basin after a powder day, and they knew immediately that their wedding had to be in the mountains that brought them together. They wanted a celebration that honored both their city-chic roots and their love for the Colorado outdoors.",
      },
      {
        title: "The Vision",
        body: "Sarah dreamed of a wedding that felt like a glamorous mountain dinner party, not a traditional ballroom affair. We designed a concept around Mountain Modern: clean lines, lush greenery, warm wood tones, and metallic accents that caught the late-summer light. The color palette was deep forest green, warm white, and brushed gold, with organic arrangements of eucalyptus, garden roses, and trailing amaranthus on every table.",
      },
      {
        title: "The Day",
        body: "The ceremony took place on The Sebastian's terrace with Vail Mountain as the backdrop, just as the afternoon light turned golden. Sarah walked down an aisle lined with lanterns and wild grasses to meet James, who later told me he had never felt so calm and so thrilled at the same time. After a heartfelt ceremony led by a close family friend, guests moved to the ballroom for cocktail hour while we flipped the terrace for a seated dinner under a canopy of bistro lights. The evening ended with late-night sliders, a DJ spinning until midnight, and a sparkler send-off down the mountain path.",
      },
      {
        title: "The Details That Mattered",
        body: "Sarah and James placed a premium on guest experience. Every hotel room received a custom welcome box with local Colorado treats, altitude remedies, and a printed weekend itinerary. We arranged a Friday evening welcome party at a nearby brewery and a Sunday farewell brunch with a build-your-own bloody mary bar. The personal touches, from James's grandmother's lace sewn into Sarah's bouquet wrap to the custom cocktail named after their dog, are what made this wedding feel deeply personal despite its scale.",
      },
    ],
    gallery: [
      {
        src: "/images/case-studies/sarah-james-01.jpg",
        alt: "Ceremony setup on The Sebastian terrace with Vail Mountain backdrop",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/sarah-james-02.jpg",
        alt: "Greenery-forward tablescape with gold accents and eucalyptus runners",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/sarah-james-03.jpg",
        alt: "Custom welcome boxes with Colorado treats and altitude remedies",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/sarah-james-04.jpg",
        alt: "Bistro light canopy over outdoor reception at golden hour",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/sarah-james-05.jpg",
        alt: "Sparkler send-off with mountain silhouettes in the background",
        width: 1200,
        height: 800,
      },
    ],
    vendorCredits: [
      {
        name: "The Sebastian - Vail",
        category: "Venue",
        url: "https://thesebastianvail.com",
      },
      { name: "Bloom Floral Design", category: "Florist" },
      { name: "Cassidy Brooke Photography", category: "Photography" },
      { name: "Blue Spruce Catering", category: "Catering" },
      { name: "Mountain Top DJs", category: "Entertainment" },
      { name: "Sweet Altitude Bakery", category: "Cake" },
      { name: "Bella Bridal Boutique", category: "Bride's Gown" },
    ],
    testimonial: {
      quote:
        "Stephanie took our half-formed Pinterest boards and turned them into the most stunning weekend of our lives. She handled every detail with such grace that we never once felt stressed. Our guests are still talking about it, and honestly, so are we.",
      couplePhoto: "/images/testimonials/sarah-james-couple.jpg",
    },
    seoTitle:
      "Sarah & James | Vail Summer Wedding | Party Girl Events",
    seoDescription:
      "A Mountain Modern summer wedding at The Sebastian in Vail with 120 guests. Full service planning by Party Girl Events.",
    ogImage: "/images/case-studies/sarah-james-og.jpg",
    status: "published",
    publishedAt: "2025-09-15",
  },
  {
    slug: "emily-and-michael-aspen-fall-wedding",
    coupleName: "Emily & Michael",
    venue: "aspen",
    venueName: "The Little Nell",
    date: "2025-09-27",
    guestCount: 45,
    season: "fall",
    style: ["Rustic Luxe", "Autumnal", "Intimate"],
    serviceLevel: "wedding-management",
    excerpt:
      "An intimate autumn celebration at The Little Nell where golden aspens and rustic elegance came together for 45 of Emily and Michael's closest friends and family.",
    featuredImage: {
      src: "/images/case-studies/emily-michael-featured.jpg",
      alt: "Emily and Michael standing among golden aspen trees with Aspen Mountain behind them",
      width: 1600,
      height: 1067,
    },
    narrativeSections: [
      {
        title: "Their Story",
        body: "Emily and Michael are both physicians who met during residency in Denver. Between demanding schedules and a shared love of the outdoors, they built a relationship grounded in adventure and quiet moments in the mountains. Michael proposed during a fall hike to Maroon Bells, and Aspen held a permanent place in their hearts from that day forward.",
      },
      {
        title: "The Vision",
        body: "Emily came to me with her planning mostly complete. She had secured The Little Nell, chosen her photographer, and had a clear aesthetic in mind: Rustic Luxe with rich autumnal tones. She wanted long harvest tables, abundant candlelight, and arrangements that looked like they were gathered from the mountainside. My role was to refine her vision, coordinate every vendor, and ensure the day was seamless. We chose a palette of burnt sienna, deep burgundy, sage green, and warm cream, layered with velvet table runners and copper accents.",
      },
      {
        title: "The Day",
        body: "The late September timing was perfection. The aspens were at peak gold, and the air had that crisp clarity that only Colorado autumn delivers. The ceremony took place on the terrace at The Little Nell with Ajax Mountain draped in color behind them. Emily's father read a poem he had written, and there was not a dry eye in the group. Dinner was served family-style at two long tables, with courses inspired by Colorado's farm-to-table movement. The evening wrapped with toasts around a fire pit, s'mores, and a quiet last dance under the stars.",
      },
      {
        title: "What Made It Special",
        body: "With only 45 guests, every detail was deeply personal. Place cards were hand-calligraphed on aspen leaves. The cocktail hour featured a whiskey tasting curated by Michael, a bourbon enthusiast. Instead of a traditional cake, we arranged a dessert table showcasing pies from a beloved local bakery. Emily later told me that having a professional handle the logistics allowed her to be fully present, not as a planner, but as a bride.",
      },
    ],
    gallery: [
      {
        src: "/images/case-studies/emily-michael-01.jpg",
        alt: "Terrace ceremony at The Little Nell with golden aspens on Ajax Mountain",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/emily-michael-02.jpg",
        alt: "Long harvest table with velvet runners, copper accents, and autumnal florals",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/emily-michael-03.jpg",
        alt: "Hand-calligraphed place cards on preserved aspen leaves",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/emily-michael-04.jpg",
        alt: "Guests gathered around fire pit with mountain backdrop at twilight",
        width: 1200,
        height: 800,
      },
    ],
    vendorCredits: [
      {
        name: "The Little Nell",
        category: "Venue",
        url: "https://thelittlenell.com",
      },
      { name: "Aspen Floral Co.", category: "Florist" },
      { name: "Rachel Havel Photography", category: "Photography" },
      { name: "The Little Nell Culinary Team", category: "Catering" },
      { name: "Mountain Ink Calligraphy", category: "Stationery" },
      { name: "Aspen Pie Company", category: "Desserts" },
    ],
    testimonial: {
      quote:
        "We did most of the planning ourselves, but bringing Stephanie in was the best decision we made. She caught details we never would have thought of and ran the day so smoothly that we forgot there was even a plan. We just got to enjoy every moment.",
      couplePhoto: "/images/testimonials/emily-michael-couple.jpg",
    },
    seoTitle:
      "Emily & Michael | Aspen Fall Wedding | Party Girl Events",
    seoDescription:
      "An intimate Rustic Luxe autumn wedding at The Little Nell in Aspen with 45 guests. Wedding management by Party Girl Events.",
    ogImage: "/images/case-studies/emily-michael-og.jpg",
    status: "published",
    publishedAt: "2025-11-10",
  },
  {
    slug: "amanda-and-chris-breckenridge-winter-elopement",
    coupleName: "Amanda & Chris",
    venue: "breckenridge",
    venueName: "Sapphire Point Overlook",
    date: "2025-12-14",
    guestCount: 8,
    season: "winter",
    style: ["Boho Luxe", "Winter", "Adventure"],
    serviceLevel: "elopement",
    excerpt:
      "A snowy December elopement at Sapphire Point with eight of their favorite people, fur wraps, hot cocoa, and a love story as wild and beautiful as the mountains around them.",
    featuredImage: {
      src: "/images/case-studies/amanda-chris-featured.jpg",
      alt: "Amanda and Chris embracing on a snow-covered overlook with the Tenmile Range behind them",
      width: 1600,
      height: 1067,
    },
    narrativeSections: [
      {
        title: "Their Story",
        body: "Amanda is a yoga instructor and Chris is a backcountry ski guide. They met at a friend's cabin in Breckenridge during a snowstorm and spent the weekend talking by the fire. Neither of them ever wanted a big traditional wedding. They wanted something that felt like them: adventurous, intimate, and surrounded by the mountains they call home. When they decided to get married, an elopement was the only option that made sense.",
      },
      {
        title: "The Vision",
        body: "Amanda wanted their ceremony to feel like a beautiful accident in the wilderness, as if they had simply wandered to the most stunning overlook in Colorado and decided to get married right there. We chose Sapphire Point Overlook above Dillon Reservoir for its sweeping views of the Tenmile Range. The aesthetic was Boho Luxe meets winter wonderland: a faux fur wrap over Amanda's flowing dress, a small ground arrangement of dried flowers and pampas grass dusted with snow, and Chris in a charcoal wool suit with a sprig of pine tucked into his pocket.",
      },
      {
        title: "The Day",
        body: "December 14th brought fresh snow and blue skies, the kind of Colorado winter day that makes you understand why people move here. The eight guests gathered at Sapphire Point just before golden hour. Amanda and Chris wrote their own vows, and their words were so honest and funny and tender that their best friend, who was officiating, had to pause to compose herself. After the ceremony, we headed to a private dining room in Breckenridge for a celebratory dinner with wine, storytelling, and a single-tier cake topped with dried flowers.",
      },
      {
        title: "Why It Worked",
        body: "Elopements are about stripping away everything that does not matter and keeping everything that does. Amanda and Chris did not need a big party to feel married. They needed fresh snow, the people who know them best, and the freedom to be completely themselves. My job was to handle the permit, coordinate the vendors, prepare for weather contingencies, and make sure they never had to think about logistics. Their job was to show up and be in love. They were excellent at their job.",
      },
    ],
    gallery: [
      {
        src: "/images/case-studies/amanda-chris-01.jpg",
        alt: "Sapphire Point ceremony setup with dried floral arrangement in fresh snow",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/amanda-chris-02.jpg",
        alt: "Amanda in flowing dress and fur wrap walking through snow to ceremony",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/amanda-chris-03.jpg",
        alt: "Vow exchange with Tenmile Range and blue sky backdrop",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/case-studies/amanda-chris-04.jpg",
        alt: "Intimate celebration dinner with single-tier cake and candlelight",
        width: 1200,
        height: 800,
      },
    ],
    vendorCredits: [
      { name: "Sapphire Point Overlook", category: "Ceremony Site" },
      { name: "Wild & Gathered Floral", category: "Florist" },
      { name: "Jenna Walker Photography", category: "Photography" },
      { name: "Hearthstone Restaurant", category: "Celebration Dinner" },
      { name: "Sugar & Pine Bakery", category: "Cake" },
    ],
    testimonial: {
      quote:
        "We wanted something simple, but Stephanie made it feel extraordinary. She thought of everything we never would have, from the hot cocoa station to the emergency hand warmers. It was the most magical day of our lives.",
      couplePhoto: "/images/testimonials/amanda-chris-couple.jpg",
    },
    seoTitle:
      "Amanda & Chris | Breckenridge Winter Elopement | Party Girl Events",
    seoDescription:
      "A Boho Luxe winter elopement at Sapphire Point in Breckenridge with 8 guests. Elopement planning by Party Girl Events.",
    ogImage: "/images/case-studies/amanda-chris-og.jpg",
    status: "published",
    publishedAt: "2026-01-20",
  },
];

// =============================================================================
// Blog Posts
// =============================================================================

export const sampleBlogPosts: BlogPost[] = [
  {
    slug: "ultimate-guide-vail-mountain-weddings",
    title: "The Ultimate Guide to Vail Mountain Weddings",
    excerpt:
      "Everything you need to know about planning a wedding in Vail, from venue options and seasonal considerations to altitude tips and local vendor recommendations.",
    body: `## Why Vail?

There is a reason Vail has become one of the most sought-after wedding destinations in Colorado. The combination of world-class venues, stunning natural beauty, and a walkable village atmosphere creates an experience that feels both grand and intimate. Whether you are planning a summer celebration with wildflower-covered mountains or a winter wonderland wedding with snow-dusted peaks, Vail delivers.

After planning dozens of weddings in the Vail Valley, I have learned what works, what surprises people, and what makes the difference between a good mountain wedding and an extraordinary one. This guide covers everything I wish every couple knew before they started planning.

## The Best Venues in Vail

### The Sebastian - Vail
My go-to recommendation for couples who want luxury without pretension. The Sebastian offers both indoor and outdoor ceremony spaces, a stunning terrace with direct mountain views, and an on-site culinary team that consistently impresses. Capacity ranges from intimate gatherings of 50 to celebrations of 200.

### Four Seasons Resort Vail
Unmatched elegance with multiple event spaces, including a beautiful alpine garden for ceremonies. The Four Seasons team is professional and accommodating, and the property itself sets a tone of refined mountain luxury.

### Donovan Pavilion
A beloved Vail institution right on Gore Creek. Donovan Pavilion offers a more rustic, natural setting with floor-to-ceiling windows and a creekside ceremony lawn. It is one of the most popular venues in the valley for good reason.

## Seasonal Considerations

### Summer (June - September)
Peak wedding season in Vail, and for good reason. Wildflowers blanket the mountainsides, temperatures hover in the comfortable 70s and 80s, and the days are long and golden. Book your venue 12-18 months in advance for summer dates.

### Fall (September - October)
The aspen groves turn brilliant gold, typically peaking in late September. Fall weddings in Vail are breathtaking but come with more weather unpredictability. Always have an indoor backup plan.

### Winter (November - March)
Snow-covered peaks, cozy fireside receptions, and the magic of a winter mountain wedding. Winter dates are often more available and can be more budget-friendly, but roads and travel require more careful planning.

### Spring (April - May)
The shoulder season. Snow is melting, the village is quieter, and prices are generally lower. Spring can be muddy and unpredictable, but late May offers beautiful early-season conditions.

## Altitude Considerations

Vail sits at 8,150 feet, and some venues go even higher. This is not something to take lightly. I always recommend:

- **Hydration stations** at every event (not just water, but electrolyte drinks)
- **Altitude awareness cards** in your welcome bags with tips for guests
- **Lighter cocktail hour menus** since alcohol hits harder at altitude
- **A slower ceremony pace** because guests (and you!) may get winded more easily
- **Arrival a day early** whenever possible to acclimate

## Budget Expectations

Vail is a premium destination, and pricing reflects that. A typical Vail wedding budget ranges from $50,000 to $150,000+ depending on guest count and venue. Key cost drivers include:

- **Venue fees**: $5,000 - $25,000+
- **Catering**: $150 - $350+ per person
- **Photography**: $4,000 - $12,000
- **Florals**: $3,000 - $15,000+
- **Entertainment**: $2,000 - $8,000

## My Top Tips

1. **Book your venue first**, then your photographer. These are the two vendors that sell out fastest in Vail.
2. **Plan for weather**. Even in July, afternoon thunderstorms are common. A rain plan is not optional.
3. **Invest in guest experience**. Welcome bags, transportation coordination, and a printed weekend itinerary go a long way.
4. **Hire a mountain wedding planner**. Vail logistics are unique, and experience at altitude makes a real difference.
5. **Visit in the season you are getting married**. Photos do not capture how different Vail feels in summer versus winter.

If you are considering Vail for your wedding, I would love to chat about what is possible. Every couple and every celebration is different, and that is what makes this work so rewarding.`,
    category: "colorado-guides",
    tags: ["vail", "venues", "planning guide", "colorado", "mountain weddings"],
    featuredImage: {
      src: "/images/blog/vail-mountain-weddings-guide.jpg",
      alt: "Panoramic view of Vail Mountain in summer with wildflowers in the foreground",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 8,
    seoTitle:
      "The Ultimate Guide to Vail Mountain Weddings | Party Girl Events",
    seoDescription:
      "Comprehensive guide to planning a Vail mountain wedding. Venues, seasons, altitude tips, budgets, and insider advice from an experienced Colorado wedding planner.",
    ogImage: "/images/blog/vail-mountain-weddings-guide-og.jpg",
    status: "published",
    publishedAt: "2025-03-15",
  },
  {
    slug: "5-things-wish-every-bride-knew-mountain-wedding",
    title:
      "5 Things I Wish Every Bride Knew About Planning a Mountain Wedding",
    excerpt:
      "After years of planning weddings in the Colorado Rockies, here are the five things that surprise couples most and how to prepare for them.",
    body: `I have planned mountain weddings in every season, at every altitude, and in every kind of weather Colorado can throw at you. And every year, I see the same surprised expressions when couples discover things about mountain weddings that nobody told them. Here are the five things I wish every bride (and groom, and partner) knew before diving in.

## 1. The Altitude Is Not a Joke

I know, I know. You are active, you are healthy, you will be fine. And you probably will be! But your 85-year-old grandmother? Your college roommate who lives at sea level in Miami? They might struggle.

At 8,000 to 10,000 feet, your body is working harder than usual. Alcohol hits faster. You get winded more easily. Headaches are common for the first day or two.

**What I recommend:** Send your guests an altitude preparation guide two weeks before travel. Stock your welcome bags with electrolyte packets, pain relievers, and a gentle reminder to drink water. And please, for the love of everything, have a hydration station at your ceremony and reception.

## 2. Mountain Weather Has Its Own Plans

You can plan a July wedding in Vail expecting sunshine and get a 20-minute thunderstorm at 3 PM. This is not a disaster. This is Colorado. The storm will pass, the light afterward will be magical, and your photographer will get the most dramatic sky shots of their career.

**What I recommend:** Every single event needs a weather contingency plan. Not just "we will move inside." A specific plan with a specific timeline for making the call. I build weather decision trees for all my couples: if X happens by Y time, we execute Plan B.

## 3. Your Timeline Needs More Breathing Room Than You Think

Mountain logistics take longer. Shuttles between venues navigate winding roads. Photo locations may require a short hike. Vendors are driving mountain passes with their equipment. Hair and makeup take the same amount of time, but everything around it is a little slower, a little further, a little more variable.

**What I recommend:** Build 30 extra minutes into your day compared to what you think you need. Use that buffer for transit time, altitude-related slowdowns, and the inevitable "oh, the light is perfect, can we take five more minutes for photos?" moment.

## 4. Guest Transportation Is Not Optional

Vail, Aspen, Breckenridge, these are mountain towns, not cities. Parking is limited, roads are unfamiliar to most guests, and if your wedding is in winter, you do not want anyone driving on icy mountain passes after celebrating. Guest transportation is one of the most important logistics decisions you will make.

**What I recommend:** Budget for shuttle service between hotels and your venue. Provide a clear transportation schedule in your welcome materials. If your wedding is in winter, make this a non-negotiable line item in your budget.

## 5. The Right Planner Makes All the Difference

This is not a sales pitch. This is genuine advice. A wedding planner who specializes in mountain weddings knows things that a general planner simply does not: which venues have wind problems in the afternoon, which caterers can handle remote locations, how to get a permit for a national forest ceremony, and what to do when the power goes out at 10,000 feet.

Mountain weddings have specific logistical challenges that reward experience. The right planner is not just organizing your wedding. They are anticipating problems you do not even know exist yet and solving them before you ever have to worry.

**What I recommend:** When interviewing planners, ask how many mountain weddings they have planned, what their weather contingency process looks like, and how they handle altitude-related concerns. The answers will tell you a lot.

---

Planning a mountain wedding is one of the most exciting things you will ever do. The setting is unmatched. The memories will be extraordinary. And with the right preparation, the challenges become just part of the adventure.`,
    category: "planning-tips",
    tags: [
      "planning tips",
      "altitude",
      "weather",
      "logistics",
      "mountain weddings",
    ],
    featuredImage: {
      src: "/images/blog/mountain-wedding-tips.jpg",
      alt: "Bride and groom walking through alpine meadow with mountain peaks in the distance",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 6,
    seoTitle:
      "5 Things I Wish Every Bride Knew About Mountain Weddings | Party Girl Events",
    seoDescription:
      "Insider tips for planning a Colorado mountain wedding, from altitude preparation and weather contingencies to transportation and timeline advice.",
    ogImage: "/images/blog/mountain-wedding-tips-og.jpg",
    status: "published",
    publishedAt: "2025-05-22",
  },
  {
    slug: "sarah-james-midsummer-night-sebastian-vail",
    title: "Sarah & James: A Midsummer Night at The Sebastian",
    excerpt:
      "A look inside Sarah and James's Mountain Modern summer wedding in Vail, featuring 120 guests, a greenery-forward design, and one unforgettable sparkler send-off.",
    body: `Some weddings come together. Sarah and James's wedding came alive.

From the moment they reached out to me, I knew this couple had vision. Sarah, a graphic designer from Chicago, had an eye for clean aesthetics and bold choices. James brought warmth and humor and an unwavering commitment to making sure every guest felt celebrated. Together, they wanted a wedding that was sophisticated but never stiff, elegant but grounded in the mountains they love.

## The Venue

The Sebastian - Vail was their dream venue from day one. With its terrace overlooking Vail Mountain and a ballroom that manages to feel both grand and intimate, it was the perfect canvas for their Mountain Modern aesthetic. We used the terrace for the ceremony and cocktail hour, then transformed the ballroom for a seated dinner and dancing.

## The Design

Sarah's design instinct shaped every detail. Our color palette was deep forest green, warm white, and brushed gold. Long farm tables were topped with lush eucalyptus runners and garden roses in footed gold vessels. Custom acrylic signage with modern typography guided guests through the evening, and each place setting featured a hand-torn menu card on soft cotton paper.

The lounge vignettes during cocktail hour featured velvet sofas and brass coffee tables with small arrangements of greenery. It felt like stepping into the world's most beautiful mountain living room.

## The Moments

There are moments in every wedding that become the ones people remember. For Sarah and James, it was the ceremony. Standing on the terrace with the late July sun painting the mountains gold, Sarah's sister sang a stripped-down version of "At Last" as Sarah walked the aisle. James's face, pure, unguarded joy, is the image that still makes me tear up.

The toasts at dinner were equal parts hilarious and heartfelt. James's brother told a story about a disastrous ski trip that had the entire room howling. Sarah's maid of honor delivered a toast so beautifully written that the photographer told me she saw multiple guests crying.

## The Details

- Welcome boxes with Colorado-roasted coffee, artisan chocolates, altitude remedy kits, and a letterpress weekend itinerary
- A custom cocktail called "The Powder Day" (vodka, elderflower, sparkling wine, and a sprig of rosemary)
- A late-night slider station from a beloved Vail food truck
- A sparkler send-off down the mountain path that lit up the valley

## In Their Words

"Stephanie made planning a wedding feel like an adventure, not a chore. She understood our vision from the first conversation and pushed it even further than we imagined. The day was absolute perfection." - Sarah

---

Sarah and James, thank you for trusting me with your celebration. Your wedding was a joy to plan and an honor to witness. Here is to many more powder days together.`,
    category: "real-weddings",
    tags: [
      "real weddings",
      "vail",
      "summer",
      "The Sebastian",
      "Mountain Modern",
    ],
    featuredImage: {
      src: "/images/blog/sarah-james-wedding-feature.jpg",
      alt: "Mountain Modern reception at The Sebastian with greenery runners and gold accents",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 5,
    seoTitle:
      "Sarah & James: A Midsummer Night at The Sebastian | Party Girl Events",
    seoDescription:
      "Inside Sarah and James's Mountain Modern summer wedding at The Sebastian in Vail. 120 guests, greenery-forward design, and full-service planning by Party Girl Events.",
    ogImage: "/images/blog/sarah-james-wedding-feature-og.jpg",
    status: "published",
    publishedAt: "2025-10-01",
  },
  {
    slug: "death-of-cookie-cutter-wedding-2026",
    title: "The Death of the Cookie-Cutter Wedding",
    excerpt:
      "2026 is the year couples are finally ditching the wedding template. From personalized vows to cultural fusion ceremonies, here is why the most memorable weddings are the ones that break the mold.",
    body: `## Why 2026 Is the Year of the Personal Wedding

Something shifted. I started noticing it about two years ago, but in 2026 it has become unmistakable: couples are done with the template. The cookie-cutter wedding, that formulaic march through cocktail hour, seated dinner, cake cutting, bouquet toss, and sparkler exit, is dying. And honestly? I could not be happier about it.

Vogue recently dubbed this "the era of the intentional wedding." The Knot's 2026 trend report shows that over 70% of couples are now eliminating at least one traditional element from their celebrations. The New York Times Weddings section, once a showcase of society norms, now regularly features ceremonies held in bookstores, on hiking trails, and in living rooms. Hello! Magazine went so far as to call it "the death of performative tradition."

This is not about being rebellious for the sake of it. It is about couples finally feeling permission to ask the most important question in wedding planning: **Does this actually matter to us?**

I have sat across from hundreds of couples in my years as a planner, and the conversations have fundamentally changed. Five years ago, couples would come to me with Pinterest boards full of other people's weddings and say, "We want this." Now they come with stories. They tell me about the restaurant where they had their first date, the song that was playing when they knew, the tradition from their grandmother's culture that they want to honor. They are starting with meaning and working outward to design.

And the weddings that come from those conversations? They are the ones guests talk about for years.

---

## Traditions Worth Keeping (And Why)

Let me be clear about something: I am not anti-tradition. Not even close. Some traditions have survived for centuries because they are genuinely beautiful and meaningful. What I am against is doing something just because "that is what you do at a wedding."

Here are the traditions I see couples keeping, and the reasons they resonate:

**The first look or the aisle walk.** Whether it is a private first look between just the two of you or the full processional with your parent, that moment of seeing each other is irreplaceable. The anticipation, the emotion, the significance of walking toward the person you are choosing, that is real. Most of my couples keep some version of this because it creates one of the most powerful emotional anchors of the day.

**The vows.** Even couples who are eliminating everything else almost always keep the vows. Whether they write their own (which I always encourage) or use traditional language that resonates, the act of making promises to each other in front of witnesses is the heartbeat of a wedding. It is what separates a wedding from a party.

**The toast.** There is something sacred about a friend or family member standing up and telling the room why these two people belong together. Good toasts make people laugh and cry in the same breath. I have seen toasts that single-handedly made an entire wedding.

**The first dance.** Not because it has to be choreographed or performed, but because there is a quiet magic in being held by your person while everyone you love watches. Some couples do a full choreographed number, some just sway. Both are perfect.

**Family rituals with genuine meaning.** Lighting a unity candle because your grandmother did it? Beautiful. Jumping the broom because it connects you to your heritage? Absolutely. Breaking the glass because you are Jewish and this tradition has deep significance? Yes. Doing any of these because a wedding blog told you to? Skip it.

The key is intentionality. Keep what moves you. Release what does not.

---

## 5 Ways Couples Are Making It Their Own

Here is where it gets fun. These are real things my clients (and couples I admire from afar) are doing to make their weddings unmistakably theirs:

### 1. Personalized Vows That Tell the Real Story

I am not talking about generic "I promise to love you forever" vows. I mean vows that reference the inside jokes, the hard times, the specific moments that built the relationship. One of my grooms last year opened his vows with, "I knew I wanted to marry you the night you ate an entire sleeve of Oreos and then beat me at Scrabble." The room lost it. And then he pivoted to the most beautiful, vulnerable promises I have ever heard. That is what personalized vows do: they make the universal feel specific.

### 2. Cultural Fusion Ceremonies

This is one of my absolute favorite trends. Couples blending two cultural traditions into a single ceremony create something entirely new and deeply meaningful. I recently planned a wedding that incorporated a traditional Indian garland exchange alongside a Western ring ceremony, all performed on a mountaintop in Beaver Creek. The bride's Indian family and the groom's Midwestern family were both in tears, seeing their traditions honored side by side. These ceremonies require extra planning and sensitivity, but the result is extraordinary.

### 3. Custom Cocktails That Tell a Story

Forget the generic signature cocktail. Couples are creating drinks named after meaningful moments in their relationship. "The First Date" (based on what they ordered that night), "The Proposal" (incorporating ingredients from the trip where it happened), "The Future" (something neither has tried before, made together). One of my couples created a cocktail menu that was essentially a timeline of their relationship. Guests loved it because it gave them a window into the couple's story.

### 4. Non-Traditional Processionals

The bride walking down the aisle to the Bridal Chorus is beautiful, but it is not the only option. I have had brides walk to Fleetwood Mac, to a live cello playing a song from their first concert together, and to their partner singing (yes, really, and it was incredible). One couple walked down the aisle together because neither wanted to "give away" or "be given away." Another had their dog lead the processional, which was chaotic and perfect.

### 5. Curated Guest Experiences

Instead of a generic welcome bag, imagine arriving at your hotel to find a custom guidebook to the couple's favorite local spots, a playlist of "songs that remind us of you" personalized for each guest, or an invitation to a pre-wedding adventure like a morning hike or a cooking class. The best weddings in 2026 are not just events. They are experiences that make every guest feel like they are part of the story.

---

## The Budget Creativity Movement

Here is something I love: the rise of what I call "scrappy and proud" weddings. If you spend any time on Reddit's r/Weddingsunder10k community, you will see couples pulling off genuinely beautiful celebrations for a fraction of what the industry says you need to spend. And they are not apologizing for it. They are bragging.

This is not about cutting corners or settling. It is about creativity and priorities. A picnic-table reception in a national park can be more memorable than a ballroom at the Four Seasons if it is designed with intention. A $200 dress from a consignment shop can look stunning. A friend who is a great cook can cater a brunch reception that blows away the standard hotel chicken.

**Here is what a real budget breakdown can look like:**

- **The $5,000 Elopement:** Permit fee, officiant, photographer, a beautiful outfit, wildflowers from a farmers market, and a celebration dinner at your favorite restaurant. Done. That is a wedding.
- **The $10,000 Micro-Wedding:** 30 guests at a rented cabin or Airbnb. Potluck-style meal with a few catered additions. A friend officiates. A good photographer captures it all. String lights, candles, and your favorite playlist.
- **The $15,000 Full Wedding:** 75-100 guests at an affordable venue. Food truck catering. DIY florals (plenty of YouTube tutorials out there). DJ over live band. Smart prioritization.

The common thread? These couples decided what mattered most to them and put their money there. Everything else was creative problem-solving. That is not settling. That is designing a wedding that reflects your actual values.

---

## What This Means for Your Colorado Mountain Wedding

Colorado is the perfect place for the personal wedding movement. The natural beauty does half the design work for you. You do not need elaborate decor when you are getting married in front of the Tenmile Range at sunset. You do not need a grand ballroom when an alpine meadow is your ceremony space.

Here is how I help my couples apply the personalization trend in a mountain setting:

**Let the landscape lead.** Instead of fighting the setting with imported decor, we lean into it. Natural materials, organic arrangements, colors that complement the season. A summer wedding with wildflower-inspired florals. A fall celebration with warm tones that echo the aspens. A winter ceremony where the snow is the decor.

**Build in adventure.** Colorado couples love the outdoors. So why not build that into the wedding? A morning-after hike with the wedding party. A welcome event at a local brewery or hot springs. A ceremony site that requires a short, beautiful walk.

**Honor the setting.** Every mountain town in Colorado has its own personality. Vail feels European and polished. Breckenridge feels warm and approachable. Aspen feels glamorous and wild. I help couples choose locations that match their energy, not just their budget.

**Make altitude part of the story.** Instead of treating altitude as a problem to solve, we make it part of the experience. Altitude remedy kits in welcome bags. Hydration stations that double as design elements. A lighter menu that accounts for how appetite and alcohol tolerance change above 8,000 feet.

At Party Girl Events, my philosophy has always been that your wedding should feel like the most beautiful, amplified version of your relationship. Not like someone else's wedding with your names swapped in. If that resonates with you, I would love to hear your story.

---

**Ready to plan a wedding that is unapologetically yours?** [Let's start a conversation](/contact) about what your celebration could look like. No templates. No formulas. Just your story, beautifully told.`,
    category: "inspiration-trends",
    tags: ["2026 trends", "personalization", "non-traditional", "planning tips"],
    featuredImage: {
      src: "/images/blog/personalization-trends.jpg",
      alt: "Couple celebrating with personalized wedding details in a Colorado mountain setting",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 10,
    seoTitle:
      "The Death of the Cookie-Cutter Wedding | 2026 Wedding Trends | Party Girl Events",
    seoDescription:
      "2026 is the year of the personal wedding. Discover why couples are ditching the template and how to make your Colorado mountain wedding unapologetically yours.",
    ogImage: "/images/blog/personalization-trends-og.jpg",
    status: "published",
    publishedAt: "2026-01-15",
  },
  {
    slug: "colorado-mountain-wedding-cost-guide",
    title: "How Much Does a Mountain Wedding in Colorado Actually Cost?",
    excerpt:
      "Real numbers, honest ranges, and the hidden costs nobody warns you about. A transparent guide to Colorado mountain wedding budgets from a planner who has seen it all.",
    body: `## The Honest Answer

Let me start with the answer every couple wants and every planner hates giving: it depends. I know. But here is why that answer is actually more helpful than a single number.

A Colorado mountain wedding can cost $15,000. It can cost $150,000. It can cost $300,000. I have planned beautiful, meaningful celebrations at every point on that spectrum. The price does not determine the quality of the experience. What determines the quality is how intentionally you spend whatever budget you have.

That said, you came here for numbers, and I respect that. So here are honest ranges based on my experience planning weddings across the Colorado mountains:

- **Full celebration (100-200 guests):** $40,000 - $150,000+
- **Mid-size wedding (50-100 guests):** $25,000 - $75,000
- **Micro-wedding (20-50 guests):** $15,000 - $40,000
- **Intimate elopement (2-20 guests):** $5,000 - $20,000

These ranges reflect total all-in costs, not just the venue. They include everything from the photographer to the last tip at the end of the night. The wide ranges exist because Colorado mountain venues span from a $200 national forest permit to a $25,000 private estate rental.

Let me break it down further so you can figure out where your wedding might land.

---

## Cost by Venue Location

Colorado's mountain towns each have their own personality, and their own price point. Here is what I see consistently across the venues I work with.

### Vail

Vail is premium mountain luxury, and the pricing reflects that. The village atmosphere, world-class venues, and walkable convenience come at a cost, but the experience is unmatched.

- **Venue fees:** $8,000 - $25,000+
- **Catering (per person):** $175 - $350+
- **Photography:** $5,000 - $12,000
- **Average total (100 guests):** $65,000 - $150,000+

The Sebastian and Four Seasons are the flagship venues, and both deliver impeccable experiences. Donovan Pavilion offers a more rustic setting at a slightly lower price point. Vail is where I recommend couples who prioritize luxury, convenience, and a seamless guest experience.

### Aspen

Aspen is Aspen. It is glamorous, it is exclusive, and it is expensive. But for couples with the budget, the quality of the experience is truly world-class.

- **Venue fees:** $10,000 - $30,000+
- **Catering (per person):** $200 - $400+
- **Photography:** $5,000 - $15,000
- **Average total (100 guests):** $80,000 - $200,000+

The Little Nell is the crown jewel, and the culinary program alone is worth the investment. The Hotel Jerome offers old-world charm. For outdoor-focused couples, Maroon Bells provides a backdrop that needs no decoration.

### Breckenridge

Breckenridge hits a sweet spot for many couples: authentic mountain charm, genuine ski-town energy, and pricing that is more accessible than Vail or Aspen without sacrificing beauty.

- **Venue fees:** $4,000 - $15,000
- **Catering (per person):** $125 - $250
- **Photography:** $4,000 - $10,000
- **Average total (100 guests):** $40,000 - $100,000

TenMile Station at 11,000 feet is a showstopper. The Lodge at Breckenridge offers sweeping views. Main Street Breckenridge has a walkable charm that guests love.

### Beaver Creek

Beaver Creek has the elegance of Vail with a slightly more secluded, exclusive feel. It is a favorite for couples who want luxury without the bustle.

- **Venue fees:** $6,000 - $20,000
- **Catering (per person):** $150 - $300
- **Photography:** $4,000 - $12,000
- **Average total (100 guests):** $55,000 - $130,000

The Park Hyatt and the Ritz-Carlton are both exceptional, and the Beaver Creek Chapel is one of the most photographed ceremony spaces in Colorado.

### Keystone

Keystone is the value play. Do not mistake that for lesser quality. Keystone offers some of the most stunning mountain scenery in Summit County at price points that give your budget more room to breathe.

- **Venue fees:** $3,000 - $12,000
- **Catering (per person):** $100 - $200
- **Photography:** $3,500 - $8,000
- **Average total (100 guests):** $35,000 - $80,000

Keystone Resort has multiple venue options, and Timber Ridge at the top of the gondola offers panoramic views that rival anything in the state.

---

## The Hidden Costs Nobody Warns You About

This is the section I wish someone had written for me when I started planning mountain weddings. These are the costs that blindside couples who are used to planning events at sea level.

### Altitude Tent Rentals

If you are hosting an outdoor reception or ceremony above treeline, you may need a tent. Mountain tents are not your standard party rental. They need to withstand wind, potential snow, and temperature swings. A quality tent rental for a mountain wedding runs **$3,000 - $15,000** depending on size, style, and accessories like sidewalls, heating, and flooring.

### Mountain Road Shuttles

Guest transportation is not optional in the mountains. Winding roads, limited parking, and potential winter driving conditions mean you need to shuttle your guests. Budget **$1,500 - $5,000** for shuttle service, depending on the number of pickup points, distance, and hours of service.

### Winter Weather Contingencies

Planning a winter mountain wedding? Build in a contingency fund of **$2,000 - $5,000** for weather-related expenses. This might cover last-minute venue changes, additional heating, snow removal for pathways, or extending shuttle service due to road conditions.

### Generator Fees for Remote Locations

Many of the most beautiful ceremony sites in the Colorado mountains do not have power. If you want amplified music, professional lighting, or catering equipment at a remote location, you will need a generator. Cost: **$500 - $2,500** depending on power needs and rental duration.

### National Forest Permit Costs

Some of the most breathtaking ceremony locations in Colorado are on national forest land. Permits are required and typically run **$200 - $500**, but the application process takes time and has specific rules about group size, environmental impact, and setup. I handle this for my couples, but it is a cost to plan for.

### Vendor Travel Surcharges

Mountain vendors are used to travel, but if your venue is remote, expect to pay travel fees. Photographers, DJs, and florists working at high-altitude or hard-to-reach venues often charge **$200 - $1,000** in travel surcharges. Some require overnight accommodations if the event runs late and the drive down is unsafe.

### Gratuities

This is the one people always forget. Standard gratuity for your catering team, bartenders, shuttle drivers, and other service staff adds **5-10%** to your overall budget. For a $75,000 wedding, that is $3,750 - $7,500 in tips alone.

---

## Budget Breakdown: Where Your Money Actually Goes

When I build a budget for my couples, here is how the allocation typically shakes out:

- **Venue (including rental, ceremony, and reception space):** 25-35% of total budget
- **Catering and bar (food, beverage, service staff, rentals):** 25-30%
- **Photography and videography:** 8-12%
- **Florals and decor:** 8-12%
- **Entertainment (DJ, band, or both):** 5-8%
- **Wedding planner:** 10-15%
- **Everything else (stationery, transportation, attire, beauty, gifts, favors, officiant, permits, accommodations, and contingency):** 10-15%

These percentages shift based on your priorities. I have had couples put 40% of their budget into food and beverage because that was their love language. Others invested heavily in photography because they valued having those memories documented beautifully. There is no wrong answer, only your answer.

**A real example:** For a $75,000 Vail wedding with 100 guests, a typical breakdown might look like:

- Venue: $18,000
- Catering and bar: $22,000
- Photography and video: $9,000
- Florals and decor: $7,500
- Entertainment: $4,500
- Planner: $8,000
- Other: $6,000

That totals $75,000, and it delivers a beautiful, well-planned celebration.

---

## Smart Ways to Maximize Your Budget

I love a creative budget. Here are the strategies I recommend to my couples who want a stunning mountain wedding without overspending:

### Choose Off-Peak Dates

Summer weekends (June through September) are premium pricing in the Colorado mountains. But a Friday wedding, a Sunday wedding, or a date in October, November, or May can save you 20-40% on venue and vendor costs. The shoulder seasons still offer beautiful conditions, fewer crowds, and more availability.

### Consider a Weekday Wedding

A Wednesday or Thursday wedding can reduce your venue cost by 30-50% in some locations. Your guest count might be smaller, but for many couples, that is actually a bonus. The guests who can make a midweek mountain wedding are the ones who really want to be there.

### Go Brunch

A brunch reception is one of the best-kept secrets in wedding budgeting. Breakfast and lunch food costs significantly less than dinner, and your bar tab shrinks because mimosas and Bloody Marys replace top-shelf cocktails. Plus, brunch weddings are charming and memorable. Your guests will love it.

### Let Nature Be Your Decor

This is the single biggest advantage of a Colorado mountain wedding. You are getting married in one of the most beautiful places on Earth. You do not need elaborate floral installations when the Tenmile Range is your backdrop. I have planned stunning weddings where the "decor" was simple greenery, candles, and the landscape. Nature does not charge a venue fee.

### Consider All-Inclusive Venues

Some Colorado mountain venues include catering, bar service, coordination, tables, chairs, and linens in their venue fee. These all-inclusive packages often represent better value than assembling everything a la carte, especially when you factor in the cost of transporting rentals up mountain roads.

### Limit Your Guest List

This is the single most impactful budget lever. Every guest you add costs $200-$400+ in food, beverage, rentals, and favors. A 75-person wedding versus a 150-person wedding is not just "fewer people." It is potentially $15,000 - $30,000 in savings that you can redirect toward quality.

---

## What Planner Fees Actually Cover

I believe in transparency, so let me break down what you actually get when you invest in a planner.

My full-service planning starts at $8,000, and that includes unlimited consultations, complete vendor sourcing and management, custom design, budget creation and tracking, timeline building, rehearsal coordination, and up to 14 hours of day-of coverage with my assistant. For most couples, that is 150-300+ hours of work over 10-18 months.

When you divide that out, the hourly rate is modest for a specialized professional. But the real value is not in the hours. It is in the expertise. I know which vendors deliver and which ones talk a good game. I know which ceremony sites get wind at 3 PM. I know how to build a weather contingency plan that does not ruin the day. I know how to manage altitude concerns so your guests actually enjoy themselves.

A good planner does not just organize your wedding. A good planner prevents the problems you do not know to worry about and solves the ones that inevitably arise. Every couple I have worked with has told me the same thing: "I had no idea how much I did not know."

---

**Want to build a realistic budget for your Colorado mountain wedding?** [Reach out for a complimentary consultation](/contact) and I will help you understand what is possible at your investment level. No pressure, no upselling, just honest guidance from someone who does this every day.`,
    category: "inspiration-trends",
    tags: ["budget", "colorado", "planning guide", "mountain weddings", "cost"],
    featuredImage: {
      src: "/images/blog/colorado-wedding-cost.jpg",
      alt: "Elegant mountain wedding reception setup with cost-conscious design in Colorado",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 12,
    seoTitle:
      "How Much Does a Mountain Wedding in Colorado Cost? | Real Budget Guide | Party Girl Events",
    seoDescription:
      "Real cost ranges for Colorado mountain weddings in Vail, Aspen, Breckenridge, and more. Honest budget breakdowns, hidden costs, and smart saving strategies from an experienced planner.",
    ogImage: "/images/blog/colorado-wedding-cost-og.jpg",
    status: "published",
    publishedAt: "2026-01-28",
  },
  {
    slug: "2026-wedding-color-trends-colorado",
    title: "2026 Wedding Color Trends for Colorado Mountain Weddings",
    excerpt:
      "From earth tones to jewel-toned drama, here are the color palettes defining 2026 weddings and six Colorado-inspired combinations that photograph beautifully at altitude.",
    body: `## Earth-to-Sky: The Dominant Palette of 2026

If I had to describe the color mood of 2026 weddings in one phrase, it would be this: grounded but dreamy. The dominant palettes this year draw from the earth and reach toward the sky, blending warm neutrals with nature-inspired tones in ways that feel both organic and intentional.

Here is what I am seeing everywhere, from the pages of Martha Stewart Weddings to the feeds of the photographers I work with:

**Warm neutrals** are the foundation. Ecru, sand, stone, oatmeal, and warm white have replaced the cool whites and stark ivories of years past. These tones feel lived-in and approachable. They photograph beautifully in natural light and pair well with almost anything.

**Earth tones** add depth. Terracotta, mocha, cinnamon, clay, and mushroom are showing up in everything from bridesmaid dresses to table linens to letterpress invitations. These are warm, rich colors that feel connected to the landscape.

**Nature greens** are everywhere. Sage, eucalyptus, olive, forest, and moss green now appear in over 50% of modern weddings according to multiple industry trend reports. Green is the new neutral. It works year-round, pairs beautifully with both warm and cool palettes, and in Colorado? It is all around you.

**Sky tones** bring softness. Soft blue, slate, dusty blue, and powder blue are the airy counterpoints to the earthy base. These tones add a romantic, dreamy quality without veering into saccharine territory.

The reason this earth-to-sky approach works so well for mountain weddings is that it mirrors the landscape you are standing in. Earth tones at your feet, green all around you, blue sky above. When your color palette echoes your setting, the entire celebration feels cohesive in a way that is hard to achieve with colors fighting against the environment.

---

## 6 Colorado-Inspired Color Palettes

I have put together six specific palettes that I love for Colorado mountain weddings. Each one is inspired by a real moment in the mountains and designed to photograph beautifully at altitude, where the light is sharper and more golden than anywhere else.

### 1. Alpine Sunrise

**Colors:** Soft peach, warm pink, golden amber, cream, dusty rose

This palette captures those first moments when the sun hits the peaks and the sky goes soft pink and gold. It is romantic without being girly, warm without being heavy. Alpine Sunrise works beautifully for summer and early fall weddings, especially with golden-hour ceremonies.

**How to use it:** Bridesmaids in dusty rose, florals mixing peach garden roses with golden ranunculus, cream linens with gold accents, peach taper candles on the tables.

### 2. Aspen Grove

**Colors:** Sage green, warm gold, cream, soft white, bark brown

Inspired by walking through an aspen grove in September when the leaves are pure gold against white bark and the understory is soft green. This is one of the most quintessentially Colorado palettes you can choose, and it never feels dated.

**How to use it:** Sage bridesmaid dresses, gold-leafed place cards, cream and white florals with lots of greenery, raw wood elements on the tables, bark-wrapped candles.

### 3. Mountain Storm

**Colors:** Slate blue, charcoal, navy, silver, soft gray

For the couple that wants drama and sophistication. Mountain Storm draws from the moody skies that roll through the Rockies before a thunderstorm, all deep blues and silvers with an electric quality. This palette is stunning for fall and winter weddings and photographs incredibly well.

**How to use it:** Navy bridesmaid gowns, slate blue table runners, silver and charcoal taper candles, white flowers with dusty blue delphinium, mercury glass accents.

### 4. Wildflower Meadow

**Colors:** Lavender, soft blush, sage green, buttery yellow, cream

If you have ever hiked through a Colorado meadow in July, you have seen this palette in person. Wildflower Meadow is joyful and fresh, capturing the untamed beauty of a high-altitude meadow in full bloom. It is effortlessly romantic and works best for summer weddings.

**How to use it:** Mixed pastel bridesmaid dresses (let them choose their shade), wildflower-style arrangements that look gathered rather than designed, lavender sachets as favors, cream linens with soft floral runners.

### 5. Rustic Luxe

**Colors:** Deep burgundy, warm copper, cream, forest green, espresso brown

This is the palette I reach for when a couple wants that rich, elevated mountain lodge feeling. Burgundy and copper together create an almost regal warmth, grounded by forest green and softened by cream. It is stunning in candlelight, which makes it perfect for evening receptions and winter celebrations.

**How to use it:** Burgundy velvet table runners, copper charger plates and flatware, cream candles everywhere, forest green napkins, arrangements with deep red dahlias and copper-toned mums, leather menu cards.

### 6. Winter Wonderland

**Colors:** Pure white, ice blue, silver, soft gray, crystal clear

For winter mountain weddings, this palette embraces the snow rather than competing with it. It is cool and ethereal, like standing in a snowfield at dawn. The key is texture: without warm tones, you need dimension from fabrics, metallics, and varied whites.

**How to use it:** White and silver table settings with crystal accents, ice blue bridesmaid dresses, white florals with silver-dusted eucalyptus, lots of candlelight to add warmth, clear acrylic signage that catches the light.

---

## Jewel Tones for Evening Drama

While earth tones and naturals dominate the daytime, jewel tones are having a major moment for evening and winter weddings. If you are planning a reception that starts at sunset or a winter celebration by candlelight, consider going bold:

**Navy and blush with gold accents** is a classic that never gets old. It is sophisticated enough for the most formal venue and romantic enough to feel personal. Navy table settings, blush florals, gold flatware, and warm candlelight create an atmosphere that feels like a glamorous dinner party.

**Deep red and burgundy** are powerful and passionate. A monochromatic red palette, varying from wine to crimson to blush, feels dramatic and modern. Pair it with lots of greenery and warm metallics to keep it from feeling holiday-themed.

**Gothic romance, the moody palette,** is gaining ground with couples who want something unconventional. Think black, deep plum, dark green, and charcoal with pops of blush or mauve. It sounds heavy, but when executed with enough candlelight and soft florals, it is incredibly beautiful and atmospheric. I planned a winter wedding with this palette last year at a lodge in Beaver Creek, and the guests could not stop commenting on how stunning the room felt.

**Emerald and gold** is another strong contender. There is a reason this combination feels timeless: it is rich, celebratory, and endlessly photogenic. For a mountain wedding, emerald echoes the surrounding pines while gold adds warmth and occasion.

---

## How to Choose Your Colors

With all these options, how do you actually decide? Here is my process with clients:

### Start with the Season

Your season narrows the field immediately. Summer lends itself to brighter, lighter palettes. Fall calls for warm tones and rich colors. Winter embraces cool tones, deep jewels, or crisp neutrals. Spring opens up to pastels and fresh greens.

### Consider Your Venue

A rustic barn venue calls for different colors than a modern hotel ballroom. A mountaintop ceremony surrounded by green pines suggests a different palette than a snowy field. Walk through your venue and notice what colors are already there. Your palette should complement them, not compete.

### Think About Time of Day

Colors behave differently in different light. The warm tones of terracotta and gold glow in afternoon sun. Navy and jewel tones come alive in candlelight. Soft pastels can wash out under harsh midday light but look ethereal in golden hour.

**A note on altitude light:** This is something most color guides do not mention, but the light at 8,000-10,000 feet is different. It is sharper, more golden, and more intense than at sea level. Colors appear more saturated at altitude. Soft pastels can look washed out in direct mountain sun, while rich, saturated colors photograph beautifully. I always recommend couples visit their venue in the season and at the time of day of their wedding to see how colors actually look in that specific light.

### What Photographs Well

This matters more than most couples realize. Your wedding photos are forever, and some color combinations simply photograph better than others. High contrast palettes (dark bridesmaid dresses against light florals, for example) create visual interest. Monochromatic schemes photograph as cohesive and elegant. Neons and very bright colors can cast unflattering reflections on skin in photos. When in doubt, ask your photographer what they love to shoot.

---

## A Planner's Color Advice

After years of translating Pinterest boards into real-life celebrations, here is what I have learned about color:

**Pinterest lies.** Not intentionally, but the images you save on Pinterest have been professionally photographed, edited, color-corrected, and styled in perfect conditions. The "blush" you see on your screen might look completely different in your venue's lighting. Always order physical swatches and samples.

**Less is more.** Choose 3-5 colors maximum. A primary color, a secondary color, one or two accent tones, and a neutral. When couples try to incorporate 7+ colors, the result often feels scattered rather than cohesive.

**Textures add dimension.** If you are working with a neutral or monochromatic palette, texture is your best friend. Mix velvet, linen, matte, metallic, and natural materials to create depth and visual interest without adding more colors.

**Bridesmaid dresses anchor the palette.** Whether you choose matching gowns or a mixed palette, the bridesmaids' colors are the most visible design element in your wedding photos. Start here and build outward.

**Trust the professionals.** Your florist, your stationer, and your planner work with color every day. When they tell you that a certain shade will not translate well to linens or that a particular flower does not come in the color you want, listen. Their guidance will save you disappointment.

---

**Want help choosing the perfect palette for your Colorado mountain wedding?** [Let's chat about your vision](/contact). I love nothing more than translating a vibe into a color story that makes an entire celebration feel intentional and beautiful.`,
    category: "inspiration-trends",
    tags: ["2026 trends", "color palettes", "design", "inspiration", "colorado"],
    featuredImage: {
      src: "/images/blog/color-trends-2026.jpg",
      alt: "Wedding color palette inspiration with earth tones and mountain-inspired hues",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 8,
    seoTitle:
      "2026 Wedding Color Trends for Colorado Mountain Weddings | Party Girl Events",
    seoDescription:
      "Discover the top wedding color palettes for 2026 including six Colorado-inspired combinations. Expert color advice for mountain weddings from Party Girl Events.",
    ogImage: "/images/blog/color-trends-2026-og.jpg",
    status: "published",
    publishedAt: "2026-02-05",
  },
  {
    slug: "wedding-lighting-transforms-venues",
    title: "How Lighting Transforms Any Wedding Venue",
    excerpt:
      "Lighting is the single biggest design upgrade for 2026 weddings. From string lights to architectural uplighting, here is how to transform any space and what it actually costs.",
    body: `## Why Lighting Is the #1 Design Upgrade for 2026

If I could give every couple one piece of design advice, it would be this: invest in lighting. Not flowers. Not linens. Not a custom dance floor. Lighting.

Every trend report I have read for 2026, every designer I respect, and every photographer I work with says the same thing: lighting is the single most impactful design element in any wedding. And yet, it is the one most couples overlook.

I get it. Lighting does not have the same Instagram appeal as a massive floral installation. You cannot hold lighting in your hands like a beautiful invitation suite. But here is what lighting does that nothing else can: it transforms the feeling of a space. It takes a cold, fluorescent-lit ballroom and turns it into a warm, intimate dinner party. It takes a dark barn and makes it glow. It takes an outdoor tent and turns it into a fairytale.

More couples than ever are hiring dedicated lighting designers for their weddings, and the ones who do consistently say it was the best money they spent. When I walk into a reception space and see thoughtful lighting, I know the celebration is going to feel special. When I see overhead fluorescents, I know we have work to do.

Let me walk you through the lighting styles that are defining 2026 weddings, what they cost, and how to make them work in Colorado mountain venues.

---

## 6 Lighting Styles That Transform a Space

### 1. String and Bistro Lights

**The look:** Warm, golden strands of bulbs draped overhead in parallel lines, zigzag patterns, or canopy formations. The quintessential "magic" lighting.

**Best for:** Outdoor receptions, tents, barns, open-air venues, and any space where you want a warm, festive atmosphere.

**Impact level:** High. String lights immediately make any space feel celebratory and romantic. They create a "ceiling" of light that draws the eye up and makes spaces feel more intimate.

**Cost range:** $800 - $3,500 depending on the quantity and installation complexity. Rental is typically more cost-effective than purchase for a single event.

I have used string lights at nearly every outdoor reception I have planned, and they never fail. There is a reason they are the most-requested lighting element: they work. One of my favorite installations was a criss-cross canopy of warm bistro lights over long farm tables at an outdoor reception in Beaver Creek. As the sun set and the lights came on, the entire energy of the room shifted. Guests literally gasped.

### 2. Architectural Uplighting

**The look:** Colored or warm white LED lights placed on the floor around the perimeter of a room, washing the walls with light. Creates depth, color, and ambiance without any overhead fixtures.

**Best for:** Ballrooms, banquet halls, tents, and any venue with walls that need visual interest. Particularly effective in spaces with plain or dated walls.

**Impact level:** Very high. Uplighting can completely change the color and mood of a room. A white ballroom can become warm amber, soft blush, or dramatic navy with the flip of a switch.

**Cost range:** $600 - $2,500 for professional uplighting packages (typically 15-30 fixtures). Many DJs offer uplighting as an add-on for $400-$800.

Uplighting is the secret weapon for venues that feel generic or institutional. I have taken hotel ballrooms that felt like conference spaces and turned them into moody, intimate dining rooms just with uplighting. The key is choosing the right color. Warm amber creates a candlelit feel. Soft pink or blush adds romance. I generally avoid blue or green uplighting because it tends to cast unflattering tones on skin, but in the right context, a deep navy can feel incredibly sophisticated.

### 3. Statement Pendants and Chandeliers

**The look:** Oversized hanging light fixtures, either existing or installed for the event. Crystal chandeliers, modern geometric pendants, woven rattan fixtures, or industrial Edison bulb clusters.

**Best for:** Venues with high ceilings, tents, barns, or any space that benefits from a dramatic focal point. Statement pendants work especially well over the head table or dance floor.

**Impact level:** Dramatic. A single beautiful light fixture can become the design centerpiece of your entire reception.

**Cost range:** $500 - $5,000+ depending on the fixture, rental versus purchase, and installation requirements. Crystal chandeliers are at the high end; woven or industrial pendants are more affordable.

One of my most memorable installations was three oversized crystal chandeliers hung inside a clear-top tent in Vail. The chandeliers reflected off the tent ceiling, creating a hall-of-mirrors effect that was genuinely breathtaking. That was a premium investment, but even a single statement pendant over the dance floor can create a "wow" moment.

### 4. Candle Layering

**The look:** Multiple types of candles at different heights and positions, combining taper candles in holders, pillar candles on surfaces, votives scattered across tables, and floating candles in vessels. The goal is a layered, dimensional glow.

**Best for:** Every venue, every style, every season. Candles are universally flattering and universally romantic.

**Impact level:** High, but subtle. Candles do not create the "wow" moment of a chandelier or string light canopy, but they do something arguably more important: they make everyone look beautiful. Candlelight is the most flattering light source there is. Period.

**Cost range:** $300 - $2,000 depending on quantity and candle type. Bulk ordering tapers and votives from wholesale suppliers keeps costs down. Rental options for holders and vessels are also available.

I am a candle maximalist. I believe you cannot have too many candles at a wedding. My standard recommendation is a minimum of 3 candles per table for a seated dinner, but I prefer 8-12 per table for full effect. Mix heights, mix sizes, and create clusters rather than spacing them evenly. The goal is a warm, flickering landscape that makes the table feel alive.

### 5. Table Lamps

**The look:** Small accent lamps placed on reception tables, cocktail tables, or along windowsills. A newer trend that adds warmth and an unexpected residential quality to event spaces.

**Best for:** Indoor receptions, cocktail hours, lounge areas. Particularly effective for creating intimate "rooms within rooms" in large open spaces.

**Impact level:** Medium. Table lamps are more about mood and texture than drama. They make a space feel like a beautiful home rather than an event venue.

**Cost range:** $200 - $1,500 for a collection of lamps (often a mix of vintage and coordinated pieces). Rental companies specializing in event decor often carry curated collections.

This is a trend I have been watching with great enthusiasm. A handful of tastefully chosen lamps on cocktail tables or along a bar creates an atmosphere that feels sophisticated and personal. I used this approach at a winter wedding in Aspen last year, placing brass lamps with warm bulbs throughout the cocktail hour space, and guests kept commenting on how "cozy and beautiful" the room felt.

### 6. Pin Spot Lighting

**The look:** Narrow, focused beams of light directed at specific objects, usually centerpieces, the cake, or featured design elements. Each arrangement gets its own spotlight.

**Best for:** Any indoor reception with centerpieces or featured elements that deserve emphasis. Pin spots make flower arrangements come alive and sparkle.

**Impact level:** Medium-high. Pin spots do not transform the room's overall mood, but they make every design element you have invested in look ten times better. Florals without pin spots can disappear in a dimly lit room. With pin spots, they glow.

**Cost range:** $300 - $1,200 depending on the number of spots needed. Typically priced per fixture.

This is the upgrade that florists and photographers beg couples to invest in. You spend thousands on gorgeous centerpieces, and without pin spots, they fade into the background of a dimly lit reception. With pin spots, each arrangement becomes a glowing sculpture. Every photographer I work with tells me the same thing: pin-spotted centerpieces photograph dramatically better.

---

## The Before-and-After Effect

Let me paint a picture for you.

**Before:** You walk into a mountain venue ballroom at 4 PM. The overhead fluorescent lights are on. The walls are beige. The tables are set beautifully, but the overall feeling is "event space." It is fine. It is functional. It does not take your breath away.

**After:** The overhead lights are off. Warm uplighting washes the walls in soft amber. String lights create a canopy of golden warmth overhead. Every table glows with clusters of candles at varying heights. Pin spots illuminate each centerpiece, making the florals sparkle. A statement chandelier over the dance floor catches the light and sends tiny reflections dancing across the ceiling. The room feels like a different planet. It feels like magic.

That transformation? That is entirely lighting. The tables, the chairs, the linens, the flowers, nothing else changed. Only the light.

This is why I tell every single couple: lighting is not a nice-to-have. It is the difference between your venue looking like a venue and your venue looking like a dream.

---

## Mountain Venue Lighting Considerations

Planning lighting for a Colorado mountain wedding comes with some unique challenges that flat-land planners might not know about.

### Outdoor Venues Need Generators

If your outdoor ceremony or reception site does not have power (and many of the most beautiful ones do not), you will need a generator for any electrical lighting. This adds cost ($500 - $2,500) and requires planning for placement, since generators are noisy and need to be positioned far enough away that guests do not hear them.

### Altitude Affects Candle Flames

Here is something most people do not know: candle flames burn differently at altitude. Above 8,000 feet, flames tend to be slightly larger and more flickery due to the lower oxygen density. This is beautiful, actually, but it means you need to be more careful with flame placement. Use hurricane vases or glass holders for any candles near floral arrangements, fabric, or high-traffic areas.

### Wind Protection for Open Flames

Mountain venues, especially those with terraces or open-air spaces, can be windy. Afternoon winds are common in the Rockies, and they will blow out unprotected candles and push table decor around. For outdoor receptions, use enclosed candle holders exclusively. Battery-operated LED candles have gotten remarkably realistic and are a smart choice for exposed locations.

### Golden Hour Timing Varies

In the mountains, golden hour depends not just on the time of year but on which direction your venue faces and what mountains surround it. A west-facing terrace might have golden light until 8 PM in July, while an east-facing venue in a valley might lose direct sun by 5 PM. I always scout lighting conditions at each venue to build the timeline around the best natural light, and then plan the transition to artificial lighting for after sunset.

---

## Budget-Friendly Lighting Wins

You do not need a $5,000 lighting budget to transform your space. Here are the most impactful, affordable options:

**Candles in bulk.** Buy tapers and votives from wholesale suppliers or online retailers. A hundred votives costs $50-$100 and creates an incredible amount of warmth. Add 50 taper candles in simple brass holders for another $75-$150. For under $250, you have meaningful lighting on every surface.

**String lights from your venue or rental company.** Many mountain venues already have string lights installed, especially on patios and terraces. Ask about this during your venue tour. If they do not, string light rental packages typically run $800-$1,500 and make a bigger impact than almost any other rental item.

**Uplighting through your DJ.** If hiring a dedicated lighting designer is not in the budget, ask your DJ if they offer uplighting add-ons. Many DJs carry uplighting packages for $400-$800 that include 15-20 fixtures and setup. It is not as customized as a professional lighting company, but it still transforms a room.

**Turn off the overheads.** This is free, and it is the single most important lighting decision you can make. Overhead fluorescent or bright white lights kill ambiance instantly. If your venue has dimmable overhead lighting, dim them as low as they go. If they are not dimmable, turn them off entirely and rely on your candles, string lights, and uplighting.

---

## Questions to Ask Your Lighting Vendor

If you decide to invest in professional lighting, here are the questions that will help you make the best decision:

1. **Can we do a walkthrough at the venue together?** A good lighting designer will want to see the space and understand the architecture, existing light sources, and your design vision.

2. **What is included in the setup and teardown?** Lighting installation can take hours. Make sure setup and teardown time and labor are included in your quote.

3. **Do you carry backup equipment?** At altitude, in variable mountain weather, things can go wrong. A professional vendor carries backup fixtures and cables.

4. **Can the lighting be adjusted during the event?** You might want brighter light during dinner and dimmer, moodier light for dancing. Make sure adjustments are possible and someone is available to make them.

5. **Do you coordinate with the DJ and photographer?** Lighting, music, and photography are deeply connected. The best experiences come when these vendors communicate and coordinate.

6. **What is the power situation at our venue?** Your lighting vendor should know the power capacity of your venue and whether a generator is needed. If they do not ask this question, find someone who does.

---

**Want to see what professional lighting could do for your mountain venue?** [Get in touch](/contact) and I will connect you with the lighting professionals I trust. This is one investment I have never seen a couple regret.`,
    category: "inspiration-trends",
    tags: ["lighting", "design", "venues", "decor", "2026 trends"],
    featuredImage: {
      src: "/images/blog/wedding-lighting-guide.jpg",
      alt: "Stunning wedding reception transformed by warm string lights and candlelight in a mountain venue",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 8,
    seoTitle:
      "How Lighting Transforms Any Wedding Venue | 2026 Guide | Party Girl Events",
    seoDescription:
      "Lighting is the #1 design upgrade for 2026 weddings. Learn about 6 lighting styles, mountain venue considerations, costs, and budget-friendly options from Party Girl Events.",
    ogImage: "/images/blog/wedding-lighting-guide-og.jpg",
    status: "published",
    publishedAt: "2026-02-10",
  },
  {
    slug: "non-traditional-wedding-formats-2026",
    title: "Beyond the Ballroom: 7 Non-Traditional Wedding Formats",
    excerpt:
      "The traditional sit-down dinner reception is no longer the default. From cocktail parties to adventure elopements, here are 7 wedding formats couples are choosing in 2026 and how to make each one work.",
    body: `## The Format Revolution

Here is a conversation I am having more and more often with couples: "We love the idea of getting married. We are not sure we love the idea of a traditional wedding."

And I get it. The standard format, ceremony, cocktail hour, sit-down dinner, speeches, cake cutting, first dance, bouquet toss, has been the default for decades. It works. It is familiar. But for a growing number of couples in 2026, familiar is not the goal. Meaningful is.

The wedding industry is in the middle of what I am calling the Format Revolution. Couples are not just personalizing the details of their weddings; they are rethinking the entire structure. And the results are some of the most creative, joyful, memorable celebrations I have ever seen.

One thing I want to address up front, because I see this mistake all the time on Reddit and wedding forums: **if you are going to skip the dinner, do not schedule your event at dinnertime.** This is the one rule that applies to every non-traditional format. An evening event with no meal makes guests hungry and cranky. A brunch event, an afternoon cocktail party, or a late-night dance party works because it aligns expectations with the schedule. Format and timing have to match.

With that important caveat, here are seven non-traditional wedding formats and how to make each one work beautifully.

---

## 1. Cocktail Party Reception

**The concept:** Skip the seated dinner entirely. Instead of assigned tables and plated courses, host a cocktail-style reception with heavy hors d'oeuvres, food stations, cocktail bars, and lots of room to mingle, dance, and celebrate.

**Best for:** 80-150 guests. Large enough to feel like a party, manageable enough for a cocktail flow.

**Why couples love it:** Cocktail receptions are social, energetic, and fun. Instead of spending three hours sitting at an assigned table with seven people they may not know well, guests circulate, reconnect, and form their own conversations. The vibe is more "best party you have ever been to" than "formal dinner event."

**How to make it work:**

- **Food is non-negotiable.** "Heavy hors d'oeuvres" means heavy. Think passed apps coming every 10 minutes plus 3-4 substantial food stations (carving station, seafood display, pasta station, taco bar, etc.). Guests should never feel hungry.
- **Provide some seating.** Not assigned tables, but scattered cocktail tables, lounge areas, and high-tops. Guests need somewhere to set down a plate, rest their feet, and have a conversation. Aim for seating for about 50% of your guest count.
- **Create zones.** A cocktail reception works best when the space is divided into distinct areas: a main bar area, a lounge zone, a food station area, and a dance floor. This encourages flow and gives guests options.
- **Shorten the timeline.** A cocktail reception does not need to be five hours. Three to four hours is the sweet spot: long enough to feel celebratory, short enough to maintain energy.

**Budget advantage:** Cocktail receptions typically cost 15-25% less than a seated dinner because you save on formal place settings, assigned seating logistics, and per-plate catering costs. That savings can go toward better food stations, a better bar, or a better band.

I planned a cocktail reception wedding in Vail last summer that was one of the most fun events I have ever been part of. The couple created four "experience zones": a taco and tequila station, a raw bar with champagne, a cozy fireside lounge with whiskey, and a dance floor with a live band. Guests flowed between zones all night, and the energy never dropped. Multiple guests told me it was the best wedding they had ever attended.

---

## 2. Courthouse + After-Party

**The concept:** Get legally married at the courthouse with just your witnesses, then throw a separate celebration party for all your friends and family. The legal ceremony and the celebration are two distinct events.

**Best for:** Couples who want to separate the legal act of marriage from the social celebration. Also great for couples who feel anxious about a big ceremony or who have complex family dynamics.

**Why couples love it:** There is something incredibly freeing about knowing you are already married when you walk into your party. The pressure of the ceremony is gone, replaced by pure celebration. You already did the important part. Now you get to dance.

**How to make it work:**

- **Make the courthouse ceremony its own moment.** Even if it is just the two of you and two witnesses, dress up. Get a photographer for 30 minutes. Go to your favorite restaurant afterward. This deserves to be special too.
- **Time the celebration party intentionally.** Some couples throw the party the same weekend. Others wait weeks or months. Both work. Just communicate clearly to guests what the event is: "We got married! Now we are celebrating with you."
- **Skip the traditional ceremony at the party.** You are already married. You do not need to recreate the ceremony. Instead, start with a toast, a first dance, or just open the doors and let the party begin.

**Budget advantage:** Major. Courthouse ceremonies cost $30-$100. The celebration party can be whatever you can afford and whatever you want it to be: a backyard barbecue, a restaurant buyout, a rooftop cocktail party, a catered dinner. You are not paying for ceremony infrastructure (officiant, altar, processional logistics) at the party.

---

## 3. Micro-Wedding (50 Guests or Fewer)

**The concept:** A full wedding experience, with a ceremony, reception, dinner, and all the meaningful moments, but with a curated guest list of 50 or fewer.

**Best for:** Couples who value depth over breadth. Those who want every guest to be someone they genuinely know and love.

**Why couples love it:** Micro-weddings hit a sweet spot that feels impossible at larger weddings. You can have a real conversation with every guest. You can afford to elevate every detail: the food, the flowers, the venue, the wine. The per-guest investment goes up, but the total investment often goes down, and the experience is dramatically more personal.

**How to make it work:**

- **Think per-guest, not per-event.** With 30-50 guests, you can afford to spend $300-$500+ per person on food and drink and still come in under budget. This means exceptional multi-course meals, premium open bars, and elevated personal touches.
- **Choose venues that fit the scale.** A 40-person wedding in a 300-person ballroom feels empty. Private dining rooms, boutique hotel spaces, mountain lodges, and restaurants are perfect for micro-weddings because they are designed for intimacy.
- **Personalize aggressively.** With fewer guests, you can do things that are impossible at scale: handwritten notes at each place setting, personalized favors, custom cocktails for each table. These touches are what make guests say, "I have never been to a wedding like this."
- **Do not apologize for the guest list.** The hardest part of a micro-wedding is the guest list curation. Some people will be disappointed. That is okay. Your wedding is not an obligation to invite everyone you know. It is a celebration of your relationship with the people who matter most.

I planned a 35-person micro-wedding at a private mountain home outside Breckenridge last fall, and it was one of the most beautiful weddings I have ever been part of. The couple served a five-course meal paired with wines they had collected over the years. Each course was introduced with a story about where they found the wine and what it meant to them. Guests were enraptured. You cannot do that with 150 people.

---

## 4. Weekend Wedding Experience

**The concept:** Instead of a single-day event, spread the celebration across an entire weekend. Friday welcome party, Saturday ceremony and reception, Sunday farewell brunch. Guests are immersed in a multi-day experience.

**Best for:** Destination-style weddings where guests are traveling anyway. Also perfect for couples with friends and family scattered across the country who rarely get to be together.

**Why couples love it:** A single wedding day goes by in a flash. A wedding weekend gives you time to actually enjoy your people. Friday night, you are relaxed and reconnecting. Saturday, you celebrate. Sunday, you say goodbye slowly. The memories are richer because they are built over days, not hours.

**How to make it work:**

- **Pace the events.** Friday should be casual and social: a welcome party at a local restaurant or bar, a barbecue, a bonfire. Saturday is the main event. Sunday is low-key: a brunch or a group activity like a hike. Do not exhaust your guests by making every event formal and scheduled.
- **Provide a clear itinerary.** Guests want to know what is happening and when. A printed or digital weekend guide with times, locations, dress codes, and transportation details is essential.
- **Make activities optional.** Some guests will want to attend everything. Others will need downtime. Clearly communicate which events are "please join us" and which are optional.
- **Budget for three events, not one.** A wedding weekend requires three separate plans, budgets, and setups. This does increase the total investment, but it also spreads the cost across multiple, less-expensive events. A casual Friday welcome party and a Sunday brunch cost significantly less per person than the Saturday reception.

Colorado is perfect for wedding weekends because the mountains give guests a reason to arrive early and stay late. Hiking, biking, rafting, spa days, exploring charming mountain towns, your guests are not just attending a wedding. They are having a vacation. I have had guest families extend their stays because they fell in love with the area, and nothing makes a couple happier than knowing their wedding introduced their loved ones to a place they adore.

---

## 5. Elopement + Celebration Party

**The concept:** Have your intimate ceremony, just the two of you (or with a tiny handful of witnesses), in a breathtaking location. Then, days or weeks or months later, throw a party for your broader community to celebrate.

**Best for:** Couples who want an intimate, private ceremony without the pressure of an audience, but who also want to celebrate with their people.

**Why couples love it:** You get both things: the deeply personal, emotional ceremony AND the big, joyful party. You do not have to choose. The ceremony is yours. The party is for everyone.

**How to make it work:**

- **The elopement is its own event.** Hire a photographer. Get a good officiant. Choose a location that takes your breath away. Write vows that make each other cry. This is the most important part of your marriage, and it deserves to be treated that way.
- **The celebration party can be anything.** A dinner party, a cocktail reception, a backyard barbecue, a dance party at a rented venue. Since there is no ceremony to plan, the party is purely about celebrating. This makes planning simpler and more fun.
- **Show elopement photos at the party.** Set up a slideshow or a framed photo display of your elopement. Guests love seeing the ceremony they were not at, and it creates a beautiful connection between the two events.
- **Skip the guilt.** Some guests (cough, parents, cough) might have feelings about not being at the ceremony. Acknowledge those feelings, but do not let them change your decision. This is your marriage. If an intimate ceremony feels right, honor that.

I plan a lot of elopement-plus-party celebrations, and they are consistently among the happiest couples I work with. There is something about knowing the "official" part is done that allows couples to be fully present and joyful at the party. They are not nervous about the ceremony or stressed about the timeline. They are just celebrating.

---

## 6. Brunch Wedding

**The concept:** A morning ceremony followed by a champagne brunch reception. Typically wraps by mid-afternoon, giving guests (and the couple) the rest of the day to relax and enjoy.

**Best for:** Couples who love mornings (they exist!), who want a more casual and affordable reception format, or who are getting married in a venue that is most beautiful in daylight.

**Why couples love it:** Brunch weddings are charming, budget-friendly, and surprisingly elegant. There is something delightful about a morning ceremony followed by mimosas, waffles, and dancing. Guests always leave in great spirits because they still have the whole day ahead of them.

**How to make it work:**

- **Lean into the brunch aesthetic.** This is not the time for a dark, moody palette. Brunch weddings call for bright, airy, sunlit design. Fresh flowers, light colors, lots of natural light. Serve champagne and fresh juice alongside coffee and pastries.
- **Create a generous food spread.** A brunch buffet with stations is the way to go: an omelet station, a waffle bar, a smoked salmon display, fresh pastries, a fruit and cheese spread, and a build-your-own mimosa or Bloody Mary bar. It is crowd-pleasing, affordable, and fun.
- **Keep the reception to 2-3 hours.** Brunch energy is different from evening energy. It is bright and social but does not need to go until midnight. A ceremony at 10 AM, cocktail reception at 11 AM, brunch at noon, and wrap by 2 PM is a perfect brunch wedding timeline.
- **Do not skimp on music.** Just because it is daytime does not mean you should skip the dance floor. Upbeat brunch music, a good DJ or a live acoustic set, keeps the energy celebratory. Some of the best dance floors I have seen have been at brunch weddings.

**Budget advantage:** Significant. Brunch food costs 30-50% less than dinner. The bar tab is lower because mimosas and Bloody Marys replace premium cocktails. And since the event is shorter, many venue and vendor costs are reduced. A $50,000 dinner wedding might be a $30,000 brunch wedding with the same guest count.

For mountain weddings in Colorado, brunch has an extra advantage: morning light. The soft, golden morning light in the mountains is absolutely stunning. By early afternoon, the light can get harsh and flat. A brunch wedding captures the best light of the day for both the ceremony and portraits.

---

## 7. Adventure Elopement

**The concept:** Hike to a summit, paddle to a hidden lake, or drive to a remote overlook. Say your vows in a place that feels wild and extraordinary. Just the two of you, your officiant, and your photographer.

**Best for:** Adventurous, outdoorsy couples who care more about the experience than the party. Couples who want to start their marriage with an adventure, not a reception.

**Why couples love it:** Because nothing else in the world feels like standing on a mountaintop at sunrise and promising your life to someone. Adventure elopements strip away every unnecessary element and leave only the essential: two people, a commitment, and the natural world.

**How to make it work:**

- **Hire a photographer who specializes in adventure elopements.** This is not a standard wedding photography gig. Your photographer needs to be comfortable hiking with gear, shooting in variable weather, and capturing candid emotion in remote locations. The right photographer will also help you scout locations and plan the timeline around the best light.
- **Get the right permits.** Colorado's national forests, state parks, and wilderness areas all have different permit requirements for commercial photography (which your elopement photos are, legally). I handle this for my clients, but it is an important step.
- **Plan for weather and altitude.** An adventure elopement at 12,000 feet requires preparation. Layers, altitude acclimation, weather backup plans, and emergency supplies are not optional. Know your fitness level and be honest about what you can handle.
- **Think about what you will wear.** You do not need a traditional gown or suit, but you do want to feel special. Many adventure elopement brides wear shorter dresses, separates, or even jumpsuits that allow them to hike comfortably while still feeling bridal. Grooms often opt for nice pants and a button-down rather than a full suit. Bring a change of shoes for the hike.
- **Build in a celebration.** Even if the elopement itself is just the two of you, plan something special afterward. A picnic at the trailhead. A reservation at your favorite restaurant. A champagne toast at your campsite. The celebration does not need to be big, but it should mark the occasion.

Colorado is genuinely one of the best places in the world for adventure elopements. The Rockies offer an almost infinite variety of breathtaking locations: alpine lakes, dramatic ridgelines, flower-filled meadows, ancient forests, and sweeping valleys. Every season offers something different and extraordinary. I have planned summer elopements on 14,000-foot summits, fall elopements in golden aspen groves, and winter elopements on snowshoe-accessible overlooks. Each one was magical in its own way.

---

## Finding Your Format

With all these options, how do you decide? Here are the questions I ask every couple when we start exploring format:

**What is the feeling you want?** Close your eyes and imagine your wedding. Are you surrounded by a crowd? Alone with your partner? Laughing at a dinner table? Dancing in a field? The feeling tells you more about your format than any Pinterest board.

**Who really needs to be there?** Make a list of the people you cannot imagine getting married without. That number tells you a lot. If it is 5 people, you might be an elopement couple. If it is 150, you are looking at a traditional or cocktail reception. If it is 30, a micro-wedding might be your sweet spot.

**What do you want to spend money on?** If food and drink are your love language, invest in the meal. If adventure is, invest in the location. If togetherness is, invest in a weekend experience. Your budget priorities point toward your format.

**What do you actively not want?** Sometimes it is easier to start with elimination. If you hate the idea of being the center of attention, skip the big ceremony. If seated dinners bore you, go cocktail. If you dread making a guest list, elope. Knowing what you do not want is just as valuable as knowing what you do.

**What will you remember in 20 years?** Not what will look good on Instagram. Not what your parents expect. Not what the wedding industry says you should do. What will YOU remember? Design your wedding around that answer.

---

**Not sure which format fits you?** That is exactly what our discovery call is for. [Reach out](/contact) and let's talk about what your celebration could look like. There is no wrong answer, only your answer.`,
    category: "inspiration-trends",
    tags: [
      "non-traditional",
      "micro wedding",
      "elopement",
      "2026 trends",
      "planning tips",
    ],
    featuredImage: {
      src: "/images/blog/non-traditional-formats.jpg",
      alt: "Couple celebrating an intimate mountain wedding in a non-traditional format",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 10,
    seoTitle:
      "7 Non-Traditional Wedding Formats for 2026 | Beyond the Ballroom | Party Girl Events",
    seoDescription:
      "Explore 7 non-traditional wedding formats for 2026: cocktail receptions, micro-weddings, adventure elopements, brunch weddings, and more. Find your perfect format with Party Girl Events.",
    ogImage: "/images/blog/non-traditional-formats-og.jpg",
    status: "published",
    publishedAt: "2026-02-14",
  },
  {
    slug: "micro-luxury-weddings-colorado-mountains",
    title: "The Rise of Micro-Luxury Weddings in the Colorado Mountains",
    excerpt:
      "Why more couples are choosing smaller guest lists and dramatically higher per-person experiences. A deep dive into the micro-luxury trend reshaping mountain weddings.",
    body: `## Smaller Guest Lists, Bigger Experiences

Something has shifted in how couples think about their weddings. I have watched it happen over the last few years, and in 2026 it has become one of the most defining trends in my practice: couples are choosing smaller guest lists not because of budget constraints, but because they want to invest more deeply in the experience for the people who do attend.

I am calling this the micro-luxury movement, and it is fundamentally changing what Colorado mountain weddings look like.

## What Is a Micro-Luxury Wedding?

A micro-luxury wedding typically has 30 to 75 guests, a total budget that rivals or exceeds what many couples spend on 150-person weddings, and an experience that feels more like a curated weekend retreat than a traditional reception. The per-guest investment is significantly higher, and the result is a celebration where every single detail is elevated.

Think five-course tasting menus with wine pairings instead of plated chicken or fish. Custom cocktails developed specifically for the couple instead of a standard open bar. Personalized welcome gifts in each hotel room. Handwritten notes at every place setting. A string quartet during dinner that transitions to a DJ for dancing. Transportation handled seamlessly so no guest ever needs to think about logistics.

These are not weddings where quality was sacrificed for scale. These are weddings where scale was deliberately reduced to maximize quality.

## Why the Mountains Are Perfect for This

Colorado mountain venues are uniquely suited to micro-luxury celebrations for several reasons.

**Intimate venue options abound.** Private dining rooms at five-star resorts, mountain lodges that feel like private homes, lakeside retreats accessible only by backcountry roads, and boutique hotel spaces designed for gatherings of 30 to 60 people. These venues feel exclusive without feeling empty. A 40-person dinner at Piney River Ranch, with candles reflecting off the lake and the Gore Range towering overhead, is genuinely one of the most magical settings I have ever created.

**The culinary scene supports it.** Colorado mountain towns have exceptional restaurants and catering operations. When you reduce your guest count, you can afford to hire a private chef, commission a multi-course tasting menu, or buy out an entire restaurant for the evening. I have had couples work directly with executive chefs to design menus that tell their love story through food, each course inspired by a place or moment that mattered to them.

**The destination factor works in your favor.** Most guests at a Colorado mountain wedding are traveling. When you reduce the guest list, you can offer to cover or subsidize accommodations, making the experience feel like a true hosted weekend rather than an expensive obligation. I have had couples book out entire boutique inns, giving their guests a private compound for the weekend. The intimacy this creates is extraordinary.

## The Budget Math

Here is the part that surprises people. A micro-luxury wedding often costs the same as, or even more than, a larger traditional wedding. The difference is in allocation.

A traditional 150-person wedding might budget $200 per person for food and drink. That gives you a solid plated dinner and an open bar. Good, but not extraordinary.

A 40-person micro-luxury wedding with the same total food-and-beverage budget can spend $750 per person. At that level, you are in five-course tasting menu territory with premium wine pairings, craft cocktail stations, and a late-night dessert experience. The food becomes an event within the event.

The same math applies to every category: florals, photography, entertainment, stationery. When you divide a generous budget across fewer people and fewer tables, the per-person experience is dramatically elevated.

## Planning a Micro-Luxury Celebration

If the micro-luxury approach resonates with you, here is what I recommend:

**Start with your guest list, not your venue.** Know who your 30 to 75 people are before you start looking at spaces. This clarity shapes every decision that follows.

**Invest in a planner early.** Micro-luxury weddings require meticulous attention to detail because every detail is visible. There is nowhere to hide mediocrity when you have 40 guests and every element is curated. A planner who understands this level of execution is essential.

**Think about the weekend, not just the wedding.** The best micro-luxury celebrations I plan are multi-day experiences. A welcome dinner Friday, the wedding Saturday, a farewell brunch Sunday. When every guest is someone you love deeply, you want more time with them, not less.

**Personalize ruthlessly.** With fewer guests, you can afford to treat each person as an individual. Custom cocktails named after guests. Personalized timeline cards. Handwritten notes explaining why that person matters to your story. These touches are impossible at scale but transformative at 40 people.

---

The micro-luxury movement is not about being exclusive for the sake of exclusivity. It is about making a deliberate choice to prioritize depth over breadth, experience over spectacle, and connection over convention. For couples who value those things, a Colorado mountain micro-luxury wedding is one of the most extraordinary ways to begin a marriage.

**Curious about what a micro-luxury celebration could look like for you?** [Let's talk about your vision](/contact).`,
    category: "inspiration-trends",
    tags: ["micro wedding", "luxury", "2026 trends", "planning tips", "intimate weddings"],
    featuredImage: {
      src: "/images/blog/micro-luxury-wedding.jpg",
      alt: "Intimate luxury table setting at a micro wedding with mountain views through floor-to-ceiling windows",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 7,
    seoTitle:
      "Micro-Luxury Weddings in Colorado Mountains | Intimate Luxury Celebrations | Party Girl Events",
    seoDescription:
      "Discover the micro-luxury wedding trend: smaller guest lists, elevated experiences, and unforgettable Colorado mountain celebrations. Learn how to plan yours with Party Girl Events.",
    ogImage: "/images/blog/micro-luxury-wedding-og.jpg",
    status: "published",
    publishedAt: "2026-02-10",
  },
  {
    slug: "food-as-decor-colorado-mountain-weddings",
    title: "Food as Decor: How Culinary Design Is Transforming Mountain Weddings",
    excerpt:
      "The line between catering and design has blurred. From grazing tables that double as centerpieces to dessert installations that replace floral arches, food is becoming the most beautiful element of the celebration.",
    body: `## When the Menu Becomes the Design

I noticed something at a wedding I planned last fall in Beaver Creek. During cocktail hour, every single guest was gathered around the charcuterie installation, not just eating but admiring it. Taking photos of it. Talking about the artistry of it. The florist had created a beautiful lounge area nearby, and it was lovely, but the food was getting the attention.

That moment crystallized something I had been seeing for a while: **food is becoming decor**. And not in a gimmicky way. In a way that is fundamentally changing how I approach wedding design.

## The Grazing Table Revolution

The most visible expression of this trend is the grazing table, also called a graze board, and at wedding scale it becomes a grazing installation. These are not your standard cheese-and-cracker platters. They are sprawling, artistic arrangements of cheeses, charcuterie, fruits, nuts, breads, dips, and accompaniments that stretch across entire tables or even wrap around room features.

A well-designed grazing table is genuinely stunning. The colors are rich and varied, the textures create visual interest, and the abundance communicates generosity and celebration. When it is done right, it becomes the centerpiece of the cocktail hour, drawing guests together and creating a social focal point that no flower arrangement can match.

For Colorado mountain weddings, I love incorporating local elements: Colorado honey, mountain cheeses from local creameries, elk and bison charcuterie from ranch partners, and seasonal fruits. This ties the food to the place and gives guests something to talk about beyond "the food was good."

## Interactive Food Stations as Design Elements

Beyond grazing tables, couples are designing their receptions around interactive food experiences that serve double duty as entertainment and decor.

**Live fire cooking.** An open fire grill or wood-fired oven creates a dramatic visual focal point. The flames, the smoke, the activity of a chef working over live fire: it is theater. At a summer wedding at Piney River Ranch, we set up a wood-fired pizza station on the meadow. The stone oven became the anchor of the outdoor reception space. Guests gathered around it all night.

**Pasta-making stations.** A chef hand-rolling pasta at a station is mesmerizing. The flour, the dough, the rhythm of the work, it is beautiful to watch. And then you eat it. Fresh pasta made in front of you, tossed in a sauce of your choosing, is an experience that no plated course can replicate.

**Build-your-own experiences.** Taco bars, ramen stations, poke bowls, make-your-own s'mores. These interactive stations get guests moving, choosing, and engaging. They create natural conversation and eliminate the static energy of a seated dinner. From a design perspective, each station becomes a zone with its own aesthetic, signage, and visual identity.

## Dessert as Architecture

This is where the food-as-decor trend gets really creative. Instead of a traditional wedding cake on a side table, couples are creating dessert installations that replace or supplement floral arrangements as the visual climax of the reception.

I have seen donut walls that function as room dividers. Macaron towers that serve as table centerpieces, each guest pulling their own dessert from a shared sculpture. Cookie and brownie bars styled as art installations with museum-quality labeling and lighting. And cake displays that are genuinely architectural, multi-tiered structures with cakes, pies, pastries, and confections arranged as a cascading centerpiece.

For mountain weddings, I love the concept of a "mountain dessert bar": a tiered installation that echoes the peaks outside, built from local bakery goods, Colorado chocolates, and handmade confections. It is edible, beautiful, and entirely on-theme.

## The Practical Advantages

Food-as-decor is not just beautiful. It actually makes practical sense for several reasons.

**It reduces floral costs.** When your grazing table, dessert installation, and food stations are providing visual impact, you need fewer floral arrangements. I have had couples save thousands on florals by investing that money into more impactful food presentations.

**It improves the guest experience.** Interactive food is inherently social. It gives people something to do, something to talk about, and something to share. This is especially valuable during cocktail hour and transitions, when guests might otherwise stand around awkwardly.

**It creates incredible photos.** Food photography has exploded in the last decade, and beautifully designed food installations give photographers gift-worthy content. These are the photos that end up on Instagram, which is not the reason to do it, but it is a nice bonus.

## Working with the Right Vendors

The food-as-decor approach requires close collaboration between the planner, the caterer, and the designer. These are not three separate conversations. They need to happen together, early in the planning process.

When I plan a food-forward reception, I bring the caterer and the designer into the same room from the start. We talk about the overall aesthetic, the flow of the space, the color palette, and the guest experience holistically. The food presentation is designed alongside the floral and decor plan, not after it.

This collaborative approach produces something cohesive and intentional. The grazing table colors complement the linens. The dessert installation echoes the ceremony arch. The live fire station anchors the outdoor space the way a lounge area might. Everything works together.

## Making It Work in the Mountains

Mountain venues add a layer of complexity to food-forward design because of logistics. Altitude affects baking. Temperature affects chocolate and dairy. Remote venues require careful transport planning. Wind affects outdoor presentations.

These are all solvable problems, but they require a caterer who understands mountain conditions and a planner who has managed food installations at elevation. This is one area where working with local, experienced professionals makes a genuine difference.

---

The food-as-decor movement is about recognizing that the meal is not just sustenance. It is an experience, an art form, and a design element. When approached with intention and creativity, it can be the most memorable part of your wedding.

**Ready to explore a food-forward approach for your celebration?** [Let's design something extraordinary together](/contact).`,
    category: "inspiration-trends",
    tags: ["food", "wedding design", "2026 trends", "catering", "reception ideas"],
    featuredImage: {
      src: "/images/blog/food-as-decor.jpg",
      alt: "Stunning grazing table installation at a Colorado mountain wedding reception",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 8,
    seoTitle:
      "Food as Decor: Culinary Design for Mountain Weddings | Party Girl Events",
    seoDescription:
      "How food is becoming the most beautiful element of Colorado mountain weddings. Grazing tables, live fire stations, dessert installations, and the culinary design trend.",
    ogImage: "/images/blog/food-as-decor-og.jpg",
    status: "published",
    publishedAt: "2026-02-06",
  },
  {
    slug: "sustainable-mountain-weddings-colorado",
    title: "How to Plan a Sustainable Mountain Wedding Without Sacrificing Beauty",
    excerpt:
      "Sustainability and stunning design are not mutually exclusive. A practical guide to reducing your wedding's environmental impact while celebrating in the Colorado mountains you love.",
    body: `## Celebrating Without Compromise

The Colorado mountains are the reason most of my couples choose to get married here. The peaks, the rivers, the aspens, the wildflower meadows: this landscape is not just a backdrop for the wedding. It is the whole point. And increasingly, couples are asking me a question that makes my heart happy: **how do we celebrate here without harming it?**

The good news is that sustainable wedding planning has come a long way from the days of burlap and compromise. In 2026, a sustainable mountain wedding can be just as luxurious, beautiful, and memorable as any other wedding. Often more so, because the intentionality behind sustainable choices tends to produce more thoughtful, more personal celebrations.

Here is my practical guide to reducing your wedding's environmental footprint while still creating something extraordinary.

## Venue Selection

Your venue choice is the single biggest sustainability decision you will make, because it determines transportation needs, energy sources, waste infrastructure, and land impact.

**Choose a venue close to guest accommodations.** The largest carbon footprint of most weddings comes from guest travel and transportation. By choosing a venue within walking distance or a short shuttle ride of lodging, you dramatically reduce emissions. Vail Village venues like The Sebastian are excellent for this because guests can walk between the hotel, the venue, and the town without ever getting in a car.

**Ask about the venue's sustainability practices.** Many Colorado mountain venues have adopted green practices: solar panels, composting programs, water conservation, locally sourced food, and waste reduction targets. The Ritz-Carlton Bachelor Gulch and several Vail Resorts properties have active sustainability programs. Ask specifically what they do and let that inform your decision.

**Consider the land impact.** Outdoor ceremonies in natural settings are beautiful but can damage fragile alpine ecosystems if not managed carefully. When I plan ceremonies in wilderness areas, I work with the Forest Service and follow Leave No Trace principles: no confetti, no flower petals scattered in natural areas, no structures that require ground anchoring in sensitive soil, and careful guest flow patterns that protect vegetation.

## Food and Beverage

The wedding meal is one of the highest-impact areas for sustainability, and also one of the easiest to improve.

**Source locally.** Colorado has an incredible local food scene, and mountain towns are increasingly connected to farms, ranches, and producers in the valleys below. A caterer who sources locally reduces transportation emissions, supports the local economy, and produces fresher, more flavorful food. Some of the best meals I have served at weddings featured Colorado lamb, Western Slope produce, mountain-town cheeses, and Front Range bakeries.

**Plan portions intentionally.** Food waste is one of the biggest environmental costs of weddings. The industry standard of over-ordering by 15 to 20 percent produces significant waste. Work with your caterer to plan more precisely, and arrange in advance to donate leftover prepared food to a local shelter or food bank. Many mountain communities have food recovery programs that will pick up excess food the night of your event.

**Rethink the bar.** A curated cocktail menu with three to four signature drinks reduces waste compared to a full open bar with dozens of options. Use local spirits, Colorado wines, and craft beers from mountain breweries. Skip individual plastic bottles in favor of dispensers and glassware. And if you really want to go the extra mile, compostable cups exist that are nearly indistinguishable from glass.

## Florals and Decor

Traditional wedding florals have a significant environmental cost: flowers are often imported from South America, kept in refrigerated storage, wrapped in plastic, arranged with floral foam (which is not biodegradable), and discarded after one use. There are much better options.

**Use locally grown and foraged greenery.** Colorado mountain florists have access to incredible local materials: aspen branches, pine boughs, wildflower-inspired arrangements, and locally grown seasonal flowers. A florist who sources locally and seasonally creates arrangements that look like they belong in the mountains, because they literally grew there.

**Skip the floral foam.** Traditional floral foam is a petroleum-based product that does not biodegrade and releases microplastics. Ask your florist to use chicken wire, pin frogs, or other mechanical methods to anchor arrangements. Most experienced mountain florists have already made this switch.

**Rent instead of buying.** Many decor elements, candles and holders, table runners, signage frames, lanterns, lounge furniture, can be rented rather than purchased. This reduces waste and often reduces cost. Several Colorado event rental companies maintain extensive inventories of beautiful pieces that get reused across dozens of events.

**Donate flowers after the event.** Arrange for your ceremony and reception flowers to be delivered to a local hospital, nursing home, or hospice the morning after your wedding. Organizations like Random Acts of Flowers coordinate this kind of floral recycling, and it gives your arrangements a beautiful second life.

## Stationery and Communication

Paper waste is a surprisingly large component of wedding environmental impact when you add up save-the-dates, invitations, RSVP cards, menus, programs, escort cards, signage, and thank-you notes.

**Go digital where appropriate.** Save-the-dates, RSVP tracking, and day-of information can all be handled digitally without sacrificing elegance. A beautiful wedding website with online RSVP eliminates hundreds of pieces of paper and dozens of stamps. Reserve printed stationery for the invitation itself and the thank-you notes, the two items most likely to be kept.

**Choose sustainable printing.** When you do print, use recycled or tree-free paper (cotton, bamboo, or seed paper), vegetable-based inks, and avoid plastic-coated finishes. Seed paper is particularly beautiful for mountain weddings because guests can plant the invitation and grow wildflowers.

## Energy and Waste

**Use LED candles and lighting.** LED string lights and candles consume a fraction of the energy of traditional lighting and produce no fire risk, which is especially important during Colorado's fire season. The visual difference is negligible, and the safety and efficiency gains are significant.

**Provide recycling and composting.** Work with your venue and caterer to set up clearly labeled recycling, composting, and landfill stations. Most guests want to sort their waste correctly; they just need the infrastructure to do so.

**Choose reusable or compostable servingware.** If your venue uses real china, glassware, and silverware, you are already in good shape. For outdoor events that require disposable items, choose compostable plates, cups, and utensils. The quality of compostable servingware has improved dramatically and is now virtually indistinguishable from conventional disposables.

## Transportation

**Coordinate group transportation.** A shuttle service between hotels and the venue reduces emissions by consolidating dozens of individual car trips into a few bus runs. This is something I coordinate for every mountain wedding anyway because of the logistics, so the sustainability benefit is a bonus.

**Encourage carpooling.** Include carpooling information on your wedding website. Many couples now set up a simple carpooling coordinator where guests traveling from the same city can connect and share rides.

## The Bigger Picture

Sustainable wedding planning is not about perfection. No wedding has zero environmental impact. The goal is to make thoughtful choices in the areas where your impact is largest, venue, food, transportation, and waste, while creating a celebration that honors the landscape you love.

Every sustainable choice is also a story. When you serve locally raised Colorado lamb, you can share the ranch's name. When your flowers are foraged from the valley, your florist can explain where each element came from. When your favors are seed packets of Colorado wildflowers, you are giving guests a piece of the mountains to take home and grow. Sustainability makes your wedding more personal, more rooted, and more connected to the place where it happens.

---

**Want to plan a sustainable mountain celebration?** I help couples make intentional, beautiful choices that honor both their vision and the Colorado landscape. [Let's start the conversation](/contact).`,
    category: "planning-tips",
    tags: ["sustainability", "eco-friendly", "Colorado", "planning tips", "mountain weddings"],
    featuredImage: {
      src: "/images/blog/sustainable-mountain-wedding.jpg",
      alt: "Eco-friendly mountain wedding with locally foraged floral arrangements and natural decor",
      width: 1600,
      height: 900,
    },
    author: "Stephanie",
    readingTime: 9,
    seoTitle:
      "Sustainable Mountain Weddings in Colorado | Eco-Friendly Planning Guide | Party Girl Events",
    seoDescription:
      "Plan a sustainable Colorado mountain wedding without sacrificing beauty. Practical guide to eco-friendly venues, local food, sustainable florals, and reducing your wedding's environmental impact.",
    ogImage: "/images/blog/sustainable-mountain-wedding-og.jpg",
    status: "published",
    publishedAt: "2026-01-30",
  },
];

// =============================================================================
// Venues
// =============================================================================

export const sampleVenues: Venue[] = [
  {
    slug: "the-sebastian-vail",
    name: "The Sebastian - Vail",
    location: "vail",
    description:
      "A luxury boutique hotel in the heart of Vail Village with a stunning mountain-view terrace and versatile event spaces. The Sebastian combines contemporary design with warm mountain hospitality, offering both indoor and outdoor ceremony options, exceptional in-house catering, and a dedicated events team that understands the nuances of mountain celebrations. The terrace is one of the finest ceremony backdrops in the valley.",
    photos: [
      {
        src: "/images/venues/sebastian-terrace.jpg",
        alt: "The Sebastian terrace with Vail Mountain backdrop set for an outdoor ceremony",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/sebastian-ballroom.jpg",
        alt: "The Sebastian ballroom configured for an elegant seated reception",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/sebastian-exterior.jpg",
        alt: "The Sebastian hotel exterior in Vail Village during summer",
        width: 1200,
        height: 800,
      },
    ],
    capacity: { min: 50, max: 200 },
    priceRange: "$$$$",
    seasons: ["summer", "fall", "winter"],
    styleTags: [
      "Mountain Modern",
      "Luxury",
      "Contemporary",
      "Terrace Ceremony",
    ],
    website: "https://thesebastianvail.com",
    stephNotes:
      "The Sebastian is my top recommendation for couples who want sophistication without stuffiness. The terrace ceremony view is unbeatable in summer and fall, and the ballroom transforms beautifully for winter celebrations. Their culinary team is one of the best in the valley. Pro tip: the mountain-view suites make incredible getting-ready spaces, and the walk to the village for late-night adventures is effortless. I have planned over a dozen weddings here and the events team always goes above and beyond.",
    status: "published",
  },
  {
    slug: "the-little-nell-aspen",
    name: "The Little Nell",
    location: "aspen",
    description:
      "Aspen's only five-star, five-diamond hotel, The Little Nell is the pinnacle of mountain luxury. Nestled at the base of Aspen Mountain, the property offers world-class dining, an award-winning wine program, and event spaces that range from intimate private dining rooms to a grand terrace with Ajax Mountain views. The Nell's culinary team creates exceptional custom menus, and the property's attention to detail is second to none. For couples seeking the finest experience Aspen has to offer, this is the venue.",
    photos: [
      {
        src: "/images/venues/little-nell-terrace.jpg",
        alt: "The Little Nell terrace at golden hour with Ajax Mountain and golden aspens",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/little-nell-dining.jpg",
        alt: "Elegant private dining setup at The Little Nell with mountain views",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/little-nell-exterior.jpg",
        alt: "The Little Nell hotel with Aspen Mountain in winter",
        width: 1200,
        height: 800,
      },
    ],
    capacity: { min: 20, max: 300 },
    priceRange: "$$$$$",
    seasons: ["summer", "fall", "winter", "spring"],
    styleTags: [
      "Ultra Luxury",
      "Refined",
      "Five-Star",
      "Iconic",
      "Wine Program",
    ],
    website: "https://thelittlenell.com",
    stephNotes:
      "The Little Nell is in a class by itself. If your couple has the budget and wants the absolute finest experience in Colorado, this is it. The culinary program is extraordinary, they will customize anything, and the wine pairings are some of the best I have seen at any venue. The fall terrace with golden aspens is genuinely one of the most beautiful ceremony settings in the state. Be aware that the premium comes with a premium price tag, and they book far in advance. I recommend reaching out 14-18 months ahead for peak season dates.",
    status: "published",
  },
  {
    slug: "tenmile-station-breckenridge",
    name: "TenMile Station",
    location: "breckenridge",
    description:
      "Perched at 11,000 feet atop Peak 9 in Breckenridge, TenMile Station is a rustic-elegant mountain lodge accessible by ski lift or gondola ride. The venue features soaring timber ceilings, a massive stone fireplace, and floor-to-ceiling windows that frame panoramic views of the Tenmile Range. The gondola ride up adds a sense of adventure and occasion, and the surrounding alpine landscape provides stunning photo opportunities in every season. TenMile Station is uniquely Breckenridge: warm, welcoming, and unforgettable.",
    photos: [
      {
        src: "/images/venues/tenmile-interior.jpg",
        alt: "TenMile Station interior with timber ceilings, stone fireplace, and mountain views",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/tenmile-ceremony.jpg",
        alt: "Outdoor ceremony at TenMile Station with Tenmile Range panoramic views",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/tenmile-gondola.jpg",
        alt: "BreckConnect Gondola carrying wedding guests to TenMile Station",
        width: 1200,
        height: 800,
      },
    ],
    capacity: { min: 50, max: 250 },
    priceRange: "$$$",
    seasons: ["summer", "fall", "winter"],
    styleTags: [
      "Rustic Mountain",
      "Lodge",
      "Panoramic Views",
      "Gondola Access",
      "Adventure",
    ],
    website:
      "https://www.breckenridge.com/explore-the-resort/weddings.aspx",
    stephNotes:
      "TenMile Station is a showstopper. The gondola ride up builds anticipation beautifully, and the views from 11,000 feet are jaw-dropping. It is perfect for couples who want that authentic mountain lodge feeling without sacrificing elegance. A few things to plan around: the altitude is real at 11,000 feet, so make sure your guests are prepared. Weather at that elevation changes fast, so we always build in extra contingency time. The gondola logistics require careful timeline planning. Also, the outdoor ceremony area can be windy in the afternoon, so I usually recommend a morning or early afternoon ceremony time. Despite the logistics, every couple I have brought here says it was the most magical venue they could have imagined.",
    status: "published",
  },
  {
    slug: "ritz-carlton-bachelor-gulch",
    name: "The Ritz-Carlton, Bachelor Gulch",
    location: "beaver-creek",
    description:
      "Tucked into the mountainside between Beaver Creek and Vail, The Ritz-Carlton Bachelor Gulch is a grand alpine lodge that feels like stepping into the most elegant ski chalet imaginable. The property features a sprawling outdoor terrace with panoramic views of the Sawatch Range, a magnificent great hall with floor-to-ceiling stone fireplaces, and impeccable Ritz-Carlton service at every turn. The resort's secluded location creates a true destination feel, while the spa, ski-in/ski-out access, and multiple dining options keep guests entertained all weekend. For couples who want world-class luxury wrapped in authentic mountain grandeur, Bachelor Gulch delivers on every level.",
    photos: [
      {
        src: "/images/venues/ritz-bachelor-gulch-terrace.jpg",
        alt: "The Ritz-Carlton Bachelor Gulch outdoor terrace set for a ceremony with mountain panorama",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/ritz-bachelor-gulch-great-hall.jpg",
        alt: "The great hall at The Ritz-Carlton Bachelor Gulch with stone fireplaces and timber beams",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/ritz-bachelor-gulch-exterior.jpg",
        alt: "The Ritz-Carlton Bachelor Gulch lodge exterior nestled into the mountain in winter",
        width: 1200,
        height: 800,
      },
    ],
    capacity: { min: 30, max: 300 },
    priceRange: "$$$$$",
    seasons: ["summer", "fall", "winter"],
    styleTags: [
      "Ultra Luxury",
      "Alpine Lodge",
      "Ski Resort",
      "Mountain Terrace",
      "Destination",
    ],
    website: "https://www.ritzcarlton.com/en/hotels/bachelor-gulch",
    stephNotes:
      "Bachelor Gulch is where I send couples who want the Ritz-Carlton polish but wrapped in a mountain blanket. The terrace ceremony with the Sawatch Range behind you is pure magic, especially in late afternoon light. What sets this property apart is the seclusion: your guests truly feel like they have arrived somewhere special, and the whole weekend becomes an experience, not just a Saturday night. The events team is exceptional and very accustomed to high-end celebrations. One insider tip: request the terrace facing west for sunset ceremonies, and book the spa out for a bridal party morning. The only thing to watch is that the food-and-beverage minimums are significant, so this venue works best for larger celebrations or couples who want to invest deeply in the culinary experience.",
    status: "published",
  },
  {
    slug: "piney-river-ranch",
    name: "Piney River Ranch",
    location: "vail",
    description:
      "Hidden at the end of a winding backcountry road north of Vail, Piney River Ranch is a lakefront retreat that feels a world away from everything. The ranch sits on the shores of Piney Lake with the rugged Gore Range rising dramatically behind it, creating one of the most breathtaking ceremony backdrops in all of Colorado. The property offers a mix of rustic cabins, a charming lodge, and expansive outdoor event spaces including a lakeside ceremony meadow and a timber-frame pavilion. Canoes dot the shoreline, wildflowers blanket the meadows in summer, and the whole atmosphere radiates an unhurried, back-to-nature elegance that is impossible to replicate.",
    photos: [
      {
        src: "/images/venues/piney-river-ranch-lake.jpg",
        alt: "Piney River Ranch lakeside ceremony with the Gore Range reflected in Piney Lake",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/piney-river-ranch-pavilion.jpg",
        alt: "Timber-frame reception pavilion at Piney River Ranch with string lights at dusk",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/piney-river-ranch-meadow.jpg",
        alt: "Wildflower meadow at Piney River Ranch with rustic cabins and mountain backdrop",
        width: 1200,
        height: 800,
      },
    ],
    capacity: { min: 20, max: 150 },
    priceRange: "$$$",
    seasons: ["summer", "fall"],
    styleTags: [
      "Rustic Elegant",
      "Lakefront",
      "Backcountry",
      "Ranch",
      "Intimate",
      "Nature",
    ],
    website: "https://pineyriverranch.com",
    stephNotes:
      "Piney River Ranch is my go-to for couples who tell me they want something real, something that feels like Colorado at its most untouched. The drive in sets the tone perfectly: your guests wind through the backcountry for about twenty minutes and then suddenly this lake and these mountains open up, and everyone just gasps. It is genuinely one of the most beautiful settings I have ever worked in. The vibe is rustic but not rough; think farm tables with linen runners, copper accents, and wildflower arrangements that look like you gathered them that morning. A few practical notes: cell service is limited out there, which is actually wonderful, and the road is unpaved so I always coordinate guest shuttles. The season is short, roughly mid-June through late September, so book early.",
    status: "published",
  },
  {
    slug: "sapphire-point-overlook",
    name: "Sapphire Point Overlook",
    location: "keystone",
    description:
      "Sapphire Point is a stunning public overlook managed by the Dillon Ranger District, perched above the sparkling waters of Lake Dillon with sweeping views of the Tenmile Range and the Continental Divide. A short forested trail leads to a natural rock outcropping that serves as the ceremony site, framed by evergreens and open sky. This is one of the most popular elopement and intimate ceremony locations in Summit County, beloved for its accessibility, natural beauty, and remarkably affordable permit process. While the site does not include reception facilities, the ceremony setting is extraordinary and only minutes from Keystone, Dillon, and Silverthorne for post-ceremony celebrations.",
    photos: [
      {
        src: "/images/venues/sapphire-point-ceremony.jpg",
        alt: "Intimate ceremony at Sapphire Point Overlook with Lake Dillon and mountain views",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/sapphire-point-overlook.jpg",
        alt: "Sapphire Point rock outcropping overlooking Lake Dillon and the Tenmile Range",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/sapphire-point-trail.jpg",
        alt: "Forested trail leading to Sapphire Point ceremony site through pine trees",
        width: 1200,
        height: 800,
      },
    ],
    capacity: { min: 2, max: 35 },
    priceRange: "$",
    seasons: ["summer", "fall"],
    styleTags: [
      "Elopement",
      "Intimate",
      "Outdoor",
      "Lakeside",
      "Budget-Friendly",
      "Natural",
    ],
    website: "https://www.fs.usda.gov/recarea/whiteriver/recarea/?recid=40915",
    stephNotes:
      "Sapphire Point is proof that you do not need a massive budget to have a jaw-dropping ceremony. I have coordinated elopements here where the couple, their photographer, and maybe a handful of loved ones stand on that overlook, and the emotion combined with that view is absolutely overwhelming. The permit is straightforward through the Forest Service and costs very little compared to private venues. A few tips: the site is first-come, first-served for the ceremony window you reserve, so plan to arrive early. Weekday ceremonies have much less foot traffic from hikers. Wind can be a factor, so skip the long veils and loose paper. I usually pair Sapphire Point ceremonies with a celebratory dinner at a restaurant in Keystone or Frisco, which keeps the whole day simple and joyful.",
    status: "published",
  },
  {
    slug: "hotel-jerome-aspen",
    name: "Hotel Jerome",
    location: "aspen",
    description:
      "Built in 1889 during the silver mining boom, Hotel Jerome is the grand dame of Aspen and one of the most storied hotels in the American West. The property blends its Victorian heritage with a sophisticated modern renovation, offering ornate event spaces including the historic ballroom with its original tin ceilings and crystal chandeliers, a sun-drenched garden courtyard, and the iconic J-Bar which has been the social heart of Aspen for over a century. Hotel Jerome carries a sense of history and occasion that few mountain venues can match, and its location in the center of downtown Aspen means your guests have the entire town at their doorstep.",
    photos: [
      {
        src: "/images/venues/hotel-jerome-ballroom.jpg",
        alt: "Hotel Jerome historic ballroom with tin ceilings, crystal chandeliers, and elegant table settings",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/hotel-jerome-courtyard.jpg",
        alt: "Hotel Jerome garden courtyard set for an outdoor reception with string lights",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/hotel-jerome-exterior.jpg",
        alt: "Hotel Jerome historic brick facade with Aspen Mountain rising behind",
        width: 1200,
        height: 800,
      },
    ],
    capacity: { min: 30, max: 200 },
    priceRange: "$$$$",
    seasons: ["summer", "fall", "winter", "spring"],
    styleTags: [
      "Historic",
      "Victorian",
      "Boutique Hotel",
      "Downtown",
      "Elegant",
      "Iconic",
    ],
    website: "https://www.hoteljerome.com",
    stephNotes:
      "Hotel Jerome is for couples who want their wedding to feel like an event with a capital E. There is a gravitas to this building that you feel the moment you walk through the doors. The ballroom with those original tin ceilings is genuinely stunning, and it photographs beautifully in both candlelight and daylight. I love pairing a courtyard ceremony with a ballroom reception, moving guests from open sky to grand interiors. The J-Bar is also perfect for a late-night after-party; your guests will feel like they are in a movie. One thing I always mention: Hotel Jerome is a Auberge property, so the food and service are exceptional. The location in downtown Aspen is both a blessing and a consideration. Your guests can walk everywhere, but you are also sharing the streets with the public. For couples who love that energy, it is perfect.",
    status: "published",
  },
  {
    slug: "the-lodge-at-breckenridge",
    name: "The Lodge at Breckenridge",
    location: "breckenridge",
    description:
      "Sitting at 9,600 feet on the side of Baldy Mountain, The Lodge at Breckenridge offers some of the most expansive views of any wedding venue in Colorado. The property features a full 360-degree panorama that stretches across the Tenmile Range, the Continental Divide, and the historic town of Breckenridge far below. The lodge itself combines mountain timber architecture with a warm, welcoming atmosphere, offering both an outdoor ceremony deck and a handsome indoor reception space with massive windows that frame the view from every angle. The on-site Traverse Restaurant provides excellent catering, and the property includes guest rooms so your closest family and friends can stay right where the celebration happens.",
    photos: [
      {
        src: "/images/venues/lodge-breckenridge-deck.jpg",
        alt: "Outdoor ceremony deck at The Lodge at Breckenridge with 360-degree mountain panorama",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/lodge-breckenridge-reception.jpg",
        alt: "Reception space at The Lodge at Breckenridge with timber beams and mountain views through floor-to-ceiling windows",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/venues/lodge-breckenridge-exterior.jpg",
        alt: "The Lodge at Breckenridge perched on Baldy Mountain above the town at sunset",
        width: 1200,
        height: 800,
      },
    ],
    capacity: { min: 30, max: 200 },
    priceRange: "$$$",
    seasons: ["summer", "fall", "winter"],
    styleTags: [
      "Mountain Lodge",
      "Panoramic Views",
      "Timber",
      "Elevated",
      "On-Site Lodging",
      "Scenic",
    ],
    website: "https://thelodgeatbreckenridge.com",
    stephNotes:
      "The Lodge at Breckenridge is one of those venues where you walk out onto the ceremony deck and just stand there speechless for a minute. The 360-degree views are not an exaggeration; you can literally see in every direction, and on a clear day the vista seems to go on forever. I especially love this venue for couples who want a mountain lodge feeling that is warm and approachable rather than over-the-top luxurious. The on-site rooms are a huge plus for families and older guests who want to avoid driving after the reception. Traverse does a wonderful job with catering and their team is easy to work with. One tip: the road up to the lodge is steep and winding, so I always arrange shuttle service for guests. It is not difficult, but after a few champagne toasts you want everyone riding safely. Fall weddings here with the aspens changing below you are something I will never get tired of seeing.",
    status: "published",
  },
];

// =============================================================================
// FAQs
// =============================================================================

export const sampleFAQs: FAQ[] = [
  {
    id: "faq-pricing-01",
    question: "How much does a wedding planner cost?",
    answer:
      "My services start at $3,000 for elopement planning and range up to $8,000+ for full-service planning, depending on the scope and complexity of your celebration. Wedding management starts at $4,500, and special event planning begins at $2,500. I believe in transparent pricing and will always provide a detailed proposal after our initial consultation so there are no surprises. The investment in a planner typically represents 10-15% of your overall wedding budget, and most of my couples tell me it was the single best investment they made.",
    category: "pricing",
    sortOrder: 1,
    status: "published",
  },
  {
    id: "faq-pricing-02",
    question: "What's included in your packages?",
    answer:
      "Each service level includes a clearly defined set of deliverables, from planning consultations and vendor management to day-of coordination and post-wedding wrap-up. You can find detailed inclusions and exclusions on each service page. I do not believe in one-size-fits-all packages, so after our initial consultation, I will create a custom proposal that reflects exactly what you need. If you want full-service planning but only need help with specific areas, or if you want wedding management with a few add-ons, we can absolutely build something that fits.",
    category: "pricing",
    sortOrder: 2,
    status: "published",
  },
  {
    id: "faq-process-01",
    question: "How far in advance should I book?",
    answer:
      "For full-service planning, I recommend booking 10-18 months before your wedding date to give us the most options for venues and vendors. Wedding management clients typically come on board 3-6 months out. Elopements can sometimes come together in as little as 2 months, though 4-6 months is ideal. For peak summer and fall season dates in popular venues like Vail and Aspen, the earlier the better. I only take a limited number of weddings per year to ensure every couple gets my full attention, so I do occasionally book up for popular weekends.",
    category: "process",
    sortOrder: 3,
    status: "published",
  },
  {
    id: "faq-process-02",
    question: "What does the planning process look like?",
    answer:
      "It starts with a complimentary 30-minute discovery call where we get to know each other and talk about your vision. If we are a good fit, I will send a custom proposal and contract. Once we are officially working together, we kick off with a detailed planning session where we cover your priorities, aesthetic, budget, and timeline. From there, the process varies by service level, but you will always have direct access to me via email, phone, and a shared planning portal. I provide regular check-ins, milestone updates, and plenty of inspiration along the way. My goal is for planning to feel exciting and manageable, never overwhelming.",
    category: "process",
    sortOrder: 4,
    status: "published",
  },
  {
    id: "faq-colorado-01",
    question:
      "What's the best time of year for a Colorado mountain wedding?",
    answer:
      "Every season in the Colorado mountains has something magical to offer. Summer (June through September) is the most popular, with warm days, wildflowers, and long golden evenings. Early fall (late September) brings the stunning gold of the aspens, one of the most photographed phenomena in the state. Winter offers snow-covered peaks, cozy fireside receptions, and a wonderland atmosphere. Spring is the quiet season with lower prices and a peaceful beauty, though weather is less predictable. My personal favorite? Late September, when the aspens are turning and the air has that perfect crispness. But the right season for you depends entirely on your vision, your guest list, and your priorities. I am happy to walk you through the pros and cons of each.",
    category: "colorado",
    sortOrder: 5,
    status: "published",
  },
  {
    id: "faq-colorado-02",
    question:
      "Do I need to worry about altitude for my guests?",
    answer:
      "Yes, and I am glad you are asking! Most Colorado mountain wedding venues sit between 8,000 and 11,000 feet above sea level. At that altitude, guests who are not acclimated may experience headaches, fatigue, shortness of breath, and increased sensitivity to alcohol. The good news is that with a little preparation, most people do just fine. I include altitude preparation guidance for every couple and recommend sending tips to your guests in advance. We also build hydration stations with electrolyte drinks into every event, suggest lighter cocktail hour menus, and pace the evening to account for the thinner air. I have never had a wedding where altitude was a serious issue, because we plan for it proactively.",
    category: "colorado",
    sortOrder: 6,
    status: "published",
  },
  {
    id: "faq-services-01",
    question:
      "What's the difference between Full Service Planning and Wedding Management?",
    answer:
      "This is one of the most common questions I get, and it is an important distinction. Full Service Planning means I am with you from the very beginning: helping you find your venue, build your vendor team, develop your design concept, manage your budget, and handle every detail from engagement to exit. Wedding Management is for couples who have already done a lot of the planning themselves but want a professional to take the reins in the final months, refine the logistics, and execute flawlessly on the day. Think of it this way: Full Service is hiring me as your partner from day one. Wedding Management is bringing me in as your closer. Both include full day-of coordination, and I pour the same care into every wedding regardless of service level.",
    category: "services",
    sortOrder: 7,
    status: "published",
  },
  {
    id: "faq-services-02",
    question: "Do you plan elopements?",
    answer:
      "Absolutely, and I genuinely love them. Elopements in the Colorado mountains are some of the most meaningful celebrations I get to be part of. Whether it is just the two of you on a mountaintop or a small gathering of your closest people at a lakeside ceremony, I handle every detail so you can be fully present in the moment. My elopement planning includes location scouting, permit coordination, vendor recommendations for photographer and officiant, timeline creation, and on-site support. I have coordinated elopements at Sapphire Point, on mountain passes, in alpine meadows, and even on frozen lakes in winter. If you can dream it, we can probably make it happen.",
    category: "services",
    sortOrder: 8,
    status: "published",
  },
  {
    id: "faq-services-03",
    question:
      "Can you help with rehearsal dinners and welcome parties?",
    answer:
      "Yes, and I actually encourage it. Mountain weddings tend to be destination experiences for most guests, so building out a full weekend makes a huge difference. I can plan everything from a casual welcome drinks evening at a local brewery to an elegant rehearsal dinner at a private restaurant or mountain lodge. Multi-day weekend planning is included in my Full Service package, and it can be added to Wedding Management as well. Some of my favorite moments happen outside the wedding itself: late-night bonfires, morning-after brunches with the whole group, that kind of thing. I have strong relationships with restaurants and unique venues throughout the Vail Valley and Summit County that are perfect for these gatherings.",
    category: "services",
    sortOrder: 9,
    status: "published",
  },
  {
    id: "faq-colorado-03",
    question:
      "What are the best Colorado mountain wedding venues?",
    answer:
      "That really depends on your style, your guest count, and what kind of experience you want to create. For luxury resort weddings, I love The Sebastian in Vail, The Little Nell in Aspen, and The Ritz-Carlton Bachelor Gulch. For rustic-elegant outdoor celebrations, Piney River Ranch and TenMile Station in Breckenridge are absolutely stunning. For intimate elopements, Sapphire Point Overlook near Keystone is hard to beat. I have worked at venues throughout the Colorado mountains and have strong opinions about which ones deliver consistently. During our planning process, I will match you with venues based on your specific vision, and I am always happy to do site visits together so you can feel the space in person.",
    category: "colorado",
    sortOrder: 10,
    status: "published",
  },
  {
    id: "faq-colorado-04",
    question:
      "How do I plan for mountain weather on my wedding day?",
    answer:
      "Mountain weather is part of the magic, and also part of the planning. In summer, afternoons often bring brief thunderstorms, so I almost always recommend morning or early afternoon ceremonies for outdoor events. In fall, the weather is generally more stable but temperatures drop quickly after sunset. Winter weddings are beautiful but require thoughtful logistics around snow and cold. The most important thing I tell every couple is this: we always have a Plan B. Every outdoor ceremony should have a weather contingency, whether that is a tent, an indoor backup space, or a covered pavilion. I monitor weather forecasts obsessively in the week before your wedding and make the call with you at the right time. In all my years of planning mountain weddings, weather has never ruined a celebration. It has made a few even more memorable.",
    category: "colorado",
    sortOrder: 11,
    status: "published",
  },
  {
    id: "faq-colorado-05",
    question: "What about wildfire season?",
    answer:
      "Wildfire season in Colorado typically runs from mid-June through September, and it is something I take very seriously in our planning. Wildfires can affect air quality with smoke haze, and in rare cases, fire restrictions can impact outdoor events. I stay closely connected with local fire districts and Forest Service updates throughout the season. For every summer and early fall wedding, I build contingency plans that account for potential smoke or fire restrictions, including indoor backup options and adjusted timelines. The reality is that most weddings are not directly impacted, but having a plan in place means we can adapt quickly if conditions change. I will always be transparent with you about current conditions and what they mean for your celebration.",
    category: "colorado",
    sortOrder: 12,
    status: "published",
  },
  {
    id: "faq-colorado-06",
    question: "Can we have an outdoor ceremony in winter?",
    answer:
      "You absolutely can, and winter outdoor ceremonies are some of the most breathtaking events I plan. There is nothing quite like exchanging vows with snow-covered peaks behind you and the crisp mountain air around you. That said, it requires careful planning. I recommend keeping outdoor portions short, ideally fifteen to twenty minutes, and then moving everyone inside for cocktails and warmth. We provide cozy wraps or blankets for guests, set up portable heaters when the venue allows, and time the ceremony to take advantage of the best light and mildest temperatures. Hot cocoa stations and warm cider go a long way too. Some of my favorite venues for winter outdoor ceremonies include The Sebastian's terrace and The Lodge at Breckenridge's deck, both of which have immediate indoor access for the reception.",
    category: "colorado",
    sortOrder: 13,
    status: "published",
  },
  {
    id: "faq-logistics-01",
    question:
      "How do I get my guests to a mountain venue?",
    answer:
      "Transportation logistics are one of the most important pieces of mountain wedding planning, and I handle this for every wedding. Most guests fly into Denver International Airport or Eagle County Regional Airport, depending on your venue location. From Denver, it is about a two-hour drive to Summit County or a two-and-a-half-hour drive to Vail. I coordinate group shuttle services, provide detailed driving directions with mountain driving tips, and create arrival guides that help guests plan their travel. For the wedding day itself, I always arrange shuttle service between hotels and the venue, especially for mountain venues with steep or winding access roads. Nobody should be worrying about navigating unfamiliar mountain roads after celebrating with you all night.",
    category: "logistics",
    sortOrder: 14,
    status: "published",
  },
  {
    id: "faq-logistics-02",
    question:
      "What about accommodations for guests?",
    answer:
      "I help every couple build an accommodation strategy that works for their guest list and budget. Most mountain towns offer a range of options from luxury hotels and boutique inns to vacation rentals and condominiums. I negotiate room blocks at hotels near your venue with discounted rates and flexible cancellation policies. For larger weddings, I often set up blocks at two or three properties at different price points so guests can choose what works for them. I also create a lodging guide with recommendations for vacation rentals in the area, which are especially popular for families and groups who want to share a house for the weekend. The key is booking early, particularly for summer and fall weekends when mountain towns fill up fast.",
    category: "logistics",
    sortOrder: 15,
    status: "published",
  },
  {
    id: "faq-logistics-03",
    question:
      "Do I need a backup plan for outdoor ceremonies?",
    answer:
      "Yes, always. I know that is not what anyone wants to hear when they are dreaming of saying their vows under open sky, but a solid backup plan is non-negotiable for mountain weddings. The good news is that most venues have beautiful indoor alternatives or covered options, and I work with excellent tent companies who can set up elegant structures that still feel open and connected to the landscape. During our planning process, we will identify your Plan B early and make sure it is a space you genuinely love, not just a grudging fallback. I have had weddings where we moved indoors and the couple told me afterward that it was even more beautiful than they had imagined. The key is planning the backup with the same care as the primary plan.",
    category: "logistics",
    sortOrder: 16,
    status: "published",
  },
  {
    id: "faq-logistics-04",
    question:
      "What's the deal with permit requirements for mountain weddings?",
    answer:
      "If you are planning a ceremony or event on public land in Colorado, such as National Forest land or county open space, you will need a special use permit. This applies to popular spots like Sapphire Point, Vail Mountain, and many backcountry ceremony locations. The permit process varies by ranger district but typically involves an application, a fee, and some conditions around group size, noise, and site restoration. Private venues handle their own permitting, so you generally do not need to worry about it if you are at a hotel or resort. I manage the entire permit process for my couples, from application to compliance, so you never have to navigate the bureaucracy yourself. I have strong relationships with the local ranger districts and know exactly what each one requires.",
    category: "logistics",
    sortOrder: 17,
    status: "published",
  },
  {
    id: "faq-pricing-03",
    question:
      "What's the average cost of a Colorado mountain wedding?",
    answer:
      "The average Colorado mountain wedding typically ranges from $40,000 to $100,000 or more, depending on guest count, venue, and the level of detail you are going for. Destination mountain weddings tend to run higher than Front Range celebrations because of the logistics involved: transportation, lodging coordination, vendor travel fees, and the premium that comes with operating at altitude. That said, beautiful mountain weddings absolutely happen at every budget level. Elopements and micro-weddings can come together for $5,000 to $15,000. My role is to help you allocate your budget wisely and invest in the things that will matter most to you. I am always honest about where to splurge and where to save, and I will never push you toward spending more than you are comfortable with.",
    category: "pricing",
    sortOrder: 18,
    status: "published",
  },
  {
    id: "faq-pricing-04",
    question: "Do you offer payment plans?",
    answer:
      "Yes, I do. I understand that wedding expenses add up quickly, and I want to make working together as comfortable as possible. My standard payment structure breaks the total investment into installments spread across the planning timeline, with an initial retainer to secure your date and the balance paid in stages leading up to the wedding. The specific schedule depends on your service level and how far out we are from your date. I am always happy to discuss payment timing during our initial consultation and find an arrangement that works for your financial situation. My goal is for you to feel great about your investment, not stressed about it.",
    category: "pricing",
    sortOrder: 19,
    status: "published",
  },
  {
    id: "faq-process-03",
    question: "How many weddings do you do per year?",
    answer:
      "I intentionally limit my calendar to around fifteen to twenty weddings per year. This is a deliberate choice because I believe every couple deserves my full attention and energy, not a watered-down version of what I can offer when I am stretched too thin. Limiting my calendar means I can be fully present for your planning process, respond to emails and calls promptly, and show up on your wedding day rested and ready to give you everything I have got. It also means I do book up, especially for peak weekends in July, August, and September. If you have a specific date in mind, I encourage you to reach out early so we can check availability.",
    category: "process",
    sortOrder: 20,
    status: "published",
  },
];

// =============================================================================
// Testimonials
// =============================================================================

export const sampleTestimonials: Testimonial[] = [
  {
    id: "testimonial-sarah-james",
    coupleName: "Sarah & James",
    quote:
      "Stephanie took our half-formed Pinterest boards and turned them into the most stunning weekend of our lives. She handled every detail with such grace that we never once felt stressed. Our guests are still talking about it, and honestly, so are we.",
    photo: "/images/testimonials/sarah-james-couple.jpg",
    venue: "The Sebastian - Vail",
    date: "2025-07-19",
    rating: 5,
    status: "published",
  },
  {
    id: "testimonial-emily-michael",
    coupleName: "Emily & Michael",
    quote:
      "We did most of the planning ourselves, but bringing Stephanie in was the best decision we made. She caught details we never would have thought of and ran the day so smoothly that we forgot there was even a plan. We just got to enjoy every moment.",
    photo: "/images/testimonials/emily-michael-couple.jpg",
    venue: "The Little Nell",
    date: "2025-09-27",
    rating: 5,
    status: "published",
  },
  {
    id: "testimonial-amanda-chris",
    coupleName: "Amanda & Chris",
    quote:
      "We wanted something simple, but Stephanie made it feel extraordinary. She thought of everything we never would have, from the hot cocoa station to the emergency hand warmers. It was the most magical day of our lives.",
    photo: "/images/testimonials/amanda-chris-couple.jpg",
    venue: "Sapphire Point Overlook",
    date: "2025-12-14",
    rating: 5,
    status: "published",
  },
];

// =============================================================================
// Pages
// =============================================================================

export const samplePages: Page[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    body: `# Privacy Policy

**Last Updated: January 1, 2026**

Party Girl Events ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and safeguard your information when you visit our website or engage our services.

## Information We Collect

### Information You Provide
When you contact us through our website, request a consultation, or engage our planning services, we may collect:
- Your name and the name of your partner
- Email address and phone number
- Wedding date and venue preferences
- Budget range and guest count
- Any other information you choose to share about your event

### Information Collected Automatically
When you visit our website, we may automatically collect:
- Browser type and device information
- IP address and approximate location
- Pages visited and time spent on our site
- Referring website or source

## How We Use Your Information

We use your personal information to:
- Respond to your inquiries and consultation requests
- Provide wedding planning and event coordination services
- Send you relevant content, tips, and updates (with your consent)
- Improve our website and services
- Comply with legal obligations

## How We Protect Your Information

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your wedding details and personal information are treated with the utmost confidentiality.

## Sharing Your Information

We do not sell, trade, or rent your personal information to third parties. We may share your information with:
- Vendors and partners directly involved in your event (with your consent)
- Service providers who assist with our website operations
- Legal authorities when required by law

## Your Rights

You have the right to:
- Access the personal information we hold about you
- Request correction of inaccurate information
- Request deletion of your information
- Opt out of marketing communications at any time

## Cookies

Our website uses cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences through your browser settings.

## Contact Us

If you have questions about this Privacy Policy or your personal information, please contact us at hello@partygirlevents.com.

## Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.`,
    seoTitle: "Privacy Policy | Party Girl Events",
    seoDescription:
      "Privacy Policy for Party Girl Events. Learn how we collect, use, and protect your personal information.",
    publishedAt: "2026-01-01",
    status: "published",
  },
  {
    slug: "terms",
    title: "Terms of Service",
    body: `# Terms of Service

**Last Updated: January 1, 2026**

Welcome to the Party Girl Events website. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.

## Use of Our Website

Our website is provided for informational purposes and to facilitate communication about our wedding planning and event coordination services. You agree to use our website only for lawful purposes and in a manner that does not infringe upon the rights of others.

## Intellectual Property

All content on this website, including text, photographs, graphics, logos, and design elements, is the property of Party Girl Events or our licensed content providers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or use our content without prior written permission.

## Photography and Content

Photographs displayed on our website are used with permission from our clients and photographers. These images may not be downloaded, copied, or used for any purpose without explicit written consent from both Party Girl Events and the respective photographer.

## Consultation and Services

Information provided on our website, including pricing, service descriptions, and availability, is subject to change without notice. A formal service agreement will govern the terms of any planning or coordination services. Website content does not constitute a binding offer or contract.

## Limitation of Liability

Party Girl Events provides this website on an "as is" basis. We make no warranties regarding the accuracy, completeness, or reliability of the information presented. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.

## Third-Party Links

Our website may contain links to third-party websites, including vendor partners and venues. We are not responsible for the content, privacy practices, or terms of service of these external sites.

## Governing Law

These Terms of Service are governed by and construed in accordance with the laws of the State of Colorado. Any disputes arising from these terms shall be resolved in the courts of Eagle County, Colorado.

## Changes to These Terms

We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting to this page. Your continued use of our website constitutes acceptance of any modified terms.

## Contact Us

If you have questions about these Terms of Service, please contact us at hello@partygirlevents.com.`,
    seoTitle: "Terms of Service | Party Girl Events",
    seoDescription:
      "Terms of Service for the Party Girl Events website. Please review our terms governing website use and services.",
    publishedAt: "2026-01-01",
    status: "published",
  },
];
