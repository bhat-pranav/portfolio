import { ButtonLink } from "@/components/button-link";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-14 sm:py-16"
      aria-labelledby="contact-heading"
    >
      <div className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-6">
        <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight">
          Let’s talk.
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          I’m seeking Winter 2027 co-op roles in business systems, data and AI implementation. I’m
          particularly interested in teams building tools around real customer or operational
          workflows.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="mailto:pranav2bhat@gmail.com" variant="primary">
            Email
          </ButtonLink>
          <ButtonLink
            href="https://www.linkedin.com/in/pranav-bhat-uw/"
            variant="secondary"
            external
          >
            LinkedIn
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
    </section>
  );
}
