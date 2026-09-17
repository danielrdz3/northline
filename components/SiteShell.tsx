import Link from "next/link";
import { locationServices } from "@/lib/location-services";
import { siteConfig } from "@/lib/site-config";
import { BookingLink, ChatLauncher } from "@/components/ConversionPanel";

export function SiteHeader() {
  return <header className="header">
    <Link className="brand" href="/" aria-label="Northline Technology home"><span className="brandMark">N</span><span>NORTHLINE<small>TECHNOLOGY</small></span></Link>
    <nav className="nav serviceNav" aria-label="Main navigation">
      <Link href="/services/managed-it-michigan/">MANAGED IT</Link>
      <Link href="/services/co-managed-it-michigan/">CO-MANAGED IT</Link>
      <Link href="/services/cybersecurity-michigan/">SECURITY</Link>
      <Link href="/insights/">INSIGHTS</Link>
      <Link className="navCta" href="/booking/">BOOK A CONVERSATION</Link>
    </nav>
  </header>;
}

export function SiteFooter() {
  return <footer>
    <div className="footerBrand"><Link className="brand" href="/"><span className="brandMark">N</span><span>NORTHLINE<small>TECHNOLOGY</small></span></Link><p>Michigan managed technology services focused on clear outcomes, resilient systems, and dependable support.</p></div>
    <div><b>SERVICES</b>{locationServices.slice(0, 5).map((service) => <Link key={service.slug} href={`/services/${service.slug}/`}>{service.short}</Link>)}</div>
    <div><b>RESOURCES</b><Link href="/locations/michigan/">Michigan service areas</Link><Link href="/insights/">Insights</Link><Link href="/about/">About Northline</Link><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link></div>
    <div><b>CONTACT</b><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><BookingLink className="footerBooking" label="BOOK A CONVERSATION" /></div>
    <p className="copyright">© {new Date().getFullYear()} Northline Technology. All rights reserved.</p>
    <ChatLauncher />
  </footer>;
}
