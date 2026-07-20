import {
  BULLET_CHECK_LIVE_URL,
  BULLET_CHECK_SCREENSHOT_PATH,
} from "@/data/bullet-check";
import type { CaseStudy } from "@/types/case-study";

/**
 * TODO: set your role on Bullet Check, e.g. "Solo builder"
 */
export const BULLET_CHECK_ROLE: string | undefined = undefined;

/**
 * TODO: set the project timeline, e.g. "Winter 2026"
 */
export const BULLET_CHECK_TIMELINE: string | undefined = undefined;

/**
 * TODO: set stack only with confirmed technologies, e.g. ["Next.js", "TypeScript"]
 */
export const BULLET_CHECK_STACK: string[] | undefined = undefined;

/**
 * TODO: set repository URL when public
 */
export const BULLET_CHECK_REPOSITORY_URL: string | undefined = undefined;

/**
 * TODO: describe the problem Bullet Check addresses
 */
export const BULLET_CHECK_PROBLEM: string | undefined = undefined;

/**
 * TODO: describe the key product decision
 */
export const BULLET_CHECK_PRODUCT_DECISION: string | undefined = undefined;

/**
 * TODO: describe technical architecture with confirmed details only
 */
export const BULLET_CHECK_TECHNICAL_ARCHITECTURE: string | undefined = undefined;

/**
 * TODO: describe implementation details with confirmed facts only
 */
export const BULLET_CHECK_IMPLEMENTATION_DETAILS: string | undefined = undefined;

/**
 * TODO: describe the hardest technical issue faced
 */
export const BULLET_CHECK_HARDEST_TECHNICAL_ISSUE: string | undefined = undefined;

/**
 * TODO: describe known limitations
 */
export const BULLET_CHECK_LIMITATIONS: string | undefined = undefined;

/**
 * TODO: describe results with confirmed metrics or outcomes only
 */
export const BULLET_CHECK_RESULTS: string | undefined = undefined;

/**
 * TODO: describe planned next steps
 */
export const BULLET_CHECK_NEXT_STEPS: string | undefined = undefined;

export const bulletCheckCaseStudy: CaseStudy = {
  slug: "bullet-check",
  title: "Bullet Check",
  status: "Live",
  description:
    "A live tool that compares a resume against a job description, identifies the three weakest bullets and generates more targeted rewrites.",
  metaTitle: "Bullet Check — Pranav Bhat",
  metaDescription:
    "A live tool that compares a resume against a job description and identifies the three bullets most in need of improvement.",
  liveUrl: BULLET_CHECK_LIVE_URL,
  heroImage: BULLET_CHECK_SCREENSHOT_PATH,
  userFlow: [
    "Paste a job description and a resume.",
    "The product identifies the three weakest resume bullets.",
    "It provides stronger rewrites.",
  ],
  role: BULLET_CHECK_ROLE,
  timeline: BULLET_CHECK_TIMELINE,
  stack: BULLET_CHECK_STACK,
  repositoryUrl: BULLET_CHECK_REPOSITORY_URL,
  problem: BULLET_CHECK_PROBLEM,
  productDecision: BULLET_CHECK_PRODUCT_DECISION,
  technicalArchitecture: BULLET_CHECK_TECHNICAL_ARCHITECTURE,
  implementationDetails: BULLET_CHECK_IMPLEMENTATION_DETAILS,
  hardestTechnicalIssue: BULLET_CHECK_HARDEST_TECHNICAL_ISSUE,
  limitations: BULLET_CHECK_LIMITATIONS,
  results: BULLET_CHECK_RESULTS,
  nextSteps: BULLET_CHECK_NEXT_STEPS,
};

export const caseStudies: CaseStudy[] = [bulletCheckCaseStudy];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
