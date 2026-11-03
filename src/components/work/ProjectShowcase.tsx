"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Project, WorkCategory } from "@/data/work";
import { sceneState } from "@/lib/sceneBus";
import { buttonClass, ButtonLink } from "@/components/ui/Button";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectTab } from "./ProjectTab";
import { WorkflowDiagram } from "./WorkflowDiagram";

/**
 * Interactive project exploration for one category.
 * Desktop: a tab list of projects beside a live preview. Phones: a list where each project opens its details.
 */
export function ProjectShowcase({ category }: { category: WorkCategory }) {
  const { projects } = category;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [detail, setDetail] = useState<Project | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (detail && dialog && !dialog.open) dialog.showModal();
  }, [detail]);

  // Light the matching object in this category's 3D environment.
  useEffect(() => {
    sceneState.highlight[category.id] = selectedIndex;
  }, [category.id, selectedIndex]);

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const last = projects.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (selectedIndex + 1) % projects.length
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? (selectedIndex - 1 + projects.length) % projects.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setSelectedIndex(next);
    tabs.current[next]?.focus();
  }

  const selected = projects[selectedIndex];
  const tabId = (p: Project) => `${category.id}-tab-${p.id}`;
  const panelId = `${category.id}-panel`;

  return (
    <>
      {/* Phones and tablets */}
      <ul className="border-t border-hairline lg:hidden">
        {projects.map((project) => (
          <li key={project.id} className="border-b border-hairline">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => setDetail(project)}
              className="flex w-full cursor-pointer flex-col gap-2 py-6 text-left"
            >
              <span className="telemetry text-(--accent)">{project.industry}</span>
              <span className="text-h3 font-semibold">{project.title}</span>
              <span className="line-clamp-3 text-steel">{project.summary}</span>
              <span className="text-meta font-semibold text-(--accent) underline underline-offset-4">View details</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Desktop */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" aria-label={`${category.title} projects`} className="border-t border-hairline lg:col-span-5">
          {projects.map((project, i) => (
            <ProjectTab
              key={project.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={tabId(project)}
              panelId={panelId}
              project={project}
              selected={i === selectedIndex}
              onSelect={() => setSelectedIndex(i)}
              onKeyDown={handleTabKey}
            />
          ))}
        </div>

        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(selected)}
          tabIndex={0}
          className="preview-panel self-start rounded-(--radius-dialog) border border-hairline bg-graphite/90 p-8 backdrop-blur-sm lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:col-span-7"
        >
          <div key={selected.id} className="preview-content">
            <p className="telemetry text-(--accent)">{selected.industry}</p>
            <h3 className="mt-2 text-h3 font-semibold">{selected.title}</h3>
            <p className="mt-4 text-steel">{selected.summary}</p>

            <div className="mt-8 grid gap-8 xl:grid-cols-2">
              <WorkflowDiagram steps={selected.workflow.steps} illustrative={selected.workflow.illustrative} compact />
              <div>
                <p className="text-meta font-semibold text-steel">Key capabilities</p>
                <ul className="mt-3 flex flex-col gap-2 text-meta">
                  {selected.capabilities.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-(--accent)" />
                      {item}
                    </li>
                  ))}
                </ul>
                {selected.tech && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {selected.tech.map((t) => (
                      <li key={t} className="telemetry rounded-(--radius-tag) border border-hairline-strong px-2 py-0.5">
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" aria-haspopup="dialog" onClick={() => setDetail(selected)} className={buttonClass("outline", "md")}>
                View details
              </button>
              {selected.link && (
                <ButtonLink href={selected.link.href} external>
                  {selected.link.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProjectDetail ref={dialogRef} project={detail} categoryId={category.id} categoryTitle={category.title} onClose={() => setDetail(null)} />
    </>
  );
}
