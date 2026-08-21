## Portfolio
Personal portfolio site. Single-page, built to showcase shipped work and current status for co-op recruiting — primary audience is recruiters/hiring managers evaluating for Winter 2027 co-op placements (forward-deployed engineering, technical PM, builder-track SWE roles).

Tone across the whole site: understated and grounded, not flashy or fake. If a piece of copy sounds like a generic template or a LinkedIn summary, it's wrong — rewrite it.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Deployed via Vercel conventions (sitemap.ts/robots.ts present for SEO). Repo: bhat-pranav/portfolio, main branch.

### Structure
- `/` — nav, hero, projects section, contact section, footer
- `/projects/[slug]` — dynamic case-study pages, statically generated from src/data/case-studies.ts
- Content lives in typed data files (src/data/projects.ts, case-studies.ts, bullet-check.ts), not hardcoded in components
- Anything derivable from `projects.ts` (e.g. "which projects are shipped/live") should be computed via its helpers (`getLiveProjectTitles`, `formatProjectList`), not retyped as a literal string in a component — the hero's "Shipped" stat card and `src/app/opengraph-image.tsx` both consume these so they can't drift out of sync with each other
- No tests exist in this repo (no Vitest/Jest config or *.test.*/*.spec.* files)

### Design system
- Theme: dark, near-black background (`--bg`), green accent (`--accent`). Tokens live as CSS custom properties in `:root`/`@theme inline` in src/app/globals.css — there is no tailwind.config.* file (Tailwind v4 CSS-based config). Never hardcode new hex values; add new tokens to globals.css instead.
- Layout pattern: bento-grid, introduced in the hero redesign, may extend to other sections.
- Opacity variants of a token must be their own CSS var defined in globals.css as a plain `rgba()` value (see `--accent-soft`, `--accent-border`, `--bg-veil-45/60/80`) — Tailwind v4's `bg-[color:var(--x)/0.5]` opacity-modifier syntax does not resolve against custom properties in this setup and silently renders transparent. Confirmed broken and fixed sitewide (was a no-op on the nav backdrop, project image wrappers, and progress box).

### Content
Positions Pranav as Systems Design Engineering student at Waterloo, targeting Winter 2027 co-op roles in data/solutions/AI implementation. Contact via email, LinkedIn, GitHub, resume PDF.

Hero is a bento-grid layout: a small context line ("Systems Design Engineering · University of Waterloo"), name as the h1 ("Pranav Bhat" — deliberately no marketing pitch sentence), the "Currently: [typewriter text]" line (src/components/hero-typewriter.tsx), an availability line, and action buttons. Two small stat cards sit alongside: Role (Data Analyst, Lifestyle Home Products — neutral treatment) and Shipped (Bullet Check & Job Lens, Live, AI-powered — accent-tinted border/background as the strongest-signal card, bigger/bolder value type than the label). Contact section uses the same accent-tinted card treatment and extra vertical padding (`py-20 sm:py-24` vs. the site's standard `py-14 sm:py-16`) to read as a deliberate closing before the footer.

**Hero is fragile — confirm before restructuring layout or animation logic.** It went through several iterations to get right. The typewriter rotation list (src/components/hero-typewriter.tsx) is kept deliberately separate from layout/animation code so it's easy to edit alone. It must respect `prefers-reduced-motion` — when set, skip the typing animation and render the first rotation item statically (already implemented, both via matchMedia in the component and a global CSS rule in globals.css).

### Projects shown
1. Business Systems, Lifestyle Home Products — In production, featured. Internal Salesforce/Tableau/Apps Script work at a private company, no public repo/demo. No screenshot yet — tracked via `// TODO(Pranav)` in src/data/projects.ts and src/data/case-studies.ts, waiting on a redacted image.
2. Bullet Check — Live, featured. Full case study covering architecture, prompt design, the JSON-parsing reliability fix, and an explicit limitations list (no auth, no rate limiting, no schema validation, no tests, non-streaming).
3. Job Lens — Live, featured. Data-viz app showing skill demand, role breakdowns and top hiring companies extracted from 1,000 real job postings via LLM. Stack: Next.js, TypeScript, Python, OpenAI API, Vercel. Live at joblens-pearl.vercel.app, case study at /projects/job-lens, data in src/data/job-lens.ts.

### SEO / sharing
- sitemap.ts lists all three case-study routes (`/projects/bullet-check`, `/projects/job-lens`, `/projects/lifestyle-systems`) plus `/` — keep this in sync when a case study is added or removed.
- `src/app/opengraph-image.tsx` (and `twitter-image.tsx`, which re-exports it) generates a real 1200×630 share-card image at build time via `next/og`, styled with the site's actual tokens rather than a static asset. It pulls the "Shipped: ..." line from `projects.ts`'s helpers — see the Structure note above. `twitter.card` in layout.tsx is `summary_large_image` to match.
- README.md has real project content (what it is, stack, structure, local dev, links to live projects/case studies) — it is not the `create-next-app` boilerplate default. Keep it accurate if structure/stack changes.

### Content accuracy
Don't invent metrics, dates, testimonials, or bio/project details that aren't confirmed elsewhere in this repo or stated directly by Pranav. If a project card or bio line is missing information, flag it rather than filling it in with a plausible guess.

### Code health
- npm run lint: clean
- npx tsc --noEmit: clean
- Recent commits: design-taste + accessibility audit fixes, hero rework (name-led identity), AI-slop audit fixes (README rewrite, sitemap fix), Open Graph image added

### Housekeeping
- desktop.ini is untracked (Windows Explorer artifact) — safe to add to .gitignore