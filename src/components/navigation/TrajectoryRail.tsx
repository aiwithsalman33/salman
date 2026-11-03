"use client";

import { sectionIds, sections } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";

/** Desktop-only position indicator: one dot per section along a single line. */
export function TrajectoryRail() {
  const active = useActiveSection(sectionIds);
  const activeLabel = sections.find((s) => s.id === active)?.label;

  return (
    <nav aria-label="Page sections" className="rail hidden lg:flex">
      <ol className="rail-list">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? "location" : undefined}
              className="rail-link"
            >
              <span className="rail-dot" aria-hidden="true" />
              <span className="rail-label telemetry">{section.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <span className="rail-readout telemetry" aria-hidden="true">
        {activeLabel}
      </span>
    </nav>
  );
}
