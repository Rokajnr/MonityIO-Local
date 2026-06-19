export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col border border-zinc-900">
      <div className="flex-1 flex flex-col md:flex-row min-h-0">

        {/* Left content */}
        <div className="flex-1 flex flex-col items-start justify-center px-5 py-8 md:px-10 md:py-12">

          {/* <img
            src="/images/monityio-logo.svg"
            alt="MonityIO"
            className="w-[110px] md:w-[130px] mb-6 md:mb-8"
          /> */}

          <h1
            className="font-[family-name:var(--font-bricolage)] font-extrabold text-white tracking-tight mb-6 md:mb-8"
            style={{ fontSize: "clamp(2.3rem, 5.4vw, 4rem)", lineHeight: 1.05, letterSpacing: "-1px" }}
          >
            we build software that powers{" "}
            <span className="text-red-600 italic">business growth.</span>
          </h1>

          <div className="w-12 h-0.5 bg-orange-500 rounded-full mb-6 md:mb-8" />

          <p className="font-[family-name:var(--font-hanken)] font-light text-zinc-400 leading-relaxed max-w-md mb-8 md:mb-10 text-sm md:text-base">
            Custom software. Seamless integration. Smart solutions.
            <br />
            We help businesses innovate, automate and scale with confidence.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4 w-full sm:w-auto">
            
             <a href="mailto:info@monityio.com"
              className="font-[family-name:var(--font-hanken)] font-medium text-blue-400 hover:underline text-base md:text-lg"
            >
              info@monityio.com
            </a>
            <span className="hidden sm:inline text-zinc-600 text-xs">or</span>
            <button className="w-full sm:w-auto bg-zinc-100 text-zinc-950 hover:bg-white font-medium text-sm rounded-md px-5 py-3 sm:py-2.5 transition-colors">
              I have a project
            </button>
          </div>
        </div>

        {/* Right image panel */}
        <div className="relative w-full md:w-[45%] min-h-[440px] md:min-h-[400px] order-first md:order-last flex-shrink-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/assets/coming-soon-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <div
            className="absolute inset-0 md:bg-gradient-to-r"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(13,13,13,0.9) 100%)",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-2 px-5 py-4 md:px-10 border-t border-zinc-900">
        <span className="text-[11px] text-zinc-600 font-light">© 2026 MonityIO</span>
        <div className="flex gap-3 sm:gap-5">
          <span className="text-[11px] text-zinc-600">Development</span>
          <span className="text-[11px] text-zinc-600">UI &amp; UX design</span>
          <span className="text-[11px] text-zinc-600">Product strategy</span>
        </div>
      </div>
    </div>
  );
}