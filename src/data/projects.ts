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
import type { Project } from "@/types/project";

export const projects: Project[] = [
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
