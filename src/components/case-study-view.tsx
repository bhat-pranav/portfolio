import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import type { CaseStudy, CaseStudyHighlight, CaseStudySystem } from "@/types/case-study";
import type { ReactNode } from "react";

type CaseStudyViewProps = {
  study: CaseStudy;
};

type SectionDef = {
  key: string;
  title: string;
  content?: string;
  list?: string[];
  ordered?: boolean;
  note?: string;
  diagram?: string;
};

function metadataItems(study: CaseStudy) {
  const items: { label: string; value: string }[] = [];
  if (study.role) items.push({ label: "Role", value: study.role });
  if (study.timeline) items.push({ label: "Timeline", value: study.timeline });
  return items;
}

function paragraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function Prose({ text }: { text: string }) {
  const parts = paragraphs(text);
  return (
    <div className="mt-3 max-w-2xl space-y-3 text-[15px] leading-7 text-[var(--muted)] sm:text-base sm:leading-7">
      {parts.map((part) => (
        <p key={part}>{part}</p>
      ))}
    </div>
  );
}

function ArchitectureDiagram({ diagram }: { diagram: string }) {
  const steps = diagram
    .split(/\s*→\s*/)
    .map((step) => step.trim())
    .filter(Boolean);

  if (steps.length <= 1) {
    return (
      <p className="mt-4 font-mono text-sm leading-relaxed text-[var(--muted)]">{diagram}</p>
    );
  }

  return (
    <ol className="mt-4 flex list-none flex-col gap-2 p-0 font-mono text-sm text-[var(--muted)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-md border border-[var(--border)] bg-[color:var(--panel)] px-2.5 py-1.5 text-[13px] text-[var(--text)]">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden="true" className="hidden text-[var(--muted)] sm:inline">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function SystemCard({ system }: { system: CaseStudySystem }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight sm:text-lg">{system.name}</h3>
        {system.status ? (
          <span className="shrink-0 rounded-full border border-[var(--border)] px-2 py-0.5 text-xs font-medium text-[var(--muted)]">
            {system.status}
          </span>
        ) : null}
      </div>

      {system.body && system.body.length > 0 ? (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          {system.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Before
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{system.before}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              After
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{system.after}</p>
          </div>
        </div>
      )}

      {system.stat ? (
        <p className="mt-4 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--text)]">
          {system.stat}
        </p>
      ) : null}
    </div>
  );
}

function HighlightsList({ highlights }: { highlights: CaseStudyHighlight[] }) {
  return (
    <div className="mt-4 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--panel)]">
      {highlights.map((highlight) => (
        <div key={highlight.name} className="p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="text-sm font-semibold tracking-tight">{highlight.name}</h3>
            <span className="text-xs text-[var(--muted)]">{highlight.source}</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{highlight.purpose}</p>
        </div>
      ))}
    </div>
  );
}

function SystemsSection({ systems }: { systems: CaseStudySystem[] }) {
  return (
    <section aria-labelledby="section-systems">
      <h2 id="section-systems" className="text-lg font-semibold tracking-tight">
        Systems built
      </h2>
      <div className="mt-4 space-y-4">
        {systems.map((system) => (
          <SystemCard key={system.name} system={system} />
        ))}
      </div>
    </section>
  );
}

function SectionBody({ section }: { section: SectionDef }) {
  let body: ReactNode = null;

  if (section.list && section.list.length > 0) {
    const ListTag = section.ordered ? "ol" : "ul";
    body = (
      <ListTag
        className={`mt-3 max-w-2xl space-y-2.5 pl-5 text-[15px] leading-7 text-[var(--muted)] sm:text-base ${
          section.ordered ? "list-decimal" : "list-disc"
        }`}
      >
        {section.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    );
  } else if (section.content) {
    body = <Prose text={section.content} />;
  }

  return (
    <>
      {body}
      {section.diagram ? <ArchitectureDiagram diagram={section.diagram} /> : null}
      {section.note ? (
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted)] sm:text-base">
          {section.note}
        </p>
      ) : null}
    </>
  );
}

export function CaseStudyView({ study }: CaseStudyViewProps) {
  const meta = metadataItems(study);
  const statusIsLive = study.status?.toLowerCase() === "live";

  const limitationsList = Array.isArray(study.limitations)
    ? study.limitations
    : undefined;
  const limitationsText =
    typeof study.limitations === "string" ? study.limitations : undefined;

  const problemSection: SectionDef = { key: "problem", title: "Problem", content: study.problem };
  const hasProblem = Boolean(problemSection.content);

  const sections: SectionDef[] = [
    {
      key: "product-decision",
      title: "Product decision",
      content: study.productDecision,
    },
    {
      key: "user-flow",
      title: "User flow",
      list: study.userFlow?.filter(Boolean),
      ordered: true,
      note: study.userFlowNote,
    },
    {
      key: "technical-architecture",
      title: "Technical architecture",
      content: study.technicalArchitecture,
      diagram: study.architectureDiagram,
    },
    {
      key: "implementation-details",
      title: "Implementation details",
      content: study.implementationDetails,
    },
    {
      key: "hardest-technical-issue",
      title: "Hardest technical issue",
      content: study.hardestTechnicalIssue,
    },
    {
      key: "validation-and-error-handling",
      title: "Validation and error handling",
      list: study.validationAndErrorHandling?.filter(Boolean),
      ordered: false,
    },
    {
      key: "privacy-and-data-handling",
      title: "Privacy and data handling",
      content: study.privacyAndDataHandling,
    },
    {
      key: "ai-dashboards",
      title: "AI-built interactive dashboards",
      content: study.aiDashboards,
    },
    {
      key: "parallel-initiative",
      title: study.parallelInitiative?.title ?? "",
      content: study.parallelInitiative?.body,
    },
    {
      key: "limitations",
      title: "Limitations",
      content: limitationsText,
      list: limitationsList,
      ordered: false,
    },
    { key: "results", title: "Results", content: study.results },
    { key: "next-steps", title: "Next steps", content: study.nextSteps },
  ].filter((section) => {
    if (section.list) return section.list.length > 0;
    return Boolean(section.content || section.diagram);
  });

  return (
    <article className="mx-auto max-w-3xl px-5 pt-12 pb-10 sm:pt-16">
      <Link
        href="/#projects"
        className="inline-flex min-h-10 items-center text-sm text-[var(--muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        ← Projects
      </Link>

      <header className="mt-6">
        <p className="text-sm font-medium tracking-tight text-[var(--muted)]">Case study</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {study.title}
          </h1>
          {study.status ? (
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                statusIsLive
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)]"
              }`}
            >
              Status: {study.status}
            </span>
          ) : null}
        </div>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {study.description}
        </p>

        {study.liveUrl || study.repositoryUrl ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {study.liveUrl ? (
              <ButtonLink href={study.liveUrl} variant="primary" external>
                View Live
              </ButtonLink>
            ) : null}
            {study.repositoryUrl ? (
              <ButtonLink href={study.repositoryUrl} variant="secondary" external>
                View Repository
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
      </header>

      {meta.length > 0 || (study.stack && study.stack.length > 0) ? (
        <div className="mt-8 space-y-5 border-y border-[var(--border)] py-5">
          {meta.length > 0 ? (
            <dl className="grid gap-4 sm:grid-cols-2">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm text-[var(--text)]">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {study.stack && study.stack.length > 0 ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                Stack
              </p>
              <ul className="mt-2 flex list-none flex-wrap gap-2 p-0">
                {study.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {study.heroImage ? (
        <div className="relative mt-8 aspect-[4/5] max-h-[34rem] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-veil-60)] sm:aspect-[5/4]">
          <Image
            src={study.heroImage}
            alt={`${study.title} product screenshot`}
            fill
            className="object-contain object-top"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      ) : null}

      {hasProblem || study.systems?.length || study.highlights?.length || sections.length > 0 ? (
        <div className="mt-12 space-y-12">
          {hasProblem ? (
            <section aria-labelledby={`section-${problemSection.key}`}>
              <h2
                id={`section-${problemSection.key}`}
                className="text-lg font-semibold tracking-tight"
              >
                {problemSection.title}
              </h2>
              <SectionBody section={problemSection} />
            </section>
          ) : null}

          {study.systems && study.systems.length > 0 ? (
            <SystemsSection systems={study.systems} />
          ) : null}

          {study.highlights && study.highlights.length > 0 ? (
            <section aria-labelledby="section-highlights">
              <h2 id="section-highlights" className="text-lg font-semibold tracking-tight">
                {study.highlightsLabel ?? "Additional systems"}
              </h2>
              <HighlightsList highlights={study.highlights} />
            </section>
          ) : null}

          {sections.map((section) => (
            <section key={section.key} aria-labelledby={`section-${section.key}`}>
              <h2
                id={`section-${section.key}`}
                className="text-lg font-semibold tracking-tight"
              >
                {section.title}
              </h2>
              <SectionBody section={section} />
            </section>
          ))}
        </div>
      ) : null}
    </article>
  );
}
