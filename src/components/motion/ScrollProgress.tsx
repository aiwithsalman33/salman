"use client";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Publishes page scroll progress (0–1) as --scroll-progress on <html>.
 * The rail fill (desktop) and the header bar (mobile) read it in CSS.
 */
export function ScrollProgress() {
  useGSAP(() => {
    const root = document.documentElement;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => root.style.setProperty("--scroll-progress", self.progress.toFixed(4)),
    });
  });

  return null;
}
