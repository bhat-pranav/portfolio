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
  technicalArchitecture?: string;
  implementationDetails?: string;
  hardestTechnicalIssue?: string;
  limitations?: string;
  results?: string;
  nextSteps?: string;
};
