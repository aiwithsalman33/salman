"use client";

import type { PointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import type { Project } from "@/data/projects";
import { ProvenanceTag } from "@/components/ui/Tag";

const MAX_TILT = 2.5;
const spring = { stiffness: 180, damping: 20, mass: 0.5 };

type ProjectRowProps = {
  project: Project;
  onOpen: () => void;
  onHighlight: (id: string | null) => void;
};

/** A project in the index: subtle tilt and a cursor-following light for mouse users; plain button otherwise. */
export function ProjectRow({ project, onOpen, onHighlight }: ProjectRowProps) {
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
    onHighlight(null);
  }

  return (
    <motion.button
      type="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onPointerEnter={() => onHighlight(project.id)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onFocus={() => onHighlight(project.id)}
      onBlur={() => onHighlight(null)}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="project-row group flex w-full cursor-pointer flex-col gap-3 py-7 text-left sm:py-8"
    >
      <ProvenanceTag provenance={project.provenance} />
      <span className="display text-h3 transition-colors group-hover:text-signal group-focus-visible:text-signal">
        {project.title}
      </span>
      <span className="max-w-[56ch] text-steel">{project.summary}</span>
      <span className="text-meta font-medium text-signal underline decoration-signal/40 underline-offset-4">
        Read the case study
      </span>
    </motion.button>
  );
}
