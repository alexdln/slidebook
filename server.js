/* eslint-disable @typescript-eslint/no-require-imports */
const dotenv = require("dotenv");
dotenv.config();

const { createServer } = require("http")
const { Server } = require("socket.io")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

// Track the current slide
let currentSlide = 1

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res)
  })

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", (socket) => {
    // Send current slide to newly connected client
    socket.on("getCurrentSlide", () => {
      socket.emit("currentSlide", currentSlide)
    })

    // Client viewing a slide
    socket.on("viewSlide", (slideNumber) => {
      // You could track analytics here
      console.log(`Client viewing slide ${slideNumber}`)
    })

    // Admin changes slide
    socket.on("changeSlide", (slideNumber, password) => {
      if (password === process.env.ADMIN_PASSWORD) {
        currentSlide = slideNumber
        // Broadcast to all clients
        io.emit("slideChange", slideNumber)
      }
    })

    // Admin actualizes slide
    socket.on("actualizeSlide", (password) => {
      if (password === process.env.ADMIN_PASSWORD) {
        io.emit("currentSlide", currentSlide)
      }
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })
  })

  const PORT = process.env.PORT || 3000

  server.listen(PORT, () => {
    console.log(`> Socket Server listening on port ${PORT}`)
  })
})

