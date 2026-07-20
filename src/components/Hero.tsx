import Link from "next/link";
import { FeaturedProductPreview } from "@/components/featured-product-preview";
import { bulletCheckPreview } from "@/data/bullet-check";

const secondaryCtaClassName =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-10 sm:pt-16" aria-labelledby="hero-heading">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-8">
        <div className="min-w-0">
          <h1
            id="hero-heading"
            className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
          >
            I build data and systems that ship.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
            Systems Design Engineering student at the University of Waterloo building data tools, AI
            applications and workflow automations. I focus on turning unclear operational problems
            into useful, deployed systems.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#build"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              View Projects
            </Link>
            <a href="/Pranav_Resume_W26.pdf" className={secondaryCtaClassName}>
              Resume
            </a>
            <a
              href="https://github.com/bhat-pranav"
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryCtaClassName}
            >
              GitHub
            </a>
          </div>

          <p className="mt-5 text-sm text-[var(--muted)]">
            Seeking Winter 2027 co-op roles in data, solutions and AI implementation.
          </p>
        </div>

        <div className="min-w-0">
          <FeaturedProductPreview product={bulletCheckPreview} priority />
        </div>
      </div>
    </section>
  );
}
