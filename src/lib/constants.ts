export const SITE_NAME = "Agra Tour Guides";

export const SITE_URL = "https://www.agratourguides.com";

export const SITE_DESCRIPTION =
  "Private guided Taj Mahal tours and Golden Triangle itineraries from a 5.0★ Google-rated Agra agency. English, Hindi & Japanese speaking guides. Skip-the-line, photo-included.";

export const DEFAULT_OG_IMAGE = "/og/home.png";

/**
 * Compute a per-page OG image URL from the page pathname.
 * Maps pathnames to the static-path slugs emitted by /og/[...slug].png.ts.
 * Returns an absolute URL.
 */
export function ogImageForPath(pathname: string): string {
  const clean = pathname.replace(/^\/|\/$/g, "");
  if (clean === "" || clean === "index.html") return `${SITE_URL}/og/home.png`;
  // /tours/:slug → tours-:slug
  if (clean.startsWith("tours/") && clean !== "tours/") {
    return `${SITE_URL}/og/tours-${clean.slice(6)}.png`;
  }
  // /guides/:slug → guides-:slug
  if (clean.startsWith("guides/") && clean !== "guides/") {
    return `${SITE_URL}/og/guides-${clean.slice(7)}.png`;
  }
  // /:city/:attraction → :city-:attraction (e.g. agra-taj-mahal)
  const segs = clean.split("/").filter(Boolean);
  if (segs.length === 2 && ["agra", "delhi", "jaipur"].includes(segs[0])) {
    return `${SITE_URL}/og/${segs[0]}-${segs[1]}.png`;
  }
  // /:city → city slug
  if (segs.length === 1 && ["agra", "delhi", "jaipur"].includes(segs[0])) {
    return `${SITE_URL}/og/${segs[0]}.png`;
  }
  // /tours/, /services/, /car-hire/, /about/, /faq/, /reviews/, /contact/ → that slug
  if (segs.length === 1 && ["tours", "services", "car-hire", "about", "faq", "reviews", "contact"].includes(segs[0])) {
    return `${SITE_URL}/og/${segs[0]}.png`;
  }
  return `${SITE_URL}/og/home.png`;
}

// Real number from Google Business Profile: 081718 26921 (India display).
// International: +91 81718 26921. WhatsApp digits: 918171826921.
export const WHATSAPP_NUMBER = "+918171826921";
export const WHATSAPP_NUMBER_DIGITS = "918171826921";

export const CONTACT_EMAIL = "info@agratourguides.com";

// Real number from Google Business Profile.
export const CONTACT_PHONE = "+91 81718 26921";

// Google Maps deep-links. These resolve to the live "Agra Tour Guides"
// listing via a name+location search, so they never 404 for a visitor.
// A dead or placeholder link here is a trust signal browsers and travellers
// both read badly, so these must always point somewhere real.
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Agra%20Tour%20Guides%2C%20Tajganj%2C%20Agra";
export const GOOGLE_REVIEWS_URL = GOOGLE_MAPS_URL;

// The canonical Business Profile URL (Share → Copy link), used for
// Organization.sameAs. Left empty until the exact profile URL is pasted in —
// a search URL is not a stable identity and must not be published as sameAs.
export const GOOGLE_BUSINESS_PROFILE_URL = "";

// Verified Google Business Profile data (5.0★ / 85 reviews, May 2026).
export const REVIEW_RATING = 5.0;
export const REVIEW_COUNT = 85;

// Languages spoken (verified in Google reviews)
export const LANGUAGES_SPOKEN = ["English", "Hindi", "Japanese"] as const;

// No published rate card: every trip is quoted individually against the
// traveller's dates, group size and pace, in whichever of USD/EUR/INR they
// prefer, converted at the mid-market rate at the time of quoting. Hard-coded
// FX tables used to live here and drifted out of date, which is exactly the
// kind of stale number that makes a small agency look untrustworthy.

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
