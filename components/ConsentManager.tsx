"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const consentKey = "northline-analytics-consent";

export function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("northline:track", { detail: { event, params } }));
}

export function ConsentManager() {
  const [consent, setConsent] = useState<"unknown" | "granted" | "denied">(() => {
    if (typeof window === "undefined") return "unknown";
    const stored = window.localStorage.getItem(consentKey);
    return stored === "granted" || stored === "denied" ? stored : "unknown";
  });

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ event: string; params: Record<string, string> }>).detail;
      if (consent === "granted" && typeof window.gtag === "function") window.gtag("event", detail.event, detail.params);
    };
    window.addEventListener("northline:track", handler);
    return () => window.removeEventListener("northline:track", handler);
  }, [consent]);

  const choose = (value: "granted" | "denied") => {
    window.localStorage.setItem(consentKey, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && siteConfig.gaMeasurementId && <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`} strategy="afterInteractive" />
        <Script id="northline-ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${siteConfig.gaMeasurementId}',{anonymize_ip:true});`}</Script>
      </>}
      {consent === "granted" && siteConfig.clarityProjectId && <Script id="northline-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${siteConfig.clarityProjectId}');`}</Script>}
      {consent === "unknown" && <aside className="consentBanner" aria-label="Analytics choice"><p>We use optional analytics to understand site use and improve conversations.</p><div><button onClick={() => choose("granted")}>Accept analytics</button><button className="textButton" onClick={() => choose("denied")}>Decline</button></div></aside>}
    </>
  );
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
