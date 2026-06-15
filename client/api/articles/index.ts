import { cache } from "react";
import { fetchStrapi, StrapiResponse } from "@/api/strapi";
import { Article } from "./types";

export type { Article } from "./types";

export const getArticles = cache(async (): Promise<Article[]> => {
  try {
    const res = await fetchStrapi<StrapiResponse<Article[]>>("articles");
    return res?.data ?? [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
});

export const getArticleBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    try {
      const res = await fetchStrapi<StrapiResponse<Article[]>>("articles", {
        params: {
          "filters[slug][$eq]": slug,
          "pagination[limit]": "1",
        },
      });
      return res?.data?.[0] ?? null;
    } catch (error) {
      console.error(`Error fetching article by slug ${slug}:`, error);
      return null;
    }
  }
);
