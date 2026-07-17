export type ProjectProgress = {
  currentStage?: string;
  nextMilestone?: string;
};

export type Project = {
  title: string;
  status: string;
  description: string;
  stack?: string[];
  bullets?: string[];
  featured?: boolean;
  imagePath?: string;
  liveUrl?: string;
  /** Defaults to "View Live" when liveUrl is set */
  liveActionLabel?: string;
  repositoryUrl?: string;
  caseStudyUrl?: string;
  progress?: ProjectProgress;
};
