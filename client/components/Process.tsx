import { getHomepageData } from "@/api/homepage";
import ProcessStepper from "@/components/ProcessStepper";

export default async function Process() {
  const homepageData = await getHomepageData();
  const data = homepageData?.process;

  if (!data || !data.steps || data.steps.length === 0) return null;

  const { eyebrow, title = "", steps } = data;

  return (
    <section id="process" className="bg-[#F7F5F2] py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Section header — same Strapi fields as before */}
        <div className="mb-12 md:mb-14">
          {eyebrow && (
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-4">
              {eyebrow}
            </p>
          )}
          <h2
            className="font-[family-name:var(--font-serif)] text-[32px] md:text-[42px] font-extrabold leading-[1.1] tracking-tight text-[#0f1117]"
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
          />
        </div>

        {/* Interactive stepper — client component receives steps from Strapi */}
        <ProcessStepper steps={steps} />

      </div>
    </section>
  );
}