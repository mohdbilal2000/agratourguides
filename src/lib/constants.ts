export const SITE_NAME = "Agra Tour Guides";

export const SITE_URL = "https://agratourguides.com";

export const SITE_DESCRIPTION =
  "Private guided Taj Mahal tours and Golden Triangle itineraries from a 5.0★ Google-rated Agra agency. English, Hindi & Japanese speaking guides. Skip-the-line, photo-included.";

export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

// REPLACE_BEFORE_LAUNCH: real number from Google Business listing
export const WHATSAPP_NUMBER = "+919999999999";
export const WHATSAPP_NUMBER_DIGITS = "919999999999";

export const CONTACT_EMAIL = "info@agratourguides.com";

// REPLACE_BEFORE_LAUNCH: real number from Google Business listing
export const CONTACT_PHONE = "+91-9999-999-999";

// REPLACE_BEFORE_LAUNCH: real Google Maps profile URL
export const GOOGLE_MAPS_URL = "https://maps.google.com/?cid=REPLACE_ME";
export const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=REPLACE_ME";

// Real, verified Google review data (April 2026) — source for AggregateRating schema
export const REVIEW_RATING = 5.0;
export const REVIEW_COUNT = 81;

// Languages spoken (verified in Google reviews)
export const LANGUAGES_SPOKEN = ["English", "Hindi", "Japanese"] as const;

// Multi-currency display — site targets foreign travelers primarily
// Conversion rates locked at site update time; refresh quarterly
export const FX_RATES = {
  INR_PER_USD: 84,
  INR_PER_EUR: 91,
} as const;

export function inrToUsd(inr: number): number {
  return Math.round(inr / FX_RATES.INR_PER_USD);
}
export function inrToEur(inr: number): number {
  return Math.round(inr / FX_RATES.INR_PER_EUR);
}
export function usdToEur(usd: number): number {
  return Math.round((usd * FX_RATES.INR_PER_USD) / FX_RATES.INR_PER_EUR);
}
export function usdToInr(usd: number): number {
  return Math.round(usd * FX_RATES.INR_PER_USD);
}

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Services", href: "/services" },
  { label: "Agra", href: "/agra" },
  { label: "Delhi", href: "/delhi" },
  { label: "Jaipur", href: "/jaipur" },
  { label: "Reviews", href: "/reviews" },
  { label: "Travel Guides", href: "/guides" },
  { label: "Contact", href: "/contact" },
];

export interface CityInfo {
  name: string;
  slug: string;
  description: string;
}

export const CITIES: CityInfo[] = [
  {
    name: "Agra",
    slug: "agra",
    description:
      "Home of the Taj Mahal — a UNESCO World Heritage marble mausoleum and one of the New Seven Wonders of the World. Our home base, where every guide on our team is born, raised and government-licensed.",
  },
  {
    name: "Delhi",
    slug: "delhi",
    description:
      "India's capital city blends ancient history with modern vibrancy — Red Fort, Qutub Minar, Humayun's Tomb, India Gate, plus world-class street food and bazaars.",
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    description:
      "The Pink City of Rajasthan — Amber Fort, Hawa Mahal, City Palace, Jantar Mantar — royal forts, ornate palaces and a vibrant culture that completes India's Golden Triangle.",
  },
];
