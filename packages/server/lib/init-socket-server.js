import { Server } from "socket.io";

import { validateSecret } from "./authenticate.js";
import { slideStore } from "./store.js";

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
            if (slideStore) socket.emit("currentSlide", slideStore);
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

        // Host actualizes slide
        socket.on("actualizeSlide", (secret) => {
            if (validateSecret(secret) && slideStore) {
                io.emit("currentSlide", slideStore);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
