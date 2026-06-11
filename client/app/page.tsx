import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between selection:bg-zinc-800 selection:text-white">
      
      {/* Navigation Bar */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              MONITY<span className="text-zinc-500">IO</span>
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link 
              href="/articles" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <a 
              href="http://localhost:1337/admin" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              CMS Admin
            </a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 md:py-24 flex flex-col justify-center gap-16 md:gap-24">
        
        {/* Hero Section */}
        <section className="text-center md:text-left md:max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 text-xs font-medium text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Observability System
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Observe everything, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">
              instantly.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed">
            Welcome to MonityIO. We build next-generation observation, headless content distribution, and modular React services designed to help enterprise systems scale seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              href="/articles"
              className="w-full sm:w-auto h-12 px-8 rounded-full bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              📖 Explore Articles
            </Link>
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-12 px-8 rounded-full border border-zinc-800 bg-zinc-900/20 text-zinc-300 font-semibold hover:bg-zinc-900 transition-colors flex items-center justify-center"
            >
              Manage CMS Console
            </a>
          </div>
        </section>

        {/* Bento/Features Grid */}
        <section className="grid gap-6 md:grid-cols-3">
          
          {/* Card 1: Observability */}
          <div className="group rounded-3xl border border-zinc-900 bg-zinc-900/20 p-8 hover:border-zinc-800 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800">
              📈
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Metrics Observability</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Track infrastructure, api endpoints, and system response latency with ultra-high resolution telemetry.
            </p>
          </div>

          {/* Card 2: Headless CMS */}
          <div className="group rounded-3xl border border-zinc-900 bg-zinc-900/20 p-8 hover:border-zinc-800 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Headless Strapi Engine</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Dynamically load blogs, team data, layouts, and page parameters through our modular, headless Strapi 5 configuration.
            </p>
          </div>

          {/* Card 3: Modern Tech */}
          <div className="group rounded-3xl border border-zinc-900 bg-zinc-900/20 p-8 hover:border-zinc-800 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800">
              ⚛️
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Next.js & React 19</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Engineered using React Server Components (RSC) and strict TypeScript interfaces for sub-second page performance.
            </p>
          </div>

        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div>
            &copy; {new Date().getFullYear()} MonityIO. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://nextjs.org" className="hover:text-zinc-400">Next.js</a>
            <a href="https://strapi.io" className="hover:text-zinc-400">Strapi</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
