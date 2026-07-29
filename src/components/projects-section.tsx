import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const featured = projects.filter((project) => project.featured);
  const supporting = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-14"
      aria-labelledby="projects-heading"
    >
      <SectionHeader label="[ PROJECTS ]" titleId="projects-heading" />

      <div className="space-y-4">
        {featured.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}

        {supporting.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {supporting.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
