import type { CSSProperties } from "react";
import { workCategories } from "@/data/work";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Work overview: the four categories as an index into their sections. */
export function WorkIntroSection() {
  const total = workCategories.reduce((n, c) => n + c.projects.length, 0);

  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="shell">
        <SectionHeading
          id="work-title"
          intro={`${total} projects across four areas, from n8n agents to founder marketing. Each one opens its own environment.`}
        >
          Selected work
        </SectionHeading>

        <ol className="mt-14 border-t border-hairline">
          {workCategories.map((category) => (
            <li key={category.id} style={{ "--accent": `var(--color-${category.accent})` } as CSSProperties}>
              <a
                href={`#${category.id}`}
                className="group grid gap-x-6 gap-y-1 border-b border-hairline py-6 transition-colors sm:grid-cols-[4rem_1fr_auto] sm:items-baseline"
              >
                <span className="display text-h3 text-(--accent)">{category.number}</span>
                <span>
                  <span className="block text-h3 font-semibold transition-colors group-hover:text-(--accent)">{category.title}</span>
                  <span className="telemetry mt-1 block text-steel">{category.environment}</span>
                </span>
                <span className="telemetry text-steel">
                  {category.projects.length} {category.projects.length === 1 ? "project" : "projects"}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
