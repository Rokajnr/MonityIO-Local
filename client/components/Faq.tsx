import { getHomepageData } from "@/api/homepage";
import FaqList from "./FaqList";

export default async function Faq() {
  const homepageData = await getHomepageData();
  const data = homepageData?.faq;

  if (!data || !data.faqs || data.faqs.length === 0) return null;

  const { title = "", subtitle, faqs } = data;

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Header — two column */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-20 mb-16">

          {/* Left: eyebrow + title */}
          <div className="flex-1">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">
              FAQ
            </p>
            <h2
              className="font-[family-name:var(--font-serif)] text-[36px] md:text-[46px] font-extrabold leading-[1.1] tracking-tight text-[#0f1117]"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
            />
          </div>

          {/* Right: subtitle + CTA */}
          <div className="flex-1 max-w-[440px]">
            {subtitle && (
              <p className="text-[16px] text-gray-500 leading-relaxed mb-6">
                {subtitle}
              </p>
            )}
            {/* Hardcoded CTA — add ctaText/ctaLink Strapi fields later if needed */}
            
              <a href="#contact"
              className="inline-flex items-center gap-2 text-[14px] font-semibold transition-all hover:gap-3"
              style={{ color: "#D42B2B" }}
            >
              Still have questions? Talk to us
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          </div>

        </div>

        {/* FAQ list — client component */}
        <FaqList faqs={faqs} />

      </div>
    </section>
  );
}