#!/usr/bin/env node

import { spawn } from "child_process";
import { watch, readFileSync, existsSync } from "fs";
import { Command } from "commander";
import { config } from "dotenv";
import { cp } from "fs/promises";
import colors from "picocolors";

import { formatFile, formatFiles, getDirs, cleanOutDir, eject } from "./lib/format-files.js";
import { OUT_DIR, IMAGE_DIR, IS_EJECTED } from "./lib/constants.js";
import { runServer } from "./lib/server.js";
import { getConfig, mergeConfigs } from "./lib/config.js";

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
    .option("-p, --port <PORT>", "Set the port number.")
    .option("-a, --app", "Run application only.")
    .option("-s, --server", "Run server only.")
    .option("-c, --cookies-flags <FLAGS>", "Set the cookies flags.")
    .option("-t, --turbopack", "Enable Turbopack for development.")
    .option("-w, --slide-width <WIDTH>", "Set the slide width.")
    .option("-h, --slide-height <HEIGHT>", "Set the slide height.")
    .allowUnknownOption()
    .action(async function () {
        if (!IS_EJECTED) {
            console.log(`Preparing ${cyan("Slidebook")}...`);
            await cleanOutDir();
            await cp(IMAGE_DIR, OUT_DIR, { recursive: true });
            await formatFiles();

            const dirs = getDirs();
            const { sourceSlidesDir, sourceAssetsDir } = dirs;
            console.log(blue("Watching files..."));

            watch(sourceSlidesDir, async (event, filename) => {
                if (!filename) return;

                if (event === "change") {
                    console.log(`${blue("reloading file:")} "${yellow(filename)}"`);
                    await formatFile(filename, "slides", dirs);
                } else if (event === "rename") {
                    console.log(blue("reloading files"));
                    await formatFiles();
                } else {
                    console.log(`${blue("Unknown event:")} "${yellow(event)}"`);
                }
            });
            if (existsSync(sourceAssetsDir)) {
                watch(sourceAssetsDir, async (event, filename) => {
                    if (!filename) return;

                    if (event === "change") {
                        console.log(`${blue("reloading file:")} "${yellow(filename)}"`);
                        await formatFile(filename, "asset", dirs);
                    } else if (event === "rename") {
                        console.log(blue("reloading files"));
                        await formatFiles();
                    } else {
                        console.log(`${blue("Unknown event:")} "${yellow(event)}"`);
                    }
                });
            }
        }

        const config = await getConfig();
        const { turbopack, app, server, ...sharedOpts } = this.opts();
        const sharedConfig = mergeConfigs(config, sharedOpts);
        return runServer({
            dev: true,
            turbo: turbopack,
            type: (app && "app") || (server && "server") || "all",
            sharedConfig,
        });
    });

program
    .command("start")
    .option("-p, --port <PORT>", "Set the port number.")
    .option("-a, --app", "Run application only.")
    .option("-s, --server", "Run server only.")
    .option("-u, --server-url <URL>", "Set the server URL.")
    .option("-c, --cookies-flags <FLAGS>", "Set the cookies flags.")
    .option("-w, --password <PASSWORD>", "Set the password.")
    .option("-q, --qr-url <URL>", "Set the QR URL.")
    .allowUnknownOption()
    .action(async function () {
        const config = await getConfig();
        const { app, server, ...sharedOpts } = this.opts();
        const sharedConfig = mergeConfigs(config, sharedOpts);
        return runServer({
            dev: false,
            type: (app && "app") || (server && "server") || "all",
            sharedConfig,
        });
    });

program
    .command("build")
    .option("-u, --server-url <URL>", "Set the server URL.")
    .option("-c, --cookies-flags <FLAGS>", "Set the cookies flags.")
    .option("-w, --slide-width <WIDTH>", "Set the slide width.")
    .option("-h, --slide-height <HEIGHT>", "Set the slide height.")
    .allowUnknownOption()
    .action(async function () {
        if (!IS_EJECTED) {
            console.log(`Preparing ${cyan("Slidebook")}...`);
            await cleanOutDir();
            await cp(IMAGE_DIR, OUT_DIR, { recursive: true });
            await formatFiles();
        }
        const config = await getConfig();
        const sharedOpts = this.opts();
        const sharedConfig = mergeConfigs(config, sharedOpts);
        return spawn("next", ["build", OUT_DIR], {
            shell: true,
            stdio: "inherit",
            cwd: process.cwd(),
            env: {
                ...process.env,
                NEXT_PUBLIC_SERVER_URL: sharedConfig.serverUrl,
                NEXT_PUBLIC_SLIDE_WIDTH: sharedConfig.slideWidth,
                NEXT_PUBLIC_SLIDE_HEIGHT: sharedConfig.slideHeight,
                NEXT_PUBLIC_COOKIES_FLAGS: sharedConfig.cookiesFlags,
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
