import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

export const IS_LIMITED_CI = Boolean(process.env.VERCEL_PROJECT_ID) || process.argv[2] === "eject";

export const IS_EJECTED =
    fs.existsSync(path.join(process.cwd(), "next.config.js")) ||
    fs.existsSync(path.join(process.cwd(), "next.config.mjs")) ||
    fs.existsSync(path.join(process.cwd(), "next.config.ts"));

export const OUT_DIR = IS_LIMITED_CI || IS_EJECTED ? process.cwd() : path.join(process.cwd(), "build", ".tmp");

export const IMAGE_DIR = path.dirname(fileURLToPath(import.meta.resolve("@slidebook/image/package.json")));
