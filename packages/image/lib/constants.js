import path from "path";

export const IS_LIMITED_CI = Boolean(process.env.VERCEL_PROJECT_ID);

export const OUT_DIR = IS_LIMITED_CI ? process.cwd() : path.join(process.cwd(), "build", ".tmp");
