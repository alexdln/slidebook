import { Server } from "socket.io";

import { validateSecret } from "./authenticate.js";

let currentSlide = { slide: 0, fragment: "f" };

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
            if (currentSlide) socket.emit("currentSlide", currentSlide);
        });

        // Client viewing a slide
        socket.on("viewSlide", (currentSlideArg) => {
            // You could track analytics here
            console.log(`Client viewing slide ${currentSlideArg}`);
        });

        // Host changes slide
        socket.on("changeSlide", (currentSlideArg, secret, socketId) => {
            if (validateSecret(secret)) {
                currentSlide = currentSlideArg;
                // Broadcast to all clients
                io.emit("slideChange", currentSlideArg, socketId);
            }
        });

        // Host actualizes slide
        socket.on("actualizeSlide", (secret) => {
            if (validateSecret(secret) && currentSlide) {
                io.emit("currentSlide", currentSlide);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
