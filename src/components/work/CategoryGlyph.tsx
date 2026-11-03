import type { ReactNode } from "react";
import type { CategoryId } from "@/data/work";

/**
 * Animated identity for each work category, drawn in the category's accent (currentColor).
 * Motion is CSS (see .glyph-* in globals.css) and stops under reduced motion.
 */
export function CategoryGlyph({ id, className = "" }: { id: CategoryId; className?: string }) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true" focusable="false" className={`h-auto w-full ${className}`}>
      {glyphs[id]}
    </svg>
  );
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const box = { fill: "var(--color-void)", stroke: "currentColor", strokeWidth: 1.5 } as const;

const glyphs: Record<CategoryId, ReactNode> = {
  // Automation Lab: a trigger, three branching steps and an output, with data flowing along the links.
  automation: (
    <>
      <path className="glyph-flow" d="M44 80h40M112 80l34-36M112 80l34 36M112 80h34M174 44l26 36M174 116l26-36M174 80h26" {...line} />
      <circle cx="30" cy="80" r="14" {...box} />
      <rect x="84" y="66" width="28" height="28" rx="7" {...box} />
      <rect x="146" y="30" width="28" height="28" rx="7" {...box} />
      <rect x="146" y="66" width="28" height="28" rx="7" {...box} />
      <rect x="146" y="102" width="28" height="28" rx="7" {...box} />
      <circle className="glyph-pulse" cx="212" cy="80" r="12" fill="currentColor" />
    </>
  ),
  // Product Universe: a product world with two products in orbit.
  products: (
    <>
      <ellipse cx="120" cy="80" rx="96" ry="34" {...line} strokeOpacity="0.45" />
      <circle cx="120" cy="80" r="30" {...box} />
      <path d="M96 70c16 6 32 6 48 0M94 88c17 6 35 6 52 0" {...line} strokeOpacity="0.6" />
      <g className="glyph-orbit">
        <circle cx="216" cy="80" r="8" fill="currentColor" />
        <circle cx="24" cy="80" r="6" fill="currentColor" fillOpacity="0.6" />
      </g>
    </>
  ),
  // Business Solutions Hub: one hub serving four industries.
  solutions: (
    <>
      <path className="glyph-flow" d="M120 80 44 34M120 80l76-46M120 80 44 126M120 80l76 46" {...line} />
      {[
        [44, 34],
        [196, 34],
        [44, 126],
        [196, 126],
      ].map(([x, y], i) => (
        <rect key={i} className="glyph-pulse" style={{ animationDelay: `${i * 0.4}s` }} x={x - 13} y={y - 13} width="26" height="26" rx="6" {...box} />
      ))}
      <circle cx="120" cy="80" r="20" fill="currentColor" />
    </>
  ),
  // Creator Studio: an audio/video level meter.
  studio: (
    <>
      {[28, 52, 76, 100, 64, 112, 84, 120, 92, 56, 80, 44].map((h, i) => (
        <rect
          key={i}
          className="glyph-bar"
          style={{ animationDelay: `${(i % 5) * 0.15}s` }}
          x={18 + i * 18}
          y={80 - h / 2}
          width="8"
          height={h}
          rx="4"
          fill="currentColor"
          fillOpacity={i % 3 === 0 ? 1 : 0.6}
        />
      ))}
    </>
  ),
};
