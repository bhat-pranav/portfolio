export type CaseStudySystem = {
  name: string;
  status?: string;
  /** Compressed before/after/stat format, for a short system summary. */
  before?: string;
  after?: string;
  stat?: string;
  /** Free-form paragraphs, used instead of before/after when the story needs more room. */
  body?: string[];
};

export type CaseStudyHighlight = {
  name: string;
  source: string;
  purpose: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  status?: string;
  role?: string;
  timeline?: string;
  stack?: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  heroImage?: string;
  /** For role-based case studies covering multiple systems rather than one product */
  systems?: CaseStudySystem[];
  /** Lighter-weight systems shown as a compact list rather than full cards */
  highlights?: CaseStudyHighlight[];
  /** Heading for the highlights list; defaults to "Additional systems" */
  highlightsLabel?: string;
  /** Optional override for page <title> / metadata title */
  metaTitle?: string;
  /** Optional override for metadata description */
  metaDescription?: string;
  problem?: string;
  productDecision?: string;
  userFlow?: string[];
  /** Optional note rendered after the user-flow list */
  userFlowNote?: string;
  technicalArchitecture?: string;
  /** Simple one-line architecture flow, e.g. "A → B → C" */
  architectureDiagram?: string;
  implementationDetails?: string;
  hardestTechnicalIssue?: string;
  /** For a distinct AI-assisted capability worth its own section */
  aiDashboards?: string;
  /** A distinct initiative that ran alongside the main work, e.g. a process/documentation project */
  parallelInitiative?: { title: string; body: string };
  validationAndErrorHandling?: string[];
  privacyAndDataHandling?: string;
  limitations?: string | string[];
  results?: string;
  nextSteps?: string;
};
