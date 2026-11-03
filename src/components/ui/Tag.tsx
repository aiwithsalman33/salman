import type { Provenance } from "@/data/provenance";

/** Provenance label: shape + text, so the meaning never depends on color alone. */
export function ProvenanceTag({ provenance, className = "" }: { provenance: Provenance; className?: string }) {
  return (
    <span className={`telemetry inline-flex items-center gap-2 text-steel ${className}`}>
      <ProvenanceGlyph kind={provenance.kind} />
      {provenance.label}
    </span>
  );
}

function ProvenanceGlyph({ kind }: { kind: Provenance["kind"] }) {
  const common = { width: 10, height: 10, viewBox: "0 0 10 10", "aria-hidden": true, className: "shrink-0" } as const;
  if (kind === "employer") {
    return (
      <svg {...common}>
        <rect x="1" y="1" width="8" height="8" fill="none" stroke="var(--color-signal)" strokeWidth="1.5" />
      </svg>
    );
  }
  if (kind === "learning") {
    return (
      <svg {...common}>
        <path d="M5 1 9 9H1Z" fill="none" stroke="var(--color-go)" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="5" cy="5" r="4" fill="none" stroke="var(--color-fg)" strokeWidth="1.5" />
    </svg>
  );
}
