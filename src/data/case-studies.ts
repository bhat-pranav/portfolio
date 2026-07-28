import {
  BULLET_CHECK_LIVE_URL,
  BULLET_CHECK_REPOSITORY_URL,
  BULLET_CHECK_SCREENSHOT_PATH,
} from "@/data/bullet-check";
import {
  JOB_LENS_LIVE_URL,
  JOB_LENS_REPOSITORY_URL,
  JOB_LENS_SCREENSHOT_PATH,
} from "@/data/job-lens";
import type { CaseStudy } from "@/types/case-study";

export const bulletCheckCaseStudy: CaseStudy = {
  slug: "bullet-check",
  title: "Bullet Check",
  status: "Live",
  role: "Solo developer",
  timeline: "June 26–27, 2026",
  description:
    "A live tool that compares a resume against a job description, identifies the three weakest bullets and generates more targeted rewrites.",
  metaTitle: "Bullet Check",
  metaDescription:
    "A live tool that compares a resume against a job description and identifies the three bullets most in need of improvement.",
  liveUrl: BULLET_CHECK_LIVE_URL,
  repositoryUrl: BULLET_CHECK_REPOSITORY_URL,
  heroImage: BULLET_CHECK_SCREENSHOT_PATH,
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS 4",
    "Anthropic Messages API",
  ],
  problem:
    "Given a job description and a full resume, it can be difficult to quickly determine which bullets are the weakest fit for that specific role. Bullet Check narrows the review to the three bullets most in need of improvement and provides a clearer rewrite for each one.",
  productDecision:
    "The product is intentionally focused on three bullets instead of rewriting the entire resume. Each result includes the original bullet, an explanation of why it is weak relative to the job description and a stronger rewrite. This keeps the output focused and gives the user a short list of changes they can review individually.",
  userFlow: [
    "The user pastes a job description.",
    "The user pastes their full resume.",
    "The browser sends both inputs to POST /api/analyze.",
    "The server route constructs the analysis prompt and calls the Anthropic Messages API.",
    "The response is cleaned and parsed as JSON.",
    "The browser displays result cards containing the original bullet, why it is weak and a stronger rewrite.",
  ],
  userFlowNote:
    "The prompt requests three results, but the application does not programmatically enforce an exact result count.",
  technicalArchitecture:
    "Bullet Check uses a small client-server architecture inside the Next.js App Router. The client page collects the job description and resume, then sends them as JSON to a Next.js Route Handler at /api/analyze. The route validates the request, constructs the model prompt and calls the Anthropic Messages API using a server-side API key. The returned text is cleaned, parsed as JSON and sent back to the browser, where the results are rendered as individual cards.",
  architectureDiagram:
    "Browser form → POST /api/analyze → Anthropic Messages API → JSON parsing → Result cards",
  implementationDetails:
    "The interface is a client-side React page with two required text areas for the job description and resume. On submit, the browser posts both inputs to the server route. The route reads the Anthropic API key from process.env.ANTHROPIC_API_KEY and calls the Anthropic Messages API with the claude-haiku-4-5 model, capped at 1,000 output tokens.\n\nInside the prompt, the job description and resume are separated with <jd> and <resume> tags. The model is asked for structured JSON that includes the original bullet, why it is weak and a rewritten version. The call is made through a raw HTTP request rather than an SDK.\n\nIf the request fails, the client shows an accessible error message. The server returns different responses for invalid input, missing configuration, provider failures and response-parsing failures.",
  hardestTechnicalIssue:
    "The main reliability issue was getting consistently parseable structured output from the model. Even though the prompt requested JSON-only output, a response could still arrive wrapped in Markdown code fences. That caused JSON.parse to fail. I added a cleanup step that removes optional json code fences and surrounding whitespace before parsing the response.\n\nThe current implementation still relies on the model following the expected structure; it validates that results is an array but does not fully validate every returned item against a schema.",
  validationAndErrorHandling: [
    "Both text areas are required in the client interface before submission.",
    "Invalid JSON or missing inputs return a 400 response.",
    "Missing API configuration returns a 500 response.",
    "Provider or parsing failures return a 502 response.",
    "Failed client requests display an error message.",
    "Returned results are checked as an array.",
    "The application does not currently use a full runtime schema validator such as Zod.",
  ],
  privacyAndDataHandling:
    "The application does not include its own database, file storage, browser storage or user accounts. The resume, job description and generated results are held only in the current React state by the application itself.\n\nTo generate the analysis, the complete pasted job description and resume are sent through the server route to the Anthropic Messages API.\n\nThe repository does not currently include a privacy policy, consent notice, redaction feature or documented retention policy.",
  limitations: [
    "The prompt requests three results, but the server does not enforce an exact count.",
    "Individual result objects are not fully validated against a runtime schema.",
    "There are no input-length limits.",
    "There is no authentication or rate limiting.",
    "Responses are non-streaming, so the interface waits for the complete model response.",
    "The parser assumes the first Anthropic content block contains the expected text.",
    "There are no automated tests.",
    "The application does not currently include a privacy notice or input-redaction tools.",
    "The generated rewrites still require human review to ensure they remain accurate.",
  ],
  results:
    "Built and deployed an end-to-end working product over approximately one day. The live application accepts a job description and resume, sends them through a server-side model workflow and renders focused rewrite recommendations in the browser.\n\nNo verified user, traffic or outcome metrics are currently available.",
};

export const jobLensCaseStudy: CaseStudy = {
  slug: "job-lens",
  title: "Job Lens",
  status: "Live",
  role: "Solo developer",
  timeline: "July 22–24, 2026",
  description:
    "A data-viz app showing what the job market is actually asking for: skill demand, role breakdowns and top hiring companies, extracted from real job postings via LLM.",
  metaTitle: "Job Lens",
  metaDescription:
    "A data-viz app showing real job-market skill demand, extracted from 1,000 job postings via an LLM-based extraction pipeline.",
  liveUrl: JOB_LENS_LIVE_URL,
  repositoryUrl: JOB_LENS_REPOSITORY_URL,
  heroImage: JOB_LENS_SCREENSHOT_PATH,
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS 4",
    "Python",
    "OpenAI API",
  ],
  problem:
    "Job postings describe what employers are hiring for, but that information is locked in unstructured text spread across thousands of listings. Job Lens turns a sample of real postings into a structured view of what skills are actually in demand, how that demand shifts by role, and which companies are doing the hiring.",
  productDecision:
    "Job Lens is built as a static, offline-first product rather than a live query tool. The skill extraction runs once as a batch pipeline and its output is committed as JSON, and the frontend statically imports that JSON at build time with no runtime API or database. This trades live freshness for a simpler, more reliable architecture: the deployed site has zero runtime dependencies and nothing that can fail at request time.",
  userFlow: [
    "A visitor lands on the page and sees three sections: Top Skills, Skills by Role and Top Hiring Companies.",
    "Top Skills shows the 20 most requested skills across all sampled postings, ranked and sized by frequency.",
    "Skills by Role lets the visitor switch between four role categories to see how required skills shift by role.",
    "Top Companies lists the employers with the most postings in the sample, with staffing and recruiting agencies filtered out.",
    "All three sections render directly from pre-computed JSON with no client-side fetching.",
  ],
  technicalArchitecture:
    "Job Lens has two independent halves. Offline, a Python pipeline (scripts/extract_skills.py) reads a 1,000-posting sample drawn from a 124k-row LinkedIn postings dataset, calls the OpenAI API once per posting to extract structured skills, and aggregates the results into three output JSON files. Online, a static Next.js App Router frontend imports those JSON files directly at build time and renders them as three data-viz sections, with no server route, database or client-side data fetching involved.",
  architectureDiagram:
    "CSV of sampled postings → gpt-4o-mini extraction (per posting) → aggregated JSON (top skills / by role / top companies) → committed to repo → Next.js static import → rendered charts",
  implementationDetails:
    "The pipeline sends each posting's title and description to gpt-4o-mini in JSON mode at temperature 0, asking for 5-15 categorized skills per posting (language/tool/framework, soft skill, certification or other) with instructions to normalize variant names (e.g. \"Python3\" to \"Python\"). Raw per-posting results are cached to data/output/raw_results.json so the aggregation step can be re-run without re-hitting the API.\n\nDuring aggregation, skills are grouped for counting by a normalized key (lowercased, punctuation stripped) while keeping the first-seen raw phrasing as the display label, so minor naming variants collapse into one entry without losing readable formatting. A hardcoded list of ~40 known staffing and recruiting agencies is filtered out before counting, since those postings are placed on behalf of an undisclosed end employer and would distort both the skills and companies views. The three output JSONs (top_skills.json, skills_by_role.json, top_companies.json) are committed to the repo and consumed directly by the frontend.\n\nThe frontend is a single static page built from three presentational components (TopSkills, SkillsByRole, TopCompanies) on a custom editorial/monospace design system, with a custom OG image and favicon generated in-app.",
  hardestTechnicalIssue:
    "The main design problem was making per-posting company names usable for aggregation without a canonical company database. The same real employer can appear under several string variants across postings, and recruiting agencies post on behalf of employers they don't name. The pipeline addresses the second problem directly with a maintained agency exclusion list, but does not attempt fuzzy-matching or canonicalizing raw employer name variants, so the top-companies view is only as clean as the source data's naming consistency.",
  validationAndErrorHandling: [
    "The extraction script has a --test mode that runs on 20 rows and prints raw output without writing files, for checking prompt output before a full run.",
    "Per-posting extraction failures are caught and logged with the job_id, and that posting is skipped rather than failing the whole run.",
    "An --aggregate-only mode re-runs aggregation from the cached raw results without calling the API again.",
    "The frontend has no runtime error paths to handle, since all data is statically imported at build time rather than fetched.",
    "There is no automated test suite for either the pipeline or the frontend.",
  ],
  privacyAndDataHandling:
    "Job Lens processes a third-party job postings dataset, not user-submitted or personal data. Postings are sent to the OpenAI API for skill extraction as part of the offline pipeline; there is no user-facing input and no data collected from site visitors. The OPENAI_API_KEY in the repo's .env is used only for offline pipeline re-runs and is not exposed to the deployed frontend.",
  limitations: [
    "The dataset is a static, one-time 1,000-posting sample; there is no automation to refresh it or re-run the pipeline on a schedule.",
    "Company names are not canonicalized beyond the staffing-agency exclusion list, so naming variants for the same employer may be undercounted or split.",
    "There is no automated test suite or CI for either the extraction pipeline or the frontend.",
    "Skill extraction quality depends entirely on the underlying model's output and is not validated against a ground-truth labeling.",
    "The role classification reuses the source dataset's existing role_category column rather than being independently derived.",
  ],
  results:
    "Ran the extraction pipeline end-to-end across all 1,000 sampled postings, producing three aggregated views (top skills, skills by role, top hiring companies) with 119 staffing-agency postings filtered out of the company and skill counts. Built and deployed a static Next.js frontend rendering all three views with a custom editorial design system.\n\nNo verified visitor or usage metrics are currently available.",
  nextSteps:
    "Still deciding between leaving Job Lens as a static one-shot analysis or building automation to periodically re-sample postings and re-run the extraction pipeline, which would also require adding tests and a CI pipeline currently absent.",
};

export const caseStudies: CaseStudy[] = [bulletCheckCaseStudy, jobLensCaseStudy];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
