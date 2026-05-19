import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://agratourguides.com",
  trailingSlash: "always",

  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          fr: "fr",
          de: "de",
          zh: "zh-Hans",
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "de", "zh"],
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },

  image: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    domains: ["agratourguides.com"],
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  build: {
    inlineStylesheets: "auto",
  },

  experimental: {
    clientPrerender: true,
  },
});
