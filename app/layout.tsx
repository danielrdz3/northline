import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { ConsentManager } from "@/components/ConsentManager";

export const metadata: Metadata = {
  title: "Michigan IT Partner for Managed & Co-Managed IT | Northline Technology",
  description: "Managed IT services in Michigan with cybersecurity, cloud migration, help desk, backup and recovery, and strategic technology guidance.",
  metadataBase: new URL(siteConfig.url),
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
  openGraph: { title: "Michigan IT Partner for Managed & Co-Managed IT | Northline Technology", description: "Managed IT services in Michigan with cybersecurity, cloud migration, help desk, backup and recovery, and strategic technology guidance.", url: "/", siteName: "Northline Technology", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Michigan IT Partner for Managed & Co-Managed IT | Northline Technology", description: "Managed IT services in Michigan with cybersecurity, cloud migration, help desk, backup and recovery, and strategic technology guidance.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url, email: siteConfig.email, logo: `${siteConfig.url}/og.png`, areaServed: { "@type": "State", name: "Michigan" }, description: "Managed IT services, cybersecurity, cloud migration, support, and technology strategy for Michigan businesses." };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />{children}<ConsentManager /></body></html>;
}
