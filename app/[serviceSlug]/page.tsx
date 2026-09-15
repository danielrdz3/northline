import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationServicePage } from "@/components/LocationServicePage";
import { locationServices, serviceBySlug } from "@/lib/location-services";

export function generateStaticParams() { return locationServices.map((service) => ({ serviceSlug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{serviceSlug:string}> }): Promise<Metadata> {
  const { serviceSlug } = await params; const service = serviceBySlug.get(serviceSlug); if (!service) return {};
  const title = `${service.name} in Michigan | Northline Technology`;
  return { title, description: service.intro, alternates:{canonical:`/${service.slug}`}, openGraph:{title,description:service.intro,url:`/${service.slug}`,type:"website",images:["/og.png"]}, twitter:{card:"summary_large_image",title,description:service.intro,images:["/og.png"]} };
}
export default async function StateServicePage({ params }: { params: Promise<{serviceSlug:string}> }) {
  const { serviceSlug } = await params; const service = serviceBySlug.get(serviceSlug); if (!service) notFound();
  const data={"@context":"https://schema.org","@type":"Service",name:`${service.name} in Michigan`,description:service.intro,areaServed:{"@type":"State",name:"Michigan"},provider:{"@type":"Organization",name:"Northline Technology"}};
  return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/><LocationServicePage service={service}/></main>;
}
