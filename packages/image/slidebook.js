#!/usr/bin/env node

import { spawn } from "child_process";
import path from "path";
import fs from "fs/promises";
import { watch } from "fs";
import { fileURLToPath } from "url";
import { config } from "dotenv";

import { formatFile, formatFiles, getDirs } from "./format-files.js";

config();
config({ path: `.env.local`, override: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const command = process.argv[2];
const tmp = path.join(process.cwd(), "build", ".tmp");

const run = async () => {
    console.log("Preparing Slidebook...");

    const { sourceDir } = getDirs();
    if (["dev", "build"].includes(command)) {
        await fs.rm(tmp, { recursive: true, force: true });
        await fs.mkdir(tmp, { recursive: true });
        await fs.cp(__dirname, tmp, { recursive: true });
        await formatFiles();
    }

    if (["dev"].includes(command)) {
        console.log("Watching files...");

        watch(sourceDir, async (event, filename) => {
            if (!filename) return;

            if (event === "change") {
                console.log("reloading file", filename);
                await formatFile(filename);
            } else if (event === "rename") {
                console.log("reloading files");
                await formatFiles();
            } else {
                console.log("Unknown event: " + event);
            }
        });
    }

    if (["start", "dev"].includes(command)) {
        spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", ["run", command], {
            shell: true,
            stdio: "inherit",
            cwd: tmp,
            env: {
                ...process.env,
                NEXT_PUBLIC_SERVER_URL: process.env.SERVER_URL,
                NEXT_PUBLIC_SLIDE_WIDTH: process.env.SLIDE_WIDTH,
                NEXT_PUBLIC_SLIDE_HEIGHT: process.env.SLIDE_HEIGHT,
            },
        });
    } else if (["build"].includes(command)) {
        spawn("next", ["build", '"./build/.tmp"'], {
            shell: true,
            stdio: "inherit",
            cwd: process.cwd(),
            env: {
                ...process.env,
                NEXT_PUBLIC_SLIDE_WIDTH: process.env.SLIDE_WIDTH,
                NEXT_PUBLIC_SLIDE_HEIGHT: process.env.SLIDE_HEIGHT,
            },
        });
    } else {
        console.error(`Invalid command: "${command}"`);
        process.exit(1);
    }
};

run();
