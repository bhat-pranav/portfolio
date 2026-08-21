export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-5 pt-6 pb-6 text-xs text-[var(--muted)]">
      <p>© {new Date().getFullYear()} Pranav Bhat</p>
      <p className="mt-1">Outside of work: coffee nerd, LEGO builder.</p>
    </footer>
  );
}
