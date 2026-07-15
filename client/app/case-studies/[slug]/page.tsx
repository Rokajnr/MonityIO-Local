import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCaseStudies, getCaseStudyBySlug } from "@/api/case-studies";

const ACCENT: Record<string, string> = {
  red: "#D42B2B",
  orange: "#E07530",
  blue: "#2E72B8",
};

function resolveImageUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const base = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, "");
  return base ? `${base}${url}` : url;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  return study
    ? { title: `${study.title} | MonityIO Case Studies`, description: study.intro }
    : { title: "Case Study Not Found | MonityIO" };
}

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const all = await getCaseStudies();
  const currentIndex = all.findIndex((s) => s.slug === slug);
  const relatedCases = all.filter((_, i) => i !== currentIndex).slice(0, 2);
  const nextCase = all[(currentIndex + 1) % all.length];

  const accent = ACCENT[study.accentColor] ?? ACCENT.red;
  const imageUrl = resolveImageUrl(study.image?.url);

  return (
    <div className="min-h-screen bg-white font-[Plus_Jakarta_Sans,sans-serif]">
      {/* HERO */}
      <div className="relative h-[480px] md:h-[560px] overflow-hidden">
        {imageUrl && (
          <img src={imageUrl} alt={study.image?.alternativeText || study.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-6 left-6 md:left-12 lg:left-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to home
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-20 pb-12 max-w-[1280px] mx-auto">
        <div className="flex flex-wrap gap-2 mb-5">
        {(Array.isArray(study.tags) ? study.tags : []).map((tag) => (
            <span
            key={tag}
            className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border border-white/30 text-white/80 backdrop-blur-sm bg-white/10"
            >
            {tag}
            </span>
        ))}
        </div>
          <h1 className="text-[32px] md:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.1] tracking-tight max-w-[820px]">
            {study.title}
          </h1>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="border-b border-gray-100" style={{ backgroundColor: accent }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {study.stats.map(({ label, value }) => (
              <div key={label} className="py-6 px-6 first:pl-0">
                <p className="text-[28px] md:text-[34px] font-extrabold text-white leading-none mb-1">{value}</p>
                <p className="text-[12px] text-white/70 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <p className="text-[18px] md:text-[20px] text-gray-700 leading-relaxed font-medium mb-12 pb-12 border-b border-gray-100">
              {study.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-[13px] font-bold tracking-[0.16em] uppercase text-gray-400">The Challenge</h2>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">{study.challenge}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accent }} />
                  <h2 className="text-[13px] font-bold tracking-[0.16em] uppercase text-gray-400">The Solution</h2>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed">{study.solution}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: accent }} />
                <h2 className="text-[13px] font-bold tracking-[0.16em] uppercase text-gray-400">Key Outcomes</h2>
              </div>
              <div className="flex flex-col gap-3">
                {study.outcomes.map((outcome) => (
                  <div key={outcome.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <p className="text-[15px] text-gray-700 leading-snug font-medium">{outcome.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 flex flex-col gap-5">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-400 mb-2">Industry</p>
                <p className="text-[16px] font-bold text-[#0f1117]">{study.industry}</p>
              </div>

              <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: accent }}>
                <p className="text-[15px] font-bold mb-2">Ready to see this for your organisation?</p>
                <p className="text-[13px] opacity-80 mb-5 leading-relaxed">
                  We&apos;ll map your systems and show you what unified intelligence looks like for your sector.
                </p>
                <Link
                  href="/#contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-[14px] font-bold hover:opacity-90 transition-all"
                  style={{ color: accent }}
                >
                  Request a Pilot
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>

              {nextCase && (
                <Link
                  href={`/case-studies/${nextCase.slug}`}
                  className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-300"
                >
                  <div className="relative h-32 overflow-hidden">
                    {resolveImageUrl(nextCase.image?.url) && (
                      <img
                        src={resolveImageUrl(nextCase.image?.url)}
                        alt={nextCase.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.14em] uppercase text-white/80">
                      Next case
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold tracking-[0.12em] uppercase mb-1" style={{ color: ACCENT[nextCase.accentColor] }}>
                      {nextCase.industry}
                    </p>
                    <p className="text-[13px] font-bold text-[#0f1117] leading-snug">{nextCase.title}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RELATED */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-[#0f1117]">More case studies</h2>
            <Link href="/case-studies" className="text-[13px] font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{ color: "#D42B2B" }}>
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatedCases.map((c) => (
              <Link
                href={`/case-studies/${c.slug}`}
                key={c.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden h-[200px]">
                  {resolveImageUrl(c.image?.url) && (
                    <img src={resolveImageUrl(c.image?.url)} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400 mb-2">
                {Array.isArray(c.tags) ? c.tags.join(", ") : ""}
                </p>
                  <p className="text-[16px] font-bold text-[#0f1117] leading-snug flex-1 mb-4">{c.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">Read case study</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: ACCENT[c.accentColor] }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}