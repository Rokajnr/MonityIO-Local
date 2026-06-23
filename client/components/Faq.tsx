import { getHomepageData } from "@/api/homepage";
import FaqList from "./FaqList";

export default async function Faq() {
  const homepageData = await getHomepageData();
  const data = homepageData?.faq;

  if (!data || !data.faqs || data.faqs.length === 0) return null;

  const {
    title = "",
    subtitle,
    faqs
  } = data;

  return (
    <section id="faq" className="border-t border-[#DDD9D0] bg-[#F7F6F2]">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <h2
            className="
              font-[family-name:var(--font-serif)]
              text-5xl
              leading-tight
            "
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
          />

          {subtitle && (
            <p className="text-zinc-600 leading-8">
              {subtitle}
            </p>
          )}
        </div>

        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}
