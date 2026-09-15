import { locationServices } from "@/lib/location-services";
import { michiganCities, slugify } from "@/lib/locations";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northline-technology-mi.d1rk-digglers.chatgpt.site";

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

export function GET() {
  const pages = [
    { url: baseUrl, priority: "1.0" },
    ...locationServices.map((service) => ({
      url: `${baseUrl}/${service.slug}`,
      priority: "0.8",
    })),
    ...locationServices.flatMap((service) =>
      michiganCities.map((city) => ({
        url: `${baseUrl}/${service.slug}/${service.slug.replace(/-michigan$/, "")}-${slugify(city)}-michigan/`,
        priority: "0.7",
      })),
    ),
  ];

  const urls = pages
    .map(
      ({ url, priority }) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
