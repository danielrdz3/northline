import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { michiganCities, slugify } from "@/lib/locations";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Michigan Service Areas | Northline Technology", description: "Explore Northline’s Michigan service-area directory. Location pages are published for useful, reviewed local information.", path: "/locations/michigan/" });

export default function MichiganLocationsPage() {
  return <main><SiteHeader /><section className="serviceHero compactHero"><div className="serviceHeroInner"><div><p className="eyebrow">MICHIGAN SERVICE AREAS</p><h1>Michigan technology support, organized by location.</h1><p>Northline serves organizations across Michigan. Location pages are intentionally reviewed before they become search-indexable, so visitors receive useful local context instead of keyword variations.</p></div></div></section><section className="section locationDirectory"><div className="sectionLead"><p className="eyebrow orange">EXPLORE BY CITY</p><h2>Find your city.</h2><p>Choose a city to review the services Northline can discuss with your organization.</p></div><div className="cityGrid">{michiganCities.map((city) => <Link key={city} href={`/locations/michigan/${slugify(city)}/`}>{city}</Link>)}</div></section><SiteFooter /></main>;
}
