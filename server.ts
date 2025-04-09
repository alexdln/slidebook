const dotenv = require("dotenv");
dotenv.config();

const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const { isAuthenticated } = require("./src/lib/authenticate.ts");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Track the current slide
let currentSlide = 1;

app.prepare().then(() => {
    const server = createServer((req: Request, res: Response) => {
        handle(req, res);
    });

    const io: import("socket.io").Server = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        // Send current slide to newly connected client
        socket.on("getCurrentSlide", () => {
            socket.emit("currentSlide", currentSlide);
        });

        // Client viewing a slide
        socket.on("viewSlide", (slideNumber: number) => {
            // You could track analytics here
            console.log(`Client viewing slide ${slideNumber}`);
        });

        // Admin changes slide
        socket.on("changeSlide", (slideNumber: number, password: string, socketId: string) => {
            if (isAuthenticated(password)) {
                currentSlide = slideNumber;
                // Broadcast to all clients
                io.emit("slideChange", slideNumber, socketId);
            }
        });

        // Admin actualizes slide
        socket.on("actualizeSlide", (password) => {
            if (isAuthenticated(password)) {
                io.emit("currentSlide", currentSlide);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
        console.log(`> Socket Server listening on port ${PORT}`);
    });
});
