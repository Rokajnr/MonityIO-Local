"use client";

import { useState } from "react";

// Brand colors cycle structurally — no Strapi field needed
const ACCENT_COLORS = ["#D42B2B", "#E07530", "#F0B820", "#2E72B8"];

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  faqs: FaqItem[];
}

export default function FaqList({ faqs }: FaqListProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-100">
      {faqs.map((faq, index) => {
        const isOpen = openFaq === index;
        // Cycles red → orange → gold → blue → red...
        const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

        return (
          <div key={index}>
            <button
              onClick={() => setOpenFaq(isOpen ? null : index)}
              className="w-full flex items-start gap-5 py-7 text-left"
            >
              {/* Number — colored when open */}
              <span
                className="text-[13px] font-bold tabular-nums mt-0.5 w-7 flex-shrink-0 transition-colors duration-300"
                style={{ color: isOpen ? accent : "#d1d5db" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Question */}
              <span
                className="flex-1 text-[17px] md:text-[19px] font-semibold leading-snug transition-colors duration-200"
                style={{ color: isOpen ? "#0f1117" : "#374151" }}
              >
                {faq.question}
              </span>

              {/* Toggle button */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? accent : "transparent",
                  borderColor: isOpen ? accent : "#e5e7eb",
                  color: isOpen ? "#fff" : "#9ca3af",
                }}
              >
                {isOpen ? (
                  // Minus
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                ) : (
                  // Plus
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                )}
              </div>
            </button>

            {/* Answer — with colored left border */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? "400px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="flex gap-5 pb-8">
                {/* Colored left bar */}
                <div
                  className="w-0.5 flex-shrink-0 rounded-full ml-7"
                  style={{ backgroundColor: accent }}
                />
                <p className="text-[15px] text-gray-500 leading-relaxed max-w-[680px]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}