import { ButtonLink } from "@/components/button-link";
import { HeroTypewriter } from "@/components/hero-typewriter";
import { formatProjectList, getLiveProjectTitles } from "@/data/projects";

export function Hero() {
  const shippedProjects = formatProjectList(getLiveProjectTitles()) ?? "—";

  return (
    <section
      className="mx-auto max-w-5xl px-5 py-14 sm:py-16"
      aria-labelledby="hero-heading"
    >
      <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr] sm:grid-rows-2">
        <div className="flex flex-col justify-between gap-6 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6 sm:row-span-2">
          <div className="space-y-3">
            <p className="text-sm text-[var(--muted)]">
              Systems Design Engineering · University of Waterloo
            </p>
            <h1
              id="hero-heading"
              className="text-3xl font-semibold leading-snug tracking-tight sm:text-4xl"
            >
              Pranav Bhat
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Currently: <HeroTypewriter />
            </p>
            <p className="text-sm font-medium text-[var(--accent)]">
              Open to Winter 2027 co-op roles in business systems, data and AI
              implementation.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/#projects" variant="primary">
              View Projects
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

        <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <p className="text-[11px] font-medium tracking-wide text-[var(--muted)]">Role</p>
          <p className="mt-2 text-lg font-semibold tracking-tight">Data Analyst</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Lifestyle Home Products, 2 terms
          </p>
        </div>

        <div className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-6">
          <p className="text-[11px] font-medium tracking-wide text-[var(--accent)]">Shipped</p>
          <p className="mt-2 text-lg font-semibold tracking-tight">{shippedProjects}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--muted)]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Live, AI-powered
          </p>
        </div>
      </div>
    </section>
  );
}
