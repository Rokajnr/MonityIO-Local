import { cache } from "react";
import { fetchStrapi, StrapiResponse } from "@/api/strapi";
import { Global } from "./types";

export type { Global } from "./types";

export const getGlobalSettings = cache(async (): Promise<Global | null> => {
  try {
    const res = await fetchStrapi<StrapiResponse<Global>>("global", {
      params: {
        "populate[0]": "defaultSeo",
        "populate[1]": "navbarLinks",
        "populate[2]": "footerLinks",
      },
    });
    return res?.data ?? null;
  } catch (error) {
    console.error("Error fetching global settings:", error);
    return null;
  }
});
