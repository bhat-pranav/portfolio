export function ContactSection() {
  const buttonClassName =
    "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

  return (
    <section
      id="contact"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-14"
      aria-labelledby="contact-heading"
    >
      <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6 sm:p-7">
        <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight">
          Let’s talk.
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--muted)]">
          I’m seeking Winter 2027 co-op roles in data, solutions and AI implementation. I’m
          particularly interested in teams building tools around real customer or operational
          workflows.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="mailto:pranav2bhat@gmail.com"
            className={`${buttonClassName} bg-[var(--accent)] text-[var(--bg)] hover:opacity-90`}
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/pranav-bhat-uw/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClassName} border border-[var(--border)] hover:border-[var(--accent)]`}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/bhat-pranav"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClassName} border border-[var(--border)] hover:border-[var(--accent)]`}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
