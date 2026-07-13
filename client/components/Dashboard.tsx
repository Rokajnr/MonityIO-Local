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
    <section
      id="dashboard"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#EAF0F8" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── LEFT: text ── */}
          <div className="flex-1 max-w-[460px] flex flex-col">

            {eyebrow && (
              <p
                className="text-[11px] font-bold tracking-[0.18em] uppercase mb-6"
                style={{ color: "#2E72B8" }}
              >
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

            {/* Capability pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CAPABILITY_PILLS.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] font-medium px-4 py-1.5 rounded-full text-gray-600 bg-transparent border border-gray-300"
                >
                  {tag}
                </span>
              ))}
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

          {/* ── RIGHT: image + floating card ── */}
          <div className="flex-[1.2] w-full">
            <div className="relative rounded-2xl overflow-hidden" style={{ height: "520px" }}>

              {/* Placeholder — replace with <Image> once asset is ready
              <div className="w-full h-full bg-gray-300 rounded-2xl" /> */}

              <Image
                src="/bg-image-dashboard-sec-2.jpg"
                alt="MonityIO platform"
                fill
                className="object-cover rounded-2xl"
              />

              {/* Dashboard card overlaid at bottom */}
              <div className="absolute bottom-5 left-5 right-5 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] overflow-hidden">

                {/* ── KPI row: stacks cleanly on mobile ── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border-b border-gray-100">

                  {/* Projects active */}
                  <div className="px-4 py-3 border-r border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium mb-0.5">Projects Active</p>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <p className="text-[26px] font-extrabold text-[#0f1117] leading-none">
                        {projectsActiveCount}
                      </p>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        +24% this quarter
                      </span>
                    </div>
                  </div>

                  {/* Compliance */}
                  <div className="px-4 py-3 sm:border-r border-gray-100">
                    <p className="text-[10px] text-gray-400 font-medium mb-0.5">Compliance</p>
                    <p className="text-[26px] font-extrabold leading-none" style={{ color: "#2E72B8" }}>
                      {complianceRate}
                    </p>
                  </div>

                  {/* Period — hidden on smallest screens */}
                  <div className="hidden sm:flex px-4 py-3 items-center">
                    <button className="text-[12px] text-gray-500 font-medium flex items-center gap-1">
                      Monthly
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ── Chart + stats ── */}
                <div className="flex flex-col sm:flex-row items-stretch">

                  {/* Bar chart */}
                  <div className="flex-1 px-4 pt-3 pb-2">
                    <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-2">
                      Monthly Performance
                    </p>

                    {/* FIX: bars are direct children of fixed-height container — no nested wrapper */}
                    <div
                      className="flex items-end gap-1.5"
                      style={{ height: "52px" }}
                    >
                      {heights.map((h, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-[3px]"
                          style={{
                            height: `${h}%`,
                            backgroundColor:
                              index === heights.length - 1 ? "#D42B2B" : "#F4B5B5",
                          }}
                        />
                      ))}
                    </div>

                    {/* Month labels — separate row */}
                    <div className="flex gap-1.5 mt-1">
                      {heights.map((_, index) => (
                        <span
                          key={index}
                          className="flex-1 text-center text-[9px] text-gray-400"
                        >
                          {MONTHS[index % MONTHS.length]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Divider — horizontal on mobile, vertical on sm+ */}
                  <div className="h-px sm:h-auto sm:w-px bg-gray-100 mx-4 sm:mx-0 sm:my-3" />

                  {/* Stats column */}
                  <div className="flex flex-row sm:flex-col justify-around sm:justify-center gap-2 px-4 py-3 sm:min-w-[100px]">
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#D42B2B" }}><AlertIcon /></span>
                      <div>
                        <p className="text-[15px] font-extrabold leading-none" style={{ color: "#D42B2B" }}>
                          {alertsCount}
                        </p>
                        <p className="text-[9px] text-gray-400">Alerts</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#E07530" }}><TaskIcon /></span>
                      <div>
                        <p className="text-[15px] font-extrabold leading-none" style={{ color: "#E07530" }}>
                          {tasksCount}
                        </p>
                        <p className="text-[9px] text-gray-400">Tasks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#2E72B8" }}><ActivityIcon /></span>
                      <div>
                        <p className="text-[15px] font-extrabold leading-none" style={{ color: "#2E72B8" }}>
                          {uptimeRate}
                        </p>
                        <p className="text-[9px] text-gray-400">Uptime</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}