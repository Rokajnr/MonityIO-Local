import Image from "next/image";
import { getHomepageData } from "@/api/homepage";

export default async function Contact() {
  const homepageData = await getHomepageData();
  const data = homepageData?.contact;

  if (!data) return null;

  const {
    title = "",
    primaryCtaText,
    primaryCtaLink,
    phone,
    email,
    location
  } = data;

  return (
    <section id="contact" className="bg-[#F7F6F2] border-t border-[#DDD9D0]">
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div id="cta-logo" className="cta-logo-center">
          <Image
            src="/logo.png"
            alt="MonityIO"
            width={60}
            height={48}
            className="h-12 w-auto mx-auto mb-10"
          />
        </div>

        <h2
          id="cta-title"
          className="
            font-[family-name:var(--font-serif)]
            text-[clamp(3rem,7vw,6rem)]
            leading-none
            tracking-tight
            mb-12
            cta-title
          "
          dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
        />

        <div className="flex flex-wrap justify-center gap-4 cta-actions" id="cta-actions">
          {primaryCtaLink && primaryCtaText && (
            <a
              href={primaryCtaLink}
              className="bg-[#E8291C] text-white px-8 py-4 rounded-full btn-large red-btn"
            >
              {primaryCtaText} <span className="btn-arrow">→</span>
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="border border-[#DDD9D0] px-8 py-4 rounded-full btn-large outline"
            >
              {phone}
            </a>
          )}
        </div>

        {(email || location) && (
          <div className="contact-note mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            {email && (
              <a href={`mailto:${email}`} className="text-zinc-600 hover:text-zinc-900 transition">
                {email}
              </a>
            )}
            {email && location && <span className="text-zinc-400">·</span>}
            {location && <span className="text-zinc-400">{location}</span>}
          </div>
        )}
      </div>
    </section>
  );
}
