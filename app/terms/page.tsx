import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata({ title: "Terms | Northline Technology", description: "Review the current terms information and production-readiness notice for the Northline Technology website.", path: "/terms/", noIndex: true });
export default function TermsPage() { return <main><SiteHeader /><article className="section articlePage"><p className="eyebrow orange">TERMS</p><h1>Terms information</h1><p className="articleIntro">This page is a production-readiness placeholder. It must be replaced with organization-approved terms before the site accepts commercial inquiries in production.</p></article><SiteFooter /></main>; }
