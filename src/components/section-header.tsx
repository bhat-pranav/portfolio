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
  const labelClassName = "text-xl font-medium tracking-tight text-[var(--muted)]";

  const heading = (
    <div>
      {title ? (
        <>
          <p className={labelClassName}>{label}</p>
          <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        </>
      ) : (
        <h2 id={titleId} className={labelClassName}>
          {label}
        </h2>
      )}
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
