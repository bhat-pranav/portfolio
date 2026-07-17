import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="build" className="mx-auto max-w-5xl px-5 py-14">
      <SectionHeader
        label="[ BUILD ROOM ]"
        title="Projects"
        aside={"Proof > promises."}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
