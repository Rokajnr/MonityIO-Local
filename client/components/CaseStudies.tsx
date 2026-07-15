import { getHomepageData } from "@/api/homepage";
import { getCaseStudies } from "@/api/case-studies";
import CaseStudiesCarousel from "@/components/CaseStudiesCarousel";

export default async function CaseStudies() {
  const homepageData = await getHomepageData();
  const cards = await getCaseStudies();

  const eyebrow = homepageData?.caseStudiesEyebrow;
  const title = homepageData?.caseStudiesTitle ?? "";
  const titleHighlight = homepageData?.caseStudiesTitleHighlight;

  if (cards.length === 0) return null;

  return (
    <section id="case-studies" className="py-20 md:py-20 bg-[#F7F5F2]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-[560px]">
            {eyebrow && (
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">
                {eyebrow}
              </p>
            )}
            <h2 className="font-[family-name:var(--font-serif)] text-[32px] md:text-[42px] font-extrabold leading-[1.1] tracking-tight text-[#0f1117]">
              {title}{" "}
              {titleHighlight && (
                <span style={{ color: "#D42B2B" }}>{titleHighlight}</span>
              )}
            </h2>
          </div>
        </div>

        <CaseStudiesCarousel cards={cards} />

      </div>
    </section>
  );
}