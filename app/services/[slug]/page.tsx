import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Service = {
  name: string; short: string; icon: string; headline: string; intro: string;
  image: string; benefits: string[]; features: { title: string; copy: string }[];
  process: { title: string; copy: string }[]; faq: { q: string; a: string }[];
};

const services: Record<string, Service> = {
  "managed-it-michigan": {
    name: "Managed IT Services", short: "Managed IT", icon: "▦", headline: "Managed IT Services in Michigan",
    intro: "Get a responsive support team, proactive monitoring, stronger security, and a practical technology roadmap—all through one accountable partner.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Predictable monthly IT costs", "Fewer disruptions and faster resolution", "Proactive maintenance and monitoring", "Senior technology guidance included"],
    features: [{title:"Complete day-to-day support",copy:"Friendly remote and onsite help for users, devices, applications, networks, and vendors."},{title:"Proactive operations",copy:"Continuous monitoring, patching, maintenance, and documentation to catch issues earlier."},{title:"Technology strategy",copy:"A clear roadmap, budget guidance, and regular reviews aligned to your priorities."},{title:"Co-managed IT",copy:"Extra capacity and specialist expertise for organizations with an internal IT team."}],
    process: [{title:"Understand",copy:"We learn your goals, systems, pain points, and risk profile."},{title:"Stabilize",copy:"We document, secure, standardize, and resolve immediate priorities."},{title:"Improve",copy:"We execute a practical roadmap and measure progress over time."}],
    faq: [{q:"Can you support multiple Michigan locations?",a:"Yes. We support distributed teams and multi-site environments with centralized standards, monitoring, and support."},{q:"Do you offer both fully managed and co-managed IT?",a:"Yes. We can own the complete IT function or complement your internal team with tools, specialists, and escalation support."}]
  },
  "cloud-migration-michigan": {
    name: "Cloud Migration Services", short: "Cloud Migration", icon: "☁", headline: "Cloud Migration Services in Michigan",
    intro: "Modernize applications, collaboration, storage, and infrastructure with a migration plan designed around uptime, security, cost, and your people.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
    benefits: ["A business-led migration plan", "Minimal operational disruption", "Right-sized cloud architecture", "Ongoing cost and security oversight"],
    features: [{title:"Cloud readiness assessment",copy:"We map applications, dependencies, costs, and risks before recommending a destination."},{title:"Microsoft 365 & Azure",copy:"Secure productivity, identity, infrastructure, and data services designed for your team."},{title:"Hybrid cloud",copy:"Connect onsite systems and cloud platforms without sacrificing performance or control."},{title:"Migration execution",copy:"Planning, testing, cutover, validation, and user support managed from beginning to end."}],
    process: [{title:"Assess",copy:"Inventory workloads and define business, security, and continuity requirements."},{title:"Design",copy:"Create the target architecture, migration waves, testing, and rollback plan."},{title:"Migrate",copy:"Move carefully, validate results, train users, and optimize the new environment."}],
    faq: [{q:"Does everything have to move to the cloud?",a:"No. We recommend cloud, onsite, or hybrid options based on the workload—not a one-size-fits-all agenda."},{q:"How do you minimize downtime?",a:"We use dependency mapping, staged migrations, testing, planned cutovers, and rollback procedures."}]
  },
  "cybersecurity-michigan": {
    name: "Cybersecurity Services", short: "Cybersecurity", icon: "⌾", headline: "Cybersecurity Services in Michigan",
    intro: "Reduce risk with layered protection, continuous monitoring, clear policies, and expert guidance that fits how your organization actually works.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1400&q=85",
    benefits: ["24/7 threat monitoring", "Stronger identity and device security", "Actionable risk reporting", "Compliance-ready controls"],
    features: [{title:"Managed detection & response",copy:"Continuous monitoring and expert response across endpoints, identities, and networks."},{title:"Email & identity protection",copy:"Multi-factor authentication, anti-phishing, access controls, and awareness training."},{title:"Security assessments",copy:"Clear visibility into vulnerabilities, gaps, priorities, and measurable next steps."},{title:"Compliance support",copy:"Practical alignment with requirements such as CMMC, NIST, HIPAA, PCI, and SOC 2."}],
    process: [{title:"Discover",copy:"Identify critical assets, threats, obligations, and current control gaps."},{title:"Protect",copy:"Implement layered controls around people, devices, data, cloud, and networks."},{title:"Monitor",copy:"Watch continuously, respond quickly, and improve based on evolving risk."}],
    faq: [{q:"Can you work with our existing security tools?",a:"Yes. We evaluate what is already effective, address gaps, and avoid unnecessary replacement."},{q:"Do you provide cybersecurity for regulated industries?",a:"Yes. We help organizations translate common frameworks and contractual requirements into practical controls."}]
  },
  "backup-recovery-michigan": {
    name: "Backup and Recovery Services", short: "Backup & Recovery", icon: "↻", headline: "Backup and Recovery Services in Michigan",
    intro: "Protect critical data and keep operations moving with secure backups, tested recovery, and continuity planning designed around your real tolerance for downtime.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Protected onsite and cloud data", "Fast, documented recovery", "Immutable backup options", "Regular testing and reporting"],
    features: [{title:"Managed backup",copy:"Automated, monitored backups for servers, workstations, cloud apps, and Microsoft 365."},{title:"Disaster recovery",copy:"Recovery environments and procedures designed around your required recovery time."},{title:"Business continuity",copy:"Plans for keeping essential work moving during outages, incidents, and disruptions."},{title:"Recovery testing",copy:"Scheduled validation proves backups are usable before an emergency occurs."}],
    process: [{title:"Prioritize",copy:"Define critical systems, dependencies, recovery time, and data-loss tolerance."},{title:"Protect",copy:"Implement monitored, isolated, and appropriately retained backup copies."},{title:"Prove",copy:"Test recovery, document procedures, and close issues found along the way."}],
    faq: [{q:"Do cloud applications still need backup?",a:"Yes. Cloud platforms provide availability, but retention gaps, deletion, ransomware, and configuration mistakes can still put data at risk."},{q:"How often should recovery be tested?",a:"The schedule should reflect business criticality, but every important system should be tested regularly and after material changes."}]
  },
  "help-desk-michigan": {
    name: "IT Help Desk Services", short: "Help Desk", icon: "◉", headline: "IT Help Desk Services in Michigan",
    intro: "Give employees a dependable place to get help, backed by experienced technicians, clear communication, and escalation that does not leave people guessing.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Fast, friendly user support", "Clear escalation and ownership", "Remote and onsite options", "Useful reporting and trend analysis"],
    features: [{title:"Unlimited remote support",copy:"Day-to-day help for devices, accounts, applications, connectivity, and common user issues."},{title:"Onsite assistance",copy:"Local Michigan support when physical presence or hands-on troubleshooting is needed."},{title:"User onboarding",copy:"Consistent setup, access, security, and offboarding processes for every employee."},{title:"Vendor coordination",copy:"One team coordinates internet, software, hardware, and third-party providers on your behalf."}],
    process: [{title:"Connect",copy:"Users reach the team through clear, convenient support channels."},{title:"Resolve",copy:"Issues are triaged, owned, communicated, and escalated based on impact."},{title:"Prevent",copy:"Recurring patterns inform documentation, automation, training, and fixes."}],
    faq: [{q:"Can remote employees use the help desk?",a:"Yes. We support users wherever they work and coordinate local assistance when required."},{q:"Can you support specialized business applications?",a:"We document them, handle common issues, and work directly with the software vendor when deeper support is needed."}]
  },
  "voice-collaboration-michigan": {
    name: "Business Voice and Collaboration Services", short: "Voice & Collaboration", icon: "◖", headline: "Business Voice and Collaboration Services in Michigan",
    intro: "Bring calling, messaging, meetings, and contact-center workflows together in a reliable platform that is easy for employees and customers to use.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85",
    benefits: ["Reliable cloud calling", "Microsoft Teams integration", "Simple multi-site management", "Better customer call experiences"],
    features: [{title:"Cloud phone systems",copy:"Flexible calling, voicemail, routing, mobile apps, analytics, recording, and administration."},{title:"Microsoft Teams Phone",copy:"Turn Teams into a complete business phone system with planning, migration, and support."},{title:"Contact center",copy:"Queues, reporting, routing, quality tools, and integrations for customer-facing teams."},{title:"Network readiness",copy:"Connectivity, quality-of-service, failover, and monitoring that protect call quality."}],
    process: [{title:"Plan",copy:"Map users, numbers, call flows, integrations, locations, and service requirements."},{title:"Launch",copy:"Configure, port, test, train, and transition users with minimal disruption."},{title:"Optimize",copy:"Review quality, usage, routing, and reporting to keep improving the experience."}],
    faq: [{q:"Can we keep our existing phone numbers?",a:"In most cases, yes. We manage number porting and coordinate timing to minimize disruption."},{q:"Do you support Microsoft Teams calling?",a:"Yes. We design, implement, and support Teams Phone alongside the network and security it depends on."}]
  }
};

export function generateStaticParams() { return Object.keys(services).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = services[slug];
  if (!service) return {};
  return { title: `${service.headline} | Northline Technology`, description: service.intro, alternates: { canonical: `/services/${slug}` }, openGraph: { title: `${service.headline} | Northline Technology`, description: service.intro, url: `/services/${slug}`, type: "website", images: ["/og.png"] }, twitter: { card: "summary_large_image", title: `${service.headline} | Northline Technology`, description: service.intro, images: ["/og.png"] } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services[slug]; if (!service) notFound();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northline-technology-mi.d1rk-digglers.chatgpt.site";
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Service", name: service.headline, description: service.intro, areaServed: { "@type": "State", name: "Michigan" }, provider: { "@type": "Organization", name: "Northline Technology", url: siteUrl }, url: `${siteUrl}/services/${slug}` }, { "@type": "FAQPage", mainEntity: service.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }] };
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <header className="header"><a className="brand" href="/" aria-label="Northline Technology home"><span className="brandMark">N</span><span>NORTHLINE<small>TECHNOLOGY</small></span></a><nav className="nav serviceNav" aria-label="Main navigation"><a href="/#services">ALL SERVICES</a><a href="/#why">WHY NORTHLINE</a><a className="navCta" href="#contact">CONTACT US</a></nav></header>
    <section className="serviceHero"><div className="serviceHeroInner"><div><p className="eyebrow">{service.short.toUpperCase()} · MICHIGAN</p><h1>{service.headline}</h1><p>{service.intro}</p><a className="button primary" href="#contact">TALK TO AN EXPERT <b>→</b></a></div><div className="servicePhoto" style={{backgroundImage:`linear-gradient(#071a2f18,#071a2f44),url('${service.image}')`}}><span>{service.icon}</span></div></div></section>
    <section className="serviceBenefits"><div><p className="eyebrow orange">THE OUTCOME</p><h2>Technology that supports the way you work.</h2></div><ul>{service.benefits.map((b)=><li key={b}><i>✓</i>{b}</li>)}</ul></section>
    <section className="section serviceDetails"><div className="sectionLead"><p className="eyebrow orange">WHAT’S INCLUDED</p><h2>A complete approach to {service.short.toLowerCase()}.</h2></div><div className="featureGrid">{service.features.map((f,i)=><article key={f.title}><span>0{i+1}</span><h3>{f.title}</h3><p>{f.copy}</p></article>)}</div></section>
    <section className="serviceProcess"><div><p className="eyebrow orange">HOW WE WORK</p><h2>A clear path from today’s challenges to tomorrow’s goals.</h2></div><ol>{service.process.map((p,i)=><li key={p.title}><span>{i+1}</span><div><h3>{p.title}</h3><p>{p.copy}</p></div></li>)}</ol></section>
    <section className="section serviceFaq"><div><p className="eyebrow orange">COMMON QUESTIONS</p><h2>Michigan {service.short.toLowerCase()} answers.</h2></div><div>{service.faq.map((f)=><article key={f.q}><h3>{f.q}</h3><p>{f.a}</p></article>)}</div></section>
    <section className="cta" id="contact"><p className="eyebrow">LET’S TALK</p><h2>Make your next technology decision with confidence.</h2><p>Tell us what you are working through. We’ll help identify a clear, practical next step.</p><a className="button light" href="mailto:hello@northlinetechnology.com">SCHEDULE A CONVERSATION <b>→</b></a></section>
    <footer><div className="footerBrand"><a className="brand" href="/"><span className="brandMark">N</span><span>NORTHLINE<small>TECHNOLOGY</small></span></a><p>Michigan-based managed technology services focused on clear outcomes, resilient systems, and dependable support.</p></div><div><b>SERVICES</b><a href="/services/managed-it-michigan">Managed IT</a><a href="/services/cybersecurity-michigan">Cybersecurity</a><a href="/services/cloud-migration-michigan">Cloud Migration</a><a href="/services/backup-recovery-michigan">Backup & Recovery</a></div><div><b>MORE SERVICES</b><a href="/services/help-desk-michigan">Help Desk</a><a href="/services/voice-collaboration-michigan">Voice & Collaboration</a><a href="/">Home</a></div><div><b>CONTACT</b><a href="mailto:hello@northlinetechnology.com">hello@northlinetechnology.com</a><span>Serving businesses across Michigan</span></div><p className="copyright">© 2026 Northline Technology. All rights reserved.</p></footer>
  </main>;
}
