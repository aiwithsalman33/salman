"use client";

import type { Ref } from "react";
import { X } from "lucide-react";
import type { Project } from "@/data/work";
import { ButtonLink } from "@/components/ui/Button";
import { WorkflowDiagram } from "./WorkflowDiagram";

type ProjectDetailProps = {
  ref: Ref<HTMLDialogElement>;
  project: Project | null;
  categoryId: string;
  categoryTitle: string;
  onClose: () => void;
};

/** Project detail sheet. A native modal dialog: focus is trapped, Escape closes, focus returns to the opener. */
export function ProjectDetail({ ref, project, categoryId, categoryTitle, onClose }: ProjectDetailProps) {
  const titleId = `${categoryId}-detail-title`;
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="case-sheet"
    >
      {project && (
        <article className="flex min-h-full flex-col px-5 pb-12 sm:px-10">
          <header className="sticky top-0 z-10 -mx-5 flex items-center justify-between gap-4 border-b border-hairline bg-graphite px-5 py-4 sm:-mx-10 sm:px-10">
            <p className="telemetry flex items-center gap-2 text-steel">
              <span aria-hidden="true" className="size-2 rounded-full bg-(--accent)" />
              {categoryTitle}
            </p>
            <form method="dialog">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline-strong px-4 text-meta font-medium hover:border-signal hover:text-signal"
              >
                <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
                Close
              </button>
            </form>
          </header>

          <p className="telemetry mt-10 text-(--accent)">{project.industry}</p>
          <h2 id={titleId} className="display mt-3 text-h2">
            {project.title}
          </h2>
          <p className="mt-6 text-lead text-steel">{project.summary}</p>

          {project.link && (
            <div className="mt-8">
              <ButtonLink href={project.link.href} external>
                {project.link.label}
              </ButtonLink>
            </div>
          )}

          <DetailBlock title="The problem">{project.problem}</DetailBlock>
          <DetailBlock title="The solution">{project.solution}</DetailBlock>

          <h3 className="mt-12 text-meta font-semibold text-steel">How the workflow works</h3>
          <div className="mt-5">
            <WorkflowDiagram steps={project.workflow.steps} illustrative={project.workflow.illustrative} />
          </div>

          <h3 className="mt-12 text-meta font-semibold text-steel">Key capabilities</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {project.capabilities.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-(--accent)" />
                {item}
              </li>
            ))}
          </ul>

          {project.tech && project.tech.length > 0 && (
            <>
              <h3 className="mt-12 text-meta font-semibold text-steel">Technologies</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="telemetry rounded-(--radius-tag) border border-hairline-strong px-2.5 py-1 text-fg">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.note && <p className="mt-12 max-w-[60ch] text-meta text-steel">{project.note}</p>}
        </article>
      )}
    </dialog>
  );
}

function DetailBlock({ title, children }: { title: string; children: string }) {
  return (
    <>
      <h3 className="mt-12 text-meta font-semibold text-steel">{title}</h3>
      <p className="mt-3 max-w-[60ch]">{children}</p>
    </>
  );
}
