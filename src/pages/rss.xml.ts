import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "../lib/constants";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

export const GET: APIRoute = async () => {
  const guides = await getCollection("guides");

  const items = guides
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
    .map((guide) => {
      const url = `${SITE_URL}/guides/${guide.data.slug}/`;
      return `    <item>
      <title>${escapeXml(guide.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(guide.data.description)}</description>
      <pubDate>${guide.data.publishedAt.toUTCString()}</pubDate>
      <author>info@agratourguides.com (${escapeXml(guide.data.author)})</author>
      <category>${escapeXml(guide.data.category)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Travel Guides</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-IN</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
