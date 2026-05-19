import {
  SITE_NAME,
  SITE_URL,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  REVIEW_RATING,
  REVIEW_COUNT,
  LANGUAGES_SPOKEN,
  GOOGLE_REVIEWS_URL,
} from "./constants";

// ─── Stable @ids — used everywhere to link entities in the @graph ─────────
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface CitySchemaInput {
  title: string;
  description: string;
  mapCenter: { lat: number; lng: number };
  highlights: string[];
  url: string;
}

interface AttractionSchemaInput {
  title: string;
  description: string;
  location: { lat: number; lng: number; address: string };
  visitInfo: {
    entryFeeIndian: string;
    entryFeeForeign: string;
    timings: string;
    closedOn?: string;
    bestTimeToVisit: string;
    duration: string;
  };
  heroImage: string;
  url: string;
}

interface TourSchemaInput {
  title: string;
  description: string;
  itinerary: { day: number; title: string; description: string; locations: string[] }[];
  priceFrom: number;
  currency: string;
  duration: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface GuideSchemaInput {
  title: string;
  description: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  heroImage: string;
  url: string;
}

export interface ReviewItem {
  author: string;
  country?: string;
  rating: number;
  text: string;
  datePublished: string;
}

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToInput {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
  url: string;
  estimatedCost?: { currency: string; value: number };
}

interface ItemListEntry {
  name: string;
  url: string;
  image?: string;
  description?: string;
}

interface PersonInput {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  sameAs?: string[];
  url?: string;
  credential?: string;
}

interface EventInput {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: { name: string; lat?: number; lng?: number };
  url?: string;
}

interface ImageObjectInput {
  url: string;
  caption: string;
  width?: number;
  height?: number;
  creator?: string;
  creditText?: string;
  license?: string;
  acquireLicensePage?: string;
}

// ──────────────────────────────────────────────────────────────────────
// Organization (LocalBusiness + TravelAgency dual-type)
// ──────────────────────────────────────────────────────────────────────

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: ["Agra Tour Guide", "Taj Mahal Tour Guide Agra", "Pawan Agra Tour Guides"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${SITE_URL}/images/logo.png`,
      width: 512,
      height: 512,
      caption: `${SITE_NAME} logo`,
    },
    image: `${SITE_URL}/images/og-default.jpg`,
    description:
      "Government-licensed Agra-based tour agency specialising in private Taj Mahal tours, Agra Fort, and Golden Triangle itineraries (Delhi–Agra–Jaipur). 5.0★ on Google. English, Hindi & Japanese-speaking guides.",
    slogan: "Heritage, culture, experience — by the people who grew up here.",
    foundingLocation: {
      "@type": "Place",
      name: "Agra, Uttar Pradesh, India",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tajganj",
      addressLocality: "Agra",
      addressRegion: "Uttar Pradesh",
      postalCode: "282001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.1751,
      longitude: 78.0421,
    },
    areaServed: [
      { "@type": "City", name: "Agra", "@id": "https://www.wikidata.org/wiki/Q43332" },
      { "@type": "City", name: "Delhi", "@id": "https://www.wikidata.org/wiki/Q1353" },
      { "@type": "City", name: "Jaipur", "@id": "https://www.wikidata.org/wiki/Q173387" },
      { "@type": "City", name: "Fatehpur Sikri" },
      { "@type": "TouristDestination", name: "Golden Triangle, India" },
    ],
    knowsLanguage: LANGUAGES_SPOKEN as unknown as string[],
    knowsAbout: [
      "Mughal architecture",
      "Indo-Islamic art",
      "Taj Mahal",
      "Agra Fort",
      "Fatehpur Sikri",
      "Pietra dura inlay",
      "UNESCO World Heritage Sites in India",
      "Golden Triangle itinerary planning",
    ],
    priceRange: "$$",
    currenciesAccepted: "INR, USD, EUR",
    paymentAccepted: "Cash, Credit Card, UPI, Bank Transfer",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "06:00",
      closes: "21:00",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT_PHONE,
        contactType: "reservations",
        availableLanguage: LANGUAGES_SPOKEN as unknown as string[],
        areaServed: ["IN", "GB", "US", "FR", "DE", "JP", "AU", "IT", "ES", "NL", "AE", "SG"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        availableLanguage: LANGUAGES_SPOKEN as unknown as string[],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEW_RATING,
      reviewCount: REVIEW_COUNT,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [GOOGLE_REVIEWS_URL].filter((u) => !u.includes("REPLACE_ME")),
  };
}

// ──────────────────────────────────────────────────────────────────────
// WebSite
// ──────────────────────────────────────────────────────────────────────

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

// ──────────────────────────────────────────────────────────────────────
// BreadcrumbList
// ──────────────────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ──────────────────────────────────────────────────────────────────────
// TouristDestination
// ──────────────────────────────────────────────────────────────────────

export function buildTouristDestinationSchema(city: CitySchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: city.title,
    description: city.description,
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.mapCenter.lat,
      longitude: city.mapCenter.lng,
    },
    touristType: city.highlights,
    url: city.url,
    includesAttraction: city.highlights.map((h) => ({ "@type": "TouristAttraction", name: h })),
  };
}

// ──────────────────────────────────────────────────────────────────────
// TouristAttraction (with full geo + visit info)
// ──────────────────────────────────────────────────────────────────────

export function buildTouristAttractionSchema(attraction: AttractionSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attraction.title,
    description: attraction.description,
    geo: {
      "@type": "GeoCoordinates",
      latitude: attraction.location.lat,
      longitude: attraction.location.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      opens: "06:00",
      closes: "18:30",
      validFrom: new Date().toISOString().split("T")[0],
    },
    isAccessibleForFree: false,
    image: attraction.heroImage.startsWith("http")
      ? attraction.heroImage
      : `${SITE_URL}${attraction.heroImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: attraction.location.address,
      addressCountry: "IN",
    },
    publicAccess: true,
    url: attraction.url,
    isPartOf: { "@id": ORG_ID },
  };
}

// ──────────────────────────────────────────────────────────────────────
// TouristTrip (Tour) — with offer, itinerary, aggregateRating
// ──────────────────────────────────────────────────────────────────────

export function buildTouristTripSchema(tour: TourSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    touristType: "Sightseeing",
    provider: { "@id": ORG_ID },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        name: day.title,
        description: day.description,
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.priceFrom,
      priceCurrency: tour.currency,
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
      priceSpecification: {
        "@type": "PriceSpecification",
        price: tour.priceFrom,
        priceCurrency: tour.currency,
        valueAddedTaxIncluded: false,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEW_RATING,
      reviewCount: REVIEW_COUNT,
      bestRating: 5,
      worstRating: 1,
    },
    url: tour.url,
  };
}

// ──────────────────────────────────────────────────────────────────────
// FAQPage with SpeakableSpecification baked in
// ──────────────────────────────────────────────────────────────────────

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-question", ".speakable-answer"],
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ──────────────────────────────────────────────────────────────────────
// Article (for travel guides)
// ──────────────────────────────────────────────────────────────────────

export function buildArticleSchema(guide: GuideSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: guide.publishedAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    image: guide.heroImage.startsWith("http")
      ? guide.heroImage
      : `${SITE_URL}${guide.heroImage}`,
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: guide.url,
    url: guide.url,
    inLanguage: "en",
  };
}

// ──────────────────────────────────────────────────────────────────────
// HowTo (for "how to reach X" style guides)
// ──────────────────────────────────────────────────────────────────────

export function buildHowToSchema(input: HowToInput) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    totalTime: input.totalTime,
    estimatedCost: input.estimatedCost && {
      "@type": "MonetaryAmount",
      currency: input.estimatedCost.currency,
      value: input.estimatedCost.value,
    },
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: s.url,
      ...(s.image ? { image: s.image } : {}),
    })),
    url: input.url,
  };
}

// ──────────────────────────────────────────────────────────────────────
// ItemList — for tour collection pages, attraction lists
// ──────────────────────────────────────────────────────────────────────

export function buildItemListSchema(name: string, items: ItemListEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: it.name,
      ...(it.image ? { image: it.image } : {}),
      ...(it.description ? { description: it.description } : {}),
    })),
  };
}

// ──────────────────────────────────────────────────────────────────────
// Person — for guide team pages
// ──────────────────────────────────────────────────────────────────────

export function buildPersonSchema(person: PersonInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    sameAs: person.sameAs,
    url: person.url,
    worksFor: { "@id": ORG_ID },
    ...(person.credential
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: person.credential,
            credentialCategory: "Professional Certification",
            recognizedBy: {
              "@type": "Organization",
              name: "Ministry of Tourism, Government of India",
            },
          },
        }
      : {}),
  };
}

// ──────────────────────────────────────────────────────────────────────
// Event — festivals & seasonal events
// ──────────────────────────────────────────────────────────────────────

export function buildEventSchema(event: EventInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate ?? event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location.name,
      ...(event.location.lat && event.location.lng
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: event.location.lat,
              longitude: event.location.lng,
            },
          }
        : {}),
    },
    organizer: { "@id": ORG_ID },
    url: event.url,
  };
}

// ──────────────────────────────────────────────────────────────────────
// ImageObject with full attribution
// ──────────────────────────────────────────────────────────────────────

export function buildImageObjectSchema(img: ImageObjectInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: img.url,
    url: img.url,
    caption: img.caption,
    width: img.width,
    height: img.height,
    creator: img.creator
      ? { "@type": "Person", name: img.creator }
      : undefined,
    creditText: img.creditText,
    license: img.license,
    acquireLicensePage: img.acquireLicensePage,
  };
}

// ──────────────────────────────────────────────────────────────────────
// Review schemas
// ──────────────────────────────────────────────────────────────────────

export function buildReviewSchema(review: ReviewItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": ORG_ID },
    author: {
      "@type": "Person",
      name: review.author,
      ...(review.country ? { nationality: { "@type": "Country", name: review.country } } : {}),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.text,
    datePublished: review.datePublished,
    publisher: { "@type": "Organization", name: "Google" },
  };
}

export function buildReviewsCollectionSchema(reviews: ReviewItem[]) {
  return reviews.map(buildReviewSchema);
}

// ──────────────────────────────────────────────────────────────────────
// SpeakableSpecification standalone (rarely needed — usually embed in FAQ)
// ──────────────────────────────────────────────────────────────────────

export function buildSpeakableSchema(cssSelectors: string[]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}

// ──────────────────────────────────────────────────────────────────────
// @graph wrapper — folds multiple entities into a single document so
// LLMs and search engines can follow @id refs between them.
// Preferred over emitting many separate <script type="application/ld+json"> blocks.
// ──────────────────────────────────────────────────────────────────────

export function buildGraph(entities: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": entities.map((e) => {
      const copy = { ...e };
      delete copy["@context"];
      return copy;
    }),
  };
}
