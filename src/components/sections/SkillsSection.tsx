import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBank } from "./SkillBank";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="shell">
        <SectionHeading id="skills-title" intro="Six areas, grouped by what they're for. Open one to see the tools and practices in it.">
          Skills
        </SectionHeading>
        <div className="mt-14">
          <SkillBank groups={skillGroups} />
        </div>
      </div>
    </section>
  );
}
