import { authRoute } from "./auth-route.js";
import { restoreRoute } from "./restore-route.js";

/**
 * @param {import("http").Server} server
 */
export const initRestServer = (server) => {
    server.addListener("request", async (req, res) => {
        if (req.url === "/auth" && req.method === "POST") {
            return authRoute(req, res);
        }
        if (req.url === "/restore" && req.method === "POST") {
            return restoreRoute(req, res);
        }
        if (req.url === "/ok" && req.method === "GET") {
            return res.end("OK");
        }
    });
};
