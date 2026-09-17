import { michiganCities, slugify } from "@/lib/locations";

export type LocationContent = {
  city: string;
  indexable: boolean;
  summary: string;
  faq: { question: string; answer: string }[];
};

// Every city is intentionally available as a route, but none is indexable until
// editorial review verifies useful city-specific information and service coverage.
export const locationContent = new Map<string, LocationContent>(
  michiganCities.map((city) => [
    slugify(city),
    {
      city,
      indexable: false,
      summary: `Northline helps organizations in ${city} evaluate managed IT, co-managed support, cybersecurity, cloud, continuity, and employee support needs. A local page becomes indexable only after its information has been reviewed for accuracy and usefulness.`,
      faq: [
        {
          question: `Can Northline support organizations in ${city}?`,
          answer: "Northline evaluates each engagement around the organization’s needs, support model, and timing. Start with a conversation to confirm service fit and the right next step.",
        },
        {
          question: "What happens after an introductory conversation?",
          answer: "The team will clarify priorities, current challenges, desired outcomes, and any time-sensitive risks before recommending an appropriate next step.",
        },
      ],
    },
  ]),
);

export const indexableLocations = () => [...locationContent.values()].filter((location) => location.indexable);
