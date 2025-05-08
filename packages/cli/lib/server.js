import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { initServer } from "@slidebook/server/lib/init-server.js";

import { OUT_DIR } from "./constants.js";

export const runServer = async ({ dev, turbo, type, port }) => {
    const { default: next } = await import("next");

    if (type === "server") {
        const server = createServer();
        initServer(server);

        server.listen(port, () => {
            console.log(`> Realtime Server listening on port ${port}`);
        });
    } else {
        const app = next({ dev, turbo, turbopack: turbo, dir: OUT_DIR, minimalMode: false, quiet: false });
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
