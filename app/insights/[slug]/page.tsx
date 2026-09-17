import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingLink } from "@/components/ConversionPanel";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { insightBySlug, insights } from "@/lib/insights";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() { return insights.map((insight) => ({ slug: insight.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const insight = insightBySlug.get(slug); if (!insight) return {}; const path = `/insights/${insight.slug}/`; return { title: `${insight.title} | Northline Technology`, description: insight.description, alternates: { canonical: path }, openGraph: { title: insight.title, description: insight.description, url: path, type: "article", images: ["/og.png"] } }; }
export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const insight = insightBySlug.get(slug); if (!insight) notFound(); const path = `/insights/${insight.slug}/`; const data = { "@context": "https://schema.org", "@type": "Article", headline: insight.title, description: insight.description, datePublished: insight.publishedAt, dateModified: insight.publishedAt, mainEntityOfPage: `${siteConfig.url}${path}`, author: { "@id": `${siteConfig.url}/#organization` }, publisher: { "@id": `${siteConfig.url}/#organization` } }; return <main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} /><SiteHeader /><article className="articlePage section"><p className="eyebrow orange">{insight.category.toUpperCase()}</p><h1>{insight.title}</h1><p className="articleIntro">{insight.description}</p>{insight.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<div className="articleAction"><h2>Need to talk through your situation?</h2><BookingLink label="BOOK A CONVERSATION" /></div><Link href="/insights/">← BACK TO INSIGHTS</Link></article><SiteFooter /></main>; }
