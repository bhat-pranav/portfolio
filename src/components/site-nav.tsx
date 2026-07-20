import Link from "next/link";

const linkClassName =
  "inline-flex min-h-10 items-center rounded-sm px-1 py-2 hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color:var(--bg)/0.8] backdrop-blur motion-reduce:backdrop-blur-none">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/"
          className="shrink-0 font-semibold tracking-tight text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Pranav Bhat
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm text-[var(--muted)] sm:gap-x-4"
        >
          <Link href="/#projects" className={linkClassName}>
            Projects
          </Link>
          <a
            href="/Pranav_Resume_W26.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Resume
          </a>
          <Link href="/#contact" className={linkClassName}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
