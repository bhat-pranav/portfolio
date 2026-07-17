import Link from "next/link";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:var(--bg)/0.8] backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3">
        <div className="shrink-0 font-semibold tracking-tight">Pranav Bhat</div>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm text-[var(--muted)] sm:gap-x-4"
        >
          <Link href="/#build" className="hover:text-[var(--text)]">
            Work
          </Link>
          {/* Experience → /#experience and About → /#about omitted until those sections exist */}
          <a
            href="/Pranav_Resume_W26.pdf"
            className="rounded-md border border-[var(--border)] px-3 py-1.5 text-[var(--text)] hover:border-[var(--accent)]"
          >
            Resume
          </a>
          <Link href="/#contact" className="hover:text-[var(--text)]">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
