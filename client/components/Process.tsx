import { getHomepageData } from "@/api/homepage";
import ProcessStepper from "@/components/ProcessStepper";

export default async function Process() {
  const homepageData = await getHomepageData();
  const data = homepageData?.process;

  if (!data || !data.steps || data.steps.length === 0) return null;

  const { eyebrow, title = "", steps } = data;const titleLines = title.split("\n");
const firstLine = titleLines[0] ?? "";
const restLines = titleLines.slice(1).join("\n");

return (
  <section id="process" className="bg-[#F7F5F2] py-20 md:py-28">
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">

      <div className="mb-14 md:mb-20">
        {eyebrow && (
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="font-[family-name:var(--font-serif)] leading-[1.08] tracking-tight text-[#0f1117]">
          {firstLine && (
            <span
              className="block text-[32px] md:text-[42px] font-extrabold"
              dangerouslySetInnerHTML={{ __html: firstLine }}
            />
          )}
          {restLines && (
            <span
              className="block text-[32px] md:text-[42px] font-extrabold mt-1"
              style={{ color: "#D42B2B" }}
              dangerouslySetInnerHTML={{ __html: restLines.replace(/\n/g, "<br />") }}
            />
          )}
        </h2>
      </div>

      <ProcessStepper steps={steps} />

    </div>
  </section>
);
}