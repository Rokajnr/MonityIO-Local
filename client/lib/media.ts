export function getStrapiMediaUrl(url?: string | null) {
  if (!url) return null;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, "");
  if (!baseUrl) return url;

  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}
