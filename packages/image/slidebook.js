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

if (["dev", "build"].includes(command)) {
    fs.cpSync(__dirname, tmp, { recursive: true });
}

if (["start", "dev"].includes(command)) {
    spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", ["run", command], {
        shell: true,
        stdio: "inherit",
        cwd: tmp,
        env: {
            ...process.env,
            ORIG_CWD: process.cwd(),
            IMAGE_CWD: tmp,
        },
    });
} else if (["build"].includes(command)) {
    spawn("next", ["build", '"./build/.tmp"'], {
        shell: true,
        stdio: "inherit",
        cwd: process.cwd(),
        env: {
            ...process.env,
            ORIG_CWD: process.cwd(),
            IMAGE_CWD: tmp,
        },
    });
} else {
    console.error("Invalid command");
    process.exit(1);
}
