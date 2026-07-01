import { cache } from "react";
import { fetchStrapi, StrapiResponse } from "@/api/strapi";
import { Homepage } from "./types";

export type { Homepage } from "./types";

export const getHomepageData = cache(async (): Promise<Homepage | null> => {
  try {
    const res = await fetchStrapi<StrapiResponse<Homepage>>("homepage", {
      params: {
        "populate[0]": "hero",
        "populate[1]": "ticker.items",
        "populate[2]": "process.steps",
        "populate[3]": "dashboard.chartHeights",
        "populate[4]": "features.items",
        "populate[5]": "standards.stats",
        "populate[6]": "industries.sectors",
        "populate[7]": "faq.faqs",
        "populate[8]": "contact",
        "populate[9]": "caseStudies",
        "populate[10]": "caseStudies.image",
        
      },
    });
    return res?.data ?? null;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
});
