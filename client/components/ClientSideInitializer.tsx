"use client";

import { useMonityAnimations } from "@/hooks/useMonityAnimations";

export default function ClientSideInitializer() {
  useMonityAnimations();
  return (
    <div
      id="cursor"
      className="fixed w-2 h-2 bg-[#111110] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
