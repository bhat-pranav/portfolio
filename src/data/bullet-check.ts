import type { FeaturedProduct } from "@/types/featured-product";

export const BULLET_CHECK_SCREENSHOT_PATH = "/images/bullet-check.png";

export const BULLET_CHECK_LIVE_URL = "https://bullet-check.vercel.app/";

/**
 * TODO: set to the Bullet Check case-study route or URL once it exists,
 * e.g. "/projects/bullet-check" or "https://..."
 */
export const BULLET_CHECK_CASE_STUDY_URL: string | undefined = undefined;

export const bulletCheckPreview: FeaturedProduct = {
  name: "Bullet Check",
  status: "Live",
  description:
    "Compare a resume against a job description and identify the three bullets that need the most improvement.",
  screenshotPath: BULLET_CHECK_SCREENSHOT_PATH,
  liveUrl: BULLET_CHECK_LIVE_URL,
};
