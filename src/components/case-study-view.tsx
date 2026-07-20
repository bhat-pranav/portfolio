import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";
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
  if (study.stack && study.stack.length > 0) {
    items.push({ label: "Stack", value: study.stack.join(" · ") });
  }
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
    <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
      {parts.map((part) => (
        <p key={part}>{part}</p>
      ))}
    </div>
  );
}

function SectionBody({ section }: { section: SectionDef }) {
  let body: ReactNode = null;

  if (section.list && section.list.length > 0) {
    const ListTag = section.ordered ? "ol" : "ul";
    body = (
      <ListTag
        className={`mt-3 space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)] ${
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
      {section.diagram ? (
        <p className="mt-4 overflow-x-auto text-sm leading-relaxed text-[var(--muted)]">
          <span className="whitespace-nowrap font-mono text-[13px] sm:whitespace-normal sm:text-sm">
            {section.diagram}
          </span>
        </p>
      ) : null}
      {section.note ? (
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{section.note}</p>
      ) : null}
    </>
  );
}

export function CaseStudyView({ study }: CaseStudyViewProps) {
  const meta = metadataItems(study);

  const limitationsList = Array.isArray(study.limitations)
    ? study.limitations
    : undefined;
  const limitationsText =
    typeof study.limitations === "string" ? study.limitations : undefined;

  const sections: SectionDef[] = [
    { key: "problem", title: "Problem", content: study.problem },
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
        href="/#build"
        className="text-sm text-[var(--muted)] hover:text-[var(--text)]"
      >
        ← Selected Work
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {study.title}
          </h1>
          {study.status ? (
            <span
              className={`rounded-full border px-2 py-0.5 text-xs ${
                study.status.toLowerCase() === "live"
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)]"
              }`}
            >
              {study.status}
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          {study.description}
        </p>

        {study.liveUrl || study.repositoryUrl ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {study.liveUrl ? (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)] hover:opacity-90"
              >
                View Live
              </a>
            ) : null}
            {study.repositoryUrl ? (
              <a
                href={study.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)]"
              >
                View Repository
              </a>
            ) : null}
          </div>
        ) : null}
      </header>

      {meta.length > 0 ? (
        <dl className="mt-8 grid gap-4 border-y border-[var(--border)] py-5 sm:grid-cols-3">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs uppercase tracking-wide text-[var(--muted)]">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {study.heroImage ? (
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl border border-[var(--border)] bg-[color:var(--bg)/0.6]">
          <Image
            src={study.heroImage}
            alt={`${study.title} screenshot`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      ) : null}

      {sections.length > 0 ? (
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.key}>
              <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
              <SectionBody section={section} />
            </section>
          ))}
        </div>
      ) : null}
    </article>
  );
}
