import { type Socket } from "socket.io-client";
import { createContext } from "react";

export const SocketContext = createContext<Socket | null>(null);
