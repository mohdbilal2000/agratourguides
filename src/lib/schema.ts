import { SITE_NAME, SITE_URL } from "./constants";

// --- Type definitions for function parameters ---

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

// --- Schema builder functions ---

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      "Expert licensed tour guides for Agra, Delhi & Jaipur. Book private tours of the Taj Mahal, Golden Triangle & more.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tajganj",
      addressLocality: "Agra",
      addressRegion: "Uttar Pradesh",
      postalCode: "282001",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Delhi",
      },
      {
        "@type": "City",
        name: "Agra",
      },
      {
        "@type": "City",
        name: "Jaipur",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9999-999-999",
      contactType: "reservations",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [] as string[],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
      "@type": "Person",
      name: guide.author,
    },
    datePublished: guide.publishedAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    image: guide.heroImage.startsWith("http")
      ? guide.heroImage
      : `${SITE_URL}${guide.heroImage}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    url: guide.url,
  };
}

export function buildSpeakableSchema(cssSelectors: string[]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}
