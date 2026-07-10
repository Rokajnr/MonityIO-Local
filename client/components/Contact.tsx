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
    location,
  } = data;

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0D1117" }}
    >
      {/* Brand color bar at very top — structural */}
      <div className="h-1 w-full flex">
        <div className="flex-1" style={{ backgroundColor: "#D42B2B" }} />
        <div className="flex-1" style={{ backgroundColor: "#E07530" }} />
        <div className="flex-1" style={{ backgroundColor: "#F0B820" }} />
        <div className="flex-1" style={{ backgroundColor: "#2E72B8" }} />
      </div>

      {/* Decorative background blobs — structural */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.07] pointer-events-none"
        style={{ backgroundColor: "#2E72B8" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.07] pointer-events-none"
        style={{ backgroundColor: "#D42B2B" }}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">

          {/* ── LEFT: heading + CTAs ── */}
          <div className="flex-1 max-w-[600px]">

            {/* Logo — small, understated */}
            <Image
              src="/logo.png"
              alt="MonityIO"
              width={64}
              height={56}
              className="h-14 w-auto mb-10 opacity-70"
            />

            <h2
              className="font-[family-name:var(--font-serif)] text-[42px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-white mb-10"
              dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
            />

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              {primaryCtaLink && primaryCtaText && (
                
                 <a href={primaryCtaLink}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold text-white hover:opacity-90 active:scale-[0.98] transition-all"
                  style={{ backgroundColor: "#D42B2B" }}
                >
                  {primaryCtaText}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              )}
              {phone && (
                
                 <a href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
                  </svg>
                  {phone}
                </a>
              )}
            </div>
          </div>

          {/* ── RIGHT: contact details card ── */}
          <div className="lg:w-[320px] flex-shrink-0">
            <div
              className="rounded-2xl p-8 border"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-6" style={{ color: "#2E72B8" }}>
                Get in touch
              </p>

              <div className="flex flex-col gap-6">
                {email && (
                  <div>
                    <p className="text-[11px] text-white/30 font-medium uppercase tracking-widest mb-1">
                      Email
                    </p>
                    
                     <a href={`mailto:${email}`}
                      className="text-[15px] text-white/80 hover:text-white transition-colors font-medium"
                    >
                      {email}
                    </a>
                  </div>
                )}

                {phone && (
                  <div>
                    <p className="text-[11px] text-white/30 font-medium uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    
                      <a href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-[15px] text-white/80 hover:text-white transition-colors font-medium"
                    >
                      {phone}
                    </a>
                  </div>
                )}

                {location && (
                  <div>
                    <p className="text-[11px] text-white/30 font-medium uppercase tracking-widest mb-1">
                      Location
                    </p>
                    <p className="text-[15px] text-white/80 font-medium">{location}</p>
                  </div>
                )}
              </div>

              {/* Decorative brand dots — structural */}
              <div className="flex gap-2 mt-8">
                {["#D42B2B", "#E07530", "#F0B820", "#2E72B8"].map((color) => (
                  <div
                    key={color}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}