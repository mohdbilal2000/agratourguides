/**
 * Font buffers for satori-based OG image generation.
 * Static-weight WOFF files are required by satori (variable WOFF2 is unsupported).
 * These imports resolve at build time only — they never ship to the browser.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

// createRequire resolves packages from project root regardless of where Astro
// places the bundled endpoint script at build time.
const require = createRequire(import.meta.url);

function loadFont(specifier: string): Buffer {
  return readFileSync(require.resolve(specifier));
}

export const OG_FONTS = [
  {
    name: "Fraunces",
    data: loadFont("@fontsource/fraunces/files/fraunces-latin-600-normal.woff"),
    weight: 600 as const,
    style: "normal" as const,
  },
  {
    name: "Fraunces",
    data: loadFont("@fontsource/fraunces/files/fraunces-latin-400-italic.woff"),
    weight: 400 as const,
    style: "italic" as const,
  },
  {
    name: "Inter",
    data: loadFont("@fontsource/inter/files/inter-latin-400-normal.woff"),
    weight: 400 as const,
    style: "normal" as const,
  },
  {
    name: "Inter",
    data: loadFont("@fontsource/inter/files/inter-latin-600-normal.woff"),
    weight: 600 as const,
    style: "normal" as const,
  },
];
