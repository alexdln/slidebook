import { authRoute } from "./auth-route.js";
import { restoreRoute } from "./restore-route.js";
import { slideStore, settingsStore } from "./store.js";

/**
 * @param {import("http").Server} server
 */
export const initRestServer = (server) => {
    server.addListener("request", async (req, res) => {
        const url = new URL(req.url, "http://s");

        if (process.env.DEFAULT_SERVER) {
            res.setHeader(
                "Set-Cookie",
                `slidebook=${JSON.stringify({ ...slideStore, ...settingsStore })}; Path=/; SameSite=Strict`,
            );
            const sync = req.headers.cookie?.match(/sb_sync=([^;]+)/)?.[1];
            const isRootPathname = ["/", ""].includes(url.pathname);

            if (!req.headers["rsc"] && isRootPathname) {
                res.writeHead(302, { Location: `/${slideStore.s}/${slideStore.f}` });
                return res.end();
            } else if (!req.headers["rsc"] && (!sync || sync === "true") && url.pathname) {
                const match = url.pathname.match(/^\/(\d+)\/(\d+|f|l)(\/|$)/);
                if (match && (String(slideStore.s) !== match[1] || String(slideStore.f) !== match[2])) {
                    res.writeHead(302, { Location: `/${slideStore.s}/${slideStore.f}` });
                    return res.end();
                }
            }
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
    });
};
