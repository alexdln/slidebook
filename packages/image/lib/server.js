const dotenv = require("dotenv");
dotenv.config();

const { createServer } = require("http");
const next = require("next");
const { initSocket } = require("@slidebook/server/lib/init-socket");

const DEV = process.env.NODE_ENV !== "production" && !process.argv.includes("--production");
const TURBO = process.argv.includes("turbo") || process.argv.includes("turbopack");
const APP_ONLY = process.argv.includes("app");
const SERVER_ONLY = process.argv.includes("server");
const PORT = process.env.PORT || 3000;

if (SERVER_ONLY) {
    const server = createServer();
    initSocket(server);

    server.listen(PORT, () => {
        console.log(`> Realtime Server listening on port ${PORT}`);
    });
} else {
    const app = next({ dev: DEV, turbo: TURBO, turbopack: TURBO });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
        const server = createServer((req, res) => {
            handle(req, res);
        });

        if (!APP_ONLY) {
            initSocket(server);
        }

        server.listen(PORT, () => {
            console.log(`> ${APP_ONLY ? "App" : "App and Realtime Server"} listening on port ${PORT}`);
        });
    });
}
