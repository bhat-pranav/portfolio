import { ButtonLink } from "@/components/button-link";

export function Hero() {
  return (
    <section
      className="mx-auto max-w-5xl px-5 pt-12 pb-10 sm:pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr] sm:grid-rows-2">
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-7 sm:row-span-2">
          <div>
            <p className="text-xs tracking-wide text-[var(--muted)]">
              systems design eng, waterloo
            </p>
            <h1
              id="hero-heading"
              className="mt-3 text-3xl font-medium leading-snug tracking-tight sm:text-4xl"
            >
              I build things people actually use.
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/#projects" variant="primary">
              View projects
            </ButtonLink>
            <ButtonLink href="/Pranav_Resume_W26.pdf" variant="secondary" external>
              Resume
            </ButtonLink>
            <ButtonLink
              href="https://github.com/bhat-pranav"
              variant="secondary"
              external
            >
              GitHub
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5">
          <p className="text-xs text-[var(--muted)]">currently</p>
          <p className="mt-1.5 text-sm font-medium">data analyst + IT admin intern</p>
          <p className="mt-1 text-sm text-[var(--muted)]">lifestyle home products</p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5">
          <p className="text-xs text-[var(--muted)]">building now</p>
          <p className="mt-1.5 text-sm font-medium">autocarcomplaints</p>
          <p className="mt-1 text-sm text-[var(--muted)]">programmatic SEO on NHTSA data</p>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--accent)/0.35] bg-[var(--accent)/0.08] p-4 sm:col-span-2">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">
              open to winter 2027 co-op
            </p>
            <p className="mt-0.5 text-xs text-[var(--muted)]">
              forward-deployed engineering, technical PM, builder-track SWE
            </p>
          </div>
          <span aria-hidden="true" className="text-[var(--accent)]">
            →
          </span>
        </div>
      </div>
    </section>
  );
}
