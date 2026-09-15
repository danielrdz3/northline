import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northline-technology-mi.d1rk-digglers.chatgpt.site";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
