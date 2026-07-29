import { ButtonLink } from "@/components/button-link";

export function Hero() {
  return (
    <section
      className="mx-auto max-w-5xl px-5 pt-12 pb-10 sm:pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-2xl">
        <p className="text-xl font-medium tracking-tight sm:text-[var(--muted)]">[ HELLO ]</p>
        <h1
          id="hero-heading"
          className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
        >
          I build data and systems that ship.
        </h1>

        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          Systems Design Engineering student at the University of Waterloo building data tools, AI
          applications and workflow automations. I focus on turning unclear operational problems
          into useful, deployed systems.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
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

        <p className="mt-5 text-sm text-[var(--muted)]">
          Seeking Winter 2027 co-op roles in data, solutions and AI implementation.
        </p>
      </div>
    </section>
  );
}
