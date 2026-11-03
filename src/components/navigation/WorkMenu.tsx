"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { workCategories } from "@/data/work";

/** Desktop "Work" item: a disclosure that lists the four categories. Escape and outside clicks close it. */
export function WorkMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(event) => {
        if (!root.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="flex items-center">
        <a href="#work" className="py-2 font-medium text-steel transition-colors hover:text-fg">
          Work
        </a>
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="work-menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-1 grid size-7 place-items-center rounded-full text-steel transition-colors hover:text-fg"
        >
          <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={1.75} />
          <span className="sr-only">Work categories</span>
        </button>
      </div>

      {open && (
        <ul
          id="work-menu"
          className="absolute top-full left-1/2 mt-3 w-80 -translate-x-1/2 rounded-(--radius-dialog) border border-hairline-strong bg-graphite p-2 shadow-[0_24px_48px_rgb(0_0_0/0.45)]"
        >
          {workCategories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-void"
                style={{ color: `var(--color-${category.accent})` }}
              >
                <span className="telemetry">{category.number}</span>
                <span className="flex flex-col">
                  <span className="text-meta font-semibold text-fg">{category.title}</span>
                  <span className="telemetry text-steel">{category.environment}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
