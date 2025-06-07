// @ts-check

import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { initServer } from "@slidebook/server/lib/init-server.js";

import { OUT_DIR } from "./constants.js";

/**
 * @param {{ dev?: boolean, turbo?: boolean, type: "server" | "app" | "all", sharedConfig: import("./config").FinalConfig }} opts
 */
export const runServer = async ({ dev, turbo, type, sharedConfig }) => {
    const { default: next } = await import("next");
    const { port, serverUrl, qrUrl, width, height, cookiesFlags } = sharedConfig;

    if (type === "server") {
        if (qrUrl) process.env.QR_URL = qrUrl;
        const server = createServer();
        initServer(server);

        server.listen(port, () => {
            console.log(`> Realtime Server listening on port ${port}`);
        });
    } else {
        if (serverUrl) process.env.NEXT_PUBLIC_SERVER_URL = serverUrl;
        if (qrUrl) process.env.NEXT_PUBLIC_QR_URL = qrUrl;
        if (width) process.env.NEXT_PUBLIC_SLIDE_WIDTH = String(width);
        if (height) process.env.NEXT_PUBLIC_SLIDE_HEIGHT = String(height);
        if (cookiesFlags) {
            process.env.NEXT_PUBLIC_COOKIES_FLAGS = cookiesFlags;
            process.env.COOKIES_FLAGS = cookiesFlags;
        }
        if (type !== "app") process.env.DEFAULT_SERVER = "true";

        const app = next({
            dev,
            turbo,
            turbopack: turbo,
            dir: OUT_DIR,
            minimalMode: false,
            quiet: false,
        });
        const handle = app.getRequestHandler();

        app.prepare().then(() => {
            const server = createServer((req, res) => {
                handle(req, res);
            });

            if (type !== "app") {
                initServer(server);
            }

            server.listen(port, () => {
                console.log(`> ${type === "app" ? "App" : "App and Realtime Server"} listening on port ${port}`);
            });
        });
    }
};
