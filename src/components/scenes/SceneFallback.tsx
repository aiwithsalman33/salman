import { useId } from "react";

/**
 * Static drawing of the intelligence core: shell, inner glow and five capability nodes on tilted orbits.
 * It is the hero visual until the 3D scene loads, and the permanent fallback without WebGL or with reduced motion.
 */
const C = 400;

const orbits = [
  { rx: 330, ry: 92, tilt: -18, node: 0.32 },
  { rx: 300, ry: 120, tilt: 24, node: 2.4 },
  { rx: 250, ry: 70, tilt: 62, node: 4.1 },
  { rx: 360, ry: 150, tilt: -52, node: 5.3 },
  { rx: 215, ry: 205, tilt: 0, node: 1.35 },
];

const hexagon = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i - Math.PI / 2;
  return [C + 96 * Math.cos(a), C + 96 * Math.sin(a)] as const;
});

const round = (n: number) => Math.round(n * 10) / 10;

export function SceneFallback({ className = "" }: { className?: string }) {
  const uid = `core${useId().replace(/[^\w-]/g, "")}`;
  const glowId = `${uid}-glow`;
  const depthId = `${uid}-depth`;

  return (
    <svg viewBox="0 0 800 800" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="var(--color-signal)" stopOpacity="0.55" />
          <stop offset="45%" stopColor="var(--color-signal)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={depthId}>
          <stop offset="0%" stopColor="var(--color-depth)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--color-depth)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={C} cy={C} r="390" fill={`url(#${depthId})`} />
      <circle cx={C} cy={C} r="210" fill={`url(#${glowId})`} />

      {orbits.map((o, i) => (
        <g key={i} transform={`rotate(${o.tilt} ${C} ${C})`}>
          <ellipse cx={C} cy={C} rx={o.rx} ry={o.ry} fill="none" stroke="var(--color-steel)" strokeOpacity="0.22" />
          <circle
            cx={round(C + o.rx * Math.cos(o.node))}
            cy={round(C + o.ry * Math.sin(o.node))}
            r={i === 0 ? 8 : 6}
            fill={i === 0 ? "var(--color-go)" : "var(--color-signal)"}
          />
        </g>
      ))}

      {/* Icosahedron-like shell: hexagon outline with spokes. */}
      <polygon
        points={hexagon.map(([x, y]) => `${round(x)},${round(y)}`).join(" ")}
        fill="none"
        stroke="var(--color-signal)"
        strokeOpacity="0.7"
        strokeWidth="1.25"
      />
      {hexagon.map(([x, y], i) => (
        <line key={i} x1={C} y1={C} x2={round(x)} y2={round(y)} stroke="var(--color-signal)" strokeOpacity="0.35" />
      ))}
      <circle cx={C} cy={C} r="34" fill="var(--color-signal)" fillOpacity="0.9" />
      <circle cx={C} cy={C} r="54" fill="none" stroke="var(--color-signal)" strokeOpacity="0.45" />
    </svg>
  );
}
