"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

interface NavLink {
  text: string;
  url: string;
}

interface MobileNavProps {
  navbarLinks: NavLink[];
  navbarCtaText?: string;
  navbarCtaLink?: string;
}

export default function MobileNav({
  navbarLinks,
  navbarCtaText,
  navbarCtaLink,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!panelRef.current) return;

    const linkItems = linksRef.current ? Array.from(linksRef.current.children) : [];

    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(panelRef.current, { display: "flex" });
      gsap.fromTo(
        panelRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" }
      );
      gsap.fromTo(
        linkItems,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.15, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";

      gsap.to(panelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => {
          if (panelRef.current) gsap.set(panelRef.current, { display: "none" });
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Hamburger toggle */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="relative z-50 w-9 h-9 flex flex-col items-center justify-center gap-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 rounded-full"
      >
        <span
          className="block h-[2px] w-6 rounded-full bg-[#0f1117] transition-transform duration-300 ease-out"
          style={{ transform: isOpen ? "translateY(7px) rotate(45deg)" : "none" }}
        />
        <span
          className="block h-[2px] w-6 rounded-full bg-[#0f1117] transition-opacity duration-200 ease-out"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        <span
          className="block h-[2px] w-6 rounded-full bg-[#0f1117] transition-transform duration-300 ease-out"
          style={{ transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
        />
      </button>

      {/* Slide-down mobile menu panel */}
      <div
        ref={panelRef}
        className="absolute top-full left-0 right-0 flex-col overflow-hidden bg-[#F7F6F2] border-b border-[#DDD9D0] shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
        style={{ display: "none", height: 0, opacity: 0 }}
      >
        <div ref={linksRef} className="flex flex-col px-6 py-6 gap-0">
          {navbarLinks.map((link, i) => (
            <Link
              key={i}
              href={link.url}
              onClick={closeMenu}
              className="text-[15px] font-medium text-zinc-700 py-3.5 border-b border-[#DDD9D0] last:border-b-0"
            >
              {link.text}
            </Link>
          ))}

          {navbarCtaLink && navbarCtaText && (
            <Link
              href={navbarCtaLink}
              onClick={closeMenu}
              className="mt-5 inline-flex items-center justify-center bg-[#E8291C] px-4 py-3 rounded-full text-sm font-semibold text-white"
            >
              {navbarCtaText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}