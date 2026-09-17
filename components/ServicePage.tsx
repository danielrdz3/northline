import Link from "next/link";
import Image from "next/image";
import { BookingLink } from "@/components/ConversionPanel";
import { SiteFooter, SiteHeader } from "@/components/SiteShell";
import type { LocationService } from "@/lib/location-services";

export function ServicePage({ service }: { service: LocationService }) {
  return <main><SiteHeader />
    <section className="serviceHero"><div className="serviceHeroInner"><div><p className="eyebrow">{service.short.toUpperCase()} · MICHIGAN</p><h1>{service.name} in Michigan</h1><p>{service.intro}</p><BookingLink label="BOOK A CONVERSATION" /></div><div className="servicePhoto"><Image src="/service-hero.webp" alt="" fill priority sizes="(max-width: 900px) 100vw, 46vw" /><span aria-hidden="true">{service.icon}</span></div></div></section>
    <section className="serviceBenefits"><div><p className="eyebrow orange">THE OUTCOME</p><h2>Technology that supports the way you work.</h2></div><ul>{service.benefits.map((benefit) => <li key={benefit}><i>✓</i>{benefit}</li>)}</ul></section>
    <section className="section serviceDetails"><div className="sectionLead"><p className="eyebrow orange">WHAT’S INCLUDED</p><h2>A complete approach to {service.short.toLowerCase()}.</h2></div><div className="featureGrid">{service.features.map((feature, index) => <article key={feature.title}><span>0{index + 1}</span><h3>{feature.title}</h3><p>{feature.copy}</p></article>)}</div></section>
    <section className="serviceProcess"><div><p className="eyebrow orange">HOW WE WORK</p><h2>A clear path from today’s challenges to tomorrow’s goals.</h2></div><ol>{service.process.map((step, index) => <li key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol></section>
    <section className="section serviceFaq"><div><p className="eyebrow orange">NEXT STEP</p><h2>Talk through the situation you are facing.</h2></div><div><article><h3>What should we bring to the first conversation?</h3><p>Share the priorities, systems, recurring issues, risks, and timing that matter most. Northline will help clarify whether this service is the right fit and what should happen next.</p></article><article><h3>Do you support organizations across Michigan?</h3><p>Northline evaluates each engagement around the organization’s needs and operating model. Explore the Michigan service-area directory for location information that has been reviewed for publication.</p><Link href="/locations/michigan/">EXPLORE SERVICE AREAS →</Link></article></div></section>
    <section className="cta"><p className="eyebrow">LET’S TALK</p><h2>Make your next technology decision with confidence.</h2><p>Tell us what you are working through. We’ll help identify a clear, practical next step.</p><BookingLink className="button light" label="BOOK A CONVERSATION" /></section>
    <SiteFooter />
  </main>;
}
