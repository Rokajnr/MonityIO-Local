import { getHomepageData } from "@/api/homepage";

export default async function Features() {
  const homepageData = await getHomepageData();
  const data = homepageData?.features;

  if (!data || !data.items || data.items.length === 0) return null;

  const { title = "", items } = data;

  return (
    <section id="features" className="border-t border-[#DDD9D0] bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {title && (
          <h2 className="font-[family-name:var(--font-serif)] text-[36px] md:text-[46px] font-extrabold leading-[1.1] tracking-tight text-[#0f1117] pd-8 mb-16">
            {title}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-[#DDD9D0]">
          {items.map((item, i) => (
            <div
              key={i}
              className={`p-8 border-r border-[#DDD9D0] last:border-r-0 feature-card fc-${item.color}`}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-2xl">
                {item.icon}
              </div>
              <h3 className="font-semibold mb-3">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-zinc-600 leading-7">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
