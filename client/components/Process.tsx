import { getHomepageData } from "@/api/homepage";

const COLOR_MAP = {
  red: {
    colorClass: "ps-red",
    numColorClass: "text-red-500",
    tagColorClass: "bg-red-100 text-red-700 tag-red"
  },
  orange: {
    colorClass: "ps-orange",
    numColorClass: "text-orange-500",
    tagColorClass: "bg-orange-100 text-orange-700 tag-orange"
  },
  gold: {
    colorClass: "ps-gold",
    numColorClass: "text-yellow-500",
    tagColorClass: "bg-yellow-100 text-yellow-700 tag-gold"
  },
  blue: {
    colorClass: "ps-blue",
    numColorClass: "text-blue-500",
    tagColorClass: "bg-blue-100 text-blue-700 tag-blue"
  }
};

export default async function Process() {
  const homepageData = await getHomepageData();
  const data = homepageData?.process;

  if (!data || !data.steps || data.steps.length === 0) return null;

  const eyebrow = data.eyebrow;
  const title = data.title || "";
  const steps = data.steps;

  return (
    <section id="process" className="border-t border-[#DDD9D0] bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[220px_1fr] gap-12 mb-24">
          <div className="uppercase tracking-[0.2em] text-xs text-zinc-500">
            {eyebrow}
          </div>

          <h2 
            className="font-[family-name:var(--font-serif)] text-5xl leading-tight"
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
          />
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => {
            const config = COLOR_MAP[step.color] || COLOR_MAP.red;
            return (
              <div
                key={index}
                className={`grid lg:grid-cols-[120px_1fr_1fr] gap-10 process-step ${config.colorClass}`}
              >
                <div className={`text-7xl ${config.numColorClass} step-num`}>{step.num}</div>

                <h3 
                  className="font-[family-name:var(--font-serif)] text-3xl step-title"
                  dangerouslySetInnerHTML={{ __html: step.title.replace(/\n/g, "<br />") }}
                />

                <div>
                  <p className="text-zinc-600 leading-8 step-body">{step.description}</p>
                  <span className={`inline-block mt-4 text-xs font-bold uppercase px-3 py-1 rounded-full step-tag ${config.tagColorClass}`}>
                    {step.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
