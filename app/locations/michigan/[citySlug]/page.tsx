import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingLink } from "@/components/ConversionPanel";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { locationServices } from "@/lib/location-services";
import { locationContent } from "@/lib/location-content";
import { michiganCities, slugify } from "@/lib/locations";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() { return michiganCities.map((city) => ({ citySlug: slugify(city) })); }

export async function generateMetadata({ params }: { params: Promise<{ citySlug: string }> }): Promise<Metadata> {
  const { citySlug } = await params;
  const location = locationContent.get(citySlug);
  if (!location) return {};
  const path = `/locations/michigan/${citySlug}/`;
  return pageMetadata({ title: `IT Services in ${location.city}, Michigan | Northline Technology`, description: location.summary, path, noIndex: !location.indexable });
}

export default async function CityPage({ params }: { params: Promise<{ citySlug: string }> }) {
  const { citySlug } = await params;
  const location = locationContent.get(citySlug);
  if (!location) notFound();
  const path = `/locations/michigan/${citySlug}/`;
  const data = { "@context": "https://schema.org", "@graph": [{ "@type": "Service", name: `IT Services in ${location.city}, Michigan`, description: location.summary, url: `${siteConfig.url}${path}`, areaServed: { "@type": "City", name: location.city, containedInPlace: { "@type": "State", name: "Michigan" } }, provider: { "@id": `${siteConfig.url}/#organization` } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url }, { "@type": "ListItem", position: 2, name: "Michigan service areas", item: `${siteConfig.url}/locations/michigan/` }, { "@type": "ListItem", position: 3, name: location.city, item: `${siteConfig.url}${path}` }] }] };
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} /><SiteHeader /><section className="serviceHero compactHero"><div className="serviceHeroInner"><div><p className="eyebrow">{location.city.toUpperCase()} · MICHIGAN</p><h1>Technology support for {location.city} organizations.</h1><p>{location.summary}</p><BookingLink label="BOOK A CONVERSATION" /></div></div></section><section className="section"><div className="sectionLead"><p className="eyebrow orange">HOW NORTHLINE CAN HELP</p><h2>Services to discuss with your organization.</h2></div><div className="serviceGrid">{locationServices.map((service) => <article className="serviceCard" key={service.slug}><h3>{service.name}</h3><p>{service.intro}</p><Link href={`/services/${service.slug}/`}>EXPLORE SERVICE →</Link></article>)}</div></section><section className="section serviceFaq"><div><p className="eyebrow orange">COMMON QUESTIONS</p><h2>{location.city} service-area information.</h2></div><div>{location.faq.map((faq) => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></section><section className="cta"><p className="eyebrow">START WITH CONTEXT</p><h2>Talk through your priorities.</h2><p>We’ll help clarify service fit, timing, and the next practical step.</p><BookingLink className="button light" label="BOOK A CONVERSATION" /></section><SiteFooter /></main>;
}
