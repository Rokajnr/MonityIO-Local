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
        "populate[4]": "dashboard.chartHeights",
        "populate[5]": "features.items",
        "populate[6]": "standards.stats",
        "populate[7]": "industries.sectors",
        "populate[8]": "faq.faqs",
        "populate[9]": "contact",
        "populate[10]": "caseStudies",
        "populate[11]": "caseStudies.image",
        
      },
    });
    return res?.data ?? null;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
});
