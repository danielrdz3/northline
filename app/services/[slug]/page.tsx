import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { locationServices, serviceBySlug } from "@/lib/location-services";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() { return locationServices.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug.get(slug);
  if (!service) return {};
  const title = `${service.name} in Michigan | Northline Technology`;
  const path = `/services/${service.slug}/`;
  return { title, description: service.intro, alternates: { canonical: path }, openGraph: { title, description: service.intro, url: path, type: "website", images: ["/og.png"] }, twitter: { card: "summary_large_image", title, description: service.intro, images: ["/og.png"] } };
}

export default async function ServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug.get(slug);
  if (!service) notFound();
  const path = `/services/${service.slug}/`;
  const data = { "@context": "https://schema.org", "@graph": [{ "@type": "Service", "@id": `${siteConfig.url}${path}#service`, name: `${service.name} in Michigan`, description: service.intro, url: `${siteConfig.url}${path}`, areaServed: { "@type": "State", name: "Michigan" }, provider: { "@id": `${siteConfig.url}/#organization` } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services/` }, { "@type": "ListItem", position: 3, name: service.short, item: `${siteConfig.url}${path}` }] }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} /><ServicePage service={service} /></>;
}
