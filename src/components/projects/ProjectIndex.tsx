"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { sceneState } from "@/lib/sceneBus";
import { Constellation } from "./Constellation";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { ProjectRow } from "./ProjectRow";

/** The project list is the accessible source of truth; the constellation mirrors hover and focus. */
export function ProjectIndex({ projects }: { projects: readonly Project[] }) {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
  }, [selected]);

  // Mirror the highlight into the 3D galaxy.
  const activeId = highlightedId ?? selected?.id ?? null;
  useEffect(() => {
    sceneState.highlightedProject = projects.findIndex((p) => p.id === activeId);
  }, [activeId, projects]);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
      <ul className="border-t border-hairline lg:col-span-7">
        {projects.map((project) => (
          <li key={project.id} className="border-b border-hairline">
            <ProjectRow project={project} onOpen={() => setSelected(project)} onHighlight={setHighlightedId} />
          </li>
        ))}
      </ul>

      <div className="hidden lg:col-span-5 lg:block">
        {/* Hidden once the 3D galaxy takes over (html[data-scene="3d"]); the column keeps its space. */}
        <div className="constellation-2d sticky top-[calc(var(--header-h)+48px)]">
          <Constellation projects={projects} activeId={activeId} />
        </div>
      </div>

      <ProjectCaseStudy ref={dialogRef} project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
