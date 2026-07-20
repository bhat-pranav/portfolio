import type { FeaturedProduct } from "@/types/featured-product";

export const BULLET_CHECK_SCREENSHOT_PATH = "/images/bullet-check.png";

export const BULLET_CHECK_LIVE_URL = "https://bullet-check.vercel.app/";

export const BULLET_CHECK_CASE_STUDY_URL = "/projects/bullet-check";

export const bulletCheckPreview: FeaturedProduct = {
  name: "Bullet Check",
  status: "Live",
  description:
    "Compare a resume against a job description and identify the three bullets that need the most improvement.",
  screenshotPath: BULLET_CHECK_SCREENSHOT_PATH,
  liveUrl: BULLET_CHECK_LIVE_URL,
};
