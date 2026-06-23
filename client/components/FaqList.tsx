"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  faqs: FaqItem[];
}

export default function FaqList({ faqs }: FaqListProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div>
      {faqs.map((faq, index) => (
        <div key={index} className="border-t border-[#DDD9D0]">
          <button
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
            className="
              w-full
              flex
              justify-between
              items-center
              py-7
              text-left
            "
          >
            <span className="font-medium">{faq.question}</span>

            <div
              className={`
                w-8 h-8
                rounded-full
                border
                flex
                items-center
                justify-center
                transition-all
                ${
                  openFaq === index
                    ? "bg-[#E8291C] border-[#E8291C] text-white"
                    : "border-[#DDD9D0]"
                }
              `}
            >
              {openFaq === index ? "−" : "+"}
            </div>
          </button>

          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ${openFaq === index ? "max-h-96 pb-8" : "max-h-0"}
            `}
          >
            <p className="text-zinc-600 leading-8 max-w-3xl">{faq.answer}</p>
          </div>
        </div>
      ))}

      <div className="border-t border-[#DDD9D0]" />
    </div>
  );
}
