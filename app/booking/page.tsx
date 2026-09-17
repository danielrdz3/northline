import type { Metadata } from "next";
import { BookingLink, LeadForm } from "@/components/ConversionPanel";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({ title: "Book a Conversation | Northline Technology", description: "Schedule a conversation with Northline Technology or share your priorities through the contact form.", path: "/booking/" });
export default function BookingPage() { return <main><SiteHeader /><section className="section bookingPage"><p className="eyebrow orange">START A CONVERSATION</p><h1>Bring the situation you are working through.</h1><p className="articleIntro">Choose a time to talk or send a short note. The goal is to clarify the right next step—not force a pre-set package.</p><div className="bookingGrid"><section><h2>Book a conversation</h2><p>Choose a time that works for you. You can share your priorities, current environment, and timing when you book.</p>{siteConfig.calcomUrl ? <BookingLink label="OPEN CALENDAR" /> : <p className="formFallback">The scheduling link will be available once Cal.com is connected. In the meantime, <a href={`mailto:${siteConfig.email}`}>email Northline</a>.</p>}</section><section><h2>Send a note</h2><LeadForm /></section></div></section><SiteFooter /></main>; }
