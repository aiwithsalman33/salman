import type { CSSProperties } from "react";

type WorkflowDiagramProps = {
  steps: readonly string[];
  illustrative: boolean;
  compact?: boolean;
};

/**
 * A workflow as a vertical pipeline. The steps light up in sequence (CSS, off under reduced motion).
 * Illustrative diagrams say so: they are simplified examples, never screenshots of the real system.
 */
export function WorkflowDiagram({ steps, illustrative, compact = false }: WorkflowDiagramProps) {
  return (
    <figure>
      <ol className={`workflow ${compact ? "gap-2" : "gap-3"}`} style={{ "--n": steps.length } as CSSProperties}>
        {steps.map((step, i) => (
          <li key={step} className="workflow-step" style={{ "--i": i } as CSSProperties}>
            <span className="workflow-index" aria-hidden="true">
              {i + 1}
            </span>
            <span className={compact ? "text-meta" : "text-body"}>{step}</span>
          </li>
        ))}
      </ol>
      <figcaption className="telemetry mt-4 text-steel">
        {illustrative ? "Illustrative workflow with sample steps, not a screenshot" : "How the workflow runs"}
      </figcaption>
    </figure>
  );
}
