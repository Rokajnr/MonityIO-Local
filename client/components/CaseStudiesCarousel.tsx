"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gasp";
import { CaseStudy } from "@/api/case-studies";

const ACCENT: Record<string, string> = {
  red: "#D42B2B",
  orange: "#E07530",
  blue: "#2E72B8",
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";

function resolveImageUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

export default function CaseStudiesCarousel({ cards }: { cards: CaseStudy[] }) {
  const [current, setCurrent] = useState(0);

  const total = cards.length;
  const visibleCount = 3;
  const maxIndex = Math.max(0, total - visibleCount);

  const prev = () => setCurrent((p) => Math.max(0, p - 1));
  const next = () => setCurrent((p) => Math.min(maxIndex, p + 1));

  const visible = cards.slice(current, current + visibleCount);
  const carouselRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!carouselRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".case-study-card",
        { opacity: 0, y: 18, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.utils.toArray<HTMLDivElement>(".case-study-card").forEach((card) => {
        const bar = card.querySelector<HTMLDivElement>(".hover-border");
        if (!bar) return;

        gsap.set(bar, { scaleX: 0, transformOrigin: "right center" });

        const onEnter = () => {
          gsap.to(bar, { scaleX: 1, duration: 0.4, ease: "power3.out", transformOrigin: "right center" });
        };
        const onLeave = () => {
          gsap.to(bar, { scaleX: 0, duration: 0.3, ease: "power3.in", transformOrigin: "left center" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        return () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        };
      });
    }, carouselRef);

    return () => ctx.revert();
  }, [current]);

  if (total === 0) return null;

  return (
    <div ref={carouselRef}>
      {/* Controls row */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: current === 0 ? "#F9FAFB" : "#ffffff",
            border: `1px solid ${current === 0 ? "#E5E7EB" : "#D42B2B"}`,
            color: current === 0 ? "#9CA3AF" : "#D42B2B",
            boxShadow: current === 0 ? "none" : "0 10px 30px rgba(212,43,43,0.15)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          disabled={current === maxIndex}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: current === maxIndex ? "#F9FAFB" : "#D42B2B",
            color: current === maxIndex ? "#9CA3AF" : "#ffffff",
            border: current === maxIndex ? "1px solid #E5E7EB" : "1px solid transparent",
            boxShadow: current === maxIndex ? "none" : "0 10px 30px rgba(212,43,43,0.25)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {visible.map((card) => {
          const color = ACCENT[card.accentColor] ?? ACCENT.red;
          const imageUrl = resolveImageUrl(card.image?.url);
          const href = `/case-studies/${card.slug}`;

          return (
            <div
              key={card.slug}
              className="case-study-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col relative"
            >
              <div className="h-[200px] bg-gray-100 relative overflow-hidden">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt={card.image?.alternativeText || card.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                {card.tags?.length > 0 && (
                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-400 mb-3">
                    {card.tags.join(", ")}
                  </p>
                )}

                <h3 className="font-[family-name:var(--font-serif)] text-[17px] leading-snug text-[#0f1117] mb-6 flex-1">
                  {card.title}
                </h3>

                <div className="flex items-center justify-between">
                  <Link href={href} className="text-[13px] text-gray-400 hover:text-[#0f1117] transition-colors">
                    Read case study
                  </Link>
                  <Link
                    href={href}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 12h10" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="hover-border absolute bottom-0 left-0 h-1 w-full origin-right" style={{ backgroundColor: color }} />
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                backgroundColor: i === current ? "#D42B2B" : "#d1d5db",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}