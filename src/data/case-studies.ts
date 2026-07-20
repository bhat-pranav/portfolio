import {
  BULLET_CHECK_LIVE_URL,
  BULLET_CHECK_SCREENSHOT_PATH,
} from "@/data/bullet-check";
import type { CaseStudy } from "@/types/case-study";

export const bulletCheckCaseStudy: CaseStudy = {
  slug: "bullet-check",
  title: "Bullet Check",
  status: "Live",
  role: "Solo developer",
  timeline: "June 26–27, 2026",
  description:
    "A live tool that compares a resume against a job description, identifies the three weakest bullets and generates more targeted rewrites.",
  metaTitle: "Bullet Check — Pranav Bhat",
  metaDescription:
    "A live tool that compares a resume against a job description and identifies the three bullets most in need of improvement.",
  liveUrl: BULLET_CHECK_LIVE_URL,
  repositoryUrl: "https://github.com/bhat-pranav/bullet-check",
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

export const caseStudies: CaseStudy[] = [bulletCheckCaseStudy];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
