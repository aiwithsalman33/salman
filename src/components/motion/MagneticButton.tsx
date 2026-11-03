"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

const MAX_OFFSET = 6;
const spring = { stiffness: 260, damping: 18, mass: 0.4 };

/** Pulls its child up to 6px toward a mouse pointer. No effect for touch, pen or reduced motion. */
export function MagneticButton({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * MAX_OFFSET);
    y.set(Math.max(-1, Math.min(1, dy)) * MAX_OFFSET);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span className="inline-flex" style={{ x, y }} onPointerMove={handleMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
