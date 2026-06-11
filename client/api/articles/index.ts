import { cache } from "react";
import { fetchStrapi, StrapiResponse } from "@/api/strapi";
import { Article } from "./types";

export type { Article } from "./types";

export const getArticles = cache(async (): Promise<Article[]> => {
  const res = await fetchStrapi<StrapiResponse<Article[]>>("articles");
  return res?.data ?? [];
});

export const getArticleBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    const res = await fetchStrapi<StrapiResponse<Article[]>>("articles", {
      params: {
        "filters[slug][$eq]": slug,
        "pagination[limit]": "1",
      },
    });
    return res?.data?.[0] ?? null;
  }
);
