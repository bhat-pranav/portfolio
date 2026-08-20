# Pranav Bhat — Portfolio

Personal portfolio site, live at [pbhat.me](https://pbhat.me). Single-page site showcasing shipped work, built to give recruiters and hiring managers a fast, honest read on what I've actually built — not a resume restated as a website.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19, TypeScript
- Tailwind CSS 4 (CSS-based config — no `tailwind.config.*`, tokens live in `src/app/globals.css`)
- Deployed on Vercel

## Structure

- `/` — nav, hero, projects section, contact section, footer
- `/projects/[slug]` — dynamic case-study pages, statically generated from `src/data/case-studies.ts`
- Project and case-study content lives in typed data files (`src/data/projects.ts`, `src/data/case-studies.ts`, plus one file per project), not hardcoded in components — adding or editing a project means editing data, not JSX

## Projects shown

- **[Bullet Check](https://bullet-check.vercel.app)** — compares a resume against a job description, flags the three weakest bullets, generates targeted rewrites. [Case study](https://pbhat.me/projects/bullet-check) · [repo](https://github.com/bhat-pranav/bullet-check)
- **[Job Lens](https://joblens-pearl.vercel.app)** — data-viz app surfacing skill demand and hiring trends extracted from 1,000 real job postings via an LLM pipeline. [Case study](https://pbhat.me/projects/job-lens) · [repo](https://github.com/bhat-pranav/joblens)
- **Business Systems, Lifestyle Home Products** — Salesforce/Tableau/Apps Script systems built across two co-op terms. Internal company work, no public repo. [Case study](https://pbhat.me/projects/lifestyle-systems)

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm run lint` and `npx tsc --noEmit` should both be clean before committing.

No test suite exists yet — noted as a known gap in `STATUS.md`, not an oversight.
