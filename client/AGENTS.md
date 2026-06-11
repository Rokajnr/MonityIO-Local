<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project-Specific Agent Rules

1. **Strapi Fetching**: The API layer lives under `@/api`. Use domain modules (e.g. `@/api/articles`) for data access — they wrap the low-level type-safe client `fetchStrapi` (`@/api/strapi`) and dedupe requests with `React.cache`. Add new endpoints as `@/api/<domain>` modules with co-located `types.ts`. Do not write raw fetch calls or hardcode hostnames.
2. **Data Fetching Mode**: Prioritize React Server Components (RSC) for API data fetches. Keep components server-side unless interactivity (`useState`, `useEffect`, event listeners) requires `"use client"`.
3. **Environment Config**: Refer to `NEXT_PUBLIC_STRAPI_API_URL` for the backend endpoint and `STRAPI_API_TOKEN` for server-only credentialed requests.
4. **Import Paths**: Use the path alias prefix `@/` (e.g. `@/lib/...`, `@/components/...`) rather than relative parents (`../../`).
