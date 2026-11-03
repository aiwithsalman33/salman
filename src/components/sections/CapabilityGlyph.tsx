import type { ReactNode } from "react";
import type { CapabilityId } from "@/data/capabilities";

const stroke = { fill: "none", stroke: "var(--color-signal)", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const node = { fill: "var(--color-graphite)", stroke: "var(--color-signal)", strokeWidth: 1.5 } as const;

/** Small illustrative diagram for each capability module. */
export function CapabilityGlyph({ id }: { id: CapabilityId }) {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true" focusable="false" className="h-auto w-full max-w-[320px]">
      {glyphs[id]}
    </svg>
  );
}

const glyphs: Record<CapabilityId, ReactNode> = {
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
  // An agent loop with three tools around it.
  agents: (
    <>
      <circle cx="120" cy="60" r="34" {...stroke} strokeDasharray="4 6" />
      <circle cx="120" cy="60" r="14" fill="var(--color-signal)" />
      <path d="M154 60h36M86 60H50M120 26V10" {...stroke} strokeOpacity="0.6" />
      <rect x="190" y="48" width="24" height="24" rx="5" {...node} />
      <rect x="26" y="48" width="24" height="24" rx="5" {...node} />
      <rect x="108" y="0" width="24" height="12" rx="4" {...node} />
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
  // An incoming and an outgoing message.
  whatsapp: (
    <>
      <path d="M20 22h120a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10H40l-14 12V62h-6a10 10 0 0 1-10-10V32a10 10 0 0 1 10-10Z" {...stroke} />
      <path d="M100 64h110a10 10 0 0 1 10 10v20a10 10 0 0 1-10 10h-6v12l-14-12h-90a10 10 0 0 1-10-10V74a10 10 0 0 1 10-10Z" fill="var(--color-signal)" fillOpacity="0.16" stroke="var(--color-signal)" strokeWidth="1.5" />
      <path d="M30 42h80M114 84h80" {...stroke} strokeOpacity="0.5" />
    </>
  ),
  // Script → voice → avatar → edit → publish.
  content: (
    <>
      <path d="M38 60h168" {...stroke} strokeOpacity="0.5" />
      {[24, 72, 120, 168, 216].map((x, i) => (
        <circle key={x} cx={x} cy="60" r="12" {...(i === 4 ? { fill: "var(--color-go)" } : node)} />
      ))}
    </>
  ),
};
