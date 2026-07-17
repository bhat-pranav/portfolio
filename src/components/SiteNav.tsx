export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:var(--bg)/0.8] backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <div className="font-semibold tracking-tight">Pranav Bhat</div>
        <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
          <a href="#build" className="hover:text-[var(--text)]">
            Build Room
          </a>
          <a href="#war" className="hover:text-[var(--text)]">
            War Room
          </a>
          <a href="#contact" className="hover:text-[var(--text)]">
            Contact
          </a>
          <a
            href="/Pranav_Resume_W26.pdf"
            className="rounded-md border border-[var(--border)] px-3 py-1.5 text-[var(--text)] hover:border-[var(--accent)]"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
