import Image from "next/image";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

function hasProgress(
  progress: Project["progress"],
): progress is NonNullable<Project["progress"]> {
  return Boolean(progress?.currentStage || progress?.nextMilestone);
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isFeatured = Boolean(project.featured);
  const liveLabel = project.liveActionLabel ?? "View Live";

  const actions = [
    project.liveUrl
      ? { href: project.liveUrl, label: liveLabel, external: /^https?:\/\//.test(project.liveUrl) }
      : null,
    project.repositoryUrl
      ? {
          href: project.repositoryUrl,
          label: "View Repository",
          external: /^https?:\/\//.test(project.repositoryUrl),
        }
      : null,
    project.caseStudyUrl
      ? {
          href: project.caseStudyUrl,
          label: "Read Case Study",
          external: /^https?:\/\//.test(project.caseStudyUrl),
        }
      : null,
  ].filter((action): action is { href: string; label: string; external: boolean } =>
    Boolean(action),
  );

  const showProgress = hasProgress(project.progress);

  return (
    <article
      className={`overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)] ${
        isFeatured ? "shadow-sm" : ""
      }`}
    >
      {project.imagePath ? (
        <div
          className={`relative border-b border-[var(--border)] bg-[color:var(--bg)/0.6] ${
            isFeatured ? "aspect-[16/9] sm:aspect-[2/1]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={project.imagePath}
            alt={`${project.title} preview`}
            fill
            className="object-cover object-top"
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, 1024px"
                : "(max-width: 768px) 100vw, 40vw"
            }
            priority={isFeatured}
          />
        </div>
      ) : null}

      <div className={isFeatured ? "p-5 sm:p-6" : "p-5"}>
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`font-semibold tracking-tight ${
              isFeatured ? "text-xl sm:text-2xl" : "text-base"
            }`}
          >
            {project.title}
          </h3>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${
              project.status.toLowerCase() === "live"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--muted)]"
            }`}
          >
            {project.status}
          </span>
        </div>

        <p
          className={`mt-2 text-[var(--muted)] ${
            isFeatured ? "max-w-3xl text-sm leading-relaxed sm:text-base" : "text-sm leading-relaxed"
          }`}
        >
          {project.description}
        </p>

        {project.bullets && project.bullets.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
            {project.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}

        {project.stack && project.stack.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-[var(--border)] px-2 py-1">
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {showProgress ? (
          <div className="mt-4 rounded-lg border border-[var(--border)] bg-[color:var(--bg)/0.45] p-4">
            <div className="text-xs uppercase tracking-wide text-[var(--muted)]">Progress</div>
            <div className="mt-3 space-y-2 text-sm">
              {project.progress?.currentStage ? (
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <span className="text-[var(--muted)]">Current stage</span>
                  <span className="font-medium sm:text-right">{project.progress.currentStage}</span>
                </div>
              ) : null}
              {project.progress?.nextMilestone ? (
                <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                  <span className="text-[var(--muted)]">Next milestone</span>
                  <span className="font-medium sm:text-right">{project.progress.nextMilestone}</span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {actions.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="text-[var(--accent)] hover:underline"
                {...(action.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {action.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
