"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useMonityAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── CURSOR TRACKING ──
      const cursor = document.getElementById("cursor");
      if (cursor) {
        document.addEventListener("mousemove", (e) => {
          gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
        });

        document.querySelectorAll("a, button, .process-step, .feature-card, .sector-card").forEach((el) => {
          el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
          el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
        });
      }

      // ── HERO ENTRANCE TIMELINE ──
      gsap.set(["h1", ".hero-eyebrow", ".hero-bottom", ".hero-scroll"], { opacity: 0, y: 20 });

      const heroTl = gsap.timeline({ delay: 0.25 });
      heroTl
        .to("h1", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.35)
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.2)
        .to(".hero-bottom", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.55)
        .to(".hero-scroll", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.75);

      // Color stripe
      gsap.fromTo(
        ".h-1",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.out", transformOrigin: "left" }
      );

      // ── PROCESS STEPS ──
      gsap.utils.toArray(".grid.lg\\:grid-cols-\\[120px_1fr_1fr\\] > div").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none reverse" },
          }
        );
      });

      // ── FEATURE CARDS staggered ──
      gsap.utils.toArray("#features .grid > div").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: i * 0.09,
            ease: "power2.out",
            scrollTrigger: { trigger: "#features", start: "top 72%", toggleActions: "play none none reverse" },
          }
        );
      });

      // ── STANDARDS section ──
      gsap.fromTo(
        "#standards > div:first-child",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: "#standards", start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        "#standards > div:last-child",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "#standards", start: "top 72%", toggleActions: "play none none reverse" },
        }
      );

      // ── STAT NUMBERS ──
      document.querySelectorAll(".stat-num").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.fromTo(
              el,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.5)" }
            ),
        });
      });

      // ── INDUSTRIES/SECTORS cards ──
      gsap.utils.toArray("#industries .grid > div, #sectors .grid > div").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el.closest("section"),
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── CTA SECTION ──
      gsap.fromTo(
        "#cta-logo, .cta-logo-center",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: "#contact, #cta", start: "top 78%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        "#cta-title, .cta-title",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "#contact, #cta", start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        "#cta-actions, .cta-actions",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: "#contact, #cta", start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      // ── DASHBOARD SECTION animations ──
      gsap.fromTo(
        "#dashboard > div > div:first-child, #dashboard > div > div:nth-child(2)",
        { opacity: 0, x: (i) => (i === 0 ? -40 : 40) },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: { trigger: "#dashboard", start: "top 72%", toggleActions: "play none none reverse" },
        }
      );
    });

    return () => ctx.revert();
  }, []);
}