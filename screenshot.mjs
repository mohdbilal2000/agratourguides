import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:4321/";
const out = process.argv[3] || "/tmp/shot.png";
const mode = process.argv[4] || "desktop";
const scrollY = parseInt(process.argv[5] || "0", 10);

let viewport, ua, isMobile = false;
if (mode === "mobile") {
  viewport = { width: 390, height: 844 };
  isMobile = true;
  ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
} else if (mode === "desktop-tall") {
  viewport = { width: 1440, height: 1200 };
  ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
} else {
  viewport = { width: 1440, height: 900 };
  ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2, reducedMotion: "no-preference", isMobile, hasTouch: isMobile, userAgent: ua });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
if (scrollY) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
}
await page.waitForTimeout(2500);
await page.screenshot({ path: out });
await browser.close();
console.log("Saved", out);
