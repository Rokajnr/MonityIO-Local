import { getHomepageData } from "@/api/homepage";

// Inline SVG icons
function AlertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TaskIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

// Hardcoded capability pills — structural
const CAPABILITY_PILLS = ["Compliance", "Budgets", "Field Ops", "Logistics", "KPIs"];

// Month labels for the bar chart — structural
const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

  return (
    <section id="dashboard" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Outer gradient container — structural */}
        <div
          className="rounded-3xl overflow-hidden flex flex-col lg:flex-row items-stretch"
          style={{ background: "linear-gradient(135deg, #EEF3FB 0%, #F5F0EC 100%)" }}
        >

          {/* ── LEFT — text from Strapi ── */}
          <div className="flex-1 flex flex-col justify-center px-10 py-14 md:px-14 md:py-16 max-w-[520px]">

            {eyebrow && (
              <p
                className="text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
                style={{ color: "#2E72B8" }}
              >
                {eyebrow}
              </p>
            )}

            <h2
              className="font-[family-name:var(--font-serif)] text-[38px] md:text-[46px] font-extrabold leading-[1.1] tracking-tight text-[#0f1117] mb-6"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
            />

            {description && (
              <p className="text-[15px] md:text-[16px] text-zinc-600 leading-relaxed mb-10 max-w-[400px]">
                {description}
              </p>
            )}

            {/* CTA — structural */}
            <button
              className="self-start flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold text-white hover:opacity-90 active:scale-[0.98] transition-all"
              style={{ backgroundColor: "#D42B2B" }}
            >
              See It Live
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Capability pills — structural */}
            <div className="flex flex-wrap gap-2 mt-8">
              {CAPABILITY_PILLS.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/80 border border-white text-gray-500 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT — dashboard card, values from Strapi ── */}
          <div className="flex-1 flex items-center justify-center px-8 py-12 lg:py-14">
            <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.10)] border border-gray-100 overflow-hidden">

              {/* KPI row */}
              <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
                <div className="px-6 py-5">
                  <p className="text-[11px] text-gray-400 font-medium mb-1">Projects Active</p>
                  <p className="text-[34px] font-extrabold text-[#0f1117] leading-none tracking-tight">
                    {projectsActiveCount}
                  </p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-[11px] text-gray-400 font-medium mb-1">Compliance</p>
                  <p
                    className="text-[34px] font-extrabold leading-none tracking-tight"
                    style={{ color: "#2E72B8" }}
                  >
                    {complianceRate}
                  </p>
                </div>
              </div>
              {/* Bar chart */}
              <div className="px-6 pt-5 pb-3">
                <p className="text-[11px] text-gray-400 font-medium mb-4">Monthly Performance</p>

                <div className="flex items-end gap-2" style={{ height: "100px" }}>
                  {heights.map((h, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-[6px] transition-all duration-300"
                      style={{
                        height: `${h}%`,
                        backgroundColor: index === heights.length - 1 ? "#D42B2B" : "#F4B5B5",
                      }}
                    />
                  ))}
                </div>

                {/* Month labels row — separate from bars */}
                <div className="flex gap-2 mt-1">
                  {heights.map((_, index) => (
                    <span
                      key={index}
                      className="flex-1 text-center text-[10px] text-gray-400"
                    >
                      {MONTHS[index % MONTHS.length]}
                    </span>
                  ))}
                </div>
              </div>
              {/* Bottom stat row */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100">
                <div className="flex flex-col items-center py-4 gap-1">
                  <span style={{ color: "#D42B2B" }}>
                    <AlertIcon />
                  </span>
                  <p
                    className="text-[22px] font-extrabold leading-none"
                    style={{ color: "#D42B2B" }}
                  >
                    {alertsCount}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">Alerts</p>
                </div>

                <div className="flex flex-col items-center py-4 gap-1">
                  <span style={{ color: "#E07530" }}>
                    <TaskIcon />
                  </span>
                  <p
                    className="text-[22px] font-extrabold leading-none"
                    style={{ color: "#E07530" }}
                  >
                    {tasksCount}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">Tasks</p>
                </div>

                <div className="flex flex-col items-center py-4 gap-1">
                  <span style={{ color: "#2E72B8" }}>
                    <ActivityIcon />
                  </span>
                  <p
                    className="text-[22px] font-extrabold leading-none"
                    style={{ color: "#2E72B8" }}
                  >
                    {uptimeRate}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">Uptime</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}