export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,var(--grid)_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-30 bg-[var(--accent)]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:var(--bg)/0.8] backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="font-semibold tracking-tight">Pranav Bhat</div>
          <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
            <a href="#build" className="hover:text-[var(--text)]">Build Room</a>
            <a href="#war" className="hover:text-[var(--text)]">War Room</a>
            <a href="#contact" className="hover:text-[var(--text)]">Contact</a>
            <a
              href="/Pranav_Resume_W26.pdf"
              className="rounded-md border border-[var(--border)] px-3 py-1.5 text-[var(--text)] hover:border-[var(--accent)]"
            >
              Resume
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-16 pb-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              I build data and systems that ship.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Systems Design @ University of Waterloo. I like turning messy inputs into reliable outputs with
              fast iteration, measurable results, clean execution.
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

          {/* Status panel */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-sm">
            <div className="text-xs text-[var(--muted)]">STATUS PANEL</div>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Status</span>
                <span className="font-medium">Building</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Focus</span>
                <span className="font-medium">Data • Systems • Full-stack</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Coming Up</span>
                <span className="font-medium">Job Market Dashboard (WIP)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signal strip */}
      <section className="mx-auto max-w-5xl px-5 pb-12">
        <div className="flex flex-wrap gap-2">
          {[
            "Seeking: Winter 2027 Internships",
            "Focus: Data • Systems • SWE",
            "Loop: Build → Measure → Iterate",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs text-[var(--muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Build Room */}
      <section id="build" className="mx-auto max-w-5xl px-5 py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-[var(--muted)]">[ BUILD ROOM ]</div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Projects</h2>
          </div>
          <div className="text-sm text-[var(--muted)]">Proof &gt; promises.</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Project 1 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Job Market Intelligence Dashboard</h3>
              <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
                In Progress
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Analyze job postings to surface skill demand trends and role requirements.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              <li>Ingest + clean job posting data into a queryable store</li>
              <li>Extract and rank skill keywords by role category</li>
              <li>Interactive filters + charts for quick insight</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
              {["Next.js", "TypeScript", "Python", "SQL", "Vercel"].map((s) => (
                <span key={s} className="rounded-full border border-[var(--border)] px-2 py-1">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-3 text-sm">
              <a className="text-[var(--accent)] hover:underline">
                Repo (soon)
              </a>
              <a className="text-[var(--accent)] hover:underline">
                Live (soon)
              </a>
            </div>
          </div>

          {/* Project 2 placeholder */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Systems Utility (TBD)</h3>
              <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted)]">
                Coming Next
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Small, sharp tool focused on reliability, instrumentation, and clean engineering.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              <li>CLI + tests</li>
              <li>Perf metrics (latency / throughput)</li>
              <li>CI pipeline</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
              {["Go/Python", "Tests", "CI", "Docker"].map((s) => (
                <span key={s} className="rounded-full border border-[var(--border)] px-2 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* War Room */}
      <section id="war" className="mx-auto max-w-5xl px-5 py-14">
        <div className="mb-6">
          <div className="text-xs text-[var(--muted)]">[ WAR ROOM ]</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">How I operate</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Execution Loop",
              bullets: ["MVP → ship", "Instrument + measure", "Iterate with focus"],
            },
            {
              title: "Systems Thinking",
              bullets: ["Constraints + tradeoffs", "Reliability mindset", "Simple over clever"],
            },
            {
              title: "Communication",
              bullets: ["Tight docs", "Clear updates", "No ambiguity in handoffs"],
            },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5">
              <h3 className="font-semibold">{p.title}</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-5 py-14">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-7">
          <h2 className="text-2xl font-semibold tracking-tight">Let’s talk.</h2>
          <p className="mt-2 text-[var(--muted)]">
            If you need someone who can own messy problems end-to-end; build, measure & iterate, reach out.
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

      <footer className="mx-auto max-w-5xl px-5 pb-10 pt-6 text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Pranav Bhat • Built Room / War Room
      </footer>
    </main>
  );
}