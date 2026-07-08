import { getHomepageData } from "@/api/homepage";

const COLOR_CONFIG = {
  red: { border: "border-red-600", text: "text-red-600" },
  blue: { border: "border-blue-600", text: "text-blue-600" },
  yellow: { border: "border-yellow-500", text: "text-yellow-600" },
};

export default async function Standards() {
  const homepageData = await getHomepageData();
  const data = homepageData?.standards;

  if (!data) return null;

  const {
    visualTitle,
    visualDescription,
    eyebrow,
    title = "",
    description,
    ctaText,
    ctaLink,
    stats = []
  } = data;

  return (
    <section
      id="standards"
      className="grid grid-cols-1 lg:grid-cols-2 border-t border-[#DDD9D0] bg-[#F7F6F2]"
    >
      {/* LEFT VISUAL PANEL */}
      <div className="relative bg-zinc-950 min-h-[480px] flex flex-col justify-end p-10 overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Faint M logo */}
        <svg
          className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 opacity-10"
          viewBox="0 0 280 280"
          fill="none"
        >
          <path
            d="M20 240 L20 40 L140 160 L260 40 L260 240"
            stroke="white"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Color bar */}
        <div className="relative z-10 flex mb-6">
          <div className="h-[3px] flex-1 bg-red-600" />
          <div className="h-[3px] flex-1 bg-orange-500" />
          <div className="h-[3px] flex-1 bg-yellow-500" />
          <div className="h-[3px] flex-1 bg-blue-600" />
        </div>

        {/* Caption */}
        <div className="relative z-10 max-w-xs text-zinc-400 text-sm leading-6">
          {visualTitle && <p className="text-zinc-200 font-medium mb-2">{visualTitle}</p>}
          {visualDescription && <p>{visualDescription}</p>}
        </div>
      </div>

      {/* RIGHT CONTENT PANEL */}
      <div className="p-10 lg:p-16 flex flex-col justify-center border-l border-[#DDD9D0]">
        {eyebrow && (
          <span className="uppercase tracking-widest text-xs text-zinc-500 mb-4">
            {eyebrow}
          </span>
        )}

        <h2
          className="font-[family-name:var(--font-serif)] text-[36px] md:text-[46px] font-extrabold leading-[1.1] tracking-tight"
          dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
        />

        {description && (
          <p className="text-zinc-600 leading-8 mb-10 max-w-xl">
            {description}
          </p>
        )}

        {ctaLink && ctaText && (
          <a
            href={ctaLink}
            className="self-start bg-zinc-900 text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition"
          >
            {ctaText}
          </a>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-8 mt-10">
            {stats.map((stat, i) => {
              const config = COLOR_CONFIG[stat.color] || COLOR_CONFIG.red;
              return (
                <div key={i} className={`border-t-2 ${config.border} pt-4 flex-1`}>
                  <div className={`text-3xl font-serif ${config.text} stat-num`}>{stat.value}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
