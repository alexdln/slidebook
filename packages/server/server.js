#!/usr/bin/env node

import { createServer } from "http";
import { config } from "dotenv";
config();

import { initServer } from "./lib/init-server.js";

const PORT = process.env.PORT || 3000;

const server = createServer();
initServer(server);

server.listen(PORT, () => {
    console.log(`> Realtime Server listening on port ${PORT}`);
});
