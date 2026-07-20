import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
  external?: boolean;
  className?: string;
};

const baseClassName =
  "inline-flex min-h-11 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-[border-color,opacity,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

const variantClassName: Record<ButtonLinkVariant, string> = {
  primary:
    "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] hover:opacity-90",
  secondary:
    "border-[var(--border)] bg-transparent text-[var(--text)] hover:border-[var(--accent)]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = [baseClassName, variantClassName[variant], className]
    .filter(Boolean)
    .join(" ");

  const isSpecialProtocol = /^(mailto:|tel:)/i.test(href);

  if (external || isSpecialProtocol) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
