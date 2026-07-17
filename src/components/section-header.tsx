type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  aside?: string;
};

export function SectionHeader({ label, title, description, aside }: SectionHeaderProps) {
  const heading = (
    <div>
      <div className="text-xs text-[var(--muted)]">{label}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      ) : null}
    </div>
  );

  if (aside) {
    return (
      <div className="mb-6 flex items-end justify-between gap-4">
        {heading}
        <div className="text-sm text-[var(--muted)]">{aside}</div>
      </div>
    );
  }

  return <div className="mb-6">{heading}</div>;
}
