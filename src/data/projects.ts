import {
  BULLET_CHECK_CASE_STUDY_URL,
  BULLET_CHECK_LIVE_URL,
  BULLET_CHECK_SCREENSHOT_PATH,
} from "@/data/bullet-check";
import {
  JOB_LENS_CASE_STUDY_URL,
  JOB_LENS_LIVE_URL,
  JOB_LENS_SCREENSHOT_PATH,
} from "@/data/job-lens";
import { LIFESTYLE_SYSTEMS_CASE_STUDY_URL } from "@/data/lifestyle-systems";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Business Systems, Lifestyle Home Products",
    status: "In production",
    description:
      "Salesforce, Tableau and Apps Script systems built across two co-op terms: a cross-platform license data warehouse, a cycle-time analytics pipeline processing 140,000+ records, and an operations dashboard used daily by the ops team.",
    stack: ["Salesforce", "Tableau", "Google Apps Script", "SOQL"],
    featured: true,
    // TODO(Pranav): add imagePath: LIFESTYLE_SYSTEMS_SCREENSHOT_PATH once a redacted screenshot exists at public/images/lifestyle-systems.png
    caseStudyUrl: LIFESTYLE_SYSTEMS_CASE_STUDY_URL,
  },
  {
    title: "Bullet Check",
    status: "Live",
    description:
      "A live AI tool that compares a resume against a job description, identifies the three weakest bullets and generates more targeted rewrites.",
    stack: ["Next.js", "TypeScript", "Anthropic API", "Vercel"],
    featured: true,
    imagePath: BULLET_CHECK_SCREENSHOT_PATH,
    liveUrl: BULLET_CHECK_LIVE_URL,
    caseStudyUrl: BULLET_CHECK_CASE_STUDY_URL,
  },
  {
    title: "Job Lens",
    status: "Live",
    description:
      "A data-viz app showing what the job market is actually asking for: skill demand, role breakdowns and top hiring companies extracted from 1,000 real job postings via LLM.",
    stack: ["Next.js", "TypeScript", "Python", "OpenAI API", "Vercel"],
    featured: true,
    imagePath: JOB_LENS_SCREENSHOT_PATH,
    liveUrl: JOB_LENS_LIVE_URL,
    caseStudyUrl: JOB_LENS_CASE_STUDY_URL,
  },
];

export function getLiveProjectTitles(): string[] {
  return projects
    .filter((project) => project.status.toLowerCase() === "live")
    .map((project) => project.title);
}

/** Joins project titles as "A", "A & B", "A, B & C", or "A, B & N more" for 4+. */
export function formatProjectList(titles: string[]): string | null {
  if (titles.length === 0) return null;
  if (titles.length === 1) return titles[0];
  if (titles.length <= 3) {
    return `${titles.slice(0, -1).join(", ")} & ${titles[titles.length - 1]}`;
  }
  return `${titles.slice(0, 2).join(", ")} & ${titles.length - 2} more`;
}
