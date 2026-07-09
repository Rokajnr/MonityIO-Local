import { cache } from "react";
import { fetchStrapi, StrapiResponse } from "@/api/strapi";
import { Homepage } from "./types";

export type { Homepage } from "./types";

export const getHomepageData = cache(async (): Promise<Homepage | null> => {
  try {
    const res = await fetchStrapi<StrapiResponse<Homepage>>("homepage", {
      params: {
        "populate[0]": "hero",
        "populate[1]": "hero.image", 
        "populate[2]": "ticker.items",
        "populate[3]": "process.steps",
        "populate[4]": "process.steps.image",
        "populate[5]": "dashboard.chartHeights",
        "populate[6]": "features.items",
        "populate[7]": "standards.stats",
        "populate[8]": "industries.sectors",
        "populate[9]": "faq.faqs",
        "populate[10]": "contact",
        "populate[11]": "caseStudies",
        "populate[12]": "caseStudies.image",
        
      },
    });
    return res?.data ?? null;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
});
