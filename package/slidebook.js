#!/usr/bin/env node

import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = process.argv[2];

const tmp = path.join(process.cwd(), "build", ".tmp");

if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp, { recursive: true });
}

fs.cpSync(__dirname, tmp, { recursive: true });

if (["start", "dev"].includes(command)) {
    spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", ["run", command], {
        shell: true,
        stdio: "inherit",
        cwd: tmp,
        env: {
            ...process.env,
            NODE_ENV: "test",
            ORIG_CWD: process.cwd(),
        },
    });
} else {
    console.error("Invalid command");
    targetProcess.exit(1);
}
