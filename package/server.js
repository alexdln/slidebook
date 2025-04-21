const dotenv = require("dotenv");
dotenv.config();

const { createServer } = require("http");
const fs = require("fs");
const path = require("path");
const { Server } = require("socket.io");
const next = require("next");

const { isAuthenticated } = require("./src/lib/authenticate");
const { formatSlide, formatSlides, cleanSlides } = require("./src/lib/format-slides");

const dev = process.env.NODE_ENV !== "production" || process.argv[2] !== "start";
const app = next({ dev });
const handle = app.getRequestHandler();

// Track the current slide
let currentSlide = 0;
const ORIG_CWD = process.env.ORIG_CWD || process.cwd();

app.prepare().then(async () => {
    const server = createServer((req, res) => {
        handle(req, res);
    });

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

    await cleanSlides();
    await formatSlides();
    if (dev) {
        fs.watch(path.join(ORIG_CWD, "src", "slides"), async (event, filename) => {
            if (!filename) return;

            if (event === "change") {
                console.log("reloading slide", filename);
                await formatSlide(filename);
            } else if (event === "rename") {
                console.log("reloading slides");
                await formatSlides();
            } else {
                console.log("Unknown event: " + event);
            }
        });
    }

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
        console.log(`> Socket Server listening on port ${PORT}`);
    });
});
