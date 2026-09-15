import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationServicePage } from "@/components/LocationServicePage";
import { locationServices, serviceBySlug } from "@/lib/location-services";
import { cityBySlug, michiganCities, slugify } from "@/lib/locations";

const cityPath = (serviceSlug:string, city:string) => `${serviceSlug.replace(/-michigan$/,"")}-${slugify(city)}-michigan`;
export function generateStaticParams() { return locationServices.flatMap((service)=>michiganCities.map((city)=>({serviceSlug:service.slug,citySlug:cityPath(service.slug,city)}))); }
function resolve(serviceSlug:string, citySlug:string){ const service=serviceBySlug.get(serviceSlug); if(!service)return null; const prefix=`${serviceSlug.replace(/-michigan$/,"")}-`; if(!citySlug.startsWith(prefix)||!citySlug.endsWith("-michigan"))return null; const city=cityBySlug.get(citySlug.slice(prefix.length,-9)); return city?{service,city}:null; }
export async function generateMetadata({params}:{params:Promise<{serviceSlug:string;citySlug:string}>}):Promise<Metadata>{
  const {serviceSlug,citySlug}=await params; const page=resolve(serviceSlug,citySlug); if(!page)return{}; const title=`${page.service.name} in ${page.city}, Michigan | Northline Technology`; const description=`${page.service.name} for ${page.city}, Michigan organizations. ${page.service.intro}`; const path=`/${serviceSlug}/${citySlug}/`; return{title,description,alternates:{canonical:path},openGraph:{title,description,url:path,type:"website",images:["/og.png"]},twitter:{card:"summary_large_image",title,description,images:["/og.png"]}};
}
export default async function CityServicePage({params}:{params:Promise<{serviceSlug:string;citySlug:string}>}){
  const {serviceSlug,citySlug}=await params; const page=resolve(serviceSlug,citySlug); if(!page)notFound(); const url=`https://northline-technology-mi.d1rk-digglers.chatgpt.site/${serviceSlug}/${citySlug}/`; const data={"@context":"https://schema.org","@type":"Service",name:`${page.service.name} in ${page.city}, Michigan`,description:page.service.intro,areaServed:{"@type":"City",name:page.city,containedInPlace:{"@type":"State",name:"Michigan"}},provider:{"@type":"Organization",name:"Northline Technology"},url}; return <main><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/><LocationServicePage service={page.service} city={page.city}/></main>;
}
