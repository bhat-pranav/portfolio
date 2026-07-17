import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{project.title}</h3>
        <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
          {project.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{project.description}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
        {project.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
        {project.stack.map((item) => (
          <span key={item} className="rounded-full border border-[var(--border)] px-2 py-1">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
