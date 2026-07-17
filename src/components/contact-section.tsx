export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-14">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-7">
        <h2 className="text-2xl font-semibold tracking-tight">Let’s talk.</h2>
        <p className="mt-2 text-[var(--muted)]">
          I’m seeking Winter 2027 co-op roles in data, solutions and AI implementation. I’m
          particularly interested in teams building tools around real customer or operational
          workflows.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="mailto:pranav2bhat@gmail.com"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)] hover:opacity-90"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/pranav-bhat-uw/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)]"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/bhat-pranav"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
