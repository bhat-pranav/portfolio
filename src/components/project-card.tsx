import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

function hasProgress(
  progress: Project["progress"],
): progress is NonNullable<Project["progress"]> {
  return Boolean(progress?.currentStage || progress?.nextMilestone);
}

const cardSurfaceClassName =
  "overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)]";

function ProjectCardContent({
  project,
  showCaseStudyHint,
}: {
  project: Project;
  showCaseStudyHint: boolean;
}) {
  const isFeatured = Boolean(project.featured);
  const showProgress = hasProgress(project.progress);
  const statusIsLive = project.status.toLowerCase() === "live";

  return (
    <>
      {project.imagePath ? (
        <div
          className={`relative border-b border-[var(--border)] bg-[color:var(--bg)/0.6] ${
            isFeatured
              ? "aspect-[4/5] max-h-[26rem] sm:aspect-[5/4] sm:max-h-[28rem]"
              : "aspect-[4/5] max-h-[20rem]"
          }`}
        >
          <Image
            src={project.imagePath}
            alt={`${project.title} interface screenshot`}
            fill
            className="object-contain object-top"
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, 1024px"
                : "(max-width: 768px) 100vw, 40vw"
            }
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
            className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${
              statusIsLive
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--muted)]"
            }`}
          >
            Status: {project.status}
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
          <ul className="mt-4 flex list-none flex-wrap gap-2 p-0 text-xs text-[var(--muted)]">
            {project.stack.map((item) => (
              <li key={item} className="rounded-full border border-[var(--border)] px-2 py-1">
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {showProgress ? (
          <div className="mt-4 rounded-lg border border-[var(--border)] bg-[color:var(--bg)/0.45] p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Progress
            </div>
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

        {showCaseStudyHint ? (
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
            View case study
            <span aria-hidden="true">→</span>
          </p>
        ) : null}
      </div>
    </>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isFeatured = Boolean(project.featured);
  const caseStudyUrl = project.caseStudyUrl;

  const surfaceClassName = [
    cardSurfaceClassName,
    isFeatured ? "shadow-sm" : "",
    caseStudyUrl
      ? "block transition-[border-color] hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <ProjectCardContent project={project} showCaseStudyHint={Boolean(caseStudyUrl)} />
  );

  if (caseStudyUrl) {
    return (
      <Link
        href={caseStudyUrl}
        className={surfaceClassName}
        aria-label={`${project.title} case study`}
      >
        {content}
      </Link>
    );
  }

  return <article className={surfaceClassName}>{content}</article>;
}
