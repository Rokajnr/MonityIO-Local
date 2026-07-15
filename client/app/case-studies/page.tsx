import Link from "next/link";
import { getCaseStudies } from "@/api/case-studies";

const ACCENT: Record<string, string> = { red: "#D42B2B", orange: "#E07530", blue: "#2E72B8" };

function resolveImageUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, "");
  return base ? `${base}${url}` : url;
}

export default async function CaseStudiesIndexPage() {
  const studies = await getCaseStudies();

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <h1 className="text-[36px] md:text-[46px] font-extrabold text-[#0f1117] mb-12">Case Studies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {studies.map((c) => (
            <Link
              href={`/case-studies/${c.slug}`}
              key={c.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col"
            >
              <div className="relative overflow-hidden h-[220px]">
                {resolveImageUrl(c.image?.url) && (
                  <img
                    src={resolveImageUrl(c.image?.url)}
                    alt={c.image?.alternativeText || c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex flex-col flex-1 p-6">
                
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">
                {Array.isArray(c.tags) ? c.tags.join(", ") : ""}
                </p>
                {/* <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">{c.tags.join(", ")}</p> */}
                <p className="text-[16px] font-bold text-[#0f1117] leading-snug flex-1 mb-5">{c.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-400">Read case study</span>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: ACCENT[c.accentColor] }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}