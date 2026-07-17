export type ProjectLink = {
  label: string;
  href?: string;
};

export type Project = {
  title: string;
  status: string;
  description: string;
  bullets: string[];
  stack: string[];
  links?: ProjectLink[];
};
