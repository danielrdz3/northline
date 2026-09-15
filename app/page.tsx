"use client";

import { useState } from "react";

const serviceBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const services = [
  { icon: "▦", slug: "managed-it-michigan", title: "Managed IT Services", copy: "Complete, proactive technology support with predictable pricing and a team that knows your business." },
  { icon: "☁", slug: "cloud-migration-michigan", title: "Cloud Migration", copy: "A clear path to the cloud, planned and managed end-to-end without disrupting your work." },
  { icon: "⌾", slug: "cybersecurity-michigan", title: "Cybersecurity", copy: "Layered protection, 24/7 monitoring, and practical guidance that keeps risk under control." },
  { icon: "◎", slug: "penetration-testing-michigan", title: "Penetration Testing", copy: "Real-world security testing that finds exploitable weaknesses and turns the results into a practical remediation plan." },
  { icon: "↻", slug: "backup-recovery-michigan", title: "Backup & Recovery", copy: "Resilient backups and rapid recovery plans designed to keep your organization moving." },
  { icon: "◉", slug: "help-desk-michigan", title: "Help Desk Support", copy: "Friendly, responsive support from experienced engineers—whenever your people need it." },
  { icon: "◖", slug: "voice-collaboration-michigan", title: "Voice & Collaboration", copy: "Modern cloud calling, meetings, and collaboration tools that connect every team." },
];

const faqs = [
  ["What should Michigan businesses look for in an IT partner?", "Look for a team that combines responsive support, proactive monitoring, strong cybersecurity, infrastructure expertise, and long-term planning. The right partner improves business outcomes—not just ticket counts."],
  ["Do you support organizations with an internal IT team?", "Yes. Our co-managed model adds specialist expertise, escalation capacity, cybersecurity coverage, and project support while your internal team stays in control."],
  ["How do you approach cybersecurity and compliance?", "We begin with risk, then build practical layers of protection around people, devices, networks, cloud services, monitoring, and policy. We also help teams prepare for common industry frameworks."],
  ["Can you help with cloud, continuity, and recovery?", "Yes. We plan cloud migrations, resilient infrastructure, backups, and recovery processes together so modernization never comes at the cost of uptime or recoverability."],
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      <header className="header">
        <a className="brand" href="#top" aria-label="Northline Technology home"><span className="brandMark">N</span><span>NORTHLINE<small>TECHNOLOGY</small></span></a>
        <button className="menuButton" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">☰</button>
        <nav className={menu ? "nav navOpen" : "nav"} aria-label="Main navigation">
          <a href="#services">IT Services</a><a href="#security">Security</a><a href="#why">Why Northline</a><a href="#insights">Insights</a>
          <a className="navCta" href="#contact">CONTACT US</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroGlow" />
        <div className="heroContent">
          <p className="eyebrow">MICHIGAN MANAGED IT SERVICES</p>
          <h1>Managed IT Services in Michigan</h1>
          <p className="heroCopy">We measure IT success by business outcomes—not technical metrics. Productive employees, reliable systems, managed risk, and confident decisions are the real scorecard.</p>
          <div className="actions"><a className="button primary" href="#contact">TALK TO AN EXPERT <b>→</b></a><a className="button ghost" href="#services">EXPLORE SERVICES</a></div>
        </div>
        <div className="heroPanel" aria-hidden="true"><div className="orb"><span>24/7</span><small>PROACTIVE<br/>PROTECTION</small></div></div>
        <div className="proofBar">
          <div><b>SECURITY FIRST</b><span>Enterprise-grade protection</span></div>
          <div><b>24/7 SUPPORT</b><span>Always here for you</span></div>
          <div><b>CLOUD READY</b><span>Infrastructure that scales</span></div>
          <div><b>STRATEGIC GUIDANCE</b><span>Decisions aligned to business</span></div>
        </div>
      </section>

      <section className="section intro" id="services">
        <div className="sectionLead"><p className="eyebrow orange">WHAT WE OFFER</p><h2>Serious technology expertise.<br/>Refreshingly simple service.</h2></div>
        <div className="introCopy"><p>From daily support to long-term technology planning, we give Michigan organizations one accountable team for the systems that matter most.</p><a href="#contact">TALK TO AN EXPERT →</a></div>
        <div className="serviceGrid">
          {services.map((s) => <article className="serviceCard" key={s.title}><span className="serviceIcon">{s.icon}</span><h3>{s.title}</h3><p>{s.copy}</p><a href={`${serviceBasePath}/${s.slug}`} aria-label={`Learn about ${s.title}`}>LEARN MORE <b>→</b></a></article>)}
        </div>
      </section>

      <section className="why" id="why">
        <div className="whyImage"><div className="experience"><strong>40+</strong><span>YEARS OF<br/>EXPERIENCE</span></div></div>
        <div className="whyContent"><p className="eyebrow orange">WHY CHOOSE US</p><h2>Your technology decisions are business decisions.</h2><p>Most providers deliver a standard stack. We start with where your business is going, then build a practical technology roadmap to support it.</p>
          <ul><li><i>✓</i><span><b>Proven solutions</b><small>Reliable tools chosen for your real-world needs</small></span></li><li><i>✓</i><span><b>Clear, accountable support</b><small>Real people, responsive service, no finger-pointing</small></span></li><li><i>✓</i><span><b>Plans shaped around you</b><small>Technology aligned to your goals and budget</small></span></li><li><i>✓</i><span><b>Built-in strategy</b><small>Senior guidance for every important decision</small></span></li></ul>
        </div>
      </section>

      <section className="numbers" id="security"><div><strong>99.9%</strong><span>CLIENT UPTIME TARGET</span></div><div><strong>&lt;15m</strong><span>PRIORITY RESPONSE GOAL</span></div><div><strong>24/7</strong><span>MONITORING & ALERTING</span></div><div><strong>1</strong><span>ACCOUNTABLE PARTNER</span></div></section>

      <section className="section testimonial"><p className="eyebrow orange">CLIENT EXPERIENCE</p><h2>Trusted by Michigan business leaders</h2><blockquote>“Northline made technology feel manageable again. Their team communicates clearly, solves problems quickly, and always connects the work back to our business.”</blockquote><p className="attribution"><b>OPERATIONS DIRECTOR</b><span>Michigan professional services firm</span></p></section>

      <section className="section insights" id="insights"><div className="sectionHeader"><div><p className="eyebrow orange">PRACTICAL INSIGHTS</p><h2>Ideas for a more resilient business</h2></div><a href="#contact">VIEW ALL ARTICLES →</a></div><div className="articleGrid">
        <article><div className="articleImage cloud"/><p>STRATEGY · 7 MIN READ</p><h3>How to build a technology roadmap people can actually use</h3><a href="#contact">READ ARTICLE →</a></article>
        <article><div className="articleImage security"/><p>SECURITY · 5 MIN READ</p><h3>Five practical ways to reduce cyber risk this quarter</h3><a href="#contact">READ ARTICLE →</a></article>
        <article><div className="articleImage hybrid"/><p>CLOUD · 6 MIN READ</p><h3>When a hybrid cloud approach makes business sense</h3><a href="#contact">READ ARTICLE →</a></article>
      </div></section>

      <section className="section faq"><div><p className="eyebrow orange">MANAGED IT FAQ</p><h2>Managed IT questions from Michigan businesses</h2><p>What leaders typically ask when comparing support models, cybersecurity, and long-term technology partners.</p></div><div className="faqList">{faqs.map(([q,a], i) => <article key={q} className={openFaq === i ? "faqItem open" : "faqItem"}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{String(i+1).padStart(2,"0")}</span><h3>{q}</h3><b>{openFaq === i ? "−" : "+"}</b></button><p>{a}</p></article>)}</div></section>

      <section className="cta" id="contact"><p className="eyebrow">GET STARTED TODAY</p><h2>Ready for technology that simply works?</h2><p>Tell us what’s getting in the way. We’ll help you find a clear, practical next step.</p><a className="button light" href="mailto:hello@northlinetechnology.com">SCHEDULE A CONVERSATION <b>→</b></a></section>

      <footer><div className="footerBrand"><a className="brand" href="#top"><span className="brandMark">N</span><span>NORTHLINE<small>TECHNOLOGY</small></span></a><p>Michigan-based managed technology services focused on clear outcomes, resilient systems, and dependable support.</p></div><div><b>SERVICES</b><a href={`${serviceBasePath}/managed-it-michigan`}>Managed IT</a><a href={`${serviceBasePath}/cybersecurity-michigan`}>Cybersecurity</a><a href={`${serviceBasePath}/penetration-testing-michigan`}>Penetration Testing</a><a href={`${serviceBasePath}/cloud-migration-michigan`}>Cloud & Infrastructure</a></div><div><b>COMPANY</b><a href="#why">Why Northline</a><a href="#insights">Insights</a><a href="#contact">Contact</a></div><div><b>CONTACT</b><a href="mailto:hello@northlinetechnology.com">hello@northlinetechnology.com</a><span>Serving businesses across Michigan</span></div><p className="copyright">© 2026 Northline Technology. All rights reserved.</p></footer>
    </main>
  );
}
