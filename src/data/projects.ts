import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Job Market Intelligence Dashboard",
    status: "In Progress",
    description:
      "Analyze job postings to surface skill demand trends and role requirements.",
    bullets: [
      "Ingest + clean job posting data into a queryable store",
      "Extract and rank skill keywords by role category",
      "Interactive filters + charts for quick insight",
    ],
    stack: ["Next.js", "TypeScript", "Python", "SQL", "Vercel"],
    links: [{ label: "Repo (soon)" }, { label: "Live (soon)" }],
  },
  {
    title: "Systems Utility (TBD)",
    status: "Coming Next",
    description:
      "Small, sharp tool focused on reliability, instrumentation, and clean engineering.",
    bullets: ["CLI + tests", "Perf metrics (latency / throughput)", "CI pipeline"],
    stack: ["Go/Python", "Tests", "CI", "Docker"],
  },
];
