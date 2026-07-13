import Link from "next/link";
import { getHomepageData } from "@/api/homepage";

// Sparkline
function SalesChart() {
  const points = [22, 34, 28, 45, 38, 55, 48, 62, 57, 72, 66, 80];
  const max = Math.max(...points), min = Math.min(...points);
  const norm = (v: number) => 1 - (v - min) / (max - min);
  const W = 200, H = 52;
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * W} ${norm(p) * H}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E72B8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2E72B8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={pathD + ` L ${W} ${H} L 0 ${H} Z`} fill="url(#cg)" />
      <path
        d={pathD}
        fill="none"
        stroke="#2E72B8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hardcoded avatars — structural - Will come back to
const AVATARS = [
  "https://i.pravatar.cc/32?img=1",
  "https://i.pravatar.cc/32?img=5",
  "https://i.pravatar.cc/32?img=8",
];

// Hardcoded stats — structural
const STATS = [
  { label: "Businesses served", value: "100+" },
  { label: "Data integrations", value: "128" },
  { label: "System uptime", value: "99%" },
];

function getStrapiMediaUrl(url?: string) {
  if (!url) return null;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace(/\/$/, "");
  if (!baseUrl) return url;

  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

export default async function Hero() {
  const homepageData = await getHomepageData();
  if (!homepageData?.hero) return null;

  const {
    eyebrow,
    title = "",
    description,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink,
    image,
  } = homepageData.hero;

  const heroImageUrl = getStrapiMediaUrl(image?.url);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pt-14 md:pb-20">
      {/* Color Stripe */}
        <div className="h-1 w-full flex mt-[15px] mb-16">
          <div className="flex-1 bg-[#E8291C]" />
          <div className="flex-1 bg-[#E07020]" />
          <div className="flex-1 bg-[#F0B020]" />
          <div className="flex-1 bg-[#2B6CB8]" />
        </div>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 max-w-[560px] lg:order-last">


          {/* Eyebrow from Strapi */}
          {eyebrow && (
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">
              {eyebrow}
            </p>
          )}

          {/* Title from Strapi */}
          <h1
            className="font-[family-name:var(--font-serif)] text-[42px] md:text-[54px] lg:text-[58px] font-extrabold leading-[1.1] tracking-tight text-[#0f1117] mb-5"
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
          />

          {/* Description from Strapi */}
          {description && (
            <p className="text-[16px] md:text-[17px] text-gray-500 leading-relaxed max-w-[460px] mb-8">
              {description}
            </p>
          )}

          {/* CTA buttons from Strapi */}
          <div className="flex flex-wrap gap-3 mb-12">
            {primaryCtaLink && primaryCtaText && (
              <Link
                href={primaryCtaLink}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(212,43,43,0.25)] transition hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: "#D42B2B" }}
              >
                {primaryCtaText}
              </Link>
            )}
            {secondaryCtaLink && secondaryCtaText && (
              <Link
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#0f1117] border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>

          {/* Stats row — structural, hardcoded */}
          <div className="flex flex-wrap gap-8">
            {STATS.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[12px] text-gray-400 font-medium mb-0.5">{label}</p>
                <p className="text-[28px] font-extrabold text-[#0f1117] tracking-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — fully structural ── */}
        <div className="flex-1 w-full max-w-[540px] relative">

          {/* Hero image from Strapi */}
          {heroImageUrl ? (
            <img
              src={heroImageUrl}
              alt={image?.alternativeText || "Monity hero illustration"}
              className="w-full h-[380px] md:h-[440px] object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            />
          ) : (
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-gray-100 h-[380px] md:h-[440px]" />
          )}

          {/* Floating stat card */}
          <div className="absolute bottom-[-20px] left-[-20px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 p-4 w-[220px]">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[12px] text-gray-400 font-medium">Operations Growth</p>
              <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                +87%
              </div>
            </div>
            <p className="text-[28px] font-extrabold text-[#0f1117] leading-none mb-2">87%</p>
            <SalesChart />
            <p className="text-[11px] text-gray-400 mt-2">Delivering measurable results</p>
          </div>

          {/* Floating sources badge */}
          <div className="absolute top-4 right-[-16px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.10)] border border-gray-100 px-4 py-2.5 flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0 text-xs font-bold"
              style={{ backgroundColor: "#E07530" }}
            >
              BI
            </div>
            <div>
              <p className="text-[11px] text-gray-400 leading-none mb-0.5">Live insights</p>
              <p className="text-[13px] font-bold text-[#0f1117] leading-none">128 sources</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
          </div>

          {/* Background blobs — structural decoration */}
          <div
            className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-[0.08] blur-3xl -z-10"
            style={{ backgroundColor: "#2E72B8" }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full opacity-[0.08] blur-3xl -z-10"
            style={{ backgroundColor: "#D42B2B" }}
          />
        </div>
      </div>
    </section>
  );
}