import { getHomepageData } from "@/api/homepage";

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
    chartHeights = []
  } = data;

  const heights = chartHeights.map((ch) => ch.height);

  return (
    <section id="dashboard" className="border-t border-[#DDD9D0] bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-6">
              {eyebrow}
            </div>

            <h2
              className="
                font-[family-name:var(--font-serif)]
                text-5xl
                leading-tight
                mb-8
              "
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
            />

            <p className="text-zinc-600 leading-8 max-w-lg">
              {description}
            </p>
          </div>

          <div className="rounded-2xl border border-[#DDD9D0] bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#FAFAF8] rounded-xl p-5">
                <div className="text-xs text-zinc-500 mb-2">Projects Active</div>
                <div className="text-4xl font-bold text-[#111110]">{projectsActiveCount}</div>
              </div>

              <div className="bg-[#FAFAF8] rounded-xl p-5">
                <div className="text-xs text-zinc-500 mb-2">Compliance</div>
                <div className="text-4xl font-bold text-[#2B6CB8]">{complianceRate}</div>
              </div>
            </div>

            <div className="bg-[#FAFAF8] rounded-xl p-5 mb-4">
              <div className="text-xs text-zinc-500 mb-3">Monthly Performance</div>

              <div className="flex items-end gap-3 h-32">
                {heights.map((h, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-[#E8291C]"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-[#E8291C]">{alertsCount}</div>
                <div className="text-xs text-zinc-500">Alerts</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-semibold text-[#E07020]">{tasksCount}</div>
                <div className="text-xs text-zinc-500">Tasks</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-semibold text-[#2B6CB8]">{uptimeRate}</div>
                <div className="text-xs text-zinc-500">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
