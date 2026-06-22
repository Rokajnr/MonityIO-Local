"use client";

import { useEffect, useState } from "react";

export default function Home() {
  return (
    <>
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

      {/* CTA */}
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