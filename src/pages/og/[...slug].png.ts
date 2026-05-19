import type { APIRoute, GetStaticPaths } from "astro";
import satori from "satori";
import sharp from "sharp";
import { getCollection } from "astro:content";
import { OG_FONTS } from "../../lib/og-fonts";
import { SITE_NAME, REVIEW_COUNT } from "../../lib/constants";

interface OgVariant {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export const getStaticPaths = (async () => {
  const cities = await getCollection("cities");
  const attractions = await getCollection("attractions");
  const tours = await getCollection("tours");
  const guides = await getCollection("guides");

  const variants: OgVariant[] = [
    {
      slug: "home",
      eyebrow: "Agra Tour Guides",
      title: "Private Taj Mahal tours, by the people who grew up there.",
      subtitle: `5.0/5 · ${REVIEW_COUNT}+ verified reviews · Govt-licensed guides`,
    },
    {
      slug: "tours",
      eyebrow: "Tours",
      title: "Editorial-paced Golden Triangle itineraries.",
      subtitle: "Same-day Agra · Golden Triangle 3 & 5 days · Jaipur day tour",
    },
    {
      slug: "services",
      eyebrow: "Services",
      title: "Guide-only, guide + cab, or fully planned.",
      subtitle: "Transparent USD/EUR/INR pricing · Cash or UPI · No commission",
    },
    {
      slug: "car-hire",
      eyebrow: "Car hire",
      title: "Chauffeur-driven cars across the Golden Triangle.",
      subtitle: "Sedan $49/day · SUV $75 · All toll, parking, fuel included · Govt-licensed drivers",
    },
    {
      slug: "reviews",
      eyebrow: "Reviews",
      title: `${REVIEW_COUNT}+ travellers across 30+ countries.`,
      subtitle: "Verified on Google Business · 5.0/5 aggregate",
    },
    {
      slug: "about",
      eyebrow: "About",
      title: "Born in Tajganj. Licensed by the Government of India.",
      subtitle: "English, Hindi, Japanese — plus partner guides in 9 more languages",
    },
    {
      slug: "contact",
      eyebrow: "Contact",
      title: "WhatsApp us — quote in 2 hours.",
      subtitle: "Working hours 06:00–22:00 IST · 7 days a week",
    },
    {
      slug: "faq",
      eyebrow: "FAQ",
      title: "The questions foreigners actually ask.",
      subtitle: "Pricing, scams, security, dress code, Friday closure",
    },
  ];

  cities.forEach((c) =>
    variants.push({
      slug: c.data.slug,
      eyebrow: "Destination",
      title: c.data.title,
      subtitle: c.data.description.slice(0, 110) + (c.data.description.length > 110 ? "…" : ""),
    }),
  );

  attractions.forEach((a) =>
    variants.push({
      slug: `${a.data.city}-${a.data.slug}`,
      eyebrow: a.data.city,
      title: a.data.title,
      subtitle: a.data.description.slice(0, 110) + (a.data.description.length > 110 ? "…" : ""),
    }),
  );

  tours.forEach((t) =>
    variants.push({
      slug: `tours-${t.data.slug}`,
      eyebrow: `Tour · ${t.data.duration}`,
      title: t.data.title,
      subtitle: `From ${t.data.currency === "USD" ? "$" : ""}${t.data.priceFrom} · ${t.data.description.slice(0, 90)}…`,
    }),
  );

  guides.forEach((g) =>
    variants.push({
      slug: `guides-${g.data.slug}`,
      eyebrow: g.data.category.replace(/-/g, " "),
      title: g.data.title,
      subtitle: g.data.description.slice(0, 110) + (g.data.description.length > 110 ? "…" : ""),
    }),
  );

  return variants.map((v) => ({
    params: { slug: v.slug },
    props: v,
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<OgVariant> = async ({ props }) => {
  const { eyebrow, title, subtitle } = props;

  // ── Render as flexbox HTML/JSX-ish, then satori → SVG → sharp → PNG.
  // Sandstone-50 base with a warm gold rule + Fraunces editorial display.
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FAF7F2",
          backgroundImage:
            "radial-gradient(circle at 92% 8%, rgba(217, 119, 6, 0.10) 0%, rgba(217, 119, 6, 0) 50%), radial-gradient(circle at 5% 95%, rgba(217, 119, 6, 0.07) 0%, rgba(217, 119, 6, 0) 50%)",
          padding: 80,
          fontFamily: "Inter",
          color: "#181612",
        },
        children: [
          // Top bar: brand + verified pill
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      fontSize: 22,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      color: "#181612",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            width: 14,
                            height: 14,
                            background: "#9F7929",
                            borderRadius: 999,
                            marginRight: 14,
                          },
                        },
                      },
                      SITE_NAME,
                    ],
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 18px",
                      borderRadius: 999,
                      border: "1px solid #D6D2C9",
                      background: "rgba(255, 255, 255, 0.6)",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#38352F",
                    },
                    children: [
                    {
                      type: "svg",
                      props: {
                        width: 16,
                        height: 16,
                        viewBox: "0 0 24 24",
                        fill: "#9F7929",
                        style: { marginRight: 8 },
                        children: [
                          {
                            type: "path",
                            props: {
                              d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
                            },
                          },
                        ],
                      },
                    },
                    "5.0 · Govt-licensed",
                  ],
                  },
                },
              ],
            },
          },
          // Spacer
          { type: "div", props: { style: { flexGrow: 1 } } },
          // Eyebrow
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#7E5E1F",
                marginBottom: 20,
              },
              children: eyebrow,
            },
          },
          // Title — Fraunces display
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontFamily: "Fraunces",
                fontWeight: 600,
                fontSize: 82,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "#181612",
                maxWidth: 1040,
              },
              children: title,
            },
          },
          // Subtitle (optional)
          subtitle && {
            type: "div",
            props: {
              style: {
                display: "flex",
                marginTop: 28,
                fontSize: 26,
                lineHeight: 1.4,
                color: "#5C5C56",
                maxWidth: 920,
                fontFamily: "Inter",
              },
              children: subtitle,
            },
          },
          // Spacer
          { type: "div", props: { style: { flexGrow: 1 } } },
          // Bottom rule + url
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid #D6D2C9",
                paddingTop: 24,
                fontSize: 18,
                color: "#787872",
              },
              children: [
                "agratourguides.com",
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      fontFamily: "Fraunces",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "#38352F",
                    },
                    children: "Heritage, culture, experience.",
                  },
                },
              ],
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: OG_FONTS,
    },
  );

  const png = await sharp(Buffer.from(svg)).png({ quality: 92 }).toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
