import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faqSchema = z.array(
  z.object({
    question: z.string(),
    answer: z.string(),
  })
);

const cities = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/cities" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroImage: z.string(),
    heroAlt: z.string(),
    mapCenter: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    highlights: z.array(z.string()),
    faqs: faqSchema,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

const attractions = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/attractions" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    city: z.enum(["agra", "delhi", "jaipur"]),
    description: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroImage: z.string(),
    heroAlt: z.string(),
    gallery: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
      })
    ),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
      address: z.string(),
    }),
    visitInfo: z.object({
      entryFeeIndian: z.string(),
      entryFeeForeign: z.string(),
      timings: z.string(),
      closedOn: z.string().optional(),
      bestTimeToVisit: z.string(),
      duration: z.string(),
    }),
    tips: z.array(z.string()),
    faqs: faqSchema,
    relatedAttractions: z.array(z.string()),
    relatedTours: z.array(z.string()),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

const tours = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/tours" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroImage: z.string(),
    duration: z.string(),
    priceFrom: z.number(),
    currency: z.string().default("USD"),
    highlights: z.array(z.string()),
    itinerary: z.array(
      z.object({
        day: z.number(),
        title: z.string(),
        description: z.string(),
        locations: z.array(z.string()),
      })
    ),
    includes: z.array(z.string()),
    excludes: z.array(z.string()),
    cities: z.array(z.string()),
    category: z.enum([
      "golden-triangle",
      "day-trip",
      "multi-day",
      "transfer",
      "car-hire",
    ]),
    faqs: faqSchema,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroImage: z.string(),
    category: z.enum([
      "travel-tips",
      "how-to-reach",
      "best-time",
      "budget",
      "culture",
      "food",
    ]),
    relatedCities: z.array(z.string()),
    relatedTours: z.array(z.string()),
    author: z.string().default("Agra Tour Guides"),
    faqs: faqSchema,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = { cities, attractions, tours, guides };
