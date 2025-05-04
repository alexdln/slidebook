import { initRestServer } from "./init-rest-server.js";
import { initSocketServer } from "./init-socket-server.js";

/**
 * @param {import("http").Server} server
 */
export const initServer = (server) => {
    initRestServer(server);
    initSocketServer(server);
};
