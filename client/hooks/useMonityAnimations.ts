"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useMonityAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // HERO
      gsap.from("h1", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // NAV FADE
      gsap.from("nav", {
        y: -20,
        opacity: 0,
        duration: 0.8,
      });

      // SECTIONS reveal
      gsap.utils.toArray("section").forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // FAQ animation
      gsap.from("#faq h2, #faq p", {
        scrollTrigger: {
          trigger: "#faq",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
      });

      // INDUSTRIES cards
      gsap.from("#industries .grid > div", {
        scrollTrigger: {
          trigger: "#industries",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
      });

      // STANDARDS split section
      gsap.from("#standards > div", {
        scrollTrigger: {
          trigger: "#standards",
          start: "top 80%",
        },
        x: (i) => (i === 0 ? -80 : 80),
        opacity: 0,
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, []);
}