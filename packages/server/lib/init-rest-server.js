import { authRoute } from "./auth-route.js";
import { restoreRoute } from "./restore-route.js";
import { qrRoute } from "./qr-route.js";
import { slideStore, configurationStore } from "./store.js";

/**
 * @param {import("http").Server} server
 */
export const initRestServer = (server) => {
    server.addListener("request", async (req, res) => {
        if (req.headers["rsc"]) return res;

        const url = new URL(req.url, "http://s");

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        if (req.method === "OPTIONS") {
            return res.end();
        }
        if (req.url === "/auth" && req.method === "POST") {
            return authRoute(req, res);
        }
        if (req.url === "/restore" && req.method === "POST") {
            return restoreRoute(req, res);
        }
        if (req.url === "/ok" && req.method === "GET") {
            return res.end("OK");
        }
        if (req.url === "/qr-code.png" && req.method === "GET") {
            return qrRoute(req, res);
        }

        if (process.env.DEFAULT_SERVER) {
            const COOKIES_FLAGS =
                typeof process.env.COOKIES_FLAGS === "string" && process.env.COOKIES_FLAGS !== "undefined"
                    ? process.env.COOKIES_FLAGS
                    : "SameSite=Strict;";
            res.appendHeader("Set-Cookie", `sb_default_server=true;Path=/;${COOKIES_FLAGS}`);
            const sync = req.headers.cookie?.match(/sb_sync=([^;]+)/)?.[1];
            const isRootPathname = ["/", ""].includes(url.pathname);

            if (isRootPathname) {
                res.writeHead(302, { Location: `/${slideStore.s || 1}/${slideStore.f || "f"}` });
                return res.end();
            }

            if (!sync || sync === "true") {
                if (configurationStore.t) {
                    res.appendHeader("Set-Cookie", `sb_theme=${configurationStore.t};Path=/;${COOKIES_FLAGS}`);
                }
                if (configurationStore.qr) {
                    res.appendHeader("Set-Cookie", `sb_qr_visible=${configurationStore.qr};Path=/;${COOKIES_FLAGS}`);
                }

                const match = url.pathname.match(/^\/(\d+)\/(\d+|f|l)(\/|$)/);
                if (
                    match &&
                    (String(slideStore.s) !== match[1] || String(slideStore.f) !== match[2]) &&
                    slideStore.s &&
                    slideStore.f
                ) {
                    res.writeHead(302, { Location: `/${slideStore.s}/${slideStore.f}` });
                    return res.end();
                }
            }
        }
    });
};
