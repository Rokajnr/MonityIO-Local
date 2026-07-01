"use client";

import { useState } from "react";

const COLOR_MAP = {
  red:    { hex: "#D42B2B", numClass: "text-red-500",    tagClass: "bg-red-50 text-red-600",      panelBg: "#FDE8E8" },
  orange: { hex: "#E07530", numClass: "text-orange-500", tagClass: "bg-orange-50 text-orange-600", panelBg: "#FEF0E6" },
  gold:   { hex: "#F0B820", numClass: "text-yellow-500", tagClass: "bg-yellow-50 text-yellow-700", panelBg: "#FEF9E7" },
  blue:   { hex: "#2E72B8", numClass: "text-blue-500",   tagClass: "bg-blue-50 text-blue-600",     panelBg: "#E8F0FA" },
};

type Step = {
  num: string;
  title: string;
  description: string;
  tag: string;
  color: keyof typeof COLOR_MAP;
};

export default function ProcessStepper({ steps }: { steps: Step[] }) {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];
  const config = COLOR_MAP[step.color] ?? COLOR_MAP.red;

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

      {/* ── LEFT: step list ── */}
      <div className="flex-1 flex flex-col gap-2">
        {steps.map((s, i) => {
          const isActive = i === activeStep;
          const c = COLOR_MAP[s.color] ?? COLOR_MAP.red;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(i)}
              className={`text-left w-full rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 p-6"
                  : "px-6 py-5 hover:bg-white/60"
              }`}
            >
              <div className="flex items-start gap-5">
                <span
                  className="text-[38px] md:text-[44px] font-extrabold leading-none flex-shrink-0 tabular-nums transition-colors duration-300"
                  style={{ color: isActive ? c.hex : "#d1d5db" }}
                >
                  {s.num}
                </span>
                <div className="pt-1">
                  <h3
                    className={`font-[family-name:var(--font-serif)] text-[18px] md:text-[20px] leading-tight mb-1 transition-colors duration-300 ${
                      isActive ? "text-[#0f1117]" : "text-gray-400"
                    }`}
                    dangerouslySetInnerHTML={{ __html: s.title.replace(/\n/g, "<br />") }}
                  />
                  {isActive && (
                    <>
                      <p className="text-[14px] text-zinc-600 leading-relaxed mt-2 mb-3 max-w-[380px]">
                        {s.description}
                      </p>
                      <span className={`inline-block text-[10px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full ${c.tagClass}`}>
                        {s.tag}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── RIGHT: visual panel ── */}
      <div className="flex-1 w-full max-w-[520px] lg:sticky lg:top-10">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{ backgroundColor: config.panelBg, minHeight: "480px" }}
        >
          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-bl-[80px] opacity-20"
            style={{ backgroundColor: config.hex }}
          />

          {/* Tag label */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.hex }} />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-500">
              {step.tag}
            </span>
          </div>

          {/* Image placeholder — swap for <Image> once heroImage field is added */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%]">
            <div className="w-full h-[340px] bg-white/40 rounded-t-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.10)]" />
          </div>

          {/* Dot navigation */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: i === activeStep ? "24px" : "6px",
                  backgroundColor: i === activeStep ? config.hex : "#d1d5db",
                }}
              />
            ))}
          </div>
        </div>

        {/* Step counter + prev/next */}
        <div className="mt-5 flex items-center justify-between px-2">
          <span className="text-[13px] text-gray-400 font-medium">
            Step <strong className="text-[#0f1117]">{activeStep + 1}</strong> of {steps.length}
          </span>
          <div className="flex gap-2">
            <button
            onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
            disabled={activeStep === 0}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 transition-all"
            >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
            </svg>
            </button>
            <button
            onClick={() => setActiveStep((p) => Math.min(steps.length - 1, p + 1))}
            disabled={activeStep === steps.length - 1}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all disabled:opacity-30"
            style={{
                borderColor: activeStep < steps.length - 1 ? config.hex : "#e5e7eb",
                color: activeStep < steps.length - 1 ? config.hex : "#9ca3af",
            }}
            >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
            </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}