import { Server } from "socket.io";

import { isAuthenticated } from "./authenticate.js";

let currentSlide = 0;

export const initSocket = (server) => {
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
        socket.on("changeSlide", (slideNumber, password, socketId) => {
            if (isAuthenticated(password)) {
                currentSlide = slideNumber;
                // Broadcast to all clients
                io.emit("slideChange", slideNumber, socketId);
            }
        });

        // Host actualizes slide
        socket.on("actualizeSlide", (password) => {
            if (isAuthenticated(password) && currentSlide) {
                io.emit("currentSlide", currentSlide);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
};
