export function Hero() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-16 pb-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              I build data and systems that ship.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Systems Design Engineering @ University of Waterloo. I like turning messy inputs into
              reliable outputs with fast iteration and measurable results.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/Pranav_Resume_W26.pdf"
                className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)] hover:opacity-90"
              >
                Download Resume
              </a>
              <a
                href="https://github.com/bhat-pranav"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)]"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pranav-bhat-uw/"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)]"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
            <div className="text-xs text-[var(--muted)]">STATUS PANEL</div>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Status</span>
                <span className="font-medium">Building</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Focus</span>
                <span className="font-medium">Data • Systems</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Coming Up</span>
                <span className="font-medium">Job Market Dashboard (WIP)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-12">
        <div className="flex flex-wrap gap-2">
          {["Seeking: Winter 2027 Internships", "Focus: Data • Systems"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs text-[var(--muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
