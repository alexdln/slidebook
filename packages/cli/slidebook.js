#!/usr/bin/env node

import { spawn } from "child_process";
import { watch, readFileSync } from "fs";
import { Command } from "commander";
import { config } from "dotenv";
import { cp } from "fs/promises";
import colors from "picocolors";

import { formatFile, formatFiles, getDirs, cleanOutDir, eject } from "./lib/format-files.js";
import { OUT_DIR, IMAGE_DIR, IS_EJECTED } from "./lib/constants.js";
import { runServer } from "./lib/server.js";

const packageJson = JSON.parse(readFileSync("./package.json"));
const { yellow, blue, cyan } = colors;

config();
config({ path: `.env.local`, override: true });

const handleSigTerm = () => process.exit(0);

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

const program = new Command();

program
    .name(packageJson.name)
    .version(packageJson.version, "-v, --version", "Output the current version of @slidebook/cli.");

program
    .command("dev")
    .option("-p, --port", "Set the port number.")
    .option("-a, --app", "Run application only.")
    .option("-s, --server", "Run server only.")
    .option("-t, --turbopack", "Enable Turbopack for development.")
    .allowUnknownOption()
    .action(async function () {
        if (!IS_EJECTED) {
            console.log(`Preparing ${cyan("Slidebook")}...`);
            await cleanOutDir();
            await cp(IMAGE_DIR, OUT_DIR, { recursive: true });
            await formatFiles();

            const { sourceDir } = getDirs();
            console.log(blue("Watching files..."));

            watch(sourceDir, async (event, filename) => {
                if (!filename) return;

                if (event === "change") {
                    console.log(`${blue("reloading file:")} "${yellow(filename)}"`);
                    await formatFile(filename);
                } else if (event === "rename") {
                    console.log(blue("reloading files"));
                    await formatFiles();
                } else {
                    console.log(`${blue("Unknown event:")} "${yellow(event)}"`);
                }
            });
        }

        const { turbopack, app, server, port } = this.opts();
        const PORT = port || process.env.PORT || 3000;
        return runServer({
            dev: true,
            turbo: turbopack,
            type: (app && "app") || (server && "server") || "all",
            port: PORT,
        });
    });

program
    .command("start")
    .option("-p, --port", "Set the port number.")
    .option("-a, --app", "Run application only.")
    .option("-s, --server", "Run server only.")
    .allowUnknownOption()
    .action(function () {
        const { app, server, port } = this.opts();
        const PORT = port || process.env.PORT || 3000;
        return runServer({
            dev: false,
            type: (app && "app") || (server && "server") || "all",
            port: PORT,
        });
    });

program
    .command("build")
    .allowUnknownOption()
    .action(async function () {
        if (!IS_EJECTED) {
            console.log(`Preparing ${cyan("Slidebook")}...`);
            await cleanOutDir();
            await cp(IMAGE_DIR, OUT_DIR, { recursive: true });
            await formatFiles();
        }
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
    });

program.command("eject").action(async function () {
    if (IS_EJECTED) {
        console.error("App already ejected");
        return process.exit(1);
    }

    await eject();
});

program.parse();
