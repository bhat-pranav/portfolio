type SectionHeaderProps = {
  label: string;
  title?: string;
  titleId?: string;
  description?: string;
  aside?: string;
};

export function SectionHeader({
  label,
  title,
  titleId,
  description,
  aside,
}: SectionHeaderProps) {
  const heading = (
    <div>
      <p className="text-xl font-medium tracking-tight text-[var(--muted)]" id={titleId}>
        {label}
      </p>
      {title ? (
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h2>
      ) : null}
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{description}</p>
      ) : null}
    </div>
  );

  if (aside) {
    return (
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        {heading}
        <p className="text-sm text-[var(--muted)]">{aside}</p>
      </div>
    );
  }

  return <div className="mb-6">{heading}</div>;
}
