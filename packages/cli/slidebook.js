#!/usr/bin/env node

import { spawn } from "child_process";
import { watch } from "fs";
import { config } from "dotenv";
import fs from "fs/promises";

import { formatFile, formatFiles, getDirs, cleanOutDir, eject } from "./lib/format-files.js";
import { OUT_DIR, IMAGE_DIR, IS_EJECTED } from "./lib/constants.js";
import { runServer } from "./lib/server.js";

config();
config({ path: `.env.local`, override: true });

const command = process.argv[2];
const TURBO = process.argv.includes("turbo") || process.argv.includes("turbopack");
const APP_ONLY = process.argv.includes("app");
const SERVER_ONLY = process.argv.includes("server");
const PORT = process.env.PORT || 3000;

const run = async () => {
    if (["eject"].includes(command)) {
        if (!IS_EJECTED) {
            await eject();
            return process.exit(0);
        }

        console.error("App already ejected");
        return process.exit(1);
    }

    if (["dev", "build"].includes(command) && !IS_EJECTED) {
        console.log("Preparing Slidebook...");
        await cleanOutDir();
        await fs.cp(IMAGE_DIR, OUT_DIR, { recursive: true });
        await formatFiles();
    }

    if (["dev"].includes(command) && !IS_EJECTED) {
        const { sourceDir } = getDirs();
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
        return runServer({
            dev: command !== "start",
            turbo: TURBO,
            type: (APP_ONLY && "app") || (SERVER_ONLY && "server") || "all",
            port: PORT,
        });
    }
    if (["build"].includes(command)) {
        return spawn("next", ["build", OUT_DIR], {
            shell: true,
            stdio: "inherit",
            cwd: process.cwd(),
            env: {
                ...process.env,
                NEXT_PUBLIC_SERVER_URL: process.env.SERVER_URL,
                NEXT_PUBLIC_SLIDE_WIDTH: process.env.SLIDE_WIDTH,
                NEXT_PUBLIC_SLIDE_HEIGHT: process.env.SLIDE_HEIGHT,
            },
        });
    }

    console.error(`Invalid command: "${command}"`);
    process.exit(1);
};

run();
