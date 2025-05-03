#!/usr/bin/env node

import { createServer } from "http";
import { config } from "dotenv";
config();

import { initSocket } from "./lib/init-socket.js";

const PORT = process.env.PORT || 3000;

const server = createServer();
initSocket(server);

server.listen(PORT, () => {
    console.log(`> Realtime Server listening on port ${PORT}`);
});
