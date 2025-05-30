import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

export const IS_LIMITED_CI = Boolean(process.env.VERCEL_PROJECT_ID) || process.argv[2] === "eject";

export const IS_EJECTED =
    fs.existsSync(path.join(process.cwd(), "next.fs.js")) ||
    fs.existsSync(path.join(process.cwd(), "next.fs.mjs")) ||
    fs.existsSync(path.join(process.cwd(), "next.fs.ts"));

export const OUT_DIR = IS_LIMITED_CI || IS_EJECTED ? process.cwd() : path.join(process.cwd(), "build", ".tmp");

export const IMAGE_DIR = path.dirname(fileURLToPath(import.meta.resolve("@slidebook/image/package.json")));

export const CONFIG_MAP = [
    {
        env: "SERVER_URL",
        fs: "server.url",
        arg: "serverUrl",
    },
    {
        env: "QR_URL",
        fs: "qr.url",
        arg: "qrUrl",
    },
    {
        env: "PASSWORD",
        fs: "password",
        arg: "password",
        default: "qwerty",
    },
    {
        env: "PORT",
        fs: "port",
        arg: "port",
        default: 3000,
    },
    {
        env: "SLIDE_WIDTH",
        fs: "slide.width",
        arg: "slideWidth",
        default: 1200,
    },
    {
        env: "SLIDE_HEIGHT",
        fs: "slide.height",
        arg: "slideHeight",
        default: 600,
    },
];
