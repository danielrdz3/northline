"use client";

import Script from "next/script";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/components/ConsentManager";

export function BookingLink({ className = "button primary", label = "BOOK A CONVERSATION" }: { className?: string; label?: string }) {
  const onClick = () => track("booking_view", { placement: "cta" });
  if (siteConfig.calcomUrl) {
    return <a className={className} href={siteConfig.calcomUrl} onClick={onClick}>{label} <b>→</b></a>;
  }
  return <Link className={className} href="/booking/" onClick={onClick}>{label} <b>→</b></Link>;
}

export function LeadForm() {
  if (!siteConfig.ghlFormUrl) return <p className="formFallback">A contact form will appear here once the GoHighLevel form is connected. Until then, <a href={`mailto:${siteConfig.email}`}>email Northline</a> to start a conversation.</p>;
  return <iframe className="leadFormEmbed" title="Contact Northline Technology" src={siteConfig.ghlFormUrl} onLoad={() => track("lead_form_view")} />;
}

export function ChatLauncher() {
  const [loaded, setLoaded] = useState(false);
  if (!siteConfig.ghlChatScriptUrl) return null;
  return <>
    <button className="chatButton" onClick={() => { setLoaded(true); track("chat_open"); }}>Need a quick answer?</button>
    {loaded && <Script src={siteConfig.ghlChatScriptUrl} strategy="afterInteractive" />}
  </>;
}
