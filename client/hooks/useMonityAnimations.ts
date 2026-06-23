"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export function useMonityAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── NAV + TICKER on scroll
      window.addEventListener("scroll", () => {
        const scrolled = window.scrollY > 20;
        const nav = document.getElementById("main-nav");
        const ticker = document.getElementById("ticker-bar");
        if (nav) {
          nav.classList.toggle("scrolled", scrolled);
          gsap.to(nav, { boxShadow: scrolled ? "0 4px 12px rgba(0,0,0,0.08)" : "0 0px 0px rgba(0,0,0,0)", duration: 0.3 });
        }
        if (ticker) ticker.classList.toggle("visible", scrolled);
      });

      // ── HERO ENTRANCE TIMELINE ──
      gsap.set(["h1", "#hero-eyebrow", "#hero-bottom", "#hero-scroll"], { opacity: 0, y: 20 });

      const heroTl = gsap.timeline({ delay: 0.25 });
      heroTl
        .to("h1", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.35)
        .to("#hero-eyebrow", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.2)
        .to("#hero-bottom", { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.55)
        .to("#hero-scroll", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.75);

      // Color stripe
      gsap.fromTo(
        ".h-1",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.out", transformOrigin: "left" }
      );

      // ── CURSOR TRACKING ──
      const cursor = document.getElementById("cursor");
      if (cursor) {
        document.addEventListener("mousemove", (e) => {
          gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
        });

        document.querySelectorAll("a, button, .process-step, .feature-card, .sector-card, .btn-large").forEach((el) => {
          el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
          el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
        });
      }

      // ── HERO ENTRANCE TIMELINE ──
      gsap.to("#hero-scroll", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: "#hero-scroll",
          start: "top 50%",
          end: "top -20%",
          scrub: 1,
        },
      });

      // ── PROCESS STEPS with enhanced animations ──
      gsap.utils.toArray(".process-step > *").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 22, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.2)",
            scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none reverse" },
          }
        );

        // Hover effect
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)", duration: 0.3, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, boxShadow: "0 0px 0px rgba(0,0,0,0)", duration: 0.3, ease: "power2.out" });
        });
      });

      // ── FEATURE CARDS with stagger and scale ──
      gsap.utils.toArray("#features .grid > div").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            delay: i * 0.09,
            ease: "back.out(1.3)",
            scrollTrigger: { trigger: "#features", start: "top 72%", toggleActions: "play none none reverse" },
          }
        );

        // Advanced hover with rotation
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -6, rotateZ: 0.5, boxShadow: "0 20px 40px rgba(232,41,28,0.12)", duration: 0.4, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, rotateZ: 0, boxShadow: "0 0px 0px rgba(0,0,0,0)", duration: 0.4, ease: "power2.out" });
        });
      });

      // ── STANDARDS section with blur effect ──
      gsap.fromTo(
        "#standards > div:first-child",
        { opacity: 0, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: "#standards", start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        "#standards > div:last-child",
        { opacity: 0, x: 20, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "#standards", start: "top 72%", toggleActions: "play none none reverse" },
        }
      );

      // ── STAT NUMBERS with spring animation ──
      document.querySelectorAll(".stat-num").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.fromTo(
              el,
              { opacity: 0, y: 15, scale: 0.8 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
            ),
        });
      });

      // ── INDUSTRIES/SECTORS cards with advanced stagger ──
      gsap.utils.toArray("#industries .grid > div, #sectors .grid > div").forEach((el: any, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20, rotateY: 15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: el.closest("section"),
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3D tilt on hover
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", duration: 0.3, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, boxShadow: "0 0px 0px rgba(0,0,0,0)", duration: 0.3, ease: "power2.out" });
        });
      });

      // ── CTA SECTION with entrance pop ──
      gsap.fromTo(
        "#cta-logo",
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: "#contact, #cta", start: "top 78%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        "#cta-title",
        { opacity: 0, y: 30, letterSpacing: "-0.05em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0em",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "#contact, #cta", start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        "#cta-actions",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: "#contact, #cta", start: "top 75%", toggleActions: "play none none reverse" },
        }
      );

      // ── DASHBOARD SECTION animations ──
      gsap.fromTo(
        "#dashboard > div > div > div:first-child, #dashboard > div > div > div:nth-child(2)",
        { opacity: 0, x: (i) => (i === 0 ? -40 : 40), filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: { trigger: "#dashboard", start: "top 72%", toggleActions: "play none none reverse" },
        }
      );

      // ── INTERACTIVE BUTTONS hover effects ──
      document.querySelectorAll(".btn-large, a.px-8").forEach((btn: any) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "back.out(1.2)", overwrite: "auto" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { scale: 1, duration: 0.3, ease: "back.out(1.2)", overwrite: "auto" });
        });
      });

      // ── SCROLL PROGRESS indicator ──
      const progressBar = document.createElement("div");
      progressBar.className = "fixed top-0 left-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-blue-500 z-[100]";
      progressBar.style.width = "0%";
      document.body.appendChild(progressBar);

      window.addEventListener("scroll", () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        gsap.to(progressBar, { width: scrolled + "%", duration: 0.3, ease: "power1.out" });
      });

      // ── FLOATING animation for decorative elements ──
      gsap.to(".ticker-dot", {
        y: -5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.1,
      });
    });

    return () => ctx.revert();
  }, []);
}