import { Server } from "socket.io";

import { validateSecret } from "./authenticate.js";

let currentSlide = 0;

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
        socket.on("viewSlide", (slideNumber) => {
            // You could track analytics here
            console.log(`Client viewing slide ${slideNumber}`);
        });

        // Host changes slide
        socket.on("changeSlide", (slideNumber, secret, socketId) => {
            if (validateSecret(secret)) {
                currentSlide = slideNumber;
                // Broadcast to all clients
                io.emit("slideChange", slideNumber, socketId);
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
