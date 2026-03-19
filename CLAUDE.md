# Agra Tour Guides - Project Conventions

## Tech Stack
- Astro 5 (SSG, content-focused)
- TypeScript strict mode
- Tailwind CSS v4 (via Vite plugin, NOT @astrojs/tailwind)
- shadcn/ui (React components via Astro islands)
- Motion (Framer Motion) for animations
- MDX for content pages
- Leaflet for maps

## Directory Structure
- `src/components/` — Astro (.astro) and React (.tsx) components
  - `brand/` — Logo, brand elements
  - `layout/` — Header, Footer, Breadcrumbs
  - `seo/` — SEOHead, JsonLd
  - `sections/` — Page sections (Hero, Features, CTA, etc.)
  - `cards/` — Card components (Attraction, Tour, Guide)
  - `ui/` — Small reusable UI elements
  - `react/` — React islands (interactive components)
- `src/layouts/` — BaseLayout, PageLayout
- `src/pages/` — Astro page routes
- `src/content/` — MDX content collections (cities, attractions, tours, guides)
- `src/lib/` — Utilities (schema.ts, i18n, helpers)
- `src/styles/` — Global CSS, design tokens
- `src/i18n/` — Translation files
- `public/` — Static assets

## Key Rules
- Use Tailwind utility classes; never inline styles
- shadcn/ui components MUST be composed in .tsx files (React context doesn't bridge Astro islands)
- Use `client:visible` for below-fold interactive components, `client:load` only for critical above-fold
- All images via Astro `<Image />` with explicit width/height
- Every content page needs: SEOHead, Breadcrumbs, FAQs, CTA, JSON-LD
- Content follows AEO/GEO: question-first headings, stats with citations, 5+ FAQs
- Self-host fonts via @fontsource (not Google Fonts CDN)

## Commands
- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm preview` — Preview production build
