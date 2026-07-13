import { getHomepageData } from "@/api/homepage";

export default async function Industries() {
  const homepageData = await getHomepageData();
  const data = homepageData?.industries;

  if (!data || !data.sectors || data.sectors.length === 0) return null;

  const {
    title = "",
    description,
    sectors
  } = data;

  return (
    <section id="industries" className="border-t border-[#DDD9D0] bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 mb-16">
          <h2
            className="
              font-[family-name:var(--font-serif)] text-[36px] md:text-[46px] font-extrabold leading-[1.1] tracking-tight text-[#0f1117]
            "
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
          />

          {description && (
            <p className="max-w-md text-zinc-600 leading-8">
              {description}
            </p>
          )}
        </div>

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-5
            border
            border-[#DDD9D0]
          "
        >
          {sectors.map((sector, i) => (
            <div
              key={i}
              className="
                p-8
                border-r
                border-[#DDD9D0]
                last:border-r-0
                hover:bg-[#F0EDE6]
                transition-colors
              "
            >
              <div className="text-3xl mb-4">{sector.icon}</div>

              <h3
                className="
                  font-[family-name:var(--font-sans)]
                  text-base
                  font-semibold
                  leading-snug
                  mb-3
                "
              >
                {sector.title}
              </h3>

              {sector.tag && (
                <p className="text-xs uppercase tracking-widest text-zinc-500">{sector.tag}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="rounded-[2rem] bg-[#10121A] px-5 py-6 sm:px-7 sm:py-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base sm:text-lg leading-7 max-w-xl">
              <span className="text-zinc-400 font-normal">Don&apos;t see your sector?</span>
              <span className="text-white font-semibold"> MonityIO adapts to any data environment.</span>
            </p>

            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#E8291C] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(232,41,28,0.25)] transition hover:bg-[#c31d17] sm:w-auto"
            >
              Talk to our team
              <span className="ml-2 text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
