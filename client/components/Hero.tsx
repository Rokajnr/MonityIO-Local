import Link from "next/link";
import { getHomepageData } from "@/api/homepage";

export default async function Hero() {
  const homepageData = await getHomepageData();

  if (!homepageData?.hero) return null;

  const {
    eyebrow,
    title = "",
    description,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink,
  } = homepageData.hero;

  return (
    <section className="relative min-h-screen bg-[#F7F6F2] pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Color Stripe */}
        <div className="h-1 w-full flex mb-16">
          <div className="flex-1 bg-[#E8291C]" />
          <div className="flex-1 bg-[#E07020]" />
          <div className="flex-1 bg-[#F0B020]" />
          <div className="flex-1 bg-[#2B6CB8]" />
        </div>

        {eyebrow && (
          <div
            id="hero-eyebrow"
            className="uppercase tracking-[0.2em] text-xs font-semibold text-zinc-500 mb-8 hero-eyebrow"
          >
            {eyebrow}
          </div>
        )}

        <h1
          className="
            font-[family-name:var(--font-serif)]
            text-[#111110]
            leading-[0.9]
            tracking-[-0.04em]
            mb-12
          "
          style={{
            fontSize: "clamp(4rem,8vw,9rem)",
          }}
          dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
        />

        <div
          id="hero-bottom"
          className="grid lg:grid-cols-2 gap-12 items-end hero-bottom"
        >
          {description && (
            <p className="max-w-md text-zinc-600 text-lg leading-8">
              {description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 lg:justify-end">
            {primaryCtaLink && primaryCtaText && (
              <Link
                href={primaryCtaLink}
                className="bg-[#E8291C] text-white px-8 py-4 rounded-full font-semibold"
              >
                {primaryCtaText}
              </Link>
            )}

            {secondaryCtaLink && secondaryCtaText && (
              <Link
                href={secondaryCtaLink}
                className="border border-[#DDD9D0] px-8 py-4 rounded-full font-semibold"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        id="hero-scroll"
        className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-zinc-400"
      >
        <span>scroll</span>
        <div className="scroll-line w-px h-9 bg-gradient-to-b from-zinc-400 to-transparent" />
      </div>
    </section>
  );
}
