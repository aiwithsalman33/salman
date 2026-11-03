import type { Project } from "@/data/projects";

// Hand-placed node positions (viewBox 600×520), in the same order as `projects`.
const positions = [
  [150, 120],
  [330, 80],
  [470, 190],
  [400, 330],
  [210, 300],
  [90, 430],
  [510, 440],
] as const;

const links: readonly [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [4, 5],
  [3, 6],
  [1, 3],
];

/** Decorative mirror of the project list; the list itself is the accessible source. */
export function Constellation({ projects, activeId }: { projects: readonly Project[]; activeId: string | null }) {
  const activeIndex = projects.findIndex((p) => p.id === activeId);

  return (
    <svg viewBox="0 0 600 520" aria-hidden="true" focusable="false" className="h-auto w-full">
      {links.map(([a, b]) => {
        const lit = a === activeIndex || b === activeIndex;
        return (
          <line
            key={`${a}-${b}`}
            x1={positions[a][0]}
            y1={positions[a][1]}
            x2={positions[b][0]}
            y2={positions[b][1]}
            stroke={lit ? "var(--color-signal)" : "var(--color-steel)"}
            strokeOpacity={lit ? 0.6 : 0.18}
          />
        );
      })}

      {projects.map((project, i) => {
        const [x, y] = positions[i % positions.length];
        const lit = i === activeIndex;
        return (
          <g key={project.id}>
            {lit && <circle cx={x} cy={y} r="26" fill="var(--color-signal)" fillOpacity="0.14" />}
            <circle
              cx={x}
              cy={y}
              r={lit ? 9 : 5}
              fill={lit ? "var(--color-signal)" : "var(--color-void)"}
              stroke={lit ? "var(--color-signal)" : "var(--color-steel)"}
              strokeWidth="1.5"
            />
            {lit && (
              <text
                x={x}
                y={y - 22}
                textAnchor="middle"
                fill="var(--color-fg)"
                style={{ font: "500 13px var(--font-mono)" }}
              >
                {project.title.length > 26 ? `${project.title.slice(0, 24)}…` : project.title}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
