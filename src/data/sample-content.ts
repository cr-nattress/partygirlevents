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
