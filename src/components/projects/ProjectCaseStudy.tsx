"use client";

import type { Ref } from "react";
import { X } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProvenanceTag } from "@/components/ui/Tag";

type ProjectCaseStudyProps = {
  ref: Ref<HTMLDialogElement>;
  project: Project | null;
  onClose: () => void;
};

/** Case-study sheet. A native modal dialog: focus is trapped, Escape closes, focus returns to the opener. */
export function ProjectCaseStudy({ ref, project, onClose }: ProjectCaseStudyProps) {
  return (
    <dialog
      ref={ref}
      aria-labelledby="case-title"
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
            <ProvenanceTag provenance={project.provenance} />
            <form method="dialog">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline-strong px-4 text-meta hover:border-signal hover:text-signal"
              >
                <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
                Close
              </button>
            </form>
          </header>

          <h2 id="case-title" className="display mt-10 text-h2">
            {project.title}
          </h2>
          <p className="mt-6 text-lead">{project.summary}</p>

          {project.facts.length > 0 && (
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="telemetry text-steel">{fact.label}</dt>
                  <dd className="telemetry mt-1 text-meta text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <h3 className="mt-12 text-meta font-semibold text-steel">Context</h3>
          <p className="mt-3 max-w-[60ch]">{project.context}</p>

          <h3 className="mt-10 text-meta font-semibold text-steel">What the work covered</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.focus.map((item) => (
              <li key={item} className="rounded-(--radius-tag) border border-hairline-strong px-2.5 py-1 text-meta">
                {item}
              </li>
            ))}
          </ul>

          {project.flow && (
            <figure className="mt-12 border border-hairline p-5 sm:p-6">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
                {project.flow.steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="h-px w-4 bg-signal/60" />}
                    <span className="telemetry rounded-full border border-signal/50 px-3 py-1.5 text-fg">{step}</span>
                  </li>
                ))}
              </ol>
              <figcaption className="mt-5 text-meta text-steel">{project.flow.caption}</figcaption>
            </figure>
          )}

          {project.note && <p className="mt-10 max-w-[60ch] text-meta text-steel">{project.note}</p>}
        </article>
      )}
    </dialog>
  );
}
