import { Server } from "socket.io";

import { validateSecret } from "./authenticate.js";
import { slideStore, configurationStore } from "./store.js";

/**
 * @param {import("http").Server} server
 */
export const initSocketServer = (server) => {
    /** @type {import("socket.io").Server} */
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        // Send current slide to newly connected client
        socket.on("getCurrentSlide", () => {
            if (slideStore.s && slideStore.f) socket.emit("currentSlide", slideStore);
        });

        // Host changes slide
        socket.on("changeSlide", (currentSlideArg, secret, socketId) => {
            if (validateSecret(secret)) {
                slideStore.s = currentSlideArg.s;
                slideStore.f = currentSlideArg.f;
                // Broadcast to all clients
                io.emit("slideChange", currentSlideArg, socketId);
            }
        });

        // Host changes theme
        socket.on("changeTheme", (theme, secret, socketId) => {
            if (validateSecret(secret)) {
                configurationStore.t = theme;
                // Broadcast to all clients
                io.emit("themeChange", theme, socketId);
            }
        });

        // Host changes QR visibility
        socket.on("changeQrVisible", ({ v, url }, secret, socketId) => {
            configurationStore.qr = v;
            configurationStore.url = url;

            if (validateSecret(secret)) {
                io.emit("qrVisibleChange", { v, url }, socketId);
            }
        });

        // Host actualizes slide
        socket.on("actualizeSlide", (secret) => {
            if (validateSecret(secret) && slideStore.s && slideStore.f) {
                io.emit("currentSlide", slideStore);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
