export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northline-technology-mi.d1rk-digglers.chatgpt.site";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/page-sitemap.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
