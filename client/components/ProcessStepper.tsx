"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337";

function resolveImageUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

const COLOR_MAP = {
  red:    { hex: "#D42B2B", tagClass: "bg-red-50 text-red-600" },
  orange: { hex: "#E07530", tagClass: "bg-orange-50 text-orange-600" },
  gold:   { hex: "#F0B820", tagClass: "bg-yellow-50 text-yellow-700" },
  blue:   { hex: "#2E72B8", tagClass: "bg-blue-50 text-blue-600" },
};

type Step = {
  num: string;
  title: string;
  description: string;
  tag: string;
  color: keyof typeof COLOR_MAP;
  image?: { url: string; alternativeText?: string };
};

function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function ProcessStepper({ steps }: { steps: Step[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];
  const config = COLOR_MAP[step.color] ?? COLOR_MAP.red;
  const total = steps.length;
  const route = step.tag ? `/${step.tag.toLowerCase().replace(/\s+/g, "-")}` : `/stage-${step.num}`;

  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const goPrev = () => setActiveStep((p) => Math.max(0, p - 1));
  const goNext = () => setActiveStep((p) => Math.min(total - 1, p + 1));

  useLayoutEffect(() => {
    if (!contentRef.current || !previewRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      [contentRef.current, previewRef.current],
      { opacity: 0, y: 22, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
    };
  }, [activeStep]);

  return (
    <div>
      {/* ── Signal rail — the progress line literally fills as stages complete ── */}
      <div className="relative flex items-center mb-16 md:mb-20 pb-8">
        {steps.map((s, i) => {
          const c = COLOR_MAP[s.color] ?? COLOR_MAP.red;
          const isActive = i === activeStep;
          const isDone = i < activeStep;

          return (
            <div key={s.num} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => setActiveStep(i)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${s.tag} — stage ${i + 1} of ${total}`}
                className="relative flex-shrink-0 flex items-center justify-center rounded-full font-bold tabular-nums transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={
                  {
                    width: isActive ? 56 : 44,
                    height: isActive ? 56 : 44,
                    fontSize: isActive ? 16 : 14,
                    backgroundColor: isActive ? c.hex : "#ffffff",
                    color: isActive ? "#ffffff" : isDone ? c.hex : "#c1c5cd",
                    border: `2px solid ${isActive || isDone ? c.hex : "#e5e7eb"}`,
                    boxShadow: isActive ? `0 6px 20px ${c.hex}40` : "none",
                    "--tw-ring-color": c.hex,
                  } as React.CSSProperties
                }
              >
                {s.num}
                <span
                  className={`absolute top-full mt-3 text-[10px] font-bold uppercase tracking-[0.12em] whitespace-nowrap hidden sm:block transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ color: c.hex }}
                >
                  {s.tag}
                </span>
              </button>

              {i < total - 1 && (
                <div className="flex-1 h-[2px] mx-2 md:mx-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 motion-reduce:transition-none"
                    style={{
                      width: isDone ? "100%" : "0%",
                      backgroundColor: c.hex,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Content: active stage detail + device-chrome preview ── */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* Text */}
        <div ref={contentRef}>
          <div
            className="rounded-[2rem] bg-white border p-8 md:p-10 shadow-[0_18px_40px_rgba(15,17,23,0.06)]"
            style={{ borderColor: `${config.hex}1A` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[11px] font-bold tracking-[0.14em] tabular-nums"
                style={{ color: config.hex, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              >
                STAGE {step.num} / {String(total).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <h3
              className="font-[family-name:var(--font-serif)] text-[30px] md:text-[38px] font-extrabold leading-[1.15] tracking-tight text-[#0f1117] mb-4"
              dangerouslySetInnerHTML={{ __html: step.title.replace(/\n/g, "<br />") }}
            />

            <p className="text-[15px] text-zinc-600 leading-relaxed max-w-[420px] mb-6">
              {step.description}
            </p>

            <span
              className={`inline-block text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full mb-8 ${config.tagClass}`}
            >
              {step.tag}
            </span>

            <div className="flex gap-2">
            <button
              onClick={goPrev}
              disabled={activeStep === 0}
              aria-label="Previous stage"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: activeStep === 0 ? "#F9FAFB" : "#ffffff",
                border: `1px solid ${activeStep === 0 ? "#E5E7EB" : config.hex}`,
                color: activeStep === 0 ? "#9CA3AF" : config.hex,
                boxShadow: activeStep === 0 ? "none" : `0 8px 16px ${config.hex}20`,
                "--tw-ring-color": config.hex,
              } as React.CSSProperties}
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={goNext}
              disabled={activeStep === total - 1}
              aria-label="Next stage"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: activeStep < total - 1 ? config.hex : "#F9FAFB",
                border: `1px solid ${activeStep < total - 1 ? config.hex : "#E5E7EB"}`,
                color: activeStep < total - 1 ? "#ffffff" : "#9CA3AF",
                boxShadow: activeStep < total - 1 ? `0 8px 16px ${config.hex}40` : "none",
                "--tw-ring-color": config.hex,
              } as React.CSSProperties}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>

        {/* Device-chrome preview panel */}
        <div ref={previewRef} className="relative">
          <div
            className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.12] blur-3xl -z-10"
            style={{ backgroundColor: config.hex }}
          />

          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.10)] bg-white">

            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: "#12141c" }}>
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span
                className="ml-2 text-[11px] text-white/40 truncate"
                style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              >
                monityio.io{route}
              </span>
            </div>

            {/* Image */}
            <div className="relative w-full" style={{ height: 360 }}>
              {step.image?.url ? (
                <img
                  src={resolveImageUrl(step.image.url)}
                  alt={step.image.alternativeText || step.title}
                  className="w-full h-full object-contain"
                  style={{ backgroundColor: "#fcfaf6" }}
                />
              ) : (
                <div className="w-full h-full" style={{ backgroundColor: `${config.hex}14` }} />
              )}
            </div>

            {/* Status bar */}
            <div className="h-[3px] w-full transition-colors duration-300" style={{ backgroundColor: config.hex }} />
          </div>
        </div>

      </div>
    </div>
  );
}