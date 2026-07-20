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
  validationAndErrorHandling?: string[];
  privacyAndDataHandling?: string;
  limitations?: string | string[];
  results?: string;
  nextSteps?: string;
};
