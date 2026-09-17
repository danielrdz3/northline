import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { insights } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Technology Insights | Northline Technology", description: "Practical guidance for managed IT, co-managed IT, cybersecurity, and consequential technology decisions.", path: "/insights/" });

export default function InsightsPage() { return <main><SiteHeader /><section className="serviceHero compactHero"><div className="serviceHeroInner"><div><p className="eyebrow">PRACTICAL INSIGHTS</p><h1>Useful guidance for technology decisions.</h1><p>Clear, buyer-focused explanations of managed IT, co-managed support, cybersecurity, and the questions worth asking before you commit.</p></div></div></section><section className="section"><div className="articleGrid">{insights.map((insight) => <article key={insight.slug}><p>{insight.category.toUpperCase()} · {new Date(insight.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p><h2>{insight.title}</h2><p className="articleCopy">{insight.description}</p><Link href={`/insights/${insight.slug}/`}>READ INSIGHT →</Link></article>)}</div></section><SiteFooter /></main>; }
