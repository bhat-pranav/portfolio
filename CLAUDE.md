## Portfolio
Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Deployed via Vercel conventions (sitemap.ts/robots.ts present for SEO). Repo: bhat-pranav/portfolio, main branch.

### Structure
- `/` — nav, hero, projects section, contact section, footer
- `/projects/[slug]` — dynamic case-study pages, statically generated from src/data/case-studies.ts
- Content lives in typed data files (src/data/projects.ts, case-studies.ts, bullet-check.ts), not hardcoded in components

### Content
Positions Pranav as Systems Design Engineering student at Waterloo, targeting Winter 2027 co-op roles in data/solutions/AI implementation. Contact via email, LinkedIn, GitHub, resume PDF.

### Projects shown
1. Bullet Check — Live, featured. Full case study covering architecture, prompt design, the JSON-parsing reliability fix, and an explicit limitations list (no auth, no rate limiting, no schema validation, no tests, non-streaming).
2. Job Market Intelligence Dashboard — status "In development." JOB_MARKET_CURRENT_STAGE and JOB_MARKET_NEXT_MILESTONE in src/data/projects.ts:12-18 are both undefined with TODO comments. No real progress content wired in yet.

### Code health
- npm run lint: clean
- npx tsc --noEmit: clean
- Last ~10 commits: active polish (nav/title simplification, clickable cards, standardized buttons, filename-casing fix, case-study system)

### Housekeeping
- desktop.ini is untracked (Windows Explorer artifact) — safe to add to .gitignore