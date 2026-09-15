import type { MetadataRoute } from 'next';
import { locationServices } from "@/lib/location-services";
import { michiganCities, slugify } from "@/lib/locations";

export const dynamic = "force-static";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northline-technology-mi.d1rk-digglers.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'monthly' as const },
    ...locationServices.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),
    ...locationServices.map((service) => ({
      url: `${baseUrl}/${service.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    ...locationServices.flatMap((service) =>
      michiganCities.map((city) => ({
        url: `${baseUrl}/${service.slug}/${service.slug.replace(/-michigan$/, "")}-${slugify(city)}-michigan`,
        priority: 0.7,
        changeFrequency: 'monthly' as const,
      })),
    ),
  ];
  return pages;
}
