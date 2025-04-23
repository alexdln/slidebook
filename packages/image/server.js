const dotenv = require("dotenv");
dotenv.config();

const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const { isAuthenticated } = require("@slidebook/core/lib/lib/authenticate");

const DEV = process.env.NODE_ENV !== "production" && !process.argv.includes("--production");
const APP_ONLY = process.argv.includes("app");
const SERVER_ONLY = process.argv.includes("server");
const PORT = process.env.PORT || 3000;

let currentSlide = 0;

const initSocket = (server = PORT) => {
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

if (SERVER_ONLY) {
    const server = createServer();
    initSocket(server);

    server.listen(PORT, () => {
        console.log(`> Realtime Server listening on port ${PORT}`);
    });
} else {
    const app = next({ dev: DEV });
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
