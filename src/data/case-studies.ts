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

export const lifestyleSystemsCaseStudy: CaseStudy = {
  slug: "lifestyle-systems",
  title: "Business Systems, Lifestyle Home Products",
  status: "In production",
  role: "Data Analyst",
  timeline: "Second consecutive co-op term",
  description:
    "Data platform built across two co-op terms at a family-owned retail company: a centralized OAuth broker, ten Apps Script pipelines, and a set of interactive dashboards built with Claude, feeding Salesforce reporting and daily operations.",
  metaTitle: "Business Systems, Lifestyle Home Products",
  metaDescription:
    "Data platform built during two co-op terms at Lifestyle Home Products: OAuth infrastructure, ten Apps Script pipelines, and Claude-built interactive dashboards feeding daily operations.",
  // TODO(Pranav): add heroImage: LIFESTYLE_SYSTEMS_SCREENSHOT_PATH once a redacted screenshot exists at public/images/lifestyle-systems.png
  stack: [
    "Salesforce",
    "Google Apps Script",
    "Google Sheets",
    "SOQL",
    "Google Workspace Admin APIs",
    "Claude",
  ],
  problem:
    "At Lifestyle Home Products, I built a centralized Salesforce authentication service and ten Apps Script pipelines pulling from Salesforce, Google Workspace, and a handful of outside vendor and recruiting APIs into Google Sheets warehouses. Those warehouses feed the company's day-to-day reporting: a native Salesforce dashboard, an executive scorecard, and a set of interactive dashboards I built with Claude. The token broker and the dashboard pipeline were built with another co-op; everything else, individually. I also spent part of the term documenting accounting processes that had never been written down.\n\nLHP's operational data was scattered across Salesforce, Google Workspace, and a handful of point tools (Rilla, Regal, JazzHR, Xero) that never talked to each other. Worse, the ten-plus Apps Script pipelines that did the talking each managed their own Salesforce login independently, which broke silently under scheduled triggers and put the company's Salesforce credentials at risk if enough failed at once. Reporting had the same problem from a different angle: Tableau, which the company depended on, had been fully deprecated with nothing built to replace it. Separately, a handful of critical accounting processes existed only as tribal knowledge in one person's head, with no documentation and no plan for what happens if they're ever unavailable.",
  systems: [
    {
      name: "Salesforce Token Broker",
      status: "Co-built",
      body: [
        "10+ Apps Script pipelines originally each managed their own Salesforce OAuth connection using Apps Script's OAuth2 library and getUserProperties(). That breaks under time-driven triggers: getUserProperties() is scoped to an interactive user session, and a scheduled trigger has none, so token state would silently go stale and produce opaque auth failures in the early-morning trigger window. Worse, each pipeline handled its own refresh and retry logic independently, so a bad morning could mean a dozen-plus scripts all hitting Salesforce's OAuth endpoint on failure at once. Salesforce can rate-limit or revoke a refresh token used abusively, so uncoordinated retries were actively worsening the exact risk they were meant to avoid.",
        "I built a single Apps Script web app that's the only thing in the system permitted to own the Salesforce OAuth grant. Every consuming pipeline calls its HTTP endpoint for a live access token instead of managing OAuth itself. A granted token is cached for a 25-minute TTL, well inside Salesforce's roughly two-hour session, turning a typical morning's 10+-pipeline trigger window into one grant instead of one per consumer. LockService prevents concurrent callers from stampeding the token endpoint, the refresh call gets three attempts with backoff, and HTTP status is checked before JSON.parse(), since the original version parsed blindly and turned a Salesforce maintenance page (returned as HTML) into an opaque \"Unexpected token '<'\" with zero diagnostic value. An invalid_grant response is detected as fatal and fails fast rather than burning through retries against a dead credential; a consumer that hits a 401 can pass force=1 to bypass the cache.",
        "Two judgment calls worth mentioning. The domain-restriction check is implemented but deliberately not wired into the endpoint's authorization, since the deployment's own \"Anyone within domain\" setting is what actually gates access today; it's documented in place as the correct fallback if the deployment is ever opened more broadly, with a comment explaining it protects nothing currently, kept intentionally rather than left by accident. Separately, the first version of the cache-behavior test asserted that a forced refresh should return a different token string, and it failed, because Salesforce's refresh flow returns the same access token for a still-valid session rather than minting a new one. I re-derived the actual thing to check, whether a grant occurred, via a stored issued-at timestamp, and rewrote the test around that instead of the wrong assumption.",
        "Reduced OAuth grant volume from 25+ per incident to 1 per cache window across 10+ pipelines, and turned OAuth from a per-pipeline maintenance burden into one testable, monitorable service that new pipelines integrate with through a single HTTP call.",
      ],
    },
    {
      name: "User & License Warehouse",
      status: "4 of 4 platforms live",
      body: [
        "LHP's workforce identity data was scattered across four systems with no reconciliation between them: Salesforce (roles, profiles, licenses), Google Workspace (access, groups), Rilla (sales conversation intelligence, used to check whether someone is actually active), and Regal (the call center platform). I built a daily pipeline, authenticating through the token broker, that unifies all four into one warehouse. Each source needed a genuinely different auth pattern: Salesforce delegates to the broker, Google Workspace required hand-rolled JWT signing since Apps Script's built-in OAuth doesn't support domain-wide delegation directly, Rilla uses a static API key in a nonstandard header format reverse-engineered from its docs, and Regal has no API at all, so its sync searches Gmail for a monthly emailed export and parses the CSV from the zipped attachment.",
        "The daily sync runs all four sources as isolated jobs, each wrapped in its own try/catch, so one source's failure never blocks the other three. Along the way I fixed a Directory API quota failure (calling groups.list per user hit Google's bandwidth quota outright; fixed by fetching all domain groups once and building an in-memory lookup instead of one call per user), handled Google's Unix-epoch sentinel value for users who've never logged in (which silently corrupts \"last active\" reporting if not filtered explicitly), and worked around a non-obvious two-hop SOQL relationship traversal to get license type off a Salesforce user record. For Regal specifically, the Gmail search has to run as whoever's inbox receives the export, not whoever wrote the script, since GmailApp.search() runs as the trigger owner.",
        "Replaced four disconnected sources of user and license truth with one daily-refreshed warehouse, used for license reconciliation, role auditing, and cross-checking agent activity between Rilla and Regal. All four platforms are fully live.",
      ],
    },
    {
      name: "Operations Dashboard Pipeline",
      status: "Co-built, in production",
      body: [
        "When Tableau was fully deprecated at LHP, operational reporting (backlog by product line, balance-due aging, projected installs, one-pass completion) needed a new home. The destination is a native Salesforce i360 dashboard backed by a Google Sheets warehouse; I helped build the pipeline that populates it, twelve distinct daily reports across Windows & Doors, Bath, Sunroom, and combined Deficiency/Service.",
        "Google Sheets' roughly 10-million-cell ceiling means twelve daily-snapshotted reports will eventually overflow a single file, so the pipeline checks cell usage against a threshold and spins up a new spreadsheet using the prior one as a template when it's near capacity, without requiring the downstream dashboard to be reconfigured. Re-running mid-month would duplicate rows without special handling, so a targeted-deletion step scans backward in chunks and deletes only the current month's block, leaving prior months untouched (a naive linear scan across 9 million cells would blow Apps Script's execution-time limit). Several queries walk four to five relationship hops deep to reflect LHP's actual i360 data model, with consistent null-coalescing rather than letting a broken chain throw. A run-scoped shared state ensures all twelve pulls in one execution share one token, one target file, and one consistent timestamp, so a rotation boundary can't land mid-run with half the reports on the old file and half on the new one.",
        "Directly replaced Tableau as the reporting backbone for backlog, balance-due, and install-projection metrics across all three product lines plus Deficiency & Service, now feeding the dashboard used as the company's source of truth for these metrics.",
      ],
    },
    {
      name: "Cycle Time Warehouse",
      status: "In production",
      body: [
        "LHP tracks cycle time across roughly 25 project-activity milestones, each stored as a separate, mostly-empty custom field on the underlying Salesforce object. I designed and built a standalone pipeline that restructures this into a long, normalized warehouse built for actual analysis: rather than mirroring Salesforce's wide, mostly-null shape, it expands each activity into one row per populated field, trading a higher row count for data that's directly pivotable by milestone, product line, and region without downstream unpivoting.",
        "The composite key is activity ID plus field name, since one activity produces multiple rows; each 30-day rolling sync builds an in-memory index of existing keys and either overwrites in place or appends, since Sheets has no native upsert primitive. File rotation at the roughly 9.5-million-cell ceiling is trickier here than in an append-only pipeline, because upserts depend on matching against recently completed activities: a naive rotation where the new file starts empty breaks upserts right at the boundary, since an activity completed 25 days ago, sitting in the now-frozen old file, becomes unmatchable, and the next sync inserts it as a duplicate instead of updating it. A carry-forward step solves this by copying only rows still inside the lookback window into the new file, checking both the current and prior year to handle a window that straddles January 1.",
        "Powers cycle-time analysis across roughly 25 milestone types, three product lines, and multiple geographic dimensions in an immediately pivotable format. A confirmed live run processed 147,723 activity records; the idempotent design makes the pipeline safe to re-run, backfill, or rotate without manual deduplication, and a multi-year backfill populated historical data back to 2022.",
      ],
    },
  ],
  highlightsLabel: "Additional warehouses",
  highlights: [
    {
      name: "Costco Lead Source & Appointment Tracker",
      source: "Salesforce",
      purpose:
        "Tracks how Costco-sourced leads convert into set and completed demo appointments, broken out by taker, market, and region, separate from the main ops reports.",
    },
    {
      name: "Deleted Records Audit Log",
      source: "Salesforce (queryAll, including soft-deleted)",
      purpose:
        "Daily audit trail of what's deleted across the org and by whom, spanning 9 objects, since Salesforce's Recycle Bin only holds records for 15 days.",
    },
    {
      name: "Executive Scorecard (v2)",
      source: "Salesforce, 39 aggregate queries",
      purpose:
        "Leadership-level scorecard across 10 metrics including backlog, retention, and cash. v2 exists because v1 ran all 39 queries serially and blew Apps Script's 30-minute execution cap; the rewrite fetches in parallel waves with a watchdog trigger that re-runs a failed pull automatically.",
    },
    {
      name: "JazzHR Applicant Warehouse",
      source: "JazzHR recruiting API",
      purpose:
        "Centralizes recruiting pipeline data for reporting alongside Salesforce location and business-unit data, which JazzHR's own interface can't cross-reference.",
    },
    {
      name: "Marketing Dashboard: Lead Source Performance",
      source: "Salesforce",
      purpose:
        "Full-funnel view from lead intake through appointment outcome through actual sale economics, broken out by market segment and region.",
    },
    {
      name: "Xero Bank Transactions Export",
      source: "Xero API",
      purpose:
        "Daily flattened export of bank transactions. Xero's interface has no CSV journal-entry import, so this gives a queryable, spreadsheet-native copy for downstream reconciliation.",
    },
  ],
  aiDashboards:
    "Alongside the pipelines, I used Claude to build a set of interactive dashboards, one per warehouse, each with year, month, product, and region filters, sortable charts, stat tiles, and target-vs-actual coloring. Two are live today: a Cycle Time dashboard and a Software Usage & License Audit dashboard, both driven entirely by Apps Script that Claude wrote against the underlying warehouse data.",
  parallelInitiative: {
    title: "Institutionalizing accounting knowledge",
    body: "Ran in parallel with the technical work: a documentation initiative converting one accounting controller's undocumented process knowledge into a structured set of SOPs, written docs plus recorded video walkthroughs, each built against a consistent seven-part template covering frequency and trigger, systems required, step-by-step procedure, decision points and exceptions, common errors, output, and escalation contact.\n\nDocumented 10+ processes end to end, including bank reconciliation, payroll, government remittances, and vendor payment cycles, working directly with the controller and, for a related sub-process, the accounts payable manager. While mapping three unrelated processes, I noticed they all hit the same root cause: the accounting platform has no way to import journal entries from a CSV, forcing manual re-entry in all three. I flagged it as one consolidated recommendation instead of three separate, smaller asks.\n\nReduced key-person risk for finance operations that previously depended entirely on one person's availability and memory, and produced a reusable seven-part template that generalizes beyond accounting to any undocumented process in the org.",
  },
  limitations: [
    "These are internal systems built for a private company, so there is no public demo or repository to link to.",
    "No automated test suite exists across the pipelines, beyond the Token Broker's cache-behavior test.",
    "The accounting documentation initiative has open items: the intercompany-adjustments walkthrough, the accounts-payable sub-process documentation, and the entity-structure reference are unfinished.",
  ],
  results:
    "This work was directed and reviewed at the leadership level (C-suite and various VPs) before rolling out to the teams that depend on it daily.\n\nTen production pipelines, a centralized OAuth service, and a set of Claude-built interactive dashboards now run LHP's operational reporting. Separately, the accounting documentation initiative reduced key-person risk across 10+ previously undocumented financial processes.",
};

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
    "Given a job description and a full resume, it's hard to tell quickly which bullets are the weakest fit for that specific role. Bullet Check narrows the review to the three bullets most in need of improvement and provides a clearer rewrite for each one.",
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
    "A data-viz app showing what the job market is asking for: skill demand, role breakdowns and top hiring companies, extracted from real job postings via LLM.",
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
    "Job Lens is built as a static, offline-first product rather than a live query tool. The skill extraction runs once as a batch pipeline and its output is committed as JSON, and the frontend statically imports that JSON at build time with no runtime API or database. This trades live freshness for a simpler, more reliable architecture. The deployed site has zero runtime dependencies and nothing that can fail at request time.",
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

export const caseStudies: CaseStudy[] = [
  lifestyleSystemsCaseStudy,
  bulletCheckCaseStudy,
  jobLensCaseStudy,
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
