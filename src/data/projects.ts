import {
  BULLET_CHECK_CASE_STUDY_URL,
  BULLET_CHECK_LIVE_URL,
  BULLET_CHECK_SCREENSHOT_PATH,
} from "@/data/bullet-check";
import type { Project } from "@/types/project";

/**
 * TODO: set the current build stage for the Job Market Intelligence Dashboard,
 * e.g. "Ingesting and cleaning posting data"
 */
export const JOB_MARKET_CURRENT_STAGE: string | undefined = undefined;

/**
 * TODO: set the next milestone for the Job Market Intelligence Dashboard,
 * e.g. "Ship skill-demand charts for one role family"
 */
export const JOB_MARKET_NEXT_MILESTONE: string | undefined = undefined;

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
    title: "Job Market Intelligence Dashboard",
    status: "In development",
    description:
      "A data product tracking role volume, hiring demand and recurring skills across data, product and solutions job postings.",
    progress: {
      currentStage: JOB_MARKET_CURRENT_STAGE,
      nextMilestone: JOB_MARKET_NEXT_MILESTONE,
    },
  },
];
