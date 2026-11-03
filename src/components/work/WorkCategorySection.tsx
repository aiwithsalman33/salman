import type { CSSProperties } from "react";
import { studioProposition, type WorkCategory } from "@/data/work";
import { RevealTitle } from "@/components/motion/RevealTitle";
import { CategoryGlyph } from "./CategoryGlyph";
import { ProjectShowcase } from "./ProjectShowcase";

/** One work category: its own section, accent, animated identity and project showcase. */
export function WorkCategorySection({ category }: { category: WorkCategory }) {
  const count = category.projects.length;
  const titleId = `${category.id}-title`;

  return (
    <section
      id={category.id}
      aria-labelledby={titleId}
      className="section"
      style={{ "--accent": `var(--color-${category.accent})` } as CSSProperties}
    >
      <div className="shell">
        <header className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-8">
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span aria-hidden="true" className="category-number display text-h2">
                {category.number}
              </span>
              <span className="telemetry text-(--accent)">{category.environment}</span>
            </p>
            {category.heading && <p className="mt-6 text-meta font-semibold text-steel">{category.title}</p>}
            <RevealTitle id={titleId} className={`display max-w-[20ch] text-h2 ${category.heading ? "mt-2" : "mt-6"}`}>
              {category.heading ?? category.title}
            </RevealTitle>
            <p className="mt-6 max-w-[56ch] text-lead text-steel">{category.intro}</p>
            <p className="telemetry mt-6 text-fg">
              {count} {count === 1 ? "project" : "projects"}
            </p>
          </div>
          {/* On desktop with 3D, the category's environment takes this spot (html[data-scene="3d"] hides the glyph). */}
          <div className="glyph-2d hidden text-(--accent) sm:block lg:col-span-4">
            <CategoryGlyph id={category.id} className="max-w-[320px] lg:ml-auto" />
          </div>
        </header>

        {category.id === "studio" && (
          <aside className="mt-12 max-w-[640px] border-l-2 border-(--accent) pl-6">
            <p className="text-lead font-semibold">{studioProposition.claim}</p>
            <p className="mt-2 text-meta text-steel">{studioProposition.footnote}</p>
          </aside>
        )}

        <div className="mt-14">
          <ProjectShowcase category={category} />
        </div>
      </div>
    </section>
  );
}
