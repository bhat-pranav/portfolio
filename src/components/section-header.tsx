type SectionHeaderProps = {
  label: string;
  title: string;
  aside?: string;
};

export function SectionHeader({ label, title, aside }: SectionHeaderProps) {
  if (aside) {
    return (
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs text-[var(--muted)]">{label}</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        <div className="text-sm text-[var(--muted)]">{aside}</div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="text-xs text-[var(--muted)]">{label}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
