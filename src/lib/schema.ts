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

const ORG_ID = `${SITE_URL}#organization`;

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: ["Agra Tour Guide", "Taj Mahal Tour Guide Agra"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/images/og-default.jpg`,
    description:
      "Government-licensed Agra-based tour agency specialising in private Taj Mahal tours, Agra Fort, and Golden Triangle itineraries (Delhi-Agra-Jaipur). 5.0 stars on Google. English, Hindi & Japanese-speaking guides.",
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
        areaServed: ["IN", "GB", "US", "FR", "DE", "JP", "AU"],
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

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

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
  };
}

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
    openingHours: attraction.visitInfo.timings,
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
  };
}

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

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

export function buildArticleSchema(guide: GuideSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: guide.publishedAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    image: guide.heroImage.startsWith("http")
      ? guide.heroImage
      : `${SITE_URL}${guide.heroImage}`,
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: guide.url,
    url: guide.url,
  };
}

export function buildSpeakableSchema(cssSelectors: string[]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}

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
