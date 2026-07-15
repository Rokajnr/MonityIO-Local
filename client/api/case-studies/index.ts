import { cache } from "react";
import { fetchStrapi, StrapiResponse } from "@/api/strapi";
import { CaseStudy } from "./types";

export type { CaseStudy } from "./types";

const POPULATE = {
  "populate[0]": "image",
  "populate[1]": "stats",
  "populate[2]": "outcomes",
};

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  try {
    const res = await fetchStrapi<StrapiResponse<CaseStudy[]>>("case-studies", {
      params: { ...POPULATE, "sort[0]": "createdAt:desc" },
    });
    return res?.data ?? [];
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
});

export const getCaseStudyBySlug = cache(
  async (slug: string): Promise<CaseStudy | null> => {
    try {
      const res = await fetchStrapi<StrapiResponse<CaseStudy[]>>("case-studies", {
        params: {
          ...POPULATE,
          "filters[slug][$eq]": slug,
          "pagination[limit]": "1",
        },
      });
      return res?.data?.[0] ?? null;
    } catch (error) {
      console.error(`Error fetching case study by slug ${slug}:`, error);
      return null;
    }
  }
);