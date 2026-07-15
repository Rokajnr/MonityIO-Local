"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CaseStudy } from "@/api/case-studies";
import { getStrapiMediaUrl } from "@/lib/media";

const ACCENT: Record<string, string> = {
  red: "#D42B2B",
  orange: "#E07530",
  blue: "#2E72B8",
};

const PAGE_SIZE = 9;

type SortKey = "newest" | "oldest" | "az";

const SORT_LABELS: Record<SortKey, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  az: "A → Z",
};

function ChevronIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {direction === "right" ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
    </svg>
  );
}

export default function CaseStudiesIndex({ studies }: { studies: CaseStudy[] }) {
  const [industry, setIndustry] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);

  const industries = useMemo(() => {
    const unique = Array.from(new Set(studies.map((s) => s.industry).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [studies]);

  const filtered = useMemo(() => {
    let result = industry === "all" ? studies : studies.filter((s) => s.industry === industry);

    result = [...result].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      const aDate = new Date(a.publishedAt || a.createdAt).getTime();
      const bDate = new Date(b.publishedAt || b.createdAt).getTime();
      return sort === "newest" ? bDate - aDate : aDate - bDate;
    });

    return result;
  }, [studies, industry, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function updateIndustry(value: string) {
    setIndustry(value);
    setPage(1);
  }

  function updateSort(value: SortKey) {
    setSort(value);
    setSortOpen(false);
    setPage(1);
  }

  function goToPage(p: number) {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    if (typeof window !== "undefined") {
      const el = document.getElementById("case-studies-grid");
      if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    }
  }

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    const delta = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <>
      {/* Filter / sort bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#DDD9D0]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Industry pills */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => updateIndustry("all")}
              className="flex-shrink-0 text-[12px] font-semibold px-4 py-2 rounded-full border transition-colors"
              style={
                industry === "all"
                  ? { backgroundColor: "#0f1117", color: "#fff", borderColor: "#0f1117" }
                  : { backgroundColor: "transparent", color: "#6b7280", borderColor: "#e5e7eb" }
              }
            >
              All industries
            </button>
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => updateIndustry(ind)}
                className="flex-shrink-0 text-[12px] font-semibold px-4 py-2 rounded-full border transition-colors"
                style={
                  industry === ind
                    ? { backgroundColor: "#0f1117", color: "#fff", borderColor: "#0f1117" }
                    : { backgroundColor: "transparent", color: "#6b7280", borderColor: "#e5e7eb" }
                }
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Sort + count */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-[12px] text-gray-400 whitespace-nowrap">
              {filtered.length} {filtered.length === 1 ? "study" : "studies"}
            </span>
            <div className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 text-[12px] font-semibold px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600"
              >
                {SORT_LABELS[sort]}
                <ChevronIcon />
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl border border-gray-100 shadow-[0_12px_32px_rgba(0,0,0,0.10)] overflow-hidden z-40">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => updateSort(key)}
                      className="w-full text-left text-[13px] px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      style={{ color: sort === key ? "#D42B2B" : "#374151", fontWeight: sort === key ? 600 : 500 }}
                    >
                      {SORT_LABELS[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div id="case-studies-grid" className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-3xl bg-white">
            <p className="text-[16px] font-semibold text-[#0f1117] mb-1">No case studies found</p>
            <p className="text-[13px] text-gray-400">Try a different industry filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((c) => {
              const color = ACCENT[c.accentColor] ?? ACCENT.red;
              const imageUrl = getStrapiMediaUrl(c.image?.url);

              return (
                <Link
                  href={`/case-studies/${c.slug}`}
                  key={c.slug}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col relative"
                >
                  <div className="relative overflow-hidden h-[220px] bg-gray-100">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imageUrl}
                        alt={c.image?.alternativeText || c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full" style={{ backgroundColor: `${color}14` }} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                    {c.industry && (
                      <span
                        className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full text-white backdrop-blur-sm"
                        style={{ backgroundColor: `${color}CC` }}
                      >
                        {c.industry}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    {c.tags?.length > 0 && (
                      <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">
                        {c.tags.join(" · ")}
                      </p>
                    )}
                    <p className="text-[16px] font-bold text-[#0f1117] leading-snug flex-1 mb-5">
                      {c.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
                        Read case study
                      </span>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      >
                        <ArrowIcon />
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ backgroundColor: color }}
                  />
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30 border"
              style={{
                backgroundColor: currentPage === 1 ? "#F9FAFB" : "#ffffff",
                borderColor: currentPage === 1 ? "#E5E7EB" : "#D42B2B",
                color: currentPage === 1 ? "#9CA3AF" : "#D42B2B",
              }}
              aria-label="Previous page"
            >
              <ArrowIcon direction="left" />
            </button>

            {pageNumbers.map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-[13px] text-gray-300">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all"
                  style={
                    p === currentPage
                      ? { backgroundColor: "#D42B2B", color: "#fff" }
                      : { backgroundColor: "transparent", color: "#6b7280" }
                  }
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30 border"
              style={{
                backgroundColor: currentPage === totalPages ? "#F9FAFB" : "#D42B2B",
                borderColor: currentPage === totalPages ? "#E5E7EB" : "#D42B2B",
                color: currentPage === totalPages ? "#9CA3AF" : "#ffffff",
              }}
              aria-label="Next page"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}