import { getHomepageData } from "@/api/homepage";
import Image from "next/image";

function AlertIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TaskIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

const CAPABILITY_PILLS = ["Compliance", "Budgets", "Field Ops", "Logistics", "Executive KPIs"];
const PILL_STYLE: Record<string, { bg: string; text: string }> = {
  Compliance:       { bg: "#EAF0F8", text: "#2E72B8" },
  Budgets:          { bg: "#FCE8E8", text: "#D42B2B" },
  "Field Ops":      { bg: "#FFF4E8", text: "#E07530" },
  Logistics:        { bg: "#FEF3C7", text: "#F0B820" },
  "Executive KPIs": { bg: "#EFF6FF", text: "#2E72B8" },
};
const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const STATS = [
  { icon: <AlertIcon />,   label: "Alerts", color: "#D42B2B", key: "alerts" },
  { icon: <TaskIcon />,    label: "Tasks",  color: "#E07530", key: "tasks"  },
  { icon: <ActivityIcon />, label: "Uptime", color: "#2E72B8", key: "uptime" },
];

export default async function Dashboard() {
  const homepageData = await getHomepageData();
  const data = homepageData?.dashboard;

  if (!data) return null;

  const {
    eyebrow,
    title = "",
    description,
    projectsActiveCount,
    complianceRate,
    uptimeRate,
    alertsCount,
    tasksCount,
    chartHeights = [],
  } = data;

  const heights = chartHeights.map((ch) => ch.height);

  const statValues: Record<string, string | number | undefined> = {
    alerts: alertsCount,
    tasks:  tasksCount,
    uptime: uptimeRate,
  };

  return (
    <section
      id="dashboard"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#EAF0F8" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* ── LEFT: text — unchanged ── */}
          <div className="flex-1 max-w-[460px] flex flex-col lg:pt-6">

            {eyebrow && (
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-6" style={{ color: "#2E72B8" }}>
                {eyebrow}
              </p>
            )}

            <h2
              className="font-[family-name:var(--font-serif)] text-[40px] md:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#0f1117] mb-6"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
            />

            {description && (
              <p className="text-[15px] text-zinc-500 leading-relaxed mb-8 max-w-[380px]">
                {description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-10">
              {CAPABILITY_PILLS.map((tag) => {
                const style = PILL_STYLE[tag] ?? { bg: "#F3F4F6", text: "#334155" };
                return (
                  <span
                    key={tag}
                    className="text-[12px] font-medium px-4 py-1.5 rounded-full"
                    style={{ backgroundColor: style.bg, color: style.text }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>

            <div>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#E8291C] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(232,41,28,0.25)] transition hover:bg-[#c31d17] sm:w-auto"
            >
              See it live
              <span className="ml-2 text-lg">→</span>
            </a>
            </div>
          </div>

          {/* ── RIGHT: tall image + overlapping card ── */}
          <div className="flex-1 w-full relative">

            {/* Tall image */}
            <div className="relative rounded-3xl overflow-hidden w-full" style={{ height: "520px" }}>
              <Image
                src="/bg-image-dashboard-sec-2.jpg"
                alt="MonityIO platform in use"
                fill
                className="object-cover"
              />
              {/* Vignette so card reads cleanly over the image */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/30 to-transparent pointer-events-none rounded-b-3xl" />
            </div>

            {/* Floating dashboard card — overlaps bottom of image */}
            <div
              className="absolute bg-white rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.14)] border border-gray-100 overflow-hidden z-20"
              style={{
                left: "-24px",
                right: "0px",
                bottom: "-56px",
              }}
            >

              {/* ── Top KPI row — single flex row matching screenshot ── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-3">

                {/* Left: projects active */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[26px] font-extrabold text-[#0f1117] leading-none">
                    {projectsActiveCount}
                  </span>
                  <span className="text-[13px] text-gray-400 font-medium">Projects Active</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                    +24% this quarter
                  </span>
                </div>

                {/* Right: compliance + period toggle */}
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-gray-400">Compliance</span>
                  <span className="text-[20px] font-extrabold leading-none" style={{ color: "#2E72B8" }}>
                    {complianceRate}
                  </span>
                  <button className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 flex items-center gap-1">
                    Monthly
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* ── Bottom: bar chart + stats column ── */}
              <div className="flex items-stretch divide-x divide-gray-100">

                {/* Bar chart */}
                <div className="flex-1 px-5 pt-4 pb-3">
                  <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3">
                    Monthly Performance
                  </p>

                  {/* Bars — direct children of fixed-height container */}
                  <div className="flex items-end gap-2" style={{ height: "60px" }}>
                    {heights.map((h, index) => (
                      <div
                        key={index}
                        className="w-5 rounded-t-[4px] flex-shrink-0"
                        style={{
                          height: `${h}%`,
                          backgroundColor: index === heights.length - 1 ? "#D42B2B" : "#F4B5B5",
                        }}
                      />
                    ))}
                  </div>

                  {/* Month labels */}
                  <div className="flex gap-2 mt-1.5">
                    {heights.map((_, index) => (
                      <span key={index} className="w-5 flex-shrink-0 text-center text-[9px] text-gray-400">
                        {MONTHS[index % MONTHS.length]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats column — with colored icon backgrounds matching screenshot */}
                <div className="flex flex-col divide-y divide-gray-100 min-w-[140px]">
                  {STATS.map(({ icon, label, color, key }) => (
                    <div key={label} className="flex items-center gap-3 px-5 py-3 flex-1">
                      {/* Colored icon background */}
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}18`, color }}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="text-[15px] font-extrabold leading-none" style={{ color }}>
                          {statValues[key]}
                        </p>
                        <p className="text-[9px] text-gray-400 font-medium mt-0.5">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Spacer for overflowing card */}
        <div className="h-20 md:h-24" />
      </div>
    </section>
  );
}