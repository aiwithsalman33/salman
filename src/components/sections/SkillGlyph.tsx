import type { ReactNode } from "react";
import type { SkillGroupId } from "@/data/skills";

const stroke = { fill: "none", stroke: "var(--color-signal)", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const node = { fill: "var(--color-graphite)", stroke: "var(--color-signal)", strokeWidth: 1.5 } as const;

/** Small illustrative diagram for each skill group. */
export function SkillGlyph({ id }: { id: SkillGroupId }) {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true" focusable="false" className="h-auto w-full max-w-[320px]">
      {glyphs[id]}
    </svg>
  );
}

const glyphs: Record<SkillGroupId, ReactNode> = {
  // An agent loop with three tools around it.
  ai: (
    <>
      <circle cx="120" cy="60" r="34" {...stroke} strokeDasharray="4 6" />
      <circle cx="120" cy="60" r="14" fill="var(--color-signal)" />
      <path d="M154 60h36M86 60H50M120 26V10" {...stroke} strokeOpacity="0.6" />
      <rect x="190" y="48" width="24" height="24" rx="5" {...node} />
      <rect x="26" y="48" width="24" height="24" rx="5" {...node} />
      <rect x="108" y="0" width="24" height="12" rx="4" {...node} />
    </>
  ),
  // Trigger → three steps → output.
  automation: (
    <>
      <path d="M36 60h40M104 60l34-30M104 60l34 30M166 30l38 30M166 90l38-30" {...stroke} strokeOpacity="0.6" />
      <circle cx="24" cy="60" r="12" {...node} />
      <rect x="78" y="46" width="28" height="28" rx="6" {...node} />
      <rect x="140" y="16" width="28" height="28" rx="6" {...node} />
      <rect x="140" y="76" width="28" height="28" rx="6" {...node} />
      <circle cx="214" cy="60" r="12" fill="var(--color-go)" />
    </>
  ),
  // Waveform bars.
  voice: (
    <>
      {[18, 34, 52, 70, 44, 86, 60, 96, 72, 40, 64, 30, 50, 22].map((h, i) => (
        <rect
          key={i}
          x={14 + i * 16}
          y={60 - h / 2}
          width="6"
          height={h}
          rx="3"
          fill={i === 7 ? "var(--color-go)" : "var(--color-signal)"}
          fillOpacity={i === 7 ? 1 : 0.75}
        />
      ))}
    </>
  ),
  // An application window with panels.
  product: (
    <>
      <rect x="30" y="10" width="180" height="100" rx="10" {...node} />
      <path d="M30 30h180" {...stroke} strokeOpacity="0.6" />
      <circle cx="44" cy="20" r="3" fill="var(--color-signal)" />
      <circle cx="56" cy="20" r="3" fill="var(--color-signal)" fillOpacity="0.5" />
      <rect x="44" y="42" width="52" height="54" rx="5" {...stroke} strokeOpacity="0.6" />
      <path d="M110 48h86M110 64h66M110 80h76" {...stroke} strokeOpacity="0.6" />
      <rect x="110" y="88" width="34" height="10" rx="5" fill="var(--color-go)" />
    </>
  ),
  // Script → voice → avatar → edit → publish.
  creative: (
    <>
      <path d="M38 60h168" {...stroke} strokeOpacity="0.5" />
      {[24, 72, 120, 168, 216].map((x, i) => (
        <circle key={x} cx={x} cy="60" r="12" {...(i === 4 ? { fill: "var(--color-go)" } : node)} />
      ))}
    </>
  ),
  // A funnel narrowing to a conversion.
  growth: (
    <>
      <path d="M30 16h180l-60 44v40l-60 12V60Z" {...node} />
      <path d="M60 38h120M90 60h60" {...stroke} strokeOpacity="0.5" />
      <circle cx="120" cy="104" r="6" fill="var(--color-go)" />
    </>
  ),
};
