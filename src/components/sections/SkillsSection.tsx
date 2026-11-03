import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="shell">
        <SectionHeading id="skills-title" intro="Grouped by what they're for, not listed as badges.">
          Skills
        </SectionHeading>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {skillGroups.map((group) => (
            <div key={group.id} className="border-t border-hairline-strong pt-6">
              <h3 className="text-lead font-semibold">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-2.5 text-steel">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-signal/70" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
