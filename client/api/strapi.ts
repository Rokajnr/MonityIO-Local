const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchStrapi<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const cleanPath = path.replace(/^\//, "");
  const url = new URL(`/api/${cleanPath}`, STRAPI_URL);

  if (options.params) {
    Object.entries(options.params).forEach(([key, val]) => {
      url.searchParams.append(key, val);
    });
  }

  const headers = new Headers(options.headers);

  if (STRAPI_TOKEN) {
    headers.set("Authorization", `Bearer ${STRAPI_TOKEN}`);
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      `Strapi API Error: ${res.status} ${res.statusText} - ${JSON.stringify(errorData)}`
    );
  }

  return res.json();
}
