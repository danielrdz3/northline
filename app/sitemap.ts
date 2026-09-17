import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights";
import { indexableLocations } from "@/lib/location-content";
import { locationServices } from "@/lib/location-services";
import { siteConfig } from "@/lib/site-config";
import { slugify } from "@/lib/locations";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: `${base}/`, priority: 1, changeFrequency: "monthly" },
    { url: `${base}/services/managed-it-michigan/`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/services/co-managed-it-michigan/`, priority: 0.85, changeFrequency: "monthly" },
    ...locationServices.filter((service) => !["managed-it-michigan", "co-managed-it-michigan"].includes(service.slug)).map((service) => ({ url: `${base}/services/${service.slug}/`, priority: 0.8, changeFrequency: "monthly" as const })),
    { url: `${base}/locations/michigan/`, priority: 0.7, changeFrequency: "monthly" },
    ...indexableLocations().map((location) => ({ url: `${base}/locations/michigan/${slugify(location.city)}/`, priority: 0.65, changeFrequency: "monthly" as const })),
    { url: `${base}/insights/`, priority: 0.7, changeFrequency: "weekly" },
    ...insights.map((insight) => ({ url: `${base}/insights/${insight.slug}/`, priority: 0.65, changeFrequency: "monthly" as const })),
    { url: `${base}/about/`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${base}/booking/`, priority: 0.5, changeFrequency: "monthly" },
  ];
}
