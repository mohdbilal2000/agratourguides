export const SITE_NAME = "Agra Tour Guides";

export const SITE_URL = "https://agratourguides.com";

export const SITE_DESCRIPTION =
  "Expert licensed tour guides for Agra, Delhi & Jaipur. Book private tours of the Taj Mahal, Golden Triangle & more.";

export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

export const WHATSAPP_NUMBER = "+919999999999";

export const CONTACT_EMAIL = "info@agratourguides.com";

export const CONTACT_PHONE = "+91-9999-999-999";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Agra", href: "/cities/agra" },
  { label: "Delhi", href: "/cities/delhi" },
  { label: "Jaipur", href: "/cities/jaipur" },
  { label: "Attractions", href: "/attractions" },
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
      "Home to the iconic Taj Mahal and a treasure trove of Mughal heritage, Agra is a must-visit destination on any Indian itinerary.",
  },
  {
    name: "Delhi",
    slug: "delhi",
    description:
      "India's capital city blends ancient history with modern vibrancy, from the Red Fort and Qutub Minar to bustling markets and world-class cuisine.",
  },
  {
    name: "Jaipur",
    slug: "jaipur",
    description:
      "The Pink City enchants visitors with majestic forts, ornate palaces, and a vibrant culture that brings Rajasthan's royal heritage to life.",
  },
];
