import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectIndex } from "@/components/projects/ProjectIndex";

export function ProjectsSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="shell">
        <SectionHeading
          id="work-title"
          intro="Employer projects, a learning module and independent builds. Each one is labelled with who it was built for."
        >
          Selected work
        </SectionHeading>
        <div className="mt-14">
          <ProjectIndex projects={projects} />
        </div>
      </div>
    </section>
  );
}
