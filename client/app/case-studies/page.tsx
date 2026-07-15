import Link from "next/link";
import { getCaseStudies } from "@/api/case-studies";
import CaseStudiesIndex from "@/components/CaseStudiesIndex";
import Navbar from "@/components/Navbar";
import TickerBar from "@/components/TickerBar";

export default async function CaseStudiesIndexPage() {
  const studies = await getCaseStudies();

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <Navbar />
      <TickerBar />

      <div className="pt-8 bg-[#F7F5F2]">
        {/* Header */}
        <div className="bg-white border-b border-[#DDD9D0]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-14 md:pt-36 md:pb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-400 hover:text-[#0f1117] transition-colors mb-8"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to home
            </Link>

            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">
              Case Studies
            </p>
            <h1 className="font-[family-name:var(--font-serif)] text-[38px] md:text-[52px] font-extrabold leading-[1.08] tracking-tight text-[#0f1117] max-w-2xl mb-5">
              Real results from real deployments
            </h1>
            <p className="text-[16px] text-gray-500 leading-relaxed max-w-xl">
              See how organizations across compliance, logistics, and field operations use MonityIO to turn fragmented data into decisive action.
            </p>

            <div className="h-1 w-full flex mt-10">
              <div className="flex-1 bg-[#D42B2B]" />
              <div className="flex-1 bg-[#E07530]" />
              <div className="flex-1 bg-[#F0B820]" />
              <div className="flex-1 bg-[#2E72B8]" />
            </div>
          </div>
        </div>

        <CaseStudiesIndex studies={studies} />
      </div>
    </div>
  );
}