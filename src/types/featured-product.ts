export type FeaturedProduct = {
  name: string;
  status: string;
  description: string;
  /** Path under /public, e.g. "/images/bullet-check.png" */
  screenshotPath?: string;
  liveUrl?: string;
};
