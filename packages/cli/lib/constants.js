import { fileURLToPath } from "url";
import path from "path";

export const IS_LIMITED_CI = Boolean(process.env.VERCEL_PROJECT_ID) || process.argv[2] === "eject";

export const OUT_DIR = IS_LIMITED_CI ? process.cwd() : path.join(process.cwd(), "build", ".tmp");

export const IMAGE_DIR = path.dirname(fileURLToPath(import.meta.resolve("@slidebook/image/package.json")));
