"use client";

import { useEffect, useState } from "react";
import { useMonityAnimations } from "@/hooks/useMonityAnimations";

export default function Home() {
  useMonityAnimations();
  const [isScrolled, setIsScrolled] = useState(false);

  const faqs = [
    {
      question: "How quickly can we expect to see results?",
      answer:
        "Most organizations see their first live dashboard within a few weeks. Initial insights are typically delivered within 4–8 weeks depending on system complexity and data readiness.",
    },
    {
      question: "Do we need to replace our current systems?",
      answer:
        "No. MonityIO is an intelligence layer that connects to your existing systems, spreadsheets, databases and operational tools.",
    },
    {
      question: "What kinds of organizations do you work with?",
      answer:
        "We work with NGOs, government agencies, SMEs, construction firms, infrastructure programmes and logistics operators.",
    },
    {
      question: "How do you handle security and access control?",
      answer:
        "Role-based permissions, audit trails and secure data handling practices are included in every deployment.",
    },
    {
      question:
        "How is MonityIO different from traditional reporting consultancies?",
      answer:
        "Traditional reporting explains what happened. MonityIO provides continuous visibility into what is happening now and where action is needed.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        id="cursor"
        className="fixed w-2 h-2 bg-[#111110] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F6F2]/90 backdrop-blur border-b border-[#DDD9D0]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <img
            src="/logo.png"
            alt="MonityIO"
            className="h-8 w-auto"
          />

          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
            <a href="#process">Process</a>
            <a href="#features">Platform</a>
            <a href="#industries">Industries</a>
            <a href="#faq">FAQ</a>
          </div>

          <a
            href="#contact"
            className="bg-[#E8291C] text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            Request Pilot
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen bg-[#F7F6F2] pt-32 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Color Stripe */}
          <div className="h-1 w-full flex mb-16">
            <div className="flex-1 bg-[#E8291C]" />
            <div className="flex-1 bg-[#E07020]" />
            <div className="flex-1 bg-[#F0B020]" />
            <div className="flex-1 bg-[#2B6CB8]" />
          </div>

          <div className="uppercase tracking-[0.2em] text-xs font-semibold text-zinc-500 mb-8">
            Operations Intelligence Platform
          </div>

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
          >
            Your data,
            <br />
            finally <i>working</i>
            <br />
            for <span className="text-[#E8291C]">you.</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <p className="max-w-md text-zinc-600 text-lg leading-8">
              MonityIO transforms scattered operational data into clear,
              real-time intelligence so your organization acts on facts,
              not guesswork.
            </p>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <a
                href="#contact"
                className="bg-[#E8291C] text-white px-8 py-4 rounded-full font-semibold"
              >
                Request a Pilot →
              </a>

              <a
                href="#process"
                className="border border-[#DDD9D0] px-8 py-4 rounded-full font-semibold"
              >
                Explore Process ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="border-t border-[#DDD9D0] bg-[#F7F6F2]"
      >
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-[220px_1fr] gap-12 mb-24">
            <div className="uppercase tracking-[0.2em] text-xs text-zinc-500">
              Our Process
            </div>

            <h2
              className="
                font-[family-name:var(--font-serif)]
                text-5xl
                leading-tight
              "
            >
              One conversation triggers intelligence.
              <br />
              <i>Your systems unified into a single truth.</i>
            </h2>
          </div>

          <div className="space-y-20">

            <div className="grid lg:grid-cols-[120px_1fr_1fr] gap-10">
              <div className="text-7xl text-red-500">01</div>

              <h3 className="font-[family-name:var(--font-serif)] text-3xl">
                Assessment,
                <br />
                <i>accelerated</i>
              </h3>

              <p className="text-zinc-600 leading-8">
                We map your systems, data flows and operational gaps
                in days rather than months.
              </p>
            </div>

            <div className="grid lg:grid-cols-[120px_1fr_1fr] gap-10">
              <div className="text-7xl text-orange-500">02</div>

              <h3 className="font-[family-name:var(--font-serif)] text-3xl">
                Structured,
                <br />
                <i>verified</i>
              </h3>

              <p className="text-zinc-600 leading-8">
                We connect your systems into a trusted data layer,
                ensuring every source is validated and reconciled.
              </p>
            </div>

            <div className="grid lg:grid-cols-[120px_1fr_1fr] gap-10">
              <div className="text-7xl text-yellow-500">03</div>

              <h3 className="font-[family-name:var(--font-serif)] text-3xl">
                Visible in
                <br />
                <i>real time</i>
              </h3>

              <p className="text-zinc-600 leading-8">
                Live dashboards deliver intelligence to executives,
                field teams and auditors simultaneously.
              </p>
            </div>

            <div className="grid lg:grid-cols-[120px_1fr_1fr] gap-10">
              <div className="text-7xl text-blue-500">04</div>

              <h3 className="font-[family-name:var(--font-serif)] text-3xl">
                Confident
                <br />
                <i>decisions</i>
              </h3>

              <p className="text-zinc-600 leading-8">
                Thresholds, alerts and decision support help teams
                act before problems become losses.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section
        id="dashboard"
        className="border-t border-[#DDD9D0] bg-[#F7F6F2]"
      >
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="uppercase tracking-[0.2em] text-xs text-zinc-500 mb-6">
                Real-Time Intelligence
              </div>

              <h2
                className="
                  font-[family-name:var(--font-serif)]
                  text-5xl
                  leading-tight
                  mb-8
                "
              >
                Every metric.
                <br />
                Every project.
                <br />
                <i>One source of truth.</i>
              </h2>

              <p className="text-zinc-600 leading-8 max-w-lg">
                Track operational performance, budgets,
                compliance indicators, field activities,
                procurement, logistics and executive KPIs
                from a single intelligence platform.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DDD9D0] bg-white p-6 shadow-sm">

              <div className="grid grid-cols-2 gap-4 mb-4">

                <div className="bg-[#FAFAF8] rounded-xl p-5">
                  <div className="text-xs text-zinc-500 mb-2">
                    Projects Active
                  </div>
                  <div className="text-4xl font-bold text-[#111110]">
                    128
                  </div>
                </div>

                <div className="bg-[#FAFAF8] rounded-xl p-5">
                  <div className="text-xs text-zinc-500 mb-2">
                    Compliance
                  </div>
                  <div className="text-4xl font-bold text-[#2B6CB8]">
                    97%
                  </div>
                </div>

              </div>

              <div className="bg-[#FAFAF8] rounded-xl p-5 mb-4">
                <div className="text-xs text-zinc-500 mb-3">
                  Monthly Performance
                </div>

                <div className="flex items-end gap-3 h-32">
                  {[40,65,55,80,70,95].map((h) => (
                    <div
                      key={h}
                      className="flex-1 rounded-t-md bg-[#E8291C]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">

                <div className="text-center">
                  <div className="text-2xl font-semibold text-[#E8291C]">
                    12
                  </div>
                  <div className="text-xs text-zinc-500">
                    Alerts
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-semibold text-[#E07020]">
                    84
                  </div>
                  <div className="text-xs text-zinc-500">
                    Tasks
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-semibold text-[#2B6CB8]">
                    99.8%
                  </div>
                  <div className="text-xs text-zinc-500">
                    Uptime
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-t border-[#DDD9D0] bg-[#F7F6F2]"
      >
        <div className="max-w-7xl mx-auto px-6 py-24">

          <h2
            className="
              font-[family-name:var(--font-serif)]
              text-5xl
              mb-16
            "
          >
            Designed for modern operations.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 border border-[#DDD9D0]">
            {[
              "Rapid Activation",
              "Deep Data Audit",
              "Role-Based Dashboards",
              "Continuous Monitoring",
            ].map((item) => (
              <div
                key={item}
                className="p-8 border-r border-[#DDD9D0] last:border-r-0"
              >
                <h3 className="font-semibold mb-3">{item}</h3>
                <p className="text-sm text-zinc-600 leading-7">
                  Built to provide operational visibility and
                  intelligence without replacing existing systems.
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STANDARDS */}
      <section
        id="standards"
        className="grid grid-cols-1 lg:grid-cols-2 border-t border-[#DDD9D0] bg-[#F7F6F2]"
      >

        {/* LEFT VISUAL PANEL */}
        <div className="relative bg-zinc-950 min-h-[480px] flex flex-col justify-end p-10 overflow-hidden">

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Faint M logo */}
          <svg
            className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -translate-x-1/2 -translate-y-1/2 opacity-10"
            viewBox="0 0 280 280"
            fill="none"
          >
            <path
              d="M20 240 L20 40 L140 160 L260 40 L260 240"
              stroke="white"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Color bar */}
          <div className="relative z-10 flex mb-6">
            <div className="h-[3px] flex-1 bg-red-600" />
            <div className="h-[3px] flex-1 bg-orange-500" />
            <div className="h-[3px] flex-1 bg-yellow-500" />
            <div className="h-[3px] flex-1 bg-blue-600" />
          </div>

          {/* Caption */}
          <div className="relative z-10 max-w-xs text-zinc-400 text-sm leading-6">
            <p className="text-zinc-200 font-medium mb-2">
              Real-time operational visibility
            </p>
            <p>
              Every data point verified. Every alert meaningful. Zero noise in,
              zero guesswork out.
            </p>
          </div>

        </div>

        {/* RIGHT CONTENT PANEL */}
        <div className="p-10 lg:p-16 flex flex-col justify-center border-l border-[#DDD9D0]">

          <span className="uppercase tracking-widest text-xs text-zinc-500 mb-4">
            The MonityIO Standard
          </span>

          <h2 className="text-4xl lg:text-5xl leading-tight font-serif mb-6">
            Enterprise-grade standards on{" "}
            <i className="text-zinc-500">every deployment.</i>
          </h2>

          <p className="text-zinc-600 leading-8 mb-10 max-w-xl">
            Modeled on best-practice intelligence environments, we enforce data
            integrity, access control, and auditability at every layer. No
            unverified data reaches decision-makers.
          </p>

          <button className="self-start bg-zinc-900 text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition">
            Explore Our Approach →
          </button>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-8 mt-10">

            <div className="border-t-2 border-red-600 pt-4 flex-1">
              <div className="text-3xl font-serif text-red-600">4–8</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                Weeks to first insight
              </div>
            </div>

            <div className="border-t-2 border-blue-600 pt-4 flex-1">
              <div className="text-3xl font-serif text-blue-600">360°</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                Operational coverage
              </div>
            </div>

            <div className="border-t-2 border-yellow-500 pt-4 flex-1">
              <div className="text-3xl font-serif text-yellow-600">Zero</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                Systems replaced
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* INDUSTRIES */}
      <section
        id="industries"
        className="border-t border-[#DDD9D0] bg-[#F7F6F2]"
      >
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 mb-16">

            <h2
              className="
                font-[family-name:var(--font-serif)]
                text-5xl
                leading-tight
              "
            >
              Built for organizations
              <br />
              running the <i>real economy.</i>
            </h2>

            <p className="max-w-md text-zinc-600 leading-8">
              We specialize in complex, multi-stakeholder environments where
              operational visibility is not optional — it is mission critical.
            </p>

          </div>

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-5
              border
              border-[#DDD9D0]
            "
          >

            {[
              {
                icon: "🌍",
                title: "NGOs & Development",
                tag: "Donor compliance · Field operations",
              },
              {
                icon: "🏛",
                title: "Government & Public Sector",
                tag: "Programmes · Budgets · Delivery",
              },
              {
                icon: "🏢",
                title: "SMEs & Enterprises",
                tag: "Performance · Financial visibility",
              },
              {
                icon: "🏗",
                title: "Construction & Infrastructure",
                tag: "Projects · Compliance · Progress",
              },
              {
                icon: "🚚",
                title: "Logistics & Supply Chain",
                tag: "Routes · Inventory · Deliveries",
              },
            ].map((sector) => (
              <div
                key={sector.title}
                className="
                  p-8
                  border-r
                  border-[#DDD9D0]
                  last:border-r-0
                  hover:bg-[#F0EDE6]
                  transition-colors
                "
              >
                <div className="text-3xl mb-4">
                  {sector.icon}
                </div>

                <h3
                  className="
                    font-[family-name:var(--font-serif)]
                    text-xl
                    leading-snug
                    mb-3
                  "
                >
                  {sector.title}
                </h3>

                <p className="text-xs uppercase tracking-widest text-zinc-500">
                  {sector.tag}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-t border-[#DDD9D0] bg-[#F7F6F2]"
      >
        <div className="max-w-5xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-12 mb-16">

            <h2
              className="
                font-[family-name:var(--font-serif)]
                text-5xl
                leading-tight
              "
            >
              How it works
              <br />
              and how we
              <br />
              deliver.
            </h2>

            <p className="text-zinc-600 leading-8">
              Everything you need to know before your first conversation with us.
            </p>

          </div>

          <div>

            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="border-t border-[#DDD9D0]"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="
                    w-full
                    flex
                    justify-between
                    items-center
                    py-7
                    text-left
                  "
                >
                  <span className="font-medium">
                    {faq.question}
                  </span>

                  <div
                    className={`
                      w-8 h-8
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      transition-all
                      ${
                        openFaq === index
                          ? "bg-[#E8291C] border-[#E8291C] text-white"
                          : "border-[#DDD9D0]"
                      }
                    `}
                  >
                    {openFaq === index ? "−" : "+"}
                  </div>
                </button>

                <div
                  className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                      openFaq === index
                        ? "max-h-96 pb-8"
                        : "max-h-0"
                    }
                  `}
                >
                  <p className="text-zinc-600 leading-8 max-w-3xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-[#DDD9D0]" />

          </div>

        </div>
      </section>

      {/* CTA/ Contact */}
      <section
        id="contact"
        className="bg-[#F7F6F2] border-t border-[#DDD9D0]"
      >
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">

          <img
            src="/logo.png"
            alt="MonityIO"
            className="h-12 w-auto mx-auto mb-10"
          />

          <h2
            className="
              font-[family-name:var(--font-serif)]
              text-[clamp(3rem,7vw,6rem)]
              leading-none
              tracking-tight
              mb-12
            "
          >
            See your operations
            <br />
            <i>clearly.</i>
            <br />
            Start <span className="text-[#E8291C]">now.</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@monityio.com"
              className="bg-[#E8291C] text-white px-8 py-4 rounded-full"
            >
              Request a Pilot
            </a>

            <a
              href="tel:+265999478629"
              className="border border-[#DDD9D0] px-8 py-4 rounded-full"
            >
              +265 999 478 629
            </a>
          </div>

        </div>
      </section>
    </>
  );
}