"use client";

import type { KeyboardEvent, PointerEvent, Ref } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { Project } from "@/data/work";

const MAX_TILT = 2.5;
const spring = { stiffness: 180, damping: 20, mass: 0.5 };

type ProjectTabProps = {
  ref: Ref<HTMLButtonElement>;
  id: string;
  panelId: string;
  project: Project;
  selected: boolean;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

/** Desktop project tab: subtle tilt and a cursor-following light for mouse users. */
export function ProjectTab({ ref, id, panelId, project, selected, onSelect, onKeyDown }: ProjectTabProps) {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function handleMove(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    // Light position goes straight to CSS variables: no re-render per pointer move.
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    if (reduce) return;
    rotateY.set((px - 0.5) * 2 * MAX_TILT);
    rotateX.set((0.5 - py) * 2 * MAX_TILT);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      role="tab"
      id={id}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="project-row group flex w-full cursor-pointer items-baseline gap-4 border-b border-hairline py-5 text-left"
    >
      <span
        aria-hidden="true"
        className={`size-2 shrink-0 translate-y-[-0.1em] rounded-full transition-colors ${selected ? "bg-(--accent)" : "bg-hairline-strong"}`}
      />
      <span className="flex flex-col gap-1">
        <span className={`text-lead font-semibold transition-colors ${selected ? "text-(--accent)" : "group-hover:text-fg"}`}>
          {project.title}
        </span>
        <span className="telemetry text-steel">{project.industry}</span>
      </span>
    </motion.button>
  );
}
