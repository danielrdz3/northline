const fallbackSiteUrl = "https://northlinetechnology.com";

export const siteConfig = {
  name: "Northline Technology",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@northlinetechnology.com",
  calcomUrl: process.env.NEXT_PUBLIC_CALCOM_URL ?? "",
  ghlFormUrl: process.env.NEXT_PUBLIC_GHL_FORM_URL ?? "",
  ghlChatScriptUrl: process.env.NEXT_PUBLIC_GHL_CHAT_SCRIPT_URL ?? "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "",
} as const;

export const absoluteUrl = (path = "/") => new URL(path, `${siteConfig.url}/`).toString();
